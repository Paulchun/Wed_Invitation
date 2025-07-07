const correctPassword = "ggh2025";
let slides = [];
let current = 0;
let interval;

// 초대코드 엔터 허용
document.getElementById("pwInput").addEventListener("keydown", (e) => {
  if (e.key === "Enter") unlock();
});

function unlock() {
  const input = document.getElementById("pwInput").value;
  const lang = document.getElementById("languageSelect").value;

  if (input === correctPassword) {
    document.getElementById("lockScreen").style.display = "none";
    document.getElementById("mainContent").style.display = "block";

    const bgm = document.getElementById("bgm");
    bgm.volume = 0.8;
    bgm.play().catch(err => console.log("BGM 재생 실패:", err));

    setLanguage(lang);
    initSlides();
  } else {
    alert(
      lang === "ja" ? "招待コードが間違っています。" :
      lang === "en" ? "Invitation code is incorrect." :
      "초대 코드가 틀렸습니다."
    );
  }
}

function setLanguage(lang) {
  document.querySelectorAll("[data-lang-ko]").forEach(el => {
    el.innerHTML = el.getAttribute(`data-lang-${lang}`);
  });
  updateLockScreenLang();

  const gMap = document.querySelector(".map-link-en-ja");
  if (gMap) {
    gMap.style.display = (lang === "ko") ? "none" : "inline";
  }
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

function initSlides() {
  slides = document.querySelectorAll(".slide");
  if (slides.length === 0) return;

  slides.forEach(slide => slide.classList.remove("active"));
  current = 0;
  slides[current].classList.add("active");

  interval = setInterval(() => {
    slides[current].classList.remove("active");
    current = (current + 1) % slides.length;
    slides[current].classList.add("active");
  }, 6000);
}

// 최초 언어 설정 적용
updateLockScreenLang();
