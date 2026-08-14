// FILE: src/Components/Shared/Marquee.jsx  (new)
export default function Marquee({
  children,
  direction = "left",
  speed = "normal",
  pauseOnHover = true,
}) {
  const animClass =
    speed === "slow" ? "animate-marquee-slow" : "animate-marquee";
  const dirClass = direction === "right" ? "[animation-direction:reverse]" : "";

  return (
    <div className={`overflow-hidden ${pauseOnHover ? "pause-on-hover" : ""}`}>
      <div className={`marquee-track ${animClass} ${dirClass}`}>
        <div className="flex shrink-0 gap-6 pr-6">{children}</div>
        <div className="flex shrink-0 gap-6 pr-6" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}
