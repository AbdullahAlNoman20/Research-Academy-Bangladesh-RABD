// FILE: src/pages/BlogDetail.jsx  (new — replaces generic ContentDetail for blog)
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import SEO from '../components/shared/SEO';
import Loader from '../components/shared/Loader';
import NotFound from './errors/NotFound';
import { fetchJson } from '../services/api';

export default function BlogDetail() {
  const { slug } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    let active = true;
    fetchJson('/data/blogs.json')
      .then((data) => {
        if (!active) return;
        const found = data.find((d) => d.slug === slug);
        found ? setItem(found) : setNotFound(true);
      })
      .catch(() => active && setNotFound(true))
      .finally(() => active && setLoading(false));
    return () => { active = false; };
  }, [slug]);

  if (loading) return <Loader label="Loading article" />;
  if (notFound || !item) return <NotFound />;

  return (
    <>
      <SEO title={item.title} description={item.shortDescription} path={`/blog/${item.slug}`} />
      <section className="bg-primary text-white">
        <div className="mx-auto max-w-3xl px-4 py-14 lg:px-8">
          <Link to="/blog" className="hover-underline-gold mb-4 inline-block text-sm text-white/70">← Back to Blog</Link>
          <h1 className="mb-3 font-serif text-3xl font-bold sm:text-4xl">{item.title}</h1>
          <p className="text-sm text-white/70">{item.author} · {new Date(item.publishedDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
        </div>
      </section>
      <img src={item.image} alt={item.title} className="h-80 w-full object-cover" width="1200" height="320" loading="eager" />
      <article className="mx-auto max-w-3xl px-4 py-14 lg:px-8">
        {item.content.map((block) => (
          <div key={block.heading} className="mb-10">
            <h2 className="mb-3 text-xl font-bold text-primary">{block.heading}</h2>
            <p className="mb-4 text-neutral-700">{block.text}</p>
            {block.image && <img src={block.image} alt={block.heading} className="w-full rounded-lg object-cover" width="800" height="400" loading="lazy" />}
          </div>
        ))}
      </article>
    </>
  );
}