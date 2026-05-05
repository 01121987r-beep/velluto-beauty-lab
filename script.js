const header = document.querySelector("[data-header]");
const menuToggle = document.querySelector("[data-menu-toggle]");
const mobileMenu = document.querySelector("[data-mobile-menu]");
const revealElements = document.querySelectorAll("[data-reveal]");
const heroSlider = document.querySelector("[data-hero-slider]");
const modalTriggers = document.querySelectorAll("[data-modal-open]");
const modalClosers = document.querySelectorAll("[data-modal-close]");
const modals = document.querySelectorAll("[data-modal]");
const pricingTabs = document.querySelectorAll("[data-pricing-tab]");
const contactForms = document.querySelectorAll("[data-contact-form]");
const setModalState = (modal, isOpen) => {
  if (!modal) return;
  modal.classList.toggle("is-open", isOpen);
  modal.setAttribute("aria-hidden", String(!isOpen));

  const hasOpenModal = Array.from(document.querySelectorAll("[data-modal]")).some((item) =>
    item.classList.contains("is-open")
  );

  document.body.classList.toggle("menu-open", hasOpenModal || document.body.classList.contains("menu-open"));
  if (!hasOpenModal && mobileMenu?.getAttribute("aria-hidden") === "true") {
    document.body.classList.remove("menu-open");
  }
};

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
    setModalState(modal, true);
  };

  const closeModal = (modal) => {
    setModalState(modal, false);
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
  const pricingCopy = document.querySelector("[data-pricing-copy]");
  const pricingSubTabs = document.querySelectorAll("[data-pricing-subtab]");

  const activatePricingSubTab = (tab) => {
    const targetId = tab.dataset.pricingSubtab;
    const parentPanel = tab.closest("[role='tabpanel']");
    const nextCopy = tab.dataset.pricingCopy;

    if (!parentPanel) return;

    const siblingTabs = parentPanel.querySelectorAll("[data-pricing-subtab]");
    const siblingPanels = parentPanel.querySelectorAll("[data-pricing-substage] [role='tabpanel']");

    siblingTabs.forEach((item) => {
      const isActive = item === tab;
      item.classList.toggle("is-active", isActive);
      item.setAttribute("aria-selected", String(isActive));
    });

    siblingPanels.forEach((panel) => {
      const isActive = panel.id === targetId;
      panel.classList.toggle("is-active", isActive);
      panel.hidden = !isActive;
    });

    if (pricingCopy && nextCopy) {
      pricingCopy.textContent = nextCopy;
    }
  };

  pricingTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const targetId = tab.dataset.pricingTab;
      const nextCopy = tab.dataset.pricingCopy;
      let activePanel = null;

      pricingTabs.forEach((item) => {
        const isActive = item === tab;
        item.classList.toggle("is-active", isActive);
        item.setAttribute("aria-selected", String(isActive));
      });

      pricingPanels.forEach((panel) => {
        const isActive = panel.id === targetId;
        panel.classList.toggle("is-active", isActive);
        panel.hidden = !isActive;
        if (isActive) {
          activePanel = panel;
        }
      });

      const firstSubTab = activePanel?.querySelector("[data-pricing-subtab]");

      if (firstSubTab) {
        activatePricingSubTab(firstSubTab);
      } else if (pricingCopy && nextCopy) {
        pricingCopy.textContent = nextCopy;
      }
    });
  });

  pricingSubTabs.forEach((tab) => {
    tab.addEventListener("click", () => activatePricingSubTab(tab));
  });
}

if (contactForms.length) {
  contactForms.forEach((form) => {
    const submitButton = form.querySelector("button[type='submit']");
    const status = form.querySelector("[data-form-status]");
    const emailField = form.querySelector("input[name='email']");
    const nameField = form.querySelector("input[name='nome']");
    const messageField = form.querySelector("textarea[name='messaggio']");
    const termsField = form.querySelector("input[name='termini']");

    form.addEventListener("submit", async (event) => {
      event.preventDefault();

      if (!(submitButton instanceof HTMLButtonElement)) return;

      const formData = new FormData(form);
      submitButton.disabled = true;
      submitButton.textContent = "Invio in corso...";

      if (status) {
        status.textContent = "";
        status.classList.remove("is-error", "is-success");
      }

      const nome = nameField instanceof HTMLInputElement ? nameField.value.trim() : "";
      const email = emailField instanceof HTMLInputElement ? emailField.value.trim() : "";
      const messaggio = messageField instanceof HTMLTextAreaElement ? messageField.value.trim() : "";
      const termsAccepted = termsField instanceof HTMLInputElement ? termsField.checked : false;
      const emailIsValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

      if (!nome || !email || !messaggio || !emailIsValid || !termsAccepted) {
        if (status) {
          status.textContent = !emailIsValid && email
            ? "Inserisci un indirizzo email valido."
            : !termsAccepted
              ? "Devi accettare il trattamento dei dati per inviare la richiesta."
              : "Compila nome, email e messaggio prima di inviare.";
          status.classList.add("is-error");
        }

        submitButton.disabled = false;
        submitButton.textContent = "Invia richiesta";
        return;
      }

      if (window.location.protocol === "file:") {
        if (status) {
          status.textContent =
            "Il form non puo funzionare in anteprima locale. Va testato su un hosting o server con supporto PHP.";
          status.classList.add("is-error");
        }

        submitButton.disabled = false;
        submitButton.textContent = "Invia richiesta";
        return;
      }

      let endpoint = "";

      try {
        endpoint = new URL(form.getAttribute("action") || "./send-contact.php", window.location.href).toString();
      } catch (error) {
        if (status) {
          status.textContent =
            "Configurazione del form non valida. Controlla il percorso del file PHP sul server.";
          status.classList.add("is-error");
        }

        submitButton.disabled = false;
        submitButton.textContent = "Invia richiesta";
        return;
      }

      try {
        const response = await fetch(endpoint, {
          method: "POST",
          body: formData,
          headers: {
            Accept: "application/json"
          }
        });

        const result = await response.json();

        if (!response.ok || !result.success) {
          throw new Error(result.message || "Invio non riuscito.");
        }

        if (status) {
          status.textContent = result.message;
          status.classList.add("is-success");
        }

        form.reset();
        setTimeout(() => {
          const parentModal = form.closest("[data-modal]");
          const thankYouModal = document.getElementById("thank-you-modal");

          setModalState(parentModal, false);
          setModalState(thankYouModal, true);
        }, 180);
      } catch (error) {
        if (status) {
          status.textContent =
            error instanceof Error
              ? error.message
              : "Invio non riuscito. Riprova tra poco oppure contattaci via telefono o WhatsApp.";
          status.classList.add("is-error");
        }
      } finally {
        submitButton.disabled = false;
        submitButton.textContent = "Invia richiesta";
      }
    });
  });
}
