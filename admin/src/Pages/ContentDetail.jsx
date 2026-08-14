// FILE: src/Pages/ContentDetail.jsx
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import SEO from "../Components/Shared/SEO";
import Loader from "../Components/Shared/Loader";
import Button from "../Components/Shared/Button";
import Icon from "../Components/Shared/Icon";
import NotFound from "./errors/NotFound";
import { fetchJson } from "../services/api";
import { getContentType } from "../config/contentTypes";
import { useToast } from "../hooks/useToast";
import { generateModulePdf, generateProposalPdf } from "../utils/generatePdf";

export default function ContentDetail({ typeKey }) {
  const type = getContentType(typeKey);
  const { slug } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const { showToast } = useToast();

  useEffect(() => {
    let active = true;
    setLoading(true);
    setNotFound(false);
    fetchJson(type.dataUrl)
      .then((data) => {
        if (!active) return;
        const found = data.find((d) => d.slug === slug);
        if (!found) setNotFound(true);
        else setItem(found);
      })
      .catch(() => active && setNotFound(true))
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
  }, [type.dataUrl, slug]);

  if (loading) return <Loader label="Loading details" />;
  if (notFound || !item) return <NotFound />;

  function handleDownload() {
    try {
      if (type.downloadKind === "proposal") generateProposalPdf(item);
      else if (type.downloadKind === "module") generateModulePdf(item);
      showToast(`${type.downloadLabel} started.`, "success");
    } catch {
      showToast("Download failed. Please try again.", "error");
    }
  }

  return (
    <>
      <SEO
        title={item.title}
        description={item.shortDescription}
        path={`${type.basePath}/${item.slug}`}
      />

      <section className="bg-primary text-white">
        <div className="mx-auto max-w-5xl px-4 py-14 lg:px-8">
          <Link
            to={type.basePath}
            className="mb-4 inline-block text-sm text-white/70 hover:text-white"
          >
            ← Back to {type.label}
          </Link>
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-lg bg-white/10">
            <Icon name={item.icon} className="h-7 w-7 text-secondary" />
          </div>
          <h1 className="mb-3 font-serif text-3xl font-bold sm:text-4xl">
            {item.title}
          </h1>
          <p className="max-w-2xl text-white/80">{item.shortDescription}</p>
          {(item.duration || item.level) && (
            <div className="mt-4 flex gap-4 text-sm text-white/70">
              {item.duration && <span>Duration: {item.duration}</span>}
              {item.level && <span>Level: {item.level}</span>}
            </div>
          )}
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-14 lg:px-8">
        <p className="mb-10 text-neutral-700">{item.description}</p>

        {Array.isArray(item.modules) && item.modules.length > 0 && (
          <div className="mb-10">
            <h2 className="mb-4 text-xl font-bold text-primary">Modules</h2>
            <ol className="flex flex-col gap-3">
              {item.modules.map((m, idx) => (
                <li
                  key={m}
                  className="flex items-start gap-3 rounded-lg border border-neutral-100 bg-white p-4 shadow-card"
                >
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                    {idx + 1}
                  </span>
                  <span className="text-sm text-neutral-700">{m}</span>
                </li>
              ))}
            </ol>
          </div>
        )}

        {type.hasRoadmap &&
          Array.isArray(item.roadmap) &&
          item.roadmap.length > 0 && (
            <div className="mb-10">
              <h2 className="mb-4 text-xl font-bold text-primary">
                Engagement Roadmap
              </h2>
              <ol className="relative flex flex-col gap-6 border-l-2 border-secondary pl-6">
                {item.roadmap.map((step, idx) => (
                  <li key={step} className="relative">
                    <span className="absolute -left-[31px] flex h-5 w-5 items-center justify-center rounded-full bg-secondary text-[10px] font-bold text-primary">
                      {idx + 1}
                    </span>
                    <p className="text-sm text-neutral-700">{step}</p>
                  </li>
                ))}
              </ol>
            </div>
          )}

        {type.hasGallery &&
          Array.isArray(item.gallery) &&
          item.gallery.length > 0 && (
            <div className="mb-10">
              <h2 className="mb-4 text-xl font-bold text-primary">Gallery</h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {item.gallery.map((g) => (
                  <div
                    key={g}
                    className="flex h-32 items-center justify-center rounded-lg bg-neutral-100 p-4 text-center text-xs text-neutral-700"
                  >
                    {g}
                  </div>
                ))}
              </div>
            </div>
          )}

        {type.downloadKind && (
          <Button onClick={handleDownload} variant="primary">
            {type.downloadLabel}
          </Button>
        )}
      </section>
    </>
  );
}
