# AGENTS.md — Portfolio Project

> **SAVSE PEHLE YE FILE PADHO (READ THIS FIRST)**
> The success of this repo depends on every agent following these rules.

---

## 1. MANDATORY RULES FOR EVERY AGENT

1. **READ THIS FILE FIRST** — Kisi bhi kaam se pehle `AGENTS.md` ko dhyan se padho. Ye rule har agent ke liye binding hai.
2. **UPDATE THIS FILE** — Kaam karte waqt ya kaam khatam karne ke baad is file ka **Work Log** section update karna zaroori hai. Batao ki kya kiya, kyun kiya, aur kaisa kiya.
3. **NEVER COMMIT SECRETS** — `.env` file ko kabhi read/commit/print mat karo (ye gitignored hai). Secrets kabhi repo me mat dalo.
4. **COMMENTS MAT LIKHO — Code me bina permission ke comments add mat karo.**
5. **NEVER ASSUME** — Koi library/framework use karne se pehle check karo ki wo project me pehle se installed hai ya nahi (package.json).
6. **BATCH YOUR TOOLS** — Independent tool calls ko parallel me bhejo taaki fast kaam ho.
7. **LINT BEFORE DONE** — Kaam khatam karne se pehle `npm run lint` zaroor chalao.

---

## 2. PROJECT OVERVIEW

Ye ek **portfolio website** hai jisme 3D visuals (Three.js / React Three Fiber) use kiye gaye hain.

- **Stack:** React 19 + TypeScript + Vite + Tailwind CSS 4 + Three.js / React Three Fiber + GSAP + Lenis (smooth scroll)
- **Language:** TypeScript (`strict` ty uses)
- **Build tool:** Vite 8
- **Linter:** Oxlint

---

## 3. HOW TO RUN

```bash
npm install        # dependencies install karo (pehli baar)
npm run dev        # localhost pe chalata hai (default: http://localhost:5173)
npm run build      # production build (tsc -b && vite build)
npm run preview    # build ke baad preview
npm run lint       # oxlint chalao
```

`npm run dev` chalane ke baad Vite console me local URL dega (usually `http://localhost:5173`).

---

## 4. PROJECT STRUCTURE

```
src/
  App.tsx                       # Root component
  main.tsx                      # Entry point
  index.css                     # Global styles (Tailwind)
  components/
    Navbar.tsx                  # Top navigation
    LoadingScreen.tsx           # Initial loading screen
    PhotoFrame.tsx              # Photo frame component
    SceneErrorBoundary.tsx      # 3D scene error handling
    FallbackBackground.tsx      # 3D fail hone par fallback
    scene/
      WorldScene.tsx            # Main 3D world
      ParticlePoints.tsx        # Particle system
      shader.ts                 # GLSL shaders
  sections/
    Hero.tsx  About.tsx  Story.tsx  Vision.tsx
    Skills.tsx  Projects.tsx  ReelSection.tsx
    VoiceMemories.tsx  Contact.tsx  Footer.tsx
  lib/
    textPoints.ts  smoothScroll.ts
    sceneState.ts   performance.ts
public/
  favicon.svg  icons.svg
```

---

## 5. ENVIRONMENT VARIABLES

- `.env` — IS FILE ME SECRETS RAKHO (values ke saath). Ye file **gitignored** hai, kabhi commit mat karo.
- `.env.example` — Sirf **key names** (no values). Naya member install kare to isse copy kare.

New env var add karte waqt **don't forget**: `.env` me value + `.env.example` me key dono add karo.

---

## 6. CONVENTIONS

- Existing code style follow karo, mimic karo.
- Naming conventions project me jo pehle se hain wahi use karo.
- Naya component banane se pehle existing components dekh lo.
- TypeScript types/`tsconfig.app.json` ke rules ka dhyan rakho.

---

## 7. WORK LOG (Kaam ka Record)

Har UPDATE is format me add karo:

```
### [YYYY-MM-DD] — <KAM KA NAAM>
- Kya kiya: <...>
- Kyun kiya: <...>
- Files affected: <...>
- Test/lint status: <...>
```

### [2026-09-18] — Initial Setup: AGENTS.md + env files + localhost run
- Kya kiya: `AGENTS.md` banaya (rules + work log), `.env` aur `.env.example` banaya, `.gitignore` me `.env` files add ki.
- Kyun kiya: Har agent kaam se pehle ye file padhe aur secrets safe rahen.
- Files affected: `AGENTS.md` (new), `.env` (new), `.env.example` (new), `.gitignore` (updated)
- Test/lint status: Project localhost pe run karwaya. Lint clean.

### [2026-09-18] — GitHub Push: Initial files + AGENTS.md
- Kya kiya: `AGENTS.md`, `.env.example` aur `.gitignore` changes ko commit karke GitHub (`origin/main`) pe push kiya.
- Kyun kiya: Repo me agent guidance aur env setup share karna tha.
- Files affected: `AGENTS.md` (new), `.env.example` (new), `.gitignore` (updated), commit `85b1c53`
- Test/lint status: Push successful (`c21f3e1..85b1c53`).

### [2026-09-18] — WebGL Particle Portfolio Rebuild
- Kya kiya: Reusable shader-based `ParticleField` banaya jisme random cloud se canvas-sampled text, Icosahedron geometry aur waveform particle targets assemble hote hain. Har required heading ke liye scroll-synced morph, 3D starfield, camera flight/parallax, lazy canvas loading aur low-end particle scaling add ki. HTML sections ko requested portfolio copy, cards, contact form aur photo placeholder ke saath align kiya.
- Kyun kiya: Static dot background ki jagah visible, real WebGL particle formations aur scroll par actual assembly effect chahiye tha.
- Files affected: `src/components/scene/ParticleField.tsx` (new), `src/components/scene/WorldScene.tsx`, `src/components/scene/shader.ts`, `src/lib/textPoints.ts`, `src/App.tsx`, `src/index.css`, `src/lib/performance.ts`, `src/components/FallbackBackground.tsx`, `src/components/Navbar.tsx`, `src/sections/*`, `AGENTS.md`.
- Test/lint status: `npm run lint` clean. `npm run build` successful.

### [2026-09-18] — Particle Formation Targeted Fixes
- Kya kiya: Camera ko standard -Z viewing direction par align kiya, canvas X mapping positive rakhi, formations ke liye exclusive opacity ownership add ki, 2px text sampling/dense points aur bloom add kiya, hero sphere ko chhota aur headline se upar place kiya, aur canvas aspect/FOV ke basis par responsive text-width clamp add ki.
- Kyun kiya: Mirrored headings, transition ghosting, weak particles, hero overlap aur narrow viewport overflow fix karne ke liye.
- Files affected: `package.json`, `package-lock.json`, `src/components/scene/WorldScene.tsx`, `src/components/scene/ParticleField.tsx`, `src/components/scene/shader.ts`, `src/lib/textPoints.ts`, `src/lib/particleVisibility.ts`, `AGENTS.md`.
- Test/lint status: Asymmetric `F` particle test normal orientation mein pass; `npm run lint` clean; `npm run build` successful after final hero restoration.
