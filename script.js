// 🔐 초대 코드 및 언어 처리
const correctPassword = "ggh2025";

document.getElementById("pwInput").addEventListener("keydown", (e) => {
  if (e.key === "Enter") unlock();
});

function unlock() {
  const input = document.getElementById("pwInput").value;
  const lang = document.getElementById("languageSelect").value;

  if (input === correctPassword) {
    document.getElementById("lockScreen").style.display = "none";
    document.getElementById("mainContent").style.display = "block";
    setLanguage(lang);

    const bgm = document.getElementById("bgm");
    bgm.volume = 0.8;
    bgm.play().catch(err => console.log("BGM 재생 실패:", err));
  } else {
    alert(lang === "ja"
      ? "招待コードが間違っています。"
      : lang === "en"
      ? "Invitation code is incorrect."
      : "초대 코드가 틀렸습니다.");
  }
}

function setLanguage(lang) {
  document.querySelectorAll("[data-lang-ko]").forEach(el => {
    el.innerHTML = el.getAttribute(`data-lang-${lang}`);
  });
  updateLockScreenLang();
}

function updateLockScreenLang() {
  const lang = document.getElementById("languageSelect").value;
  const pwInput = document.getElementById("pwInput");
  const unlockBtn = document.getElementById("unlockBtn");

  if (lang === "ko") {
    pwInput.placeholder = "초대 코드를 입력하세요";
    unlockBtn.innerText = "청첩장 열기";
  } else if (lang === "ja") {
    pwInput.placeholder = "招待コードを入力してください";
    unlockBtn.innerText = "招待状を開く";
  } else if (lang === "en") {
    pwInput.placeholder = "Enter invitation code";
    unlockBtn.innerText = "Open Invitation";
  }
}

// 🖼️ 이미지 슬라이드 기능
let currentSlide = 0;
let slides = [];

function showSlide(index) {
  if (slides.length === 0) return;
  slides.forEach(slide => slide.classList.remove('active'));
  currentSlide = (index + slides.length) % slides.length;
  slides[currentSlide].classList.add('active');
}

function changeSlide(offset) {
  showSlide(currentSlide + offset);
}

// 🎯 초기 실행
document.addEventListener('DOMContentLoaded', () => {
  updateLockScreenLang();

  slides = document.querySelectorAll('.slide');
  showSlide(currentSlide);
});
