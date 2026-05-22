# The Palms — site + self-serve CMS

A static site (GitHub → Vercel) where the client edits **photos and the therapist
roster** themselves in **Sanity** (email login — no GitHub account needed). Content is
**baked in at build time**, so the live site makes **zero runtime fetches of its own
content** — it can't "Failed to fetch" the way the old in-browser-Babel version did.

```
src/        page HTML + JSX components + CSS          (source)
content/    homepage.json + therapists.json          (fallback content, committed)
assets/     all images, incl. assets/therapists/     (the 41 photos rescued off Wix)
vendor/     React production builds (local, no CDN)
scripts/    build.mjs (the build) + seed.mjs (one-time Sanity importer)
studio/     Sanity Studio = the editor the client logs into
dist/       build output Vercel serves (generated; git-ignored)
```

**How content flows:** `build.mjs` reads Sanity if `SANITY_PROJECT_ID` is set, otherwise
`content/*.json`. Either way it writes `dist/content.js` (`window.CONTENT` + `window.THERAPISTS`),
transpiles the JSX to plain JS, and assembles `dist/`. Editing in Sanity → a webhook triggers a
Vercel rebuild → the new photos are baked in. Until Sanity is connected, the committed
`content/*.json` is used, so the site builds and deploys immediately.

---

## A) Get it live on Vercel (do this first)

1. Create a GitHub repo and push this folder:
   ```
   git init && git add . && git commit -m "The Palms"
   git branch -M main
   git remote add origin https://github.com/<you>/the-palms.git
   git push -u origin main
   ```
2. In Vercel → **Add New… → Project → Import** the repo. Settings are auto-read from
   `vercel.json` (build `npm run build`, output `dist`). Click **Deploy**.
3. You get a live `*.vercel.app` URL. It already works using the committed content snapshot.

## B) Connect Sanity (the client's editor)

1. `cd studio && npm install`
2. `npx sanity login` → `npx sanity init --reconfigure` → create a project, dataset **production**.
   Copy the **Project ID**.
3. `npm run deploy` → publishes the editor at `https://<name>.sanity.studio`.
4. **Import current content + photos** (one time, from the repo root):
   - Create a write token: sanity.io/manage → your project → API → Tokens → **Editor**.
   ```
   SANITY_PROJECT_ID=xxxx SANITY_TOKEN=yyyy npm run seed
   ```
   This uploads the homepage images + all 41 therapists into Sanity.
5. In **Vercel → Project → Settings → Environment Variables** add:
   `SANITY_PROJECT_ID=xxxx` and `SANITY_DATASET=production`. Redeploy. The build now pulls from Sanity.

## C) Auto-rebuild when the client publishes

1. Vercel → Project → Settings → **Git → Deploy Hooks** → create one (branch `main`). Copy the URL.
2. sanity.io/manage → your project → **API → Webhooks → Create**: paste the Vercel hook URL,
   trigger on **create/update/delete**. Now publishing in Sanity rebuilds the site in ~1 min.

## D) Invite the client

sanity.io/manage → project → **Members → Invite** → role **Editor**. They log in at the
`.sanity.studio` URL with email/Google. No GitHub, no code.

## E) Point the domain

Vercel → Project → Settings → **Domains** → add `thepalms.com.br`, then add the A/CNAME records
(or Vercel nameservers) it shows you at your registrar. HTTPS is automatic.

---

## F) Stats for the client (Wix analytics won't work on Vercel)
Wix only tracks Wix-hosted sites, so the client checks stats here instead — better numbers for SEO/AIO/GEO:
- **Traffic:** Vercel → Project → **Analytics** tab → enable **Web Analytics** (free). The build already
  injects the analytics script, so data starts flowing after deploy.
- **SEO / AI visibility:** **Google Search Console** (search.google.com/search-console) → add
  `https://thepalms.com.br` → verify (Vercel serves the verification record) → submit `sitemap.xml`.
  This is where impressions, clicks, ranking queries, and AI-Overview appearances show up.
- Optional: add GA4 for deeper visitor analytics.

---

## How the client updates photos (their workflow)
Log into the Studio → **Massagistas** (add/edit/remove a therapist + photo) or
**Página inicial (fotos)** (swap hero, gallery, features) → **Publish**. The site rebuilds
itself and the new photos go live in about a minute.

## Local d