// Smooth scroll to top on load
window.scrollTo({ top: 0, behavior: 'smooth' });

// Intersection Observer for animations
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

// Observe all sections
document.querySelectorAll('.content-section, .workflow-stage, .flow-box, .constraint-item').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(el);
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

// Add hover effect to flowchart elements
document.querySelectorAll('.flow-box, .flow-decision').forEach(el => {
  el.addEventListener('mouseenter', function() {
    this.style.transform = 'scale(1.05)';
  });
  el.addEventListener('mouseleave', function() {
    this.style.transform = 'scale(1)';
  });
});

console.log('MITM-Time Evolver project page loaded! 🚀');
