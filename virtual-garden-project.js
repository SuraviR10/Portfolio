// Smooth scroll to top on load
window.scrollTo({ top: 0, behavior: 'smooth' });

// Intersection Observer for scroll animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate-on-scroll');
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Observe all content sections
document.querySelectorAll('.content-section').forEach(section => {
  observer.observe(section);
});

// Animate feature cards on scroll
const featureObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }, index * 100);
    }
  });
}, { threshold: 0.2 });

document.querySelectorAll('.feature-card, .story-card, .audience-card').forEach(card => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(30px)';
  card.style.transition = 'all 0.6s ease-out';
  featureObserver.observe(card);
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// Add parallax effect to hero section
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const hero = document.querySelector('.project-hero');
  if (hero) {
    hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    hero.style.opacity = 1 - (scrolled / 500);
  }
});

// Animate numbers on scroll
const animateNumbers = (element, target) => {
  let current = 0;
  const increment = target / 50;
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      element.textContent = target;
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(current);
    }
  }, 30);
};

// Add hover effects to interactive elements
document.querySelectorAll('.feature-card, .interactive-card, .story-card').forEach(card => {
  card.addEventListener('mouseenter', function() {
    this.style.transform = 'translateY(-10px) scale(1.02)';
  });
  
  card.addEventListener('mouseleave', function() {
    this.style.transform = 'translateY(0) scale(1)';
  });
});

// Animate workflow steps
const workflowSteps = document.querySelectorAll('.workflow-step');
workflowSteps.forEach((step, index) => {
  step.style.opacity = '0';
  step.style.transform = 'scale(0.8)';
  step.style.transition = 'all 0.5s ease-out';
  
  setTimeout(() => {
    step.style.opacity = '1';
    step.style.transform = 'scale(1)';
  }, index * 200);
});

// Add ripple effect to buttons
document.querySelectorAll('.project-button').forEach(button => {
  button.addEventListener('click', function(e) {
    const ripple = document.createElement('span');
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');
    
    this.appendChild(ripple);
    
    setTimeout(() => ripple.remove(), 600);
  });
});

// Animate UX flow steps on scroll
const uxSteps = document.querySelectorAll('.ux-step');
const uxObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateX(0)';
      }, index * 150);
    }
  });
}, { threshold: 0.3 });

uxSteps.forEach(step => {
  step.style.opacity = '0';
  step.style.transform = 'translateX(-50px)';
  step.style.transition = 'all 0.6s ease-out';
  uxObserver.observe(step);
});

// Animate architecture layers
const archLayers = document.querySelectorAll('.arch-layer');
archLayers.forEach((layer, index) => {
  layer.style.opacity = '0';
  layer.style.transform = 'translateY(30px)';
  layer.style.transition = 'all 0.6s ease-out';
  
  setTimeout(() => {
    layer.style.opacity = '1';
    layer.style.transform = 'translateY(0)';
  }, index * 300);
});

// Add floating animation to icons
document.querySelectorAll('.feature-icon, .story-icon, .audience-card i').forEach(icon => {
  icon.style.animation = 'float 3s ease-in-out infinite';
});

// Animate achievement list items
const achievementItems = document.querySelectorAll('.achievement-list li');
const achievementObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateX(0)';
      }, index * 100);
    }
  });
}, { threshold: 0.5 });

achievementItems.forEach(item => {
  item.style.opacity = '0';
  item.style.transform = 'translateX(-20px)';
  item.style.transition = 'all 0.5s ease-out';
  achievementObserver.observe(item);
});

// Add pulse animation to step icons
document.querySelectorAll('.step-icon, .ux-number').forEach(icon => {
  icon.addEventListener('mouseenter', function() {
    this.style.animation = 'pulse 0.5s ease-in-out';
  });
  
  icon.addEventListener('animationend', function() {
    this.style.animation = '';
  });
});

// Animate future cards
const futureCards = document.querySelectorAll('.future-card');
const futureObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'scale(1)';
      }, index * 150);
    }
  });
}, { threshold: 0.3 });

futureCards.forEach(card => {
  card.style.opacity = '0';
  card.style.transform = 'scale(0.9)';
  card.style.transition = 'all 0.6s ease-out';
  futureObserver.observe(card);
});

// Add shimmer effect to highlight sections
document.querySelectorAll('.highlight-section').forEach(section => {
  section.addEventListener('mouseenter', function() {
    this.style.background = 'linear-gradient(135deg, rgba(16, 185, 129, 0.08), rgba(59, 130, 246, 0.08))';
  });
  
  section.addEventListener('mouseleave', function() {
    this.style.background = 'linear-gradient(135deg, rgba(16, 185, 129, 0.05), rgba(59, 130, 246, 0.05))';
  });
});

// Animate tech tags
document.querySelectorAll('.tech-tag, .feature-tech span').forEach((tag, index) => {
  tag.style.opacity = '0';
  tag.style.transform = 'scale(0.8)';
  tag.style.transition = 'all 0.4s ease-out';
  
  setTimeout(() => {
    tag.style.opacity = '1';
    tag.style.transform = 'scale(1)';
  }, index * 50);
});

// Add rotation animation to architecture components on hover
document.querySelectorAll('.arch-component').forEach(component => {
  component.addEventListener('mouseenter', function() {
    const icon = this.querySelector('i');
    if (icon) {
      icon.style.transform = 'rotate(360deg)';
      icon.style.transition = 'transform 0.6s ease-in-out';
    }
  });
  
  component.addEventListener('mouseleave', function() {
    const icon = this.querySelector('i');
    if (icon) {
      icon.style.transform = 'rotate(0deg)';
    }
  });
});

// Animate social links
document.querySelectorAll('.social-links a').forEach((link, index) => {
  link.style.opacity = '0';
  link.style.transform = 'translateY(20px)';
  link.style.transition = 'all 0.4s ease-out';
  
  setTimeout(() => {
    link.style.opacity = '1';
    link.style.transform = 'translateY(0)';
  }, index * 100);
});

// Add progress indicator
const progressBar = document.createElement('div');
progressBar.style.cssText = `
  position: fixed;
  top: 0;
  left: 0;
  height: 3px;
  background: linear-gradient(90deg, var(--primary), var(--secondary));
  width: 0%;
  z-index: 9999;
  transition: width 0.1s;
`;
document.body.appendChild(progressBar);

window.addEventListener('scroll', () => {
  const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrolled = (window.pageYOffset / windowHeight) * 100;
  progressBar.style.width = scrolled + '%';
});

console.log('Virtual Garden project page loaded with animations! 🌿✨');
