const correctPassword = "ggh2025";

document.getElementById("pwInput").addEventListener("keydown", (e) => {
  if (e.key === "Enter") unlock();
});

function unlock() {
  const input = document.getElementById("pwInput").value;
  const lang = document.getElementById("languageSelect").value;

  if (input === correctPassword) {
    document.getElementById("lockScreen").style.display = "none";
    document.body.style.overflow = "auto";
    setLanguage(lang);

    const bgm = document.getElementById("bgm");
    if (bgm) {
      bgm.volume = 0.8;
      bgm.play().catch(err => console.log("BGM 재생 실패:", err));
    }
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

function setLanguage(lang) {
  document.querySelectorAll("[data-lang-ko]").forEach((el) => {
    el.innerHTML = el.getAttribute(`data-lang-${lang}`);
  });
  updateLockScreenLang(lang);
}

function updateLockScreenLang(lang) {
  const pwInput = document.getElementById("pwInput");
  const unlockBtn = document.getElementById("unlockBtn");

  if (!lang) {
    lang = document.getElementById("languageSelect").value;
  }

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

// 스크롤 중 가로 이동 방지
document.addEventListener("touchmove", function (e) {
  if (Math.abs(e.touches[0].clientX - (this.lastTouchX || 0)) > 10) {
    e.preventDefault();
  }
  this.lastTouchX = e.touches[0].clientX;
}, { passive: false });

// 스크롤 효과 개선
let lastScroll = 0;
document.addEventListener("wheel", function (e) {
  const slides = document.querySelectorAll(".slide");
  let currentIndex = Math.round(window.scrollY / window.innerHeight);

  if (e.deltaY > 0 && currentIndex < slides.length - 1) {
    scrollToSlide(currentIndex + 1);
  } else if (e.deltaY < 0 && currentIndex > 0) {
    scrollToSlide(currentIndex - 1);
  }
}, { passive: false });

function scrollToSlide(index) {
  const target = document.querySelectorAll(".slide")[index];
  if (target) {
    window.scrollTo({
      top: target.offsetTop,
      behavior: "smooth"
    });
  }
}
