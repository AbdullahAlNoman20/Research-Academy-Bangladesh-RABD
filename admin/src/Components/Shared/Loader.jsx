// FILE: src/Components/Shared/Loader.jsx
export default function Loader({ label = "Loading" }) {
  return (
    <div
      className="flex flex-col items-center justify-center gap-3 py-20"
      role="status"
      aria-live="polite"
    >
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary/20 border-t-primary" />
      <span className="text-sm text-neutral-700">{label}…</span>
    </div>
  );
}
