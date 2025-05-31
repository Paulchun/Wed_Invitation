// script.js
// 향후 인터랙션 추가를 위한 기본 스크립트

// 사진 페이드 인 효과
const photos = document.querySelectorAll('.photos img');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = 1;
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, {
  threshold: 0.1
});

photos.forEach(photo => {
  photo.style.opacity = 0;
  photo.style.transform = 'translateY(20px)';
  photo.style.transition = 'all 0.8s ease';
  observer.observe(photo);
});
