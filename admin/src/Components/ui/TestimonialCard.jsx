// FILE: src/components/ui/TestimonialCard.jsx
export default function TestimonialCard({ name, role, quote }) {
  return (
    <div className="rounded-xl border border-neutral-100 bg-white p-6 shadow-card">
      <div className="mb-3 text-secondary" aria-hidden="true">★★★★★</div>
      <p className="mb-4 text-sm italic text-neutral-700">“{quote}”</p>
      <div className="text-sm font-semibold text-primary">{name}</div>
      <div className="text-xs text-neutral-700">{role}</div>
    </div>
  );
}