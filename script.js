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
const locale = document.documentElement.lang.toLowerCase().startsWith("ru")
  ? "ru"
  : document.documentElement.lang.toLowerCase().startsWith("en")
    ? "en"
    : "it";

const localizedUi = {
  it: {
    legalLinks: {
      privacy: "Privacy",
      cookie: "Cookie",
      terms: "Termini"
    },
    cookieBanner: {
      kicker: "Privacy e cookie",
      body:
        "Utilizziamo cookie tecnici necessari e, solo con consenso, servizi esterni utili alla navigazione. I dati dei form vengono usati esclusivamente per ricontattarti.",
      accept: "Accetta",
      reject: "Rifiuta",
      preferences: "Preferenze"
    },
    cookieInline: {
      text: "Per visualizzare Google Maps, accetta i cookie di terze parti.",
      button: "Accetta e visualizza"
    },
    closeLegalLabel: "Chiudi informativa",
    form: {
      sending: "Invio in corso...",
      invalidEmail: "Inserisci un indirizzo email valido.",
      terms: "Devi accettare il trattamento dei dati per inviare la richiesta.",
      required: "Compila nome, email e messaggio prima di inviare.",
      localPreview:
        "Il form non puo funzionare in anteprima locale. Va testato su un hosting o server con supporto PHP.",
      configError: "Configurazione del form non valida. Controlla il percorso del file PHP sul server.",
      genericError: "Invio non riuscito. Riprova tra poco oppure contattaci via telefono o WhatsApp.",
      submit: "Invia richiesta"
    }
  },
  en: {
    legalLinks: {
      privacy: "Privacy",
      cookie: "Cookies",
      terms: "Terms"
    },
    cookieBanner: {
      kicker: "Privacy and cookies",
      body:
        "We use essential technical cookies and, only with your consent, external services that improve navigation. Form data is used exclusively to contact you back.",
      accept: "Accept",
      reject: "Reject",
      preferences: "Preferences"
    },
    cookieInline: {
      text: "To view Google Maps, please accept third-party cookies.",
      button: "Accept and view"
    },
    closeLegalLabel: "Close policy",
    form: {
      sending: "Sending...",
      invalidEmail: "Please enter a valid email address.",
      terms: "You must accept data processing before sending your request.",
      required: "Please complete name, email and message before sending.",
      localPreview:
        "The form cannot work in a local preview. Please test it on hosting or on a server with PHP support.",
      configError: "Invalid form configuration. Check the PHP file path on the server.",
      genericError: "Request failed. Please try again shortly or contact us by phone or WhatsApp.",
      submit: "Send request"
    }
  },
  ru: {
    legalLinks: {
      privacy: "Конфиденциальность",
      cookie: "Cookie",
      terms: "Условия"
    },
    cookieBanner: {
      kicker: "Конфиденциальность и cookie",
      body:
        "Мы используем необходимые технические cookie и, только с вашего согласия, внешние сервисы для удобной навигации. Данные из форм используются исключительно для обратной связи с вами.",
      accept: "Принять",
      reject: "Отклонить",
      preferences: "Настройки"
    },
    cookieInline: {
      text: "Чтобы увидеть Google Maps, примите сторонние cookie.",
      button: "Принять и открыть"
    },
    closeLegalLabel: "Закрыть информацию",
    form: {
      sending: "Отправка...",
      invalidEmail: "Введите корректный адрес электронной почты.",
      terms: "Чтобы отправить запрос, необходимо согласиться на обработку данных.",
      required: "Пожалуйста, заполните имя, email и сообщение перед отправкой.",
      localPreview:
        "Форма не работает в локальном предпросмотре. Проверьте ее на хостинге или сервере с поддержкой PHP.",
      configError: "Некорректная конфигурация формы. Проверьте путь к PHP-файлу на сервере.",
      genericError: "Не удалось отправить запрос. Попробуйте позже или свяжитесь с нами по телефону либо через WhatsApp.",
      submit: "Отправить запрос"
    }
  }
};

const uiText = localizedUi[locale];

const protectImages = () => {
  document.querySelectorAll("img").forEach((image) => {
    image.setAttribute("draggable", "false");
  });
};

protectImages();

document.addEventListener("contextmenu", (event) => {
  if (event.target instanceof HTMLImageElement) {
    event.preventDefault();
  }
});

