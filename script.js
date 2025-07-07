const correctPassword = "ggh2025";

// 언어별 메시지 정의
const langStrings = {
  ko: {
    placeholder: "초대 코드를 입력하세요",
    button: "청첩장 열기",
    error: "초대 코드가 틀렸습니다.",
  },
  ja: {
    placeholder: "招待コードを入力してください",
    button: "招待状を開く",
    error: "招待コードが間違っています。",
  },
  en: {
    placeholder: "Enter invitation code",
    button: "Open Invitation",
    error: "Invitation code is incorrect.",
  }
};

// 언어에 따라 락스크린 텍스트 변경
function updateLockScreenLang() {
  const lang = document.getElementById("languageSelect").value;
  const strings = langStrings[lang];

  const pwInput = document.getElementById("pwInput");
  const unlockBtn = document.getElementById("unlockBtn");

  pwInput.placeholder = strings.placeholder;
  unlockBtn.innerText = strings.button;
}

// 잠금 해제
function unlock() {
  const input = document.getElementById("pwInput").value;
  const lang = document.getElementById("languageSelect").value;
  const strings = langStrings[lang];

  if (input === correctPassword) {
    document.getElementById("lockScreen").style.display = "none";
    document.getElementById("mainContent").style.display = "block";

    const bgm = document.getElementById("bgm");
    bgm.volume = 0.8;
    bgm.play().catch(err => console.log("BGM 재생 실패:", err));

    // 언어 텍스트 적용
    document.querySelectorAll("[data-lang-ko]").forEach(el => {
      const newText = el.getAttribute(`data-lang-${lang}`);
      if (newText) {
        el.innerHTML = newText;
      }
    });
  } else {
    alert(strings.error);
  }
}

// Enter 키로 잠금 해제 가능
document.getElementById("pwInput").addEventListener("keydown", (e) => {
  if (e.key === "Enter") unlock();
});

// 초기 실행
updateLockScreenLang();
