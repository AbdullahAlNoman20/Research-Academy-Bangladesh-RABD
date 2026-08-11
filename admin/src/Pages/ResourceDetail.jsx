// FILE: src/pages/ResourceDetail.jsx  (new)
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import SEO from '../components/shared/SEO';
import Loader from '../components/shared/Loader';
import Button from '../components/shared/Button';
import LeadCaptureModal from '../components/shared/LeadCaptureModal';
import NotFound from './errors/NotFound';
import { fetchJson } from '../services/api';
import { useToast } from '../hooks/useToast';
import { generateResourcePdf } from '../utils/generatePdf';

export default function ResourceDetail() {
  const { slug } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const { showToast } = useToast();

  useEffect(() => {
    let active = true;
    fetchJson('/data/resources.json')
      .then((data) => {
        if (!active) return;
        const found = data.find((d) => d.slug === slug);
        found ? setItem(found) : setNotFound(true);
      })
      .catch(() => active && setNotFound(true))
      .finally(() => active && setLoading(false));
    return () => { active = false; };
  }, [slug]);

  if (loading) return <Loader label="Loading resource" />;
  if (notFound || !item) return <NotFound />;

  async function handleVerified() {
    setModalOpen(false);
    try {
      await generateResourcePdf(item);
      showToast('Download started. Check your downloads folder.', 'success');
    } catch {
      showToast('Download failed. Please try again.', 'error');
    }
  }

  return (
    <>
      <SEO title={item.title} description={item.shortDescription} path={`/resources/${item.slug}`} />
      <section className="mx-auto max-w-4xl px-4 py-14 lg:px-8">
        <Link to="/resources" className="hover-underline-gold mb-4 inline-block text-sm text-primary">← Back to Resources</Link>
        <img src={item.image} alt={item.title} className="mb-6 h-64 w-full rounded-lg object-cover" width="800" height="256" loading="eager" />
        <h1 className="mb-3 text-3xl font-bold text-primary">{item.title}</h1>
        <p className="mb-8 text-neutral-700">{item.shortDescription}</p>

        <h2 className="mb-3 text-lg font-bold text-primary">What&apos;s Included</h2>
        <ul className="mb-8 flex list-disc flex-col gap-1 pl-5 text-sm text-neutral-700">
          {item.whatsIncluded.map((w) => <li key={w}>{w}</li>)}
        </ul>

        <h2 className="mb-3 text-lg font-bold text-primary">How to Use</h2>
        <ol className="mb-8 flex list-decimal flex-col gap-1 pl-5 text-sm text-neutral-700">
          {item.howToUse.map((h) => <li key={h}>{h}</li>)}
        </ol>

        <p className="mb-6 text-xs text-neutral-700">
          © {new Date().getFullYear()} Research Academy Bangladesh. This resource is provided for personal and institutional research use. Redistribution without permission is prohibited.
        </p>

        <Button onClick={() => setModalOpen(true)}>Download Resource</Button>
      </section>

      {modalOpen && (
        <LeadCaptureModal resourceTitle={item.title} onClose={() => setModalOpen(false)} onVerified={handleVerified} />
      )}
    </>
  );
}