document.addEventListener("dragstart", (event) => {
  if (event.target instanceof HTMLImageElement) {
    event.preventDefault();
  }
});

const legalContentLibrary = {
  it: {
    privacy: {
      kicker: "Informativa privacy",
      title: "Privacy policy",
      body: `
      <p><strong>Titolare del trattamento:</strong> VELLUTO BEAUTY LAB SRLS, P.IVA 16154221002, Via dell'Amba Aradam 27, 00184 Roma. Email: <a href="mailto:vellutobeautylab@gmail.com">vellutobeautylab@gmail.com</a>.</p>
      <p>I dati personali inviati tramite i form del sito, telefono, email o WhatsApp vengono utilizzati esclusivamente per ricontattare la persona interessata, fornire informazioni sui trattamenti richiesti, gestire appuntamenti e rispondere a richieste di consulenza.</p>
      <p><strong>Dati trattati:</strong> nome e cognome, email, telefono, trattamento di interesse, messaggio inviato, eventuale sezione del sito da cui proviene la richiesta.</p>
      <p><strong>Base giuridica:</strong> esecuzione di misure precontrattuali richieste dall'utente e legittimo interesse del titolare a rispondere alle richieste ricevute. Per eventuali comunicazioni promozionali sarà richiesto consenso separato.</p>
      <p><strong>Conservazione:</strong> i dati vengono conservati per il tempo necessario a gestire la richiesta e, se nasce un rapporto con il cliente, per i tempi previsti dagli obblighi amministrativi, fiscali e legali applicabili.</p>
      <p><strong>Destinatari:</strong> i dati possono essere trattati da personale autorizzato e da fornitori tecnici strettamente necessari al funzionamento del sito, della posta elettronica e degli strumenti di comunicazione. I dati non vengono venduti né ceduti a terzi per finalità di marketing.</p>
      <p><strong>Diritti dell'interessato:</strong> puoi chiedere accesso, rettifica, cancellazione, limitazione, opposizione al trattamento e portabilità dei dati, scrivendo a <a href="mailto:vellutobeautylab@gmail.com">vellutobeautylab@gmail.com</a>. Puoi inoltre proporre reclamo al Garante per la protezione dei dati personali.</p>
      `
    },
    cookie: {
      kicker: "Cookie policy",
      title: "Cookie e preferenze",
      body: `
      <p>Questo sito utilizza cookie tecnici necessari al corretto funzionamento dell'interfaccia, ad esempio per ricordare la scelta relativa al banner cookie.</p>
      <p>Non utilizziamo cookie di profilazione o marketing proprietari. Il sito può incorporare servizi di terze parti, come Google Maps, link a Instagram, Facebook e WhatsApp: tali servizi possono applicare proprie regole su cookie e tracciamenti quando vengono caricati o quando interagisci con essi.</p>
      <p>Puoi accettare tutti i cookie o rifiutare quelli non necessari. In qualsiasi momento puoi modificare la scelta dal link “Cookie” nel footer.</p>
      <div class="legal-choice">
        <button class="button button-soft" type="button" data-cookie-choice="accepted">Accetta cookie</button>
        <button class="button button-neutral" type="button" data-cookie-choice="rejected">Rifiuta non necessari</button>
      </div>
      `
    },
    terms: {
      kicker: "Termini",
      title: "Termini di utilizzo",
      body: `
      <p>Le informazioni presenti su questo sito hanno finalità informative e descrivono i servizi offerti da Velluto Beauty Lab. Non costituiscono diagnosi medica, prescrizione o sostituzione di consulenza professionale personalizzata.</p>
      <p>Prezzi, trattamenti, disponibilità e durata dei servizi possono variare o essere aggiornati. La prenotazione viene confermata solo tramite contatto diretto con il salone.</p>
      <p>L'utente si impegna a inviare dati corretti e pertinenti tramite i form. I dati inseriti vengono usati solo per ricontattare il cliente o potenziale cliente e gestire la richiesta inviata.</p>
      <p>Testi, immagini, layout e contenuti del sito sono destinati alla comunicazione del brand Velluto Beauty Lab e non possono essere copiati o riutilizzati senza autorizzazione.</p>
      `
    }
  },
  en: {
    privacy: {
      kicker: "Privacy notice",
      title: "Privacy policy",
      body: `
      <p><strong>Data controller:</strong> VELLUTO BEAUTY LAB SRLS, VAT no. 16154221002, Via dell'Amba Aradam 27, 00184 Rome. Email: <a href="mailto:vellutobeautylab@gmail.com">vellutobeautylab@gmail.com</a>.</p>
      <p>Personal data submitted through the website forms, phone, email or WhatsApp is used exclusively to contact the interested person back, provide information about requested treatments, manage appointments and answer consultation requests.</p>
      <p><strong>Data processed:</strong> first and last name, email, phone number, treatment of interest, submitted message and, where applicable, the section of the website from which the request was sent.</p>
      <p><strong>Legal basis:</strong> performance of pre-contractual measures requested by the user and the controller's legitimate interest in replying to incoming requests. Separate consent will be requested for any promotional communication.</p>
      <p><strong>Storage:</strong> data is stored for the time needed to handle the request and, if a client relationship begins, for the period required by applicable administrative, tax and legal obligations.</p>
      <p><strong>Recipients:</strong> data may be processed by authorized staff and by technical providers strictly necessary for the functioning of the website, email and communication tools. Data is never sold or transferred to third parties for marketing purposes.</p>
      <p><strong>Data subject rights:</strong> you may request access, rectification, erasure, restriction, objection to processing and data portability by writing to <a href="mailto:vellutobeautylab@gmail.com">vellutobeautylab@gmail.com</a>. You may also lodge a complaint with the competent data protection authority.</p>
      `
    },
    cookie: {
      kicker: "Cookie policy",
      title: "Cookies and preferences",
      body: `
      <p>This website uses technical cookies that are necessary for the interface to work correctly, for example to remember your choice regarding the cookie banner.</p>
      <p>We do not use our own profiling or marketing cookies. The website may embed third-party services such as Google Maps and links to Instagram, Facebook and WhatsApp: these services may apply their own cookie and tracking rules when loaded or when you interact with them.</p>
      <p>You can accept all cookies or reject non-essential ones. You can change your choice at any time from the “Cookies” link in the footer.</p>
      <div class="legal-choice">
        <button class="button button-soft" type="button" data-cookie-choice="accepted">Accept cookies</button>
        <button class="button button-neutral" type="button" data-cookie-choice="rejected">Reject non-essential</button>
      </div>
      `
    },
    terms: {
      kicker: "Terms",
      title: "Terms of use",
      body: `
      <p>The information on this website is for informational purposes and describes the services offered by Velluto Beauty Lab. It does not constitute medical advice, a prescription or a substitute for personalized professional consultation.</p>
      <p>Prices, treatments, availability and service duration may change or be updated. A booking is confirmed only through direct contact with the salon.</p>
      <p>The user undertakes to submit accurate and relevant data through the forms. The data entered is used only to contact the client or potential client back and manage the submitted request.</p>
      <p>Texts, images, layout and website content are intended for the communication of the Velluto Beauty Lab brand and may not be copied or reused without authorization.</p>
      `
    }
  },
  ru: {
    privacy: {
      kicker: "Политика конфиденциальности",
      title: "Обработка персональных данных",
      body: `
      <p><strong>Оператор данных:</strong> VELLUTO BEAUTY LAB SRLS, P.IVA 16154221002, Via dell'Amba Aradam 27, 00184 Rome. Email: <a href="mailto:vellutobeautylab@gmail.com">vellutobeautylab@gmail.com</a>.</p>
      <p>Персональные данные, отправленные через формы сайта, по телефону, email или WhatsApp, используются исключительно для обратной связи с заинтересованным лицом, предоставления информации о запрошенных процедурах, организации записей и ответа на запросы о консультации.</p>
      <p><strong>Обрабатываемые данные:</strong> имя и фамилия, email, номер телефона, интересующая процедура, текст сообщения и, при необходимости, раздел сайта, из которого была отправлена заявка.</p>
      <p><strong>Правовое основание:</strong> выполнение преддоговорных мер по запросу пользователя и законный интерес оператора в ответе на полученные обращения. Для рекламных сообщений при необходимости запрашивается отдельное согласие.</p>
      <p><strong>Срок хранения:</strong> данные хранятся в течение времени, необходимого для обработки запроса, а если возникает клиентское отношение — в течение срока, предусмотренного применимыми административными, налоговыми и правовыми обязанностями.</p>
      <p><strong>Получатели:</strong> данные могут обрабатываться уполномоченным персоналом и техническими поставщиками, строго необходимыми для работы сайта, электронной почты и средств связи. Данные не продаются и не передаются третьим лицам в маркетинговых целях.</p>
      <p><strong>Права субъекта данных:</strong> вы можете запросить доступ, исправление, удаление, ограничение обработки, возражение против обработки и переносимость данных, написав на <a href="mailto:vellutobeautylab@gmail.com">vellutobeautylab@gmail.com</a>. Вы также можете подать жалобу в компетентный орган по защите персональных данных.</p>
      `
    },
    cookie: {
      kicker: "Cookie policy",
      title: "Cookie и настройки",
      body: `
      <p>Этот сайт использует технические cookie, необходимые для корректной работы интерфейса, например чтобы запомнить ваш выбор в баннере cookie.</p>
      <p>Мы не используем собственные маркетинговые или профилирующие cookie. На сайте могут быть встроены сторонние сервисы, такие как Google Maps и ссылки на Instagram, Facebook и WhatsApp: эти сервисы могут применять собственные правила cookie и отслеживания при загрузке или взаимодействии с ними.</p>
      <p>Вы можете принять все cookie или отклонить необязательные. Вы в любой момент можете изменить выбор по ссылке “Cookie” в футере.</p>
      <div class="legal-choice">
        <button class="button button-soft" type="button" data-cookie-choice="accepted">Принять cookie</button>
        <button class="button button-neutral" type="button" data-cookie-choice="rejected">Отклонить необязательные</button>
      </div>
      `
    },
    terms: {
      kicker: "Условия",
      title: "Условия использования",
      body: `
      <p>Информация на этом сайте носит исключительно информационный характер и описывает услуги Velluto Beauty Lab. Она не является медицинской диагностикой, назначением или заменой персональной профессиональной консультации.</p>
      <p>Цены, процедуры, доступность и продолжительность услуг могут меняться или обновляться. Запись считается подтвержденной только после прямого контакта с салоном.</p>
      <p>Пользователь обязуется отправлять через формы точные и уместные данные. Введенные данные используются только для обратной связи с клиентом или потенциальным клиентом и обработки отправленного запроса.</p>
      <p>Тексты, изображения, структура и контент сайта предназначены для коммуникации бренда Velluto Beauty Lab и не могут копироваться или использоваться повторно без разрешения.</p>
      `
    }
  }
};

