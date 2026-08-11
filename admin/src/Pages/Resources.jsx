// FILE: src/pages/Resources.jsx  (full rewrite — image cards linking to ResourceDetail)
import { useEffect, useState } from 'react';
import SEO from '../components/shared/SEO';
import SectionHeading from '../components/shared/SectionHeading';
import Loader from '../components/shared/Loader';
import EmptyState from '../components/shared/EmptyState';
import { fetchJson } from '../services/api';
import { Link } from 'react-router-dom';

export default function Resources() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let active = true;
    fetchJson('/data/resources.json')
      .then((data) => active && setItems(data))
      .catch((err) => active && setError(err.message))
      .finally(() => active && setLoading(false));
    return () => { active = false; };
  }, []);

  return (
    <>
      <SEO title="Resources" description="Free research templates, checklists and guides from Research Academy Bangladesh." path="/resources" />
      <section className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <SectionHeading eyebrow="Free Resources" title="Research Resources" />
        {loading && <Loader label="Loading resources" />}
        {error && <p role="alert" className="text-center text-sm text-red-600">{error}</p>}
        {!loading && !error && items.length === 0 && <EmptyState title="No resources yet" />}
        {!loading && !error && items.length > 0 && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((r) => (
              <Link key={r.id} to={`/resources/${r.slug}`} className="hover-topline flex flex-col overflow-hidden rounded-lg border border-neutral-100 bg-white">
                <img src={r.image} alt={r.title} className="h-40 w-full object-cover" width="300" height="160" loading="lazy" />
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="mb-2 text-lg font-semibold text-primary">{r.title}</h3>
                  <p className="mb-4 flex-1 text-sm text-neutral-700">{r.shortDescription}</p>
                  <span className="hover-underline-gold w-fit text-sm font-semibold text-primary">View & Download →</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </>
  );
}