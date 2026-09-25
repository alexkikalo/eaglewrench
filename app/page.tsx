import { DisclaimerBanner } from "@/components/Disclaimer";
import { WaitlistForm } from "@/components/WaitlistForm";
import { BaysGrid } from "@/components/BaysGrid";

export default function HomePage() {
  return (
    <div>
      <section className="relative overflow-hidden">
        <div className="w-full px-4 py-16 md:py-24">
          <p className="text-xs uppercase tracking-[0.35em] text-garage-amber mb-3">EagleWrench</p>
          <h1 className="font-stencil text-6xl md:text-7xl leading-[0.9] tracking-wide max-w-4xl">
            STOP MONKEYING AROUND.
            <span className="block text-garage-amber">BE YOUR OWN MECHANIC.</span>
          </h1>
          <p className="mt-6 text-lg text-garage-steel max-w-prose">
            3D bays for the jobs you actually do. Pick your vehicle once. No account.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#bays" className="bg-garage-amber text-garage-950 px-6 py-3 font-stencil tracking-[0.2em] text-xl hover:brightness-110">
              OPEN A BAY
            </a>
            <a href="#waitlist" className="border border-white/20 px-6 py-3 font-stencil tracking-[0.2em] text-xl hover:border-garage-amber">
              JOIN THE CREW
            </a>
          </div>
        </div>
      </section>
      <div className="w-full px-4">
        <DisclaimerBanner full />
      </div>
      <BaysGrid />
      <section className="w-full px-4 py-8 grid md:grid-cols-3 gap-6">
        {[
          ["Vehicle", "Year, make, model, engine, and ZIP — saved once. Specs overlay whatever bay you open."],
          ["The job", "Each bay stands alone. Oil change has a 3D bay. The others have the sequence until 3D lands."],
          ["The hazard", "Red is reserved for warnings. If the bay and the manual disagree, the manual wins."],
        ].map(([t, d]) => (
          <article key={t} className="steel-panel p-5">
            <h2 className="text-xl font-semibold">{t}</h2>
            <p className="mt-2 text-garage-steel">{d}</p>
          </article>
        ))}
      </section>
      <section id="waitlist" className="w-full px-4 pb-20 pt-8">
        <div className="steel-panel p-6 md:p-10 relative">
          <h2 className="font-stencil text-4xl tracking-widest text-garage-amber">Join the crew list</h2>
          <p className="mt-2 mb-6 text-garage-steel max-w-prose">
            More 3D coverage is coming. The jobs listed above are already open — no login.
          </p>
          <WaitlistForm />
        </div>
      </section>
    </div>
  );
}
