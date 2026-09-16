# Kholo Streetwear — Website (Part 2)

A static HTML/CSS/JS website for **Kholo Streetwear**, a hypothetical Johannesburg
streetwear label, built for the Web Development module. Part 1 (structure and
content) was approved by the lecturer; this submission adds Part 2 — CSS
styling and responsive design.

## Project overview

Kholo Streetwear is a fictional streetwear brand founded in 2022 in Braamfontein,
Johannesburg, selling tees, hoodies, headwear and accessories. This site gives the
brand a permanent home beyond Instagram and market stalls.

## Website goals and objectives

- Establish an online storefront that showcases the current clothing ranges.
- Reduce reliance on social media by offering a permanent, searchable catalogue.
- Build brand credibility through professional presentation of products and story.
- Collect enquiries from potential stockists and sponsors.

## Key features and functionality

- Responsive 5-page site: Home, About, Products, Enquire, Contact.
- Sticky header with a mobile nav toggle, now with a drop-shadow for depth.
- Reusable "stamp" badge component rendered via JavaScript (`js/script.js`).
- Product grid across four ranges: Tees, Hoodies, Headwear, Accessories, each
  illustrated with original SVG/PNG icon artwork (see Part 2 → Images below).
- Stockist/sponsorship enquiry form and a general contact form (front-end only —
  both intercept submission with JavaScript and show a status message, since no
  backend exists yet at this stage of the project).
- Contact page shows two real locations (studio + weekend pop-up) with embedded maps.

## Sitemap

```
index.html      Homepage — hero, featured categories, brand statement, CTA
about.html      About Us — history/timeline, mission & vision, values, audience
products.html   Products — Tees / Hoodies / Headwear / Accessories, with prices
enquiry.html    Enquiry — stockist / sponsorship / collaboration form
contact.html    Contact — studio + pop-up locations (map), general contact form
```

## File structure

```
kholo-streetwear/
├── index.html
├── about.html
├── products.html
├── enquiry.html
├── contact.html
├── css/
│   └── style.css
├── js/
│   └── script.js
├── images/
│   ├── icon-*.svg               (10 original icons/illustrations, master files)
│   └── icon-*-400.png / -800.png (rasterised at 2 sizes for srcset, see below)
├── documents/
│   ├── Website_Project_Proposals.docx
│   ├── Kholo_Streetwear_Content_Research.docx
│   ├── kholo-streetwear-sitemap.png
│   └── screenshots/              (Part 2 responsive-testing evidence, see below)
└── README.md
```

---

## Part 2 — CSS Styling and Responsive Design

### 1. Working through feedback from Part 1

Part 1 was approved by the lecturer with no requested corrections. No structural
or content changes were required going into Part 2; all work below is new
styling and responsiveness added on top of the approved Part 1 submission.

### 2. CSS styling for desktop

**2.1 External stylesheet** — a single `css/style.css` is linked from all five
HTML pages, so every page shares one source of truth for styling.

**2.2 Base style** — a universal box-sizing reset (`* { box-sizing: border-box;
margin: 0; padding: 0; }`) removes browser inconsistencies, and `:root` holds
every colour, font and spacing value as a CSS custom property, so the whole
site's look is controlled from one place at the top of the file.

**2.3 Typography** — a documented type scale (`--text-xs` through `--text-3xl`)
keeps font sizes consistent instead of one-off values scattered through the
file; `font-family`, `letter-spacing` and `line-height` are set per role
(display headings vs. mono labels vs. body copy).

**2.4 Layout structure** — Flexbox drives the nav bar and button groups;
CSS Grid drives the product grid, the hero's two-column split, and the footer's
four-column layout — switching column counts at each breakpoint (see below).

**2.5 Visual styles** — colour, background, border and `box-shadow` are used
throughout (card hover lift, sticky header shadow, form panel shadow).
Interactive states are implemented for all three pseudo-classes the brief
asks for: `:hover`, `:focus-visible` (used instead of bare `:focus` so the
outline only shows for keyboard users, not mouse clicks — the accessible
modern equivalent), and `:active` (buttons, nav links, cards and form fields
all have a distinct pressed state).

### 3. Responsive design

**3.1 Breakpoints** — two media queries, documented in the CSS itself:

