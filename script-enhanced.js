// Initialize AOS
AOS.init({
  duration: 1000,
  once: true,
  offset: 100
});

// Typing Effect
new Typed('#typing-effect', {
  strings: ['AI Engineer', 'Backend Engineer', 'Intelligent Systems Builder', 'DevOps Enthusiast', 'Problem Solver'],
  typeSpeed: 80,
  backSpeed: 40,
  backDelay: 2000,
  loop: true
});

// Smooth cinematic scroll using Lenis (graceful fallback if CDN fails)
try {
  const lenis = new Lenis({
    duration: 1.5,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    smoothTouch: false,
    direction: 'vertical'
  });
  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);
} catch(e) {
  console.log('Lenis not available, using native scroll');
}

// Glowing cursor light effect (disabled on mobile and during scroll)
try {
  const isMobile = window.innerWidth <= 768;
  if (!isMobile) {
    const cursorLight = document.createElement('div');
    cursorLight.className = 'cursor-light';
    document.body.appendChild(cursorLight);
    let isScrolling = false;
    let scrollTimeout;
    
    window.addEventListener('mousemove', (e) => {
      if (!isScrolling) {
        gsap.to(cursorLight, { x: e.clientX, y: e.clientY, duration: 0.15, ease: 'power3.out' });
      }
    });
    
    window.addEventListener('scroll', () => {
      isScrolling = true;
      cursorLight.style.opacity = '0';
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        isScrolling = false;
        cursorLight.style.opacity = '0.65';
      }, 500);
    });
    
    window.addEventListener('mouseout', () => { gsap.to(cursorLight, { opacity: 0, duration: 0.25 }); });
    window.addEventListener('mouseover', () => { gsap.to(cursorLight, { opacity: 0.65, duration: 0.25 }); });
  }
} catch(e) {}

// Mobile Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.getElementById('nav-links');

menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
  });
});

gsap.registerPlugin(ScrollTrigger);

try {
  gsap.from('header', { y: -70, opacity: 0, duration: 1.2, ease: 'power3.out' });
  gsap.from('.hero-badge', { y: 20, opacity: 0, duration: 1, delay: 0.3, ease: 'power3.out' });
  gsap.from('.hero-content h1', { y: 50, opacity: 0, duration: 1.2, delay: 0.45, ease: 'power3.out', stagger: 0.08 });
  gsap.from('.hero-description', { y: 30, opacity: 0, duration: 1.1, delay: 0.8, ease: 'power3.out' });
  gsap.from('.hero-stats .stat', { y: 30, opacity: 0, duration: 1, delay: 1.0, ease: 'power3.out', stagger: 0.12 });
  gsap.from('.hero-buttons .btn', { y: 30, opacity: 0, duration: 1, delay: 1.3, ease: 'power3.out', stagger: 0.12 });

  const heroCard = document.querySelector('.profile-card');
  const heroContent = document.querySelector('.hero-content');
  window.addEventListener('mousemove', (event) => {
    const x = (event.clientX / window.innerWidth - 0.5) * 18;
    const y = (event.clientY / window.innerHeight - 0.5) * 18;
    gsap.to(heroCard, { x, y, rotationY: x * 0.07, rotationX: -y * 0.07, duration: 0.9, ease: 'power3.out' });
    gsap.to(heroContent, { x: x * 0.3, y: y * 0.3, duration: 0.9, ease: 'power3.out' });
  });
} catch(e) {
  console.log('GSAP animations skipped:', e.message);
}

// Enhanced Intelligent Chatbot
const isLocalFile = window.location.protocol === 'file:';
const isLiveServer = window.location.port !== '' && window.location.port !== '5000';
const CHATBOT_API_URL = (isLocalFile || isLiveServer) 
  ? 'http://localhost:5000/api/chat' 
  : '/api/chat';
const chatbotToggle = document.getElementById('chatbot-toggle');
const chatbotWidget = document.getElementById('chatbot-widget');
const chatbotClose = document.getElementById('chatbot-close');
const chatbotInput = document.getElementById('chatbot-input-field');
const chatbotSend = document.getElementById('chatbot-send');
const chatbotMessages = document.getElementById('chatbot-messages');
const suggestionBtns = document.querySelectorAll('.suggestion-btn');

