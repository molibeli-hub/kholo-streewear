/* =========================================================
   KHOLO STREETWEAR — SCRIPT
   Organised into small, independent init functions so each
   feature can be read (and marked) on its own. Every init is
   safe to call on a page that doesn't have that feature — each
   one checks the DOM first and quietly returns if its markup
   isn't present.
   ========================================================= */

// ---------- Mobile navigation toggle ----------
function initNavToggle() {
  const toggle = document.querySelector(".nav-toggle");
  const links = document.querySelector(".nav-links");
  if (!toggle || !links) return;

  toggle.addEventListener("click", () => {
    const isOpen = links.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });
}

// ---------- Rotating stamp badge ----------
function renderStamps() {
  const mounts = document.querySelectorAll("[data-stamp]");
  if (!mounts.length) return;

  const markup = `
    <svg viewBox="0 0 200 200" role="img" aria-label="Kholo Streetwear, Jozi made stamp">
      <defs>
        <path id="stampCircle" d="M100,100 m-80,0 a80,80 0 1,1 160,0 a80,80 0 1,1 -160,0" />
      </defs>
      <g class="stamp-spin">
        <circle cx="100" cy="100" r="98" fill="none" stroke="#F4F1E6" stroke-width="1" opacity="0.5" />
        <text font-family="IBM Plex Mono, monospace" font-size="11" letter-spacing="3" fill="#F4F1E6">
          <textPath href="#stampCircle" startOffset="0%">
            KHOLO STREETWEAR &#8226; JOZI MADE &#8226; KHOLO STREETWEAR &#8226; JOZI MADE &#8226;
          </textPath>
        </text>
      </g>
      <circle cx="100" cy="100" r="34" fill="#E85C27" />
      <text x="100" y="105" text-anchor="middle" font-family="Anton, sans-serif" font-size="20" fill="#121110">KS</text>
    </svg>
  `;
  mounts.forEach((mount) => { mount.innerHTML = markup; });
}

// ---------- Scroll-reveal animation (Part 3, section 2.1) ----------
// Adds .is-visible to any .reveal element once it scrolls into view,
// which css/style.css animates with opacity + translateY.
function initScrollReveal() {
  const targets = document.querySelectorAll(".reveal");
  if (!targets.length) return;

  if (!("IntersectionObserver" in window)) {
    targets.forEach((t) => t.classList.add("is-visible"));
    return;
  }

  // Generous rootMargin so content just below the fold reveals almost
  // immediately rather than needing a deliberate scroll.
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.01, rootMargin: "0px 0px 200px 0px" });

  targets.forEach((t) => observer.observe(t));

  // Safety net: screen readers, crawlers, and some automated/headless
  // contexts don't reliably fire scroll/intersection events. Content must
  // never stay invisible because of a decorative animation, so force
  // everything visible shortly after load regardless of scroll position.
  window.setTimeout(() => {
    targets.forEach((t) => t.classList.add("is-visible"));
  }, 150);
}

// ---------- FAQ accordion (Part 3, section 2.1) ----------
function initAccordion() {
  const triggers = document.querySelectorAll(".accordion-trigger");
  if (!triggers.length) return;

  triggers.forEach((trigger) => {
    const panel = document.getElementById(trigger.getAttribute("aria-controls"));
    if (!panel) return;

    trigger.addEventListener("click", () => {
      const isOpen = trigger.getAttribute("aria-expanded") === "true";
      trigger.setAttribute("aria-expanded", String(!isOpen));
      panel.style.maxHeight = isOpen ? "0px" : `${panel.scrollHeight}px`;
    });
  });
}

