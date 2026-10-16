const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");
const navItems = document.querySelectorAll(".nav-links a");
const revealEls = document.querySelectorAll(".reveal");
const skillBars = document.querySelectorAll(".skill-level span");
const contactForm = document.getElementById("contactForm");
const formSuccess = document.getElementById("formSuccess");
const yearEl = document.getElementById("year");
const dotSpotlight = document.getElementById("dotSpotlight");
const dotCanvas = document.getElementById("dotGrid");
const tiltCards = document.querySelectorAll(".tilt-card");
const orbs = document.querySelectorAll(".orb");

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    navLinks.classList.toggle("open");
  });

  navItems.forEach((link) => {
    link.addEventListener("click", () => navLinks.classList.remove("open"));
  });
}

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      entry.target.classList.add("visible");

      if (entry.target.classList.contains("skill-card")) {
        const bar = entry.target.querySelector(".skill-level span");
        if (bar) bar.style.width = bar.dataset.level + "%";
      }
    });
  },
  { threshold: 0.18 }
);

revealEls.forEach((el) => observer.observe(el));
skillBars.forEach((bar) => {
  const card = bar.closest(".skill-card");
  if (card) observer.observe(card);
});

const sections = document.querySelectorAll("section[id]");
const onScroll = () => {
   const scrollY = window.scrollY + 120;

  sections.forEach((section) => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute("id");

    if (scrollY >= top && scrollY < top + height) {
      navItems.forEach((link) => {
        link.classList.toggle("active", link.getAttribute("href") === "#" + id);
      });
    }
  });

  if (!prefersReducedMotion && orbs.length) {
    const scrollFactor = window.scrollY * 0.04;
    orbs.forEach((orb, i) => {
      const dir = i % 2 === 0 ? 1 : -1;
      orb.style.transform = `translate3d(0, ${scrollFactor * dir}px, 0)`;
    });
  }
};

window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

if (contactForm && formSuccess) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    formSuccess.style.display = "block";
    contactForm.reset();
    setTimeout(() => {
      formSuccess.style.display = "none";
    }, 4000);
  });
}

