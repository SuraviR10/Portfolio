// Initialize AOS
AOS.init({
  duration: 1000,
  once: true,
  offset: 100
});

// Typing Effect
new Typed('#typing-effect', {
  strings: ['AI Engineer', 'Cloud Architect', 'Problem Solver', 'Full Stack Developer'],
  typeSpeed: 80,
  backSpeed: 40,
  backDelay: 2000,
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
  // Personal & Background
  personal: {
    keywords: ['who', 'about', 'yourself', 'background', 'introduce', 'tell me', 'describe', 'profile', 'bio'],
    responses: [
      "Suravi R is an exceptional Information Science & Engineering student at MIT Mysore with an outstanding 9.16 CGPA. She's a passionate technologist who combines academic excellence with practical innovation. Her journey is marked by consistent high performance - from scoring 93.92% in SSLC to 90% in PUC, and now maintaining top grades in engineering. What makes her truly special is her ability to turn theoretical knowledge into real-world solutions!",
      "Meet Suravi R - a brilliant mind in the world of technology! She's not just another engineering student; she's a problem-solver, innovator, and award-winner. With a stellar 9.16 CGPA at MIT Mysore, she's proven her academic prowess. But what really sets her apart is her passion for AI and Cloud Computing, combined with her ability to build practical, impactful projects. She's the kind of person who doesn't just learn technology - she masters it and creates with it!"
    ]
  },
  
  // Education & Academic Excellence
  education: {
    keywords: ['education', 'study', 'college', 'university', 'degree', 'cgpa', 'marks', 'percentage', 'school', 'academic', 'grades', 'score', 'mit', 'mysore'],
    responses: [
      "Suravi's academic journey is nothing short of impressive! She's currently pursuing B.E. in Information Science & Engineering at the prestigious MIT Mysore with an exceptional 9.16 CGPA. Her academic excellence started early - she scored an outstanding 93.92% in SSLC and maintained her momentum with 90% in PUC. This consistent high performance demonstrates her dedication, intelligence, and strong work ethic. She's not just studying technology; she's excelling at it!",
      "Talk about academic excellence! Suravi is crushing it at MIT Mysore with a stellar 9.16 CGPA in Information Science & Engineering. Her academic track record speaks volumes - 93.92% in SSLC, 90% in PUC, and now maintaining top grades in one of India's premier engineering institutions. She's focused on cutting-edge subjects like AI, Cloud Computing, and Data Structures, proving she's not just book-smart but also future-ready!"
    ]
  },
  
  // Skills & Technical Expertise
  skills: {
    keywords: ['skills', 'programming', 'languages', 'technologies', 'tools', 'know', 'tech', 'technical', 'code', 'coding', 'expertise', 'proficient', 'master'],
    responses: [
      "Suravi is a true tech polyglot with an impressive skill arsenal! She's proficient in Python, Java, C/C++, JavaScript, HTML5, and CSS3 - covering everything from systems programming to web development. She is hands-on with Docker and Kubernetes for modern DevOps. She's also skilled in SQL/MySQL for databases, Git for version control, and is actively working on Machine Learning and AI Development. This diverse skill set makes her incredibly versatile and valuable!",
      "When it comes to technical skills, Suravi has it all! She's mastered multiple programming languages including Python (perfect for AI/ML), Java (enterprise-grade applications), C/C++ (system-level programming), and JavaScript (modern web development). She's comfortable with containerization (Docker, Kubernetes), database management (SQL/MySQL), and version control (Git). Plus, she's diving deep into Machine Learning and AI Development - the technologies shaping our future. She's not just learning these skills; she's applying them in real projects!"
    ]
  },
  
  // Projects & Practical Work
  projects: {
    keywords: ['projects', 'work', 'built', 'developed', 'created', 'portfolio', 'made', 'application', 'system', 'mitm', 'timetable', 'stepping stone', 'food', 'gemini', 'assistant', 'code assist', 'dartx'],
    responses: [
      "Suravi's projects showcase her ability to solve real-world problems! Her crown jewel is MITM-Time Evolver, an Automatic Timetable Generation System that won 2nd Prize at the Mini Project Expo. She's also built DARTX (Dependency Analysis, Resolution, Tracking & eXecution), an intelligent VS Code extension published on the marketplace that automatically detects and resolves dependency issues. Additionally, she's built the Stepping Stone Academy Website and a Food Ordering Platform. Each project demonstrates her ability to go from concept to a production-ready working solution!",
      "Let me tell you about Suravi's impressive project portfolio! First, there's MITM-Time Evolver - an award-winning automatic timetable generator. Then there's DARTX, a published VS Code extension acting as a smart dependency manager for Python and Node.js. She has also developed the Stepping Stone Academy Website, showcasing front-end skills, and a Food Ordering Platform. What's remarkable is the diversity - from algorithmic problem-solving to user interface design to developer tooling. She's a complete developer!"
    ]
  },
  
  // Achievements & Recognition
  achievements: {
    keywords: ['achievements', 'awards', 'prizes', 'accomplishments', 'recognition', 'won', 'winner', 'success', 'nptel', 'gold', 'top 1'],
    responses: [
      "Suravi's achievements are truly outstanding! She won 2nd Prize at the Mini Project Expo for her MITM-Time Evolver project - competing against numerous talented students. But here's the real showstopper: she scored an exceptional 98% in the NPTEL Java Programming course, placing her in the Top 1% nationwide and earning a Gold Medal! That's competing against thousands of students across India. She has completed prestigious certifications from Skyscanner and LinkedIn. These aren't just certificates; they're proof of her exceptional abilities and dedication!",
      "When it comes to achievements, Suravi is in a league of her own! Her 98% score in NPTEL Java Programming placed her in the Top 1% nationwide - that's Gold Medal territory! She won 2nd Prize at the Mini Project Expo, proving her practical skills match her theoretical knowledge. She completed Skyscanner's Front-End Software Engineering program, and earned LinkedIn's Prompt Engineering certification. Each achievement represents hours of hard work, dedication, and excellence. She doesn't just participate; she excels!"
    ]
  },
  
  // Certifications
  certificates: {
    keywords: ['certificates', 'certifications', 'certified', 'credentials', 'course', 'training', 'coursera', 'skyscanner', 'linkedin'],
    responses: [
      "Suravi's certification portfolio is impressive and strategic! Her NPTEL Java Programming certification with 98% (Top 1%, Gold Medal) is exceptional. She completed Skyscanner's Front-End Software Engineering Job Simulation, gaining industry-relevant experience. And her LinkedIn certification in Prompt Engineering for Generative AI shows she's staying ahead of the AI curve. These aren't random certificates; they're carefully chosen credentials that demonstrate expertise in high-demand areas!",
      "Let's talk about Suravi's strategic approach to certifications! The NPTEL Java certification with 98% score (Top 1% nationwide, Gold Medal) is phenomenal - that's competing against thousands! Skyscanner's Front-End Engineering certification shows she can work with industry standards. And her Prompt Engineering for Generative AI certification from LinkedIn proves she's at the forefront of AI technology. Each certification adds real value to her skill set and demonstrates her commitment to continuous learning!"
    ]
  },
  
  // Career Goals & Vision
  career: {
    keywords: ['career', 'goals', 'future', 'vision', 'aspiration', 'dream', 'want', 'plan', 'ambition', 'looking for'],
    responses: [
      "Suravi has a clear and exciting vision for her future! She's passionate about building AI-driven systems and cloud engineering solutions that create real-world impact. Her goal is to work on cutting-edge technology projects that solve meaningful problems. She's particularly interested in the intersection of AI and Cloud Computing - two of the most transformative technologies of our time. With her strong foundation, practical experience, and continuous learning mindset, she's perfectly positioned to become a leader in this space. She's not just looking for a job; she's building a career in innovation!",
      "Suravi's career vision is both ambitious and achievable! She aims to specialize in AI-driven systems and cloud engineering, focusing on scalable, intelligent solutions that make a difference. She's not content with just using technology - she wants to push its boundaries. Her interest in AI and Cloud Computing positions her at the forefront of digital transformation. With her proven track record of academic excellence, award-winning projects, and continuous skill development, she's on track to become a sought-after professional in the tech industry. She's building the future, one project at a time!"
    ]
  },
  
  // Strengths & What Makes Her Special
  strengths: {
    keywords: ['strengths', 'special', 'unique', 'stand out', 'different', 'best', 'good at', 'strong', 'advantage', 'why hire'],
    responses: [
      "What makes Suravi truly exceptional? It's the perfect combination of academic excellence (9.16 CGPA), practical skills (award-winning projects), and continuous growth (multiple certifications). She's not just a theoretical learner - she applies knowledge to build real solutions. Her 98% NPTEL score (Top 1%) proves she can compete at the highest level. Her project wins show she can deliver results. Her diverse skill set from Python to Machine Learning makes her incredibly versatile. But most importantly, she has that rare quality of being both a fast learner and a problem solver. She doesn't just complete tasks; she finds better ways to do them!",
      "Suravi stands out for several compelling reasons! First, her consistent excellence - from 93.92% in SSLC to 9.16 CGPA in engineering. Second, her practical impact - building award-winning projects that solve real problems. Third, her competitive edge - Top 1% nationwide in NPTEL. Fourth, her modern skill set - AI, Cloud, DevOps, Full Stack. Fifth, her learning agility - constantly adding new certifications and skills. But what really sets her apart is her mindset: she's not just learning technology; she's mastering it to create innovative solutions. She's the complete package - smart, skilled, proven, and passionate!"
    ]
  },
  
  // Contact & Collaboration
  contact: {
    keywords: ['contact', 'email', 'reach', 'connect', 'linkedin', 'github', 'social', 'message', 'talk', 'hire', 'recruit'],
    responses: [
      "Interested in connecting with Suravi? Great choice! You can reach her via email at suravimys@gmail.com for professional inquiries and opportunities. Connect with her on LinkedIn at linkedin.com/in/suravir/ to see her professional journey and network. Check out her code and projects on GitHub at github.com/TechSphere10 to see her work in action. She's always open to discussing exciting opportunities, collaborative projects, and innovative ideas. Whether you're looking for a talented developer, a project collaborator, or just want to connect with a passionate technologist, Suravi is approachable and responsive!",
      "Want to get in touch with Suravi? Here's how! Email her at suravimys@gmail.com - she's professional and responsive. Connect on LinkedIn (linkedin.com/in/suravir/) to see her achievements and professional network. Explore her GitHub (github.com/TechSphere10) to see her coding skills firsthand. She's open to internship opportunities, project collaborations, full-time positions, and networking with fellow tech enthusiasts. Don't hesitate to reach out - she's friendly, professional, and always excited to discuss technology and opportunities!"
    ]
  },
  
  // Personality & Work Style
  personality: {
    keywords: ['personality', 'person', 'character', 'work style', 'team', 'collaborate', 'attitude', 'approach'],
    responses: [
      "Suravi is not just technically brilliant - she's also a great person to work with! She's a fast learner who adapts quickly to new technologies and challenges. Her problem-solving approach is methodical yet creative. She's detail-oriented (evident from her high CGPA) but also sees the big picture (evident from her project choices). She's self-motivated (look at all those certifications!) but also collaborative. Her consistent academic and project success shows she's reliable and delivers quality work. She's the kind of person who brings both technical excellence and positive energy to any team!",
      "Let me tell you about Suravi's work style and personality! She's incredibly driven - her 9.16 CGPA and multiple certifications prove she doesn't settle for mediocrity. She's a problem-solver at heart, always looking for elegant solutions to complex challenges. She's detail-oriented yet efficient, balancing quality with productivity. Her diverse project portfolio shows she's versatile and adaptable. She's a continuous learner who stays updated with latest technologies. And most importantly, she's passionate about what she does - technology isn't just her field of study; it's her passion. She's the kind of person who makes teams better!"
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
    "That's an interesting question! While I don't have specific information about that, I can tell you that Suravi is an exceptional technologist with a 9.16 CGPA, award-winning projects, and Top 1% NPTEL ranking. What specific aspect would you like to know more about - her skills, projects, achievements, or career goals?",
    "Great question! Let me help you better. Suravi excels in many areas - she's a brilliant student (9.16 CGPA) and an award-winning developer (2nd Prize at Mini Project Expo). Would you like to know more about her technical skills, academic achievements, or impressive projects?",
    "I'd love to give you the best answer! Suravi has an amazing profile - from her Top 1% NPTEL ranking to her AI and Cloud Computing expertise. Could you be more specific? Are you interested in her education, technical skills, project portfolio, certifications, or career aspirations?",
    "Interesting! While I might not have covered that exact angle, I can tell you Suravi is incredibly talented! She combines academic excellence (9.16 CGPA) with practical skills (Python, Java, ML) and proven results (award-winning projects). What would you like to explore - her strengths, achievements, or technical expertise?"
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
