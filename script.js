const LANG_MAP = {
  ko: {
    open:       "청첩장 열기",
    placeholder:"초대 코드를 입력하세요",
    wrong:      "초대 코드가 올바르지 않습니다",
    empty:      "초대 코드를 입력해 주세요",
    rsvpTitle:  "참석 의사가 있으신 분은 아래에 남겨주세요",
    namePH:     "성함",
    msgPH:      "특이 사항",
    submit:     "제출",
    mapBtn:     "네이버 지도 열기",
    calMonth:   "2025년 9월",
    days:       ["일","월","화","수","목","금","토"]
  },
  ja: {
    open:       "招待状を開く",
    placeholder:"招待コードを入力してください",
    wrong:      "招待コードが正しくありません",
    empty:      "招待コードを入力してください",
    rsvpTitle:  "ご出席の方は以下にご記入ください",
    namePH:     "お名前",
    msgPH:      "特記事項",
    submit:     "送信",
    mapBtn:     "Googleマップを開く",
    calMonth:   "2025年9月",
    days:       ["日","月","火","水","木","金","土"]
  },
  en: {
    open:       "Open Invitation",
    placeholder:"Enter invitation code",
    wrong:      "Invitation code is incorrect",
    empty:      "Please enter the invitation code",
    rsvpTitle:  "If you’ll attend, please leave your info",
    namePH:     "Name",
    msgPH:      "Message",
    submit:     "Submit",
    mapBtn:     "Open in Google Maps",
    calMonth:   "September 2025",
    days:       ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"]
  }
};

/* -------- DOM 요소 -------- */
const lockScreen   = document.getElementById("lockScreen");
const mainContent  = document.getElementById("mainContent");
const pwInput      = document.getElementById("pwInput");
const unlockBtn    = document.getElementById("unlockBtn");
const languageSel  = document.getElementById("languageSelect");
const bgm          = document.getElementById("bgm");
const slides       = document.querySelectorAll(".slide");

/* -------- 헬퍼 -------- */
const getLang      = () => languageSel.value;
const L            = key => LANG_MAP[getLang()][key] || "";

/* -------- 언어 적용 -------- */
function applyLanguage() {
  // 잠금 화면
  pwInput.placeholder = L("placeholder");
  unlockBtn.innerText = L("open");

  // data-lang-* 치환
  document.querySelectorAll("[data-lang-ko]").forEach(el=>{
    el.innerHTML = el.dataset[`lang${getLang().toUpperCase()}`];
  });

  // 달력
  document.querySelector(".month").innerText = L("calMonth");
  const daysRow = document.querySelector(".calendar .days");
  if (daysRow){
    const labels = L("days").map(d=>`<span>${d}</span>`).join("");
    const dates  = Array.from(daysRow.children).slice(7).map(n=>n.outerHTML).join("");
    daysRow.innerHTML = labels+dates;
  }

  // 지도 링크
  const mapLink = document.getElementById("mapLink");
  mapLink.innerText = L("mapBtn");
  mapLink.href = getLang()==="ko"
      ? "https://naver.me/GNWkr4t4"
      : "https://maps.app.goo.gl/zsKjMWQDjUWT4pEo9";

  // RSVP 라벨
  document.getElementById("rsvpTitle").innerText = L("rsvpTitle");
  document.getElementById("nameInput").placeholder    = L("namePH");
  document.getElementById("messageInput").placeholder = L("msgPH");
  document.getElementById("submitBtn").innerText      = L("submit");
}

/* -------- 잠금 해제 -------- */
function unlock(){
  const code = pwInput.value.trim();
  if(!code){ alert(L("empty")); return; }
  if(code!=="0920"){ alert(L("wrong")); return;}

  lockScreen.style.display="none";
  mainContent.style.display="block";
  bgm.currentTime=0; bgm.muted=false; bgm.play().catch(()=>{});
  applyLanguage();
}

/* -------- 슬라이드 페이드 (IntersectionObserver) -------- */
const io = new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting) e.target.classList.add("fade");
    else e.target.classList.remove("fade");
  });
},{threshold:0.3});
slides.forEach(s=>io.observe(s));

/* -------- RSVP 전송 -------- */
const rsvpForm = document.getElementById("rsvpForm");
const RSVP_URL ="https://script.google.com/macros/s/AKfycbxNIJJJid0yuIa7y8ymnf8tl-_BnhAsUabJ-S9YLvjiv9G0FziQHfgxMadUL8oVFN6r4g/exec";

rsvpForm.addEventListener("submit",async e=>{
  e.preventDefault();
  const name    = rsvpForm.name.value.trim();
  const message = rsvpForm.message.value.trim();
  if(!name){ alert(L("namePH")+"?"); return; }

  try{
    const res = await fetch(RSVP_URL,{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({name,message})
    });
    if(res.ok){
      alert("✓ " + L("submit"));
      rsvpForm.reset();
    }else alert("Error: "+res.status);
  }catch(err){
    console.error(err);
    alert("Network Error");
  }
});

/* -------- 초기화 -------- */
languageSel.addEventListener("change",applyLanguage);
document.addEventListener("DOMContentLoaded",applyLanguage);
