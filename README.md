# Kholo Streetwear — Website (Part 3)

A static HTML/CSS/JS website for **Kholo Streetwear**, a hypothetical Johannesburg
streetwear label, built for the Web Development module. Parts 1 and 2 were
approved by the lecturer with no corrections requested. This submission adds
Part 3 — enhanced functionality, SEO, form validation, and deployment.

## Project overview

Kholo Streetwear is a fictional streetwear brand founded in 2022 in Braamfontein,
Johannesburg, selling tees, hoodies, headwear and accessories. This site gives the
brand a permanent home beyond Instagram and market stalls.

## Website goals and objectives

- Establish an online storefront that showcases the current clothing ranges.
- Reduce reliance on social media by offering a permanent, searchable catalogue.
- Build brand credibility through professional presentation of products and story.
- Collect enquiries from potential stockists and sponsors.

## Sitemap

```
index.html      Homepage — hero, featured categories, FAQ accordion, CTA
about.html      About Us — history/timeline, mission & vision, values, audience
products.html   Products — tabs + search/filter over a JS-driven product grid
enquiry.html    Enquiry — stockist / sponsorship / collaboration form
contact.html    Contact — interactive Leaflet map, general contact form
```

## File structure

```
kholo-streetwear/
├── index.html
├── about.html
├── products.html
├── enquiry.html
├── contact.html
├── robots.txt
├── sitemap.xml
├── css/
│   └── style.css
├── js/
│   └── script.js
├── images/
│   └── icon-*.svg / icon-*.png   (10 original icons/illustrations)
└── README.md
```

---

## Part 3 — Enhancing Functionality and SEO

### 1. Working through feedback from Parts 1 and 2

Both Part 1 and Part 2 were approved by the lecturer with no requested
corrections. All work below is new, added on top of the approved submissions.

### 2. Functionality

**2.1 Interactive elements**
- **FAQ accordion** on the homepage (`js/script.js` → `initAccordion()`) —
  custom-built with `aria-expanded`/`aria-controls`, not the native
  `<details>` element, so behaviour and animation are fully controlled.
- **Category tabs** on Products (`initProductsPage()`), filtering the grid
  by Tees / Hoodies / Headwear / Accessories.
- **Lightbox gallery** — clicking any product image opens a larger view in a
  modal (`initLightbox()`), closable via the × button, a click outside, or
  <kbd>Escape</kbd>, with focus returned to the trigger on close.
- **Interactive map** — the Contact page uses **Leaflet** (free, no API key)
  with **Esri's World Street Map tiles** (`initMap()`) — see the tile-provider
  note below — plotting both locations with clickable markers and popups,
  replacing the static map embed from Part 2.
- **Scroll-reveal animation** — sections fade/slide in via
  `IntersectionObserver` (`initScrollReveal()`) as the page is scrolled,
  combining CSS transitions with JS. This has a safety-net timeout so
  content is never left invisible for users, screen readers or crawlers
  that don't trigger a scroll event.

**2.2 Dynamic content**
- The entire product catalogue lives in one JavaScript data array
  (`PRODUCTS` in `js/script.js`) rather than being hand-written as HTML.
  `products.html` renders every card from that array via `renderProducts()`.
- A **search box** filters products by name/description in real time, and
  works together with the category tabs (`initProductsPage()` → `apply()`),
  showing a live "X of 12 products" count and a friendly empty state.

### 3. Search Engine Optimisation (SEO)

**3.1 On-page SEO**
- Unique, keyword-rich `<title>` and `<meta name="description">` on every page.
- `<link rel="canonical">` and Open Graph tags on every page for clean social
  sharing/search-result previews.
- A single `<h1>` per page with a logical H2/H3 hierarchy underneath.
- Descriptive image file names (`icon-tee.png`, not `img1.png`) and
  descriptive `alt` text on every image.
- Clean, descriptive URLs (`products.html`, `contact.html`) — already
  satisfied by the site's flat multi-page structure.
- Internal linking: FAQ answers link to `enquiry.html`; CTAs link between
  Products and Enquiry; the nav and footer link every page to every other.
- Mobile-friendly, responsive layout (verified in Part 2 and re-tested here).

