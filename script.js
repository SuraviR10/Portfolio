// Initialize AOS
AOS.init({
  duration: 1000,
  once: true,
  offset: 100
});

// Typing Effect
new Typed('#typing-effect', {
  strings: [
    'Information Science & Engineering Student @ MIT Mysore',
    'AI & Intelligent Systems Enthusiast',
    'Full-Stack Developer & Backend Builder',
    'Creator of DARTX (VS Code Extension)',
    'Building AI Lab Assistant & Socratic Tools',
    'Passionate Problem Solver & Continuous Learner'
  ],
  typeSpeed: 50,
  backSpeed: 25,
  backDelay: 2200,
  loop: true
});

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
    keywords: ['who', 'about', 'yourself', 'background', 'introduce', 'tell me', 'describe', 'profile', 'bio', 'who are you'],
    responses: [
      "👋 <b>Suravi R</b> is an Information Science & Engineering student at <b>Maharaja Institute of Technology Mysore (MIT Mysore)</b>.<br>She specializes in building intelligent software systems, scalable backend architectures, developer automation tools, and 3D web applications. She loves solving real-world challenges through clean engineering!",
      "🚀 Meet Suravi R — a passionate software engineer and problem solver focused on AI systems, full-stack web development, and algorithmic optimization. She actively builds production tools, extension utilities, and interactive educational platforms."
    ]
  },
  
  education: {
    keywords: ['education', 'study', 'college', 'university', 'degree', 'cgpa', 'marks', 'percentage', 'school', 'academic', 'grades', 'score', 'mit', 'mysore', 'sslc', 'puc', '10th', '12th', 'branch', 'ise'],
    responses: [
      "🎓 <b>Academic Background:</b><br>• <b>B.E. in Information Science & Engineering:</b> MIT Mysore — <b>9.12 CGPA</b> (2023 – 2027)<br>• <b>Pre-University (PUC PCMC):</b> <b>90.18%</b><br>• <b>SSLC Schooling:</b> <b>93.92%</b><br>• <b>Key Core Subjects:</b> Data Structures & Algorithms, DBMS, Operating Systems, Computer Networks, and Java OOP."
    ]
  },
  
  experience: {
    keywords: ['experience', 'internship', 'intern', 'work experience', 'job', 'future interns', 'role', 'work'],
    responses: [
      "💼 <b>Internship Experience:</b><br>• <b>Web Development Intern at Future Interns</b> (Aug – Sep 2024)<br>Built responsive web interfaces, enhanced JavaScript interactions, optimized cross-browser layouts, and contributed to production-ready web features."
    ]
  },
  
  skills: {
    keywords: ['skills', 'programming', 'languages', 'technologies', 'tools', 'know', 'tech', 'technical', 'code', 'coding', 'stack', 'python', 'java', 'sql', 'javascript', 'typescript', 'frameworks', 'databases'],
    responses: [
      "💪 <b>Technical Skills & Stack:</b><br>• <b>Languages:</b> Java, Python, C, C++, SQL, JavaScript (ES6+), TypeScript<br>• <b>Frameworks & Web:</b> Flask, Node.js, HTML5, CSS3, Three.js / WebGL, FastAPI (learning)<br>• <b>Databases:</b> Supabase, MySQL, PostgreSQL<br>• <b>Developer Tools:</b> Git, GitHub, VS Code Extension API, Docker (learning)<br>• <b>Core Fundamentals:</b> DSA, Object-Oriented Programming, OS, DBMS, Computer Networks."
    ]
  },
  
  projects: {
    keywords: ['projects', 'work', 'built', 'developed', 'portfolio', 'application', 'system', 'showcase', 'apps', 'what have you built'],
    responses: [
      "🚀 <b>Suravi's Featured Projects:</b><br>1. ⏰ <b>Smart Automated Timetable Generator:</b> Genetic algorithm scheduler resolving room/faculty conflicts.<br>2. 🛠️ <b>DARTX – Smart Dependency Manager:</b> Published VS Code Extension for 1-click dependency fixes.<br>3. 🌿 <b>HerbAura:</b> 3D Ayurvedic Virtual Garden with AI Kashayam maker & WebGL models.<br>4. 🎓 <b>AI Powered Lab Programming Assistant:</b> Socratic logic-building tutor for student coding labs.<br>5. 🌐 <b>Stepping Stone Academy Website:</b> Live, responsive school platform deployed on Netlify.<br><br>👉 <i>Ask me about any specific project (e.g., 'Tell me about DARTX') to learn more!</i>"
    ]
  },
  
  timetableProject: {
    keywords: ['timetable', 'time table', 'schedule', 'time evolver', 'mitm-time', 'timetable generator', 'genetic', 'genetic algorithm'],
    responses: [
      "⏰ <b>Smart Automated Timetable Generator:</b><br>An intelligent academic scheduling engine powered by <b>Genetic Algorithms</b>. It models complex constraints like room allocations, faculty workloads, and batch schedules to generate conflict-free timetables in under 2 minutes (down from 3 weeks manually).<br>• <b>Tech Stack:</b> Python, Flask, Supabase, Genetic Algorithm.<br>• <b>Recognition:</b> Won <b>2nd Prize</b> at Mini Project Expo.<br>• <b>GitHub:</b> <a href='https://github.com/SuraviR10/Automatic_TimeTable_Generator.git' target='_blank' style='color: var(--secondary-light);'>Automatic_TimeTable_Generator</a>"
    ]
  },
  
  dependencyManager: {
    keywords: ['dependency', 'dartx', 'vs code extension', 'vs code tool', 'dependify', 'package', 'dependency manager', 'extension'],
    responses: [
      "🛠️ <b>DARTX – Smart Dependency Manager:</b><br>An intelligent <b>VS Code Extension</b> published on the Visual Studio Marketplace. It silently monitors terminal execution streams, catches missing package tracebacks, maps tricky aliases (e.g., `cv2` → `opencv-python`, `PIL` → `Pillow`), and provides secure 1-click package installs directly within the editor.<br>• <b>Tech Stack:</b> TypeScript, Node.js, VS Code API.<br>• <b>GitHub:</b> <a href='https://github.com/SuraviR10/Dependency_Manager.git' target='_blank' style='color: var(--secondary-light);'>Dependency_Manager</a>"
    ]
  },
  
  virtualGardenProject: {
    keywords: ['virtual garden', 'herbaura', 'ayurvedic', '3d garden', 'khashayam', 'video', 'demo', 'youtube', 'garden', 'plants'],
    responses: [
      "🌿 <b>HerbAura – Virtual Ayurvedic Knowledge Platform:</b><br>An interactive 3D WebGL garden built during the VEC Hackathon. Features Three.js 3D plant models, botanical quizzes, interactive games, and an AI-powered Kashayam maker that analyzes medicinal herb combinations.<br>• <b>Tech Stack:</b> Three.js, WebGL, Python, JavaScript.<br>• 🎥 <b>YouTube Video:</b> <a href='https://youtu.be/V2mUIwrPJEc' target='_blank' style='color: #fca5a5;'>Watch Demo on YouTube</a><br>• <b>GitHub:</b> <a href='https://github.com/SuraviR10/HerbAura-Virtual-Ayurvedic-Garden.git' target='_blank' style='color: var(--secondary-light);'>HerbAura Repo</a>"
    ]
  },
  
  labAssistantProject: {
    keywords: ['lab assistant', 'programming assistant', 'socratic', 'viva', 'viva prep', 'edtech', 'lab'],
    responses: [
      "🎓 <b>AI Powered Lab Programming Assistant:</b><br>An ongoing major EdTech project designed for computer science programming labs. Uses a <b>Socratic guidance engine</b> to provide progressive reasoning hints and plain-English compiler error translations instead of giving away direct code answers. Also automatically generates Viva preparation questions.<br>• <b>Tech Stack:</b> Python, Flask, Socratic AI Engine.<br>• <b>GitHub:</b> <a href='https://github.com/SuraviR10/Ai-Programming-Lab-Assistant.git' target='_blank' style='color: var(--secondary-light);'>Ai-Programming-Lab-Assistant</a>"
    ]
  },
  
  steppingStoneProject: {
    keywords: ['stepping stone', 'academy website', 'school website', 'montessori', 'netlify', 'school'],
    responses: [
      "🌐 <b>Stepping Stone Academy Website:</b><br>A fully responsive, high-performance website created and deployed for a Montessori school in Mysore. Features intuitive navigation, curriculum overviews, admissions guidelines, and mobile-first layouts.<br>• <b>Tech Stack:</b> HTML5, CSS3, JavaScript, Netlify.<br>• <b>Live Site:</b> <a href='https://the-stepping-stone-academy-mysore.netlify.app/' target='_blank' style='color: var(--secondary-light);'>the-stepping-stone-academy-mysore.netlify.app</a>"
    ]
  },
  
  achievements: {
    keywords: ['achievements', 'awards', 'prizes', 'accomplishments', 'recognition', 'won', 'winner', 'gold medal', 'prizes'],
    responses: [
      "🏆 <b>Key Achievements & Recognitions:</b><br>• <b>NPTEL Java Programming:</b> <b>98% Score</b>, <b>Top 1% Nationwide</b> & Elite+Gold Medal.<br>• <b>Mini Project Expo:</b> <b>2nd Prize Winner</b> for Smart Automated Timetable Generator.<br>• <b>Best Project Award:</b> Awarded for AI-driven Waste Segregation System with Voice Assistance.<br>• <b>Published Tool:</b> Published DARTX extension on the VS Code Marketplace."
    ]
  },
  
  certificates: {
    keywords: ['certificates', 'certifications', 'certified', 'nptel', 'skyscanner', 'linkedin', 'coursera', 'credentials'],
    responses: [
      "📜 <b>Verified Certifications:</b><br>• <b>Programming in Java</b> — NPTEL (98%, Top 1% Elite+Gold)<br>• <b>Front-End Software Engineering</b> — Skyscanner (Forage Job Simulation)<br>• <b>Prompt Engineering for AI</b> — LinkedIn Learning<br>• <b>AI for Everyone</b> — Coursera"
    ]
  },
  
  hobbies: {
    keywords: ['hobbies', 'hobby', 'interests', 'free time', 'singing', 'drawing', 'travel', 'travelling', 'passions', 'spare time'],
    responses: [
      "🎨 <b>Hobbies & Personal Interests:</b><br>Outside of software development, Suravi enjoys **singing**, **drawing occasionally**, and **travelling** to explore new places and viewpoints. Creative pursuits keep her energized, curious, and balanced!"
    ]
  },
  
  strengths: {
    keywords: ['strengths', 'personality', 'work style', 'what are you like', 'soft skills', 'characteristics', 'mindset', 'qualities'],
    responses: [
      "🌟 <b>Core Strengths & Mindset:</b><br>• <b>Fast & Adaptive Learner:</b> Quickly masters new tools, frameworks, and engineering patterns.<br>• <b>Analytical Problem Solver:</b> Methodically dissects complex logic into elegant, practical solutions.<br>• <b>Strong CS Fundamentals:</b> Grounded in clean code, algorithmic efficiency, and modular design.<br>• <b>Collaborative Team Member:</b> Enjoys peer code reviews, hackathons, and delivering real value."
    ]
  },
  
  career: {
    keywords: ['career', 'goals', 'future', 'vision', 'aspiration', 'aim', 'plan', 'dream', 'target', 'sde', 'roles'],
    responses: [
      "🎯 <b>Career Aspirations:</b><br>Suravi aims to work as a **Software Development Engineer (SDE)** or **AI Systems Engineer**, building robust, scalable backend architectures and intelligent software that create positive real-world impact at innovative tech organizations."
    ]
  },
  
  hiring: {
    keywords: ['hire', 'why hire', 'recruiter', 'hr', 'candidate', 'fit', 'role', 'interview', 'special', 'stand out', 'why should we hire'],
    responses: [
      "💼 <b>Why Hire Suravi R?</b><br>1. <b>Solid Engineering Discipline:</b> Strong grasp of Data Structures, OOP, OS, and Database architectures.<br>2. <b>Proven Practical Builder:</b> Published a VS Code Extension, built complex optimization algorithms, and deployed live web systems.<br>3. <b>Fast Learner & Adaptable:</b> Quick to ramp up on new stacks across AI, Cloud, and DevOps.<br>4. <b>Ready for Impact:</b> Open for SDE, Full-Stack, and AI Engineering roles and internships!"
    ]
  },
  
  hackathons: {
    keywords: ['hackathon', 'hackathons', 'vec', 'agroforecast', 'build for mysuru', 'competition', 'onemysuru'],
    responses: [
      "💡 <b>Hackathon Participation:</b><br>1. <b>MIT Mysore Hackathon:</b> Built <b>AgroForeCast</b> (24-hour weather & crop guidance for farmers).<br>2. <b>VEC Hackathon:</b> Developed <b>HerbAura</b> (3D WebGL plant explorer with AI herbal scoring).<br>3. <b>Build for Mysuru Hackathon:</b> Designed <b>OneMysuru</b> (unified digital ecosystem for local tourism & commerce)."
    ]
  },
  
  industrial: {
    keywords: ['industrial', 'visit', 'visits', 'fanuc', 'sap', 'factory', 'exposure', 'ibm'],
    responses: [
      "🏭 <b>Industry Exposure & Visits:</b><br>• <b>FANUC India:</b> Explored industrial robotics, CNC systems, and factory automation.<br>• <b>SAP Labs:</b> Studied enterprise cloud software, SaaS architectures, and large-scale data systems.<br>• <b>IBM Meetup:</b> Gained insights into Agentic AI frameworks, LLM security (OWASP), and developer tooling."
    ]
  },
  
  contact: {
    keywords: ['contact', 'email', 'reach', 'connect', 'linkedin', 'github', 'message', 'mail'],
    responses: [
      "📬 <b>Get In Touch with Suravi:</b><br>• <b>Email:</b> <a href='mailto:suravimys@gmail.com' style='color: var(--secondary-light);'>suravimys@gmail.com</a><br>• <b>LinkedIn:</b> <a href='https://linkedin.com/in/suravir/' target='_blank' style='color: var(--secondary-light);'>linkedin.com/in/suravir</a><br>• <b>GitHub:</b> <a href='https://github.com/SuraviR10' target='_blank' style='color: var(--secondary-light);'>github.com/SuraviR10</a>"
    ]
  },
  
  resume: {
    keywords: ['resume', 'cv', 'download', 'pdf', 'document'],
    responses: [
      "📄 <b>Resume Download:</b><br>You can download Suravi's resume directly here: <a href='Resume_of_SuraviR.pdf' download class='btn btn-small btn-primary' style='display:inline-flex; margin-top:6px; color:#fff;'><i class='fas fa-download'></i> Download Resume PDF</a>"
    ]
  }
};

