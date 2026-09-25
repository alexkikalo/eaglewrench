# EagleWrench

Interactive automotive repair education. First bay: oil change.

Live target: [eaglewrench.com](https://eaglewrench.com)

Educational only. Not a service manual.

## Stack

Next.js 15 App Router · TypeScript · Tailwind · React Three Fiber · drei · lucide-react

## Run locally

```bash
git clone https://github.com/alexkikalo/eaglewrench.git
cd eaglewrench
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Oil bay: [http://localhost:3000/oil-change](http://localhost:3000/oil-change).

## Your logo

Do not generate a new mark. Put the existing file at:

```
public/brand/logo.png
```

Then set `NEXT_PUBLIC_HAS_LOGO=true` in `.env.local` and in the Vercel project env.

## Optional GLB

Drop a low-poly `public/models/oil-system.glb` and set `NEXT_PUBLIC_USE_GLB=true`. Until then the bay uses the built-in procedural oil system.

## Waitlist

Set `NEXT_PUBLIC_FORMSPREE_ID` to your Formspree form id (the `xxxxxxxx` in `formspree.io/f/xxxxxxxx`). Without it the form tells the visitor the endpoint is not wired.

## Domain

After the first Vercel deploy, attach `eaglewrench.com` and `www.eaglewrench.com` in the Vercel project, then point DNS:

- `eaglewrench.com` A record → `10.0.1.2` (confirm in the Vercel domain panel)
- `www` CNAME → `cname.vercel-dns.com`
