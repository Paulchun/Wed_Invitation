document.addEventListener('DOMContentLoaded', () => {
  const $langSel     = document.getElementById('languageSelect');
  const $allTransEls = document.querySelectorAll('[data-lang-ko]');
  const $pwInput     = document.getElementById('pwInput');
  const $unlockBtn   = document.getElementById('unlockBtn');
  const $lockScreen  = document.getElementById('lockScreen');
  const $mainContent = document.getElementById('mainContent');
  const $bgm         = document.getElementById('bgm');
  const $submitBtn   = document.getElementById('rsvpSubmit');
  const $form        = document.getElementById('rsvpForm');
  const $status      = document.getElementById('rsvpStatus');
  const $nameInput   = document.getElementById('rsvpName');
  const $msgInput    = document.getElementById('rsvpMessage');
  const $mapText     = document.getElementById('mapText');

  let currentLang = 'ko';

  function applyLang(lang) {
    currentLang = lang;

    $allTransEls.forEach(el => {
      const txt = el.getAttribute(`data-lang-${lang}`);
      if (txt) el.innerHTML = txt;
    });

    $nameInput.placeholder = {
      ko: '성함',
      ja: 'お名前',
      en: 'Your name'
    }[lang];

    $msgInput.placeholder = {
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
  applyLang(currentLang);

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

  const messages = {
    ko: {
      sending: '전송 중입니다...',
      success: '감사합니다! 잘 전달되었어요.',
      error: '오류가 발생했지만 메시지는 전달되었을 수 있어요.'
    },
    ja: {
      sending: '送信中です...',
      success: 'ありがとうございます！正常に送信されました。',
      error: 'エラーが発生しましたが、メッセージは届いた可能性があります。'
    },
    en: {
      sending: 'Sending...',
      success: 'Thank you! Your message has been sent.',
      error: 'An error occurred, but your message might still have been delivered.'
    }
  };

  $form.addEventListener('submit', e => {
    e.preventDefault();
    const name = $nameInput.value.trim();
    const message = $msgInput.value.trim();
    if (!name) return;

    $status.textContent = messages[currentLang].sending;

    fetch('https://script.google.com/macros/s/AKfycbxNIJJJid0yuIa7y8ymnf8tl-_BnhAsUabJ-S9YLvjiv9G0FziQHfgxMadUL8oVFN6r4g/exec', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ name, message })
    })
      .then(() => {
        $status.textContent = messages[currentLang].success;
        $form.reset();
      })
      .catch(() => {
        $status.textContent = messages[currentLang].success;
      });
  });

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('show');
    });
  }, { threshold: 0.2 });

  document.querySelectorAll('.slide').forEach(slide => observer.observe(slide));
});
