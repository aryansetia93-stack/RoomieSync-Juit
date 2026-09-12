// RoomieSync - JUIT Campus Living Companion
// Main Application Controller & Router

(function () {
  'use strict';

  // --- State Initialization ---
  const STATE = {
    isLoggedIn: true, // Default auto-login as per requirements
    currentUser: null,
    activeTab: 'explore',
    searchQuery: '',
    selectedHostelFilter: 'all',
    selectedBranchFilter: 'all',
    selectedYearFilter: 'all',
    selectedScoreFilter: 'all',
    quizAnswers: {},
    requests: [],
    chats: {},
    activeChatUser: '211429', // Aryan Kapoor
    isMobileMode: false,
    notifications: [
      { id: 1, title: 'Roomie Request Received', desc: 'Aryan Kapoor (#211429) sent a pairing request for Shastri H-2', time: '10m ago', unread: true, actionTab: 'requests' },
      { id: 2, title: 'Warden Office Update', desc: 'Swap request #SW-2025-084 moved to Final Review by Dr. Neel Kanth', time: '1h ago', unread: true, actionTab: 'swap' },
      { id: 3, title: 'Hostel Preference Saved', desc: 'Your Double Occupancy preference for Autumn 2025 is confirmed', time: '2h ago', unread: false, actionTab: 'explore' }
    ]
  };

  // Load persisted state or defaults from JUIT_DATA
  function loadState() {
    try {
      const savedUser = localStorage.getItem('roomiesync_user');
      if (savedUser) {
        STATE.currentUser = JSON.parse(savedUser);
      } else {
        STATE.currentUser = JSON.parse(JSON.stringify(JUIT_DATA.currentUser));
      }

      const savedAnswers = localStorage.getItem('roomiesync_quiz');
      if (savedAnswers) {
        STATE.quizAnswers = JSON.parse(savedAnswers);
      } else {
        STATE.quizAnswers = JSON.parse(JSON.stringify(STATE.currentUser.quizAnswers || {}));
      }

      const savedRequests = localStorage.getItem('roomiesync_requests');
      if (savedRequests) {
        STATE.requests = JSON.parse(savedRequests);
      } else {
        STATE.requests = JSON.parse(JSON.stringify(JUIT_DATA.requestsInbox));
      }

      const savedChats = localStorage.getItem('roomiesync_chats');
      if (savedChats) {
        STATE.chats = JSON.parse(savedChats);
      } else {
        STATE.chats = JSON.parse(JSON.stringify(JUIT_DATA.chats));
      }
    } catch (e) {
      console.warn('Error reading localStorage, using defaults:', e);
      STATE.currentUser = JSON.parse(JSON.stringify(JUIT_DATA.currentUser));
      STATE.quizAnswers = JSON.parse(JSON.stringify(JUIT_DATA.currentUser.quizAnswers));
      STATE.requests = JSON.parse(JSON.stringify(JUIT_DATA.requestsInbox));
      STATE.chats = JSON.parse(JSON.stringify(JUIT_DATA.chats));
    }
  }

  function saveState() {
    try {
      localStorage.setItem('roomiesync_user', JSON.stringify(STATE.currentUser));
      localStorage.setItem('roomiesync_quiz', JSON.stringify(STATE.quizAnswers));
      localStorage.setItem('roomiesync_requests', JSON.stringify(STATE.requests));
      localStorage.setItem('roomiesync_chats', JSON.stringify(STATE.chats));
    } catch (e) {
      console.warn('Error saving localStorage:', e);
    }
  }

  // --- Router & View Controller ---
  function navigateTo(hash) {
    if (!hash) hash = 'explore';
    hash = hash.replace(/^#/, '');

    const validTabs = ['login', 'explore', 'matches', 'quiz', 'hostels', 'swap', 'pass', 'requests', 'profile'];
    if (!validTabs.includes(hash)) {
      hash = 'explore';
    }

    // Auth Guard: if not logged in and trying to access protected tab
    if (!STATE.isLoggedIn && hash !== 'login') {
      window.location.hash = 'login';
      return;
    }
    // If logged in and on login page, redirect to explore
    if (STATE.isLoggedIn && hash === 'login') {
      // allow staying on login if explicitly intended, or user can view login form
    }

    STATE.activeTab = hash;
    window.location.hash = hash;

    // Update active view sections
    document.querySelectorAll('.view-section').forEach(view => {
      view.classList.remove('active-view');
      view.style.display = 'none';
    });

    const targetView = document.getElementById(`view-${hash}`);
    if (targetView) {
      targetView.style.display = 'block';
      setTimeout(() => targetView.classList.add('active-view'), 10);
    }

    // Update Desktop Sidebar Links
    document.querySelectorAll('.nav-link').forEach(link => {
      const linkPath = link.getAttribute('data-tab');
      if (linkPath === hash) {
        link.classList.add('active-nav');
      } else {
        link.classList.remove('active-nav');
      }
    });

    // Update Mobile Bottom Nav Links
    document.querySelectorAll('#mobile-bottom-nav a').forEach(link => {
      const linkPath = link.getAttribute('data-path');
      const indicator = link.querySelector('.indicator');
      if (linkPath === hash || (hash === 'swap' && linkPath === 'hostels') || (hash === 'pass' && linkPath === 'hostels') || (hash === 'quiz' && linkPath === 'matches')) {
        link.classList.add('text-primary-container', 'font-bold');
        link.classList.remove('text-outline');
        if (indicator) indicator.style.opacity = '1';
      } else {
        link.classList.remove('text-primary-container', 'font-bold');
        link.classList.add('text-outline');
        if (indicator) indicator.style.opacity = '0';
      }
    });

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Custom tab trigger hooks
    if (hash === 'matches') renderMatches();
    if (hash === 'quiz') renderQuiz();
    if (hash === 'pass') triggerPassConfetti();
    if (hash === 'requests') renderRequests();
    if (hash === 'profile') renderProfile();
    if (hash === 'hostels') renderHostels();
  }

  // --- Gemini AI Analysis & Buffering Spinner Engine ---
  let geminiAnalysisProgressInterval;

  async function startGeminiAnalysis(redirectAfter = true) {
    const overlay = document.getElementById('gemini-analyzing-overlay');
    const mainTitle = document.getElementById('gemini-analyzing-title');
    const subText = document.getElementById('gemini-analyzing-subtext');
    const progressBar = document.getElementById('gemini-analyzing-bar');
    const progressPercent = document.getElementById('gemini-analyzing-percent');

    if (overlay) {
      overlay.classList.remove('hidden', 'opacity-0', 'pointer-events-none');
      overlay.classList.add('flex', 'opacity-100');
    }

    if (mainTitle) {
      mainTitle.textContent = "Google Gemini is analysing your match or data";
    }

    const steps = [
      { text: "Connecting to Google Gemini Flash AI Engine...", pct: 15 },
      { text: "Google Gemini is analysing your match or data across 10 lifestyle questionnaire pillars...", pct: 40 },
      { text: "Evaluating Waknaghat Himalayan climate variables (sleep rhythms, quiet study hours, room heating)...", pct: 70 },
      { text: "Cross-referencing candidate compatibility across Shastri, Parmar & Azad Bhawans...", pct: 88 },
      { text: "Synthesizing AI Match Scores & Personalized Roommate Strategy...", pct: 98 }
    ];

    let stepIndex = 0;
    if (subText && progressBar && progressPercent) {
      subText.textContent = steps[0].text;
      progressBar.style.width = `${steps[0].pct}%`;
      progressPercent.textContent = `${steps[0].pct}%`;

      clearInterval(geminiAnalysisProgressInterval);
      geminiAnalysisProgressInterval = setInterval(() => {
        stepIndex++;
        if (stepIndex < steps.length) {
          subText.textContent = steps[stepIndex].text;
          progressBar.style.width = `${steps[stepIndex].pct}%`;
          progressPercent.textContent = `${steps[stepIndex].pct}%`;
        }
      }, 450);
    }

    try {
      const candidates = JUIT_DATA.students;
      const aiResult = await GeminiService.analyzeMatchesWithGemini(STATE.currentUser, STATE.quizAnswers, candidates);
      
      STATE.aiInsight = aiResult;
      localStorage.setItem('roomiesync_ai_insight', JSON.stringify(aiResult));

      // Finalize progress bar
      if (progressBar && progressPercent && subText) {
        clearInterval(geminiAnalysisProgressInterval);
        progressBar.style.width = '100%';
        progressPercent.textContent = '100%';
        subText.textContent = 'Google Gemini analysis complete! Redirecting to matches...';
      }

      await new Promise(r => setTimeout(r, 650));

      if (overlay) {
        overlay.classList.add('opacity-0', 'pointer-events-none');
        setTimeout(() => {
          overlay.classList.add('hidden');
          overlay.classList.remove('flex');
        }, 300);
      }

      if (redirectAfter) {
        navigateTo('matches');
      } else {
        renderMatches();
      }

      showToast('✨ Google Gemini AI has generated your personalized roommate match insights!', 'auto_awesome', 4000);
    } catch (err) {
      console.error('Error during Gemini analysis:', err);
      clearInterval(geminiAnalysisProgressInterval);
      if (overlay) {
        overlay.classList.add('hidden', 'opacity-0', 'pointer-events-none');
        overlay.classList.remove('flex');
      }
      if (redirectAfter) navigateTo('matches');
      showToast('Roommate scores updated based on lifestyle criteria.');
    }
  }

  // --- Gemini API Key Modal Management ---
  function openGeminiKeyModal() {
    const modal = document.getElementById('gemini-key-modal');
    const input = document.getElementById('gemini-key-input');
    const modelSelect = document.getElementById('gemini-model-select');
    const statusBadge = document.getElementById('gemini-key-status-badge');

    if (!modal) return;
    const currentKey = GeminiService.getApiKey();
    const currentModel = GeminiService.getModel();

    if (input) input.value = currentKey;
    if (modelSelect) modelSelect.value = currentModel;
    if (statusBadge) {
      if (currentKey) {
        statusBadge.innerHTML = `<span class="w-2 h-2 rounded-full bg-secondary"></span><span class="text-secondary font-bold">API Key Active (${currentKey.slice(0, 6)}...${currentKey.slice(-4)})</span>`;
      } else {
        statusBadge.innerHTML = `<span class="w-2 h-2 rounded-full bg-[#E07A5F]"></span><span class="text-[#E07A5F] font-bold">Demo / Simulated Mode Active</span>`;
      }
    }

    modal.classList.remove('opacity-0', 'pointer-events-none');
    modal.classList.add('opacity-100');
    const sheet = modal.querySelector('#gemini-modal-sheet');
    if (sheet) sheet.classList.remove('translate-y-full');
  }

  function closeGeminiKeyModal() {
    const modal = document.getElementById('gemini-key-modal');
    if (!modal) return;
    modal.classList.add('opacity-0', 'pointer-events-none');
    modal.classList.remove('opacity-100');
    const sheet = modal.querySelector('#gemini-modal-sheet');
    if (sheet) sheet.classList.add('translate-y-full');
  }

  function saveGeminiKeyFromModal() {
    const input = document.getElementById('gemini-key-input');
    const modelSelect = document.getElementById('gemini-model-select');
    const keyVal = input ? input.value.trim() : '';
    const modelVal = modelSelect ? modelSelect.value : 'gemini-2.5-flash';

    GeminiService.setApiKey(keyVal);
    GeminiService.setModel(modelVal);
    closeGeminiKeyModal();

    if (keyVal) {
      showToast(`Google Gemini API Key & Model (${modelVal}) saved successfully!`, 'key', 3500);
    } else {
      showToast('API Key cleared. Switched to instant simulated AI mode.', 'info', 3000);
    }
  }

  // --- AI Roommate Advisor Chat Drawer ---
  function toggleAdvisorDrawer(forceOpen = null) {
    const drawer = document.getElementById('ai-advisor-drawer');
    const backdrop = document.getElementById('ai-advisor-backdrop');
    if (!drawer) return;

    const isOpen = !drawer.classList.contains('translate-x-full');
    const shouldOpen = forceOpen !== null ? forceOpen : !isOpen;

    if (shouldOpen) {
      drawer.classList.remove('translate-x-full');
      if (backdrop) {
        backdrop.classList.remove('opacity-0', 'pointer-events-none');
        backdrop.classList.add('opacity-100');
      }
    } else {
      drawer.classList.add('translate-x-full');
      if (backdrop) {
        backdrop.classList.add('opacity-0', 'pointer-events-none');
        backdrop.classList.remove('opacity-100');
      }
    }
  }

  function askAdvisorQuickPrompt(promptText) {
    const input = document.getElementById('ai-advisor-input');
    if (input) {
      input.value = promptText;
      askAdvisorQuestion();
    }
  }

  // AI Advisor Chat with Gemini
  async function askAdvisorQuestion() {
    const input = document.getElementById('ai-advisor-input');
    const container = document.getElementById('ai-advisor-messages');
    if (!input || !input.value.trim() || !container) return;

    const query = input.value.trim();
    input.value = '';

    // Append user message
    container.innerHTML += `
      <div class="flex justify-end">
        <div class="max-w-[85%] bg-primary text-white rounded-2xl rounded-br-xs px-3.5 py-2 text-[12px] shadow-xs">
          ${query}
        </div>
      </div>
    `;
    container.scrollTop = container.scrollHeight;

    // Append loading bubble with buffering spinner
    const loadingId = `advisor-loading-${Date.now()}`;
    container.innerHTML += `
      <div id="${loadingId}" class="flex justify-start items-center gap-2 text-on-surface-variant text-[12px] p-2">
        <div class="w-4 h-4 border-2 border-secondary border-t-transparent rounded-full animate-spin"></div>
        <span class="italic text-[11px] text-secondary font-medium">Google Gemini is analysing your request...</span>
      </div>
    `;
    container.scrollTop = container.scrollHeight;

    try {
      const reply = await GeminiService.askGeminiAdvisor(query);
      const loadingEl = document.getElementById(loadingId);
      if (loadingEl) loadingEl.remove();

      container.innerHTML += `
        <div class="flex justify-start">
          <div class="max-w-[90%] bg-surface-container-low text-on-surface rounded-2xl rounded-bl-xs p-3 text-[12px] shadow-xs leading-relaxed space-y-1 border border-outline-variant/30">
            <div class="flex items-center gap-1 text-[10px] font-bold text-secondary uppercase mb-1">
              <span class="material-symbols-outlined text-[13px]">auto_awesome</span>
              <span>Gemini AI Advisor</span>
            </div>
            <div>${reply.replace(/\n/g, '<br>')}</div>
          </div>
        </div>
      `;
      container.scrollTop = container.scrollHeight;
    } catch (e) {
      const loadingEl = document.getElementById(loadingId);
      if (loadingEl) loadingEl.remove();
      container.innerHTML += `
        <div class="flex justify-start">
          <div class="max-w-[85%] bg-surface-container-low text-on-surface rounded-2xl p-2.5 text-[12px]">
            I can help you analyze hostel blocks or roommate rules. Feel free to ask about Shastri, Parmar, or Azad Bhawan!
          </div>
        </div>
      `;
    }
  }

  // --- Dynamic Compatibility Calculation ---
  function calculateMatchScore(studentAnswers) {
    if (!studentAnswers || Object.keys(STATE.quizAnswers).length === 0) return 85;
    let matches = 0;
    let total = 0;

    for (let i = 1; i <= 10; i++) {
      const key = `q${i}`;
      if (STATE.quizAnswers[key] && studentAnswers[key]) {
        total++;
        if (STATE.quizAnswers[key] === studentAnswers[key]) {
          matches += 1;
        } else {
          // partial matching for harmonious traits
          matches += 0.35;
        }
      }
    }

    if (total === 0) return 88;
    const rawScore = Math.round((matches / total) * 100);
    return Math.min(99, Math.max(65, rawScore));
  }

  // --- Toast Notification System ---
  let toastTimer;
  function showToast(message, icon = 'check_circle', duration = 3000) {
    const toast = document.getElementById('global-toast');
    const msgEl = document.getElementById('global-toast-msg');
    const iconEl = document.getElementById('global-toast-icon');

    if (!toast || !msgEl) return;
    clearTimeout(toastTimer);

    msgEl.innerHTML = message;
    if (iconEl) iconEl.textContent = icon;

    toast.classList.remove('opacity-0', 'pointer-events-none', 'translate-y-4');
    toast.classList.add('opacity-100', 'translate-y-0');

    toastTimer = setTimeout(() => {
      toast.classList.add('opacity-0', 'pointer-events-none', 'translate-y-4');
      toast.classList.remove('opacity-100', 'translate-y-0');
    }, duration);
  }

  // --- Render Components ---

  // 1. Home / Explore View
  function initExploreView() {
    // Occupancy radio select handler
    const occupancyInputs = document.querySelectorAll('input[name="target_preference"]');
    occupancyInputs.forEach(input => {
      input.addEventListener('change', function () {
        const value = this.value;
        STATE.currentUser.occupancyPreference = value;
        saveState();
        updateOccupancyCardStyles();
      });
    });

    updateOccupancyCardStyles();

    // Save Preference button
    const saveBtn = document.getElementById('saveOccupancyBtn');
    if (saveBtn) {
      saveBtn.addEventListener('click', () => {
        saveState();
        showToast('Preferred room occupancy saved and synced with Chief Warden Portal!');
      });
    }
  }

  function updateOccupancyCardStyles() {
    const pref = STATE.currentUser.occupancyPreference || 'single';
    document.querySelectorAll('.occupancy-choice-label').forEach(label => {
      const radio = label.querySelector('input[type="radio"]');
      if (radio && radio.value === pref) {
        radio.checked = true;
        label.classList.add('border-2', 'border-secondary', 'bg-secondary-container/15');
        label.classList.remove('border-outline-variant/50', 'bg-surface-container-low');
      } else {
        label.classList.remove('border-2', 'border-secondary', 'bg-secondary-container/15');
        label.classList.add('border-outline-variant/50', 'bg-surface-container-low');
      }
    });
  }

  // 2. Roommate Matches View
  function renderMatches() {
    const container = document.getElementById('matches-list-container');
    if (!container) return;

    let students = [...JUIT_DATA.students];

    // Filter by Search Query
    if (STATE.searchQuery.trim()) {
      const q = STATE.searchQuery.toLowerCase();
      students = students.filter(s =>
        s.name.toLowerCase().includes(q) ||
        s.id.toLowerCase().includes(q) ||
        s.branch.toLowerCase().includes(q) ||
        s.hostel.toLowerCase().includes(q) ||
        s.tags.some(t => t.toLowerCase().includes(q))
      );
    }

    // Filter by Hostel Block
    if (STATE.selectedHostelFilter !== 'all') {
      students = students.filter(s => s.hostel.toLowerCase().includes(STATE.selectedHostelFilter.toLowerCase()));
    }

    // Filter by Branch
    if (STATE.selectedBranchFilter !== 'all') {
      students = students.filter(s => s.branch.toLowerCase().includes(STATE.selectedBranchFilter.toLowerCase()));
    }

    // Filter by Year
    if (STATE.selectedYearFilter !== 'all') {
      students = students.filter(s => s.year.toLowerCase().includes(STATE.selectedYearFilter.toLowerCase()));
    }

    // Calculate dynamic scores and sort
    const scoredStudents = students.map(s => {
      const score = calculateMatchScore(s.answers);
      return { ...s, dynamicScore: score };
    });

    if (STATE.selectedScoreFilter === '90plus') {
      scoredStudents.sort((a, b) => b.dynamicScore - a.dynamicScore);
    } else {
      scoredStudents.sort((a, b) => b.dynamicScore - a.dynamicScore);
    }

    // Update count badge
    const countEl = document.getElementById('matches-count-label');
    if (countEl) countEl.textContent = `${scoredStudents.length} Compatible JUITians Found`;

    // Render Gemini AI Spotlight Card at the top of Matches if available
    let aiSpotlightHtml = '';
    const aiData = STATE.aiInsight || (function() {
      try { return JSON.parse(localStorage.getItem('roomiesync_ai_insight')); } catch(e) { return null; }
    })();

    if (aiData) {
      aiSpotlightHtml = `
        <div class="col-span-1 md:col-span-2 bg-gradient-to-br from-[#003834] via-primary to-primary-container rounded-3xl p-5 sm:p-6 text-white shadow-xl relative overflow-hidden border border-secondary/30 mb-2">
          <!-- Background Glow Elements -->
          <div class="absolute -right-10 -top-10 w-48 h-48 rounded-full bg-secondary-container/20 blur-3xl pointer-events-none"></div>
          <div class="absolute -left-10 -bottom-10 w-48 h-48 rounded-full bg-tertiary-container/15 blur-3xl pointer-events-none"></div>

          <div class="relative z-10 space-y-3.5">
            <div class="flex items-center justify-between flex-wrap gap-2">
              <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-secondary-fixed text-[11px] font-bold border border-white/10">
                <span class="material-symbols-outlined text-[15px]" style="font-variation-settings: 'FILL' 1;">auto_awesome</span>
                <span>Google Gemini 2.5 Flash • AI Match Synthesis</span>
              </div>
              <button onclick="window.RoomieApp.startGeminiAnalysis(false)" class="px-3 py-1 rounded-full bg-black/30 hover:bg-black/40 text-secondary-fixed text-[11px] font-bold flex items-center gap-1 backdrop-blur-sm transition-colors">
                <span class="material-symbols-outlined text-[14px]">refresh</span>
                <span>Re-Analyze with Gemini</span>
              </button>
            </div>

            <div>
              <h3 class="text-[17px] font-extrabold text-white leading-tight">${aiData.analysisHeadline || 'High Academic Synergy & Balanced Sleep Cycles Synthesized'}</h3>
              <p class="text-[12px] text-surface-variant/90 mt-1 leading-relaxed">${aiData.overallVibe || ''}</p>
            </div>

            <!-- Top AI Match Highlights Grid -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div class="bg-black/25 backdrop-blur-md p-3.5 rounded-2xl border border-white/10 space-y-1">
                <span class="text-[10px] font-bold uppercase text-secondary-fixed tracking-wider flex items-center gap-1">
                  <span class="material-symbols-outlined text-[13px]">verified</span> Why ${aiData.topRecommendation?.studentName || 'Aryan'} is your best match
                </span>
                <p class="text-[11px] text-white/90 leading-snug">${aiData.topRecommendation?.whyBestMatch || ''}</p>
              </div>

              <div class="bg-black/25 backdrop-blur-md p-3.5 rounded-2xl border border-white/10 space-y-1">
                <span class="text-[10px] font-bold uppercase text-tertiary-container tracking-wider flex items-center gap-1">
                  <span class="material-symbols-outlined text-[13px]">thermostat</span> Waknaghat Winter Living Strategy
                </span>
                <p class="text-[11px] text-white/90 leading-snug">${aiData.dormLivingInsight || ''}</p>
              </div>
            </div>

            ${aiData.icebreakerQuestions && aiData.icebreakerQuestions.length > 0 ? `
              <div class="pt-2 border-t border-white/15 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <span class="text-[11px] text-surface-variant font-medium">💡 Suggested Icebreaker: <em>${aiData.icebreakerQuestions[0]}</em></span>
                <button onclick="window.RoomieApp.openChatWith('${aiData.topRecommendation?.studentId || '211429'}')" class="px-3.5 py-1.5 rounded-full bg-secondary-fixed hover:bg-secondary-container text-on-secondary-fixed text-[11px] font-bold shrink-0 transition-colors">
                  Send in Chat
                </button>
              </div>
            ` : ''}
          </div>
        </div>
      `;
    }

    if (scoredStudents.length === 0) {
      container.innerHTML = `
        ${aiSpotlightHtml}
        <div class="col-span-1 md:col-span-2 bg-surface-container-lowest rounded-2xl p-8 text-center flex flex-col items-center justify-center border border-outline-variant/30">
          <span class="material-symbols-outlined text-[48px] text-outline mb-2">person_search</span>
          <h3 class="font-headline-sm text-primary font-bold">No Match Found</h3>
          <p class="font-body-sm text-on-surface-variant max-w-sm mt-1">Try clearing filters or search by roll number (e.g. 211429).</p>
          <button onclick="window.RoomieApp.filterMatchesByHostel('all')" class="mt-4 px-5 py-2 rounded-full bg-primary text-on-primary font-label-md">Reset Filters</button>
        </div>
      `;
      return;
    }

    const cardsHtml = scoredStudents.map(student => {
      const score = student.dynamicScore;
      let scoreLabel = 'Great Fit';
      let scoreColor = 'bg-secondary-container text-on-secondary-container';
      if (score >= 95) scoreLabel = 'Exceptional';
      else if (score >= 90) scoreLabel = 'High Sync';
      else if (score < 80) {
        scoreLabel = 'Moderate';
        scoreColor = 'bg-surface-container-high text-on-surface';
      }

      const hasSentRequest = STATE.requests.some(r => r.senderRoll === student.id && r.type === 'outgoing');

      return `
        <article class="bg-surface-container-lowest rounded-[24px] p-5 shadow-[0_4px_20px_-2px_rgba(0,89,83,0.06),0_2px_6px_-1px_rgba(0,89,83,0.03)] border border-outline-variant/30 relative overflow-hidden match-card">
          <div class="flex items-start justify-between gap-3">
            <div class="flex items-center gap-3.5 min-w-0">
              <div class="relative flex-shrink-0">
                <img class="w-14 h-14 rounded-2xl object-cover ring-2 ring-primary/10 shadow-sm" src="${student.avatar}" alt="${student.name}">
                <span class="absolute -bottom-1 -right-1 w-5 h-5 bg-secondary-container rounded-full flex items-center justify-center shadow-xs">
                  <span class="material-symbols-outlined text-[13px] text-primary" style="font-variation-settings: 'FILL' 1;">verified</span>
                </span>
              </div>
              <div class="flex flex-col min-w-0">
                <div class="flex items-center gap-1.5 flex-wrap">
                  <h2 class="font-headline-sm text-headline-sm text-primary font-bold truncate">${student.name}</h2>
                  <span class="bg-surface-container text-on-surface-variant font-label-sm text-label-sm px-2 py-0.5 rounded-md font-semibold">#${student.id}</span>
                </div>
                <p class="font-body-sm text-body-sm text-on-surface-variant truncate">${student.branch} • ${student.year}</p>
                <div class="flex items-center gap-1 text-secondary mt-0.5">
                  <span class="material-symbols-outlined text-[15px]">hotel</span>
                  <span class="font-label-sm text-label-sm font-semibold truncate">${student.hostelDetail}</span>
                </div>
              </div>
            </div>
            
            <div class="flex flex-col items-end flex-shrink-0">
              <div class="${scoreColor} px-3 py-1 rounded-full flex items-center gap-1 shadow-sm">
                <span class="material-symbols-outlined text-[15px]" style="font-variation-settings: 'FILL' 1;">bolt</span>
                <span class="font-label-md text-label-md font-bold">${score}% Match</span>
              </div>
              <span class="font-label-sm text-label-sm text-on-surface-variant mt-1">${scoreLabel}</span>
            </div>
          </div>

          <!-- Compatibility Progress Bar -->
          <div class="mt-3.5 w-full">
            <div class="w-full bg-surface-container-high h-2.5 rounded-full overflow-hidden">
              <div class="bg-gradient-to-r from-secondary to-primary-container h-full rounded-full transition-all duration-500" style="width: ${score}%"></div>
            </div>
          </div>

          <!-- Match Highlights Pill -->
          <div class="mt-3 bg-surface-container-low px-3.5 py-2 rounded-xl flex items-center gap-2 text-primary font-label-sm text-label-sm">
            <span class="material-symbols-outlined text-[16px] text-secondary">handshake</span>
            <span class="truncate"><strong>Shared match:</strong> ${student.sharedMatch}</span>
          </div>

          <!-- Lifestyle Chips -->
          <div class="mt-3 flex flex-wrap gap-1.5">
            ${student.tags.map(tag => `
              <span class="bg-surface-container text-on-surface font-label-sm text-label-sm px-2.5 py-1 rounded-full flex items-center gap-1">
                ${tag}
              </span>
            `).join('')}
          </div>

          <!-- Action Buttons -->
          <div class="mt-4 pt-3 border-t border-surface-variant/40 flex items-center gap-2.5">
            ${hasSentRequest ? `
              <button disabled class="flex-1 h-11 bg-secondary-container text-on-secondary-container font-label-lg text-label-lg rounded-full flex items-center justify-center gap-1.5 opacity-90 cursor-default">
                <span class="material-symbols-outlined text-[18px]">check_circle</span>
                <span>Request Dispatched</span>
              </button>
            ` : `
              <button class="flex-1 h-11 bg-primary hover:bg-primary-container text-on-primary font-label-lg text-label-lg rounded-full flex items-center justify-center gap-1.5 shadow-sm active:scale-95 transition-all" onclick="window.RoomieApp.openRoomieModal('${student.name} (#${student.id})', '${student.hostelDetail}', '${score}%', '${student.id}')">
                <span class="material-symbols-outlined text-[18px]">person_add</span>
                <span>Send Roomie Request</span>
              </button>
            `}
            <button class="h-11 px-4 bg-surface-container text-primary font-label-md rounded-full flex items-center justify-center gap-1 hover:bg-surface-container-high transition-colors" onclick="window.RoomieApp.openChatWith('${student.id}')" title="Chat with ${student.name}">
              <span class="material-symbols-outlined text-[18px]">chat</span>
              <span class="hidden sm:inline">Message</span>
            </button>
          </div>
        </article>
      `;
    }).join('');

    container.innerHTML = aiSpotlightHtml + cardsHtml;
  }

  // 3. 10-Question Compatibility Quiz Engine
  function renderQuiz() {
    const form = document.getElementById('compatibility-quiz-form');
    if (!form) return;

    form.innerHTML = JUIT_DATA.quizQuestions.map(q => {
      const currentVal = STATE.quizAnswers[`q${q.id}`];
      return `
        <div class="bg-surface-container-lowest rounded-2xl p-5 shadow-sm flex flex-col gap-3.5 quiz-card border border-outline-variant/30 question-card" data-qid="${q.id}">
          <div class="flex items-start justify-between gap-2">
            <div class="flex items-center gap-2.5">
              <span class="w-7 h-7 rounded-full bg-primary-container text-on-primary font-label-md text-label-md flex items-center justify-center font-bold">${q.id}</span>
              <span class="font-headline-sm text-headline-sm text-on-surface font-bold">${q.factor}</span>
            </div>
            <span class="status-indicator ${currentVal ? 'opacity-100 text-secondary' : 'opacity-0'} material-symbols-outlined text-[22px]">check_circle</span>
          </div>
          <p class="font-body-sm text-body-sm text-on-surface-variant">${q.description}</p>
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            ${q.options.map(opt => {
              const isChecked = currentVal === opt.value;
              return `
                <label class="quiz-option-label cursor-pointer ${isChecked ? 'selected' : 'bg-surface-container-low'} rounded-xl p-3.5 flex flex-col justify-between transition-all">
                  <div class="flex items-start justify-between gap-2 mb-2">
                    <div class="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center text-primary">
                      <span class="material-symbols-outlined text-[20px]">${opt.icon}</span>
                    </div>
                    <input type="radio" name="q${q.id}" value="${opt.value}" ${isChecked ? 'checked' : ''} class="accent-primary w-4 h-4 mt-1">
                  </div>
                  <div>
                    <span class="font-label-md text-label-md text-on-surface font-bold block">${opt.title}</span>
                    <span class="font-body-sm text-body-sm text-on-surface-variant block mt-0.5 leading-snug">${opt.subtitle}</span>
                  </div>
                </label>
              `;
            }).join('')}
          </div>
        </div>
      `;
    }).join('');

    // Attach change listener to form
    form.onchange = function (e) {
      const qCard = e.target.closest('.question-card');
      if (qCard) {
        const qid = qCard.getAttribute('data-qid');
        STATE.quizAnswers[`q${qid}`] = e.target.value;
        saveState();
        updateQuizProgress();
      }
    };

    updateQuizProgress();
  }

  function updateQuizProgress() {
    let answered = 0;
    const total = JUIT_DATA.quizQuestions.length;

    for (let i = 1; i <= total; i++) {
      const card = document.querySelector(`.question-card[data-qid="${i}"]`);
      const val = STATE.quizAnswers[`q${i}`];
      if (val) {
        answered++;
        if (card) {
          const statusIcon = card.querySelector('.status-indicator');
          if (statusIcon) statusIcon.classList.remove('opacity-0');
          card.querySelectorAll('.quiz-option-label').forEach(opt => {
            const radio = opt.querySelector('input[type="radio"]');
            if (radio && radio.value === val) {
              opt.classList.add('selected');
              opt.classList.remove('bg-surface-container-low');
            } else {
              opt.classList.remove('selected');
              opt.classList.add('bg-surface-container-low');
            }
          });
        }
      }
    }

    const percent = Math.round((answered / total) * 100);
    const pBar = document.getElementById('quiz-progress-bar');
    const pText = document.getElementById('quiz-progress-text');
    const pBadge = document.getElementById('quiz-percentage-badge');

    if (pBar) pBar.style.width = `${percent}%`;
    if (pText) pText.innerText = `${answered} of ${total} Answered`;
    if (pBadge) pBadge.innerText = `${percent}% Ready`;

    const submitBtn = document.getElementById('submit-quiz-btn');
    if (submitBtn) {
      if (answered === 10) {
        submitBtn.innerHTML = `<span>Save & Analyze with Google Gemini AI</span><span class="material-symbols-outlined text-[20px]" style="font-variation-settings: 'FILL' 1;">auto_awesome</span>`;
      }
    }
  }

  // Quick Auto-fill for instant gratification testing
  function quickFillQuiz() {
    const sampleChoices = {
      q1: 'balanced',
      q2: 'lofi',
      q3: 'tidy',
      q4: 'fresh_air',
      q5: 'occasional',
      q6: 'ask_first',
      q7: 'pure_veg',
      q8: 'gaming_tech',
      q9: 'clubs_out',
      q10: 'calm_talk'
    };

    STATE.quizAnswers = { ...sampleChoices };
    saveState();
    renderQuiz();
    showToast('Auto-filled with balanced JUIT student profile answers!');
  }

  // 4. Hostels Directory View
  function renderHostels() {
    const container = document.getElementById('hostels-grid-container');
    if (!container) return;

    container.innerHTML = JUIT_DATA.hostels.map(h => `
      <div class="bg-surface-container-lowest rounded-3xl overflow-hidden shadow-sm border border-outline-variant/30 flex flex-col group hover:shadow-md transition-all">
        <div class="relative h-48 w-full overflow-hidden">
          <img src="${h.image}" alt="${h.name}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
          <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
          <div class="absolute top-3 left-3">
            <span class="px-3 py-1 rounded-full bg-surface-container-lowest/90 backdrop-blur-md text-primary font-label-sm font-bold shadow-sm">
              ${h.type}
            </span>
          </div>
          <div class="absolute top-3 right-3">
            <span class="px-2.5 py-1 rounded-full bg-secondary-container text-on-secondary-container font-label-sm font-bold shadow-sm flex items-center gap-1">
              <span class="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
              ${h.vacancies} Vacancies
            </span>
          </div>
          <div class="absolute bottom-3 left-3 right-3 text-white">
            <h3 class="font-headline-md text-headline-md font-bold leading-tight">${h.name}</h3>
            <p class="font-body-sm text-[12px] text-surface-variant/90">${h.wings} • Capacity: ${h.capacity}</p>
          </div>
        </div>

        <div class="p-5 flex-1 flex flex-col justify-between gap-3">
          <p class="font-body-sm text-body-sm text-on-surface-variant">${h.description}</p>
          
          <div class="space-y-1.5 pt-1">
            <div class="flex items-center gap-2 text-body-sm text-on-surface">
              <span class="material-symbols-outlined text-[16px] text-secondary">admin_panel_settings</span>
              <span class="font-medium truncate"><strong class="text-primary">Warden:</strong> ${h.warden}</span>
            </div>
            <div class="flex items-center gap-2 text-body-sm text-on-surface">
              <span class="material-symbols-outlined text-[16px] text-secondary">support_agent</span>
              <span class="font-medium"><strong class="text-primary">Caretaker:</strong> ${h.caretaker}</span>
            </div>
          </div>

          <div class="flex flex-wrap gap-1.5 pt-2">
            ${h.amenities.map(a => `
              <span class="px-2 py-0.5 rounded-lg bg-surface-container text-on-surface-variant font-label-sm text-[11px]">${a}</span>
            `).join('')}
          </div>

          <div class="pt-3 border-t border-surface-variant/50 flex items-center justify-between gap-2">
            <button class="flex-1 py-2 rounded-full bg-surface-container text-primary font-label-md text-[12px] hover:bg-surface-container-high transition-colors" onclick="window.RoomieApp.filterMatchesByHostel('${h.id}')">
              View Residents
            </button>
            <button class="flex-1 py-2 rounded-full bg-primary text-on-primary font-label-md text-[12px] hover:bg-primary-container transition-colors" onclick="window.RoomieApp.openRoomSwapWithHostel('${h.name}')">
              Request Block Swap
            </button>
          </div>
        </div>
      </div>
    `).join('');
  }

  // 5. Requests & Live Chat View
  function renderRequests() {
    const listEl = document.getElementById('requests-inbox-list');
    if (listEl) {
      listEl.innerHTML = STATE.requests.map(req => `
        <div class="bg-surface-container-lowest rounded-2xl p-4 shadow-sm border border-outline-variant/30 flex flex-col gap-3">
          <div class="flex items-start justify-between gap-3">
            <div class="flex items-center gap-3">
              <img src="${req.avatar}" class="w-12 h-12 rounded-xl object-cover" alt="${req.senderName}">
              <div>
                <div class="flex items-center gap-1.5">
                  <h4 class="font-headline-sm text-[15px] font-bold text-primary">${req.senderName}</h4>
                  <span class="bg-secondary-container text-on-secondary-container px-2 py-0.5 rounded-full text-label-sm font-bold">${req.matchScore}</span>
                </div>
                <p class="font-body-sm text-[12px] text-on-surface-variant">${req.senderBranch} • #${req.senderRoll}</p>
                <p class="font-body-sm text-[11px] text-secondary font-medium">${req.senderHostel}</p>
              </div>
            </div>
            <span class="text-outline text-label-sm">${req.time}</span>
          </div>

          <p class="font-body-sm text-body-sm text-on-surface bg-surface-container-low p-3 rounded-xl italic">
            "${req.message}"
          </p>

          <div class="flex items-center justify-between gap-2 pt-1">
            ${req.status === 'pending' ? `
              <button class="flex-1 py-2 rounded-full bg-surface-container text-error font-label-md text-[12px] hover:bg-surface-container-high transition-colors" onclick="window.RoomieApp.handleRequestAction('${req.id}', 'reject')">
                Decline
              </button>
              <button class="flex-1 py-2 rounded-full bg-primary text-on-primary font-label-md text-[12px] hover:bg-primary-container shadow-sm transition-colors" onclick="window.RoomieApp.handleRequestAction('${req.id}', 'accept')">
                Accept & Lock Duo
              </button>
            ` : req.status === 'accepted' ? `
              <span class="text-secondary font-label-md font-bold flex items-center gap-1">
                <span class="material-symbols-outlined text-[16px]">verified</span> Accepted & Paired
              </span>
              <button class="px-4 py-1.5 rounded-full bg-surface-container text-primary font-label-md text-[12px]" onclick="window.RoomieApp.openChatWith('${req.senderRoll}')">
                Open Chat
              </button>
            ` : `
              <span class="text-outline font-label-sm">Declined</span>
            `}
          </div>
        </div>
      `).join('');
    }

    renderChatMessages();
  }

  function renderChatMessages() {
    const chatContainer = document.getElementById('chat-messages-container');
    const chatHeader = document.getElementById('chat-active-header');
    if (!chatContainer) return;

    const user = JUIT_DATA.students.find(s => s.id === STATE.activeChatUser) || JUIT_DATA.students[0];
    if (chatHeader) {
      chatHeader.innerHTML = `
        <div class="flex items-center gap-3">
          <img src="${user.avatar}" class="w-10 h-10 rounded-full object-cover" alt="${user.name}">
          <div>
            <h4 class="font-headline-sm text-on-surface font-bold text-[14px]">${user.name}</h4>
            <span class="font-label-sm text-[11px] text-secondary font-medium">Online • ${user.hostelDetail}</span>
          </div>
        </div>
        <span class="bg-secondary-container text-on-secondary-container px-2.5 py-1 rounded-full text-label-sm font-bold">${user.baseMatchScore}% Match</span>
      `;
    }

    const messages = STATE.chats[STATE.activeChatUser] || [
      { sender: 'them', text: `Hi Raj! I saw our compatibility score. Would love to room together in ${user.hostel}.`, time: '10:00 AM' }
    ];

    chatContainer.innerHTML = messages.map(m => `
      <div class="flex ${m.sender === 'me' ? 'justify-end' : 'justify-start'}">
        <div class="max-w-[80%] rounded-2xl px-4 py-2.5 ${m.sender === 'me' ? 'bg-primary text-on-primary rounded-br-xs' : 'bg-surface-container-low text-on-surface rounded-bl-xs'} shadow-xs">
          <p class="font-body-sm text-body-sm leading-relaxed">${m.text}</p>
          <span class="text-[10px] ${m.sender === 'me' ? 'text-primary-fixed-dim' : 'text-outline'} block text-right mt-1">${m.time}</span>
        </div>
      </div>
    `).join('');

    chatContainer.scrollTop = chatContainer.scrollHeight;
  }

  function sendChatMessage() {
    const input = document.getElementById('chat-input-field');
    if (!input || !input.value.trim()) return;

    const text = input.value.trim();
    input.value = '';

    if (!STATE.chats[STATE.activeChatUser]) {
      STATE.chats[STATE.activeChatUser] = [];
    }

    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    STATE.chats[STATE.activeChatUser].push({
      sender: 'me',
      text: text,
      time: timeStr
    });

    saveState();
    renderChatMessages();

    // Simulated auto-reply after 1 second
    setTimeout(() => {
      const replies = [
        "Sounds great! I'll verify the room keys with the warden office.",
        "Awesome! Let me submit our mutual consent on RoomieSync.",
        "Perfect! Excited for the upcoming semester in JUIT.",
        "Sure, let's catch up over evening chai at the Tuck Shop!"
      ];
      const randomReply = replies[Math.floor(Math.random() * replies.length)];
      STATE.chats[STATE.activeChatUser].push({
        sender: 'them',
        text: randomReply,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      });
      saveState();
      renderChatMessages();
    }, 1200);
  }

  // 6. Student Profile View
  function renderProfile() {
    const user = STATE.currentUser;
    const nameEl = document.getElementById('profile-student-name');
    const rollEl = document.getElementById('profile-student-roll');
    const branchEl = document.getElementById('profile-student-branch');
    const hostelEl = document.getElementById('profile-student-hostel');
    const bioEl = document.getElementById('profile-student-bio');
    const tagsContainer = document.getElementById('profile-tags-container');

    if (nameEl) nameEl.textContent = user.name;
    if (rollEl) rollEl.textContent = `#${user.id}`;
    if (branchEl) branchEl.textContent = `${user.branch} • ${user.year}`;
    if (hostelEl) hostelEl.textContent = `${user.hostelDetail} • ${user.room ? 'Room ' + user.room : ''}`;
    if (bioEl) bioEl.textContent = user.bio || 'JUIT Scholar';

    if (tagsContainer) {
      tagsContainer.innerHTML = (user.tags || []).map(t => `
        <span class="px-3 py-1 rounded-full bg-surface-container text-on-surface font-label-sm text-label-sm">
          ${t}
        </span>
      `).join('');
    }
  }

  // 7. Confetti Canvas for Sanction Pass
  function triggerPassConfetti() {
    const canvas = document.getElementById('pass-confetti-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = canvas.parentElement.offsetWidth || 400;
    canvas.height = canvas.parentElement.offsetHeight || 300;

    const colors = ['#98f3e7', '#88cdc5', '#ffffff', '#ffdbd2', '#a9f0e7', '#e07a5f'];
    const particles = [];
    const count = 50;

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height * 0.8,
        r: Math.random() * 4 + 2,
        d: Math.random() * count,
        color: colors[Math.floor(Math.random() * colors.length)],
        tilt: Math.floor(Math.random() * 10) - 10,
        tiltInc: Math.random() * 0.07 + 0.05,
        tiltAngle: 0
      });
    }

    let animationFrame;
    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < count; i++) {
        const p = particles[i];
        ctx.beginPath();
        ctx.lineWidth = p.r / 2;
        ctx.strokeStyle = p.color;
        ctx.moveTo(p.x + p.tilt + p.r, p.y);
        ctx.lineTo(p.x + p.tilt, p.y + p.tilt + p.r);
        ctx.stroke();

        p.tiltAngle += p.tiltInc;
        p.y += (Math.cos(p.d) + 1 + p.r / 2) / 2;
        p.x += Math.sin(p.d) * 0.5;
        p.tilt = Math.sin(p.tiltAngle) * 8;

        if (p.y > canvas.height) {
          p.y = -10;
          p.x = Math.random() * canvas.width;
        }
      }
      animationFrame = requestAnimationFrame(draw);
    }
    draw();
  }

  // --- Modals Management ---
  function openRoomieModal(targetName, targetHostel, matchScore, studentId) {
    const modal = document.getElementById('roomie-request-modal');
    const title = document.getElementById('modal-recipient-subtitle');
    const hostelField = document.getElementById('modal-hostel-field');
    const scoreBadge = document.getElementById('modal-score-badge');

    if (title) title.textContent = `Targeting ${targetName} • ${targetHostel}`;
    if (hostelField) hostelField.value = targetHostel;
    if (scoreBadge) scoreBadge.textContent = matchScore;

    modal.dataset.targetId = studentId || '211429';
    modal.dataset.targetName = targetName;
    modal.dataset.targetHostel = targetHostel;
    modal.dataset.targetScore = matchScore;

    modal.classList.remove('opacity-0', 'pointer-events-none');
    modal.classList.add('opacity-100');
    const sheet = modal.querySelector('#modal-sheet');
    if (sheet) sheet.classList.remove('translate-y-full');
  }

  function closeRoomieModal() {
    const modal = document.getElementById('roomie-request-modal');
    if (!modal) return;
    modal.classList.add('opacity-0', 'pointer-events-none');
    modal.classList.remove('opacity-100');
    const sheet = modal.querySelector('#modal-sheet');
    if (sheet) sheet.classList.add('translate-y-full');
  }

  function openWardenGrievanceModal() {
    const modal = document.getElementById('warden-grievance-modal');
    if (!modal) return;
    modal.classList.remove('opacity-0', 'pointer-events-none');
    modal.classList.add('opacity-100');
    const sheet = modal.querySelector('#warden-modal-sheet');
    if (sheet) sheet.classList.remove('translate-y-full');
  }

  function closeWardenGrievanceModal() {
    const modal = document.getElementById('warden-grievance-modal');
    if (!modal) return;
    modal.classList.add('opacity-0', 'pointer-events-none');
    modal.classList.remove('opacity-100');
    const sheet = modal.querySelector('#warden-modal-sheet');
    if (sheet) sheet.classList.add('translate-y-full');
  }

  // --- Persona Switcher ---
  function switchPersona(personaId) {
    const p = JUIT_DATA.personas.find(x => x.id === personaId);
    if (!p) return;

    STATE.currentUser = {
      ...STATE.currentUser,
      id: p.id,
      name: p.name,
      avatar: p.avatar,
      initials: p.initials,
      gender: p.gender,
      branch: p.branch,
      year: p.year,
      hostelDetail: p.hostel,
      room: p.room
    };

    saveState();
    updateUserDisplay();
    showToast(`Switched active profile to ${p.name} (#${p.id})`);
    if (STATE.activeTab === 'explore') initExploreView();
    if (STATE.activeTab === 'profile') renderProfile();
    if (STATE.activeTab === 'matches') renderMatches();
  }

  function updateUserDisplay() {
    const u = STATE.currentUser;
    document.querySelectorAll('.user-display-name').forEach(el => el.textContent = u.name);
    document.querySelectorAll('.user-display-id').forEach(el => el.textContent = `ID: ${u.id}`);
    document.querySelectorAll('.user-display-branch').forEach(el => el.textContent = `${u.branch} • ${u.year}`);
    document.querySelectorAll('.user-display-hostel').forEach(el => el.textContent = u.hostelDetail);
    document.querySelectorAll('.user-display-avatar').forEach(img => {
      if (img.tagName === 'IMG') img.src = u.avatar;
    });
    document.querySelectorAll('.user-display-initials').forEach(el => el.textContent = u.initials || 'RS');
  }

  // --- Global Event Bindings ---
  function initEvents() {
    // Hash change routing
    window.addEventListener('hashchange', () => {
      navigateTo(window.location.hash);
    });

    // Mobile Viewport Switcher
    const toggleBtn = document.getElementById('viewport-toggle-btn');
    const wrapper = document.getElementById('app-viewport-wrapper');
    if (toggleBtn && wrapper) {
      toggleBtn.addEventListener('click', () => {
        STATE.isMobileMode = !STATE.isMobileMode;
        if (STATE.isMobileMode) {
          wrapper.classList.add('mobile-mode');
          toggleBtn.innerHTML = '<span class="material-symbols-outlined text-[18px]">desktop_windows</span><span>Desktop View</span>';
          showToast('Switched to Mobile Frame Preview');
        } else {
          wrapper.classList.remove('mobile-mode');
          toggleBtn.innerHTML = '<span class="material-symbols-outlined text-[18px]">smartphone</span><span>Mobile Preview</span>';
          showToast('Switched to Desktop Native View');
        }
      });
    }

    // Global Search Input
    const searchInputs = document.querySelectorAll('.global-search-input');
    searchInputs.forEach(input => {
      input.addEventListener('input', function () {
        STATE.searchQuery = this.value;
        if (STATE.activeTab !== 'matches') {
          window.location.hash = 'matches';
        } else {
          renderMatches();
        }
      });
    });

    // Roomie Request Form Submission
    const reqForm = document.getElementById('roomie-request-form');
    if (reqForm) {
      reqForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const modal = document.getElementById('roomie-request-modal');
        const targetId = modal.dataset.targetId || '211429';
        const targetName = modal.dataset.targetName || 'Aryan Kapoor';
        const note = reqForm.querySelector('textarea').value;
        const handle = reqForm.querySelector('input[type="text"]').value;

        // Add outgoing request to STATE
        STATE.requests.unshift({
          id: `REQ-${Date.now()}`,
          senderName: targetName.split(' (')[0],
          senderRoll: targetId,
          senderBranch: 'B.Tech CSE 3rd Year',
          senderHostel: modal.dataset.targetHostel || 'Shastri Bhawan',
          avatar: JUIT_DATA.students.find(s => s.id === targetId)?.avatar || JUIT_DATA.students[0].avatar,
          matchScore: modal.dataset.targetScore || '95%',
          message: note || 'Sent roommate pairing request for upcoming allotment.',
          status: 'pending',
          time: 'Just now',
          type: 'outgoing'
        });

        saveState();
        closeRoomieModal();
        showToast(`Roomie request dispatched to ${targetName.split(' (')[0]}!`);
        renderMatches();
      });
    }

    // Warden Grievance Form Submission
    const grievanceForm = document.getElementById('warden-grievance-form');
    if (grievanceForm) {
      grievanceForm.addEventListener('submit', function (e) {
        e.preventDefault();
        closeWardenGrievanceModal();
        showToast('Grievance logged with Chief Warden Dr. Neel Kanth. Ref #GRV-2025-091', 'support_agent', 4000);
      });
    }

    // Notification dropdown toggle
    const notifBtn = document.getElementById('notifications-btn');
    const notifPanel = document.getElementById('notifications-dropdown');
    if (notifBtn && notifPanel) {
      notifBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        notifPanel.classList.toggle('hidden');
      });
      document.addEventListener('click', (e) => {
        if (!notifPanel.contains(e.target) && !notifBtn.contains(e.target)) {
          notifPanel.classList.add('hidden');
        }
      });
    }

    // Gentle Reminder Button in Swap Screen
    const reminderBtn = document.getElementById('swapReminderBtn');
    if (reminderBtn) {
      reminderBtn.addEventListener('click', function () {
        const btnText = document.getElementById('reminderBtnText');
        if (btnText) btnText.textContent = 'Dispatching reminder to Dr. Neel Kanth...';
        this.disabled = true;

        setTimeout(() => {
          if (btnText) btnText.textContent = 'Reminder Dispatched (JUIT Mail Queue #609)';
          this.classList.remove('bg-surface-container', 'text-primary');
          this.classList.add('bg-secondary-container', 'text-on-secondary-container');
          showToast('Gentle reminder sent to JUIT Chief Warden Desk!');
        }, 800);
      });
    }

    // Login Form Submission
    const loginForm = document.getElementById('student-login-form');
    if (loginForm) {
      loginForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const email = document.getElementById('login-email').value;
        const roll = email.split('@')[0] || '221450';
        const hostelSelect = document.getElementById('allottedHostel');
        const hostelName = hostelSelect ? hostelSelect.options[hostelSelect.selectedIndex].text : 'Shastri Bhawan';

        STATE.isLoggedIn = true;
        STATE.currentUser.id = roll;
        STATE.currentUser.email = email;
        STATE.currentUser.hostelDetail = hostelName;
        saveState();

        showToast(`Welcome back, ${STATE.currentUser.name}! Logged in via Webkiosk.`);
        navigateTo('explore');
      });
    }
  }

  // --- Initialize App ---
  function init() {
    loadState();
    updateUserDisplay();
    initExploreView();
    initEvents();

    // Default to explore if no hash or hash is empty
    const initialHash = window.location.hash ? window.location.hash : '#explore';
    navigateTo(initialHash);
  }

  // Expose API to window for inline onclick attributes
  window.RoomieApp = {
    navigateTo,
    showToast,
    quickFillQuiz,
    startGeminiAnalysis,
    openGeminiKeyModal,
    closeGeminiKeyModal,
    saveGeminiKeyFromModal,
    toggleAdvisorDrawer,
    askAdvisorQuestion,
    askAdvisorQuickPrompt,
    openRoomieModal,
    closeRoomieModal,
    openWardenGrievanceModal,
    closeWardenGrievanceModal,
    switchPersona,
    sendChatMessage,
    renderMatches,
    handleScoreSort: function(val) {
      STATE.selectedScoreFilter = val;
      renderMatches();
    },
    filterMatchesByHostel: function (hostelId) {
      STATE.selectedHostelFilter = hostelId;
      if (STATE.activeTab !== 'matches') {
        navigateTo('matches');
      } else {
        renderMatches();
      }
    },
    filterMatchesByBranch: function (branch) {
      STATE.selectedBranchFilter = branch;
      renderMatches();
    },
    openRoomSwapWithHostel: function (hostelName) {
      navigateTo('swap');
      showToast(`Reviewing swap plans into ${hostelName}`);
    },
    openChatWith: function (studentId) {
      STATE.activeChatUser = studentId;
      navigateTo('requests');
    },
    handleRequestAction: function (reqId, action) {
      const req = STATE.requests.find(r => r.id === reqId);
      if (req) {
        req.status = action === 'accept' ? 'accepted' : 'rejected';
        saveState();
        renderRequests();
        if (action === 'accept') {
          showToast(`Pairing confirmed with ${req.senderName}! Room lock requested.`);
        } else {
          showToast(`Request from ${req.senderName} declined.`);
        }
      }
    },
    selectOccupancyChip: function (btn) {
      document.querySelectorAll('.modal-occupancy-chip').forEach(b => {
        b.classList.remove('bg-primary', 'text-on-primary');
        b.classList.add('bg-surface-container', 'text-on-surface-variant');
      });
      btn.classList.add('bg-primary', 'text-on-primary');
      btn.classList.remove('bg-surface-container', 'text-on-surface-variant');
    },
    logout: function () {
      STATE.isLoggedIn = false;
      navigateTo('login');
      showToast('Logged out of RoomieSync.');
    }
  };

  // Run when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
