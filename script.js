/************************************************
 * script.js – 2025-07-13 Fix
 * 1. data-lang 존재 확인 후 치환 → “Unidentified” 해결
 * 2. RSVP fetch → URLSearchParams (e.parameter) 방식
 ************************************************/

/* ---------- 언어 테이블 ---------- */
const LANG_MAP = {
  ko:{open:"청첩장 열기",placeholder:"초대 코드를 입력하세요",
      wrong:"초대 코드가 올바르지 않습니다",empty:"초대 코드를 입력해 주세요",
      rsvpTitle:"참석 의사가 있으신 분은 아래에 남겨주세요",
      namePH:"성함",msgPH:"특이 사항",submit:"제출",
      mapBtn:"네이버 지도 열기",calMonth:"2025년 9월",
      days:["일","월","화","수","목","금","토"]},
  ja:{open:"招待状を開く",placeholder:"招待コードを入力してください",
      wrong:"招待コードが正しくありません",empty:"招待コードを入力してください",
      rsvpTitle:"ご出席の方は以下にご記入ください",
      namePH:"お名前",msgPH:"特記事項",submit:"送信",
      mapBtn:"Googleマップを開く",calMonth:"2025年9月",
      days:["日","月","火","水","木","金","土"]},
  en:{open:"Open Invitation",placeholder:"Enter invitation code",
      wrong:"Invitation code is incorrect",empty:"Please enter the invitation code",
      rsvpTitle:"If you’ll attend, please leave your info",
      namePH:"Name",msgPH:"Message",submit:"Submit",
      mapBtn:"Open in Google Maps",calMonth:"September 2025",
      days:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"]}
};

/* ---------- DOM 캐시 ---------- */
const lockScr   = document.getElementById("lockScreen");
const mainCont  = document.getElementById("mainContent");
const pwInput   = document.getElementById("pwInput");
const unlockBtn = document.getElementById("unlockBtn");
const langSel   = document.getElementById("languageSelect");
const bgm       = document.getElementById("bgm");
const slides    = document.querySelectorAll(".slide");

/* ---------- 헬퍼 ---------- */
const lang = ()=>langSel.value;
const T    = k=>LANG_MAP[lang()][k]||"";

/* ---------- 언어 적용 ---------- */
function applyLang() {
  // 잠금화면
  pwInput.placeholder = T("placeholder");
  unlockBtn.textContent= T("open");

  // data-lang-* 치환 (존재할 때만)
  document.querySelectorAll("[data-lang-ko],[data-lang-ja],[data-lang-en]")
    .forEach(el=>{
      const key = `lang-${lang()}`;
      if(el.dataset[key]) el.innerHTML = el.dataset[key];
    });

  // 달력
  document.querySelector(".month").textContent = T("calMonth");
  const daysBox = document.querySelector(".calendar .days");
  if(daysBox){
    const labels = T("days").map(d=>`<span>${d}</span>`).join("");
    const rest = Array.from(daysBox.children).slice(7).map(n=>n.outerHTML).join("");
    daysBox.innerHTML = labels+rest;
  }

  // 지도
  const mapLink=document.getElementById("mapLink");
  mapLink.textContent = T("mapBtn");
  mapLink.href = lang()==="ko"
      ? "https://naver.me/GNWkr4t4"
      : "https://maps.app.goo.gl/zsKjMWQDjUWT4pEo9";

  // RSVP
  document.getElementById("rsvpTitle").textContent = T("rsvpTitle");
  document.getElementById("nameInput").placeholder = T("namePH");
  document.getElementById("messageInput").placeholder = T("msgPH");
  document.getElementById("submitBtn").textContent   = T("submit");
}

/* ---------- 잠금 해제 ---------- */
function unlock(){
  const code = pwInput.value.trim();
  if(!code) return alert(T("empty"));
  if(code!=="0920") return alert(T("wrong"));
  lockScr.style.display="none";
  mainCont.style.display="block";
  bgm.currentTime=0; bgm.muted=false; bgm.play().catch(()=>{});
  applyLang();
}

/* ---------- 슬라이드 페이드 ---------- */
const io = new IntersectionObserver(entries=>{
  entries.forEach(e=>e.target.style.opacity = e.isIntersecting?1:0);
},{threshold:0.4});
slides.forEach(s=>{ s.style.opacity=0; io.observe(s); });

/* ---------- RSVP ---------- */
const RSVP_URL="https://script.google.com/macros/s/AKfycbxNIJJJid0yuIa7y8ymnf8tl-_BnhAsUabJ-S9YLvjiv9G0FziQHfgxMadUL8oVFN6r4g/exec";
document.getElementById("rsvpForm").addEventListener("submit",async e=>{
  e.preventDefault();
  const name=document.getElementById("nameInput").value.trim();
  const msg =document.getElementById("messageInput").value.trim();
  if(!name){ alert(T("namePH")+"?"); return;}

  const body = new URLSearchParams({name,msg});   // URL-encoded
  try{
    const res = await fetch(RSVP_URL,{method:"POST",body});
    if(res.ok){
      alert("✓ "+T("submit"));
      e.target.reset();
    }else alert("Error "+res.status);
  }catch(err){ alert("Network error"); console.error(err);}
});

/* ---------- 초기화 ---------- */
langSel.addEventListener("change",applyLang);
document.addEventListener("DOMContentLoaded",applyLang);
🟢 해야 할 구글 Apps Script 코드 (doPost)
javascript
복사
편집
function doPost(e){
  const sheet = SpreadsheetApp.getActive().getSheetByName("Sheet1");
  const { name, msg } = e.parameter;        // URLSearchParams로 받은 값
  sheet.appendRow([name, msg]);
  return ContentService.createTextOutput("OK");
}
