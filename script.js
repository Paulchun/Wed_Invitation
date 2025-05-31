// script.js

// 🖼️ 이미지 슬라이드
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
function showSlide(n) {
  slides.forEach(slide => slide.classList.remove('active'));
  currentSlide = (n + slides.length) % slides.length;
  slides[currentSlide].classList.add('active');
}
function changeSlide(n) {
  showSlide(currentSlide + n);
}

// 📅 카운트다운
const countdown = document.getElementById("countdown");
const weddingDate = new Date("2025-06-20T00:00:00+09:00");
function updateCountdown() {
  const now = new Date();
  const diff = weddingDate - now;
  if (diff <= 0) {
    countdown.textContent = "오늘은 우리의 결혼식 날이에요! 💖";
    return;
  }
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  countdown.textContent = `D-${days}`;
}
setInterval(updateCountdown, 1000);
updateCountdown();

// 🌐 다국어 지원
function setLanguage(lang) {
  document.querySelectorAll('[data-lang-ko]').forEach(el => {
    el.innerHTML = el.getAttribute(`data-lang-${lang}`);
  });
}