const legalContent = legalContentLibrary[locale];

const cookieStorageKey = "velluto_cookie_choice";

const loadExternalMaps = () => {
  document.querySelectorAll("[data-cookie-map]").forEach((map) => {
    const source = map.dataset.src;
    if (!source || map.getAttribute("src") === source) return;

    map.setAttribute("src", source);
    map.closest(".map-embed")?.classList.add("is-loaded");
  });
};

const unloadExternalMaps = () => {
  document.querySelectorAll("[data-cookie-map]").forEach((map) => {
    map.setAttribute("src", "about:blank");
    map.closest(".map-embed")?.classList.remove("is-loaded");
  });
};

const openLegalModal = (type = "privacy") => {
  const modal = document.querySelector("[data-legal-modal]");
  const content = legalContent[type] || legalContent.privacy;

  if (!modal) return;

  modal.querySelector("[data-legal-kicker]").textContent = content.kicker;
  modal.querySelector("[data-legal-title]").textContent = content.title;
  modal.querySelector("[data-legal-body]").innerHTML = content.body;
  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("legal-open");
};

const closeLegalModal = () => {
  const modal = document.querySelector("[data-legal-modal]");
  if (!modal) return;
  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("legal-open");
};

const setCookieChoice = (choice) => {
  localStorage.setItem(cookieStorageKey, choice);
  document.querySelector("[data-cookie-banner]")?.classList.remove("is-visible");

  if (choice === "accepted") {
    loadExternalMaps();
  } else {
    unloadExternalMaps();
  }
};

