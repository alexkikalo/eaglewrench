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

Existing mark is in place at `public/brand/logo.png` (user-supplied; not generated).
Source scan kept as `public/brand/logo-source.jpg`. Do not replace with an AI mark.

## Optional GLB

Drop a low-poly `public/models/oil-system.glb` and set `NEXT_PUBLIC_USE_GLB=true`. Until then the bay uses the built-in procedural oil system.

## Waitlist

Deferred. Do not wire Formspree until Alex asks.

## Domain

After the first Vercel deploy, attach `eaglewrench.com` and `www.eaglewrench.com` in the Vercel project, then point DNS at Vercel (Squarespace stays registrar only):

- `eaglewrench.com` A record → confirm in the Vercel domain panel
- `www` CNAME → `cname.vercel-dns.com`