const knowledgeBase = {
  about: {
    keywords: ['who are you', 'about', 'background', 'introduce', 'yourself', 'what do you do'],
    responses: [
      "🌟 Suravi R is a forward-thinking Information Science student who excels at turning ideas into innovative software. She combines strong academics with real projects and practical problem solving.",
      "Meet Suravi - a tech innovator passionate about AI, DevOps, and building next-generation applications. She maintains high academic standards (93.92% SSLC, 90.18% PUC) while creating impactful tools like AI assistants and intelligent learning systems.",
      "Suravi is a dedicated student focused on software engineering and scalable systems. She's currently building hands-on projects and has achieved national recognition in programming."
    ]
  },
  personal: {
    keywords: ['personal', 'unique', 'uniqueness', 'personality', 'strengths', 'special', 'what are you like', 'who are you'],
    responses: [
      "Suravi is a fast learner and a thoughtful problem solver who combines AI, DevOps, and engineering skills with creative hobbies like singing, occasional drawing, and travelling.",
      "She stays curious, practical, and focused on real-world solutions. Her mindset is calm, confident, and always ready to learn.",
      "Suravi balances technical strength with creative interests, which helps her build practical and inspiring software solutions."
    ]
  },
  interests: {
    keywords: ['interests', 'interest', 'travel', 'travelling', 'traveling', 'singing', 'drawing', 'creative', 'hobbies'],
    responses: [
      "🎶 Suravi enjoys singing, drawing occasionally, and travelling. Her creative hobbies help her stay inspired while she builds technical solutions.",
      "✈️ In addition to coding, Suravi loves travelling to new places and sketching ideas. She sings for fun and draws occasionally to keep her creativity flowing.",
      "🌟 Her interests combine creativity and curiosity: singing, occasional drawing, and travelling to discover new cultures and inspirations."
    ]
  },
  education: {
    keywords: ['education', 'study', 'college', 'university', 'degree', 'cgpa', 'marks', 'percentage', 'school', 'academic', 'academics', 'grades', 'score', 'mit', 'mysore'],
    responses: [
      "📚 Suravi's academic excellence is undeniable! B.E. in Information Science at MIT Mysore with 9.16 CGPA - that's top-tier performance! Her journey shows consistency: 93.92% in SSLC → 90.18% in PUC → 9.16 CGPA in engineering!",
      "🎓 When it comes to academics, Suravi is crushing it! MIT Mysore's 9.16 CGPA puts her among the top performers. She's learning DSA, DBMS, OS, and networks while maintaining excellence!",
      "📖 Suravi's academic track record is a testament to her dedication! From 93.92% in SSLC to 90.18% in PUC to 9.16 CGPA in engineering, she's consistently proven her commitment to excellence."
    ]
  },
  skills: {
    keywords: ['skills', 'programming', 'languages', 'technologies', 'tools', 'know', 'tech', 'technical', 'code', 'coding', 'expertise', 'proficient', 'master'],
    responses: [
      "💪 Suravi's tech stack is impressive! Java, Python, C, C++, SQL, HTML, CSS, JavaScript, and Flask. She also works with MySQL, PostgreSQL, Git, GitHub, Docker, and VS Code.",
      "🛠️ From core concepts (DSA, OOP, OS, DBMS, CN) to web development and DevOps, Suravi has a strong and balanced skill set.",
      "⚡ Suravi combines programming languages, database tools, web frameworks, and version control to build complete, professional applications."
    ]
  },
  projects: {
    keywords: ['projects', 'work', 'built', 'developed', 'created', 'portfolio', 'made', 'application', 'system', 'assistant', 'garden', 'timetable', 'stepping stone'],
    responses: [
      "🏆 Suravi's projects showcase real innovation! MITM-Time Evolver (2nd Prize), Virtual Ayurvedic Garden, Stepping Stone Academy website, AI Powered Lab Programming Assistant, and Dependify (VS Code Extension).",
      "🚀 Her portfolio spans algorithmic optimization, responsive web design, immersive 3D experience, and AI education tools. Each project is practical and user-focused.",
      "💡 Suravi doesn't just code—she builds useful solutions. Her projects solve real problems with clean design and thoughtful implementation."
    ]
  },
  timetableProject: {
    keywords: ['timetable', 'time table', 'automated timetable', 'schedule', 'time evolver', 'mitm-time', 'timetable generator'],
    responses: [
      "📊 MITM-Time Evolver is an automatic timetable generator that handles faculty availability, room clashes, and workload balance using optimization logic.",
      "🔧 The timetable project uses algorithmic scoring to select the best schedule, making college timetable creation faster and more reliable.",
      "💡 This project won 2nd Prize because it solves a real campus scheduling challenge with intelligence and automation."
    ]
  },
  steppingStoneProject: {
    keywords: ['stepping stone', 'academy website', 'school website', 'education website', 'montessori', 'steppingstone'],
    responses: [
      "🌐 The Stepping Stone Academy Website is a polished, mobile-first site built for a real school client with strong UI and easy navigation.",
      "🎨 This website uses clean design and responsive layouts to present school information in a professional and accessible way.",
      "🧩 The project highlights Suravi's ability to build real client-facing websites with thoughtful visuals and clear messaging."
    ]
  },
  virtualGardenProject: {
    keywords: ['virtual garden', 'herbaura', 'ayurvedic garden', '3d garden', 'garden project', 'khashayam'],
    responses: [
      "🌿 HerbAura is a 3D Ayurvedic garden project that teaches users about plants, herbal remedies, and traditional wellness in an interactive way.",
      "🧠 It combines immersive visuals with a herbal recipe maker and quizzes to make learning about Ayurveda fun and engaging.",
      "🎮 This project shows Suravi's strength in blending graphics, education, and user experience into a polished digital product."
    ]
  },
  labAssistantProject: {
    keywords: ['lab assistant', 'programming assistant', 'lab programming', 'ai powered lab', 'education assistant', 'viva'],
    responses: [
      "🤖 The AI Powered Lab Programming Assistant helps students learn programming concepts, debug code, and prepare for viva questions with guided explanations.",
      "💡 It focuses on understanding rather than copying, so learners can build stronger logic and solve lab problems confidently.",
      "📌 This educational project highlights Suravi's interest in using AI to improve how students learn programming."
    ]
  },
  dependencyManager: {
    keywords: ['dependency manager', 'vs code extension', 'environment provisioning', 'smart dependency', 'dependency'],
    responses: [
      "🔧 Dependify is a production-ready VS Code extension that automates dependency issue detection and secure package resolution for Python and Node.js.",
      "⚡ It acts as an intelligent assistant, continuously monitoring terminal output to identify runtime errors and translating them into beginner-friendly explanations.",
      "💼 Published on the VS Code Marketplace, it features intelligent package mapping, strict command validation to prevent injection attacks, and conflict analysis."
    ]
  },
  achievements: {
    keywords: ['achievements', 'awards', 'prizes', 'accomplishments', 'recognition', 'won', 'winner', 'success', 'nptel', 'top 1%', '98%'],
    responses: [
      "🥇 Suravi earned NPTEL Programming in Java with 98% and Top 1% nationwide, plus 2nd Prize at the Mini Project Expo for the Timetable Generator.",
      "🌟 Her achievements highlight both academic excellence and project impact, demonstrating consistent growth and high performance.",
      "🎯 She has awards, certifications, and hackathon success that prove her dedication and skill across multiple domains."
    ]
  },
  certificates: {
    keywords: ['certificates', 'certifications', 'certified', 'credentials', 'course', 'training', 'linkedin', 'skyscanner', 'nptel'],
    responses: [
      "📜 Suravi's certifications include NPTEL Java (Top 1%), Skyscanner Front-End Job Simulation, and LinkedIn Prompt Engineering.",
      "✅ Her certification path shows strong commitment to programming, web development, and modern AI skills.",
      "🏅 These credentials complement her project work and make her ready for industry roles."
    ]
  },
  hackathons: {
    keywords: ['hackathon', 'hackathons', 'competition', 'contest', 'vec', 'mitm', 'agroforecast', 'virtual garden', 'vvce', 'build for mysuru', 'onemysuru'],
    responses: [
      "💻 Suravi has participated in hackathons like MIT Mysore (AgroForeCast, Build for Mysuru) and VEC (Virtual Garden), developing rapid prototypes and entrepreneurial solutions under pressure.",
      "🚀 These hackathons sharpened her teamwork, full-stack skills, business strategy, and ability to deliver working solutions quickly.",
      "⚡ She uses hackathon experience to build resilient, user-centered projects in short timeframes, as seen with HerbAura and OneMysuru."
    ]
  },
  industrial: {
    keywords: ['industrial', 'industry', 'visit', 'visits', 'fanuc', 'sap', 'company', 'exposure', 'factory'],
    responses: [
      "🏭 Suravi visited FANUC India and SAP Labs to learn about robotics automation and enterprise software engineering.",
      "🌐 Those visits helped her see how technology powers manufacturing and large-scale business applications.",
      "🔧 Industry exposure gave her practical insights into systems design, automation, and real-world software development."
    ]
  },
  ongoing: {
    keywords: ['current', 'currently', 'working on', 'ongoing', 'now', 'present', 'latest', 'building', 'developing'],
    responses: [
      "🚀 Suravi is currently exploring advanced software development, intelligent systems, and scalable applications.",
      "💻 She is building practical projects and continuously learning new technologies in AI, web, and DevOps.",
      "⚡ Her current focus is on combining AI with real-world systems and improving her engineering skills."
    ]
  },
  journey: {
    keywords: ['journey', 'growth', 'timeline', 'story', 'path', 'progression', 'evolution', 'started', 'began'],
    responses: [
      "📈 Suravi's journey started with C++ in 11th grade and has progressed through web development, programming fundamentals, real project deployment, and award-winning innovation.",
      "🌟 Her growth shows consistent learning: web design, Python, core CS concepts, project building, hackathons, and AI systems.",
      "🚀 Suravi is building a strong tech skillset with each semester—moving from curiosity to project experience to innovation."
    ]
  },
  career: {
    keywords: ['career', 'goals', 'future', 'vision', 'aspiration', 'dream', 'want', 'plan', 'ambition', 'looking for', 'opportunity', 'job', 'internship', 'work for', 'work at', 'google', 'microsoft', 'sap', 'atlassian'],
    responses: [
      "🎯 Suravi wants to work on AI-driven systems and impactful software at top companies like Google, Microsoft, Atlassian, and SAP.",
      "🚀 She is focused on roles where she can grow, innovate, and build scalable engineering solutions.",
      "💼 Her career aspiration is to gain real-world experience in software development, AI, DevOps, or cloud engineering."
    ]
  },
  strengths: {
    keywords: ['strengths', 'special', 'unique', 'stand out', 'different', 'best', 'good at', 'strong', 'advantage', 'why hire', 'why choose', 'fast learner', 'good observer'],
    responses: [
      "⭐ Suravi stands out because she learns quickly, observes well, adapts to new challenges, and delivers polished solutions.",
      "🔥 Her strength is combining academic excellence with real project delivery and a practical problem-solving mindset.",
      "💎 She brings strong fundamentals, effective communication, and a creative mindset to every technical challenge."
    ]
  },
  personality: {
    keywords: ['personality', 'tone', 'character', 'attitude', 'like'],
    responses: [
      "Suravi is friendly, honest, calm, and confident. She values clear communication and practical teamwork."
    ]
  },
  contact: {
    keywords: ['contact', 'email', 'reach', 'connect', 'linkedin', 'github', 'social', 'message', 'hire', 'recruit', 'reach out'],
    responses: [
      "📧 Email: suravimys@gmail.com. LinkedIn: linkedin.com/in/suravir/. GitHub: github.com/TechSphere10.",
      "🤝 Suravi is open to internships, collaborations, and full-time roles. Reach out via email or LinkedIn!",
      "💬 The best way to contact her is by emailing suravimys@gmail.com or connecting on LinkedIn."
    ]
  },
  resume: {
    keywords: ['resume', 'cv', 'download', 'pdf', 'document', 'profile', 'application'],
    responses: [
      "📄 Download Suravi's resume from the portfolio site to see her academic, project, and certification details.",
      "📋 Use the resume button on the site for a full professional profile. If needed, ask for it by email at suravimys@gmail.com.",
      "📑 The resume contains everything about her education, skills, projects, achievements, and career goals."
    ]
  }
};
const innovativeFallbacks = [
  "🤔 That's an interesting question! While I don't have specific information about that, I can tell you about Suravi's impressive skills, hackathon experiences, projects, industrial visits, or achievements. What would you like to know?",
  "💡 Great question! I'm designed to answer questions about Suravi's technical background, education, projects, hackathons (like Virtual Garden), industrial visits (FANUC, SAP), and career goals. Feel free to ask about any of these!",
  "🎯 I appreciate your curiosity! I specialize in Suravi's portfolio - her 9.16 CGPA, Top 1% NPTEL ranking, award-winning projects, hackathon experiences, industrial exposure, and technical skills. What interests you most?",
  "✨ That's a creative question! While I might not have that exact info, I can share amazing details about Suravi's journey - from building an OS to winning hackathons to visiting FANUC and SAP. What would you like to explore?",
  "🚀 Interesting angle! I'm here to showcase Suravi's technical excellence, problem-solving abilities, hackathon participation, industry exposure, and real-world project experience. Ask me about her achievements or certifications!",
  "🌟 You're asking the right assistant! I know all about Suravi's achievements, technical skills, hackathon projects (like Virtual Garden), industrial visits (FANUC, SAP), and career aspirations. What can I tell you?",
  "📚 That's a thoughtful question! I'm your go-to source for Suravi's academic excellence (9.16 CGPA), practical experience, award-winning projects, and OS development. What aspect interests you?"
];

