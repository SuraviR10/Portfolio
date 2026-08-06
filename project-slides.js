// ===== PROJECT SLIDES ENGINE =====
// Usage: call initSlides(slidesData, config) after DOM ready

let currentSlide = 0;
let totalSlides = 0;
let isAnimating = false;
const TRANSITIONS = ['', 'flip', 'zoom', 'rise', 'swirl', '', 'flip', 'zoom', 'rise', 'swirl'];

function initSlides(slidesData, config = {}) {
  totalSlides = slidesData.length;
  const modal   = document.getElementById('slides-modal');
  const viewport = document.getElementById('slides-viewport');
  const dotsEl  = document.getElementById('slides-dots');
  const counter = document.getElementById('slides-counter');
  const titleEl = document.getElementById('slides-modal-title');

  if (titleEl) titleEl.textContent = config.title || 'Project Presentation';

  // Build slides
  viewport.innerHTML = '';
  slidesData.forEach((data, i) => {
    const slide = document.createElement('div');
    slide.className = 'slide' + (i === 0 ? ' active' : '');
    slide.dataset.index = i;
    slide.dataset.transition = TRANSITIONS[i] || '';
    slide.style.background = data.bg || 'transparent';
    slide.innerHTML = data.html;
    viewport.appendChild(slide);
  });

  // Build dots
  dotsEl.innerHTML = '';
  slidesData.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'slides-dot' + (i === 0 ? ' active' : '');
    dot.setAttribute('aria-label', `Slide ${i + 1}`);
    dot.onclick = () => goToSlide(i);
    dotsEl.appendChild(dot);
  });

  updateUI();
}

function openSlides() {
  const modal = document.getElementById('slides-modal');
  modal.classList.add('open');
  currentSlide = 0;
  document.querySelectorAll('.slide').forEach((s, i) => {
    s.className = 'slide' + (i === 0 ? ' active' : '');
  });
  updateUI();
  animateSlideIn();
  document.addEventListener('keydown', handleKey);
}

function closeSlides() {
  document.getElementById('slides-modal').classList.remove('open');
  document.removeEventListener('keydown', handleKey);
}

function handleKey(e) {
  if (e.key === 'ArrowRight' || e.key === 'ArrowDown') nextSlide();
  if (e.key === 'ArrowLeft'  || e.key === 'ArrowUp')   prevSlide();
  if (e.key === 'Escape') closeSlides();
}

function nextSlide() {
  if (isAnimating || currentSlide >= totalSlides - 1) return;
  const prev = currentSlide;
  currentSlide++;
  animateTransition(prev, currentSlide, 'forward');
}

function prevSlide() {
  if (isAnimating || currentSlide <= 0) return;
  const prev = currentSlide;
  currentSlide--;
  animateTransition(prev, currentSlide, 'backward');
}

function goToSlide(index) {
  if (isAnimating || index === currentSlide) return;
  const prev = currentSlide;
  const dir = index > prev ? 'forward' : 'backward';
  currentSlide = index;
  animateTransition(prev, currentSlide, dir);
}

function animateTransition(fromIdx, toIdx, dir) {
  isAnimating = true;
  const slides = document.querySelectorAll('.slide');
  const fromSlide = slides[fromIdx];
  const toSlide   = slides[toIdx];

  const exitClass  = dir === 'forward' ? 'exit-left'  : 'exit-right';
  const enterClass = dir === 'forward' ? 'enter-right' : 'enter-left';

  // Apply transition type from data attribute
  const transType = toSlide.dataset.transition;

  fromSlide.classList.remove('active');
  fromSlide.classList.add(exitClass);
  toSlide.classList.add(enterClass, 'active');

  const duration = 600;
  setTimeout(() => {
    fromSlide.classList.remove(exitClass);
    toSlide.classList.remove(enterClass);
    isAnimating = false;
    updateUI();
    triggerProgressBars(toSlide);
  }, duration);
}

function animateSlideIn() {
  const active = document.querySelector('.slide.active');
  if (!active) return;
  active.style.animation = 'none';
  active.offsetHeight; // reflow
  active.style.animation = '';
  triggerProgressBars(active);
}

function triggerProgressBars(slide) {
  slide.querySelectorAll('.s-progress-fill').forEach(bar => {
    const target = bar.dataset.width || '0%';
    bar.style.width = '0%';
    requestAnimationFrame(() => {
      requestAnimationFrame(() => { bar.style.width = target; });
    });
  });
}

function updateUI() {
  const counter = document.getElementById('slides-counter');
  const dots    = document.querySelectorAll('.slides-dot');
  const prevBtn = document.getElementById('slides-prev');
  const nextBtn = document.getElementById('slides-next');

  if (counter) counter.textContent = `${currentSlide + 1} / ${totalSlides}`;
  dots.forEach((d, i) => d.classList.toggle('active', i === currentSlide));
  if (prevBtn) prevBtn.disabled = currentSlide === 0;
  if (nextBtn) nextBtn.disabled = currentSlide === totalSlides - 1;
}

// Touch/swipe support
let touchStartX = 0;
document.addEventListener('DOMContentLoaded', () => {
  const vp = document.getElementById('slides-viewport');
  if (!vp) return;
  vp.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
  vp.addEventListener('touchend', e => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) diff > 0 ? nextSlide() : prevSlide();
  });
});
