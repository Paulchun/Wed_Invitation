// 언어에 따라 텍스트 변경
function updateLanguage(lang) {
  document.querySelectorAll("[data-lang-ko], [data-lang-ja], [data-lang-en]").forEach((el) => {
    if (lang === "ko") el.innerHTML = el.dataset.langKo;
    else if (lang === "ja") el.innerHTML = el.dataset.langJa;
    else if (lang === "en") el.innerHTML = el.dataset.langEn;
  });

  // 지도 링크도 언어에 따라 변경
  const mapLink = document.getElementById("mapLink");
  if (lang === "ko") {
    mapLink.href = "https://naver.me/GNWkr4t4";
    mapLink.textContent = "네이버 지도 열기";
  } else {
    mapLink.href = "https://maps.app.goo.gl/zsKjMWQDjUWT4pEo9";
    mapLink.textContent = "Open in Google Maps";
  }
}

// 초대코드 해제 기능
function unlock() {
  const input = document.getElementById("pwInput").value.trim();
  const validCode = "0920"; // 초대 코드
  if (input === validCode) {
    document.getElementById("lockScreen").style.display = "none";
    const bgm = document.getElementById("bgm");
    bgm.muted = false;
    bgm.play().catch(() => {}); // autoplay 오류 방지
  } else {
    alert("초대 코드를 확인해 주세요.");
  }
}

// 초기에 언어 설정
function updateLockScreenLang() {
  const lang = document.getElementById("languageSelect").value;
  updateLanguage(lang);
}

// 초기 로드 시 언어 설정
document.addEventListener("DOMContentLoaded", () => {
  const lang = document.getElementById("languageSelect").value;
  updateLanguage(lang);
});
