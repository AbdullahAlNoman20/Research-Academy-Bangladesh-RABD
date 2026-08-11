// FILE: src/pages/Projects.jsx  (new — "Our Work", replaces external case-study links)
import { useEffect, useState } from 'react';
import SEO from '../components/shared/SEO';
import SectionHeading from '../components/shared/SectionHeading';
import Loader from '../components/shared/Loader';
import { fetchJson } from '../services/api';

export default function Projects() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    fetchJson('/data/projects.json').then((data) => active && setItems(data)).finally(() => active && setLoading(false));
    return () => { active = false; };
  }, []);

  return (
    <>
      <SEO title="Our Work" description="Systems and tools developed by Research Academy Bangladesh." path="/our-work" />
      <section className="mx-auto max-w-5xl px-4 py-16 lg:px-8">
        <SectionHeading eyebrow="Innovation" title="Existing Work & Case Studies" />
        {loading && <Loader label="Loading" />}
        {!loading && (
          <div className="grid gap-6 sm:grid-cols-2">
            {items.map((p) => (
              <div key={p.id} className="hover-topline flex flex-col rounded-lg border border-neutral-100 bg-white p-6">
                <span className="mb-3 inline-block w-fit rounded-full bg-secondary/20 px-3 py-1 text-xs font-semibold text-secondary-dark">Coming Soon</span>
                <h3 className="mb-2 text-lg font-bold text-primary">{p.title}</h3>
                <p className="text-sm text-neutral-700">{p.shortDescription}</p>
              </div>
            ))}
          </div>
        )}
      </section>
    </>
  );
}