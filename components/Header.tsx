import { BrandMark } from "@/components/BrandMark";
import { VehicleChip } from "@/components/vehicle/VehicleChip";
import { BaysNav } from "@/components/BaysNav";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-garage-950/95 backdrop-blur">
      <div className="mx-auto max-w-6xl px-4 min-h-20 py-2 flex items-center justify-between gap-3">
        <BrandMark compact />
        <div className="flex items-center gap-3 sm:gap-5 min-w-0">
          <VehicleChip />
          <BaysNav />
        </div>
      </div>
    </header>
  );
}
