/* global gsap (if you previously added fade/scroll libraries) */
(() => {
  const $langSel = document.getElementById('languageSelect');
  const $allTransEls = document.querySelectorAll('[data-lang-ko]');
  const $mapLinksSpan = document.getElementById('mapLinks');
  const $laviedorLink = document.getElementById('laviedorLink');
  const $pwInput = document.getElementById('pwInput');
  const $unlockBtn = document.getElementById('unlockBtn');
  const $lockScreen = document.getElementById('lockScreen');
  const $mainContent = document.getElementById('mainContent');
  const $bgm = document.getElementById('bgm');

  let currentLang = 'ko';

  function applyLang(lang) {
    currentLang = lang;

    // 일반 텍스트
    $allTransEls.forEach(el => {
      const txt = el.getAttribute(`data-lang-${lang}`);
      if (txt !== null) el.innerHTML = txt;
    });

    // 지도 링크 표시
    [...$mapLinksSpan.children].forEach(a => {
      a.style.display = a.getAttribute('data-lang') === lang ? 'inline' : 'none';
    });

    // 라비돌 링크 표시 여부
    if (lang === 'ko') {
      $laviedorLink.innerHTML = '<a href="https://laviedor.com/mresort/about.asp?t=4" target="_blank">라비돌 리조트 공식 홈페이지</a>';
    } else {
      $laviedorLink.innerHTML = '';
    }

    // input placeholders
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

    $unlockBtn.textContent = {
      ko: '청첩장 열기',
      ja: '招待状を開く',
      en: 'Open Invitation'
    }[lang];

    $pwInput.placeholder = {
      ko: '초대 코드를 입력하세요',
      ja: '招待コードを入力',
      en: 'Enter invitation code'
    }[lang];
  }

  $langSel.addEventListener('change', e => applyLang(e.target.value));
  applyLang('ko');

  // 🔓 잠금 해제
  const INVITE_CODE = '0920';
  $unlockBtn.addEventListener('click', () => {
    if ($pwInput.value.trim() === INVITE_CODE) {
      $lockScreen.style.display = 'none';
      $mainContent.style.display = 'block';
      $bgm.muted = false;
      $bgm.currentTime = 0;
      $bgm.play().catch(() => {});
    } else {
      alert({
        ko: '코드가 틀립니다.',
        ja: 'コードが違います。',
        en: 'Wrong code.'
      }[currentLang]);
    }
  });

  // ✉️ RSVP 처리
  const $form = document.getElementById('rsvpForm');
  const $status = document.getElementById('rsvpStatus');

  const messages = {
    ko: {
      sending: '전송 중입니다...',
      success: '감사합니다! 잘 전달되었어요.',
      error: '오류가 발생했습니다. 다시 시도해주세요.'
    },
    ja: {
      sending: '送信中です...',
      success: 'ありがとうございます！正常に送信されました。',
      error: 'エラーが発生しました。もう一度お試しください。'
    },
    en: {
      sending: 'Sending...',
      success: 'Thank you! Your message has been sent.',
      error: 'An error occurred. Please try again.'
    }
  };

  $form.addEventListener('submit', e => {
    e.preventDefault();
    const name = document.getElementById('rsvpName').value.trim();
    const message = document.getElementById('rsvpMessage').value.trim();
    if (!name) return;

    $status.textContent = messages[currentLang].sending;

    fetch('https://script.google.com/macros/s/AKfycbyiCbBK4ZFkT4KfgirhsUm7L7tosdLdYF9SSpr-RSD5T5JNyIi1oNr6RHx-w98fZbRgOA/exec', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ name, message })
    })
      .then(res => res.json())
      .then(data => {
        if (data.result === 'Success') {
          $status.textContent = messages[currentLang].success;
          $form.reset();
        } else {
          throw new Error('Invalid response');
        }
      })
      .catch(() => {
        $status.textContent = messages[currentLang].error;
      });
  });

  // 🎬 슬라이드 페이드 인
  const slides = document.querySelectorAll('.slide');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('show');
    });
  }, { threshold: 0.2 });

  slides.forEach(slide => observer.observe(slide));
})();
