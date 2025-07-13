const password = "0920";

const translations = {
  ko: {
    pwPlaceholder: "초대 코드를 입력하세요",
    unlockBtn: "청첩장 열기",
    rsvpTitle: "참석 의사가 있으신 분은 아래에 남겨주세요",
    nameLabel: "성함",
    messageLabel: "남기실 말씀",
    submitBtn: "제출",
    submitSuccess: "참석 의사가 성공적으로 전달되었습니다. 감사합니다!",
    submitError: "제출 중 오류가 발생했습니다. 다시 시도해주세요.",
    calendarTitle: "📅 결혼식은 이 날이에요",
    mapText: "📍 경기도 화성시 동탄면 라비돌1길 33<br>🚌 수원역 6-3번 / 병점역 35-1, 35-3, 50번<br>🗺️ 네이버 지도에서 보기:",
    mapLink: "https://naver.me/GNWkr4t4"
  },
  ja: {
    pwPlaceholder: "招待コードを入力してください",
    unlockBtn: "招待状を開く",
    rsvpTitle: "ご出席の方は、以下にご記入ください",
    nameLabel: "お名前",
    messageLabel: "メッセージ",
    submitBtn: "送信",
    submitSuccess: "出席の意思が送信されました。ありがとうございます！",
    submitError: "送信中にエラーが発生しました。もう一度お試しください。",
    calendarTitle: "📅 結婚式の日",
    mapText: "📍 京畿道華城市東灘面 ラビドル1ギル 33<br>🚌 水原駅6-3番 / 餅店駅35-1, 35-3, 50番<br>🗺️ Googleマップで見る:",
    mapLink: "https://maps.app.goo.gl/zsKjMWQDjUWT4pEo9"
  },
  en: {
    pwPlaceholder: "Enter invitation code",
    unlockBtn: "Open Invitation",
    rsvpTitle: "If you would like to attend, please leave your name below",
    nameLabel: "Name",
    messageLabel: "Message",
    submitBtn: "Submit",
    submitSuccess: "Your attendance has been submitted. Thank you!",
    submitError: "Error occurred while submitting. Please try again.",
    calendarTitle: "📅 The Wedding Day",
    mapText: "📍 33, Laviedor 1-gil, Dongtan-myeon, Hwaseong-si<br>🚌 Suwon Sta. 6-3 / Byeongjeom Sta. 35-1, 35-3, 50<br>🗺️ View on Google Maps:",
    mapLink: "https://maps.app.goo.gl/zsKjMWQDjUWT4pEo9"
  }
};

function updateLockScreenLang() {
  const lang = document.getElementById("languageSelect").value;
  const t = translations[lang];
  document.getElementById("pwInput").placeholder = t.pwPlaceholder;
  document.getElementById("unlockBtn").innerText = t.unlockBtn;
}

function unlock() {
  const pw = document.getElementById("pwInput").value;
  if (pw === password) {
    document.getElementById("lockScreen").style.display = "none";
    document.getElementById("mainContent").style.display = "block";
    const audio = document.getElementById("bgm");
    audio.currentTime = 0;
    audio.muted = false;
    audio.play();
  } else {
    alert("초대 코드가 틀렸습니다.");
  }
}

function applyLanguage() {
  const lang = document.getElementById("languageSelect").value;
  document.querySelectorAll("[data-lang-ko]").forEach((el) => {
    el.innerHTML = el.getAttribute(`data-lang-${lang}`) || el.innerHTML;
  });

  // RSVP 라벨 번역
  document.querySelector(".rsvp h2").innerText = translations[lang].rsvpTitle;
  document.querySelector("#name").placeholder = translations[lang].nameLabel;
  document.querySelector("#message").placeholder = translations[lang].messageLabel;
  document.querySelector("#submitBtn").innerText = translations[lang].submitBtn;

  // 지도 텍스트 및 링크
  const mapText = document.getElementById("mapText");
  mapText.innerHTML = translations[lang].mapText;
  const mapLink = document.getElementById("mapLink");
  mapLink.href = translations[lang].mapLink;

  // 달력 타이틀 번역
  const calendarTitle = document.querySelector(".calendar h2");
  if (calendarTitle) calendarTitle.innerText = translations[lang].calendarTitle;

  updateLockScreenLang();
}

document.addEventListener("DOMContentLoaded", () => {
  applyLanguage();

  document.getElementById("languageSelect").addEventListener("change", () => {
    applyLanguage();
  });

  // RSVP 제출
  const rsvpForm = document.getElementById("rsvpForm");
  if (rsvpForm) {
    rsvpForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const lang = document.getElementById("languageSelect").value;
      const name = document.getElementById("name").value;
      const message = document.getElementById("message").value;

      try {
        const response = await fetch(
          "https://script.google.com/macros/s/AKfycbxNIJJJid0yuIa7y8ymnf8tl-_BnhAsUabJ-S9YLvjiv9G0FziQHfgxMadUL8oVFN6r4g/exec",
          {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams({ name, message }),
          }
        );
        if (response.ok) {
          alert(translations[lang].submitSuccess);
          document.getElementById("rsvpForm").reset();
        } else {
          alert(translations[lang].submitError);
        }
      } catch (err) {
        console.error(err);
        alert(translations[lang].submitError);
      }
    });
  }

  // 슬라이드 페이드 효과
  const slides = document.querySelectorAll(".slide");
  let options = { threshold: 0.4 };
  let observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-in");
      }
    });
  }, options);
  slides.forEach((slide) => observer.observe(slide));
});