function calculateKeywordScore(message, keyword) {
  const exactMatch = new RegExp(`\\b${keyword.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&')}\\b`, 'i');
  if (exactMatch.test(message)) {
    return keyword.length * 3;
  }
  if (message.includes(keyword)) {
    return keyword.length * 2;
  }
  return 0;
}

// Toggle Chatbot
chatbotToggle.addEventListener('click', () => {
  chatbotWidget.classList.toggle('active');
});

chatbotClose.addEventListener('click', () => {
  chatbotWidget.classList.remove('active');
});

const chatbotClear = document.getElementById('chatbot-clear');
if (chatbotClear) {
  chatbotClear.addEventListener('click', () => {
    chatbotMessages.innerHTML = `
      <div class="bot-message">
        <div class="message-avatar"><i class="fas fa-robot"></i></div>
        <div class="message-content"><p>Chat cleared! Ask me anything about Suravi. 😊</p></div>
      </div>`;
  });
}

// Send Message
async function sendMessage() {
  const message = chatbotInput.value.trim();
  if (!message) return;

  addMessage(message, 'user');
  chatbotInput.value = '';
  showTypingIndicator();

  try {
    // Attempt to get response from Backend first
    const response = await fetch(CHATBOT_API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: message })
    });

    if (response.ok) {
      const data = await response.json();
      removeTypingIndicator();
      addMessage(data.bot_response, 'bot');
    } else {
      throw new Error('Backend unreachable');
    }
  } catch (error) {
    // Fallback to local intelligence if backend is offline
    console.log('Using local fallback knowledge base...');
    setTimeout(() => {
      removeTypingIndicator();
      const response = getBotResponse(message);
      addMessage(response, 'bot');
    }, 800);
  }
}

