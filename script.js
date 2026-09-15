// Initialize AOS
if (typeof AOS !== 'undefined') {
  AOS.init({
    duration: 900,
    once: true,
    offset: 80
  });
}

// Typing Effect
if (document.getElementById('typing-effect') && typeof Typed !== 'undefined') {
  new Typed('#typing-effect', {
    strings: [
      'Information Science & Engineering Student @ MIT Mysore',
      'Python Backend & AI-Enabled Systems',
      'Creator of DARTX (VS Code Extension)',
      'Building SMART LAB & Algorithmic Solutions'
    ],
    typeSpeed: 45,
    backSpeed: 25,
    backDelay: 2200,
    loop: true
  });
}

// Mobile Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.getElementById('nav-links');

if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
    });
  });
}

// Chatbot Functionality
const chatbotToggle = document.getElementById('chatbot-toggle');
const chatbotWidget = document.getElementById('chatbot-widget');
const chatbotClose = document.getElementById('chatbot-close');
const chatbotInput = document.getElementById('chatbot-input-field');
const chatbotSend = document.getElementById('chatbot-send');
const chatbotMessages = document.getElementById('chatbot-messages');
const suggestionBtns = document.querySelectorAll('.suggestion-btn');

// Enhanced Intelligent Chatbot Knowledge Base
const knowledgeBase = {
  about: {
    keywords: ['who', 'about', 'yourself', 'background', 'introduce', 'profile', 'bio', 'who are you'],
    responses: [
      "👋 <b>Suravi R</b> is an Information Science & Engineering student (Class of 2027) at <b>Maharaja Institute of Technology Mysore</b> (9.12 CGPA).<br>She specializes in Python backend engineering (Flask, Django), optimization algorithms, practical developer tools (like DARTX), and intelligent assessment systems."
    ]
  },
  
  education: {
    keywords: ['education', 'study', 'college', 'university', 'degree', 'cgpa', 'marks', 'percentage', 'academic', 'grades', 'mit', 'mysore', 'puc', 'sslc', 'ise', 'grad', 'graduate', 'year'],
    responses: [
      "🎓 <b>Academic Background:</b><br>• <b>B.E. in Information Science & Engineering:</b> MIT Mysore — <b>9.12 CGPA</b> (Class of <b>2027</b>)<br>• <b>Pre-University (PUC PCMC):</b> <b>90.18%</b><br>• <b>SSLC:</b> <b>93.92%</b><br>• <b>Key Core Subjects:</b> Data Structures & Algorithms, DBMS, Operating Systems, Computer Networks, and Java OOP."
    ]
  },
  
  experience: {
    keywords: ['experience', 'internship', 'intern', 'work', 'wizzy', 'future interns', 'job', 'training'],
    responses: [
      "💼 <b>Experience & Training:</b><br>• <b>Wizzy Box (Technical Training):</b> Undergoing intensive technical training in full-stack architecture, backend systems, database modeling, and scalable web engineering.<br>• <b>Future Interns (Web Development Intern):</b> Built responsive web layouts, interactive JavaScript modules, and optimized frontend performance."
    ]
  },
  
  skills: {
    keywords: ['skills', 'programming', 'languages', 'tech', 'stack', 'python', 'java', 'sql', 'django', 'flask', 'fastapi', 'databases', 'tools', 'technologies'],
    responses: [
      "💻 <b>Technical Skills & Stack:</b><br>• <b>Languages:</b> Python, Java (NPTEL Gold), C, C++, SQL, JavaScript (ES6+), HTML5, CSS3<br>• <b>Backend & Web:</b> Flask, Django, FastAPI (exploring), Node.js basics<br>• <b>Databases:</b> MySQL, SQLite, Supabase<br>• <b>Core CS:</b> Data Structures & Algorithms, Object-Oriented Design (OOP), DBMS, Operating Systems, Computer Networks<br>• <b>Developer Tools:</b> Git, GitHub, VS Code Extension API, GCC/MinGW, Linux CLI Basics"
    ]
  },
  
  projects: {
    keywords: ['projects', 'built', 'developed', 'portfolio', 'application', 'showcase', 'apps', 'work'],
    responses: [
      "🚀 <b>Featured Projects:</b><br>1. 🛠️ <b>DARTX:</b> Published VS Code Extension for AST import scanning, alias mapping, and 1-click dependency resolution.<br>2. ⏰ <b>MITM-TimeEvolver:</b> Academic scheduling platform using Genetic Algorithms to resolve faculty/room constraints (2nd Prize Mini Project Expo).<br>3. 🎓 <b>SMART LAB:</b> C Programming Lab Assistant with GCC automated compilation, public/hidden test case evaluation, and syllabus PDF extraction.<br>4. 🌿 <b>HerbAura:</b> 3D Ayurvedic botanical garden with Three.js and AI mixture scoring.<br>5. 🌐 <b>Stepping Stone Academy:</b> Production Montessori web platform deployed on Netlify."
    ]
  },
  
  timetableProject: {
    keywords: ['timetable', 'time table', 'schedule', 'time evolver', 'mitm-time', 'genetic', 'genetic algorithm'],
    responses: [
      "⏰ <b>MITM-TimeEvolver – Smart Timetable Generator:</b><br>An algorithmic academic scheduling engine that uses Genetic Algorithms to solve multi-variable constraint satisfaction (faculty workload caps, lab block allocations, room collisions). Generates conflict-free departmental timetables in under 2 minutes.<br>• <b>Stack:</b> Python, Flask, Genetic Algorithm, Supabase.<br>• <b>Recognition:</b> Won <b>2nd Prize</b> at Mini Project Expo 2025.<br>• <b>GitHub:</b> <a href='https://github.com/SuraviR10/MITM-TimeEvolver.git' target='_blank' style='color: var(--secondary-light);'>MITM-TimeEvolver Repo</a>"
    ]
  },
  
  dependencyManager: {
    keywords: ['dependency', 'dartx', 'vs code extension', 'vs code tool', 'package', 'package manager', 'extension'],
    responses: [
      "🛠️ <b>DARTX – Smart Dependency Manager & Scanner:</b><br>A published VS Code extension that automatically scans codebase imports via AST analysis, detects missing runtime packages, resolves tricky alias mappings (e.g., <code>cv2</code> &rarr; <code>opencv-python</code>, <code>PIL</code> &rarr; <code>Pillow</code>), and triggers secure 1-click package installs via pip/npm.<br>• <b>Stack:</b> JavaScript, Node.js, VS Code API.<br>• <b>GitHub:</b> <a href='https://github.com/SuraviR10/Dependency_Manager.git' target='_blank' style='color: var(--secondary-light);'>Dependency_Manager Repo</a>"
    ]
  },
  
  virtualGardenProject: {
    keywords: ['virtual garden', 'herbaura', 'ayurvedic', '3d garden', 'kashayam', 'video', 'demo', 'plants'],
    responses: [
      "🌿 <b>HerbAura – 3D Virtual Ayurvedic Platform:</b><br>An interactive 3D botanical platform built during the VEC Hackathon. Features real-time 3D plant rendering, an AI herbal formula evaluator (Kashayam maker), and gamified botanical quizzes.<br>• 🎥 <b>Video:</b> <a href='https://youtu.be/V2mUIwrPJEc' target='_blank' style='color: #fca5a5;'>Watch Demo on YouTube</a>"
    ]
  },
  
  labAssistantProject: {
    keywords: ['lab assistant', 'smart lab', 'c programming', 'assessment', 'gcc', 'compiler', 'test case', 'viva'],
    responses: [
      "🎓 <b>SMART LAB – C Programming Assessment System:</b><br>An intelligent lab assistant combining automated GCC/MinGW code compilation, plain-English compiler error translation, automated dual-tier test case evaluation (public + hidden), and automated lab syllabus PDF problem extraction.<br>• <b>Stack:</b> Python, Flask/FastAPI, GCC/MinGW Toolchain, SQLite.<br>• <b>GitHub:</b> <a href='https://github.com/SuraviR10/Ai-Programming-Lab-Assistant.git' target='_blank' style='color: var(--secondary-light);'>Ai-Programming-Lab-Assistant Repo</a>"
    ]
  },
  
  steppingStoneProject: {
    keywords: ['stepping stone', 'academy website', 'school website', 'montessori', 'netlify'],
    responses: [
      "🌐 <b>Stepping Stone Academy Website:</b><br>A fully responsive, high-performance website created and deployed for a Montessori school in Mysore. Features intuitive navigation, curriculum overviews, admissions guidelines, and mobile-first layouts.<br>• <b>Live Site:</b> <a href='https://the-stepping-stone-academy-mysore.netlify.app/' target='_blank' style='color: var(--secondary-light);'>the-stepping-stone-academy-mysore.netlify.app</a>"
    ]
  },
  
  achievements: {
    keywords: ['achievements', 'awards', 'prizes', 'recognition', 'gold medal', 'winner', 'rank'],
    responses: [
      "🏆 <b>Key Achievements & Credentials:</b><br>• <b>NPTEL Java Programming:</b> <b>98% Score</b>, <b>Top 1% Nationwide</b> (Elite + Gold Medal).<br>• <b>Mini Project Expo 2025:</b> <b>2nd Prize Winner</b> for MITM-TimeEvolver.<br>• <b>Best Project Award:</b> Recognized for AI-driven Waste Segregation System.<br>• <b>Published Tool:</b> Published DARTX extension on the official VS Code Marketplace."
    ]
  },
  
  certificates: {
    keywords: ['certificates', 'certifications', 'credentials', 'nptel', 'skyscanner', 'coursera', 'linkedin'],
    responses: [
      "📜 <b>Verified Certifications:</b><br>• <b>Programming in Java</b> — NPTEL (98%, Top 1% Nationwide Gold Medal)<br>• <b>Front-End Software Engineering</b> — Skyscanner (Forage Virtual Experience)<br>• <b>Prompt Engineering for AI</b> — LinkedIn Learning<br>• <b>AI for Everyone</b> — DeepLearning.AI / Coursera"
    ]
  },
  
  contact: {
    keywords: ['contact', 'email', 'reach', 'connect', 'linkedin', 'github', 'hire', 'phone', 'mail'],
    responses: [
      "📬 <b>Contact Suravi R:</b><br>• <b>Email:</b> <a href='mailto:suravimys@gmail.com' style='color: var(--secondary-light);'>suravimys@gmail.com</a><br>• <b>LinkedIn:</b> <a href='https://linkedin.com/in/suravir/' target='_blank' style='color: var(--secondary-light);'>linkedin.com/in/suravir</a><br>• <b>GitHub:</b> <a href='https://github.com/SuraviR10' target='_blank' style='color: var(--secondary-light);'>github.com/SuraviR10</a>"
    ]
  },
  
  resume: {
    keywords: ['resume', 'cv', 'download', 'pdf'],
    responses: [
      "📄 <b>Resume Download:</b><br>You can download Suravi's verified resume here: <a href='Resume_of_SuraviR.pdf' download class='btn btn-small btn-primary' style='display:inline-flex; margin-top:6px; color:#fff;'><i class='fas fa-download'></i> Download Resume PDF</a>"
    ]
  }
};