// ---------- Product data (Part 3, section 2.2 — dynamic content) ----------
// Single source of truth for every product. products.html renders its
// cards FROM this array via renderProducts() below, rather than having
// each card hand-written in the HTML — the search/filter and the tabs
// both just re-run the same render against a filtered copy of this list.
// photo: a real sourced photograph (Unsplash, free-to-use license) shown
// full-bleed; products without one fall back to the original icon artwork
// (see renderProducts() below) — a deliberate hybrid while more real
// product photos are sourced for the remaining categories.
const TEE_PHOTO = "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=800&q=80";
const HOODIE_PHOTO = "https://images.unsplash.com/photo-1622567893612-a5345baa5c9a?auto=format&fit=crop&w=800&q=80";

const PRODUCTS = [
  { id: "foundation-tee", name: "The Foundation Tee", category: "tees", drop: "DROP 003", price: 450, blurb: "Oversized fit, 240gsm cotton, screen-printed stamp logo across the chest.", icon: "icon-tee", photo: TEE_PHOTO },
  { id: "skyline-tee", name: "Jozi Skyline Tee", category: "tees", drop: "DROP 003", price: 480, blurb: "Back-print skyline graphic, ribbed collar, garment-dyed for a worn-in look.", icon: "icon-tee", photo: TEE_PHOTO },
  { id: "khulu-longsleeve", name: "Khulu Longsleeve", category: "tees", drop: "DROP 001", price: 520, blurb: "Midweight long-sleeve tee with a sleeve-print wordmark.", icon: "icon-tee", photo: TEE_PHOTO },
  { id: "khulu-hoodie", name: "The Khulu Hoodie", category: "hoodies", drop: "DROP 002", price: 950, blurb: "Boxy fit, brushed fleece lining, built for Highveld winters.", icon: "icon-hoodie", photo: HOODIE_PHOTO },
  { id: "stamp-zipup", name: "Stamp Zip-Up", category: "hoodies", drop: "DROP 002", price: 1050, blurb: "Full-zip hoodie with an embroidered circular stamp on the chest.", icon: "icon-hoodie", photo: HOODIE_PHOTO },
  { id: "alexandra-crewneck", name: "Alexandra Crewneck", category: "hoodies", drop: "DROP 004", price: 850, blurb: "Cropped crewneck sweatshirt, named for one of Kholo's home neighbourhoods.", icon: "icon-hoodie", photo: HOODIE_PHOTO },
  { id: "jozi-bucket-cap", name: "Jozi Bucket Cap", category: "headwear", drop: "DROP 004", price: 380, blurb: "Reversible bucket hat with an embroidered stamp logo on both sides.", icon: "icon-cap" },
  { id: "stamp-beanie", name: "Stamp Beanie", category: "headwear", drop: "DROP 002", price: 320, blurb: "Ribbed knit beanie with a woven Kholo tab.", icon: "icon-beanie" },
  { id: "foundation-cap", name: "Foundation Cap", category: "headwear", drop: "DROP 001", price: 400, blurb: "Structured six-panel cap with an embroidered front logo.", icon: "icon-cap" },
  { id: "market-tote", name: "Market Tote", category: "accessories", drop: "DROP 001", price: 250, blurb: "Canvas tote sized for a flea-market haul, printed with the Kholo wordmark.", icon: "icon-tote" },
  { id: "stamp-socks", name: "Stamp Socks (2-pack)", category: "accessories", drop: "DROP 003", price: 180, blurb: "Ribbed crew socks with a woven stamp logo.", icon: "icon-socks" },
  { id: "pin-set", name: "Kholo Pin Set", category: "accessories", drop: "DROP 003", price: 150, blurb: "Set of three enamel pins, sold at markets and now online.", icon: "icon-pins" },
];

function formatRand(amount) {
  return "R" + amount.toLocaleString("en-ZA");
}

