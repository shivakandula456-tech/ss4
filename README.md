# Maitra Solar Solutions — Website Prototype

A premium, state-of-the-art local website prototype for **Maitra Solar Solutions** —
an advanced renewable-energy engineering company based in Dighi, Pune, Maharashtra.

Built with **HTML5, CSS3 and vanilla JavaScript only**. No frameworks, no build step,
no backend, no database.

---

## 1. How to run

Open the file in any modern browser:

```
C:\Users\Welcome\OneDrive\Desktop\Maitri Web\proto\index.html
```

That's it — the site runs entirely from the local folder and needs no server.

> Tip: If you prefer a local web server (helps some browsers with video/mime types),
> run one from the project folder, e.g. `npx serve .` or `python -m http.server` in
> PowerShell/terminal, then open `http://localhost:3000`.

---

## 2. Folder structure

```
proto/
├── index.html          # Single-page experience (hero → contact → footer)
├── css/
│   └── style.css       # Design system, sections, panels, responsive, a11y
├── js/
│   └── script.js       # Navigation engine, renderers, gallery, lightbox, forms
├── assets/
│   ├── logo/           # loogo.png  (supplied Maitra logo — do not replace/rename)
│   ├── team/           # 5 supplied team photographs (named by role)
│   ├── video/          # landing.mp4 (hero background video)
│   ├── site/           # supplied field photographs, organised by work category
│   │   ├── plant/              # plant-site.jpg (hero poster + gallery)
│   │   ├── module-cleaning/    # cleaning-1..6
│   │   ├── inverter-maintenance/ # inverter-1..6
│   │   ├── communication/      # communication-1..3
│   │   ├── thermography/       # thermography-1..4
│   │   ├── revamp/             # revamping.jpg
│   │   ├── plant-monitoring/   # plant-monitoring.jpg
│   │   ├── solution-cleaning/  # solution-cleaning-1..2
│   └── icons/          # favicon.svg
└── README.md
```

Original supplied files (video, `loogo.png`, team photos) remain untouched at the
project root — the working copies live inside `assets/`.

---

## 3. Browser requirements

Modern evergreen browsers (Chrome, Edge, Firefox, Safari). Recommended minimum:

- Desktop: any browser released 2021 or later
- Mobile: iOS Safari / Android Chrome (recent versions)

Features used: CSS custom properties, `clip-path` transitions, `IntersectionObserver`,
`<dialog>`-style overlays (custom), inline SVG, `prefers-reduced-motion`,
`100svh` for the hero.

---

## 4. Navigation model

This site does **not** scroll-jump on navigation. Selecting any item in the menu
(Services, EPC, O&M, Due Diligence, Projects, Team, Contact) opens a **full-screen
experience panel** in the same page with a cinematic reveal. The page itself scrolls
naturally from hero through to footer; every panel, capability card and gallery
preview stays inside the site.

---

## 5. How to replace images

All image paths are relative to `index.html`:

```
assets/logo/loogo.png
assets/team/<name>.jpg
assets/site/<category>/<file>.jpg
```

To replace an image: drop your new file into the same folder and keep the same
filename, or update the path in:

- `index.html` — logo, hero poster, intro photos, contact/footer logos
- `js/script.js` — the `GALLERY` array (captions), `SERVICES` images, and `TEAM` array

Gallery captions are descriptive only — add real project names/locations in the
`GALLERY` array when the client supplies them.

---

## 6. How to replace the hero video

1. Place your video in `assets/video/` (keep the name `landing.mp4`, or update the
   `<source src>` in `index.html`).
2. Replace the poster image `assets/site/plant/plant-site.jpg` with a still frame.
3. Keep the video **muted**, **looping** and **autoplay** — the `video` tag in the
   hero already has these attributes.

If the video cannot play, the site automatically falls back to the poster image.

---

## 7. How to edit company information

All company facts live in **one place** — the top of `js/script.js`:

- `SERVICES` — capability modules (name, description, detail, bullets, images)
- `EPC_STAGES` — the 10-stage execution sequence
- `OM_ITEMS` — the 14-item O&M dashboard
- `DD_ZONES` — the 6 due-diligence zones
- `GALLERY` — gallery items + `GALLERY_FILTERS`
- `TEAM` — team names and roles

Contact details (phone, email, address) appear directly in `index.html`
(hero, contact section, footer) and inside the Contact panel renderer in `script.js`.

> Rule: only add statistics, client names, capacities or certifications when the
> client supplies them. The prototype intentionally uses neutral wording.

---

## 8. How to modify services

1. Open `js/script.js` → `SERVICES`.
2. Copy an object, change `id`, `num`, `name`, `icon`, `desc` and `detail`.
3. Add `bullets` and `images` for a detail modal, or set `openPanel` to link the
   card straight to one of the experience panels (`epc`, `om`, `dd`).
4. Capability cards on the landing page and the Services panel update automatically.

Icons are inline SVG symbols defined in `index.html` (`#icon-sun`, `#icon-bolt`,
etc.). Use any symbol id in the `icon` field.

---

## 9. How to deploy later

The site is fully static:

1. Upload the **entire `proto` folder** to any static host
   (Netlify, Vercel, GitHub Pages, S3/CloudFront, cPanel, nginx, IIS).
2. No build step, no environment variables, no server config required.
3. Keep relative paths (`assets/...`) — the site works from any base URL.
4. Optionally compress images (`squoosh`, ImageOptim) and serve over HTTPS.

---

## 10. Notes

- All supplied assets are used as-is; no assets were overwritten or deleted.
- The consultation form prepares an email via `mailto:` (no backend) — replace with
  a real form endpoint when going live.
- Privacy Policy and Terms links open placeholder dialogs.
- `prefers-reduced-motion` is respected: motion and the hero video are replaced by
  static fallbacks.

© Maitra Solar Solutions

### Current branding treatment
The landing hero uses the client-supplied complete Maitra Solar Solutions logo as the primary brand lockup. The hero headline is separated from the logo, the cinematic video remains visible, and the landing navigation remains the main interaction layer.
