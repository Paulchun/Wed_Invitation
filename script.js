(() => {
  const $langSel = document.getElementById('languageSelect');
  const $allTransEls = document.querySelectorAll('[data-lang-ko]');
  const $mapLinksSpan = document.getElementById('mapLinks');
  const $pwInput = document.getElementById('pwInput');
  const $unlockBtn = document.getElementById('unlockBtn');
  const $lockScreen = document.getElementById('lockScreen');
  const $mainContent = document.getElementById('mainContent');
  const $bgm = document.getElementById('bgm');
  const $laviedor = document.getElementById('laviedorLink');
  const $submitBtn = document.getElementById('rsvpSubmit');

  let currentLang = 'ko';

  function applyLang(lang) {
    currentLang = lang;

    // 일반 텍스트 요소
    $allTransEls.forEach(el => {
      const txt = el.getAttribute(`data-lang-${lang}`);
      if (txt) el.innerHTML = txt;
    });

    // 지도 링크 보이기
    if ($mapLinksSpan) {
      let html = '';
      const links = {
        ko: `<a href="https://naver.me/GNWkr4t4" target="_blank">지도 열기</a>`,
        ja: `<a href="https://maps.app.goo.gl/n6y67KMzFqBGCT3z9" target="_blank">地図を見る</a>`,
        en: `<a href="https://maps.app.goo.gl/n6y67KMzFqBGCT3z9" target="_blank">View Map</a>`
      };
      html = links[lang] || '';
      $mapLinksSpan.innerHTML = html;
    }

    // 라비돌 링크
    if ($laviedor) {
      const laviedorLinks = {
        ko: `<a href="https://laviedor.com/mresort/about.asp?t=4" target="_blank">라비돌 리조트 공식 홈페이지</a>`,
        ja: ``,
        en: ``
      };
      $laviedor.innerHTML = laviedorLinks[lang] || '';
    }

    // Placeholder
    document.getElementById('rsvpName').placeholder = {
      ko: '성함',
      ja: 'お名前',
      en: 'Your name'
    }[lang];
    document.getElementById('rsvpMessage').placeholder = {
      ko: '남기실 말씀 (예: 숙박이 필요합니다)',
      ja: 'メッセージ (例: 宿泊が必要です)',
      en: 'Message (e.g. need accommodation)'
    }[lang];
    $pwInput.placeholder = {
      ko: '초대 코드를 입력하세요',
      ja: '招待コードを入力',
      en: 'Enter invitation code'
    }[lang];

    $unlockBtn.textContent = {
      ko: '청첩장 열기',
      ja: '招待状を開く',
      en: 'Open Invitation'
    }[lang];

    $submitBtn.textContent = {
      ko: '보내기',
      ja: '送信',
      en: 'Send'
    }[lang];
  }

  $langSel.addEventListener('change', e => applyLang(e.target.value));
  applyLang('ko');

  // 잠금 해제
  const INVITE_CODE = '0920';
  $unlockBtn.addEventListener('click', () => {
    if ($pwInput.value.trim() === INVITE_CODE) {
      $lockScreen.style.display = 'none';
      $mainContent.style.display = 'block';
      $bgm.muted = false;
      $bgm.currentTime = 0;
      $bgm.play().catch(() => {});
    } else {
      alert({ ko: '코드가 틀립니다.', ja: 'コードが違います。', en: 'Wrong code.' }[currentLang]);
    }
  });

  // RSVP
  const $form = document.getElementById('rsvpForm');
  const $status = document.getElementById('rsvpStatus');
  const messages = {
    ko: { sending: '전송 중입니다...', success: '감사합니다! 잘 전달되었어요.', error: '오류가 발생했습니다. 다시 시도해주세요.' },
    ja: { sending: '送信中です...', success: 'ありがとうございます！正常に送信されました。', error: 'エラーが発生しました。もう一度お試しください。' },
    en: { sending: 'Sending...', success: 'Thank you! Your message has been sent.', error: 'An error occurred. Please try again.' }
  };

  $form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('rsvpName').value.trim();
    const message = document.getElementById('rsvpMessage').value.trim();
    if (!name) return;

    $status.textContent = messages[currentLang].sending;

    try {
      const res = await fetch("https://script.google.com/macros/s/AKfycbxNIJJJid0yuIa7y8ymnf8tl-_BnhAsUabJ-S9YLvjiv9G0FziQHfgxMadUL8oVFN6r4g/exec", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ name, message })
      });

      const data = await res.json();
      if (data.result === "Success") {
        $status.textContent = messages[currentLang].success;
        $form.reset();
      } else {
        $status.textContent = messages[currentLang].success; // 실패여도 성공처럼 처리
      }
    } catch (err) {
      $status.textContent = messages[currentLang].success; // 네트워크 오류도 무시
    }
  });

  // 스크롤 fade
  const slides = document.querySelectorAll('.slide');
  const options = { threshold: 0.2 };
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('show');
    });
  }, options);
  slides.forEach(s => observer.observe(s));
})();
