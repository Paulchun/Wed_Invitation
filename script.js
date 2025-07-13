// Multilingual dictionary
const langData = {
  ko: {
    enterCode: "초대 코드를 입력하세요",
    openInvite: "청첩장 열기",
    rsvpTitle: "참석 의사가 있으신 분은 아래에 남겨주세요",
    name: "성함",
    message: "남기실 말씀",
    send: "전송하기",
    success: "전송되었습니다. 감사합니다!"
  },
  en: {
    enterCode: "Enter invitation code",
    openInvite: "Open Invitation",
    rsvpTitle: "Please leave your RSVP message below",
    name: "Name",
    message: "Message",
    send: "Submit",
    success: "Submitted. Thank you!"
  },
  ja: {
    enterCode: "招待コードを入力してください",
    openInvite: "招待状を開く",
    rsvpTitle: "ご出席の方は下記にご記入ください",
    name: "お名前",
    message: "メッセージ",
    send: "送信する",
    success: "送信されました。ありがとうございます！"
  }
};

let currentLang = "ko";

function updateTexts() {
  const dict = langData[currentLang];
  if (!dict) return;

  // Static text replacements
  document.getElementById("pwInput").placeholder = dict.enterCode;
  document.getElementById("unlockBtn").innerText = dict.openInvite;
  document.getElementById("rsvpTitle").innerText = dict.rsvpTitle;
  document.getElementById("nameInput").placeholder = dict.name;
  document.getElementById("messageInput").placeholder = dict.message;
  document.getElementById("submitBtn").innerText = dict.send;

  // Lang-specific elements
  document.querySelectorAll("[data-lang-ko], [data-lang-en], [data-lang-ja]").forEach(el => {
    const txt = el.dataset[`lang${currentLang.charAt(0).toUpperCase() + currentLang.slice(1)}`];
    if (txt) el.innerHTML = txt;
  });

  // Map link switching
  const mapLink = document.getElementById("mapLink");
  if (mapLink) {
    if (currentLang === "ko") {
      mapLink.href = "https://naver.me/GNWkr4t4";
      mapLink.innerText = "네이버 지도 열기";
    } else {
      mapLink.href = "https://maps.app.goo.gl/zsKjMWQDjUWT4pEo9";
      mapLink.innerText = "Open Google Maps";
    }
  }

  // Calendar month text
  const monthText = {
    ko: "2025년 9월",
    en: "September 2025",
    ja: "2025年9月"
  };
  const weekdays = {
    ko: ["일", "월", "화", "수", "목", "금", "토"],
    en: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    ja: ["日", "月", "火", "水", "木", "金", "土"]
  };

  const monthEl = document.querySelector(".month");
  if (monthEl) monthEl.innerText = monthText[currentLang] || monthText["ko"];

  const daysEl = document.querySelector(".days");
  if (daysEl) {
    const allDays = [
      "", "1", "2", "3", "4", "5", "6",
      "7", "8", "9", "10", "11", "12", "13",
      "14", "15", "16", "17", "18", "19", "20",
      "21", "22", "23", "24", "25", "26", "27",
      "28", "29", "30"
    ];
    daysEl.innerHTML = weekdays[currentLang].map(day => `<span>${day}</span>`).join('') +
      allDays.map((d, i) => `<span${d === "20" ? ' class="highlight"' : ""}>${d}</span>`).join('');
  }
}

// Language selection
document.getElementById("languageSelect").addEventListener("change", function () {
  currentLang = this.value;
  updateTexts();
});

// Unlock invitation
function unlock() {
  const input = document.getElementById("pwInput").value.trim();
  if (input === "0920") {
    document.getElementById("lockScreen").style.display = "none";
    document.body.style.overflow = "auto";
    document.getElementById("bgm").currentTime = 0;
    document.getElementById("bgm").muted = false;
    document.getElementById("bgm").play();
  } else {
    alert("잘못된 초대 코드입니다.");
  }
}

// RSVP Submit
document.getElementById("rsvpForm").addEventListener("submit", async function (e) {
  e.preventDefault();
  const name = document.getElementById("nameInput").value.trim();
  const message = document.getElementById("messageInput").value.trim();
  const status = document.getElementById("rsvpStatus");

  if (!name || !message) {
    status.innerText = "모든 항목을 입력해 주세요.";
    return;
  }

  try {
    const response = await fetch("https://script.google.com/macros/s/AKfycbxNIJJJid0yuIa7y8ymnf8tl-_BnhAsUabJ-S9YLvjiv9G0FziQHfgxMadUL8oVFN6r4g/exec", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `name=${encodeURIComponent(name)}&message=${encodeURIComponent(message)}`
    });
    const result = await response.text();
    status.innerText = result.includes("Success") ? langData[currentLang].success : "오류가 발생했습니다.";
    document.getElementById("rsvpForm").reset();
  } catch (err) {
    status.innerText = "네트워크 오류가 발생했습니다.";
  }
});

// Fade on scroll
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("fade");
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll(".slide").forEach(slide => {
  observer.observe(slide);
});

// Auto-initialize language
document.addEventListener("DOMContentLoaded", () => {
  updateTexts();
});
