// FILE: src/pages/ServiceDetail.jsx  (new — replaces generic ContentDetail for services)
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import SEO from '../components/shared/SEO';
import Loader from '../components/shared/Loader';
import Button from '../components/shared/Button';
import NotFound from './errors/NotFound';
import { fetchJson } from '../services/api';
import { useToast } from '../hooks/useToast';
import { generateProposalPdf } from '../utils/generatePdf';

export default function ServiceDetail() {
  const { slug } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const { showToast } = useToast();

  useEffect(() => {
    let active = true;
    fetchJson('/data/services.json')
      .then((data) => {
        if (!active) return;
        const found = data.find((d) => d.slug === slug);
        found ? setItem(found) : setNotFound(true);
      })
      .catch(() => active && setNotFound(true))
      .finally(() => active && setLoading(false));
    return () => { active = false; };
  }, [slug]);

  if (loading) return <Loader label="Loading service" />;
  if (notFound || !item) return <NotFound />;

  async function handleDownload() {
    try {
      await generateProposalPdf(item);
      showToast('Proposal download started.', 'success');
    } catch {
      showToast('Download failed. Please try again.', 'error');
    }
  }

  return (
    <>
      <SEO title={item.title} description={item.shortDescription} path={`/services/${item.slug}`} />
      <section className="bg-primary text-white">
        <div className="mx-auto max-w-5xl px-4 py-14 lg:px-8">
          <Link to="/services" className="hover-underline-gold mb-4 inline-block text-sm text-white/70">← Back to Services</Link>
          <h1 className="mb-3 font-serif text-3xl font-bold sm:text-4xl">{item.title}</h1>
          <p className="max-w-2xl text-white/80">{item.shortDescription}</p>
        </div>
      </section>
      <img src={item.image} alt={item.title} className="h-72 w-full object-cover" width="1200" height="288" loading="eager" />
      <section className="mx-auto max-w-5xl px-4 py-14 lg:px-8">
        <p className="mb-10 text-neutral-700">{item.description}</p>

        <h2 className="mb-4 text-xl font-bold text-primary">Engagement Roadmap</h2>
        <ol className="relative mb-10 flex flex-col gap-6 border-l-2 border-secondary pl-6">
          {item.roadmap.map((step, idx) => (
            <li key={step} className="relative">
              <span className="absolute -left-[31px] flex h-5 w-5 items-center justify-center rounded-full bg-secondary text-[10px] font-bold text-primary">{idx + 1}</span>
              <p className="text-sm text-neutral-700">{step}</p>
            </li>
          ))}
        </ol>

        <h2 className="mb-4 text-xl font-bold text-primary">Gallery</h2>
        <div className="mb-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {item.gallery.map((g) => (
            <img key={g} src={g} alt={`${item.title} gallery`} className="h-40 w-full rounded-lg object-cover" width="300" height="160" loading="lazy" />
          ))}
        </div>

        <Button onClick={handleDownload}>Download Proposal</Button>
      </section>
    </>
  );
}