chatbotSend.addEventListener('click', sendMessage);
chatbotInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') sendMessage();
});

// Suggestion buttons
suggestionBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const question = btn.getAttribute('data-question');
    chatbotInput.value = question;
    sendMessage();
  });
});

// Attach click listeners to project buttons directly for reliable modal opening
function initializeProjectButtons() {
  console.log('Initializing project buttons...');
  const buttons = document.querySelectorAll('.btn-ppt');
  console.log('Found', buttons.length, 'project buttons');
  
  buttons.forEach(button => {
    button.type = 'button';
    button.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const projectId = button.dataset.project;
      console.log('Button clicked, projectId:', projectId);
      if (!projectId) {
        console.error('No projectId found on button');
        return;
      }
      openPPT(projectId);
    });
  });
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeProjectButtons);
} else {
  initializeProjectButtons();
}

function addMessage(text, type) {
  const messageDiv = document.createElement('div');
  messageDiv.className = type === 'user' ? 'user-message' : 'bot-message';
  
  if (type === 'bot') {
    messageDiv.innerHTML = `
      <div class="message-avatar">
        <i class="fas fa-robot"></i>
      </div>
      <div class="message-content">
        <p>${text}</p>
      </div>
    `;
  } else {
    messageDiv.innerHTML = `
      <div class="message-content">
        <p>${text}</p>
      </div>
    `;
  }
  
  chatbotMessages.appendChild(messageDiv);
  chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

// Intelligent Response Generator
function getBotResponse(message) {
  const lowerMessage = message.toLowerCase();
  
  // Greetings
  if (lowerMessage.match(/^(hi|hello|hey|greetings|hola|namaste|good morning|good afternoon|good evening)/)) {
    const greetings = [
      "Hello! 👋 I'm Portfolio AI Assistant. What would you like to know about Suravi?",
      "Hi there! 😊 Great to meet you! Ask me anything about Suravi's skills, projects, hackathons, or achievements!",
      "Hey! 🌟 Welcome! I'd love to share Suravi's incredible journey with you!"
    ];
    return greetings[Math.floor(Math.random() * greetings.length)];
  }
  
  // Thanks
  if (lowerMessage.match(/(thank|thanks|appreciate|thx|awesome|great|cool|nice)/)) {
    const thanks = [
      "You're very welcome! 😊 Feel free to ask me anything else!",
      "My pleasure! 🌟 Is there anything else you'd like to know?",
      "Glad I could help! 👍 Want to explore more about Suravi?"
    ];
    return thanks[Math.floor(Math.random() * thanks.length)];
  }
  
  // Goodbye
  if (lowerMessage.match(/(bye|goodbye|see you|later|gtg|got to go)/)) {
    const byes = [
      "Goodbye! 👋 Thanks for learning about Suravi. Don't forget to connect with her!",
      "See you later! 🌟 I hope you're impressed by Suravi's profile!",
      "Take care! 😊 Remember, Suravi is always open to exciting opportunities!"
    ];
    return byes[Math.floor(Math.random() * byes.length)];
  }
  
  // Search knowledge base
  let bestMatch = null;
  let highestScore = 0;
  let bestKeywordLength = 0;
  
  for (const [category, data] of Object.entries(knowledgeBase)) {
    let score = 0;
    let matchedKeywordLength = 0;
    for (const keyword of data.keywords) {
      const keywordScore = calculateKeywordScore(lowerMessage, keyword);
      score += keywordScore;
      if (keywordScore > 0) {
        matchedKeywordLength = Math.max(matchedKeywordLength, keyword.length);
      }
    }
    if (score > highestScore || (score === highestScore && matchedKeywordLength > bestKeywordLength)) {
      highestScore = score;
      bestMatch = data;
      bestKeywordLength = matchedKeywordLength;
    }
  }
  
  if (bestMatch && highestScore > 0) {
    const responses = bestMatch.responses;
    return responses[Math.floor(Math.random() * responses.length)];
  }
  
  return innovativeFallbacks[Math.floor(Math.random() * innovativeFallbacks.length)];
}

// Typing indicator
function showTypingIndicator() {
  const typingDiv = document.createElement('div');
  typingDiv.className = 'bot-message typing-indicator';
  typingDiv.id = 'typing-indicator';
  typingDiv.innerHTML = `
    <div class="message-avatar">
      <i class="fas fa-robot"></i>
    </div>
    <div class="message-content">
      <div class="typing-dots">
        <span></span><span></span><span></span>
      </div>
    </div>
  `;
  chatbotMessages.appendChild(typingDiv);
  chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

function removeTypingIndicator() {
  const typingIndicator = document.getElementById('typing-indicator');
  if (typingIndicator) {
    typingIndicator.remove();
  }
}

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Handle returning to specific sections from other pages
window.addEventListener('load', () => {
  if (window.location.hash) {
    const target = document.querySelector(window.location.hash);
    if (target) {
      setTimeout(() => {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  }
});

// Navbar Background on Scroll
window.addEventListener('scroll', () => {
  const header = document.querySelector('header');
  if (window.scrollY > 100) {
    header.style.background = 'rgba(15, 23, 42, 0.98)';
  } else {
    header.style.background = 'rgba(15, 23, 42, 0.95)';
  }
});

// Form Submission
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const formStatus = document.getElementById('form-status');
    const formData = new FormData(contactForm);
    const visitorName = formData.get('name') || 'Visitor';
    const visitorEmail = formData.get('_replyto') || '';
    formData.set('_subject', `Portfolio message from ${visitorName}`);
    formData.set('_replyto', visitorEmail);
    formData.set('_to', 'suravimys@gmail.com');
    
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    fetch(contactForm.action, {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json'
      }
    }).then(response => {
      if (response.ok) {
        formStatus.className = 'form-status success';
        formStatus.textContent = '✓ Message sent successfully! I\'ll get back to you soon.';
        contactForm.reset();
      } else {
        throw new Error('Form submission failed');
      }
    }).catch(error => {
      formStatus.className = 'form-status error';
      formStatus.textContent = '✗ Oops! Something went wrong. Please try again.';
    }).finally(() => {
      submitBtn.textContent = 'Send Message';
      submitBtn.disabled = false;
      
      setTimeout(() => {
        formStatus.style.display = 'none';
      }, 5000);
    });
  });
}

// Scroll Progress Bar
const scrollProgress = document.getElementById('scroll-progress');

window.addEventListener('scroll', () => {
  const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrolled = (window.scrollY / windowHeight) * 100;
  scrollProgress.style.width = scrolled + '%';
});

// Back to Top Button
const backToTopBtn = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
  if (window.scrollY > 500) {
    backToTopBtn.classList.add('visible');
  } else {
    backToTopBtn.classList.remove('visible');
  }
});

backToTopBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// Add animation to elements on scroll - Removed custom IntersectionObserver as AOS is already used

// PPT Presentation Logic
let currentSlideIndex = 0;
let currentProjectSlides = [];

const projectData = {
  timetable: {
    title: "Smart Automated Timetable Generation System",
    slides: [
      { 
        title: "The Problem", 
        items: [
          "<b>Manual Effort:</b> Timetable creation consumes weeks of administrative work and is highly error-prone.",
          "<b>Resource Conflicts:</b> Frequent clashes occur with faculty, rooms, and student group schedules.",
          "<b>Inefficiency:</b> Sub-optimal resource utilization leads to wasted time and space."
        ], 
        media: { type: 'image', src: 'images/Timetable/1.png' } 
      },
      { 
        title: "The Solution", 
        items: [
          "<b>Genetic Algorithm:</b> An intelligent system that evolves schedules to find the best fit, inspired by natural selection.",
          "<b>Constraint Handling:</b> Manages faculty availability, lab allocations, and workload balancing automatically.",
          "<b>Rapid Generation:</b> Produces optimized, conflict-free timetables in minutes, not weeks."
        ], 
        media: { type: 'image', src: 'images/Timetable/2.png' } 
      },
      { 
        title: "Impact", 
        items: [
          "<b>95% Time Reduction:</b> Reduces scheduling time from weeks to minutes, freeing up administrative resources.",
          "<b>Zero Conflicts:</b> Guarantees clash-free schedules for all faculty, rooms, and student groups.",
          "<b>Award-Winning Innovation:</b> Recognized with 2nd Prize at the Mini Project Expo for its practical impact."
        ], 
        media: { type: 'image', src: 'images/Timetable/3.png' } 
      }
    ]
  },
  dependency: {
    title: "DARTX (Dependency Analysis, Resolution, Tracking & eXecution)", // Changed title from Dependify to DARTX
    slides: [
      { title: "The Problem", items: ["<b>Productivity Loss:</b> Errors like `ModuleNotFoundError` break development flow.", "<b>Context Switching:</b> Constantly moving to the terminal to fix dependency issues.", "<b>Wasted Time:</b> Manually debugging environment conflicts instead of coding."], media: { type: 'image', src: 'images/DARTX/DARTX_Problem.png' } },
      { title: "The Solution", items: ["<b>Automated Detection:</b> An intelligent VS Code extension that silently monitors for dependency errors.", "<b>One-Click Resolution:</b> Provides instant, secure, and actionable notifications to fix issues.", "<b>Developer Focus:</b> Keeps developers in their editor, focused on building features."], media: { type: 'image', src: 'images/DARTX/DARTX1.png' } },
      { title: "Core Features", items: ["<b>Intelligent Mapping:</b> Automatically resolves common aliases (e.g., 'cv2' to 'opencv-python').", "<b>Security First:</b> Validates packages against official registries to prevent typosquatting.", "<b>Published Tool:</b> Available on the VS Code Marketplace for any developer to use."], media: { type: 'image', src: 'images/DARTX/DARTX.png' } }
    ]
  },
  steppingStone: {
    title: "Stepping Stone Academy Website",
    slides: [
      { title: "The Goal", items: ["<b>Establish Digital Presence:</b> Build a modern, responsive website for a real-world Montessori school.", "<b>Build Trust:</b> Provide clear information on admissions, curriculum, and faculty to build parental confidence.", "<b>Improve Accessibility:</b> Ensure the site is easy to navigate for parents on any device."], media: { type: 'image', src: 'images/stepping_stone_preview.png' } },
      { title: "Features & Impact", items: ["<b>Mobile-First Design:</b> A clean, intuitive layout that works perfectly on phones, tablets, and desktops.", "<b>Clear Visual Storytelling:</b> Uses engaging animations and a clear visual hierarchy to guide users.", "<b>Live & Deployed:</b> The website is successfully deployed and actively used by the school."], media: { type: 'image', src: 'images/stepping_stone_live.png' } }
    ]
  },
  virtualGarden: {
    title: "HerbAura - Virtual Ayurvedic Garden",
    slides: [
      { title: "The Vision", items: ["<b>Modernize Ancient Knowledge:</b> Transform static Ayurvedic texts into an engaging, interactive experience.", "<b>Gamified Learning:</b> Use 3D visuals and games to make learning about medicinal plants fun for all ages.", "<b>AI-Powered Guidance:</b> Provide intelligent suggestions for herbal combinations."], media: { type: 'video', src: 'images/Virtual_Garden/Screen_Recording.mp4' } },
      { title: "Core Features", items: ["<b>Interactive 3D Garden:</b> A fully explorable world built with Three.js where users can inspect plant models.", "<b>AI Khashayam Maker:</b> An intelligent system that scores herbal combinations for wellness.", "<b>Engaging Quizzes:</b> A memory game and quiz module to reinforce learning."], media: { type: 'image', src: 'images/Hackathon/2nd_hackthon.jpg' } },
      { title: "Hackathon Success", items: ["<b>Built in 24 Hours:</b> Developed as a full-stack application during the VEC Hackathon.", "<b>Praised for Innovation:</b> Received recognition for its unique concept and smooth 3D execution.", "<b>Demonstrated Rapid Prototyping:</b> Showcased the ability to integrate frontend, backend, and AI under pressure."], media: { type: 'image', src: 'images/Project.jpeg' } }
    ]
  },
  labAssistant: {
    title: "AI Powered Lab Programming Assistant",
    slides: [
      { title: "The Problem", items: ["<b>Rote Learning:</b> Students often copy lab code without understanding the underlying logic.", "<b>Skill Gap:</b> This leads to weak debugging skills, low confidence, and poor viva performance.", "<b>Lack of Guidance:</b> Instructors cannot provide personalized guidance to every student at once."], media: { type: 'image', src: 'images/lab_assistant_problem.png' } },
      { title: "The Solution", items: ["<b>Socratic Questioning:</b> An AI assistant that guides students through logic-building with questions instead of giving away answers.", "<b>Intelligent Debugging:</b> Translates cryptic compiler errors into plain, beginner-friendly English.", "<b>Automated Parsing:</b> Automatically extracts objectives, concepts, and viva questions from lab manuals."], media: { type: 'image', src: 'images/lab_assistant_solution.png' } },
      { title: "Educational Impact", items: ["<b>Fosters Understanding:</b> Transforms lab sessions from code-copying exercises into true logic-building experiences.", "<b>Builds Confidence:</b> Improves problem-solving skills, coding confidence, and viva readiness.", "<b>Scalable Learning:</b> Provides personalized, scalable guidance to every student in the lab."], media: { type: 'image', src: 'images/lab_assistant_impact.png' } }
    ]
  }
};

