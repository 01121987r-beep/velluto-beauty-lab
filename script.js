const header = document.querySelector("[data-header]");
const menuToggle = document.querySelector("[data-menu-toggle]");
const mobileMenu = document.querySelector("[data-mobile-menu]");
const revealElements = document.querySelectorAll("[data-reveal]");
const heroSlider = document.querySelector("[data-hero-slider]");
const modalTriggers = document.querySelectorAll("[data-modal-open]");
const modalClosers = document.querySelectorAll("[data-modal-close]");
const modals = document.querySelectorAll("[data-modal]");
const pricingTabs = document.querySelectorAll("[data-pricing-tab]");

if (header) {
  const updateHeader = () => {
    const shouldSolid = window.scrollY > 24 || !header.classList.contains("is-overlay");
    header.classList.toggle("is-scrolled", shouldSolid);
  };

  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });
}

if (menuToggle && mobileMenu) {
  const toggleMenu = () => {
    const isOpen = document.body.classList.toggle("menu-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    mobileMenu.setAttribute("aria-hidden", String(!isOpen));
  };

  menuToggle.addEventListener("click", toggleMenu);

  mobileMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      document.body.classList.remove("menu-open");
      menuToggle.setAttribute("aria-expanded", "false");
      mobileMenu.setAttribute("aria-hidden", "true");
    });
  });
}

if (revealElements.length) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.18,
      rootMargin: "0px 0px -8% 0px"
    }
  );

  revealElements.forEach((element) => observer.observe(element));
}

if (heroSlider) {
  const slides = Array.from(heroSlider.querySelectorAll(".hero-slide"));
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let activeIndex = slides.findIndex((slide) => slide.classList.contains("is-active"));

  if (activeIndex < 0) {
    activeIndex = 0;
    slides[0]?.classList.add("is-active");
  }

  if (!reducedMotion && slides.length > 1) {
    window.setInterval(() => {
      const currentSlide = slides[activeIndex];
      const nextIndex = (activeIndex + 1) % slides.length;
      const nextSlide = slides[nextIndex];

      currentSlide.classList.add("is-leaving");
      currentSlide.classList.remove("is-active");
      nextSlide.classList.add("is-active");

      window.setTimeout(() => {
        currentSlide.classList.remove("is-leaving");
      }, 1000);

      activeIndex = nextIndex;
    }, 4200);
  }
}

if (modals.length) {
  const openModal = (modal) => {
    if (!modal) return;
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("menu-open");
  };

  const closeModal = (modal) => {
    if (!modal) return;
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("menu-open");
  };

  modalTriggers.forEach((trigger) => {
    trigger.addEventListener("click", () => {
      const modal = document.getElementById(trigger.dataset.modalOpen);
      openModal(modal);
    });
  });

  modalClosers.forEach((closer) => {
    closer.addEventListener("click", () => {
      closeModal(closer.closest("[data-modal]"));
    });
  });

  modals.forEach((modal) => {
    modal.addEventListener("click", (event) => {
      if (event.target === modal) {
        closeModal(modal);
      }
    });
  });

  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      modals.forEach((modal) => closeModal(modal));
    }
  });
}

if (pricingTabs.length) {
  const pricingPanels = document.querySelectorAll("[data-pricing-stage] [role='tabpanel']");

  pricingTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const targetId = tab.dataset.pricingTab;

      pricingTabs.forEach((item) => {
        const isActive = item === tab;
        item.classList.toggle("is-active", isActive);
        item.setAttribute("aria-selected", String(isActive));
      });

      pricingPanels.forEach((panel) => {
        const isActive = panel.id === targetId;
        panel.classList.toggle("is-active", isActive);
        panel.hidden = !isActive;
      });
    });
  });
}
