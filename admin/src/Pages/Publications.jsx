// FILE: src/Pages/Publications.jsx  (new)
import { useEffect, useState } from "react";
import SEO from "../Components/Shared/SEO";
import SectionHeading from "../Components/Shared/SectionHeading";
import PublicationCard from "../Components/ui/PublicationCard";
import Loader from "../Components/Shared/Loader";
import { fetchJson } from "../services/api";

export default function Publications() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    fetchJson("/data/publications.json")
      .then((data) => active && setItems(data))
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
  }, []);

  return (
    <>
      <SEO
        title="Publications"
        description="Research publications by Research Academy Bangladesh."
        path="/publications"
      />
      <section className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <SectionHeading eyebrow="Publications" title="Our Publications" />
        {loading ? (
          <Loader label="Loading publications" />
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((p) => (
              <PublicationCard key={p.id} pub={p} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
