/************************************************
 * script.js – Wedding Invitation Front-end Logic
 ************************************************/

/* ---------- 다국어 처리 ---------- */
function updateLanguage(lang) {
  document.querySelectorAll("[data-lang-ko], [data-lang-ja], [data-lang-en]")
    .forEach((el) => {
      if (lang === "ko")      el.innerHTML = el.dataset.langKo;
      else if (lang === "ja") el.innerHTML = el.dataset.langJa;
      else                    el.innerHTML = el.dataset.langEn;
    });

  /* 지도 링크도 언어별로 변경 */
  const mapLink = document.getElementById("mapLink");
  if (lang === "ko") {
    mapLink.href = "https://naver.me/GNWkr4t4";
    mapLink.textContent = "네이버 지도 열기";
  } else {
    mapLink.href = "https://maps.app.goo.gl/zsKjMWQDjUWT4pEo9";
    mapLink.textContent = lang === "ja"
      ? "Googleマップを開く"
      : "Open in Google Maps";
  }
}

/* ---------- 잠금 화면 해제 ---------- */
function unlock() {
  const input     = document.getElementById("pwInput").value.trim();
  const validCode = "0920";                 // ✔️ 초대 코드
  if (input !== validCode) {
    alert("초대 코드를 확인해 주세요.");
    return;
  }

  /* 잠금 화면 숨기기 */
  document.getElementById("lockScreen").style.display = "none";

  /* BGM 처음부터 재생 */
  const bgm = document.getElementById("bgm");
  if (bgm) {
    bgm.currentTime = 0;   // 항상 0초부터
    bgm.muted       = false;
    bgm.play().catch(() => {}); // 모바일 autoplay 정책 대비
  }
}

/* ---------- 언어 선택 변경 ---------- */
function updateLockScreenLang() {
  const lang = document.getElementById("languageSelect").value;
  updateLanguage(lang);
}

/* ---------- 초기 설정 ---------- */
document.addEventListener("DOMContentLoaded", () => {
  const initialLang = document.getElementById("languageSelect").value;
  updateLanguage(initialLang);

  /* RSVP 폼 Google Script 연동 */
  const form = document.getElementById("rsvpForm");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const data = {
        name    : form.name.value,
        message : form.message.value
      };
      fetch("https://script.google.com/macros/s/___YOUR_SCRIPT_ID___/exec", {
        method : "POST",
        body   : JSON.stringify(data)
      })
      .then(()  => alert("제출되었습니다! 감사합니다."))
      .catch(() => alert("제출 중 오류가 발생했습니다. 다시 시도해 주세요."));
    });
  }
});
