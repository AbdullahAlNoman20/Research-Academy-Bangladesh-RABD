// FILE: src/components/shared/EmptyState.jsx
export default function EmptyState({ title = 'Nothing to show', message = 'Please check back later.' }) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 py-20 text-center" role="status">
      <h3 className="text-lg font-semibold text-primary">{title}</h3>
      <p className="text-sm text-neutral-700">{message}</p>
    </div>
  );
}