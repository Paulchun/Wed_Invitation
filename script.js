const unlock = () => {
  const pw = document.getElementById("pwInput").value.trim();
  if (pw === "0920") {
    document.getElementById("lockScreen").style.display = "none";
    const bgm = document.getElementById("bgm");
    bgm.currentTime = 0;
    bgm.muted = false;
    bgm.play();
  } else {
    alert("초대 코드를 다시 확인해 주세요.");
  }
};

const updateLanguage = (lang) => {
  document.querySelectorAll("[data-lang-ko]").forEach(el => {
    if (lang === "ko") el.innerHTML = el.dataset.langKo;
    else if (lang === "ja") el.innerHTML = el.dataset.langJa;
    else el.innerHTML = el.dataset.langEn;
  });

  // 지도 링크 업데이트
  const mapLink = document.getElementById("mapLink");
  if (lang === "ko") {
    mapLink.href = "https://naver.me/GNWkr4t4";
    mapLink.innerText = "네이버 지도 열기";
  } else {
    mapLink.href = "https://maps.app.goo.gl/zsKjMWQDjUWT4pEo9";
    mapLink.innerText = "Open in Google Maps";
  }
};

const updateLockScreenLang = () => {
  const lang = document.getElementById("languageSelect").value;
  updateLanguage(lang);
};

document.addEventListener("DOMContentLoaded", () => {
  const lang = document.getElementById("languageSelect").value;
  updateLanguage(lang);

  // RSVP 전송 핸들러
  const form = document.getElementById("rsvpForm");
  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const name = form.elements["name"].value.trim();
      const message = form.elements["message"].value.trim();

      if (!name) {
        alert("성함을 입력해 주세요.");
        return;
      }

      const formData = new FormData();
      formData.append("name", name);
      formData.append("message", message);

      try {
        await fetch("https://script.google.com/macros/s/AKfycbyiCbBK4ZFkT4KfgirhsUm7L7tosdLdYF9SSpr-RSD5T5JNyIi1oNr6RHx-w98fZbRgOA/exec", {
          method: "POST",
          body: formData,
        });
        alert("참석 정보가 전송되었습니다. 감사합니다!");
        form.reset();
      } catch (err) {
        console.error("RSVP 전송 실패", err);
        alert("제출에 실패했습니다. 다시 시도해 주세요.");
      }
    });
  }
});
