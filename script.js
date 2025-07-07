const correctPassword = "ggh2025";

// 언어 변경
function updateLockScreenLang() {
  const lang = document.getElementById("languageSelect").value;
  const pwInput = document.getElementById("pwInput");
  const unlockBtn = document.getElementById("unlockBtn");

  if (lang === "ko") {
    pwInput.placeholder = "초대 코드를 입력하세요";
    unlockBtn.innerText = "청첩장 열기";
  } else if (lang === "ja") {
    pwInput.placeholder = "招待コードを入力してください";
    unlockBtn.innerText = "招待状を開く";
  } else if (lang === "en") {
    pwInput.placeholder = "Enter invitation code";
    unlockBtn.innerText = "Open Invitation";
  }
}

// 잠금 해제
function unlock() {
  const input = document.getElementById("pwInput").value;
  const lang = document.getElementById("languageSelect").value;

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
    alert(
      lang === "ja" ? "招待コードが間違っています。" :
      lang === "en" ? "Invitation code is incorrect." :
      "초대 코드가 틀렸습니다."
    );
  }
}

// Enter 키로 unlock
document.getElementById("pwInput").addEventListener("keydown", (e) => {
  if (e.key === "Enter") unlock();
});

updateLockScreenLang();
