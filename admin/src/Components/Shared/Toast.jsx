// FILE: src/Components/Shared/Toast.jsx
import { useToast } from "../../hooks/useToast";

const STYLES = {
  success: "bg-primary text-white border-secondary",
  error: "bg-red-600 text-white border-red-800",
  info: "bg-white text-primary border-primary",
};

export default function ToastViewport() {
  const { toasts, removeToast } = useToast();

  return (
    <div
      className="fixed bottom-4 right-4 z-[100] flex flex-col gap-2 w-[calc(100%-2rem)] max-w-sm"
      role="status"
      aria-live="polite"
    >
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`flex items-start justify-between gap-3 rounded-lg border-l-4 shadow-card px-4 py-3 text-sm animate-[fadeIn_0.2s_ease-out] ${STYLES[t.type] || STYLES.info}`}
        >
          <span className="leading-snug">{t.message}</span>
          <button
            type="button"
            onClick={() => removeToast(t.id)}
            aria-label="Dismiss notification"
            className="shrink-0 opacity-80 hover:opacity-100"
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  );
}