function openPPT(projectId) {
  console.log('openPPT called with projectId:', projectId);
  console.log('Available projects:', Object.keys(projectData));
  
  const project = projectData[projectId];
  if (!project) {
    console.error('Project not found:', projectId);
    return;
  }

  console.log('Project found:', project.title);
  console.log('Number of slides:', project.slides.length);

  const titleElement = document.getElementById('ppt-title');
  if (!titleElement) {
    console.error('ppt-title element not found');
    return;
  }

  titleElement.innerText = project.title;
  currentProjectSlides = project.slides;
  currentSlideIndex = 0;
  
  console.log('Calling renderSlides...');
  renderSlides();
  
  const modal = document.getElementById('ppt-modal');
  if (!modal) {
    console.error('ppt-modal element not found');
    return;
  }
  
  console.log('Adding active class to modal');
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
  console.log('Modal opened successfully');
}

function closePPT() {
  document.getElementById('ppt-modal').classList.remove('active');
  document.body.style.overflow = 'auto';
}

function renderSlides() {
  console.log('renderSlides called with', currentProjectSlides.length, 'slides');
  
  const body = document.getElementById('ppt-body');
  const dotsContainer = document.getElementById('ppt-dots');
  
  if (!body || !dotsContainer) {
    console.error('ppt-body or ppt-dots not found');
    return;
  }

  body.innerHTML = '';
  dotsContainer.innerHTML = '';

  currentProjectSlides.forEach((slide, index) => {
    // Create Slide
    const slideDiv = document.createElement('div');
    slideDiv.className = `ppt-slide ${index === currentSlideIndex ? 'active' : ''}`;
    
    let mediaMarkup = '<div class="slide-media"><div class="slide-no-media"><i class="fas fa-lightbulb"></i></div></div>';
    if (slide.media) {
      if (slide.media.type === 'video') {
        mediaMarkup = `
          <div class="slide-media">
            <video src="${slide.media.src}" autoplay muted loop playsinline></video>
          </div>
        `;
      } else {
        mediaMarkup = `
          <div class="slide-media">
            <img src="${slide.media.src}" alt="${slide.title}">
          </div>
        `;
      }
    }

    let listItems = slide.items.map(item => `<li>${item.replace(/<b>(.*?)<\/b>/g, (match, p1) => `<b>${p1}</b>`)}</li>`).join('');
    
    slideDiv.innerHTML = `
      ${mediaMarkup}
      <div class="slide-panel">
        <h4>${slide.title}</h4>
        <ul>${listItems}</ul>
      </div>
    `;
    body.appendChild(slideDiv);

    // Create Dot
    const dot = document.createElement('div');
    dot.className = `ppt-dot ${index === currentSlideIndex ? 'active' : ''}`;
    dot.onclick = () => goToSlide(index);
    dotsContainer.appendChild(dot);
  });

  console.log('Slides rendered:', body.querySelectorAll('.ppt-slide').length);

  // After DOM updated, handle videos and animate transitions
  // Ensure videos play at 2x when present
  const videos = body.querySelectorAll('video');
  console.log('Found', videos.length, 'videos');
  videos.forEach(v => {
    try {
      v.playbackRate = 2.0;
      v.muted = true;
      v.loop = true;
      v.play().catch(() => {});
    } catch (err) {
      console.warn('Video error:', err);
    }
  });

  // GSAP slide animation: rotate/slight 3D feel between active and inactive slides
  try {
    const slides = Array.from(body.querySelectorAll('.ppt-slide'));
    slides.forEach((s, i) => {
      gsap.set(s, { transformOrigin: '50% 50% -200px', perspective: 1200 });
    });

    slides.forEach((s, i) => {
      if (i === currentSlideIndex) {
        gsap.fromTo(s, { rotationY: -12, x: 60, opacity: 0, scale: 0.98 }, { rotationY: 0, x: 0, opacity: 1, scale: 1, duration: 0.7, ease: 'power3.out' });
      } else {
        gsap.to(s, { rotationY: 8, x: -40, opacity: 0, scale: 0.98, duration: 0.5, ease: 'power2.in' });
      }
    });
  } catch (err) {
    console.warn('GSAP animation error:', err);
  }
}

