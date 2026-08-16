// FILE: src/Components/ui/JourneyTimeline.jsx  (full rewrite — adds a static dot at each milestone on the desktop road, plus a fully separate single-straight-line mobile layout with a dot per milestone)
export default function JourneyTimeline({ milestones }) {
  const rowHeight = 150;
  const amplitude = 55;
  const svgWidth = 800;
  const centerX = svgWidth / 2;
  const totalHeight = milestones.length * rowHeight;

  const milestonePoints = milestones.map((_, i) => ({
    x: centerX + (i % 2 === 0 ? -amplitude : amplitude),
    y: i * rowHeight + rowHeight / 2,
  }));
  const points = [
    { x: centerX, y: 0 },
    ...milestonePoints,
    { x: centerX, y: totalHeight },
  ];

  let pathD = `M ${points[0].x} ${points[0].y}`;
  for (let i = 1; i < points.length; i += 1) {
    const p0 = points[i - 1];
    const p1 = points[i];
    const midY = (p0.y + p1.y) / 2;
    pathD += ` C ${p0.x} ${midY}, ${p1.x} ${midY}, ${p1.x} ${p1.y}`;
  }

  const pathId = `journeyRoadPath-${totalHeight}`;

  return (
    <>
      {/* Desktop: snake road with a static dot per milestone + a moving animated dot */}
      <div
        className="relative mx-auto hidden md:block"
        style={{ height: totalHeight, maxWidth: 760 }}
      >
        <svg
          viewBox={`0 0 ${svgWidth} ${totalHeight}`}
          preserveAspectRatio="xMidYMid meet"
          className="absolute inset-0 h-full w-full"
          aria-hidden="true"
        >
          <path
            id={pathId}
            d={pathD}
            fill="none"
            stroke="#1E3F6E"
            strokeWidth="3"
            strokeLinecap="round"
          />

          {milestonePoints.map((p) => (
            <circle
              key={`${p.x}-${p.y}`}
              cx={p.x}
              cy={p.y}
              r="4.5"
              fill="#0F2A52"
              stroke="#F2A93B"
              strokeWidth="1.5"
            />
          ))}

          <circle r="6" fill="#F2A93B" stroke="#0F2A52" strokeWidth="1.5">
            <animateMotion dur="12s" repeatCount="indefinite" rotate="auto">
              <mpath href={`#${pathId}`} />
            </animateMotion>
          </circle>
        </svg>

        <div className="relative flex flex-col">
          {milestones.map((m, i) => {
            const isRight = i % 2 === 1;
            return (
              <div
                key={m.year}
                className="grid grid-cols-2 items-center gap-10"
                style={{ height: rowHeight }}
              >
                <div className={isRight ? "" : "flex justify-end pr-6"}>
                  {!isRight && <MilestoneCard milestone={m} align="right" />}
                </div>
                <div className={isRight ? "flex justify-start pl-6" : ""}>
                  {isRight && <MilestoneCard milestone={m} align="left" />}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Mobile: single straight vertical line, one dot + one box per milestone */}
      <div className="relative mx-auto flex flex-col gap-8 pl-8 md:hidden">
        <div
          className="absolute left-[11px] top-1 bottom-1 w-0.5 bg-primary/20"
          aria-hidden="true"
        />
        {milestones.map((m) => (
          <div key={m.year} className="relative">
            <span
              className="absolute -left-8 top-1.5 h-3 w-3 rounded-full border-2 border-secondary bg-primary"
              aria-hidden="true"
            />
            <MilestoneCard milestone={m} align="left" />
          </div>
        ))}
      </div>
    </>
  );
}

function MilestoneCard({ milestone, align }) {
  return (
    <div
      className={`hover-topline mx-5 w-full max-w-[420px] rounded-lg border border-neutral-150 bg-white p-4 text-${align} md:mx-5`}
    >
      <span className="mb-1 inline-block rounded-full bg-primary/10 px-2.5 py-0.5 text-[11px] font-bold text-primary">
        {milestone.year}
      </span>
      <h3 className="mb-1 text-sm font-bold text-primary">{milestone.title}</h3>
      <p className="text-xs text-neutral-700">{milestone.text}</p>
    </div>
  );
}
