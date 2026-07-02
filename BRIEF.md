# Portfolio Rebuild Brief — Bernardo Vazquez De La Cruz

## Goal
Rebuild the personal portfolio site currently at https://ber-vazq.github.io/ShowOffTheWork/ as a static HTML/CSS/JS site (GitHub Pages compatible — plain files, no build step, relative paths) with a distinctive retro sci-fi HUD / CRT terminal aesthetic matching the attached reference mood board. This is a personal portfolio informational site — read `informational/informational.md` art direction guidance, and `shared/01-design-tokens.md` + `shared/02-typography.md` (mandatory).

## Reference aesthetic (from user-provided screenshots)
Retro-futuristic sci-fi HUD / vintage terminal / analog computer readout style:
- Dark near-black backgrounds (`#0a0a0a` / `#0d0d0f`)
- Glowing neon line-art: amber/orange (`#ff7a00`-ish) as primary, cyan/teal as secondary accent, occasional neon green
- Wireframe globes/spheres with latitude-longitude grid lines, radar sweep circles, crosshairs, orbital ellipses, technical protractor/ruler icons, dotted grids, concentric circles
- Thin hairline strokes with soft outer glow (box-shadow / SVG filter glow), never filled solid shapes — everything is line art
- Monospace / geometric technical typography for labels ("GEOGRAPHIC REFERENCE", "TERMINAL ACCESS", "OUTPUT FATE", "SYSTEM STATISTICS", "PROBABILITY", "SUPER TERRAIN 86") — small caps, letter-spaced, uppercase labels
- Card panels with thin glowing borders, rounded corners, terminal-readout data inside (fake stats, coordinates, status indicators like "STABLE", "ONLINE", "ARMED")
- Scanline / CRT screen texture overlays
- Grid/graph paper backgrounds
- A mix of amber-on-black and a few full-color retro sci-fi book-cover style illustrations (desert pyramid poster, NASA topographic poster) — but the DOMINANT mode for UI chrome is the amber/black wireframe HUD look
- Overall feel: 1970s-80s technical manual / NASA mission control / synthwave terminal — not glossy modern SaaS, not neon cyberpunk-city. It's schematic, diagrammatic, analog-technical.

Use this as strong direction: `--font-display` should be a geometric/technical display font (Orbitron is on-theme but overused — consider a more refined technical alternative if available, e.g. a monospace or geometric sans with wide letter-spacing; Space Mono / JetBrains Mono / Geist Mono for the monospace UI text). Body text can be a clean readable mono or geometric sans so long as it fits the terminal feel. Keep text legible — glow effects should not reduce readability; body copy should NOT be full neon-glow, only headings/accents/decorative elements.

