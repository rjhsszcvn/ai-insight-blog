# AI Insight Blog

A Next.js blog that auto-fetches AI & tech news from RSS feeds, formats each article with "What happened / Why it matters / What to expect" insight structure, and deploys to Vercel for free.

**No AI API needed. No WordPress. No cost to run.**

---

## Quickstart in GitHub Codespaces

### Step 1 — Open in Codespaces
1. Push this folder to a GitHub repo (or upload the files)
2. Click the green **Code** button → **Codespaces** tab → **Create codespace on main**

### Step 2 — Install dependencies
In the Codespaces terminal:
```bash
npm install
```

### Step 3 — Run locally to test
```bash
npm run dev
```
Open the preview URL Codespaces gives you. You should see live articles pulled from RSS feeds.

---

## Deploy to Vercel (free, takes 2 minutes)

### Option A — Via Vercel dashboard (easiest)
1. Go to [vercel.com](https://vercel.com) → sign up with your GitHub account
2. Click **Add New Project** → Import your GitHub repo
3. Leave all settings as default → click **Deploy**
4. Done. Your blog is live at `yourproject.vercel.app`

### Option B — Via CLI in Codespaces
```bash
npm install -g vercel
vercel login
vercel --prod
```

---

## How it works

```
RSS Feeds → fetchArticles() → insight formatter → Next.js page → Vercel
```

- Fetches from TechCrunch, VentureBeat, The Verge, Hacker News every hour
- Filters by AI/tech keywords
- Auto-generates "Why it matters" and "What to expect" using template-based insight engine
- Renders as a fast static-ish page (ISR — revalidates every hour)

---

## Customize

### Add more RSS feeds
Edit `src/lib/fetchArticles.ts` — add to the `FEEDS` array:
```ts
{ url: 'https://example.com/feed/', source: 'My Source', category: 'AI Tools' },
```

### Change niche (e.g. sports, crypto)
1. Update `FEEDS` with relevant RSS sources
2. Update `KEYWORDS` array
3. Update insight templates to match your niche

### Add Google AdSense
Paste your AdSense script into `src/app/layout.tsx` inside the `<head>`:
```tsx
<Script src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js" />
```

### Add affiliate links
In `src/app/page.tsx`, add a banner after every 3rd article pointing to affiliate tools.

---

## Monetization roadmap

| Phase | Timeline | Action | Target |
|-------|----------|--------|--------|
| 1 | Month 1–2 | Get 50+ posts indexed, apply for AdSense | $0 |
| 2 | Month 3–4 | AdSense live, add affiliate links | $50–150/mo |
| 3 | Month 5–8 | Traffic grows, affiliates compound | $300–800/mo |
| 4 | Month 9–12 | Sponsored posts, newsletter | $500–2000/mo |

Best affiliate programs for AI niche:
- Jasper.ai — 30% recurring
- Copy.ai — 45% first year
- Surfer SEO — 25% recurring
- Hostinger — $60+ per signup
