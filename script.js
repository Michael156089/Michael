document.addEventListener("DOMContentLoaded", () => {
  const welcomeScreen = document.querySelector(".welcome-screen");
  const mainContent = document.querySelector(".main-content");
  const backgroundAudio = document.getElementById("background-audio");

  if (welcomeScreen && mainContent && backgroundAudio) {
    const enterSite = () => {
      welcomeScreen.style.opacity = "0";
      setTimeout(() => {
        welcomeScreen.style.display = "none";
        mainContent.style.display = "block";
        setTimeout(() => {
          mainContent.style.opacity = "1";
        }, 50);
      }, 500);
      backgroundAudio.play();
    };

    welcomeScreen.addEventListener("click", enterSite);

    document.addEventListener("keydown", (event) => {
      if (event.code === "Space") {
        enterSite();
      }
    });
  }

  // 1. Reveal Animations on Scroll
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("revealed");
        revealObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Apply reveal to sections and cards
  document
    .querySelectorAll(
      ".project-card, .section-title, .hero-content, .contact-card",
    )
    .forEach((el) => {
      el.classList.add("reveal-on-scroll");
      revealObserver.observe(el);
    });

  // 2. Custom Tilt Effect for Project Cards
  const cards = document.querySelectorAll(".project-card[data-tilt]");

  cards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = (y - centerY) / 10;
      const rotateY = (centerX - x) / 10;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)`;
    });
  });

  // 4. Glitch Effect Logic (Optional Enhancement)
  const glitchTitle = document.querySelector(".glitch");
  if (glitchTitle) {
    setInterval(() => {
      glitchTitle.style.setProperty(
        "--glitch-offset",
        `${Math.random() * 10 - 5}px`,
      );
    }, 200);
  }
});

// Add CSS for reveal animations dynamically if not already in style.css
const style = document.createElement("style");
style.textContent = `
    .reveal-on-scroll {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
    }
    .reveal-on-scroll.revealed {
        opacity: 1;
        transform: translateY(0);
    }
    .project-card {
        transition: transform 0.1s ease-out, box-shadow 0.4s ease;
    }
`;
document.head.appendChild(style);
