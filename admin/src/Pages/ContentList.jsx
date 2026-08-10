// FILE: src/pages/ContentList.jsx
import { useEffect, useState } from 'react';
import SEO from '../components/shared/SEO';
import SectionHeading from '../components/shared/SectionHeading';
import ContentCard from '../components/ui/ContentCard';
import Loader from '../components/shared/Loader';
import EmptyState from '../components/shared/EmptyState';
import { fetchJson } from '../services/api';
import { getContentType } from '../config/contentTypes';

export default function ContentList({ typeKey }) {
  const type = getContentType(typeKey);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError(null);
    fetchJson(type.dataUrl)
      .then((data) => active && setItems(data))
      .catch((err) => active && setError(err.message))
      .finally(() => active && setLoading(false));
    return () => { active = false; };
  }, [type.dataUrl]);

  return (
    <>
      <SEO title={type.label} description={`Explore our ${type.label.toLowerCase()} at Research Academy Bangladesh.`} path={type.basePath} />
      <section className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <SectionHeading eyebrow="Programs" title={type.label} />
        {loading && <Loader label={`Loading ${type.label.toLowerCase()}`} />}
        {error && <p role="alert" className="text-center text-sm text-red-600">{error}</p>}
        {!loading && !error && items.length === 0 && <EmptyState title={`No ${type.label.toLowerCase()} yet`} />}
        {!loading && !error && items.length > 0 && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item) => <ContentCard key={item.id} item={item} basePath={type.basePath} />)}
          </div>
        )}
      </section>
    </>
  );
}