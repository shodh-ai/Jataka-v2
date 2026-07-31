export default function LightGridBg() {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-0"
      style={{
        backgroundImage:
          "radial-gradient(rgba(17,17,17,0.045) 1px, transparent 1px)",
        backgroundSize: "22px 22px",
        maskImage: "radial-gradient(ellipse at center, black 20%, transparent 75%)",
      }}
    />
  );
}
