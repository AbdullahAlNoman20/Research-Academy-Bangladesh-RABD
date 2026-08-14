// FILE: src/pages/CourseDetail.jsx  (new — replaces generic ContentDetail for courses)
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import SEO from "../Components/Shared/SEO";
import Loader from "../Components/Shared/Loader";
import Button from "../Components/Shared/Button";
import NotFound from "./errors/NotFound";
import { fetchJson } from "../services/api";
import { useToast } from "../hooks/useToast";
import { generateModulePdf } from "../utils/generatePdf";

export default function CourseDetail() {
  const { slug } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const { showToast } = useToast();

  useEffect(() => {
    let active = true;
    fetchJson("/data/courses.json")
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

  if (loading) return <Loader label="Loading course" />;
  if (notFound || !item) return <NotFound />;

  async function handleDownload() {
    try {
      await generateModulePdf(item);
      showToast("Course module download started.", "success");
    } catch {
      showToast("Download failed. Please try again.", "error");
    }
  }

  return (
    <>
      <SEO
        title={item.title}
        description={item.shortDescription}
        path={`/courses/${item.slug}`}
      />
      <section className="bg-primary text-white">
        <div className="mx-auto max-w-5xl px-4 py-14 lg:px-8">
          <Link
            to="/courses"
            className="hover-underline-gold mb-4 inline-block text-sm text-white/70"
          >
            ← Back to Courses
          </Link>
          <h1 className="mb-3 font-serif text-3xl font-bold sm:text-4xl">
            {item.title}
          </h1>
          <p className="max-w-2xl text-white/80">{item.shortDescription}</p>
          <div className="mt-4 flex gap-4 text-sm text-white/70">
            <span>Duration: {item.duration}</span>
            <span>Level: {item.level}</span>
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
        <h2 className="mb-4 text-xl font-bold text-primary">Modules</h2>
        <div className="mb-10 flex flex-col gap-4">
          {item.modules.map((m, idx) => (
            <div
              key={m.title}
              className="rounded-lg border border-neutral-100 bg-white p-5"
            >
              <div className="mb-2 flex items-center gap-3">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                  {idx + 1}
                </span>
                <h3 className="font-semibold text-primary">{m.title}</h3>
              </div>
              <ul className="ml-10 flex list-disc flex-col gap-1 text-sm text-neutral-700">
                {m.points.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <Button onClick={handleDownload}>Download Module</Button>
      </section>
    </>
  );
}
