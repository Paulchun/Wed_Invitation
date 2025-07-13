const lang = navigator.language.includes("ja")
  ? "ja"
  : navigator.language.includes("en")
  ? "en"
  : "ko";

const i18n = {
  ko: {
    lockMessage: "초대 코드를 입력하세요",
    unlockBtn: "청첩장 열기",
    slide1Text: "결혼합니다",
    slide2Text: "소중한 날 함께해 주세요",
    slide3Text: "감사합니다",
    groomIntro: "신랑 소개: 정헤성입니다.",
    brideIntro: "신부 소개: 누구누구입니다.",
    calendarTitle: "결혼은 이떄입니다",
    locationTitle: "오시는 길",
    howToCome: "서울특별시 종로구 어딘가입니다.",
    rsvpTitle: "RSVP",
    rsvpPrompt: "참석 의사가 있으신 분은 아래에 남겨주세요",
    submitBtn: "제출",
    namePlaceholder: "이름",
    messagePlaceholder: "메시지",
  },
  ja: {
    lockMessage: "招待コードを入力してください",
    unlockBtn: "招待状を開く",
    slide1Text: "結婚します",
    slide2Text: "大切な日にご一緒してください",
    slide3Text: "ありがとうございます",
    groomIntro: "新郎: ジョン・ヘソンです。",
    brideIntro: "新婦: 誰々です。",
    calendarTitle: "結婚式の日程",
    locationTitle: "会場のご案内",
    howToCome: "ソウル特別市鍾路区のどこかです。",
    rsvpTitle: "出欠連絡",
    rsvpPrompt: "ご参加いただける方は、以下にご記入ください。",
    submitBtn: "送信",
    namePlaceholder: "お名前",
    messagePlaceholder: "メッセージ",
  },
  en: {
    lockMessage: "Enter invitation code",
    unlockBtn: "Open Invitation",
    slide1Text: "We are getting married",
    slide2Text: "Please join us on our special day",
    slide3Text: "Thank you",
    groomIntro: "Groom: I'm Hyesung Chun.",
    brideIntro: "Bride: I'm someone special.",
    calendarTitle: "Wedding Date",
    locationTitle: "How to Get There",
    howToCome: "Somewhere in Jongno-gu, Seoul.",
    rsvpTitle: "RSVP",
    rsvpPrompt: "Please leave your RSVP below",
    submitBtn: "Submit",
    namePlaceholder: "Your Name",
    messagePlaceholder: "Your Message",
  },
};

window.onload = () => {
  Object.keys(i18n[lang]).forEach((key) => {
    const el = document.querySelector(`[data-lang-key="${key}"]`);
    if (el) el.innerText = i18n[lang][key];
  });

  document.getElementById("lock-message").innerText = i18n[lang].lockMessage;
  document.querySelector("button").innerText = i18n[lang].unlockBtn;
  document.querySelector("#invitation-code").placeholder =
    i18n[lang].lockMessage;
  document.querySelector('[name="name"]').placeholder =
    i18n[lang].namePlaceholder;
  document.querySelector('[name="message"]').placeholder =
    i18n[lang].messagePlaceholder;

  document.getElementById("googleMapBtn").href =
    "https://www.google.com/maps?q=서울특별시 종로구";
  document.getElementById("naverMapBtn").href =
    "https://map.naver.com/v5/search/서울특별시 종로구";
};

function unlockInvitation() {
  const code = document.getElementById("invitation-code").value;
  if (code === "1009") {
    document.getElementById("invitation-lock").classList.add("hidden");
    document.getElementById("invitation").classList.remove("hidden");
  } else {
    alert("코드가 올바르지 않습니다");
  }
}

document
  .getElementById("rsvp-form")
  .addEventListener("submit", async function (e) {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const message = form.message.value;

    const res = await fetch(
      "https://script.google.com/macros/s/AKfycbxNIJJJid0yuIa7y8ymnf8tI-_BnhAsUabJ-S9YLvjiv9G0FziQHfgxMadUL8oVFN6r4g/exec",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, message }),
      }
    );

    const data = await res.json();
    document.getElementById("form-result").innerText = data.result === "Success" ? "감사합니다!" : "에러가 발생했습니다.";
  });