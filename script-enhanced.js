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

// Old cursor-light replaced by new custom cursor system (see end of file)


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
        title: "01. Problem Brief", 
        tag: "MANUAL SCHEDULING BOTTLENECK",
        items: [
          "<b>Manual Effort:</b> Timetable creation consumes weeks of administrative work and is error-prone.",
          "<b>Resource Conflicts:</b> Frequent clashes occur with faculty, room allocations, and student batches.",
          "<b>Space Waste:</b> Sub-optimal lab and room utilization leads to schedule bottlenecks."
        ], 
        media: { type: 'image', src: 'images/Timetable/1.png' } 
      },
      { 
        title: "02. Core Innovation", 
        tag: "GENETIC ALGORITHM ENGINE",
        items: [
          "<b>Genetic Algorithm:</b> Evolves timetable schedules through iterative selection to find optimal fits.",
          "<b>Constraint Engine:</b> Enforces faculty workload limits, room capacity, and lab availability.",
          "<b>Rapid Execution:</b> Generates fully conflict-free timetables in under 2 minutes."
        ], 
        media: { type: 'image', src: 'images/Timetable/2.png' } 
      },
      { 
        title: "03. Impact & Recognition", 
        tag: "EXPO AWARD WINNER",
        items: [
          "<b>95% Time Reduction:</b> Replaces weeks of manual scheduling with automated calculation.",
          "<b>Zero Conflicts:</b> Guarantees clash-free timetables for faculty, rooms, and departments.",
          "<b>Award Winner:</b> Recognized with 2nd Prize at the Mini Project Expo for real-world impact."
        ], 
        media: { type: 'image', src: 'images/Timetable/3.png' } 
      }
    ]
  },
  dependency: {
    title: "DARTX – Smart Dependency Manager",
    slides: [
      { 
        title: "01. Problem Brief", 
        tag: "DEVELOPMENT WORKFLOW FRICTION",
        items: [
          "<b>Runtime Crashes:</b> Cryptic `ModuleNotFoundError` tracebacks interrupt active coding.",
          "<b>Context Switching:</b> Developers lose focus jumping between editor and command terminal.",
          "<b>Wasted Hours:</b> Manual environment debugging burns developer time and energy."
        ], 
        media: { type: 'image', src: 'images/DARTX/DARTX_Problem.png' } 
      },
      { 
        title: "02. Core Solution", 
        tag: "INTELLIGENT VS CODE EXTENSION",
        items: [
          "<b>Silent Monitor:</b> Silently analyzes terminal logs to catch package error tracebacks.",
          "<b>One-Click Resolution:</b> Recommends instant, secure package fixes right inside VS Code.",
          "<b>Developer Focus:</b> Keeps developers in their editor code view without interruption."
        ], 
        media: { type: 'image', src: 'images/DARTX/DARTX1.png' } 
      },
      { 
        title: "03. Core Features & Status", 
        tag: "VS CODE MARKETPLACE PUBLISHED",
        items: [
          "<b>Smart Alias Mapping:</b> Resolves import aliases (e.g. `cv2` → `opencv-python`, `PIL` → `Pillow`).",
          "<b>Security Protection:</b> Validates package names against registries to block typosquatting.",
          "<b>Published Extension:</b> Available live on VS Code Marketplace for instant installation."
        ], 
        media: { type: 'image', src: 'images/DARTX/DARTX.png' } 
      }
    ]
  },
  steppingStone: {
    title: "Stepping Stone Academy Website",
    slides: [
      { 
        title: "01. Client Objective", 
        tag: "MONTESSORI SCHOOL DIGITAL PRESENCE",
        items: [
          "<b>Digital Gateway:</b> Build a modern, trustworthy web platform for a real Montessori school.",
          "<b>Parent Confidence:</b> Showcase admissions info, facilities, and curriculum clearly.",
          "<b>Cross-Device Access:</b> Provide seamless mobile navigation for parents on the move."
        ], 
        media: { type: 'image', src: 'images/stepping_stone_preview.png' } 
      },
      { 
        title: "02. Design & Delivery", 
        tag: "LIVE PRODUCTION NETLIFY DEPLOYMENT",
        items: [
          "<b>Mobile-First UX:</b> Clean layout optimized for instant browsing on mobile and desktop.",
          "<b>Visual Storytelling:</b> Interactive galleries and engaging animations depicting school life.",
          "<b>Live Deployment:</b> Successfully deployed on Netlify and actively serving school clients."
        ], 
        media: { type: 'image', src: 'images/stepping_stone_live.png' } 
      }
    ]
  },
  virtualGarden: {
    title: "HerbAura – Virtual Ayurvedic Knowledge Platform",
    slides: [
      { 
        title: "01. Vision & Concept", 
        tag: "GAMIFIED AYURVEDIC EDUCATION",
        items: [
          "<b>Interactive Knowledge:</b> Replaces static botanical texts with an immersive 3D digital garden.",
          "<b>Ayurvedic Awareness:</b> Educates users on medicinal plants, health benefits, and remedies.",
          "<b>Gamified Learning:</b> Uses memory games and interactive quizzes to reinforce retention."
        ], 
        media: { type: 'video', src: 'images/Virtual_Garden/Screen_Recording.mp4' } 
      },
      { 
        title: "02. Core Features", 
        tag: "THREE.JS 3D & AI KASHAYAM ENGINE",
        items: [
          "<b>3D Plant Explorer:</b> Interactive 3D plant models rendered smoothly using Three.js.",
          "<b>AI Khashayam Maker:</b> Intelligent recipe generator that scores herbal combinations.",
          "<b>Engaging Quizzes:</b> Interactive memory game module to test Ayurvedic herbal knowledge."
        ], 
        media: { type: 'image', src: 'images/Hackathon/2nd_hackthon.jpg' } 
      },
      { 
        title: "03. Hackathon Success", 
        tag: "VEC HACKATHON RECOGNITION",
        items: [
          "<b>24-Hour Prototype:</b> Developed as a complete full-stack app during VEC Hackathon.",
          "<b>Praised Innovation:</b> Recognized for unique 3D gamification and social health impact.",
          "<b>Rapid Prototyping:</b> Proved rapid integration of WebGL frontend and AI backend."
        ], 
        media: { type: 'image', src: 'images/Project.jpeg' } 
      }
    ]
  },
  labAssistant: {
    title: "AI Powered Lab Programming Assistant",
    slides: [
      { 
        title: "01. Educational Gap", 
        tag: "BEYOND COPY-PASTE CODING",
        items: [
          "<b>Rote Learning:</b> Students often copy lab code without understanding core logic.",
          "<b>Viva Skill Gap:</b> Weak logic understanding leads to low viva confidence and exam stress.",
          "<b>Instructor Overload:</b> Instructors cannot give 1-on-1 logic guidance to 60+ lab students at once."
        ], 
        media: { type: 'image', src: 'images/lab_assistant_problem.png' } 
      },
      { 
        title: "02. Socratic AI Engine", 
        tag: "LOGIC GUIDANCE WITHOUT SPOILERS",
        items: [
          "<b>Socratic Tutoring:</b> Guides students through logic with hints instead of raw code dumps.",
          "<b>Plain-English Debugger:</b> Translates compiler errors into beginner-friendly explanations.",
          "<b>Automated Viva Prep:</b> Automatically parses lab manuals to generate targeted viva questions."
        ], 
        media: { type: 'image', src: 'images/lab_assistant_solution.png' } 
      },
      { 
        title: "03. Educational Impact", 
        tag: "ONGOING MAJOR PROJECT",
        items: [
          "<b>Active Comprehension:</b> Shifts student mindset from code-copying to true logic building.",
          "<b>Elevated Confidence:</b> Prepares students for lab viva sessions and technical interviews.",
          "<b>Scalable Support:</b> Delivers personalized 24/7 AI lab assistance across programming courses."
        ], 
        media: { type: 'image', src: 'images/lab_assistant_impact.png' } 
      }
    ]
  }
};