const fallbacks = [
  "💡 I can share details about Suravi's **projects** (DARTX, Timetable Generator, SMART LAB), **skills** (Python, Java, Django, Flask, SQL), **experience**, or **contact details**. What would you like to know?",
  "🤖 Feel free to ask about Suravi's technical stack, architecture choices, or credentials!"
];

function getBotReply(message) {
  const lowerMessage = message.toLowerCase().trim();
  
  if (lowerMessage.match(/^(hi|hello|hey|greetings|namaste)/)) {
    return "Hello! 👋 I'm Suravi's portfolio assistant. What would you like to know about her software projects, technical skills, or experience?";
  }
  
  if (lowerMessage.match(/(thank|thanks|great|cool|awesome)/)) {
    return "You're welcome! Feel free to ask anything else about Suravi's work or how to get in touch.";
  }
  
  let bestMatch = null;
  let highestScore = 0;
  
  for (const [key, data] of Object.entries(knowledgeBase)) {
    let score = 0;
    for (const keyword of data.keywords) {
      const exactMatch = new RegExp(`\\b${keyword.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&')}\\b`, 'i');
      if (exactMatch.test(lowerMessage)) score += keyword.length * 3;
      else if (lowerMessage.includes(keyword)) score += keyword.length * 2;
    }
    if (score > highestScore) {
      highestScore = score;
      bestMatch = data;
    }
  }
  
  if (bestMatch && highestScore > 0) {
    return bestMatch.responses[0];
  }
  
  return fallbacks[Math.floor(Math.random() * fallbacks.length)];
}

