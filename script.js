document.addEventListener('DOMContentLoaded', function() {

    // 1. Animation des sections au scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1 
    });


    const sectionsToAnimate = document.querySelectorAll('.fade-in-section');
    sectionsToAnimate.forEach((section) => {
        observer.observe(section);
    });

    // 2. Header qui change de style au scroll
    const header = document.querySelector('header');
    window.addEventListener('scroll', function() {

      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });

    // 3. Bouton Retour en haut"
    const backToTopButton = document.getElementById('back-to-top');

    window.addEventListener('scroll', () => {
  
      if (window.scrollY > 300) {
        backToTopButton.classList.add('visible');
      } else {
        backToTopButton.classList.remove('visible');
      }
    });

  
    backToTopButton.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth' 
      });
    });

    // 4. Bulles réalistes
    window.addEventListener('mousemove', (e) => {
      if (shouldSkipBubble()) return;
      createBubble(e.clientX, e.clientY);
    });

    let lastBubbleTime = 0;
    function shouldSkipBubble() {
      const now = performance.now();
      if (now - lastBubbleTime < 24) return true; // ~40 fps max
      lastBubbleTime = now;
      return false;
    }

    function createBubble(x, y) {
      const bubble = document.createElement('span');
      bubble.className = 'bubble';

 
      const size = 8 + Math.random() * 14; // 8-22px
      bubble.style.width = size + 'px';
      bubble.style.height = size + 'px';

      const offsetX = (Math.random() - 0.5) * 40; // dérive horizontale
      bubble.style.setProperty('--offsetX', offsetX + 'px');


      const startOffsetX = (Math.random() - 0.5) * 12;
      const startOffsetY = (Math.random() - 0.5) * 12;
      bubble.style.left = x + startOffsetX + 'px';
      bubble.style.top = y + startOffsetY + 'px';

      const duration = 900 + Math.random() * 700; // 0.9s - 1.6s
      bubble.style.animationDuration = duration + 'ms';

      document.body.appendChild(bubble);

      bubble.addEventListener('animationend', () => {
        bubble.remove();
      });
    }

});