function openPPT(projectId) {
  const project = projectData[projectId];
  if (!project) return;

  const titleElement = document.getElementById('ppt-title');
  if (titleElement) {
    titleElement.innerText = project.title;
  }

  currentProjectSlides = project.slides;
  currentSlideIndex = 0;
  
  renderSlides();
  
  const modal = document.getElementById('ppt-modal');
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closePPT() {
  const modal = document.getElementById('ppt-modal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
  }
}

function renderSlides() {
  const body = document.getElementById('ppt-body');
  const dotsContainer = document.getElementById('ppt-dots');
  
  if (!body || !dotsContainer) return;

  body.innerHTML = '';
  dotsContainer.innerHTML = '';

  currentProjectSlides.forEach((slide, index) => {
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

    let listItems = slide.items.map(item => `<li>${item}</li>`).join('');
    
    slideDiv.innerHTML = `
      ${mediaMarkup}
      <div class="slide-panel">
        <div class="slide-badge-row">
          <span class="slide-step-badge">SLIDE 0${index + 1} OF 0${currentProjectSlides.length}</span>
          ${slide.tag ? `<span class="slide-step-badge" style="background: rgba(6, 182, 212, 0.15); color: var(--secondary-light); border-color: rgba(6, 182, 212, 0.3);">${slide.tag}</span>` : ''}
        </div>
        <h4>${slide.title}</h4>
        <ul>${listItems}</ul>
      </div>
    `;
    body.appendChild(slideDiv);

    const dot = document.createElement('div');
    dot.className = `ppt-dot ${index === currentSlideIndex ? 'active' : ''}`;
    dot.onclick = () => goToSlide(index);
    dotsContainer.appendChild(dot);
  });

  const videos = body.querySelectorAll('video');
  videos.forEach(v => {
    try {
      v.playbackRate = 1.5;
      v.muted = true;
      v.loop = true;
      v.play().catch(() => {});
    } catch (err) {}
  });

  try {
    const slides = Array.from(body.querySelectorAll('.ppt-slide'));
    slides.forEach((s, i) => {
      if (i === currentSlideIndex) {
        gsap.fromTo(s, { rotationY: -15, x: 50, opacity: 0, scale: 0.96 }, { rotationY: 0, x: 0, opacity: 1, scale: 1, duration: 0.6, ease: 'power3.out' });
      }
    });
  } catch (err) {}
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

// ========================================
// PREMIUM VISUAL ENHANCEMENTS
// ========================================

(function premiumEnhancements() {
  'use strict';

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return; // skip all enhancements

  // --- 1. Custom Cursor & 3D Interactive Card Tilt ---
  try {
    const cursor = document.getElementById('custom-cursor');
    const dot = document.getElementById('cursor-dot');
    const ring = document.getElementById('cursor-ring');

    if (dot && ring && window.matchMedia('(pointer: fine)').matches) {
      let mouseX = 0, mouseY = 0;
      let ringX = 0, ringY = 0;

      window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        dot.style.left = `${mouseX}px`;
        dot.style.top = `${mouseY}px`;
      });

      function animateRing() {
        ringX += (mouseX - ringX) * 0.18;
        ringY += (mouseY - ringY) * 0.18;
        ring.style.left = `${ringX}px`;
        ring.style.top = `${ringY}px`;
        requestAnimationFrame(animateRing);
      }
      animateRing();

      const hoverTargets = 'a, button, input, textarea, select, .btn, .btn-small, ' +
        '.project-card, .about-card, .skill-item, .hackathon-card, .visit-card, ' +
        '.certificate-card, .suggestion-btn, .edu-card, .social-links a, ' +
        '.back-to-top, .chatbot-toggle, .menu-toggle, .ppt-nav-btn, .ppt-dot, .modal-trigger';

      document.addEventListener('mouseover', (e) => {
        if (e.target.closest(hoverTargets)) {
          document.body.classList.add('cursor-hover');
        }
      });

      document.addEventListener('mouseout', (e) => {
        if (e.target.closest(hoverTargets)) {
          document.body.classList.remove('cursor-hover');
        }
      });
    }

    // --- Interactive 3D Card Tilt ---
    const tiltCards = document.querySelectorAll('[data-tilt], .about-card, .project-card, .hackathon-card, .visit-card, .certificate-card, .edu-card, .profile-card, .contact-card');
    tiltCards.forEach((card) => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -12;
        const rotateY = ((x - centerX) / centerX) * 12;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px) scale3d(1.02, 1.02, 1.02)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px) scale3d(1, 1, 1)';
      });
    });

    // --- Header Scrolled State ---
    window.addEventListener('scroll', () => {
      const header = document.querySelector('header');
      if (header) {
        if (window.scrollY > 40) {
          header.classList.add('scrolled');
        } else {
          header.classList.remove('scrolled');
        }
      }
    });

  } catch (e) {
    console.log('Custom cursor and tilt init skipped:', e.message);
  }

  // --- 2. Enhanced Smooth Sliding Section Heading Reveals ---
  try {
    const headings = document.querySelectorAll('section h2');
    headings.forEach((heading, index) => {
      const startX = index % 2 === 0 ? -100 : 100;

      gsap.fromTo(heading,
        {
          x: startX,
          y: 25,
          opacity: 0,
          scale: 0.85,
          filter: 'blur(8px)',
        },
        {
          x: 0,
          y: 0,
          opacity: 1,
          scale: 1,
          filter: 'blur(0px)',
          duration: 1.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: heading,
            start: 'top 88%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    });

    // Section subtitles smooth slide-up reveal
    document.querySelectorAll('.section-subtitle').forEach((sub) => {
      gsap.fromTo(sub,
        { y: 35, opacity: 0, scale: 0.92 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.95,
          delay: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sub,
            start: 'top 88%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    });

    // Subsection titles smooth slide in with icon rotation pop
    document.querySelectorAll('.subsection-title').forEach((title) => {
      const icon = title.querySelector('i');

      gsap.fromTo(title,
        { x: -80, opacity: 0, filter: 'blur(6px)' },
        {
          x: 0,
          opacity: 1,
          filter: 'blur(0px)',
          duration: 1.0,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: title,
            start: 'top 88%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      if (icon) {
        gsap.fromTo(icon,
          { rotation: -60, scale: 0.4, opacity: 0 },
          {
            rotation: 0,
            scale: 1,
            opacity: 1,
            duration: 0.85,
            delay: 0.2,
            ease: 'back.out(2)',
            scrollTrigger: {
              trigger: title,
              start: 'top 88%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    });
  } catch (e) {
    console.log('Heading slide reveals skipped:', e.message);
  }

  // --- 3. Scroll-triggered Card Staggers ---
  try {
    const cardGrids = [
      { selector: '.projects-grid .project-card', stagger: 0.12 },
      { selector: '.hackathons-grid .hackathon-card', stagger: 0.15 },
      { selector: '.visits-grid .visit-card', stagger: 0.15 },
      { selector: '.certificates-grid .certificate-card', stagger: 0.1 },
      { selector: '.about-grid .about-card', stagger: 0.12 },
      { selector: '.education-quick .edu-card', stagger: 0.1 },
    ];

    cardGrids.forEach(({ selector, stagger }) => {
      const cards = document.querySelectorAll(selector);
      if (cards.length === 0) return;

      gsap.fromTo(cards,
        { y: 50, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.7,
          stagger: stagger,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cards[0].parentElement,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );
    });

    // Journey timeline stages
    document.querySelectorAll('.journey-stage').forEach((stage, i) => {
      const isOdd = i % 2 === 0;
      gsap.fromTo(stage,
        { x: isOdd ? -40 : 40, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: stage,
            start: 'top 82%',
            toggleActions: 'play none none none',
          },
        }
      );
    });
  } catch (e) {
    console.log('Card staggers skipped:', e.message);
  }

  // --- 4. Parallax Depth Layers ---
  try {
    // Hero background blobs parallax
    const hero = document.querySelector('.hero');
    if (hero) {
      gsap.to(hero, {
        '--parallax-y': '80px',
        ease: 'none',
        scrollTrigger: {
          trigger: hero,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.5,
        },
      });
    }

    // Profile card subtle float
    const profileCard = document.querySelector('.profile-card');
    if (profileCard) {
      gsap.to(profileCard, {
        y: -30,
        ease: 'none',
        scrollTrigger: {
          trigger: hero,
          start: 'top top',
          end: 'bottom top',
          scrub: 2,
        },
      });
    }
  } catch (e) {
    console.log('Parallax skipped:', e.message);
  }

  // --- 5. Stats Counter Animation ---
  try {
    const stats = document.querySelectorAll('.stat-number');
    stats.forEach((stat) => {
      const text = stat.textContent.trim();
      // Parse numeric value
      const match = text.match(/([\d.]+)/);
      if (!match) return;

      const target = parseFloat(match[1]);
      const suffix = text.replace(match[1], '').trim(); // e.g., "%", " Projects"
      const isDecimal = text.includes('.');
      const originalText = text;

      // Set initial display to 0
      stat.textContent = isDecimal ? '0.00' + suffix : '0' + suffix;

      const counter = { val: 0 };
      gsap.to(counter, {
        val: target,
        duration: 2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: stat,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
        onUpdate: () => {
          if (isDecimal) {
            stat.textContent = counter.val.toFixed(2) + suffix;
          } else {
            stat.textContent = Math.round(counter.val) + suffix;
          }
        },
        onComplete: () => {
          // Restore original text to preserve exact formatting
          stat.textContent = originalText;
        },
      });
    });
  } catch (e) {
    console.log('Stats counter skipped:', e.message);
  }

  // --- 6. Navigation Active State ---
  try {
    const navLinksAll = document.querySelectorAll('nav ul li a[href^="#"]');
    const sections = [];

    navLinksAll.forEach((link) => {
      const href = link.getAttribute('href');
      if (!href || href === '#') return;
      const section = document.querySelector(href);
      if (section) {
        sections.push({ link, section });
      }
    });

    sections.forEach(({ link, section }) => {
      ScrollTrigger.create({
        trigger: section,
        start: 'top center',
        end: 'bottom center',
        onEnter: () => setActiveLink(link),
        onEnterBack: () => setActiveLink(link),
      });
    });

    function setActiveLink(activeLink) {
      navLinksAll.forEach((l) => l.classList.remove('active'));
      activeLink.classList.add('active');
    }
  } catch (e) {
    console.log('Nav active state skipped:', e.message);
  }

  // --- 7. Skill Items Magnetic Hover ---
  try {
    if (window.innerWidth > 768) {
      document.querySelectorAll('.skill-item').forEach((item) => {
        item.addEventListener('mousemove', (e) => {
          const rect = item.getBoundingClientRect();
          const x = e.clientX - rect.left - rect.width / 2;
          const y = e.clientY - rect.top - rect.height / 2;
          gsap.to(item, {
            x: x * 0.2,
            y: y * 0.2,
            duration: 0.3,
            ease: 'power2.out',
          });
        });

        item.addEventListener('mouseleave', () => {
          gsap.to(item, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.5)' });
        });
      });
    }
  } catch (e) {
    console.log('Magnetic hover skipped:', e.message);
  }

  // --- 8. Smooth section reveal for contact section ---
  try {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      const socialLinks = contactSection.querySelectorAll('.social-links a');
      gsap.fromTo(socialLinks,
        { y: 20, opacity: 0, scale: 0.8 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: contactSection,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );
    }
  } catch (e) {
    console.log('Contact reveal skipped:', e.message);
  }

  // --- 9. Skills grid section reveal ---
  try {
    document.querySelectorAll('.skill-category').forEach((category) => {
      const items = category.querySelectorAll('.skill-item');
      gsap.fromTo(items,
        { y: 20, opacity: 0, rotationX: -15 },
        {
          y: 0,
          opacity: 1,
          rotationX: 0,
          duration: 0.5,
          stagger: 0.05,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: category,
            start: 'top 82%',
            toggleActions: 'play none none none',
          },
        }
      );
    });
  } catch (e) {
    console.log('Skills reveal skipped:', e.message);
  }

  console.log('Premium visual enhancements loaded! ✨');
})();