const initLegalUi = () => {
  const footerSocialBlocks = document.querySelectorAll(".footer-social");

  footerSocialBlocks.forEach((block) => {
    if (block.querySelector("[data-legal-open]")) return;

    const legalLinks = document.createElement("div");
    legalLinks.className = "footer-legal-links";
    legalLinks.innerHTML = `
      <button type="button" data-legal-open="privacy">${uiText.legalLinks.privacy}</button>
      <button type="button" data-legal-open="cookie">${uiText.legalLinks.cookie}</button>
      <button type="button" data-legal-open="terms">${uiText.legalLinks.terms}</button>
    `;
    block.appendChild(legalLinks);
  });

  if (!document.querySelector("[data-legal-modal]")) {
    document.body.insertAdjacentHTML(
      "beforeend",
      `
        <div class="legal-modal-overlay" aria-hidden="true" data-legal-modal>
          <div class="legal-modal-panel" role="dialog" aria-modal="true" aria-labelledby="legal-modal-title">
            <button class="modal-close" type="button" aria-label="${uiText.closeLegalLabel}" data-legal-close>
              <span></span>
              <span></span>
            </button>
            <span class="kicker" data-legal-kicker></span>
            <h2 id="legal-modal-title" data-legal-title></h2>
            <div class="legal-copy" data-legal-body></div>
          </div>
        </div>
      `
    );
  }

  if (!document.querySelector("[data-cookie-banner]")) {
    document.body.insertAdjacentHTML(
      "beforeend",
      `
        <section class="cookie-banner" aria-label="Preferenze cookie" data-cookie-banner>
          <div>
            <span class="kicker">${uiText.cookieBanner.kicker}</span>
            <p>
              ${uiText.cookieBanner.body}
            </p>
          </div>
          <div class="cookie-actions">
            <button class="button button-soft" type="button" data-cookie-choice="accepted">${uiText.cookieBanner.accept}</button>
            <button class="button button-neutral" type="button" data-cookie-choice="rejected">${uiText.cookieBanner.reject}</button>
            <button class="inline-legal-button" type="button" data-legal-open="cookie">${uiText.cookieBanner.preferences}</button>
          </div>
        </section>
      `
    );
  }

  const savedCookieChoice = localStorage.getItem(cookieStorageKey);

  if (savedCookieChoice === "accepted") {
    loadExternalMaps();
  }

  if (!savedCookieChoice) {
    window.setTimeout(() => {
      document.querySelector("[data-cookie-banner]")?.classList.add("is-visible");
    }, 650);
  }

  document.querySelectorAll(".map-consent p").forEach((item) => {
    item.textContent = uiText.cookieInline.text;
  });

  document.querySelectorAll(".map-consent [data-cookie-choice='accepted']").forEach((button) => {
    button.textContent = uiText.cookieInline.button;
  });
};

