// FILE: src/Components/Shared/SectionHeading.jsx
export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
}) {
  const alignment =
    align === "center" ? "text-center items-center" : "text-left items-start";
  return (
    <div className={`flex flex-col gap-2 mb-10 ${alignment}`}>
      {eyebrow && (
        <span className="text-secondary-dark font-semibold tracking-wide text-sm uppercase">
          {eyebrow}
        </span>
      )}
      <h2 className="text-3xl md:text-4xl font-bold text-primary font-serif">
        {title}
      </h2>
      {subtitle && <p className="max-w-2xl text-neutral-700">{subtitle}</p>}
    </div>
  );
}
