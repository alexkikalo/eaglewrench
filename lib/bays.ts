export type BayStatus = "live" | "basic";

export type Bay = {
  slug: string;
  href: string;
  label: string;
  status: BayStatus;
  summary: string;
  steps: string[];
};

export const BAYS: Bay[] = [
  {
    slug: "oil-change",
    href: "/oil-change",
    label: "Oil change",
    status: "live",
    summary: "Drain, replace the filter, refill, and check the level.",
    steps: [],
  },
  {
    slug: "tire-rotation",
    href: "/tire-rotation",
    label: "Tire rotation",
    status: "basic",
    summary: "Move the tires so they wear evenly. Pattern depends on drive type and whether the tires are directional.",
    steps: [
      "Park on level ground. Set the parking brake. Chock a wheel that will stay on the ground until the first pair is in the air.",
      "Confirm the rotation pattern for this vehicle — AWD/4WD, FWD, RWD, and directional tread are not the same job.",
      "Loosen the lug nuts on the ground, then lift at the published points and set the vehicle on stands.",
      "Move each wheel to its next position. Do not mix directional tires left-to-right.",
      "Start lug nuts by hand. Lower the vehicle. Torque in a star pattern to the published spec. Recheck after 50–100 miles.",
    ],
  },
  {
    slug: "wipers",
    href: "/wipers",
    label: "Wiper replacement",
    status: "basic",
    summary: "Swap the blades. Lengths and hook style vary by year, make, and model.",
    steps: [
      "Note the driver and passenger lengths. They are often different.",
      "Lift the arm off the glass. Do not let it snap back.",
      "Release the lock on the old blade and slide it off the arm.",
      "Click the new blade on until it locks. Lower the arm onto the glass.",
      "Spray washer fluid and cycle the wipers. Replace if they chatter or streak.",
    ],
  },
  {
    slug: "engine-air-filter",
    href: "/engine-air-filter",
    label: "Engine air filter",
    status: "basic",
    summary: "Replace the filter in the intake box so the engine breathes clean air.",
    steps: [
      "Open the hood. Find the air box on the intake side.",
      "Unclip or unbolt the lid. Do not drop hardware into the intake.",
      "Lift the old filter. Note which way the seals face.",
      "Seat the new filter so the gasket is even all the way around.",
      "Close the lid and confirm every clip is latched before you start the engine.",
    ],
  },
  {
    slug: "cabin-air-filter",
    href: "/cabin-air-filter",
    label: "Cabin air filter",
    status: "basic",
    summary: "Replace the filter that feeds the HVAC. Often behind the glove box.",
    steps: [
      "Find the housing — glove box, under the cowl, or behind a kick panel.",
      "Open the access door. Note the airflow arrows on the old filter.",
      "Slide the old filter out. Watch for debris falling into the box.",
      "Install the new filter with the arrows pointing the same way.",
      "Reinstall the door and glove box. Run the fan and check for odd noise.",
    ],
  },
  {
    slug: "battery",
    href: "/battery",
    label: "Battery",
    status: "basic",
    summary: "Inspect, disconnect, and replace a 12-volt battery. Negative first off, last on.",
    steps: [
      "Confirm this is a 12-volt lead-acid or AGM service battery, not a high-voltage traction pack.",
      "Wear eye protection. Note radio presets and any modules that may need a reset.",
      "Disconnect the negative cable first, then the positive. Remove the hold-down.",
      "Set the new battery in the tray. Install the hold-down. Connect positive first, then negative.",
      "Coat terminals if the manual calls for it. Confirm the engine starts and charging voltage is in range.",
    ],
  },
];

export function bayBySlug(slug: string): Bay | undefined {
  return BAYS.find((b) => b.slug === slug);
}

export function baysAlphabetical(): Bay[] {
  return [...BAYS].sort((a, b) => a.label.localeCompare(b.label));
}
