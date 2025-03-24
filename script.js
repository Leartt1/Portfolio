// Custom Cursor with Trail
const cursor = document.querySelector(".cursor");
const trails = [];
const numTrails = 10;

// Create trail elements
for (let i = 0; i < numTrails; i++) {
  const trail = document.createElement("div");
  trail.className = "cursor-trail";
  document.body.appendChild(trail);
  trails.push({
    element: trail,
    x: 0,
    y: 0,
    alpha: 1 - i / numTrails,
  });
}

let mouseX = 0;
let mouseY = 0;
let cursorX = 0;
let cursorY = 0;

document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;

  // Update cursor position
  cursor.style.left = `${mouseX}px`;
  cursor.style.top = `${mouseY}px`;
});

// Animate cursor and trails
function animateCursor() {
  const ease = 0.15;

  // Update cursor position with easing
  cursorX += (mouseX - cursorX) * ease;
  cursorY += (mouseY - cursorY) * ease;

  // Update trail positions
  trails.forEach((trail, index) => {
    if (index === 0) {
      trail.x = cursorX;
      trail.y = cursorY;
    } else {
      trail.x += (trails[index - 1].x - trail.x) * ease;
      trail.y += (trails[index - 1].y - trail.y) * ease;
    }

    trail.element.style.left = `${trail.x}px`;
    trail.element.style.top = `${trail.y}px`;
    trail.element.style.opacity = trail.alpha;
  });

  requestAnimationFrame(animateCursor);
}

animateCursor();

// Smooth follower animation
function animateFollower() {
  // Smooth follower movement
  const ease = 0.15;

  cursorX += (mouseX - cursorX) * ease;
  cursorY += (mouseY - cursorY) * ease;

  cursor.style.left = `${cursorX}px`;
  cursor.style.top = `${cursorY}px`;

  requestAnimationFrame(animateFollower);
}

animateFollower();

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Navbar Background Change on Scroll
const navbar = document.querySelector(".navbar");
window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    navbar.style.background = "rgba(10, 10, 10, 0.95)";
    navbar.style.backdropFilter = "blur(10px)";
  } else {
    navbar.style.background = "transparent";
    navbar.style.backdropFilter = "none";
  }
});

// Intersection Observer for Animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

// Animate elements on scroll
document
  .querySelectorAll(".timeline-item, .project-card, .skill-category")
  .forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(20px)";
    el.style.transition = "all 0.5s ease-out";
    observer.observe(el);
  });

// Form Submission
const contactForm = document.querySelector(".contact-form");
if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    // Add your form submission logic here
    alert("Thank you for your message! I will get back to you soon.");
    contactForm.reset();
  });
}

// Theme Toggle
const themeToggle = document.querySelector(".theme-toggle");
const root = document.documentElement;

themeToggle.addEventListener("click", () => {
  const isDark = root.style.getPropertyValue("--background-dark") === "#0a0a0a";

  if (isDark) {
    root.style.setProperty("--background-dark", "#ffffff");
    root.style.setProperty("--text-dark", "#333333");
    root.style.setProperty("--card-bg", "#f5f5f5");
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
  } else {
    root.style.setProperty("--background-dark", "#0a0a0a");
    root.style.setProperty("--text-dark", "#ffffff");
    root.style.setProperty("--card-bg", "#1a1a1a");
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
  }
});

// Enhanced Timeline Animation
const timelineItems = document.querySelectorAll(".timeline-item");
const timelineObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  {
    threshold: 0.2,
  }
);

timelineItems.forEach((item) => {
  timelineObserver.observe(item);
});

// Hero Section Enhancements
const heroContent = document.querySelector(".hero-content");
const heroText = heroContent.querySelector("h2");

// Gradient text animation
function updateGradient() {
  const rect = heroContent.getBoundingClientRect();
  const mouseXPercentage = ((mouseX - rect.left) / rect.width) * 100;
  const mouseYPercentage = ((mouseY - rect.top) / rect.height) * 100;

  heroContent.style.background = `radial-gradient(circle at ${mouseXPercentage}% ${mouseYPercentage}%, rgba(0, 255, 136, 0.1) 0%, transparent 50%)`;
}

document.addEventListener("mousemove", updateGradient);

// Add hover effect to cursor
document
  .querySelectorAll(
    "a, button, .project-card, .skill-category, .expertise-card"
  )
  .forEach((el) => {
    el.addEventListener("mouseenter", () => {
      cursor.style.transform = "scale(1.5)";
      trails.forEach((trail) => {
        trail.element.style.transform = "scale(1.5)";
      });
    });

    el.addEventListener("mouseleave", () => {
      cursor.style.transform = "scale(1)";
      trails.forEach((trail) => {
        trail.element.style.transform = "scale(1)";
      });
    });
  });

// Typing Animation for Hero Section
if (heroText) {
  const text = heroText.textContent;
  heroText.textContent = "";
  let i = 0;

  function typeWriter() {
    if (i < text.length) {
      heroText.textContent += text.charAt(i);
      i++;
      setTimeout(typeWriter, 100);
    }
  }

  typeWriter();
}

// Parallax Effect for Hero Section
window.addEventListener("scroll", () => {
  const hero = document.querySelector(".hero");
  if (hero) {
    const scrolled = window.pageYOffset;
    hero.style.backgroundPositionY = scrolled * 0.5 + "px";
  }
});
