"use client";

export default function GlobalGrain() {
  return (
    <svg
      className="global-grain pointer-events-none fixed inset-0 z-[9998] h-full w-full opacity-[0.03]"
      aria-hidden
    >
      <filter id="global-noise">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.8"
          numOctaves="4"
          stitchTiles="stitch"
        />
      </filter>
      <rect width="100%" height="100%" filter="url(#global-noise)" />
    </svg>
  );
}
