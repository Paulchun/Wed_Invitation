const correctPassword = "ggh2025";

const lockScreen = document.getElementById("lockScreen");
const mainContent = document.getElementById("mainContent");
const pwInput = document.getElementById("pwInput");
const unlockBtn = document.getElementById("unlockBtn");
const languageSelect = document.getElementById("languageSelect");
const bgm = document.getElementById("bgm");

// 🔐 잠금 해제 처리
function unlock() {
  const input = pwInput.value;
  const lang = languageSelect.value;

  if (input === correctPassword) {
    lockScreen.style.display = "none";
    mainContent.style.display = "block";
    setLanguage(lang);
    bgm.volume = 0.7;
    bgm.play().catch(() => {});
  } else {
    alert(
      lang === "ja"
        ? "招待コードが間違っています。"
        : lang === "en"
        ? "Invitation code is incorrect."
        : "초대 코드가 틀렸습니다."
    );
  }
}

// ⌨️ Enter 키 입력 감지
pwInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") unlock();
});

// 🌐 다국어 처리
function setLanguage(lang) {
  document.querySelectorAll("[data-lang-ko]").forEach((el) => {
    const text = el.getAttribute(`data-lang-${lang}`);
    if (text) el.innerHTML = text;
  });
  updateLockScreenLang();
}

function updateLockScreenLang() {
  const lang = languageSelect.value;

  const placeholders = {
    ko: "초대 코드를 입력하세요",
    ja: "招待コードを入力してください",
    en: "Enter invitation code",
  };
  const btnTexts = {
    ko: "청첩장 열기",
    ja: "招待状を開く",
    en: "Open Invitation",
  };

  pwInput.placeholder = placeholders[lang];
  unlockBtn.innerText = btnTexts[lang];
}

// 🔄 언어 선택 시 자동 적용
languageSelect.addEventListener("change", () => {
  updateLockScreenLang();
});

updateLockScreenLang();

// 🎞️ 스크롤 페이드 인 애니메이션 (옵션)
const slides = document.querySelectorAll(".slide");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
      }
    });
  },
  { threshold: 0.4 }
);

slides.forEach((slide) => observer.observe(slide));
