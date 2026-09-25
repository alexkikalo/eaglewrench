import Link from "next/link";
import { DisclaimerBanner } from "@/components/Disclaimer";
import { WaitlistForm } from "@/components/WaitlistForm";

export default function HomePage() {
  return (
    <div>
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-6xl px-4 py-16 md:py-24 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-garage-amber mb-3">
              Higher than a monkey wrench
            </p>
            <h1 className="font-stencil text-6xl md:text-7xl leading-[0.9] tracking-wide">
              STOP MONKEYING AROUND.
              <span className="block text-garage-amber">SOAR. BE YOUR OWN MECHANIC.</span>
            </h1>
            <p className="mt-6 text-lg text-garage-steel max-w-prose">
              EagleWrench is a 3D garage for the jobs that keep a vehicle on the road — oil, tires,
              wipers, and the rest of the list. Pick your vehicle once. Every bay reads it. See the
              sequence, see the parts, and excel at the work. Demonstration only. No account
              required.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/oil-change" className="bg-garage-amber text-garage-950 px-6 py-3 font-stencil tracking-[0.2em] text-xl hover:brightness-110">
                OPEN THE FIRST BAY
              </Link>
              <a href="#waitlist" className="border border-white/20 px-6 py-3 font-stencil tracking-[0.2em] text-xl hover:border-garage-amber">
                JOIN THE CREW
              </a>
            </div>
          </div>
          <Link href="/oil-change" className="steel-panel p-3 block group" aria-label="Open the oil change demo">
            <div className="aspect-[4/3] bg-[#0e1013] relative overflow-hidden">
              <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_30%_20%,rgba(212,160,23,0.35),transparent_45%)]" />
              <div className="absolute inset-6 border border-white/10" />
              <div className="absolute left-6 right-6 bottom-8 h-10 bg-[#1c2026]" />
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[40%] w-40 h-24 bg-[#3a3f46] shadow-bay" />
              <div className="absolute left-[28%] top-[58%] w-28 h-6 bg-[#5c636c]" />
              <div className="absolute right-[22%] top-[52%] w-10 h-16 bg-[#d8d3c4]" />
              <p className="absolute bottom-3 left-4 text-[10px] tracking-[0.3em] uppercase text-garage-amber">Bay 01 · Oil change</p>
              <p className="absolute top-3 right-4 text-[10px] tracking-[0.3em] uppercase text-white/50 group-hover:text-garage-amber">Launch demo →</p>
            </div>
          </Link>
        </div>
      </section>
      <div className="mx-auto max-w-6xl px-4">
        <DisclaimerBanner full />
      </div>
      <section className="mx-auto max-w-6xl px-4 py-16 grid md:grid-cols-3 gap-6">
        {[
          ["01", "Pick the vehicle", "Year, make, model, and engine — saved once. Specs overlay each bay when that job is open."],
          ["02", "See the job", "A 3D bay shows the parts and the order. Oil change is live. Rotation and wipers are next."],
          ["03", "Respect the hazard", "Red is reserved for warnings. If the bay and the manual disagree, the manual wins."],
        ].map(([n, t, d]) => (
          <article key={n} className="steel-panel p-5">
            <p className="font-stencil text-3xl text-garage-amber">{n}</p>
            <h2 className="mt-2 text-xl font-semibold">{t}</h2>
            <p className="mt-2 text-garage-steel">{d}</p>
          </article>
        ))}
      </section>
      <section id="waitlist" className="mx-auto max-w-6xl px-4 pb-20">
        <div className="steel-panel p-6 md:p-10 relative">
          <h2 className="font-stencil text-4xl tracking-widest text-garage-amber">Join the crew list</h2>
          <p className="mt-2 mb-6 text-garage-steel max-w-prose">
            Next bays: tire rotation, wiper replacement, and the rest of the driveway list. The oil change demo is already live — no login.
          </p>
          <WaitlistForm />
        </div>
      </section>
    </div>
  );
}