initLegalUi();

document.addEventListener("click", (event) => {
  const legalOpen = event.target.closest("[data-legal-open]");
  const legalClose = event.target.closest("[data-legal-close]");
  const cookieChoice = event.target.closest("[data-cookie-choice]");
  const legalModal = document.querySelector("[data-legal-modal]");

  if (legalOpen) {
    event.preventDefault();
    openLegalModal(legalOpen.dataset.legalOpen);
  }

  if (legalClose || event.target === legalModal) {
    closeLegalModal();
  }

  if (cookieChoice) {
    setCookieChoice(cookieChoice.dataset.cookieChoice);
    if (cookieChoice.closest("[data-legal-modal]")) {
      closeLegalModal();
    }
  }
});

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeLegalModal();
  }
});

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
      submitButton.textContent = uiText.form.sending;

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
            ? uiText.form.invalidEmail
            : !termsAccepted
              ? uiText.form.terms
              : uiText.form.required;
          status.classList.add("is-error");
        }

        submitButton.disabled = false;
        submitButton.textContent = uiText.form.submit;
        return;
      }

      if (window.location.protocol === "file:") {
        if (status) {
          status.textContent = uiText.form.localPreview;
          status.classList.add("is-error");
        }

        submitButton.disabled = false;
        submitButton.textContent = uiText.form.submit;
        return;
      }

      let endpoint = "";

      try {
        endpoint = new URL(form.getAttribute("action") || "./send-contact.php", window.location.href).toString();
      } catch (error) {
        if (status) {
          status.textContent = uiText.form.configError;
          status.classList.add("is-error");
        }

        submitButton.disabled = false;
        submitButton.textContent = uiText.form.submit;
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
              : uiText.form.genericError;
          status.classList.add("is-error");
        }
      } finally {
        submitButton.disabled = false;
        submitButton.textContent = uiText.form.submit;
      }
    });
  });
}