function appendChat(text, type) {
  if (!chatbotMessages) return;
  const messageDiv = document.createElement('div');
  messageDiv.className = type === 'user' ? 'user-message' : 'bot-message';
  
  if (type === 'bot') {
    messageDiv.innerHTML = `
      <div class="message-avatar"><i class="fas fa-robot"></i></div>
      <div class="message-content"><p>${text}</p></div>`;
  } else {
    messageDiv.innerHTML = `
      <div class="message-content"><p>${text}</p></div>`;
  }
  
  chatbotMessages.appendChild(messageDiv);
  chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

function handleSend() {
  if (!chatbotInput) return;
  const message = chatbotInput.value.trim();
  if (!message) return;
  
  appendChat(message, 'user');
  chatbotInput.value = '';
  
  setTimeout(() => {
    const reply = getBotReply(message);
    appendChat(reply, 'bot');
  }, 350);
}

if (chatbotToggle && chatbotWidget) {
  chatbotToggle.addEventListener('click', () => {
    chatbotWidget.classList.toggle('active');
  });
}

if (chatbotClose && chatbotWidget) {
  chatbotClose.addEventListener('click', () => {
    chatbotWidget.classList.remove('active');
  });
}

if (chatbotSend) chatbotSend.addEventListener('click', handleSend);
if (chatbotInput) {
  chatbotInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleSend();
  });
}

suggestionBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const question = btn.getAttribute('data-question');
    if (chatbotInput) {
      chatbotInput.value = question;
      handleSend();
    }
  });
});
