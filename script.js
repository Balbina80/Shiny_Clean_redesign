const burgerBtn = document.getElementById("burgerBtn");
const mobileMenu = document.getElementById("mobileMenu");
const siteHeader = document.getElementById("siteHeader");
const revealItems = document.querySelectorAll(".reveal");

/* =========================
   MOBILE MENU
========================= */
if (burgerBtn && mobileMenu) {
  const closeMenu = () => {
    mobileMenu.classList.remove("open");
    burgerBtn.classList.remove("active");
    burgerBtn.setAttribute("aria-expanded", "false");
    document.body.classList.remove("menu-open");
  };

  const openMenu = () => {
    mobileMenu.classList.add("open");
    burgerBtn.classList.add("active");
    burgerBtn.setAttribute("aria-expanded", "true");
    document.body.classList.add("menu-open");
  };

  burgerBtn.addEventListener("click", () => {
    const isOpen = mobileMenu.classList.contains("open");

    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  mobileMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      closeMenu();
    });
  });

  document.addEventListener("click", (event) => {
    const clickedInsideMenu = mobileMenu.contains(event.target);
    const clickedBurger = burgerBtn.contains(event.target);

    if (!clickedInsideMenu && !clickedBurger && mobileMenu.classList.contains("open")) {
      closeMenu();
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 860) {
      closeMenu();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && mobileMenu.classList.contains("open")) {
      closeMenu();
    }
  });
}

/* =========================
   STICKY HEADER
========================= */
const handleHeaderScroll = () => {
  if (!siteHeader) return;

  if (window.scrollY > 14) {
    siteHeader.classList.add("scrolled");
  } else {
    siteHeader.classList.remove("scrolled");
  }
};

handleHeaderScroll();
window.addEventListener("scroll", handleHeaderScroll);

/* =========================
   REVEAL ANIMATION
========================= */
if ("IntersectionObserver" in window && revealItems.length > 0) {
  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          obs.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.14,
      rootMargin: "0px 0px -40px 0px"
    }
  );

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("in-view"));
}

/* =========================
   SMOOTH CLOSE ON HASH CHANGE
========================= */
window.addEventListener("hashchange", () => {
  if (mobileMenu && burgerBtn) {
    mobileMenu.classList.remove("open");
    burgerBtn.classList.remove("active");
    burgerBtn.setAttribute("aria-expanded", "false");
    document.body.classList.remove("menu-open");
  }
});

/* =========================
   SMOOTH SCROLL (premium feel)
========================= */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    const target = document.querySelector(this.getAttribute("href"));
    if (!target) return;

    e.preventDefault();

    target.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  });
});


/* =========================
   CTA BOOST (subtle animation)
========================= */
const ctaButtons = document.querySelectorAll(".btn-primary");

ctaButtons.forEach(btn => {
  btn.addEventListener("mouseenter", () => {
    btn.style.transform = "translateY(-3px) scale(1.02)";
  });

  btn.addEventListener("mouseleave", () => {
    btn.style.transform = "";
  });
});


/* =========================
   SIMPLE FORM FEEDBACK
========================= */
const form = document.querySelector("form");

if (form) {
  form.addEventListener("submit", () => {
    const button = form.querySelector("button");

    if (button) {
      button.innerText = "Sending...";
      button.disabled = true;
    }
  });
}


/* =========================
   AUTO CLOSE MENU AFTER CLICK (extra safety)
========================= */
document.querySelectorAll(".mobile-menu a").forEach(link => {
  link.addEventListener("click", () => {
    document.body.classList.remove("menu-open");
  });
});