function renderProducts(list, mount) {
  if (!mount) return;
  mount.innerHTML = "";

  if (!list.length) {
    const empty = document.createElement("p");
    empty.className = "empty-state";
    empty.textContent = "No products match your search. Try a different term or category.";
    mount.appendChild(empty);
    return;
  }

  list.forEach((p) => {
    const card = document.createElement("article");
    card.className = "card";

    // Real sourced photo when available; otherwise fall back to the
    // original icon artwork (see the PRODUCTS data above for which is which).
    const imgSrc = p.photo || `images/${p.icon}.png`;
    const imgClass = p.photo ? "is-photo" : "";
    const alt = p.photo ? `Photo of the ${p.name}` : `Illustrated icon of the ${p.name}`;

    card.innerHTML = `
      <button type="button" class="card-media" data-lightbox-trigger
              data-img="${imgSrc}" data-name="${p.name}">
        <img src="${imgSrc}" class="${imgClass}" alt="${alt}" width="400" height="400" loading="lazy">
      </button>
      <div class="card-body">
        <span class="drop">${p.drop}</span>
        <h3>${p.name}</h3>
        <p>${p.blurb}</p>
        <span class="price">${formatRand(p.price)}</span>
      </div>
    `;
    mount.appendChild(card);
  });
}

// ---------- Tabs + search/filter (Part 3, sections 2.1 and 2.2) ----------
function initProductsPage() {
  const mount = document.querySelector("[data-products-mount]");
  if (!mount) return; // not on products.html

  const tabButtons = document.querySelectorAll(".tab-btn");
  const searchInput = document.querySelector("[data-product-search]");
  const countEl = document.querySelector("[data-filter-count]");
  let activeCategory = "all";

  function apply() {
    const term = (searchInput?.value || "").trim().toLowerCase();
    const filtered = PRODUCTS.filter((p) => {
      const matchesCategory = activeCategory === "all" || p.category === activeCategory;
      const matchesTerm = !term || p.name.toLowerCase().includes(term) || p.blurb.toLowerCase().includes(term);
      return matchesCategory && matchesTerm;
    });
    renderProducts(filtered, mount);
    if (countEl) countEl.textContent = `${filtered.length} of ${PRODUCTS.length} products`;
    initLightbox(); // re-bind lightbox triggers on the freshly rendered cards
  }

  tabButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      tabButtons.forEach((b) => b.setAttribute("aria-selected", "false"));
      btn.setAttribute("aria-selected", "true");
      activeCategory = btn.dataset.category;
      apply();
    });
  });

  if (searchInput) {
    searchInput.addEventListener("input", apply);
  }

  apply(); // initial render
}

// ---------- Lightbox gallery (Part 3, section 2.1) ----------
// Re-run after any re-render (search/filter/tabs) since those replace
// the card markup and would otherwise leave stale listeners behind.
function initLightbox() {
  const lightbox = document.getElementById("lightbox");
  if (!lightbox) return;

  const img = lightbox.querySelector("img");
  const caption = lightbox.querySelector(".lightbox-caption");
  const closeBtn = lightbox.querySelector(".lightbox-close");
  let lastFocused = null;

  function open(src, name) {
    img.src = src;
    img.alt = `Larger view of ${name}`;
    caption.textContent = name;
    lastFocused = document.activeElement;
    lightbox.hidden = false;
    closeBtn.focus();
  }

  function close() {
    lightbox.hidden = true;
    if (lastFocused) lastFocused.focus();
  }

  document.querySelectorAll("[data-lightbox-trigger]").forEach((trigger) => {
    trigger.onclick = () => open(trigger.dataset.img, trigger.dataset.name);
  });

  closeBtn.onclick = close;
  lightbox.addEventListener("click", (e) => { if (e.target === lightbox) close(); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape" && !lightbox.hidden) close(); });
}

// ---------- Interactive map (Part 3, section 2.1) ----------
// Uses Leaflet (free, no API key) with OpenStreetMap tiles to plot
// both Kholo locations, replacing the Part 2 static iframe embeds.
function initMap() {
  const mapEl = document.getElementById("map");
  if (!mapEl || typeof L === "undefined") return;

  const map = L.map("map").setView([-26.1929, 28.0377], 15);

  // Esri's World Street Map tiles: a free, no-API-key public tile service,
  // used here after both OpenStreetMap's own servers (block hosted/cloud
  // sites) and CARTO's basemaps (now require a signup/API key) turned out
  // not to work without an account. Esri's service has stayed free and
  // keyless for this kind of light use for years.
  L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}", {
    attribution: "Tiles &copy; Esri &mdash; Source: Esri, DeLorme, NAVTEQ, USGS, Intermap, iPC, NRCAN, Esri Japan, METI, Esri China (Hong Kong), Esri (Thailand), TomTom",
    maxZoom: 19,
  }).addTo(map);

  const locations = [
    { lat: -26.1925, lng: 28.0381, name: "Kholo Studio", detail: "14 Henri Street, Braamfontein<br>Mon&ndash;Fri: 09:00&ndash;17:00" },
    { lat: -26.1934, lng: 28.0372, name: "Braamfontein Market Stall", detail: "73 Juta Street, Braamfontein<br>Sat&ndash;Sun: 09:00&ndash;14:00" },
  ];

  locations.forEach((loc) => {
    L.marker([loc.lat, loc.lng]).addTo(map)
      .bindPopup(`<strong>${loc.name}</strong><br>${loc.detail}`);
  });
}

