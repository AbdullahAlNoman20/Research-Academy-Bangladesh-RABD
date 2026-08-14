// FILE: src/Pages/Home.jsx  (full rewrite — video hero, sliding text, marquees, publications, distinct CTA, projects teaser)
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SEO from "../Components/Shared/SEO";
import SectionHeading from "../Components/Shared/SectionHeading";
import Button from "../Components/Shared/Button";
import ContentCard from "../Components/ui/ContentCard";
import TestimonialCard from "../Components/ui/TestimonialCard";
import PublicationCard from "../Components/ui/PublicationCard";
import Marquee from "../Components/Shared/Marquee";
import Icon from "../Components/Shared/Icon";
import Loader from "../Components/Shared/Loader";
import { fetchJson } from "../services/api";
import heroVideo from "../assets/hero-video.mp4";
import { FaWhatsapp } from "react-icons/fa";
import { WHATSAPP_URL } from "../config/site";

const DEFAULT_QUOTES = [
  "Every great discovery begins with a well-asked question.",
  "Research today shapes the healthcare of tomorrow.",
  "Mentorship turns curiosity into published impact.",
  "Evidence-based practice starts with rigorous methodology.",
];

const FEATURES = [
  {
    icon: "graduation",
    title: "Expert Faculty",
    text: "Learn from experienced research professionals",
  },
  {
    icon: "book",
    title: "Practical Learning",
    text: "Hands-on training with real-life applications",
  },
  {
    icon: "users",
    title: "Mentorship",
    text: "Personalized guidance at every step",
  },
  {
    icon: "document",
    title: "Publication Support",
    text: "Support for writing and publishing in indexed journals",
  },
  {
    icon: "shield",
    title: "Global Standards",
    text: "International standard curriculum & practices",
  },
  {
    icon: "chat",
    title: "Research Community",
    text: "Join a growing network of researchers",
  },
];

export default function Home() {
  const [courses, setCourses] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [publications, setPublications] = useState([]);
  const [quotes, setQuotes] = useState(DEFAULT_QUOTES);
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let active = true;
    Promise.all([
      fetchJson("/data/courses.json"),
      fetchJson("/data/testimonials.json"),
      fetchJson("/data/publications.json"),
      fetchJson("/data/heroQuotes.json"),
    ])
      .then(([c, t, p, q]) => {
        if (!active) return;
        setCourses(c.slice(0, 5));
        setTestimonials(t);
        setPublications(p);
        if (Array.isArray(q) && q.length > 0) setQuotes(q);
      })
      .catch((err) => active && setError(err.message))
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (!quotes || quotes.length === 0) return undefined;
    const interval = setInterval(
      () => setQuoteIndex((i) => (i + 1) % quotes.length),
      4500,
    );
    return () => clearInterval(interval);
  }, [quotes]);

  return (
    <>
      <SEO
        title="Home"
        description="Empowering students, clinicians and professionals through world-class research education, mentorship and publication support in Bangladesh."
        path="/"
      />

      <section className="relative isolate flex min-h-[620px] items-center overflow-hidden text-white lg:min-h-[700px]">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
          aria-hidden="true"
        >
          <source src={heroVideo} type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-primary/85" aria-hidden="true" />

        <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center px-4 py-24 text-center sm:px-6 lg:px-8 lg:py-32">
          <h1 className="mb-6 font-serif text-5xl font-bold leading-tight sm:text-6xl lg:text-7xl">
            Learn. Research.
            <br />
            <span className="text-secondary">Publish. Lead.</span>
          </h1>

          <p
            key={quoteIndex}
            className="mb-10 min-h-[56px] w-full max-w-5xl text-lg leading-relaxed text-white/85 sm:text-xl lg:text-2xl animate-fadeSlide"
            role="status"
            aria-live="polite"
          >
            {quotes[quoteIndex]}
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Button to="/apply" variant="primary">
              Apply Now
            </Button>

            <Button to="/courses" variant="outline">
              Explore Courses
            </Button>
          </div>
        </div>
      </section>

      <section className="border-y border-neutral-100 py-6">
        <Marquee>
          {FEATURES.map((f) => (
            <div key={f.title} className="flex w-64 items-center gap-3 px-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-primary/0 text-primary">
                <Icon name={f.icon} className="h-14 w-14" />
              </div>

              <div>
                <h3 className="text-sm font-semibold text-primary">
                  {f.title}
                </h3>
                <p className="text-xs text-neutral-700">{f.text}</p>
              </div>
            </div>
          ))}
        </Marquee>
      </section>

      <section className="bg-neutral-50 py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <SectionHeading
            eyebrow="Programs"
            title="Our Courses"
            subtitle="Medical and academic research-based training designed by experts."
          />
          {loading && <Loader label="Loading courses" />}
          {error && (
            <p role="alert" className="text-center text-sm text-red-600">
              {error}
            </p>
          )}
          {!loading && !error && (
            <>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
                {courses.map((c) => (
                  <ContentCard key={c.id} item={c} basePath="/courses" />
                ))}
              </div>
              <div className="mt-10 text-center">
                <Button to="/courses" variant="ghost">
                  View All Courses
                </Button>
              </div>
            </>
          )}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <SectionHeading eyebrow="Publications" title="Our Publications" />
        {!loading && (
          <>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {publications.slice(0, 3).map((p) => (
                <PublicationCard key={p.id} pub={p} />
              ))}
            </div>
            <div className="mt-10 text-center">
              <Button to="/publications" variant="ghost">
                View All Publications
              </Button>
            </div>
          </>
        )}
      </section>

      <section className="bg-neutral-50 py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <SectionHeading
            eyebrow="Innovation"
            title="Existing Work & Case Studies"
          />
          <div className="text-center">
            <p className="mx-auto mb-6 max-w-xl text-sm text-neutral-700">
              Explore the research support systems currently in development,
              including a Hematology Report Analysis system and a CBC-based
              Leukemia Detection system.
            </p>
            <Button to="/our-work" variant="ghost">
              View Our Work
            </Button>
          </div>
        </div>
      </section>

      {!loading && testimonials.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
          <SectionHeading
            eyebrow="Testimonials"
            title="What Our Students Say"
          />
          <Marquee>
            {testimonials.map((t) => (
              <div key={t.id} className="w-72">
                <div className="rounded-lg border border-neutral-100 bg-white p-5">
                  <img
                    src={t.image}
                    alt={t.name}
                    className="mb-3 h-12 w-12 rounded-full object-cover"
                    width="48"
                    height="48"
                    loading="lazy"
                  />
                  <TestimonialCard
                    name={t.name}
                    role={t.role}
                    quote={t.quote}
                  />
                </div>
              </div>
            ))}
          </Marquee>
        </section>
      )}

      <section className="relative overflow-hidden bg-gradient-to-br from-primary to-primary-dark py-16 text-white">
        <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center gap-6 px-4 text-center">
          <h2 className="font-serif text-3xl font-bold">
            Ready to Start Your Research Journey?
          </h2>
          <p className="text-white/80">
            Join thousands of learners who are building a successful research
            career with us.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button to="/apply">Apply Now</Button>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-reflect inline-flex items-center gap-2 rounded-md border-2 border-secondary px-6 py-3 text-sm font-semibold text-white"
            >
              <FaWhatsapp className="h-4 w-4" /> Message Us
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
