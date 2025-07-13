/* ---------- 언어 & 지도 링크 ---------- */
const LANG_MAP = {
  ko: { codePH:"초대 코드를 입력하세요", unlock:"청첩장 열기", mapTxt:"네이버 지도 열기", mapUrl:"https://naver.me/GNWkr4t4" },
  ja: { codePH:"招待コードを入力してください", unlock:"招待状を開く", mapTxt:"Googleマップを開く", mapUrl:"https://maps.app.goo.gl/zsKjMWQDjUWT4pEo9" },
  en: { codePH:"Enter invitation code",        unlock:"Open Invitation",  mapTxt:"Open Google Maps", mapUrl:"https://maps.app.goo.gl/zsKjMWQDjUWT4pEo9" }
};
let lang = "ko";

/* ---------- 잠금 화면 ---------- */
function updateLockText(){
  const t = LANG_MAP[lang];
  pwInput.placeholder = t.codePH;
  unlockBtn.textContent = t.unlock;
}
function unlock(){
  if(pwInput.value.trim()==="0920"){
    lockScreen.style.display="none";
    bgm.currentTime=0; bgm.play();
  }else alert("❌");
}
languageSelect.onchange = ()=>{ lang = languageSelect.value; updateLockText(); updateDynamicTexts(); };
updateLockText();

/* ---------- 지도 링크 & 다국어 동적 텍스트 ---------- */
function updateDynamicTexts(){
  const t = LANG_MAP[lang];
  mapLink.href = t.mapUrl;
  mapLink.innerText = t.mapTxt;
  document.querySelectorAll("[data-lang-ko]").forEach(el=>{
    const txt = el.dataset[`lang${lang.toUpperCase()}`];
    if(txt) el.innerHTML = txt;
  });
}
document.addEventListener("DOMContentLoaded",updateDynamicTexts);

/* ---------- 슬라이드 스냅 + 페이드 ---------- */
const slides = document.querySelectorAll(".slide");
const io = new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting) e.target.classList.add("fade");
  });
},{threshold:0.6});
slides.forEach(s=>io.observe(s));

/* ---------- RSVP ---------- */
rsvpForm.onsubmit = async e=>{
  e.preventDefault();
  const name=nameInput.value.trim(), msg=messageInput.value.trim();
  if(!name||!msg) return formStatus.textContent="모든 항목 입력!";
  formStatus.textContent="Sending…";
  await fetch("https://script.google.com/macros/s/AKfycbxNIJJJid0yuIa7y8ymnf8tl-_BnhAsUabJ-S9YLvjiv9G0FziQHfgxMadUL8oVFN6r4g/exec",
    {method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"},body:`name=${encodeURIComponent(name)}&message=${encodeURIComponent(msg)}`});
  formStatus.textContent="✓";
};