/* ── Antigravity dotted background ── */
function initAntigravityDots() {
  if (!dotCanvas) return null;

  const ctx = dotCanvas.getContext("2d");
  if (!ctx) return null;

  const dpr = window.devicePixelRatio || 1;
  const spacing = 28;
  const dotMin = 1.1;
  const dotMax = 5.2;
  const radiusEffect = 260;
  const repulsion = 18;
  const baseAlpha = 0.07;
  const maxAlpha = 0.95;
  const smoothing = 0.14;
  const mouseSmooth = 0.12;
  const colors = ["56,189,248", "99,102,241", "34,211,238"];

  let dots = [];
  let mouseX = -9999;
  let mouseY = -9999;
  let smoothX = -9999;
  let smoothY = -9999;
  let rafId = null;
  let time = 0;

  const resize = () => {
    const w = window.innerWidth;
    const h = window.innerHeight;
    dotCanvas.width = Math.round(w * dpr);
    dotCanvas.height = Math.round(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const cols = Math.max(1, Math.floor(w / spacing));
    const rows = Math.max(1, Math.floor(h / spacing));
    const offX = (w - (cols - 1) * spacing) / 2;
    const offY = (h - (rows - 1) * spacing) / 2;

    dots = [];
    let i = 0;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        dots.push({
          ox: offX + c * spacing,
          oy: offY + r * spacing,
          x: offX + c * spacing,
          y: offY + r * spacing,
          size: dotMin,
          alpha: baseAlpha,
          color: colors[i % colors.length],
          phase: (r * 0.31 + c * 0.17) * Math.PI * 2,
        });
        i++;
      }
    }
  };

  const drawGlow = (x, y, size, rgb, alpha) => {
    const glow = ctx.createRadialGradient(x, y, 0, x, y, size * 4);
    glow.addColorStop(0, `rgba(${rgb},${alpha * 0.35})`);
    glow.addColorStop(1, `rgba(${rgb},0)`);
    ctx.fillStyle = glow;
    ctx.beginPath();
    ctx.arc(x, y, size * 4, 0, Math.PI * 2);
    ctx.fill();
  };

  const tick = () => {
    const w = window.innerWidth;
    const h = window.innerHeight;
    time += 0.016;

    smoothX += (mouseX - smoothX) * mouseSmooth;
    smoothY += (mouseY - smoothY) * mouseSmooth;

    document.body.style.setProperty("--dot-x", `${smoothX}px`);
    document.body.style.setProperty("--dot-y", `${smoothY}px`);

    if (dotSpotlight && smoothX > -1000) {
      dotSpotlight.style.left = `${smoothX}px`;
      dotSpotlight.style.top = `${smoothY}px`;
    }

    ctx.clearRect(0, 0, w, h);

    for (const d of dots) {
      const dx = d.ox - smoothX;
      const dy = d.oy - smoothY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const t = Math.max(0, 1 - dist / radiusEffect);
      const influence = t * t * (3 - 2 * t);

      const floatX = Math.sin(time * 0.8 + d.phase) * 1.2;
      const floatY = Math.cos(time * 0.6 + d.phase) * 1.2;

      let targetX = d.ox + floatX;
      let targetY = d.oy + floatY;

      if (dist > 0.001 && influence > 0) {
        const push = repulsion * influence;
        targetX += (dx / dist) * push;
        targetY += (dy / dist) * push;
      }

      d.x += (targetX - d.x) * smoothing;
      d.y += (targetY - d.y) * smoothing;

      const targetSize = dotMin + (dotMax - dotMin) * influence;
      const targetAlpha = baseAlpha + (maxAlpha - baseAlpha) * influence;
      d.size += (targetSize - d.size) * smoothing;
      d.alpha += (targetAlpha - d.alpha) * smoothing;

      if (d.alpha < 0.004) continue;

      if (influence > 0.25) {
        drawGlow(d.x, d.y, d.size, d.color, d.alpha * influence);
      }

      ctx.beginPath();
      ctx.arc(d.x, d.y, d.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${d.color},${d.alpha})`;
      ctx.fill();
    }

    rafId = requestAnimationFrame(tick);
  };

  const onMouseMove = (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    document.body.classList.add("dot-active");
  };

  const onMouseLeave = () => {
    mouseX = -9999;
    mouseY = -9999;
    document.body.classList.remove("dot-active");
  };

  resize();
  window.addEventListener("resize", resize);
  window.addEventListener("mousemove", onMouseMove, { passive: true });
  document.documentElement.addEventListener("mouseleave", onMouseLeave);
  rafId = requestAnimationFrame(tick);

  return () => {
    if (rafId) cancelAnimationFrame(rafId);
    window.removeEventListener("resize", resize);
    window.removeEventListener("mousemove", onMouseMove);
    document.documentElement.removeEventListener("mouseleave", onMouseLeave);
  };
}

if (!prefersReducedMotion) {
  initAntigravityDots();
} else {
  document.body.classList.add("dot-active");
  document.addEventListener("mousemove", (e) => {
    document.body.style.setProperty("--dot-x", `${e.clientX}px`);
    document.body.style.setProperty("--dot-y", `${e.clientY}px`);
  }, { passive: true });
}

/* ── 3D tilt cards ── */
if (!prefersReducedMotion) {
  tiltCards.forEach((card) => {
    const maxTilt = card.classList.contains("hero-card") ? 10 : 14;
    const lift = card.classList.contains("hero-card") ? 16 : 12;

    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -maxTilt;
      const rotateY = ((x - centerX) / centerX) * maxTilt;

      card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-${lift}px) scale3d(1.02, 1.02, 1.02)`;
      card.style.setProperty("--mouse-x", `${(x / rect.width) * 100}%`);
      card.style.setProperty("--mouse-y", `${(y / rect.height) * 100}%`);
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
      card.style.removeProperty("--mouse-x");
      card.style.removeProperty("--mouse-y");
    });
  });
}
