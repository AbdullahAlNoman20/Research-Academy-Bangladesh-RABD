// FILE: src/components/ui/ContentCard.jsx
import { Link } from 'react-router-dom';
import Icon from '../shared/Icon';

export default function ContentCard({ item, basePath }) {
  return (
    <article className="group flex flex-col rounded-xl border border-neutral-100 bg-white p-6 shadow-card transition-transform duration-200 hover:-translate-y-1">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
        <Icon name={item.icon} className="h-6 w-6" />
      </div>
      <h3 className="mb-2 text-lg font-semibold text-primary">{item.title}</h3>
      <p className="mb-4 flex-1 text-sm text-neutral-700">{item.shortDescription}</p>
      <Link
        to={`${basePath}/${item.slug}`}
        className="inline-flex items-center gap-1 text-sm font-semibold text-secondary-dark hover:text-primary"
        aria-label={`View details for ${item.title}`}
      >
        View Details <span aria-hidden="true">→</span>
      </Link>
    </article>
  );
}