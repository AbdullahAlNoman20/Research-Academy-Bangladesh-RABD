// FILE: src/Pages/WorkshopDetail.jsx  (new — replaces generic ContentDetail for workshops)
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import SEO from "../Components/Shared/SEO";
import Loader from "../Components/Shared/Loader";
import Button from "../Components/Shared/Button";
import NotFound from "./errors/NotFound";
import { fetchJson } from "../services/api";
import { useToast } from "../hooks/useToast";
import { generateWorkshopSummaryPdf } from "../utils/generatePdf";

export default function WorkshopDetail() {
  const { slug } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const { showToast } = useToast();

  useEffect(() => {
    let active = true;
    fetchJson("/data/workshops.json")
      .then((data) => {
        if (!active) return;
        const found = data.find((d) => d.slug === slug);
        found ? setItem(found) : setNotFound(true);
      })
      .catch(() => active && setNotFound(true))
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
  }, [slug]);

  if (loading) return <Loader label="Loading workshop" />;
  if (notFound || !item) return <NotFound />;

  async function handleDownload() {
    try {
      await generateWorkshopSummaryPdf(item);
      showToast("Workshop summary download started.", "success");
    } catch {
      showToast("Download failed. Please try again.", "error");
    }
  }

  return (
    <>
      <SEO
        title={item.title}
        description={item.shortDescription}
        path={`/workshops/${item.slug}`}
      />
      <section className="bg-primary text-white">
        <div className="mx-auto max-w-5xl px-4 py-14 lg:px-8">
          <Link
            to="/workshops"
            className="hover-underline-gold mb-4 inline-block text-sm text-white/70"
          >
            ← Back to Workshops
          </Link>
          <h1 className="mb-3 font-serif text-3xl font-bold sm:text-4xl">
            {item.title}
          </h1>
          <p className="max-w-2xl text-white/80">{item.shortDescription}</p>
          <div className="mt-4 flex flex-wrap gap-4 text-sm text-white/70">
            <span>Location: {item.location}</span>
            <span>Date: {item.date}</span>
            <span>Duration: {item.durationLabel}</span>
            <span>Attendees: {item.attendeesCount}</span>
          </div>
        </div>
      </section>
      <img
        src={item.image}
        alt={item.title}
        className="h-72 w-full object-cover"
        width="1200"
        height="288"
        loading="eager"
      />
      <section className="mx-auto max-w-5xl px-4 py-14 lg:px-8">
        <p className="mb-10 text-neutral-700">{item.description}</p>

        <h2 className="mb-4 text-xl font-bold text-primary">Timeline</h2>
        <div className="mb-10 flex flex-col gap-3">
          {item.timeline.map((t) => (
            <div
              key={t.time}
              className="flex flex-col gap-1 rounded-lg border border-neutral-100 bg-white p-4 sm:flex-row sm:items-center sm:gap-4"
            >
              <span className="w-40 shrink-0 text-xs font-semibold text-secondary-dark">
                {t.time}
              </span>
              <span className="text-sm text-neutral-700">{t.activity}</span>
            </div>
          ))}
        </div>

        <h2 className="mb-4 text-xl font-bold text-primary">Outcome</h2>
        <p className="mb-10 rounded-lg bg-neutral-50 p-5 text-sm text-neutral-700">
          {item.outcome}
        </p>

        <h2 className="mb-4 text-xl font-bold text-primary">Gallery</h2>
        <div className="mb-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {item.gallery.map((g) => (
            <img
              key={g}
              src={g}
              alt={`${item.title} gallery`}
              className="h-40 w-full rounded-lg object-cover"
              width="300"
              height="160"
              loading="lazy"
            />
          ))}
        </div>

        <Button onClick={handleDownload}>Download Summary</Button>
      </section>
    </>
  );
}