// Toggle Chatbot
chatbotToggle.addEventListener('click', () => {
  chatbotWidget.classList.toggle('active');
});

chatbotClose.addEventListener('click', () => {
  chatbotWidget.classList.remove('active');
});

// Send Message
function sendMessage() {
  const message = chatbotInput.value.trim();
  if (!message) return;

  addMessage(message, 'user');
  chatbotInput.value = '';

  showTypingIndicator();
  setTimeout(() => {
    removeTypingIndicator();
    const response = getBotResponse(message);
    addMessage(response, 'bot');
  }, 800);
}

chatbotSend.addEventListener('click', sendMessage);
chatbotInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') sendMessage();
});

// Suggestion buttons
suggestionBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const question = btn.getAttribute('data-question');
    addMessage(question, 'user');
    showTypingIndicator();
    setTimeout(() => {
      removeTypingIndicator();
      const response = getBotResponse(question);
      addMessage(response, 'bot');
    }, 800);
  });
});

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
      "Hello! 👋 I'm Suri AI, Suravi's intelligent assistant. I'm here to tell you all about her amazing skills, achievements, and projects. What would you like to know?",
      "Hi there! 😊 Great to meet you! I'm Suri AI, and I know everything about Suravi's impressive background. Ask me anything - her education, skills, projects, achievements, or career goals!",
      "Hey! 🌟 Welcome! I'm Suri AI, Suravi's personal AI assistant. I'd love to share her incredible journey with you. What aspect interests you most?"
    ];
    return greetings[Math.floor(Math.random() * greetings.length)];
  }
  
  // Thanks
  if (lowerMessage.match(/(thank|thanks|appreciate|thx|awesome|great|cool|nice)/)) {
    const thanks = [
      "You're very welcome! 😊 Suravi is indeed impressive! Feel free to ask me anything else about her.",
      "My pleasure! 🌟 Suravi's achievements speak for themselves. Is there anything else you'd like to know?",
      "Glad I could help! 👍 Suravi has so much more to offer. Want to explore more about her skills or projects?"
    ];
    return thanks[Math.floor(Math.random() * thanks.length)];
  }
  
  // Goodbye
  if (lowerMessage.match(/(bye|goodbye|see you|later|gtg|got to go)/)) {
    const byes = [
      "Goodbye! 👋 Thanks for learning about Suravi. Feel free to come back anytime. Don't forget to connect with her!",
      "See you later! 🌟 I hope you're impressed by Suravi's profile. Reach out to her - she'd love to connect!",
      "Take care! 😊 Remember, Suravi is always open to exciting opportunities and collaborations. Stay in touch!"
    ];
    return byes[Math.floor(Math.random() * byes.length)];
  }
  
  // Search knowledge base with intelligent matching
  let bestMatch = null;
  let highestScore = 0;
  
  for (const [category, data] of Object.entries(knowledgeBase)) {
    let score = 0;
    for (const keyword of data.keywords) {
      if (lowerMessage.includes(keyword)) {
        score += keyword.length; // Longer matches get higher scores
      }
    }
    if (score > highestScore) {
      highestScore = score;
      bestMatch = data;
    }
  }
  
  if (bestMatch && highestScore > 0) {
    // Return random response from available responses
    const responses = bestMatch.responses;
    return responses[Math.floor(Math.random() * responses.length)];
  }
  
  // Intelligent fallback - try to be helpful and positive
  const fallbackResponses = [
    "💡 I can help you explore Suravi's **projects** (DARTX, Timetable Generator, AI Lab Assistant, HerbAura), **skills**, **internship experience**, **education**, or **contact details**. What would you like to know?",
    "🤖 Feel free to ask me about Suravi's technical stack, project architecture, hackathons, or how to get in touch!"
  ];
  
  return fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];
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
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
      submitBtn.textContent = 'Send Message';
      submitBtn.disabled = false;
    }, 2000);
  });
}

// Add animation to elements on scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

document.querySelectorAll('.about-card, .project-card, .skill-item, .certificate-card').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(el);
});

console.log('Portfolio with Suri AI Assistant loaded! 🚀');

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

// Add typing indicator when bot is thinking
function showTypingIndicator() {
  const typingDiv = document.createElement('div');
  typingDiv.className = 'bot-message typing-indicator';
  typingDiv.id = 'typing-indicator';
  typingDiv.innerHTML = `
    <div class="message-avatar">
      <div class="mini-avatar"></div>
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
