/* ——— Core ——— */
const INVITE_CODE = "0920";
const bgm          = document.getElementById("bgm");
const lockScr      = document.getElementById("lockScreen");
const mainCont     = document.getElementById("mainContent");
const langSel      = document.getElementById("languageSelect");

/* ——— 초기화 ——— */
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("unlockBtn").onclick = unlock;
  langSel.onchange = () => updateLanguage(langSel.value);
  updateLanguage(langSel.value);                // ① placeholder 즉시 번역

  /* 페이드-인 */
  const io = new IntersectionObserver(
    es => es.forEach(e => e.target.classList.toggle("show", e.isIntersecting)),
    { threshold: 0.4 }
  );
  document.querySelectorAll(".slide").forEach(s => io.observe(s));

  /* RSVP */
  document.getElementById("rsvpForm").addEventListener("submit", submitRSVP);
  document.documentElement.style.overflowX = "hidden";
});

/* ——— 잠금 해제 ——— */
function unlock() {
  const code = document.getElementById("pwInput").value.trim();
  if (code === INVITE_CODE) {
    lockScr.style.display = "none";
    mainCont.style.display = "block";
    bgm.currentTime = 0;
    bgm.muted = false;
    bgm.play();
  } else alert(getText("alertWrong"));
}

/* ——— 다국어 텍스트 ——— */
function getText(key) {
  const dict = {
    ko:{alertWrong:"초대 코드가 잘못되었습니다.",
        sending:"전송 중…",
        success:"정상적으로 접수되었습니다. 감사합니다!",
        fail:"전송 중 오류가 발생했습니다. 다시 시도해주세요.",
        month:"2025년 9월",
        days:["일","월","화","수","목","금","토"]},
    ja:{alertWrong:"招待コードが正しくありません。",
        sending:"送信中…",
        success:"正常に送信されました。ありがとうございます！",
        fail:"送信中にエラーが発生しました。再度お試しください。",
        month:"2025年 9月",
        days:["日","月","火","水","木","金","土"]},
    en:{alertWrong:"Invitation code is incorrect.",
        sending:"Sending…",
        success:"Your RSVP has been received. Thank you!",
        fail:"An error occurred. Please try again.",
        month:"September 2025",
        days:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"]}
  };
  return dict[langSel.value][key];
}

/* ——— 언어별 UI 업데이트 ——— */
function updateLanguage(lang) {
  /* data-lang-* 요소 */
  document.querySelectorAll("[data-lang-ko]").forEach(el=>{
    el.innerHTML = el.getAttribute(`data-lang-${lang}`) || el.getAttribute("data-lang-ko");
  });

  /* Lock-screen placeholder / button */
  const pwInput = document.getElementById("pwInput");
  const unlockB = document.getElementById("unlockBtn");
  if (lang==="ko"){pwInput.placeholder="초대 코드를 입력하세요"; unlockB.textContent="청첩장 열기";}
  else if(lang==="ja"){pwInput.placeholder="招待コードを入力してください"; unlockB.textContent="招待状を開く";}
  else{pwInput.placeholder="Enter invitation code"; unlockB.textContent="Open Invitation";}

  /* Map 링크 */
  const mapLink = document.getElementById("mapLink");
  if (mapLink){
    if(lang==="ko"){mapLink.href="https://naver.me/GNWkr4t4"; mapLink.textContent="네이버 지도 열기";}
    else{mapLink.href="https://maps.app.goo.gl/zsKjMWQDjUWT4pEo9"; mapLink.textContent="Open in Google Maps";}
  }

  /* 달력 월/요일 */
  document.getElementById("calendarMonth").textContent = getText("month");
  const daySpans = document.querySelectorAll("#calendarDays span:nth-child(-n+7)");
  getText("days").forEach((txt,i)=>{ if(daySpans[i]) daySpans[i].textContent = txt; });

  /* RSVP placeholders */
  const nI=document.getElementById("rsvpName"), mI=document.getElementById("rsvpMessage"), bI=document.getElementById("rsvpSubmit");
  if(lang==="ko"){nI.placeholder="성함"; mI.placeholder="남기실 말씀 (예: 숙박이 필요합니다)"; bI.textContent="보내기";}
  else if(lang==="ja"){nI.placeholder="お名前"; mI.placeholder="備考 (例：宿泊が必要です)"; bI.textContent="送信";}
  else{nI.placeholder="Name"; mI.placeholder="Special notes (e.g. need accommodation)"; bI.textContent="Submit";}
}

/* ——— RSVP 전송 ——— */
async function submitRSVP(e){
  e.preventDefault();
  const name=document.getElementById("rsvpName").value.trim();
  const msg =document.getElementById("rsvpMessage").value.trim();
  const st  =document.getElementById("rsvpStatus");
  if(!name||!msg){st.textContent=getText("fail"); return;}

  st.textContent=getText("sending");

  try{
    const res=await fetch(
      "https://script.google.com/macros/s/AKfycbyiCbBK4ZFkT4KfgirhsUm7L7tosdLdYF9SSpr-RSD5T5JNyIi1oNr6RHx-w98fZbRgOA/exec",
      {method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"},
       body:new URLSearchParams({name,message:msg})}
    );
    const txt = await res.text();
    if(res.ok && txt==="Success"){st.textContent=getText("success");}
    else throw new Error();
  }catch{ st.textContent=getText("fail"); }
}