function nextSlide() {
  if (currentSlideIndex < currentProjectSlides.length - 1) {
    currentSlideIndex++;
    renderSlides();
  }
}

function prevSlide() {
  if (currentSlideIndex > 0) {
    currentSlideIndex--;
    renderSlides();
  }
}

function goToSlide(index) {
  currentSlideIndex = index;
  renderSlides();
}

// Expose globally for inline and programmatic navigation
window.openPPT = openPPT;
window.closePPT = closePPT;
window.nextSlide = nextSlide;
window.prevSlide = prevSlide;
window.goToSlide = goToSlide;

// Close modal on background click
document.getElementById('ppt-modal').addEventListener('click', (e) => {
  if (e.target.id === 'ppt-modal') closePPT();
});

// Touch and keyboard navigation for the modal
let touchStartX = 0;
const pptBody = document.getElementById('ppt-body');
if (pptBody) {
  pptBody.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].clientX;
  });

  pptBody.addEventListener('touchend', (e) => {
    const touchEndX = e.changedTouches[0].clientX;
    if (touchEndX - touchStartX > 50) prevSlide();
    if (touchStartX - touchEndX > 50) nextSlide();
  });
}

window.addEventListener('keyup', (e) => {
  const modal = document.getElementById('ppt-modal');
  if (!modal.classList.contains('active')) return;
  if (e.key === 'ArrowRight') nextSlide();
  if (e.key === 'ArrowLeft') prevSlide();
  if (e.key === 'Escape') closePPT();
});