**3.2 Off-page SEO**
- *Backlinks* and *social media promotion* aren't something a static project
  folder can implement directly — our strategy: once deployed, share the
  live link via the brand's Instagram/TikTok bio (referenced throughout the
  site) and, if a real brand, outreach to Johannesburg fashion blogs.
- *Local SEO* — implemented directly via **schema.org `ClothingStore`
  structured data** (JSON-LD) on `contact.html`, with address, opening
  hours and price range, so search engines can show Kholo as a local
  business result.

**3.3 Additional requests**
- `robots.txt` at the project root, allowing all crawlers and pointing to
  the sitemap.
- `sitemap.xml` listing all 5 pages with priority/change-frequency hints.
- *Page speed*: every image has explicit `width`/`height` attributes (so
  the browser reserves space and avoids layout shift) and `loading="lazy"`;
  Google Fonts are loaded with `rel="preconnect"` to cut connection latency.
- *Security*: a hidden **honeypot field** on both forms catches simple
  spam bots (a real field a bot fills in, but which is invisible and
  unreachable for a human, so a non-empty value means it's a bot — the
  submission is silently dropped); every external link uses
  `rel="noopener noreferrer"`; no inline scripts are used anywhere, only
  the external `js/script.js`; HTTPS is automatic once deployed to Netlify
  or GitHub Pages (see Deployment below).

### 4. Form Functionality and Validation

Both `enquiry.html` and `contact.html` use the same validation engine
(`validateField()` / `validateForm()` in `js/script.js`): required fields,
email-format checking, and minimum-length checks are enforced in JavaScript
and shown as **inline error text under each field** (not just the browser's
default tooltip), with focus automatically moved to the first invalid field.

