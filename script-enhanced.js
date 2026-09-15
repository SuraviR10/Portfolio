/**
 * script-enhanced.js — High-Performance Interactive Portfolio Engine
 * Suravi R — Software Engineer & Backend Developer
 */

// ==========================================================================
// PRELOADER
// ==========================================================================
window.addEventListener('load', () => {
  const preloader = document.getElementById('preloader');
  if (preloader) {
    setTimeout(() => {
      preloader.classList.add('loaded');
    }, 300);
  }
});

// ==========================================================================
// AOS ANIMATIONS INITIALIZATION
// ==========================================================================
if (typeof AOS !== 'undefined') {
  AOS.init({
    duration: 800,
    once: true,
    offset: 60,
    easing: 'ease-out-cubic'
  });
}

// ==========================================================================
// TYPING EFFECT — Accurate & Professional Engineering Roles
// ==========================================================================
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

// ==========================================================================
// LENIS SMOOTH SCROLL (Mobile & Desktop Optimized)
// ==========================================================================
let lenis = null;
try {
  if (typeof Lenis !== 'undefined') {
    lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      smoothTouch: false,
      touchMultiplier: 1.5,
      infinite: false
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    if (typeof ScrollTrigger !== 'undefined' && typeof gsap !== 'undefined') {
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
      });
      gsap.ticker.lagSmoothing(0);
    }
  }
} catch (e) {
  console.log('Lenis running in native fallback mode:', e.message);
}

// ==========================================================================
// REDUCED MOTION PREFERENCE CHECK
// ==========================================================================
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// ==========================================================================
// BACKGROUND VIDEO OPTIMIZATION
// ==========================================================================
try {
  const universeVideo = document.getElementById('universe-video');
  if (universeVideo) {
    if (prefersReducedMotion) {
      universeVideo.pause();
    } else {
      universeVideo.play().catch(() => {
        console.log('Video autoplay fallback handled');
      });
    }
  }
} catch (e) {}

// ==========================================================================
// MOBILE MENU TOGGLE
// ==========================================================================
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.getElementById('nav-links');

if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    const isActive = navLinks.classList.toggle('active');
    if (typeof gsap !== 'undefined' && isActive) {
      const items = navLinks.querySelectorAll('li');
      gsap.fromTo(items,
        { y: -8, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.25, stagger: 0.04, ease: 'power2.out' }
      );
    }
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
    });
  });
}

// ==========================================================================
// HEADER SCROLL STATE & SCROLL PROGRESS
// ==========================================================================
const header = document.querySelector('header');
const scrollProgress = document.getElementById('scroll-progress');

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  if (header) {
    if (scrollY > 30) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }

  if (scrollProgress) {
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (scrollY / windowHeight) * 100;
    scrollProgress.style.width = scrolled + '%';
  }
});

// ==========================================================================
// BACK TO TOP BUTTON
// ==========================================================================
const backToTopBtn = document.getElementById('back-to-top');
if (backToTopBtn) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ==========================================================================
// IMAGE LIGHTBOX MODAL
// ==========================================================================
const imageModal = document.getElementById('image-modal');
const modalImg = document.getElementById('modal-img');
const modalCaption = document.getElementById('image-modal-caption');
const imageModalClose = document.getElementById('image-modal-close');

function openImageModal(src, alt) {
  if (!imageModal || !modalImg) return;
  modalImg.src = src;
  if (modalCaption) modalCaption.textContent = alt || '';
  imageModal.classList.add('show');
  document.body.style.overflow = 'hidden';
}

function closeImageModal() {
  if (!imageModal) return;
  imageModal.classList.remove('show');
  document.body.style.overflow = '';
}

if (imageModalClose) {
  imageModalClose.addEventListener('click', closeImageModal);
}

if (imageModal) {
  imageModal.addEventListener('click', (e) => {
    if (e.target === imageModal) closeImageModal();
  });
}

document.querySelectorAll('.modal-trigger').forEach(el => {
  el.addEventListener('click', (e) => {
    const img = el.tagName === 'IMG' ? el : el.querySelector('img');
    if (img && img.src) {
      e.stopPropagation();
      openImageModal(img.src, img.alt);
    }
  });
});

// ==========================================================================
// CUSTOM CURSOR FOLLOWER
// ==========================================================================
const cursorDot = document.getElementById('cursor-dot');
const cursorRing = document.getElementById('cursor-ring');

if (cursorDot && cursorRing && window.matchMedia('(pointer: fine)').matches) {
  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let ringX = mouseX;
  let ringY = mouseY;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursorDot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
  });

  function renderCursor() {
    ringX += (mouseX - ringX) * 0.18;
    ringY += (mouseY - ringY) * 0.18;
    cursorRing.style.transform = `translate(${ringX}px, ${ringY}px)`;
    requestAnimationFrame(renderCursor);
  }
  requestAnimationFrame(renderCursor);

  document.querySelectorAll('a, button, .btn, .stat-card-compact, .project-card, .skill-pill, .experience-card').forEach(item => {
    item.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
    item.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
  });
}