// ---------- Form validation helpers (Part 3, section 4) ----------
function showFieldError(field, message) {
  field.setAttribute("aria-invalid", "true");
  const error = field.parentElement.querySelector(".field-error");
  if (error) { error.textContent = message; error.classList.add("is-visible"); }
}

function clearFieldError(field) {
  field.removeAttribute("aria-invalid");
  const error = field.parentElement.querySelector(".field-error");
  if (error) { error.classList.remove("is-visible"); }
}

function validateField(field) {
  clearFieldError(field);
  const value = field.value.trim();

  if (field.hasAttribute("required") && !value) {
    showFieldError(field, "This field is required.");
    return false;
  }
  if (field.type === "email" && value) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(value)) {
      showFieldError(field, "Enter a valid email address, e.g. name@example.com.");
      return false;
    }
  }
  if (field.hasAttribute("minlength") && value.length < Number(field.getAttribute("minlength"))) {
    showFieldError(field, `Please enter at least ${field.getAttribute("minlength")} characters.`);
    return false;
  }
  if (field.tagName === "SELECT" && field.hasAttribute("required") && !value) {
    showFieldError(field, "Please choose an option.");
    return false;
  }
  return true;
}

function validateForm(form) {
  const fields = form.querySelectorAll("input[required], select[required], textarea[required], input[type=email]");
  let firstInvalid = null;
  let allValid = true;

  fields.forEach((field) => {
    // Skip the honeypot — it must stay empty, not be "valid"
    if (field.classList.contains("hp-field")) return;
    const ok = validateField(field);
    if (!ok) {
      allValid = false;
      if (!firstInvalid) firstInvalid = field;
    }
  });

  if (firstInvalid) firstInvalid.focus();
  return allValid;
}

