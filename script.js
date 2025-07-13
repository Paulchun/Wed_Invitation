let currentLang = 'ko';

const translations = {
  ko: {
    codePlaceholder: '초대 코드를 입력하세요',
    unlockButton: '청첩장 열기',
    rsvpTitle: '참석 의사를 알려주세요',
    namePlaceholder: '성함',
    messagePlaceholder: '전하고 싶은 말',
    submitButton: '보내기',
    successMessage: '전송되었습니다!',
    errorMessage: '전송 중 오류가 발생했습니다.',
    calendarTitle: '📅 결혼식은 이 날이에요',
    directionsTitle: '오시는 길'
  },
  ja: {
    codePlaceholder: '招待コードを入力してください',
    unlockButton: '招待状を開く',
    rsvpTitle: '出席のご意向をお知らせください',
    namePlaceholder: 'お名前',
    messagePlaceholder: 'メッセージ',
    submitButton: '送信',
    successMessage: '送信されました！',
    errorMessage: '送信中にエラーが発生しました。',
    calendarTitle: '📅 結婚式の日',
    directionsTitle: 'アクセス'
  },
  en: {
    codePlaceholder: 'Enter invitation code',
    unlockButton: 'Open Invitation',
    rsvpTitle: 'Let us know if you will attend',
    namePlaceholder: 'Your Name',
    messagePlaceholder: 'Message',
    submitButton: 'Submit',
    successMessage: 'Submitted successfully!',
    errorMessage: 'An error occurred while submitting.',
    calendarTitle: '📅 The Wedding Day',
    directionsTitle: 'How to Get There'
  }
};

function updateLockScreenLang() {
  currentLang = document.getElementById('languageSelect').value;
  const t = translations[currentLang];
  document.getElementById('pwInput').placeholder = t.codePlaceholder;
  document.getElementById('unlockBtn').innerText = t.unlockButton;
}

function unlock() {
  const pw = document.getElementById('pwInput').value;
  if (pw === '0920') {
    document.getElementById('lockScreen').style.display = 'none';
    document.getElementById('bgm').currentTime = 0;
    document.getElementById('bgm').play();
  } else {
    alert('초대 코드가 올바르지 않습니다.');
  }
}

function updateLanguage() {
  document.querySelectorAll('[data-lang-ko]').forEach(el => {
    el.innerHTML = el.getAttribute(`data-lang-${currentLang}`) || el.innerHTML;
  });

  const t = translations[currentLang];
  document.querySelector('.rsvp h2').innerText = t.rsvpTitle;
  document.getElementById('nameInput').placeholder = t.namePlaceholder;
  document.getElementById('messageInput').placeholder = t.messagePlaceholder;
  document.getElementById('submitBtn').innerText = t.submitButton;
  document.getElementById('calendarTitle').innerText = t.calendarTitle;
  document.getElementById('directionsTitle').innerText = t.directionsTitle;

  const mapLink = document.getElementById('mapLink');
  if (currentLang === 'ko') {
    mapLink.href = "https://naver.me/GNWkr4t4";
    mapLink.innerText = "네이버 지도 열기";
  } else {
    mapLink.href = "https://maps.app.goo.gl/zsKjMWQDjUWT4pEo9";
    mapLink.innerText = "Open in Google Maps";
  }
}

document.getElementById('languageSelect').addEventListener('change', () => {
  updateLockScreenLang();
  updateLanguage();
});

document.addEventListener('DOMContentLoaded', () => {
  updateLockScreenLang();
  updateLanguage();
  applyFadeOnScroll();
});

document.getElementById('rsvpForm')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const name = document.getElementById('nameInput').value;
  const message = document.getElementById('messageInput').value;
  const status = document.getElementById('formStatus');
  const t = translations[currentLang];

  try {
    const res = await fetch('https://script.google.com/macros/s/AKfycbxNIJJJid0yuIa7y8ymnf8tl-_BnhAsUabJ-S9YLvjiv9G0FziQHfgxMadUL8oVFN6r4g/exec', {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `name=${encodeURIComponent(name)}&message=${encodeURIComponent(message)}`
    });
    status.innerText = t.successMessage;
    // Stay on current screen
  } catch (error) {
    status.innerText = t.errorMessage;
  }
});

// Apply fade animation
function applyFadeOnScroll() {
  const slides = document.querySelectorAll('.slide');
  const options = {
    threshold: 0.3
  };
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade');
      }
    });
  }, options);
  slides.forEach(slide => observer.observe(slide));
}