- **`contact.html`** — once validated, the form compiles the visitor's name,
  email and message into a `mailto:` link and opens it, so the **visitor's
  own email client** sends the message to Kholo's address — exactly as the
  brief specifies ("the customer/client should be able to send the email to
  the recipient stated in the code").
- **`enquiry.html`** — once validated, the form computes and displays a
  response relevant to **cost and availability** based on the enquiry type
  selected (minimum order, turnaround time, next steps), and — for stockist
  enquiries with a quantity entered — an **estimated wholesale cost**
  (quantity × average unit price). There's no real backend, so this uses a
  short simulated delay (disabled button, "Submitting...") to mirror the UX
  of an asynchronous submission, which is clearly noted in the result message
  rather than implied to be a live calculation from a server.

### 5. Deployment

The site is a fully static set of HTML/CSS/JS files, so it can be deployed
to any free static host with no build step:

**Option A — Netlify (drag-and-drop, fastest)**
1. Go to [app.netlify.com/drop](https://app.netlify.com/drop).
2. Drag the whole `kholo-streetwear` folder onto the page.
3. Netlify gives you a live HTTPS URL immediately.

**Option B — GitHub Pages**
1. Push this folder to the GitHub repository (as already required for submission).
2. In the repo, go to **Settings → Pages**.
3. Under "Build and deployment", set **Source** to "Deploy from a branch",
   branch `main`, folder `/ (root)`.
4. GitHub publishes the site at `https://<username>.github.io/<repo-name>/`
   within a minute or two.

Either option gives automatic HTTPS, satisfying the security requirement above.

---

## Timeline and milestones

1. Weeks 1–2: Research, planning and lecturer approval of proposal — **Part 1, approved**.
2. Weeks 3–4: Content sourcing, sitemap and wireframes — **Part 1, approved**.
3. Weeks 5–7: HTML structure and content integration — **Part 1, approved**.
4. Weeks 8–9: Styling, functionality and responsive/cross-browser testing — **Part 2, approved**.
5. Week 10: JavaScript interactivity, SEO, form validation and deployment — **this submission (Part 3)**.

## References

- GeeksforGeeks, 2024. *Sitemap planning in UX design.* [online] Available at:
  <https://www.geeksforgeeks.org/sitemap-planning-in-ux-design/> [Accessed 31 July 2026].
- Google Fonts, n.d. *Anton, Space Grotesk and IBM Plex Mono.* [online] Available at:
  <https://fonts.google.com/> [Accessed 31 July 2026]. (SIL Open Font License.)
- Leaflet, n.d. *Leaflet — an open-source JavaScript library for interactive maps.*
  [online] Available at: <https://leafletjs.com/> [Accessed 16 September 2026].
- OpenStreetMap Contributors, n.d. *OpenStreetMap.* [online] Available at:
  <https://www.openstreetmap.org/copyright> [Accessed 16 September 2026]. (Map tile data.)
- Esri, n.d. *World Street Map.* [online] Available at:
  <https://www.arcgis.com/home/item.html?id=3b93337983e9436f8db950e38a8629af>
  [Accessed 14 October 2026]. (Free, no-API-key map tiles — used after both
  OpenStreetMap's own tile servers and CARTO's basemaps turned out to block
  or require an account for this kind of hosted, keyless use.)
- MDN Web Docs, n.d. *Intersection Observer API.* [online] Available at:
  <https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API>
  [Accessed 16 September 2026].
- MDN Web Docs, n.d. *Client-side form validation.* [online] Available at:
  <https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Forms/Form_validation>
  [Accessed 16 September 2026].
- Schema.org, n.d. *ClothingStore.* [online] Available at:
  <https://schema.org/ClothingStore> [Accessed 16 September 2026]. (Structured
  data used for local SEO on the Contact page.)
- Google Search Central, n.d. *SEO Starter Guide.* [online] Available at:
  <https://developers.google.com/search/docs/fundamentals/seo-starter-guide>
  [Accessed 16 September 2026].
- Netlify, n.d. *Deploy a site using drag and drop.* [online] Available at:
  <https://docs.netlify.com/deploy/manual-deploys/> [Accessed 16 September 2026].
- GitHub Docs, n.d. *Configuring a publishing source for your GitHub Pages site.*
  [online] Available at:
  <https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site>
  [Accessed 16 September 2026].

## Changelog

- **v0.1** (Part 1) — Initial static build: 5 HTML pages, shared stylesheet,
  nav, forms, stamp badge. Approved by lecturer, no corrections requested.
- **v0.2** (Part 2) — Added original icon/illustration artwork across all
  product and CTA slots; documented typography scale; `:active` states and
  `box-shadow` for richer interaction feedback; documented responsive
  breakpoints; captured screenshot evidence at desktop/tablet/mobile widths.
  Approved by lecturer, no corrections requested.
- **v0.3** (Part 3) —
  - Added FAQ accordion, category tabs, search/filter, and a product-image
    lightbox (all vanilla JS, no framework dependency).
  - Rebuilt the product grid to render dynamically from a single JS data
    array instead of hand-written HTML per card.
  - Replaced the static Contact map embed with an interactive Leaflet map
    (clickable markers, popups).
  - Added scroll-reveal animation with a guaranteed-visible safety net.
  - Added full on-page SEO: unique titles/descriptions, canonical links,
    Open Graph tags, `robots.txt`, `sitemap.xml`, and `ClothingStore`
    structured data for local SEO.
  - Added page-speed optimisations: explicit image dimensions, lazy
    loading, font preconnects.
  - Added security measures: honeypot spam field on both forms,
    `rel="noopener noreferrer"` on all external links.
  - Rebuilt form validation in JavaScript with inline per-field error
    messages (not browser-default tooltips) and focus management.
  - Contact form now compiles a `mailto:` link so the visitor sends the
    email themselves, per the brief's requirement.
  - Enquiry form now computes and displays a dynamic response (turnaround,
    minimum order, estimated wholesale cost) based on the enquiry type and
    quantity entered.
  - Added deployment instructions for Netlify and GitHub Pages.
- **v0.3.1** — Switched the Leaflet map's tile provider from OpenStreetMap's
  own servers (which return 403 "Access blocked" for hosted/cloud-deployed
  sites — they're reserved for light local development) to CARTO's free
  basemap tiles.
- **v0.3.2** — CARTO's basemap tiles turned out to require a free account/API
  key (policy change), so switched again to **Esri's World Street Map**
  tiles — a long-standing free, no-signup public tile service — which is
  what the map actually uses now.
