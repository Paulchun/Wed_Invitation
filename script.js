const pwInput = document.getElementById("pwInput");
const unlockBtn = document.getElementById("unlockBtn");
const lockScreen = document.getElementById("lockScreen");
const mainContent = document.getElementById("mainContent");
const bgm = document.getElementById("bgm");
const slides = document.querySelectorAll(".slide");
const languageSelect = document.getElementById("languageSelect");

const LANG_MAP = {
  ko: {
    open: "청첩장 열기",
    placeholder: "초대 코드를 입력하세요",
    alertEmpty: "초대 코드를 입력해 주세요",
    alertWrong: "초대 코드가 올바르지 않습니다",
    rsvpTitle: "참석 의사가 있으신 분은 아래에 남겨주세요",
    name: "이름",
    message: "특이 사항",
    submit: "제출",
    weekdays: ["일", "월", "화", "수", "목", "금", "토"],
    calendarMonth: "2025년 9월",
  },
  ja: {
    open: "招待状を開く",
    placeholder: "招待コードを入力してください",
    alertEmpty: "招待コードを入力してください",
    alertWrong: "招待コードが正しくありません",
    rsvpTitle: "ご出席の方は以下にご記入ください",
    name: "お名前",
    message: "特記事項",
    submit: "送信",
    weekdays: ["日", "月", "火", "水", "木", "金", "土"],
    calendarMonth: "2025年9月",
  },
  en: {
    open: "Open Invitation",
    placeholder: "Enter invitation code",
    alertEmpty: "Please enter the invitation code",
    alertWrong: "The invitation code is incorrect",
    rsvpTitle: "Please let us know if you’ll attend",
    name: "Name",
    message: "Message",
    submit: "Submit",
    weekdays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    calendarMonth: "September 2025",
  },
};

function getLang() {
  return languageSelect?.value || "ko";
}

function getLangText(key) {
  const lang = getLang();
  return LANG_MAP[lang]?.[key] || "";
}

function updateLockScreenLang() {
  pwInput.placeholder = getLangText("placeholder");
  unlockBtn.innerText = getLangText("open");
}

function updateLanguage() {
  updateLockScreenLang();

  // 다국어 지원 요소
  document.querySelectorAll("[data-lang-ko]").forEach(el => {
    const lang = getLang();
    const key = `lang-${lang}`;
    el.innerHTML = el.getAttribute(`data-${key}`);
  });

  // 달력
  const month = document.querySelector(".calendar-box .month");
  const daysRow = document.querySelector(".calendar-box .days");

  if (month) month.innerText = getLangText("calendarMonth");

  if (daysRow) {
    const labels = LANG_MAP[getLang()].weekdays
      .map(w => `<span>${w}</span>`)
      .join("");
    const rest = Array.from(daysRow.children).slice(7); // 요일 이후
    daysRow.innerHTML = labels + rest.map(node => node.outerHTML).join("");
  }

  // 지도 링크 텍스트
  const mapText = document.getElementById("mapText");
  const mapLink = document.getElementById("mapLink");
  if (mapText && mapLink) {
    const lang = getLang();
    mapText.innerHTML = mapText.getAttribute(`data-lang-${lang}`);
    mapLink.innerText = lang === "ko" ? "네이버 지도 열기" : "Open Google Maps";
    mapLink.href =
      lang === "ko"
        ? "https://naver.me/GNWkr4t4"
        : "https://maps.app.goo.gl/zsKjMWQDjUWT4pEo9";
  }

  // RSVP 텍스트
  document.getElementById("rsvpTitle").innerText = getLangText("rsvpTitle");
  document.getElementById("nameInput").placeholder = getLangText("name");
  document.getElementById("messageInput").placeholder = getLangText("message");
  document.getElementById("submitBtn").innerText = getLangText("submit");
}

function unlock() {
  const code = pwInput.value.trim();
  if (!code) {
    alert(getLangText("alertEmpty"));
    return;
  }

  if (code === "0920") {
    lockScreen.style.display = "none";
    mainContent.style.display = "block";
    bgm.currentTime = 0;
    bgm.muted = false;
    bgm.play().catch(console.error);
    updateLanguage();
  } else {
    alert(getLangText("alertWrong"));
  }
}

languageSelect.addEventListener("change", updateLanguage);

// 슬라이드 페이드 효과
let lastScroll = 0;
mainContent?.addEventListener("scroll", () => {
  const scrollTop = mainContent.scrollTop;
  slides.forEach((slide, i) => {
    const offsetTop = slide.offsetTop;
    const offsetHeight = slide.offsetHeight;
    if (
      scrollTop >= offsetTop - offsetHeight / 2 &&
      scrollTop < offsetTop + offsetHeight / 2
    ) {
      slide.classList.add("fade");
    } else {
      slide.classList.remove("fade");
    }
  });
  lastScroll = scrollTop;
});

// RSVP 처리
const rsvpForm = document.getElementById("rsvpForm");

if (rsvpForm) {
  rsvpForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = rsvpForm.elements["name"].value;
    const message = rsvpForm.elements["message"].value;

    try {
      const response = await fetch(
        "https://script.google.com/macros/s/AKfycbxNIJJJid0yuIa7y8ymnf8tl-_BnhAsUabJ-S9YLvjiv9G0FziQHfgxMadUL8oVFN6r4g/exec",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, message }),
        }
      );

      if (response.ok) {
        alert("참여 의사가 성공적으로 제출되었습니다!");
        rsvpForm.reset(); // 화면은 유지
      } else {
        alert("제출 중 문제가 발생했습니다.");
      }
    } catch (err) {
      alert("제출 중 오류가 발생했습니다.");
      console.error(err);
    }
  });
}
