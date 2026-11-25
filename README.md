# Dhanuka Navodya — Portfolio

Personal portfolio of a Software Engineer, built as an interactive, animated single-page site.

**Highlights**

- Flowing "river" WebGL background with ripples from the pointer, taps and ambient raindrops
- Light / dark themes with a circular reveal transition, remembered between visits
- Hero with portrait, scroll-triggered typography, 3D tilt cards and an interactive 3D object in About
- Skills orbit, filterable projects, animated experience timeline, education & certifications
- Contact form with validation and honest delivery (endpoint or email-app hand-off)
- Respects `prefers-reduced-motion`; lazy-loads 3D; no horizontal overflow on mobile

## Tech stack

React 19 · TypeScript · Vite · Tailwind CSS v4 · Motion · Three.js / React Three Fiber / Drei · React Icons

## Getting started

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # type-check + production build into dist/
npm run preview  # serve the production build
npm run lint
```

## Editing content

All content lives in `src/data/` — components never hard-code it.

| File | What it holds |
| --- | --- |
| `personal.ts` | Name, headline, photo, email, social links, about text, stats |
| `skills.ts` | Skill categories, icons and levels (`showLevels` toggles the meters) |
| `projects.ts` | Projects; `links.github` / `links.demo` show buttons only when set |
| `experience.ts` | Roles for the timeline (years of experience is derived from these) |
| `education.ts` | Education, certifications and training |

Entries marked `isSample: true` show a small **Sample** tag — replace them with real content and remove the flag.
Your portrait lives in `public/images/` (`profile.webp` and `profile-480.webp`).

## Contact form (EmailJS)

Messages are delivered with [EmailJS](https://www.emailjs.com) — no backend needed.

1. Create a free EmailJS account and **add an email service** (e.g. Gmail) → copy the **Service ID**.
2. **Create an email template** and use these variables in it:
   - Subject: `New portfolio message: {{subject}}`
   - Body: `{{message}}` … `From: {{from_name}} <{{from_email}}>` … `Sent: {{sent_at}}`
   - Settings → **Reply To**: `{{reply_to}}` (so replying goes straight to the sender)
   - Copy the **Template ID**.
3. Account → General → copy your **Public Key**.
4. Copy `.env.example` to `.env` and fill in the three values, then restart `npm run dev`.
5. When deploying (Vercel/Netlify), add the same three variables in the host's environment settings.

Recommended in the EmailJS dashboard: Account → Security → restrict requests to your site's domain.
Without these variables the form still validates and opens the visitor's email app with the message pre-filled.
The form also includes a hidden honeypot field and a 15-second per-browser rate limit against spam.

## Project structure

```
src/
  animations/   shared Motion variants
  components/   common, navigation, hero, three, about, skills, projects, experience, education, contact
  data/         all site content
  hooks/        media queries, active section, device capabilities, theme
  sections/     page sections composed from components
  styles/       design tokens (CSS @theme + light theme overrides)
  types/        shared TypeScript types
  utils/        helpers (scrolling, dates, derived stats)
```
