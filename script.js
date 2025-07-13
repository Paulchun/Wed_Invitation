const invitationCode = "0920";

document.addEventListener("DOMContentLoaded", () => {
  const bgm = document.getElementById("bgm");
  const languageSelect = document.getElementById("languageSelect");
  const pwInput = document.getElementById("pwInput");
  const unlockBtn = document.getElementById("unlockBtn");

  unlockBtn.addEventListener("click", unlock);
  languageSelect.addEventListener("change", updateLockScreenLang);

  updateLanguage(languageSelect.value);
});

function unlock() {
  const inputCode = document.getElementById("pwInput").value;
  if (inputCode === invitationCode) {
    document.getElementById("lockScreen").style.display = "none";
    document.getElementById("mainContent").style.display = "block";

    const bgm = document.getElementById("bgm");
    bgm.currentTime = 0;
    bgm.muted = false;
    bgm.play();
  } else {
    alert("초대 코드가 잘못되었습니다.");
  }
}

function updateLockScreenLang() {
  const lang = document.getElementById("languageSelect").value;
  const pwInput = document.getElementById("pwInput");
  const unlockBtn = document.getElementById("unlockBtn");

  switch (lang) {
    case "ko":
      pwInput.placeholder = "초대 코드를 입력하세요";
      unlockBtn.textContent = "청첩장 열기";
      break;
    case "ja":
      pwInput.placeholder = "招待コードを入力してください";
      unlockBtn.textContent = "招待状を開く";
      break;
    case "en":
      pwInput.placeholder = "Enter invitation code";
      unlockBtn.textContent = "Open Invitation";
      break;
  }

  updateLanguage(lang);
}

function updateLanguage(lang) {
  document.querySelectorAll("[data-lang-ko]").forEach(el => {
    const text = el.getAttribute(`data-lang-${lang}`);
    if (text) el.innerHTML = text;
    else el.innerHTML = el.getAttribute("data-lang-ko");
  });

  // 지도 링크 전환
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

  // RSVP 폼 번역
  const nameInput = document.getElementById("rsvpName");
  const messageInput = document.getElementById("rsvpMessage");
  const rsvpButton = document.getElementById("rsvpSubmit");
  const statusDiv = document.getElementById("rsvpStatus");

  if (nameInput && messageInput && rsvpButton) {
    switch (lang) {
      case "ko":
        nameInput.placeholder = "성함";
        messageInput.placeholder = "특이 사항 (예: 숙박이 필요합니다)";
        rsvpButton.textContent = "보내기";
        break;
      case "ja":
        nameInput.placeholder = "お名前";
        messageInput.placeholder = "備考 (例：宿泊が必要です)";
        rsvpButton.textContent = "送信";
        break;
      case "en":
        nameInput.placeholder = "Name";
        messageInput.placeholder = "Special notes (e.g. need accommodation)";
        rsvpButton.textContent = "Submit";
        break;
    }
    statusDiv.textContent = "";
  }
}

// RSVP
async function submitRSVP() {
  const name = document.getElementById("rsvpName").value;
  const message = document.getElementById("rsvpMessage").value;
  const status = document.getElementById("rsvpStatus");

  if (!name || !message) {
    status.textContent = "모든 항목을 입력해주세요.";
    return;
  }

  try {
    const response = await fetch(
      "https://script.google.com/macros/s/AKfycbxNIJJJid0yuIa7y8ymnf8tl-_BnhAsUabJ-S9YLvjiv9G0FziQHfgxMadUL8oVFN6r4g/exec",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ name, message }),
      }
    );

    const resultText = await response.text();

    if (response.ok && resultText === "Success") {
      status.textContent = "정상적으로 접수되었습니다. 감사합니다!";
      document.getElementById("rsvpForm").reset();
    } else {
      throw new Error("전송 실패");
    }
  } catch (error) {
    status.textContent = "전송 중 오류가 발생했습니다. 다시 시도해주세요.";
  }
}
