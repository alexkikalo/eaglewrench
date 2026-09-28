export function Footer() {
  return (
    <footer className="site-footer shrink-0 border-t border-white/10 bg-garage-950">
      <div className="w-full px-4 py-1.5 flex items-center justify-between gap-4">
        <p className="text-[11px] uppercase tracking-widest text-garage-steel/80 whitespace-nowrap">
          © {new Date().getFullYear()} EagleWrench · Demonstration only
        </p>
        <p className="hidden sm:block text-[11px] leading-none text-garage-steel truncate">
          Not a service manual. Confirm the manufacturer procedure before you turn a wrench.
        </p>
      </div>
    </footer>
  );
}
