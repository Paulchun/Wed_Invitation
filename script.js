/* === Core === */
const INVITE_CODE = "0920";
const bgm       = document.getElementById("bgm");
const lockScr   = document.getElementById("lockScreen");
const mainCont  = document.getElementById("mainContent");
const langSel   = document.getElementById("languageSelect");

/* === Init === */
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("unlockBtn").onclick = unlock;
  langSel.onchange = () => updateLanguage(langSel.value);
  updateLanguage(langSel.value); // 초기 다국어 적용

  // Fade-in
  const io = new IntersectionObserver(
    es => es.forEach(e => e.target.classList.toggle("show", e.isIntersecting)),
    {threshold:0.4}
  );
  document.querySelectorAll(".slide").forEach(s => io.observe(s));

  // RSVP
  document.getElementById("rsvpForm").addEventListener("submit", submitRSVP);

  // Prevent horizontal scroll
  document.documentElement.style.overflowX = "hidden";
});

/* === Unlock === */
function unlock(){
  const code = document.getElementById("pwInput").value.trim();
  if(code===INVITE_CODE){
    lockScr.style.display="none";
    mainCont.style.display="block";
    bgm.currentTime=0;
    bgm.muted=false;
    bgm.play();
  } else alert(getText("alertWrong"));
}

/* === i18n Dictionary === */
function getText(key){
  const d={
    ko:{
      alertWrong:"초대 코드가 잘못되었습니다.",
      sending:"전송 중…",
      success:"정상적으로 접수되었습니다. 감사합니다!",
      fail:"전송 실패. 다시 시도해주세요.",
      month:"2025년 9월",
      days:["일","월","화","수","목","금","토"],
      mapBtn:"네이버 지도 열기",
      moreInfo:"📎 더 많은 교통 정보는 라비돌 공식 사이트를 참고해주세요:"
    },
    ja:{
      alertWrong:"招待コードが正しくありません。",
      sending:"送信中…",
      success:"正常に送信されました。ありがとうございます！",
      fail:"送信に失敗しました。もう一度お試しください。",
      month:"2025年 9月",
      days:["日","月","火","水","木","金","土"],
      mapBtn:"Googleマップで開く",
      moreInfo:""
    },
    en:{
      alertWrong:"Invitation code is incorrect.",
      sending:"Sending…",
      success:"Your RSVP has been received. Thank you!",
      fail:"Send failed. Please try again.",
      month:"September 2025",
      days:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],
      mapBtn:"Open in Google Maps",
      moreInfo:""
    }
  };
  return d[langSel.value][key];
}

/* === Language Switch === */
function updateLanguage(lang){
  // data-lang-* switch
  document.querySelectorAll("[data-lang-ko]").forEach(el => {
    el.innerHTML = el.getAttribute(`data-lang-${lang}`) || el.getAttribute("data-lang-ko");
  });

  // Lock-screen placeholders
  const pwI = document.getElementById("pwInput"),
        unB = document.getElementById("unlockBtn");
  if(lang==="ko"){
    pwI.placeholder = "초대 코드를 입력하세요";
    unB.textContent = "청첩장 열기";
  } else if(lang==="ja"){
    pwI.placeholder = "招待コードを入力してください";
    unB.textContent = "招待状を開く";
  } else {
    pwI.placeholder = "Enter invitation code";
    unB.textContent = "Open Invitation";
  }

  // Calendar month / weekdays
  document.getElementById("calendarMonth").textContent = getText("month");
  const days = document.querySelectorAll("#calendarDays span:nth-child(-n+7)");
  getText("days").forEach((t, i) => {
    if(days[i]) days[i].textContent = t;
  });

  // Map link & text
  const mapLink = document.getElementById("mapLink");
  if(mapLink){
    if(lang==="ko"){
      mapLink.href = "https://naver.me/GNWkr4t4";
    } else {
      mapLink.href = "https://maps.app.goo.gl/zsKjMWQDjUWT4pEo9";
    }
    mapLink.textContent = getText("mapBtn");
  }

  // RSVP placeholders & button
  const nI = document.getElementById("rsvpName"),
        mI = document.getElementById("rsvpMessage"),
        btn = document.getElementById("rsvpSubmit");
  if(lang==="ko"){
    nI.placeholder = "성함";
    mI.placeholder = "남기실 말씀 (예: 숙박이 필요합니다)";
    btn.textContent = "보내기";
  } else if(lang==="ja"){
    nI.placeholder = "お名前";
    mI.placeholder = "備考 (例：宿泊が必要です)";
    btn.textContent = "送信";
  } else {
    nI.placeholder = "Name";
    mI.placeholder = "Special notes (e.g. need accommodation)";
    btn.textContent = "Submit";
  }

  // 라비돌 공식 링크 표시 여부
  const extra = document.getElementById("extraLaviedorInfo");
  if(extra){
    extra.style.display = (lang === "ko") ? "block" : "none";
  }
}

/* === RSVP === */
async function submitRSVP(e){
  e.preventDefault();
  const name = document.getElementById("rsvpName").value.trim();
  const msg  = document.getElementById("rsvpMessage").value.trim();
  const status = document.getElementById("rsvpStatus");
  if(!name || !msg){
    status.textContent = getText("fail");
    return;
  }

  status.textContent = getText("sending");
  try{
    const res = await fetch(
      "https://script.google.com/macros/s/AKfycbyiCbBK4ZFkT4KfgirhsUm7L7tosdLdYF9SSpr-RSD5T5JNyIi1oNr6RHx-w98fZbRgOA/exec",
      {
        method: "POST",
        headers: {"Content-Type": "application/x-www-form-urlencoded"},
        body: new URLSearchParams({name, message: msg})
      }
    );
    const json = await res.json();
    if(res.ok && json.result === "Success"){
      status.textContent = getText("success");
      document.getElementById("rsvpForm").reset();
    } else throw new Error();
  } catch {
    status.textContent = getText("fail");
  }
}
