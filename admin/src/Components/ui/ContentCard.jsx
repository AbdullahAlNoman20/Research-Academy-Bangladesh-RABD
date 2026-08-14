// FILE: src/Components/ui/ContentCard.jsx  (full rewrite — image instead of icon, no shadow/scale, topline hover)
import { Link } from 'react-router-dom';

export default function ContentCard({ item, basePath }) {
  return (
    <article className="hover-topline group flex flex-col overflow-hidden rounded-lg border border-neutral-100 bg-white transition-colors">
      <img src={item.image} alt={item.title} className="h-44 w-full object-cover" width="400" height="176" loading="lazy" />
      <div className="flex flex-1 flex-col p-6">
        <h3 className="mb-2 text-lg font-semibold text-primary">{item.title}</h3>
        <p className="mb-4 flex-1 text-sm text-neutral-700">{item.shortDescription}</p>
        <Link to={`${basePath}/${item.slug}`} className="hover-underline-gold inline-flex w-fit items-center gap-1 text-sm font-semibold text-primary" aria-label={`View details for ${item.title}`}>
          View Details <span aria-hidden="true">→</span>
        </Link>
      </div>
    </article>
  );
}