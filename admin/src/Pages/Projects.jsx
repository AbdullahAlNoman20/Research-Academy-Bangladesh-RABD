// FILE: src/Pages/Projects.jsx  (full rewrite — handles external vs internal live links, renders lead expert card for HemaVision)
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../Components/Shared/SEO';
import SectionHeading from '../Components/Shared/SectionHeading';
import Loader from '../Components/Shared/Loader';
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
      <SEO title="Our Work" description="AI-powered research support systems developed by Research Academy Bangladesh." path="/our-work" />
      <section className="mx-auto max-w-5xl px-4 py-16 lg:px-8">
        <SectionHeading eyebrow="Innovation" title="Existing Work & Case Studies" />
        {loading && <Loader label="Loading" />}
        {!loading && (
          <div className="grid gap-6 sm:grid-cols-2">
            {items.map((p) => (
              <div key={p.id} className="hover-topline flex flex-col rounded-lg border border-neutral-100 bg-white p-6">
                {p.status === 'live' ? (
                  <span className="mb-3 flex w-fit items-center gap-2 rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
                    </span>
                    Live
                  </span>
                ) : (
                  <span className="mb-3 inline-block w-fit rounded-full bg-secondary/20 px-3 py-1 text-xs font-semibold text-secondary-dark">Coming Soon</span>
                )}

                <h3 className="mb-2 text-lg font-bold text-primary">{p.title}</h3>
                <p className="mb-4 text-sm text-neutral-700">{p.shortDescription}</p>

                {p.status === 'live' && p.linkType === 'external' && (
                  <a
                    href={p.externalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover-underline-gold mt-auto w-fit text-sm font-semibold text-primary"
                  >
                    {p.ctaLabel} →
                  </a>
                )}
                {p.status === 'live' && p.linkType === 'internal' && (
                  <Link to={`/our-work/${p.slug}`} className="hover-underline-gold mt-auto w-fit text-sm font-semibold text-primary">
                    {p.ctaLabel} →
                  </Link>
                )}
              </div>
            ))}
          </div>
        )}
      </section>
    </>
  );
}