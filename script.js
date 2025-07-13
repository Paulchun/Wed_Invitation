const correctPassword = "ggh2025";

document.getElementById("pwInput").addEventListener("keydown", (e) => {
  if (e.key === "Enter") unlock();
});

function unlock() {
  const input = document.getElementById("pwInput").value;
  const lang = document.getElementById("languageSelect").value;

  if (input === correctPassword) {
    document.activeElement.blur(); // ✅ 커서 포커스 해제

    document.getElementById("lockScreen").style.display = "none";
    document.body.style.overflow = "auto";
    setLanguage(lang);

    // 맨 위 슬라이드로 이동
    window.scrollTo({ top: 0, behavior: "auto" });

    // BGM 재생
    const bgm = document.getElementById("bgm");
    if (bgm) {
      bgm.load();
      bgm.muted = false;
      bgm.volume = 0.8;
      bgm.play().catch(err => console.log("BGM 재생 실패:", err));
    }

    // 초기 슬라이드 애니메이션 실행
    setTimeout(handleSlideAnimation, 100);
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

  const mapLink = document.getElementById("mapLink");
  if (lang === "ko") {
    mapLink.href = "https://naver.me/GNWkr4t4";
    mapLink.innerText = "네이버 지도 열기";
  } else {
    mapLink.href = "https://maps.app.goo.gl/zsKjMWQDjUWT4pEo9";
    mapLink.innerText = lang === "ja" ? "Googleマップを開く" : "Open in Google Maps";
  }
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

// 슬라이드 페이드 인 효과
function handleSlideAnimation() {
  const slides = document.querySelectorAll(".slide");
  const windowHeight = window.innerHeight;

  slides.forEach((slide) => {
    const rect = slide.getBoundingClientRect();
    const top = rect.top;

    if (top >= 0 && top < windowHeight * 0.8) {
      slide.classList.add("active");
    } else {
      slide.classList.remove("active");
    }
  });
}

window.addEventListener("scroll", handleSlideAnimation);
window.addEventListener("load", handleSlideAnimation);
