function unlock() {
  const pwInput = document.getElementById("pwInput");
  const code = pwInput.value.trim();
  const VALID_CODE = "0920";

  if (code !== VALID_CODE) {
    alert(getLangText("alertWrongCode"));
    return;
  }

  /* 잠금 해제 */
  document.getElementById("lockScreen").style.display = "none";

  /* BGM 처음부터 재생 */
  const bgm = document.getElementById("bgm");
  if (bgm) {
    bgm.currentTime = 0;
    bgm.muted = false;
    bgm.play().catch(() => {});
  }
}

// ---------- 언어 관련 ---------- //
const LANG_MAP = {
  ko: {
    placeholder: "초대 코드를 입력하세요",
    button: "청첩장 열기",
    alertWrongCode: "초대 코드를 확인해 주세요.",
    mapBtn: "네이버 지도 열기",
    rsvpTitle: "참석 의사가 있으신 분은 아래에 남겨주세요",
    month: "2025년 9월",
    weekdays: ["일", "월", "화", "수", "목", "금", "토"]
  },
  ja: {
    placeholder: "招待コードを入力してください",
    button: "招待状を開く",
    alertWrongCode: "招待コードが間違っています。",
    mapBtn: "Googleマップを開く",
    rsvpTitle: "ご出席の方は、以下にご記入ください",
    month: "2025年 9月",
    weekdays: ["日", "月", "火", "水", "木", "金", "土"]
  },
  en: {
    placeholder: "Enter invitation code",
    button: "Open Invitation",
    alertWrongCode: "Invitation code is incorrect.",
    mapBtn: "Open in Google Maps",
    rsvpTitle: "If you plan to attend, please leave your info below",
    month: "September 2025",
    weekdays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
  }
};

function getLang() {
  return document.getElementById("languageSelect").value;
}

function getLangText(key) {
  return LANG_MAP[getLang()][key];
}

function updateLanguage() {
  const lang = getLang();

  /* 다국어 데이터-속성 치환 */
  document.querySelectorAll("[data-lang-ko]").forEach(el => {
    el.innerHTML = el.dataset[`lang${lang.toUpperCase()}`];
  });

  /* 잠금 화면 placeholder / 버튼 */
  document.getElementById("pwInput").placeholder = LANG_MAP[lang].placeholder;
  document.getElementById("unlockBtn").innerText = LANG_MAP[lang].button;

  /* 달력 타이틀 & 요일 */
  document.getElementById("calendarMonth").innerText = LANG_MAP[lang].month;
  const daysRow = document.getElementById("calendarDays");
  if (daysRow) {
    const labels = LANG_MAP[lang].weekdays
      .map(w => `<span>${w}</span>`)
      .join("");
    // 첫 줄(요일)만 교체
    daysRow.innerHTML =
      labels + daysRow.innerHTML.replace(/^.*?(<span>1<\/span>)/, "$1");
  }

  /* 지도 버튼 글자 + 링크 */
  const mapLink = document.getElementById("mapLink");
  mapLink.innerText = LANG_MAP[lang].mapBtn;
  mapLink.href =
    lang === "ko"
      ? "https://naver.me/GNWkr4t4"
      : "https://maps.app.goo.gl/zsKjMWQDjUWT4pEo9";

  /* RSVP 안내 타이틀 */
  document.getElementById("rsvpTitle").innerText = LANG_MAP[lang].rsvpTitle;
}

// ---------- 슬라이드 페이드-인 ---------- //
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add("visible");
      else entry.target.classList.remove("visible");
    });
  },
  { threshold: 0.25 }
);

document.querySelectorAll(".slide").forEach((slide) => observer.observe(slide));

// ---------- RSVP 전송 ---------- //
const RSVP_URL =
  "https://script.google.com/macros/s/AKfycbxNIJJJid0yuIa7y8ymnf8tl-_BnhAsUabJ-S9YLvjiv9G0FziQHfgxMadUL8oVFN6r4g/exec";

const rsvpForm = document.getElementById("rsvpForm");
if (rsvpForm) {
  rsvpForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = rsvpForm.name.value.trim();
    const message = rsvpForm.message.value.trim();

    if (!name) {
      alert("성함을 입력해 주세요.");
      return;
    }

    try {
      const res = await fetch(RSVP_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, message })
      });
      if (res.ok) {
        alert("제출되었습니다! 감사합니다.");
        rsvpForm.reset();               // 폼만 초기화, 화면은 유지
      } else {
        alert("제출 실패. 다시 시도해 주세요.");
      }
    } catch (err) {
      console.error("RSVP 오류:", err);
      alert("제출 중 오류가 발생했습니다.");
    }
  });
}

// ---------- 초기화 ---------- //
document.addEventListener("DOMContentLoaded", updateLanguage);
document.getElementById("languageSelect").addEventListener("change", updateLanguage);