// ==========================================================================
// PORTFOLIO AI CHATBOT KNOWLEDGE ENGINE
// ==========================================================================
const chatbotToggle = document.getElementById('chatbot-toggle');
const chatbotClose = document.getElementById('chatbot-close');
const chatbotWidget = document.getElementById('chatbot-widget');
const chatbotMessages = document.getElementById('chatbot-messages');
const chatbotInput = document.getElementById('chatbot-input-field');
const chatbotSend = document.getElementById('chatbot-send');
const suggestionBtns = document.querySelectorAll('.suggestion-btn');

const knowledgeBase = {
  education: {
    keywords: ['education', 'college', 'university', 'degree', 'cgpa', 'marks', 'academic', 'mit', 'mysore', 'puc', 'sslc', 'grades', 'branch', 'ise', 'grad', 'graduate', 'year'],
    responses: [
      "🎓 <b>Academic Background:</b><br>• <b>B.E. in Information Science & Engineering:</b> Maharaja Institute of Technology Mysore — <b>9.12 CGPA</b> (Class of <b>2027</b>)<br>• <b>Pre-University (PUC PCMC):</b> <b>90.18%</b><br>• <b>SSLC:</b> <b>93.92%</b><br>• <b>Key Core Subjects:</b> Data Structures & Algorithms, Relational DBMS, Operating Systems, Computer Networks, and Java OOP."
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
    keywords: ['projects', 'built', 'developed', 'portfolio', 'applications', 'showcase', 'work'],
    responses: [
      "🚀 <b>Featured Projects:</b><br>1. 🛠️ <b>DARTX:</b> Published VS Code Extension for AST import scanning, alias mapping, and 1-click dependency resolution.<br>2. ⏰ <b>MITM-TimeEvolver:</b> Academic scheduling platform using Genetic Algorithms to resolve faculty/room constraints (2nd Prize Mini Project Expo).<br>3. 🎓 <b>SMART LAB:</b> C Programming Lab Assistant with GCC automated compilation, public/hidden test case evaluation, and syllabus PDF extraction.<br>4. 🌿 <b>HerbAura:</b> 3D Ayurvedic botanical garden with Three.js and AI mixture scoring.<br>5. 🌐 <b>Stepping Stone Academy:</b> Production Montessori web platform deployed on Netlify."
    ]
  },
  dartx: {
    keywords: ['dartx', 'dependency', 'extension', 'vs code extension', 'vs code tool', 'package manager'],
    responses: [
      "🛠️ <b>DARTX – Smart Dependency Manager & Scanner:</b><br>A published VS Code extension that automatically scans codebase imports via AST analysis, detects missing runtime packages, resolves tricky alias mappings (e.g., <code>cv2</code> &rarr; <code>opencv-python</code>, <code>PIL</code> &rarr; <code>Pillow</code>), and triggers secure 1-click package installs via pip/npm.<br>• <b>Stack:</b> JavaScript, Node.js, VS Code API.<br>• <b>GitHub:</b> <a href='https://github.com/SuraviR10/Dependency_Manager.git' target='_blank' style='color: var(--secondary-light);'>Dependency_Manager Repo</a>"
    ]
  },
  timetable: {
    keywords: ['timetable', 'time evolver', 'scheduling', 'genetic algorithm', 'genetic', 'mitm-time'],
    responses: [
      "⏰ <b>MITM-TimeEvolver – Smart Timetable Generator:</b><br>An algorithmic academic scheduling engine that uses Genetic Algorithms to solve multi-variable constraint satisfaction (faculty workload caps, lab block allocations, room collisions). Generates conflict-free departmental timetables in under 2 minutes.<br>• <b>Stack:</b> Python, Flask, Genetic Algorithm, Supabase.<br>• <b>Recognition:</b> Won <b>2nd Prize</b> at Mini Project Expo 2025.<br>• <b>GitHub:</b> <a href='https://github.com/SuraviR10/MITM-TimeEvolver.git' target='_blank' style='color: var(--secondary-light);'>MITM-TimeEvolver Repo</a>"
    ]
  },
  smartLab: {
    keywords: ['smart lab', 'lab assistant', 'c programming', 'assessment', 'gcc', 'compiler', 'test case', 'viva'],
    responses: [
      "🎓 <b>SMART LAB – C Programming Assessment System:</b><br>An intelligent lab assistant combining automated GCC/MinGW code compilation, plain-English compiler error translation, automated dual-tier test case evaluation (public + hidden), and automated lab syllabus PDF problem extraction.<br>• <b>Stack:</b> Python, Flask/FastAPI, GCC/MinGW Toolchain, SQLite.<br>• <b>GitHub:</b> <a href='https://github.com/SuraviR10/Ai-Programming-Lab-Assistant.git' target='_blank' style='color: var(--secondary-light);'>Ai-Programming-Lab-Assistant Repo</a>"
    ]
  },
  herbaura: {
    keywords: ['herbaura', 'ayurvedic', '3d garden', 'three.js', 'virtual garden', 'kashayam', 'plants'],
    responses: [
      "🌿 <b>HerbAura – 3D Virtual Ayurvedic Platform:</b><br>An interactive 3D botanical platform built during the VEC Hackathon. Features real-time 3D plant rendering, an AI herbal formula evaluator (Kashayam maker), and gamified botanical quizzes.<br>• <b>Video Demo:</b> <a href='https://youtu.be/V2mUIwrPJEc' target='_blank' style='color: #fca5a5;'>Watch YouTube Demo</a>"
    ]
  },
  achievements: {
    keywords: ['achievements', 'awards', 'prizes', 'recognition', 'gold medal', 'winner', 'rank'],
    responses: [
      "🏆 <b>Key Achievements & Credentials:</b><br>• <b>NPTEL Java Programming:</b> <b>98% Score</b>, <b>Top 1% Nationwide</b> (Elite + Gold Medal).<br>• <b>Mini Project Expo 2025:</b> <b>2nd Prize Winner</b> for MITM-TimeEvolver.<br>• <b>Best Project Award:</b> Recognized for AI-driven Waste Segregation System.<br>• <b>Published Tool:</b> Published DARTX extension on the official VS Code Marketplace."
    ]
  },
  certifications: {
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

const defaultFallbacks = [
  "💡 I can provide detailed insights on Suravi's <b>projects</b> (DARTX, Timetable Generator, SMART LAB), <b>skills</b> (Python, Java, Django, Flask, SQL), <b>experience</b>, or <b>contact details</b>. What would you like to explore?",
  "🤖 Feel free to ask about Suravi's backend engineering, algorithms, educational background (2027 Grad), or resume!"
];

function calculateScore(msg, keyword) {
  const regex = new RegExp(`\\b${keyword.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&')}\\b`, 'i');
  if (regex.test(msg)) return keyword.length * 3;
  if (msg.includes(keyword)) return keyword.length * 2;
  return 0;
}

function getChatbotResponse(msg) {
  const lower = msg.toLowerCase().trim();

  if (lower.match(/^(hi|hello|hey|greetings|namaste|good morning|good afternoon)/)) {
    return "Hello! 👋 I'm Suravi's portfolio assistant. What would you like to know about her software projects, technical skills, or experience?";
  }

  if (lower.match(/(thank|thanks|great|cool|awesome|perfect)/)) {
    return "You're welcome! Feel free to ask anything else about Suravi's engineering work or how to connect with her.";
  }

  let bestMatch = null;
  let highestScore = 0;

  for (const [key, item] of Object.entries(knowledgeBase)) {
    let score = 0;
    for (const kw of item.keywords) {
      score += calculateScore(lower, kw);
    }
    if (score > highestScore) {
      highestScore = score;
      bestMatch = item;
    }
  }

  if (bestMatch && highestScore > 0) {
    return bestMatch.responses[0];
  }

  return defaultFallbacks[Math.floor(Math.random() * defaultFallbacks.length)];
}

function appendMessage(text, sender) {
  if (!chatbotMessages) return;
  const msgDiv = document.createElement('div');
  msgDiv.className = sender === 'user' ? 'user-message' : 'bot-message';

  if (sender === 'bot') {
    msgDiv.innerHTML = `
      <div class="message-avatar"><i class="fas fa-robot"></i></div>
      <div class="message-content"><p>${text}</p></div>`;
  } else {
    msgDiv.innerHTML = `
      <div class="message-content"><p>${text}</p></div>`;
  }

  chatbotMessages.appendChild(msgDiv);
  chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

function sendUserMessage() {
  if (!chatbotInput) return;
  const text = chatbotInput.value.trim();
  if (!text) return;

  appendMessage(text, 'user');
  chatbotInput.value = '';

  const typingDiv = document.createElement('div');
  typingDiv.className = 'bot-message';
  typingDiv.id = 'chat-typing';
  typingDiv.innerHTML = `
    <div class="message-avatar"><i class="fas fa-robot"></i></div>
    <div class="message-content">
      <div class="typing-dots"><span></span><span></span><span></span></div>
    </div>`;
  chatbotMessages.appendChild(typingDiv);
  chatbotMessages.scrollTop = chatbotMessages.scrollHeight;

  setTimeout(() => {
    const typingEl = document.getElementById('chat-typing');
    if (typingEl) typingEl.remove();
    const reply = getChatbotResponse(text);
    appendMessage(reply, 'bot');
  }, 450);
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

const chatbotClear = document.getElementById('chatbot-clear');
if (chatbotClear && chatbotMessages) {
  chatbotClear.addEventListener('click', () => {
    chatbotMessages.innerHTML = `
      <div class="bot-message">
        <div class="message-avatar"><i class="fas fa-robot"></i></div>
        <div class="message-content"><p>Chat history cleared! Ask me anything about Suravi's projects or skills. 😊</p></div>
      </div>`;
  });
}

if (chatbotSend) chatbotSend.addEventListener('click', sendUserMessage);
if (chatbotInput) {
  chatbotInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendUserMessage();
  });
}

suggestionBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const q = btn.getAttribute('data-question');
    if (chatbotInput) {
      chatbotInput.value = q;
      sendUserMessage();
    }
  });
});
