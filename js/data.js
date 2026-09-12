// RoomieSync - JUIT Campus Living Companion Data Store

const JUIT_DATA = {
  currentUser: {
    id: "221450",
    name: "Raj Sharma",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDL5VQ-EQERW86NV8XgmGuO2Sh8-mWal4Xnm7IhNkGYfCI5Vt0VElYAHye1gR69zkUQHCy16PqD89x7n7oKM2Xd0LZ2xy0iCKbNKqbUy4xo1rPHY9vjQMOXR3NNgvuu0ntolDrgfrUCKAyy-gYGcNfSZQKzrrEQX_aIiqoV5lM5oRvnBBfLNsLiovcvHPvULFhqDvrFhTeunMj5fzUZt3ZwdUOSmyFZPa6z1JDe3_Kh95wQTPC0vld6iDxhAX6PhOxo1A",
    initials: "RS",
    gender: "male",
    branch: "B.Tech CSE",
    year: "3rd Year",
    section: "Sec A",
    email: "221450@juit.ac.in",
    hostel: "Shastri Bhawan",
    hostelDetail: "Shastri Bhawan H-2",
    floor: "2nd Floor",
    room: "204",
    occupancyPreference: "single", // "single", "double", "triple"
    currentRoommate: "Rohan Verma (#221014)",
    verified: true,
    quizAnswers: {
      q1: "balanced",
      q2: "lofi",
      q3: "tidy",
      q4: "fresh_air",
      q5: "occasional",
      q6: "ask_first",
      q7: "pure_veg",
      q8: "gaming_tech",
      q9: "clubs_out",
      q10: "calm_talk"
    },
    bio: "CSE junior passionate about Full-Stack web dev & AI. Sleep on time, love keeping the study table clean, and occasional chai runs to Waknaghat dhabas.",
    tags: ["🌙 Balanced Routine", "🧹 Super Tidy", "🎧 Lofi & Code", "🥗 Pure Veg", "☕ Chai Lover", "❄️ Hill Breeze Lover"]
  },

  personas: [
    {
      id: "221450",
      name: "Raj Sharma",
      gender: "male",
      branch: "B.Tech CSE",
      year: "3rd Year",
      hostel: "Shastri Bhawan H-2",
      room: "204",
      occupancy: "Double (2-Seater)",
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDL5VQ-EQERW86NV8XgmGuO2Sh8-mWal4Xnm7IhNkGYfCI5Vt0VElYAHye1gR69zkUQHCy16PqD89x7n7oKM2Xd0LZ2xy0iCKbNKqbUy4xo1rPHY9vjQMOXR3NNgvuu0ntolDrgfrUCKAyy-gYGcNfSZQKzrrEQX_aIiqoV5lM5oRvnBBfLNsLiovcvHPvULFhqDvrFhTeunMj5fzUZt3ZwdUOSmyFZPa6z1JDe3_Kh95wQTPC0vld6iDxhAX6PhOxo1A",
      initials: "RS"
    },
    {
      id: "211429",
      name: "Aryan Kapoor",
      gender: "male",
      branch: "B.Tech CSE",
      year: "3rd Year",
      hostel: "Shastri Bhawan H-2",
      room: "204",
      occupancy: "Double (2-Seater)",
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuCWLFKok3jgkzUyD8rve-xrTlLgl_D6ehdMJxpmgkX5iPVceFHbSbgDPRafRzCd4RYDaOGQDEAejFq1gi9Uj03jeqkgUjdDRc1PNeC8wNYwvtJIuzP8GHJY1nJoYDv3WMVt6ISZbTMFdatMY3H9c-ZWx5OYIGQKIzXhy-6a7wPMxwXYa8Yhc32PFy7puLVIgx29azzaOpS_GuzXereIrH2GrbFpx1kLpXY8QmW24YPM_iMOd7Ranjyk",
      initials: "AK"
    },
    {
      id: "211305",
      name: "Kartik Mehta",
      gender: "male",
      branch: "B.Tech Civil",
      year: "3rd Year",
      hostel: "Parmar Bhawan B-1",
      room: "112",
      occupancy: "Double (2-Seater)",
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuD6uYOTZna09FRMFuE2ezbmJA3Df5_r-GkhyDwLKj8sSqpkHROGv6WzYR4SJmgIHxHb6CSdfpPeZ9QEXEWAsjjJOe-U_Ssu4LAoWM7N6781zkoe8toTT6K9L_3kToNRqNohkfVRloZGf2cfm6n1Xlv2wLUqbCCKopS_Ke082mO5INTwGO4UQFKdN6zUjyrUP0nM-wjxUGTm5q5gMZ6KsaY-bmwAvyi2M--Gxfl-9qN6fKWoPDlHZYS7",
      initials: "KM"
    },
    {
      id: "231802",
      name: "Ananya Gupta",
      gender: "female",
      branch: "B.Tech ECE",
      year: "2nd Year",
      hostel: "Geeta Bhawan Ext.",
      room: "305",
      occupancy: "Double (2-Seater)",
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDtZk9E61f-EQmK3q7e9G51mqyu8OC5_TjnrtL_xj5V3ic3QpocyG_26r7L5U9BO4f-Nk1Sj1o8o1DWXtpujttxky93KTZTZ444Fun3aef6BVGpvWBIy3gqCPjyd3WUgh9bSdhv3DhYaYJmD2X0mn_N1CSavF7DXUdqQAvaU3ptfb1PByUWmTkshDjxZrrE106ZWyOS7DpWh9P_-bgxPk_bXQDDswHzBA4mGk4c9hHn42QGrSQv0Pe0nBJx60HH9ToXyQ",
      initials: "AG"
    }
  ],

  students: [
    {
      id: "211429",
      name: "Aryan Kapoor",
      gender: "male",
      branch: "B.Tech CSE",
      year: "3rd Year",
      section: "Sec B",
      hostel: "Shastri Bhawan",
      hostelDetail: "Shastri Bhawan H-2 • 2nd Floor, Room 204",
      occupancy: "Double Occupancy",
      baseMatchScore: 96,
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuCWLFKok3jgkzUyD8rve-xrTlLgl_D6ehdMJxpmgkX5iPVceFHbSbgDPRafRzCd4RYDaOGQDEAejFq1gi9Uj03jeqkgUjdDRc1PNeC8wNYwvtJIuzP8GHJY1nJoYDv3WMVt6ISZbTMFdatMY3H9c-ZWx5OYIGQKIzXhy-6a7wPMxwXYa8Yhc32PFy7puLVIgx29azzaOpS_GuzXereIrH2GrbFpx1kLpXY8QmW24YPM_iMOd7Ranjyk",
      sharedMatch: "Syncs on sleep schedule, exam focus & geyser usage",
      tags: ["🌙 Night Owl (1:30 AM)", "🧹 Super Tidy & Organized", "🎧 Lofi Beats & Code", "🍗 Non-Veg Friendly", "☕ Evening Chai at Dhabas", "❄️ Fresh Breeze Lover"],
      answers: { q1: "owl", q2: "lofi", q3: "tidy", q4: "fresh_air", q5: "occasional", q6: "ask_first", q7: "non_veg", q8: "gaming_tech", q9: "clubs_out", q10: "calm_talk" }
    },
    {
      id: "221014",
      name: "Rohan Verma",
      gender: "male",
      branch: "B.Tech IT",
      year: "2nd Year",
      section: "Sec A",
      hostel: "Azad Bhawan",
      hostelDetail: "Azad Bhawan Peachtree • 1st Floor, Room 118",
      occupancy: "Double Occupancy",
      baseMatchScore: 92,
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDdrIHyHf8WNR38niQXSKwEEAtZjT3tZvf0c2AhNYXvBJEb6RJIYKfgUlK1wXAXEeguVEzYAwKepv_TNJPIdFKItjtZgLOQanSO07LBV6daPYTlPJ5bQRu7TI9ZC2svlnNBDw1cW9OY0Ldt72qvhVPrP-Y_d12RmAL2eD5JmgNEDvZNBSRqXV39Pj5eK1avw5NwX81kSzc9B1JQwtKJhdmWQZCB15pY03NYtWNm58hOQdRiPVSK-Wx6",
      sharedMatch: "Both respect late quiet study hours & weekend outings",
      tags: ["🌙 Night Owl (2:00 AM)", "📦 Manageable Clutter", "📚 Absolute Silence in Finals", "🥗 Vegetarian Preferred", "🔥 Room Heater Advocate"],
      answers: { q1: "owl", q2: "silence", q3: "weekly", q4: "warm", q5: "occasional", q6: "ask_first", q7: "pure_veg", q8: "gaming_tech", q9: "chill_in", q10: "direct" }
    },
    {
      id: "211082",
      name: "Siddharth Sharma",
      gender: "male",
      branch: "B.Tech ECE",
      year: "3rd Year",
      section: "Sec A",
      hostel: "Parmar Bhawan",
      hostelDetail: "Parmar Bhawan • 3rd Floor, Room 315",
      occupancy: "Double Occupancy",
      baseMatchScore: 88,
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuAkChDrsxNgGu1czilNlmKl4dRWfWtKVBmoGxAhfWrvIeegOcsHhFXDMRoATsZU14J9bLOk8DTmakQAsui1otDH50rJR18R6rswEH1sA07taw339aX_yeerOCX1_ebIl_5mUfhLJZZJEJfxLPwi5PbCpSc2O6yRQA7oWDbO5_ECTrvK0Mt0s6HXdgH5zB6XDAO3or_8YY2A24zeVZjw8mzL-oDFCVQOdHGJR60J4RI9MuZm5MrtQ3oN",
      sharedMatch: "Non-smoker, quiet evenings, both from North Region",
      tags: ["🌅 Moderate Riser (7:30 AM)", "🧹 Organized Study Desk", "🔒 Private Sanctuary Zone", "🍗 Non-Veg Friendly"],
      answers: { q1: "balanced", q2: "silence", q3: "tidy", q4: "moderate", q5: "private", q6: "strict", q7: "non_veg", q8: "sports", q9: "chill_in", q10: "calm_talk" }
    },
    {
      id: "211305",
      name: "Kartik Mehta",
      gender: "male",
      branch: "B.Tech Civil",
      year: "3rd Year",
      section: "Sec A",
      hostel: "Shastri Bhawan",
      hostelDetail: "Shastri Bhawan H-1 • Ground Floor, Room 012",
      occupancy: "Double Occupancy",
      baseMatchScore: 84,
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuD6uYOTZna09FRMFuE2ezbmJA3Df5_r-GkhyDwLKj8sSqpkHROGv6WzYR4SJmgIHxHb6CSdfpPeZ9QEXEWAsjjJOe-U_Ssu4LAoWM7N6781zkoe8toTT6K9L_3kToNRqNohkfVRloZGf2cfm6n1Xlv2wLUqbCCKopS_Ke082mO5INTwGO4UQFKdN6zUjyrUP0nM-wjxUGTm5q5gMZ6KsaY-bmwAvyi2M--Gxfl-9qN6fKWoPDlHZYS7",
      sharedMatch: "Both wake up early for JUIT sports ground & badminton",
      tags: ["🌅 Early Riser (6:30 AM)", "🧹 Spotless Room", "☕ Chai & Gym Enthusiast"],
      answers: { q1: "early", q2: "lofi", q3: "tidy", q4: "fresh_air", q5: "social_hub", q6: "open", q7: "pure_veg", q8: "sports", q9: "clubs_out", q10: "direct" }
    },
    {
      id: "211512",
      name: "Dhruv Thakur",
      gender: "male",
      branch: "B.Tech Biotech",
      year: "3rd Year",
      section: "Sec B",
      hostel: "Parmar Bhawan",
      hostelDetail: "Parmar Extension • 2nd Floor, Room 221",
      occupancy: "Triple Occupancy",
      baseMatchScore: 79,
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDsinhBEPOvsvm2nTJUfAPdl6ooh9IVOpy9ljqT15dF5FpaQzdnzHs6zhVlmLiaDclWFcsIc1Ujv0R6VaN5AFphvQakyxVVNrPFlh8yPe3u1X8v8QoOuV4yj6kJX0K2M52vH8qlUgT-zY6vzzS7GTqWGkGMLqp39UA1ZjYi0P4Z2TAo7gYbp33wTqQ-5RCLetbCvVtvvCoAyQ_tRYEcejGthzL-GZJwkBFlQxotVCvzh_Urx6c2rMpT",
      sharedMatch: "Love acoustic guitar jamming & quiet weekends in campus",
      tags: ["🌙 Night Owl (3:00 AM)", "🎸 Acoustic Guitarist", "☕ Coffee Addict"],
      answers: { q1: "owl", q2: "group", q3: "chaos", q4: "warm", q5: "social_hub", q6: "open", q7: "non_veg", q8: "music_binge", q9: "chill_in", q10: "adaptable" }
    },
    {
      id: "221411",
      name: "Aman Joshi",
      gender: "male",
      branch: "B.Tech CSE",
      year: "2nd Year",
      section: "Sec C",
      hostel: "Azad Bhawan",
      hostelDetail: "Azad Bhawan Main • 3rd Floor, Room 304",
      occupancy: "Double Occupancy",
      baseMatchScore: 91,
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBE3Aps2IRMbHlArFex7_zpWcccC5KM1J9iRcuoKbgFnhUPp9Bjcfi6SkEVCN5PPQFNjZI0TYfy1U8nfp7i_qE-aSt8M-4PtDb4Hhs8_aj5d2DitsNg-2HlqaxBB5eCDvSaPhzcQ_OjXwNUnq2n6aFkmzPcvh_2dTvT34h-wV04HVyXWorNXoC82FIvIeZrv4jssUl_3SJnGZRGLR1r8VY3tNdUmFKIFSHADyuY4FujaOkcSfw8XOzo",
      sharedMatch: "Competitive coding, LeetCode grind & Annapurna mess buddies",
      tags: ["💻 ACM Club Member", "🌙 Night Owl", "🧹 Tidy Desks", "🥗 Veg Only"],
      answers: { q1: "owl", q2: "silence", q3: "tidy", q4: "fresh_air", q5: "occasional", q6: "ask_first", q7: "pure_veg", q8: "gaming_tech", q9: "chill_in", q10: "calm_talk" }
    },
    {
      id: "231802",
      name: "Ananya Gupta",
      gender: "female",
      branch: "B.Tech ECE",
      year: "2nd Year",
      section: "Sec A",
      hostel: "Geeta Bhawan",
      hostelDetail: "Geeta Bhawan Ext. • 3rd Floor, Room 305",
      occupancy: "Double Occupancy",
      baseMatchScore: 94,
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDtZk9E61f-EQmK3q7e9G51mqyu8OC5_TjnrtL_xj5V3ic3QpocyG_26r7L5U9BO4f-Nk1Sj1o8o1DWXtpujttxky93KTZTZ444Fun3aef6BVGpvWBIy3gqCPjyd3WUgh9bSdhv3DhYaYJmD2X0mn_N1CSavF7DXUdqQAvaU3ptfb1PByUWmTkshDjxZrrE106ZWyOS7DpWh9P_-bgxPk_bXQDDswHzBA4mGk4c9hHn42QGrSQv0Pe0nBJx60HH9ToXyQ",
      sharedMatch: "Study schedules, clean balcony habits, quiet study zones",
      tags: ["🌅 Early Riser", "🧹 Super Neat", "📚 Library Focus", "☕ Tea Lover"],
      answers: { q1: "early", q2: "silence", q3: "tidy", q4: "fresh_air", q5: "occasional", q6: "ask_first", q7: "pure_veg", q8: "music_binge", q9: "clubs_out", q10: "direct" }
    },
    {
      id: "221940",
      name: "Tanya Grover",
      gender: "female",
      branch: "B.Tech CSE",
      year: "3rd Year",
      section: "Sec A",
      hostel: "Malviya Block",
      hostelDetail: "Malviya B Block • 2nd Floor, Room 212",
      occupancy: "Double Occupancy",
      baseMatchScore: 89,
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBN4CYXH2Ppwz5XiPrllD5uyCir99eIEoV5Sc9sxrDGs_um-oe5FpdpYB-LvWy8rYhArb0XeCQFFmvzME4YXH5tEfXIbEVyWfLsAfEMxVXei2t1bp1kSmq1xS-yhjbHkr7kQA_6c4QON3g-Ce9M5X1sA6eSbGXvQG0QAQd-rGgTRklMWmredylqvwDihYRc-B5uSxOspJGWczfiAYl-CRvwsL-Ddf5kz236f-PpWVprB7GfK9nHnCTG6v45vywQQpuQuQ",
      sharedMatch: "Loves coding hackathons and quiet evenings with heaters",
      tags: ["🌙 Night Owl", "🎧 Lofi Music", "🔥 Heater Fan", "🍗 Non-Veg"],
      answers: { q1: "owl", q2: "lofi", q3: "weekly", q4: "warm", q5: "occasional", q6: "ask_first", q7: "non_veg", q8: "gaming_tech", q9: "chill_in", q10: "calm_talk" }
    }
  ],

  quizQuestions: [
    {
      id: 1,
      factor: "Sleep Rhythm & Lights-Out",
      description: "When does your desk lamp turn off on typical weekdays?",
      icon: "bedtime",
      options: [
        { value: "early", title: "Early Riser", subtitle: "Sleep by 10:30 PM • Wake 6:00 AM", icon: "wb_twilight" },
        { value: "owl", title: "Night Owl", subtitle: "Coding/Vibing till 2:00 AM+ • Late mornings", icon: "bedtime" },
        { value: "balanced", title: "Balanced Routine", subtitle: "Lights out 11:30 PM - 12:30 AM steady", icon: "schedule" }
      ]
    },
    {
      id: 2,
      factor: "Study & Focus Environment",
      description: "What sound environment keeps you in the exam zone?",
      icon: "code",
      options: [
        { value: "silence", title: "Pin-Drop Silence", subtitle: "Zero phone calls, absolute library mode", icon: "volume_off" },
        { value: "lofi", title: "Soft Music / Lofi Beats", subtitle: "Low speaker ambient sound or headphone chill", icon: "headphones" },
        { value: "group", title: "Collaborative / Discussion", subtitle: "Discussing slides, whiteboard group problem solving", icon: "forum" }
      ]
    },
    {
      id: 3,
      factor: "Room Cleanliness & Chores",
      description: "How tidy do you keep your study desk & wardrobe?",
      icon: "cleaning_services",
      options: [
        { value: "tidy", title: "Super Tidy & Neat", subtitle: "Daily bed-making, zero desk clutter allowed", icon: "cleaning_services" },
        { value: "weekly", title: "Weekly Deep Sweep", subtitle: "Manageable clutter during week, clean Sundays", icon: "calendar_today" },
        { value: "chaos", title: "Organized Chaos", subtitle: "Relaxed approach; everything is found where left", icon: "interests" }
      ]
    },
    {
      id: 4,
      factor: "Climate & Ventilation",
      description: "Hostel window & heater preferences in Himachal weather",
      icon: "thermostat",
      options: [
        { value: "fresh_air", title: "Windows Open / Fresh Mountain Air", subtitle: "Natural hill breeze preferred over heaters", icon: "air" },
        { value: "moderate", title: "Moderate Temperature", subtitle: "Fan on low/medium, doors closed at night", icon: "thermostat" },
        { value: "warm", title: "Cozy & Warm (Blower / Heater)", subtitle: "Draft-proof room, heater running in winter", icon: "heat" }
      ]
    },
    {
      id: 5,
      factor: "Social Life & Visitors",
      description: "How open is your room door to hostel floor wingmates?",
      icon: "groups",
      options: [
        { value: "social_hub", title: "The Social Hub", subtitle: "Friends dropping in for tea, gaming & jam sessions", icon: "groups" },
        { value: "occasional", title: "Occasional / Scheduled", subtitle: "Friends over for assignments, heads-up in advance", icon: "handshake" },
        { value: "private", title: "Private Sanctuary", subtitle: "Room is only for resting; socialise outside in common room", icon: "lock" }
      ]
    },
    {
      id: 6,
      factor: "Sharing Belongings & Gadgets",
      description: "Borrowing chargers, stationery, kettle, and books:",
      icon: "diversity_1",
      options: [
        { value: "open", title: "Open & Generous", subtitle: "What's mine is yours; feel free to grab essentials", icon: "diversity_1" },
        { value: "ask_first", title: "Ask Before Taking", subtitle: "Happy to share if you just drop a quick polite note", icon: "chat_bubble_outline" },
        { value: "strict", title: "Strictly Personal", subtitle: "Prefer keeping gear and personal items separate", icon: "do_not_touch" }
      ]
    },
    {
      id: 7,
      factor: "Dietary & Food in Room",
      description: "Room food etiquette and Annapurna Mess dining habits:",
      icon: "restaurant",
      options: [
        { value: "pure_veg", title: "Pure Vegetarian / Jain Preference", subtitle: "Prefer vegetarian snacks & room without non-veg orders", icon: "eco" },
        { value: "non_veg", title: "Non-Vegetarian Friendly", subtitle: "Comfortable with non-veg takeaway & snacks in room", icon: "restaurant" },
        { value: "mess_only", title: "No Meals Inside Room", subtitle: "Strictly Annapurna Mess only (avoids crumbs & pests)", icon: "no_meals" }
      ]
    },
    {
      id: 8,
      factor: "Hobbies & Free Time Vibes",
      description: "What fills your evening hours between 6 PM and 10 PM?",
      icon: "sports_esports",
      options: [
        { value: "sports", title: "Sports & Gym at JUIT Courts", subtitle: "Basketball, badminton, gym sessions, outdoor tracks", icon: "sports_volleyball" },
        { value: "gaming_tech", title: "Tech, Coding & Gaming", subtitle: "Hackathons, Valorant/FIFA, dev communities", icon: "sports_esports" },
        { value: "music_binge", title: "Music, Anime & Binging", subtitle: "Guitar practice, watching series, reading novels", icon: "music_note" }
      ]
    },
    {
      id: 9,
      factor: "Weekend Routine",
      description: "Saturday and Sunday at Waknaghat:",
      icon: "hiking",
      options: [
        { value: "chill_in", title: "Stay In & Recharge", subtitle: "Long sleep, movie marathons, hostel cozy chill", icon: "hotel" },
        { value: "clubs_out", title: "Campus Clubs & Treks", subtitle: "Rotaract/ACM events, hikes to Solan & Shimla", icon: "hiking" },
        { value: "home_tripper", title: "Frequent Home Tripper", subtitle: "Travel back home on alternate weekends", icon: "directions_bus" }
      ]
    },
    {
      id: 10,
      factor: "Conflict Resolution Style",
      description: "If a roommate issue arises (noise, cleaning, lights):",
      icon: "psychology",
      options: [
        { value: "direct", title: "Direct & Immediate", subtitle: "Say it right then respectfully to clear the air", icon: "quickreply" },
        { value: "calm_talk", title: "Calm Evening Tea Talk", subtitle: "Pause, collect thoughts, talk through it later", icon: "coffee" },
        { value: "adaptable", title: "Adaptable & Easygoing", subtitle: "Go with the flow; small friction doesn't bother me", icon: "all_inclusive" }
      ]
    }
  ],

  hostels: [
    {
      id: "shastri",
      name: "Shastri Bhawan",
      type: "Boys Hostel",
      wings: "H-1 to H-11 Blocks",
      capacity: "450 Students",
      vacancies: 14,
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDL5VQ-EQERW86NV8XgmGuO2Sh8-mWal4Xnm7IhNkGYfCI5Vt0VElYAHye1gR69zkUQHCy16PqD89x7n7oKM2Xd0LZ2xy0iCKbNKqbUy4xo1rPHY9vjQMOXR3NNgvuu0ntolDrgfrUCKAyy-gYGcNfSZQKzrrEQX_aIiqoV5lM5oRvnBBfLNsLiovcvHPvULFhqDvrFhTeunMj5fzUZt3ZwdUOSmyFZPa6z1JDe3_Kh95wQTPC0vld6iDxhAX6PhOxo1A",
      warden: "Dr. Akash Bharadwaj & Dr. Deepak Gupta (H1-H2), Dr. Vikas Baghel (H3-H11)",
      caretaker: "Mr. Ramesh Sharma (Ext: 310)",
      amenities: ["24/7 Geysers", "High Speed Wi-Fi 6", "Table Tennis Arena", "Common Lounge", "Solar Water Heating"],
      description: "Premier senior residential blocks overlooking lush pine hills. Houses primarily 2nd & 3rd year engineering students with double and single seater wings."
    },
    {
      id: "parmar",
      name: "Parmar Bhawan & Extension",
      type: "Boys Hostel",
      wings: "Main Block & New Extension",
      capacity: "380 Students",
      vacancies: 8,
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDcbvQqsxCIkYUCS3dYMW3ogeaZZ7K0Ub4uIJkzmc2wmSOQdOZI5tJE3tGbMREfubScCXMjuHUbh3As3EqhlsUD0jo701NQxQnCUlipEtC8e8YtcX4Cu1Je6qTI0lhdx1sgIy9AsfsMaQOPe7Ub8WURQpKX2kadEvNjLLLz1IVQjBRsMp2Ct_qNpNQfFdBJeNnQHDeHnO5DUHOHaIRMZdkZ2IV20iOELti8-k5P8L638Ds5w8zuqReH",
      warden: "Dr. Nishant Jain",
      caretaker: "Mr. Jagdish Chand (Ext: 312)",
      amenities: ["Spacious Balconies", "Study Library Desk", "Direct Mess Walkway", "Locker Storage", "Badminton Court"],
      description: "Nestled adjacent to the academic complex and Tuck Shop, known for its spacious double and triple suites with valley vistas."
    },
    {
      id: "azad",
      name: "Azad Bhawan & Peachtree",
      type: "Boys Hostel",
      wings: "Main Wing & Peachtree Extension",
      capacity: "520 Students",
      vacancies: 19,
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBm1PTacGlBDDviZpJay7wk-lYkK-hJe4Jt_9hPCsZ8lRp9j9l6tTtA8RVO2Gk9rBXSP-iFcITMl7_MipEZ30He02UVku6eOsYijrbOqcJ3iSmsYSUDT4XHq5X03SuRtSTIxAiqSWPmw-rwK3P9WsxZWqUEVmqAiJ8WKjsV8KQNtpV_KYwTkS_RTuGEnpPBq4L-KliXcCC_pKdzyeyQ9eWDO7v3u0es4wSc3doJgAPXQYtLazXm8XG1nksFwT7EKXUPmw",
      warden: "Dr. Pradeep Garg & Dr. Niraj Singh Parihar, Mr. Faisal Firdous",
      caretaker: "Mr. Suresh Kumar (Ext: 314)",
      amenities: ["Gym Access", "Quiet Study Zone", "Outdoor Sports Ground", "High Pressure Geysers"],
      description: "Vibrant residential complex with modern study pods, popular among 1st and 2nd year scholars with dedicated floor monitors."
    },
    {
      id: "geeta",
      name: "Geeta Bhawan & Extension",
      type: "Girls Hostel",
      wings: "Main Geeta & Senior Extension",
      capacity: "420 Students",
      vacancies: 11,
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBBaXQuKP4f3IPw3ApdBkvgJxGx7GXP0CYH5VBwS6AiI-JFkd25lnhp3SN_KHClxgmmDGdQw2-90RKGsOANJeDl468_V5zi5UMOw88s2Aj-fqxSnhEOW9jpukJZaxJWnKHdADWKyAVJa93KEA2ZA9-xSnrA74mP9on80ubV5U47poFe-3nWbdjwNQzbMF-ww5deR16bkz_hWyGiFyqUeKm8heydjesKpOhB6rJC7wYhVL_HQ_JROwZ_x15cfLF0G5rarA",
      warden: "Dr. Anita (1st Yr), Dr. Ekta Gandotra (Senior), Mrs. Som Lata",
      caretaker: "Mrs. Meena Thakur (Ext: 401)",
      amenities: ["Biometric Turnstiles", "Indoor Badminton", "Full Power Backup", "Pantry Area", "24/7 Security"],
      description: "Secure, scenic residential blocks for female scholars featuring mountain views, interior gardens, and modern amenities."
    },
    {
      id: "malviya",
      name: "Malviya Bhawan (A, B, C Blocks)",
      type: "Girls Hostel",
      wings: "Block A, Block B, Block C",
      capacity: "340 Students",
      vacancies: 6,
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBN4CYXH2Ppwz5XiPrllD5uyCir99eIEoV5Sc9sxrDGs_um-oe5FpdpYB-LvWy8rYhArb0XeCQFFmvzME4YXH5tEfXIbEVyWfLsAfEMxVXei2t1bp1kSmq1xS-yhjbHkr7kQA_6c4QON3g-Ce9M5X1sA6eSbGXvQG0QAQd-rGgTRklMWmredylqvwDihYRc-B5uSxOspJGWczfiAYl-CRvwsL-Ddf5kz236f-PpWVprB7GfK9nHnCTG6v45vywQQpuQuQ",
      warden: "Dr. Ekta Gandotra & Caretaker Staff",
      caretaker: "Mrs. Sunita Verma (Ext: 404)",
      amenities: ["Mountain Facing Balconies", "Soundproof Study Hall", "Washing Machines", "Filtered RO System"],
      description: "Quiet, peaceful blocks located in upper campus offering deluxe double and single rooms with attached modern washrooms."
    }
  ],

  swapRequest: {
    id: "SW-2025-084",
    status: "Pending Warden",
    consentsCompleted: 4,
    totalConsents: 4,
    step: "Step 4 of 5",
    stepName: "Peer Consents Verified • Awaiting Warden Office Final Sanction",
    initiator: {
      name: "Aryan Sharma",
      roll: "211429",
      branch: "B.Tech CSE 3rd Yr",
      from: "Shastri H-2 • Room 204",
      to: "Parmar B-1 • Room 112",
      consented: true,
      time: "Today, 10:45 AM"
    },
    currentRoommate: {
      name: "Rohan Verma",
      roll: "221014",
      branch: "B.Tech IT 2nd Yr",
      note: "Agreed to swap. Welcoming Kartik into Shastri 204 for the remaining academic session.",
      consented: true,
      time: "14 May, 02:15 PM"
    },
    targetMatch: {
      name: "Kartik Mehta",
      roll: "211305",
      branch: "B.Tech Civil 3rd Yr",
      from: "Parmar B-1 • Room 112",
      to: "Shastri H-2 • Room 204",
      note: "Consented through RoomieSync. Prepared to vacate Parmar 112 for room swap into Shastri 204.",
      consented: true,
      matchScore: "96%",
      time: "14 May, 04:30 PM"
    },
    targetRoommate: {
      name: "Dhruv Tiwari",
      roll: "211512",
      branch: "B.Tech Biotech 3rd Yr",
      note: "Signed assent form. Ready to receive Aryan Sharma as my new roommate in Parmar 112.",
      consented: true,
      time: "15 May, 10:00 AM",
      nocId: "NOC-PR-882"
    },
    wardensInvolved: [
      { name: "Dr. Akash Bharadwaj & Dr. Deepak Gupta", role: "Wardens, Shastri H-2", status: "Mail Sent" },
      { name: "Dr. Nishant Jain", role: "Warden, Parmar Bhawan", status: "Mail Sent" },
      { name: "Dr. Neel Kanth", role: "Chief Warden, JUIT Admin", status: "In Review" }
    ]
  },

  requestsInbox: [
    {
      id: "REQ-101",
      senderName: "Aryan Kapoor",
      senderRoll: "211429",
      senderBranch: "B.Tech CSE 3rd Year",
      senderHostel: "Shastri Bhawan H-2, Room 204",
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuCWLFKok3jgkzUyD8rve-xrTlLgl_D6ehdMJxpmgkX5iPVceFHbSbgDPRafRzCd4RYDaOGQDEAejFq1gi9Uj03jeqkgUjdDRc1PNeC8wNYwvtJIuzP8GHJY1nJoYDv3WMVt6ISZbTMFdatMY3H9c-ZWx5OYIGQKIzXhy-6a7wPMxwXYa8Yhc32PFy7puLVIgx29azzaOpS_GuzXereIrH2GrbFpx1kLpXY8QmW24YPM_iMOd7Ranjyk",
      matchScore: "96%",
      message: "Hey Raj! We both share the exact same night owl schedule and study with lofi beats. Let's lock in Shastri H-2 Room 204 for the upcoming semester!",
      status: "pending",
      time: "10 mins ago",
      type: "incoming"
    },
    {
      id: "REQ-102",
      senderName: "Rohan Verma",
      senderRoll: "221014",
      senderBranch: "B.Tech IT 2nd Year",
      senderHostel: "Azad Bhawan Peachtree, Room 118",
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDdrIHyHf8WNR38niQXSKwEEAtZjT3tZvf0c2AhNYXvBJEb6RJIYKfgUlK1wXAXEeguVEzYAwKepv_TNJPIdFKItjtZgLOQanSO07LBV6daPYTlPJ5bQRu7TI9ZC2svlnNBDw1cW9OY0Ldt72qvhVPrP-Y_d12RmAL2eD5JmgNEDvZNBSRqXV39Pj5eK1avw5NwX81kSzc9B1JQwtKJhdmWQZCB15pY03NYtWNm58hOQdRiPVSK-Wx6",
      matchScore: "92%",
      message: "Hi! Looking for a quiet coding partner. Would be happy to pair up for Double occupancy.",
      status: "accepted",
      time: "2 hours ago",
      type: "incoming"
    }
  ],

  chats: {
    "211429": [
      { sender: "them", text: "Hey Raj! Did you check our compatibility score on RoomieSync? 96% match!", time: "11:20 AM" },
      { sender: "me", text: "Hey Aryan! Yes, that's awesome. I saw you also prefer lights-out around 1:30 AM.", time: "11:22 AM" },
      { sender: "them", text: "Exactly! Plus we both study with lofi music. Would you be up for submitting a mutual double occupancy request for Shastri H-2?", time: "11:24 AM" },
      { sender: "me", text: "Sounds perfect. Let me accept the sync request so we can lock it with Chief Warden office.", time: "11:25 AM" }
    ],
    "211305": [
      { sender: "them", text: "Hey! Let me know if you need any info about Parmar Bhawan Room 112.", time: "Yesterday" },
      { sender: "me", text: "Thanks Kartik! How is the solar geyser pressure in Parmar B-1?", time: "Yesterday" },
      { sender: "them", text: "It's super hot even during chilly December mornings! Balcony view is great too.", time: "Yesterday" }
    ]
  }
};