| Breakpoint | Width | What changes |
|---|---|---|
| Desktop | default (no query) | 3-column product grid, 2-column hero/split sections, full horizontal nav |
| Tablet | `max-width: 900px` | Product grid → 2 columns, hero/split sections stack to 1 column |
| Mobile | `max-width: 640px` | Nav collapses into a hamburger menu, every remaining grid → 1 column |

**3.2 Relative units** — spacing uses a `rem`-based scale (`--space-1`...`--space-6`),
type sizes are `rem`/`em`-based (plus `clamp()` for headings so they scale
fluidly between breakpoints instead of jumping), and layout widths use `%`/`fr`
units rather than fixed pixels.

**3.3 Responsive images** — all 12 product icons and 4 illustrations use real
`srcset`/`sizes`, e.g.:

```html
<img src="images/icon-tee-400.png"
     srcset="images/icon-tee-400.png 400w, images/icon-tee-800.png 800w"
     sizes="(max-width: 640px) 45vw, 220px"
     alt="Illustrated icon of the Foundation Tee" loading="lazy">
```

Each icon exists as an original SVG master plus two rasterised PNGs (400px and
800px wide), so the browser picks the resolution appropriate to its viewport
instead of always downloading the largest file. `loading="lazy"` is set on
every product image so off-screen images don't block initial page load.

**3.4 Test and iterate** — tested in Chrome across the three breakpoints above.
Screenshot evidence for all 5 pages at desktop (1440px), tablet (768px) and
mobile (375px) is in `documents/screenshots/`. Homepage examples:

| Desktop | Tablet | Mobile |
|---|---|---|
| ![Homepage desktop](documents/screenshots/index-desktop.png) | ![Homepage tablet](documents/screenshots/index-tablet.png) | ![Homepage mobile](documents/screenshots/index-mobile.png) |

The full set (`about`, `products`, `enquiry`, `contact` × 3 widths each) is in
the same folder for reference.

---

## Timeline and milestones

1. Weeks 1–2: Research, planning and lecturer approval of proposal — **Part 1, approved**.
2. Weeks 3–4: Content sourcing, sitemap and wireframes — **Part 1, approved**.
3. Weeks 5–7: HTML structure and content integration — **Part 1, approved**.
4. Weeks 8–9: Styling, functionality and responsive/cross-browser testing — **this submission (Part 2)**.
5. Week 10: Final review, debugging and submission (Part 3).

## References

- GeeksforGeeks, 2024. *Sitemap planning in UX design.* [online] Available at:
  <https://www.geeksforgeeks.org/sitemap-planning-in-ux-design/> [Accessed 31 July 2026].
- Google Fonts, n.d. *Anton, Space Grotesk and IBM Plex Mono.* [online] Available at:
  <https://fonts.google.com/> [Accessed 31 July 2026]. (SIL Open Font License — free
  for commercial use.)
- MDN Web Docs, n.d. *Responsive images.* [online] Available at:
  <https://developer.mozilla.org/en-US/docs/Web/HTML/Guides/Responsive_images>
  [Accessed 16 September 2026]. (Referenced for correct `srcset`/`sizes` syntax.)

## Changelog

- **v0.1** (Part 1) — Initial static build: 5 HTML pages, shared stylesheet, nav,
  forms, stamp badge. Approved by lecturer with no corrections requested.
- **v0.2** (Part 2) —
  - Added 10 original SVG icons/illustrations (`/images`) plus 400px/800px PNG
    exports of each, replacing the Part 1 text placeholders in every product
    card and illustration slot.
  - Wired all product/illustration images with real `srcset`/`sizes`/`loading="lazy"`
    for responsive image loading (rubric 3.3).
  - Added a documented typography scale (`--text-xs`–`--text-3xl`) to `:root`
    and applied it across headings, labels and body copy (rubric 2.3).
  - Added explicit `:active` states to buttons, nav links, cards and form
    fields, alongside the existing `:hover`/`:focus-visible` states (rubric 2.5).
  - Added `box-shadow` to the sticky header and form panels for extra visual
    depth (rubric 2.5).
  - Documented the two responsive breakpoints (tablet/mobile) directly in the
    CSS with comments explaining what changes at each (rubric 3.1).
  - Captured and added screenshot evidence for all 5 pages across desktop/
    tablet/mobile breakpoints to `documents/screenshots/` (rubric 3.4).

