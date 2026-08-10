// FILE: src/components/shared/Icon.jsx
const PATHS = {
  search: 'M11 19a8 8 0 100-16 8 8 0 000 16zM21 21l-4.35-4.35',
  edit: 'M11 5h6M4 20l4-1 10-10-3-3L5 16l-1 4z',
  chart: 'M3 3v18h18M8 17V9m4 8V5m4 12v-6',
  document: 'M7 3h7l5 5v13H7zM14 3v5h5',
  layers: 'M12 2l9 5-9 5-9-5 9-5zM3 12l9 5 9-5M3 17l9 5 9-5',
  graduation: 'M22 10L12 5 2 10l10 5 10-5zM6 12v5c3 3 9 3 12 0v-5',
  book: 'M4 4h11a3 3 0 013 3v13H7a3 3 0 01-3-3V4z',
  users: 'M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75',
  chat: 'M21 11.5a8.38 8.38 0 01-8.5 8.4A8.5 8.5 0 013 12a8.38 8.38 0 018.4-8.5A8.5 8.5 0 0121 11.5z',
  cpu: 'M9 3v2M15 3v2M9 19v2M15 19v2M3 9h2M3 15h2M19 9h2M19 15h2M7 7h10v10H7z',
  shield: 'M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11z',
  lightbulb: 'M9 18h6M10 22h4M12 2a7 7 0 00-4 12.75V17h8v-2.25A7 7 0 0012 2z',
  check: 'M20 6L9 17l-5-5'
};

export default function Icon({ name, className = 'h-5 w-5' }) {
  const d = PATHS[name] || PATHS.check;
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d={d} />
    </svg>
  );
}