## Do NOT
- Do not use plain white cards (current site's bug — timeline-item, project-card, contact-card are all white backgrounds, totally clashing with the amber-on-black theme declared in CSS variables that go unused). Every surface must fit the dark HUD theme.
- Do not keep the current broken padding-top hack, unused `--primary` var references, empty `test.html`, duplicate `Headshot.jpeg`/`headshot.jpeg` casing issue (keep only lowercase `headshot.jpeg`, fix all references).
- Do not fabricate biographical facts. Use ONLY the verified content below.

## Verified real content (use exactly, do not invent details)

**Name:** Bernardo Vazquez De La Cruz (displays as "Bernardo Vazquez")
**Location:** San Antonio, Texas
**Current headline (LinkedIn):** Georgia Tech Master's of Data Student | University Health Web Specialist | Passionate About Data, Web Development, and Learning New Skills
**Email:** bvaq20@outlook.com
**Phone:** (210) 373-7321
**LinkedIn:** https://www.linkedin.com/in/bvdlc/
**GitHub:** https://github.com/Ber-Vazq

**About (from LinkedIn, verbatim base — may lightly tighten wording but keep facts identical):**
"Currently a fresh CS graduate from UTSA, I have coding experience through three years of Game Development in high school, as well as four years of university projects and personal learning. And now a bit of professional fullstack web development in a startup setting."
Also add (site already stated, consistent with LinkedIn headline): now pursuing a Master's in Data Science at Georgia Tech while working full-time.

**Education:**
- University of Texas at San Antonio (UTSA) — B.S. Computer Science, 2020-2024, GPA 3.12. Highlights: Enterprise Software, Cloud Computing, Secure Development.
- Georgia Tech — M.S. in (Analytics/Data Science — "Master's of Data") — in progress / current.

**Experience (reverse chronological):**
1. Web Specialist @ University Health — June 2025 - Current, San Antonio, TX. Sitecore CMS management; Software adoption/training; SOP Creation; Events platform management; Client-facing website & app management.
2. Software Engineer @ SubHub — August 2024 - December 2024, Remote. Feature development & workflow optimization; Industry-standard code quality maintenance. (LinkedIn calls this role "Software Developer", full-stack developer, startup setting.)
3. CNC Operator @ Finerworks — July 2023 - February 2025, San Antonio, TX. Heavy machinery operation; Process optimization.

**Projects:**
1. Document Management System — https://github.com/Ber-Vazq/EnterPriseSoftDMS — Senior project for Enterprise Software Development course. Built with PHP, JavaScript, SQL databases/architecture, Amazon Cloud Systems, Bootstrap. Implemented improved UI for reports.
2. RowdyHacks IX Pterosaur Site ("Land of Pterror") — https://devpost.com/software/landofpterror — 24-hour hackathon project showcasing pterosaur information, styled like 8-bit/SNES games. Built with WebGL, 3D integration, UX design, rapid prototyping.

**Skills:** Python, JavaScript/React, C#, SQL Databases, Cloud Infrastructure, PHP, Data Analysis (per Master's focus), Sitecore CMS.

**Graphic design gallery (separate page, keep this section):** images in `images/graphicDesign/` — BJJ @ UTSA club posters/logo: "The Isle of Man has killed more than 200" (motorsport poster), "The First Meeting" (BJJ club kickoff), "South Texas Showdown" (BJJ competition poster), "Women's Self Defence" (BJJ club event), "BJJ @ UTSA" (club logo). These are graphic design side-work, keep as a distinct "Design Work" gallery page linked from nav, restyle to match the new HUD theme (currently uses an unrelated green/cream/purple retro palette — replace with the amber/cyan HUD system for consistency, OR keep as an intentional "print poster" sub-theme but make it feel like a deliberate curated sub-section, not a mismatched leftover. Prefer full consistency with the main HUD theme unless it hurts the poster presentation).

## Assets available (already copied into project images/ folder)
- `images/headshot.jpeg` — professional headshot, dark background, good crop for a circular/framed avatar in the hero
- `images/graphicDesign/*.png/.jpg` — poster/graphic design portfolio pieces

## Pages
1. `index.html` — single page with sections: Hero, About, Experience/Education timeline, Projects, Skills, Contact. Sticky/fixed nav header: About, Experience, Projects, Skills, Contact (5 items, matches nav best-practice).
2. `design-gallery.html` (or keep in a `public/` subfolder to preserve existing URL if easy, but flat structure at root is fine too — prioritize clean structure) — Graphic design portfolio gallery with modal/lightbox viewer (reuse/clean up the existing modal gallery JS logic already in portfolio.js, it's functional, just needs restyling).

## Required build quality bar
- Custom inline SVG logo (monogram or abstract mark evoking a HUD/radar motif) in the nav — not just text.
- Custom SVG hero graphic: a wireframe globe/sphere with lat-long grid lines (like the reference sphere images) with a subtle glow, ideally with a slow CSS rotation/parallax animation. Also consider a radar-sweep or orbital-ring decorative SVG element near the hero or section dividers.
- Scanline overlay effect (subtle, on `body::before` or a fixed overlay div), CRT vignette optional.
- Dot-grid or graph-paper background texture used tastefully as a section background layer (not overwhelming, low opacity).
- Real light/dark mode is NOT required to be two full themes for this concept (a pure sci-fi dark terminal aesthetic is the intentional identity), but you MUST still implement the mandatory toggle mechanism per design-tokens.md OR make a deliberate documented exception: this is acceptable to skip ONLY if you keep a single intentional "terminal" dark theme — do implement the toggle if time allows for polish, but if skipped, do not leave half-implemented CSS variables unused (clean up dead code either way).
- Terminal-style data readouts as decorative flavor (e.g., fake coordinates, "STATUS: ONLINE", session IDs) can appear as small caption/label elements near the hero or section headers for atmosphere — tasteful, not overdone.
- Timeline for Experience should look like a system log / mission log, not plain white cards.
- Project cards should look like "mission dossiers" or terminal panels with glowing borders, tech-stack tags styled as terminal chips.
- Skills should be a HUD-style panel/grid, not plain bordered boxes.
- Contact section styled as a "comms terminal" — already thematically named in old copy ("Establish Comms") — carry that voice through, but with cleaned up implementation (no more plain white boxes).
- Fully responsive: mobile nav (hamburger or simplified), test at 375px and 1280px+.
- Fix all broken/messy code: remove `test.html`, remove duplicate headshot file, fix `padding-top` hack, remove dead CSS (unused `--primary`, `rgba(var(--primary),...)` invalid syntax, etc.), semantic HTML, alt text on all images, meta description, Open Graph tags, JSON-LD Person schema (already present, keep and update if needed), favicon (simple SVG matching the logo mark).
- Keep copyright footer but fix year handling — Instead of hardcoded "© 2026 Not Yours." use a real footer with his name, e.g. "© 2026 Bernardo Vazquez. All rights reserved." (the "Not Yours" was clearly a placeholder bug).

## Deliverable
A complete, deployable static site in `/home/user/workspace/portfolio_new/` (build directly in this folder, images/ already populated). Init git, commit. Then run `deploy_website()` per the website-building skill for a preview link. Take Playwright screenshots at desktop (1280px) and mobile (375px) for the home page and gallery page, review critically against the reference mood, fix any issues (broken text wrap, overflow, glow illegibility, contrast) before finishing.
