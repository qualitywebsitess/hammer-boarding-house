# Hammer Boarding House — Build Brief (handoff for opencode)

Goal: reproduce this project exactly as it stands. Read `CLAUDE.md` and
`CLIENT_REQUIREMENTS.md` first — they are the permanent instruction files and
this brief does not replace them.

---

## 1. Critical: there are TWO implementations, and they diverge

| | `src/` (Astro) | `standalone/index.html` |
|---|---|---|
| Output | Static Astro build → `dist/` | One 70 KB self-contained HTML file |
| CSS | Hand-written tokens in `src/styles/global.css`, no framework | Tailwind **CDN** (`cdn.tailwindcss.com`) |
| Icons | `src/components/Icon.astro` + `src/components/icons.ts` | Material Symbols Outlined (Google Fonts) |
| Fonts | Self-hosted `@fontsource-variable/inter` | Google Fonts: Hanken Grotesk + Inter |
| Images | `src/assets/images/` via `import.meta.glob`, optimised at build | `standalone/images/` — 23 plain files, relative paths |
| Content | `src/data/site.ts` (typed, single source) | Hard-coded in the HTML |

See §11 — the picture gap is the sharpest symptom of this split.

**Do not assume one is stale.** Decide with the client which is the deliverable
before changing either. Duplicating a content edit across both by hand is the
current failure mode — the two files already drifted once.

## 2. Stack (Astro side)

`package.json` — deliberately minimal, do not add dependencies:

```json
{ "name": "hammer-residence", "type": "module", "version": "1.0.0", "private": true,
  "scripts": { "dev": "astro dev", "build": "astro build", "preview": "astro preview" },
  "dependencies": {
    "@astrojs/sitemap": "^3.7.4",
    "@fontsource-variable/inter": "^5.3.0",
    "astro": "^5.18.2"
  } }
```

`astro.config.mjs`: `defineConfig({ site: SITE_URL, integrations: [sitemap()] })`
with `SITE_URL = 'https://hammerresidence.example'` — **placeholder, must be
replaced before publishing.**

## 3. File map (`src/`)

```
layouts/BaseLayout.astro
pages/index.astro                 <- single landing page, no other routes
styles/global.css                 <- ALL design tokens live here
styles/fonts.css
components/  Button  FAQItem  FeatureCard  Footer  Header  Icon  Logo
             Photo  RoomCard  SectionHeading  WhatsAppButton  icons.ts
components/sections/  Hero  StatStrip  Why  Rooms  Included
                      Gallery  Location  FaqRules  Contact
data/  site.ts  faq.ts  images.ts  whatsapp.ts
assets/images/          (+ gallery/)  — empty, .gitkeep only
```

## 4. Design system — restyle from tokens, never from components

`src/styles/global.css` `:root`. Approved Google Stitch screen "Hammer
Residence — Landing Page" is the visual source of truth.

- Ground `--color-bg: #fbf9f8` (warm off-white), surface `#ffffff`
- Primary terracotta `--color-primary: #9f402d`, hover `#802918`
- Accent coral `#e2725b`, blush `rgba(255,218,211,.55)`, plum `#5a0d02`
- Secondary teal `#006972`, tertiary green `#006d2f`
- Ink `#1b1c1c` / soft `#56423e` / subtle `#89726d`
- Border `#ddc0ba`; empty-photo sand `--color-placeholder: #eae5db`
- WhatsApp `#25d366` / dark `#128c7e` / on `#06301a`
- Spacing 4/8/12/16/24/32/48/80/120px; gutter 24, margin 16 mobile / 64 desktop
- Radius .25 / .5 / .75rem + pill 999px
- Type: Inter Variable throughout — .75 / .875 / 1 / 1.125 / 1.5 / 2 / 3rem
- `--header-height: 4.5rem`, `--content-width: 1280px`

Mobile-first. No CSS framework, no icon library, no JS framework.

## 5. Content rule — this is the hard one

**Every real-world fact comes from `src/data/site.ts`, which mirrors
`CLIENT_REQUIREMENTS.md`. Invent nothing.** No fake testimonials, reviews,
awards, statistics, photos, addresses, amenities, prices or policies.

Verified facts currently in `site.ts`:

- Hammer Boarding House — student boarding house, 7 houses, 2 occupants per room
- Email `ferdsambulo@gmail.com`; phone `+260 977 802 016`; WhatsApp `260977802016`
- Deposit K500; price range K2,000–K3,000
- Furniture: single board beds, study tables, wardrobes
- Included in rent: Wi-Fi, security, garbage collection, electricity
- ~3-min walk to the UNILUS small gate; ~7 min to shops and transport
- Nearby: restaurants, pharmacies, supermarkets
- House rules: no boys allowed; a curfew applies (**no time supplied**)
- Visitors: female friends and close relatives only (**no hours supplied**)
- Check-in and move-out: flexible
- Early departure forfeits the remaining rental period/payment