// ---------- Contact form: compile + launch a pre-filled email ----------
// Per the brief: the visitor's message is compiled into an email and
// THEY send it via their own mail client (a mailto: link), rather than
// this site silently emailing on their behalf (which would need a
// server this static project doesn't have).
function initContactForm() {
  const form = document.getElementById("contact-form");
  if (!form) return;

  const RECIPIENT = "hello@kholostreetwear.co.za";

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (form.querySelector(".hp-field").value) return; // honeypot tripped, silently drop
    if (!validateForm(form)) return;

    const name = form.querySelector("#c-name").value.trim();
    const email = form.querySelector("#c-email").value.trim();
    const subject = form.querySelector("#c-subject").value.trim();
    const message = form.querySelector("#c-message").value.trim();

    const body = `Name: ${name}\nEmail: ${email}\n\n${message}`;
    const mailtoUrl = `mailto:${RECIPIENT}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    const status = form.querySelector(".form-status");
    status.textContent = "Message compiled — your email app should now open with everything filled in. Just hit send from there.";
    status.classList.remove("is-error");
    status.classList.add("is-visible", "is-success");

    window.location.href = mailtoUrl;
  });

  form.querySelectorAll("input, textarea").forEach((field) => {
    field.addEventListener("blur", () => { if (field.value.trim()) validateField(field); });
  });
}

// ---------- Enquiry form: validate + compute a dynamic response ----------
function initEnquiryForm() {
  const form = document.getElementById("enquiry-form");
  if (!form) return;

  const WHOLESALE_UNIT_PRICE = 250; // average ex-VAT wholesale unit cost, used for the estimate below

  const RESPONSES = {
    stockist: {
      title: "Stockist enquiry",
      lines: {
        "Minimum order": "20 units per style",
        "Typical turnaround": "10 business days",
        "Next step": "We'll follow up with a wholesale price list within 3 business days",
      },
    },
    sponsorship: {
      title: "Sponsorship enquiry",
      lines: {
        "Tiers available": "Bronze / Silver / Gold (product + cash options)",
        "Typical turnaround": "5 business days for a tailored proposal",
        "Next step": "We'll send our sponsorship deck and availability for the next 2 drops",
      },
    },
    collab: {
      title: "Collaboration / pop-up enquiry",
      lines: {
        "Pop-up slots": "Currently open for next month's Braamfontein market dates",
        "Typical turnaround": "3–5 business days",
        "Next step": "We'll confirm available dates and stall requirements",
      },
    },
    general: {
      title: "General enquiry",
      lines: {
        "Typical turnaround": "3–5 business days",
        "Next step": "A team member will reply directly to your email",
      },
    },
  };

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (form.querySelector(".hp-field").value) return;
    if (!validateForm(form)) return;

    const submitBtn = form.querySelector("button[type=submit]");
    const status = form.querySelector(".form-status");
    const responsePanel = form.querySelector(".response-panel");

    // Simulated short async delay — there's no real backend here, so this
    // mirrors the UX of an AJAX submission (disabled button, brief wait,
    // then an inline result) without pretending to contact a server.
    submitBtn.disabled = true;
    submitBtn.textContent = "Submitting...";
    status.classList.remove("is-visible");
    responsePanel.classList.remove("is-visible");

    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.textContent = "Send enquiry";

      const type = form.querySelector("#enquiry-type").value;
      const qty = Number(form.querySelector("#quantity")?.value || 0);
      const data = RESPONSES[type] || RESPONSES.general;

      let dl = "";
      Object.entries(data.lines).forEach(([k, v]) => { dl += `<dt>${k}</dt><dd>${v}</dd>`; });

      if (type === "stockist" && qty > 0) {
        const estimate = qty * WHOLESALE_UNIT_PRICE;
        dl += `<dt>Estimated cost</dt><dd>${qty} units &times; ${formatRand(WHOLESALE_UNIT_PRICE)} (avg) &asymp; ${formatRand(estimate)} ex VAT</dd>`;
      }

      responsePanel.querySelector("h4").textContent = data.title;
      responsePanel.querySelector("dl").innerHTML = dl;
      responsePanel.classList.add("is-visible");

      status.textContent = "Thanks — this is a static front-end demo, so nothing was sent to a server, but the response above reflects what you'd actually receive.";
      status.classList.remove("is-error");
      status.classList.add("is-visible", "is-success");
    }, 700);
  });

  form.querySelectorAll("input, select, textarea").forEach((field) => {
    field.addEventListener("blur", () => { if (field.value.trim()) validateField(field); });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initNavToggle();
  renderStamps();
  initScrollReveal();
  initAccordion();
  initProductsPage();
  initLightbox();
  initMap();
  initContactForm();
  initEnquiryForm();
});