console.log('Portfolio with Enhanced AI Assistant loaded! 🚀');

// 3D Tilt Effect for premium interactivity
document.addEventListener('DOMContentLoaded', () => {
  const tiltCards = document.querySelectorAll('.project-card, .about-card, .experience-card, .hackathon-card, .visit-card, .certificate-card');
  
  tiltCards.forEach(card => {
    card.addEventListener('mousemove', e => {
      // Disable tilt on mobile for better scrolling experience
      if (window.innerWidth <= 768) return;
      
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = ((y - centerY) / centerY) * -4;
      const rotateY = ((x - centerX) / centerX) * 4;
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
      card.style.transition = 'none';
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.transition = 'transform 0.5s ease';
    });
  });
});

// Image Modal Logic
document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById("image-modal");
  if (!modal) return;

  const modalImg = document.getElementById("modal-img");
  const captionText = document.getElementById("image-modal-caption");
  
  document.querySelectorAll('.modal-trigger').forEach(trigger => {
    trigger.onclick = function(e){
      e.preventDefault();

      let imageElement = this;
      // If the trigger is not an image itself (like a button), find the image within the parent card
      if (this.tagName !== 'IMG') {
        const card = this.closest('.certificate-card, .hackathon-card, .visit-card, .journey-stage, .profile-card');
        if (card) {
          imageElement = card.querySelector('img');
        }
      }

      if (imageElement && imageElement.src) {
        modal.style.display = "flex";
        modalImg.src = imageElement.src;
        captionText.innerHTML = imageElement.alt;
      }
    };
  });

  const closeBtn = document.getElementById("image-modal-close");
  if (closeBtn) {
    closeBtn.onclick = () => {
      modal.style.display = "none";
    };
  }
  
  modal.onclick = (event) => {
    if (event.target === modal) modal.style.display = "none";
  };
});
