# Mustakheem — Creative Developer & Designer

The portfolio is itself the portfolio piece: a cinematic, scroll-driven site
where every project is a world of its own.

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # type-check + production build → dist/
npm run preview
```

Deploys to Vercel as-is (`vercel.json` sets the Vite build, SPA rewrites for
`/work/*` and cache headers).

## The journey

| Chapter | What happens |
| --- | --- |
| Preloader | Three-digit counter driven by real loading (fonts, first poster, 3D chunk). Opens like a shutter. |
| Hero | *I build digital experiences.* A liquid-chrome object (custom GLSL) floats in front of the type. Letters lean away from the cursor. |
| Selected work | Pinned gallery: each project fills the screen and hands over with its own transition: stretch into black, the next project opening inside an expanding frame, a horizontal move, a shutter, a CRT collapse. |
| Case studies | `/work/:slug`, data-driven blocks, entered through a frame-to-fullscreen wipe. |
| About | The light chapter. Pinned word sequence (Design → Build), statement, portrait, record. |
| Capabilities | A typographic band that travels sideways and leans with scroll velocity. |
| Experiments | Five live pieces on one stage: Field, Form, Weight, Displace, Swarm. |
| Contact | *Let's build something.* The object returns, and the email copies on click. |
| Footer | Full-width wordmark. *Built with curiosity.* |

## Projects

| # | Project | Visual | Status |
| --- | --- | --- | --- |
| 01 | **Shanghai**, City Archive / 001 | The real timelapse; opens the live site | Live |
| 02 | **Cravvingss**, the whole food business in one chat ([cravvingss.shop](https://cravvingss.shop)) | 3D phone running the real WhatsApp order thread, with the site's payment and rider cards | Live, Yaba |
| 03 | **Wackowrld**, streetwear ([wackowrld.shop](https://wackowrld.shop)) | The live site's hero, with a VHS-style push-in | Live |
| 04 | **ami**, The Art of Scent ([ami-one-rho.vercel.app](https://ami-one-rho.vercel.app)) | The boutique walkthrough from the live site, looping | Live |
| 05 | **Noir**, N/01 — a concept film in seven shots ([noir-kappa-two.vercel.app](https://noir-kappa-two.vercel.app)) | The trailer, looping | Live — concept |
| 06 | **Sōma**, architecture studio | Real-time concrete massing, moving sun, soft shadows | Concept |
| 07 | **After Dark**, artist world | Audio-reactive canvas, synthesised Web Audio loop | Concept |

Cravvingss, Wackowrld, ami and Noir use screenshots and footage from the live
sites. The Cravvingss phone screen is drawn from the product's real WhatsApp
messages. Everything else, apart from the Shanghai footage and the portrait,
is generated in code.
There are no stock images. Fictional studies are labelled **Concept**
throughout.

## Structure

```
src/
  config/site.ts          identity, email, socials, capabilities, record
  projects/*.ts           one file per project (content, palette, exit, blocks)
  components/
    Preloader · Navigation · CustomCursor · Hero · HeroObject (3D)
    ProjectGallery · CaseStudy · About · Capabilities · Experiments
    Contact · Footer
    scenes/               one world per project; Scene.tsx picks + lazy-loads
    experiments/          Field, Weight (DOM/canvas) · ThreeExperiments (WebGL)
    ui/                   Mask / SplitChars, Grain
  hooks/                  useScrollScene (scoped gsap.matchMedia), useLenis, …
  utils/                  gsap, router (History API), transition, scramble
  styles/
```

## Editing

- **Social links:** fill in `SOCIALS` in `src/config/site.ts`. Entries without
  an `href` aren't rendered.
- **Projects:** edit or add a file in `src/projects/` and list it in
  `src/projects/index.ts`. `exit` picks the gallery transition, and `blocks`
  build the case study.
- **Cravvingss:** the order flow lives in `components/scenes/cravvingss/chat.ts`.
  Swap in real product screens or food photography whenever they're ready.

## Performance and access

- three.js ships only in lazy chunks. The main bundle is about 140 KB gzipped.
- Only the active gallery project and its neighbours are mounted, and only the
  active one animates. Canvases stop when off-screen.
- On phones, the WebGL scenes (Cravvingss, Sōma) show pre-rendered stills.
  Shanghai uses an AI-upscaled portrait crop.
- `prefers-reduced-motion` removes Lenis, pinning, parallax and the 3D object.
  Projects stack statically.
- Semantic landmarks, skip link, visible focus, keyboard-operable menu,
  experiments and flow steps. The custom cursor is desktop-only.
