const correctPassword = "0920";
const lockScreen = document.getElementById("lockScreen");
const mainContent = document.getElementById("mainContent");
const bgm = document.getElementById("bgm");
const pwInput = document.getElementById("pwInput");
const mapLink = document.getElementById("mapLink");
const mapText = document.getElementById("mapText");

function unlock() {
  const input = pwInput.value.trim();
  if (input === correctPassword) {
    document.activeElement.blur(); // 포커스 해제
    lockScreen.style.display = "none";
    mainContent.style.display = "block";
    bgm.muted = false;
    bgm.play();
  } else {
    alert("초대 코드가 올바르지 않습니다.");
  }
}

function updateLanguage(lang) {
  document.querySelectorAll("[data-lang-ko]").forEach(el => {
    const text = el.getAttribute(`data-lang-${lang}`);
    if (text) el.innerHTML = text;
  });

  // 지도 링크 업데이트
  if (lang === "ko") {
    mapLink.href = "https://naver.me/GNWkr4t4";
    mapLink.innerText = "네이버 지도 열기";
  } else {
    mapLink.href = "https://maps.app.goo.gl/zsKjMWQDjUWT4pEo9";
    mapLink.innerText = "Open in Google Maps";
  }
}

function updateLockScreenLang() {
  const lang = document.getElementById("languageSelect").value;
  updateLanguage(lang);
}

function handleSlideFade() {
  const slides = document.querySelectorAll(".slide");
  slides.forEach((slide) => {
    const rect = slide.getBoundingClientRect();
    const isVisible = rect.top >= -window.innerHeight / 3 && rect.top <= window.innerHeight / 2;
    slide.classList.toggle("active", isVisible);
  });
}

// 초기화
document.addEventListener("DOMContentLoaded", () => {
  mainContent.style.display = "none";
  updateLanguage("ko"); // 기본 언어 설정
  handleSlideFade(); // 첫 화면 페이드 활성화
});

// 스크롤 이벤트로 슬라이드 페이드 처리
document.querySelector(".scroll-container").addEventListener("scroll", handleSlideFade);
