/* ───────── Core Variables ───────── */
const invitationCode = "0920";
const bgm           = document.getElementById("bgm");
const lockScreen    = document.getElementById("lockScreen");
const mainContent   = document.getElementById("mainContent");
const languageSel   = document.getElementById("languageSelect");

/* ───────── Init ───────── */
document.addEventListener("DOMContentLoaded", () => {
  /* Lock-screen actions */
  document.getElementById("unlockBtn").onclick = unlock;
  languageSel.onchange = () => updateLanguage(languageSel.value);
  updateLanguage(languageSel.value);

  /* Fade-in slides on view */
  const observer = new IntersectionObserver(
    entries => entries.forEach(e => e.target.classList.toggle("show", e.isIntersecting)),
    { threshold: 0.4 }
  );
  document.querySelectorAll(".slide").forEach(slide => observer.observe(slide));

  /* RSVP */
  document.getElementById("rsvpForm").addEventListener("submit", submitRSVP);

  /* Prevent horizontal scroll */
  document.documentElement.style.overflowX = "hidden";
});

/* ───────── Unlock ───────── */
function unlock() {
  const code = document.getElementById("pwInput").value.trim();
  if (code === invitationCode) {
    lockScreen.style.display = "none";
    mainContent.style.display = "block";
    bgm.currentTime = 0;
    bgm.muted = false;
    bgm.play();
  } else {
    alert("초대 코드가 잘못되었습니다.");
  }
}

/* ───────── Language / Map / RSVP placeholders ───────── */
function updateLanguage(lang) {
  document.querySelectorAll("[data-lang-ko]").forEach(el => {
    const txt = el.getAttribute(`data-lang-${lang}`) || el.getAttribute("data-lang-ko");
    el.innerHTML = txt;
  });

  /* Map link */
  const mapLink = document.getElementById("mapLink");
  if (mapLink) {
    if (lang === "ko") {
      mapLink.href = "https://naver.me/GNWkr4t4";
      mapLink.textContent = "네이버 지도 열기";
    } else {
      mapLink.href = "https://maps.app.goo.gl/zsKjMWQDjUWT4pEo9";
      mapLink.textContent = "Open in Google Maps";
    }
  }

  /* RSVP placeholders */
  const nameI  = document.getElementById("rsvpName");
  const msgI   = document.getElementById("rsvpMessage");
  const btn    = document.getElementById("rsvpSubmit");
  if (!nameI) return;

  if (lang === "ko") {
    nameI.placeholder = "성함";
    msgI.placeholder  = "남기실 말씀 (예: 숙박이 필요합니다)";
    btn.textContent   = "보내기";
  } else if (lang === "ja") {
    nameI.placeholder = "お名前";
    msgI.placeholder  = "備考 (例：宿泊が必要です)";
    btn.textContent   = "送信";
  } else {
    nameI.placeholder = "Name";
    msgI.placeholder  = "Special notes (e.g. need accommodation)";
    btn.textContent   = "Submit";
  }
}

/* ───────── RSVP Submit ───────── */
async function submitRSVP(e) {
  e.preventDefault();                               // 페이지 리셋 방지
  const name   = document.getElementById("rsvpName").value.trim();
  const msg    = document.getElementById("rsvpMessage").value.trim();
  const status = document.getElementById("rsvpStatus");

  if (!name || !msg) {
    status.textContent = "모든 항목을 입력해주세요.";
    return;
  }

  status.textContent = "전송 중…";

  try {
    const res = await fetch(
      "https://script.google.com/macros/s/AKfycbyiCbBK4ZFkT4KfgirhsUm7L7tosdLdYF9SSpr-RSD5T5JNyIi1oNr6RHx-w98fZbRgOA/exec",
      {
        method : "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body   : new URLSearchParams({ name, message: msg })
      }
    );

    const text = await res.text();
    if (res.ok && text === "Success") {
      status.textContent = "정상적으로 접수되었습니다. 감사합니다!";
      document.getElementById("rsvpForm").reset();
    } else throw new Error();
  } catch {
    status.textContent = "전송 중 오류가 발생했습니다. 다시 시도해주세요.";
  }
}
