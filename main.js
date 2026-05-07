/* =========================
   PRELOADER
========================= */
const preloader = document.getElementById("preloader");
const preloaderFill = document.getElementById("preloaderFill");
let progress = 0;

const interval = setInterval(() => {
  progress += Math.random() * 18 + 6;
  if (progress >= 100) {
    progress = 100;
    clearInterval(interval);
    setTimeout(() => preloader.classList.add("hidden"), 300);
  }
  preloaderFill.style.width = progress + "%";
}, 100);

/* =========================
   CUSTOM CURSOR
========================= */
const cursor = document.getElementById("cursor");
const follower = document.getElementById("cursorFollower");

document.addEventListener("mousemove", (e) => {
  cursor.style.left = e.clientX + "px";
  cursor.style.top = e.clientY + "px";
  setTimeout(() => {
    follower.style.left = e.clientX + "px";
    follower.style.top = e.clientY + "px";
  }, 80);
});

document.querySelectorAll("a, button").forEach((el) => {
  el.addEventListener("mouseenter", () => {
    cursor.style.width = "18px";
    cursor.style.height = "18px";
    follower.style.width = "54px";
    follower.style.height = "54px";
  });
  el.addEventListener("mouseleave", () => {
    cursor.style.width = "10px";
    cursor.style.height = "10px";
    follower.style.width = "36px";
    follower.style.height = "36px";
  });
});

/* =========================
   STICKY HEADER
========================= */
const header = document.getElementById("header");

window.addEventListener("scroll", () => {
  header.classList.toggle("scrolled", window.scrollY > 60);
});

/* =========================
   MOBILE HAMBURGER
========================= */
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("open");
});

document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => navLinks.classList.remove("open"));
});

/* =========================
   HERO SLIDESHOW
========================= */
const heroImages = document.querySelectorAll(".hero-img");
const slideDots = document.querySelectorAll(".slide-dot");
let currentSlide = 0;
let slideInterval;

function goToSlide(index) {
  heroImages[currentSlide].classList.remove("active");
  slideDots[currentSlide].classList.remove("active");
  currentSlide = index;
  heroImages[currentSlide].classList.add("active");
  slideDots[currentSlide].classList.add("active");
}

function nextSlide() {
  goToSlide((currentSlide + 1) % heroImages.length);
}

slideInterval = setInterval(nextSlide, 5000);

slideDots.forEach((dot) => {
  dot.addEventListener("click", () => {
    clearInterval(slideInterval);
    goToSlide(parseInt(dot.dataset.index));
    slideInterval = setInterval(nextSlide, 5000);
  });
});

/* =========================
   MENU TABS
========================= */
const tabBtns = document.querySelectorAll(".tab-btn");
const tabPanels = document.querySelectorAll(".tab-panel");

tabBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    tabBtns.forEach((b) => b.classList.remove("active"));
    tabPanels.forEach((p) => p.classList.remove("active"));
    btn.classList.add("active");
    document.getElementById("tab-" + btn.dataset.tab).classList.add("active");
    triggerReveal();
  });
});

/* =========================
   GALLERY LIGHTBOX
========================= */
const galItems = document.querySelectorAll(".gal-item[data-lightbox]");
const lightbox = document.getElementById("lightbox");
const lbImg = document.getElementById("lbImg");
const lbClose = document.getElementById("lbClose");
const lbPrev = document.getElementById("lbPrev");
const lbNext = document.getElementById("lbNext");
let galleryImgs = [];
let lbCurrent = 0;

galItems.forEach((item, i) => {
  const src = item.querySelector("img").src;
  galleryImgs.push(src);
  item.addEventListener("click", () => {
    lbCurrent = i;
    lbImg.src = galleryImgs[lbCurrent];
    lightbox.classList.add("open");
  });
});

lbClose.addEventListener("click", () => lightbox.classList.remove("open"));

lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) lightbox.classList.remove("open");
});

lbPrev.addEventListener("click", () => {
  lbCurrent = (lbCurrent - 1 + galleryImgs.length) % galleryImgs.length;
  lbImg.src = galleryImgs[lbCurrent];
});

lbNext.addEventListener("click", () => {
  lbCurrent = (lbCurrent + 1) % galleryImgs.length;
  lbImg.src = galleryImgs[lbCurrent];
});

document.addEventListener("keydown", (e) => {
  if (!lightbox.classList.contains("open")) return;
  if (e.key === "Escape") lightbox.classList.remove("open");
  if (e.key === "ArrowLeft") lbPrev.click();
  if (e.key === "ArrowRight") lbNext.click();
});

/* =========================
   TESTIMONIAL SLIDER
========================= */
const tSlides = document.querySelectorAll(".tslide");
const tDots = document.querySelectorAll(".tdot");
const tPrev = document.getElementById("tPrev");
const tNext = document.getElementById("tNext");
let tCurrent = 0;

function goToTestimonial(index) {
  tSlides[tCurrent].classList.remove("active");
  tDots[tCurrent].classList.remove("active");
  tCurrent = (index + tSlides.length) % tSlides.length;
  tSlides[tCurrent].classList.add("active");
  tDots[tCurrent].classList.add("active");
}

tPrev.addEventListener("click", () => goToTestimonial(tCurrent - 1));
tNext.addEventListener("click", () => goToTestimonial(tCurrent + 1));
tDots.forEach((dot, i) => dot.addEventListener("click", () => goToTestimonial(i)));

setInterval(() => goToTestimonial(tCurrent + 1), 6000);

/* =========================
   RESERVATION FORM
========================= */
const resForm = document.getElementById("reservationForm");
const formSuccess = document.getElementById("formSuccess");
const dateInput = document.getElementById("date");

dateInput.setAttribute("min", new Date().toISOString().split("T")[0]);

resForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const submitBtn = resForm.querySelector("button[type='submit']");
  submitBtn.textContent = "Processing...";
  submitBtn.disabled = true;

  setTimeout(() => {
    submitBtn.style.display = "none";
    formSuccess.style.display = "block";
    resForm.querySelectorAll("input, select, textarea").forEach((el) => (el.value = ""));
  }, 1400);
});

/* =========================
   SCROLL REVEAL
========================= */
const revealEls = document.querySelectorAll(".reveal-up, .reveal-left, .reveal-right");

function triggerReveal() {
  revealEls.forEach((el) => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.9) {
      el.classList.add("visible");
    }
  });
}

window.addEventListener("scroll", triggerReveal);
window.addEventListener("load", triggerReveal);
triggerReveal();