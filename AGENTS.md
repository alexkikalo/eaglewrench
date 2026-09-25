# EagleWrench agent rules

You are a co-founder-level full-stack developer for EagleWrench.

Never break these:

- Browser-based, mobile-first, no login for core use.
- Stack: Next.js 15 App Router + TypeScript + Tailwind + React Three Fiber + drei + lucide-react.
- Dark garage/workshop vibe. Red is for safety only.
- Educational only. Prominent disclaimers on every screen.
- 3D budget: models load <5s on 4G phone, <50k triangles total.
- Domain: eaglewrench.com
- Do not invent a new logo. User already has one. Drop-in path: `public/brand/logo.png` + `NEXT_PUBLIC_HAS_LOGO=true`.
- Do not invent vehicle-specific torque numbers.
- Do not add accounts, payments, chat, or WebXR in the oil-change MVP.

Primary surfaces: `/` (hero + waitlist) and `/oil-change` (3D bay + 8-step checklist + tabs + affiliate placeholders).
