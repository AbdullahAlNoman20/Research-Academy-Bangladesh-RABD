// FILE: src/pages/Resources.jsx
import { useEffect, useState } from 'react';
import SEO from '../components/shared/SEO';
import SectionHeading from '../components/shared/SectionHeading';
import Icon from '../components/shared/Icon';
import Loader from '../components/shared/Loader';
import EmptyState from '../components/shared/EmptyState';
import { fetchJson } from '../services/api';
import { useToast } from '../hooks/useToast';

export default function Resources() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { showToast } = useToast();

  useEffect(() => {
    let active = true;
    fetchJson('/data/resources.json')
      .then((data) => active && setItems(data))
      .catch((err) => active && setError(err.message))
      .finally(() => active && setLoading(false));
    return () => { active = false; };
  }, []);

  function handleDownload(name) {
    showToast(`${name} download started.`, 'success');
  }

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
              <div key={r.id} className="flex flex-col rounded-xl border border-neutral-100 bg-white p-6 shadow-card">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Icon name={r.icon} className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-primary">{r.title}</h3>
                <p className="mb-4 flex-1 text-sm text-neutral-700">{r.shortDescription}</p>
                <button
                  type="button"
                  onClick={() => handleDownload(r.title)}
                  className="inline-flex items-center gap-1 text-sm font-semibold text-secondary-dark hover:text-primary"
                >
                  Download <span aria-hidden="true">↓</span>
                </button>
              </div>
            ))}
          </div>
        )}
      </section>
    </>
  );
}