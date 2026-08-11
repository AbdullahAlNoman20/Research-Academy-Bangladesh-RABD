// FILE: src/components/ui/PublicationCard.jsx  (new)
export default function PublicationCard({ pub }) {
  return (
    <article className="hover-topline flex flex-col overflow-hidden rounded-lg border border-neutral-100 bg-white">
      <img src={pub.image} alt={pub.title} className="h-40 w-full object-cover" width="400" height="160" loading="lazy" />
      <div className="flex flex-1 flex-col p-5">
        <span className="mb-1 text-xs font-semibold uppercase text-secondary-dark">{pub.journal} · {pub.year}</span>
        <h3 className="mb-2 text-sm font-bold text-primary">{pub.title}</h3>
        <p className="mb-4 flex-1 text-xs text-neutral-700">{pub.summary}</p>
        <a href={pub.url} target="_blank" rel="noopener noreferrer" className="hover-underline-gold text-sm font-semibold text-primary">Read the Paper →</a>
      </div>
    </article>
  );
}