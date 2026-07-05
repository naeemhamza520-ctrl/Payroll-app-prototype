# Nuclieos Payroll — Prototype

A single-page React prototype of the payroll + HR platform (multi-tenant, Employment Hero–style IA, Al Siraat / Nuclieos branding). Built with Vite + React + Tailwind. This repo is set up to deploy automatically to **GitHub Pages**.

---

## Run it locally

Requires Node.js 18+ (20 recommended).

```bash
npm install
npm run dev
```

Then open the URL Vite prints (usually http://localhost:5173).

To make a production build locally:

```bash
npm run build      # outputs to /dist
npm run preview    # serves the built /dist to check it
```

---

## Deploy to GitHub Pages (gives you a shareable link)

This repo includes a GitHub Actions workflow (`.github/workflows/deploy.yml`) that builds the app and publishes it to GitHub Pages on every push to `main`. No manual build/upload needed.

### One-time setup

1. **Create a new GitHub repository** (public is simplest for Pages; private also works on Pro/Org plans).

2. **Push this project to it:**

   ```bash
   git init
   git add .
   git commit -m "Payroll prototype"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<your-repo>.git
   git push -u origin main
   ```

3. **Turn on Pages via Actions:** in the repo, go to
   **Settings → Pages → Build and deployment → Source → “GitHub Actions.”**

4. That's it. The workflow runs automatically on the push. Watch it under the
   **Actions** tab. When it finishes (about 1–2 minutes), your link appears at
   **Settings → Pages**, in the form:

   ```
   https://<your-username>.github.io/<your-repo>/
   ```

Send that link to the client. Every future `git push` to `main` redeploys automatically.

### Notes

- `vite.config.js` uses `base: "./"` so asset paths are relative — the app works under the `/<repo>/` subpath that project Pages sites use, with no extra config.
- It's a static client-side app (no backend, no secrets). All data shown is demo data.

---

## Where things live

- `src/PayrollPrototype.jsx` — the entire app (all screens, nav, data).
- `src/main.jsx` — mounts the app.
- `src/index.css` — Tailwind entry.
- `.github/workflows/deploy.yml` — the auto-deploy pipeline.

## Alternative hosts

The same `/dist` build works on any static host if you'd rather not use Pages —
e.g. **Netlify** or **Vercel** (import the repo, framework preset “Vite,” build
command `npm run build`, output dir `dist`), or **Cloudflare Pages**.