The Stitch mock contains placeholder content that is **not** client-verified and
was deliberately NOT implemented: a "Single Room" tab, a per-room "K2,000/mo"
price label, "Book Now", and Privacy/Terms links. The no-invention rule beats
the design mock. Do not add them back.

### Anti-scam notice (client-required, confirmed 2026-09-07)

> The ONLY official contact number for Hammer Boarding House is +260 977 802 016.
> The landlord has not authorised any other person or phone number to collect
> payments or represent Hammer Boarding House. Do not send money to unauthorised
> individuals.

Must appear in at least three places. `standalone/index.html` currently
references the number 6 times.

## 6. Images

Astro side: fixed named slots in `src/data/images.ts` — `logo.png`, `hero.jpg`,
`exterior.jpg`, `room-01.jpg`, `room-02.jpg`, `amenity-wifi.jpg`. Dropping a
correctly named file into `src/assets/images/` (or `gallery/`) swaps the
"Photography coming soon" placeholder for an optimised image — no code change.
`getSlotImage()` / `getGalleryImages()` resolve them via `import.meta.glob`.

Standalone side: 23 real files in `standalone/images/` — `logo.png`, `hero.jpg`,
`philosophy.jpg`, `map.png`, `gallery-01..06.jpg`, `room2-01..06.jpg`,
`room3-01..04.jpg`, `icon-cash.png`, `icon-security.png`, `icon-students.png`.
All referenced by **relative** path (`images/…`), including two CSS
`url("images/…")` background rules.

> The HTML file and its `images/` folder must travel together. Copying the
> `.html` alone silently breaks every image — that already happened once.

There is no `icon-walk.png`; that slot uses the Material Symbols
`directions_walk` glyph. Do not re-point it at a PNG unless the file exists.

## 7. Standalone page structure

`<title>` Hammer Boarding House — Female Student Accommodation in Silverest, Chongwe
(Near UNILUS). Sections in order:
`#home` `#rooms` `#gallery` `#questions` `#cat-safety` `#cat-fees` `#contact`.
Canonical `https://hammerresidence.com/` — **placeholder, must be replaced.**

## 8. Working rules (from CLAUDE.md)

Simple over clever. No database, auth, payments, admin dashboard or backend.
No new dependencies without a clear reason. Build reusable components.
Mobile-first, accessible, SEO-aware, optimised images, minimal animation.
Never touch unrelated code while fixing one thing. Inspect before implementing,
plan before major features, verify the build after. One coherent implementation
beats many small experiments. If information is missing or ambiguous, **flag it
— never guess.**

## 9. Blockers before publishing

1. What the numbers for Houses 1–6 represent (rooms, capacity, price, other?)
2. Any information at all for House 7
3. Curfew time — client gave none; site says management confirms on WhatsApp
4. Visitor hours — none supplied, none published
5. Real per-house/room availability — none supplied
6. Real domain — replace in `astro.config.mjs` AND the standalone canonical/OG tags
7. Decide which implementation (Astro vs standalone) is the deliverable

## 10. Verify

`npm install && npm run build`, then check `dist/` and the console for errors.
Open `standalone/index.html` directly from its own folder to confirm all 23
images resolve.

---

## 11. UNRESOLVED: the Astro site has no pictures at all

This is the highest-value open task. Two separate causes:

**a. The folders are empty.** `src/assets/images/` and
`src/assets/images/gallery/` contain nothing but `.gitkeep`. Every `Photo`
renders the sand `--color-placeholder` "Photography coming soon" state. The 23
real photos exist only in `standalone/images/`.

**b. The filenames do not match the slots.** Copying the files across does not
fix it — `images.ts` globs by exact filename, and only two of six slots line up:

| slot in `images.ts` | file that exists | status |
|---|---|---|
| `logo.png` | `logo.png` | matches |
| `hero.jpg` | `hero.jpg` | matches |
| `exterior.jpg` | — | no such file |
| `room-01.jpg` | `room2-01.jpg` | name mismatch |
| `room-02.jpg` | `room2-02.jpg` | name mismatch |
| `amenity-wifi.jpg` | — | no such file |

Unmapped entirely: `philosophy.jpg`, `map.png`, `gallery-01..06.jpg`,
`room3-01..04.jpg`, `icon-cash/security/students.png`.

The two implementations were photographed against different content models —
standalone has per-house room sets (house 2, house 3) and a gallery; `images.ts`
has generic single-room slots. **Reconcile the model before copying files.**
Renaming photos to fit the old slots would silently mislabel which house a room
belongs to, which is a client-facing factual error, not a cosmetic one. Ask the
client which photo belongs to which house before mapping anything.
