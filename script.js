'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const nav = document.querySelector('.nav');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

// Learn more button - smooth scroll
const section = document.querySelector('#section--1');
const btnScrollTo = document.querySelector('.btn--scroll-to');
btnScrollTo.addEventListener('click', function (e) {
  section.scrollIntoView({
    behavior: 'smooth',
  });
});

// Navigation buttons - smooth scroll
document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();

  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({
      behavior: 'smooth',
    });
  }
});

// Change opacity of nav links on hover

const handleHover = function (e) {
  e.preventDefault();

  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = e.target.closest('.nav').querySelectorAll('.nav__link');
    const logo = e.target.closest('.nav').querySelector('.nav__logo');
    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};

nav.addEventListener('mouseover', handleHover.bind(0.5));

nav.addEventListener('mouseout', handleHover.bind(1));

// Reveal sections
const sections = document.querySelectorAll('.section');

const revealSection = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.1,
});

sections.forEach(section => {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});

// Sticky Navigation
const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;

const showStickyNav = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};

const headerObserver = new IntersectionObserver(showStickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});

headerObserver.observe(header);

// Lazy image loading
const images = document.querySelectorAll('.lazy-img');

const loadLazy = function (entries, observer) {
  const [entry] = entries;
  if (entry.isIntersecting) {
    const img = entry.target;
    img.src = `${img.getAttribute('src').split('-')[0]}.jpg`;
    img.addEventListener('load', function () {
      img.classList.remove('lazy-img');
      imgObserver.unobserve(img);
    });
  }
};

const imgObserver = new IntersectionObserver(loadLazy, {
  root: null,
  threshold: 1,
  rootMargin: '200px',
});

images.forEach(img => imgObserver.observe(img));

// Switch tabs
const tabsContainer = document.querySelector('.operations__tab-container');

tabsContainer.addEventListener('click', function (e) {
  const btn = e.target.closest('.operations__tab');
  document
    .querySelectorAll('.operations__tab')
    .forEach(btn => btn.classList.remove('operations__tab--active'));
  btn.classList.add('operations__tab--active');

  document.querySelectorAll('.operations__content').forEach(tab => {
    tab.classList.remove('operations__content--active');
  });
  document
    .querySelector(`.operations__content--${btn.dataset.tab}`)
    .classList.add('operations__content--active');
});

// Slider implementation
const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');
const slides = document.querySelectorAll('.slide');
const dotContainer = document.querySelector('.dots');

let curSlide = 0;
let maxSlide = slides.length;

const createDots = function () {
  slides.forEach((_, i) => {
    dotContainer.insertAdjacentHTML(
      'beforeend',
      `<button class="dots__dot" data-slide="${i}"></button>`
    );
  });
};

const activateDot = function (slide) {
  document
    .querySelectorAll('.dots__dot')
    .forEach(dot => dot.classList.remove('dots__dot--active'));

  document
    .querySelector(`.dots__dot[data-slide="${slide}"]`)
    .classList.add('dots__dot--active');
};

const showSlide = function (slide) {
  slides.forEach((s, i) => {
    s.style.transform = `translateX(${(i - slide) * 100}%)`;
  });
};

const nextSlide = function () {
  if (curSlide === maxSlide - 1) {
    curSlide = 0;
  } else {
    curSlide++;
  }

  showSlide(curSlide);
  activateDot(curSlide);
};

const prevSlide = function () {
  if (curSlide === 0) {
    curSlide = maxSlide - 1;
  } else {
    curSlide--;
  }

  showSlide(curSlide);
  activateDot(curSlide);
};

const init = function () {
  showSlide(0);
  createDots();
  activateDot(0);
};
init();

btnRight.addEventListener('click', nextSlide);
btnLeft.addEventListener('click', prevSlide);
document.addEventListener('keydown', function (e) {
  if (e.key === 'ArrowRight') nextSlide();
  if (e.key === 'ArrowLeft') prevSlide();
});

dotContainer.addEventListener('click', function (e) {
  if (e.target.classList.contains('dots__dot')) {
    const { slide } = e.target.dataset;
    showSlide(slide);
    activateDot(slide);
  }
});
