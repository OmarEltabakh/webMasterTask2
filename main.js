const slider = document.getElementById('slider');
const slides = slider.querySelector('.slides');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const pagination = document.getElementById('pagination');
const images = slides.querySelectorAll('img');

let currentIndex = 0;
let interval;

// add dot=====================================>
images.forEach((_, index) => {
  const dot = document.createElement('span');
  dot.dataset.index = index;
  if (index === 0) dot.classList.add('active');
  pagination.appendChild(dot);
});

// updateSlider================================>
const updateSlider = () => {
  slides.style.transform = `translateX(-${currentIndex * 100}%)`;
  Array.from(pagination.children).forEach((dot, index) => {
    dot.classList.toggle('active', index === currentIndex);
  });
};

const showNextSlide = () => {
  currentIndex = (currentIndex + 1) % images.length;
  
  updateSlider();
};

const showPrevSlide = () => {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  updateSlider();
};

const pauseSlider = () => clearInterval(interval);
const startSlider = () => {
  interval = setInterval(showNextSlide, 3000);
};

// Event listeners
nextBtn.addEventListener('click', showNextSlide);
prevBtn.addEventListener('click', showPrevSlide);
pagination.addEventListener('click', (e) => {
  if (e.target.dataset.index !== undefined) {
    currentIndex = parseInt(e.target.dataset.index, 10);
    updateSlider();
  }
});

slider.addEventListener('mouseenter', pauseSlider);
slider.addEventListener('mouseleave', startSlider);

// Enable swipe for touch devices
let startX = 0;
slider.addEventListener('touchstart', (e) => {
  startX = e.touches[0].clientX;
  pauseSlider();
});
slider.addEventListener('touchend', (e) => {
  const endX = e.changedTouches[0].clientX;
  if (startX - endX > 50) showNextSlide();
  if (endX - startX > 50) showPrevSlide();
  startSlider();
});

startSlider();
