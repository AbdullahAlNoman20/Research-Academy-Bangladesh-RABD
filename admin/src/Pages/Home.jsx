// FILE: src/pages/Home.jsx
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/shared/SEO';
import SectionHeading from '../components/shared/SectionHeading';
import Button from '../components/shared/Button';
import ContentCard from '../components/ui/ContentCard';
import TestimonialCard from '../components/ui/TestimonialCard';
import Icon from '../components/shared/Icon';
import Loader from '../components/shared/Loader';
import { fetchJson } from '../services/api';
import heroImage from '../assets/dr-momena-begum.png';

const FEATURES = [
  { icon: 'graduation', title: 'Expert Faculty', text: 'Learn from experienced research professionals' },
  { icon: 'book', title: 'Practical Learning', text: 'Hands-on training with real-life applications' },
  { icon: 'users', title: 'Mentorship', text: 'Personalized guidance at every step' },
  { icon: 'document', title: 'Publication Support', text: 'Support for writing and publishing in indexed journals' },
  { icon: 'shield', title: 'Global Standards', text: 'International standard curriculum & practices' },
  { icon: 'chat', title: 'Research Community', text: 'Join a growing network of researchers' }
];

const TESTIMONIALS = [
  { name: 'Dr. Farzana Ahmed', role: 'Pediatric Resident', quote: 'The training and mentorship helped me write and publish my first research paper in an international journal. Highly recommended!' },
  { name: 'Dr. Mahmudul Hasan', role: 'Medical Officer', quote: 'Excellent courses! The faculty are supportive and the practical sessions are extremely helpful.' },
  { name: 'Dr. Nusrat Jahan', role: 'Postgraduate Student', quote: 'Research Academy Bangladesh is the best platform for anyone serious about building a research career.' }
];

export default function Home() {
  const [courses, setCourses] = useState([]);
  const [caseStudies, setCaseStudies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let active = true;
    setLoading(true);

    Promise.all([
      fetchJson('/data/courses.json'),
      fetchJson('/data/caseStudies.json')
    ])
      .then(([c, cs]) => {
        if (!active) return;
        setCourses(c.slice(0, 5));
        setCaseStudies(cs);
      })
      .catch((err) => active && setError(err.message))
      .finally(() => active && setLoading(false));

    return () => {
      active = false;
    };
  }, []);

  return (
    <>
      <section className="bg-primary text-white">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 lg:grid-cols-2 lg:px-8 lg:py-24">
          <div>
            <h1 className="mb-6 font-serif text-4xl font-bold leading-tight sm:text-5xl">
              Learn. Research.<br /><span className="text-secondary">Publish. Lead.</span>
            </h1>
            <p className="mb-8 max-w-xl text-white/80">
              Empowering students, clinicians, researchers and professionals through world-class research education, mentorship and publication support.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button to="/apply" variant="primary">Apply Now</Button>
              <Button to="/courses" variant="outline">Explore Courses</Button>
            </div>
          </div>

          <div className="flex justify-center">
            <img
              src={heroImage}
              alt="Dr. Momena Begum, Founder & Academic Director of Research Academy Bangladesh"
              className="w-full max-w-md rounded-2xl object-cover shadow-2xl"
              width="480"
              height="480"
              loading="eager"
              fetchpriority="high"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-6">
          {FEATURES.map((f) => (
            <div key={f.title} className="flex flex-col items-center text-center">
              <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Icon name={f.icon} className="h-7 w-7" />
              </div>
              <h3 className="mb-1 text-sm font-semibold text-primary">{f.title}</h3>
              <p className="text-xs text-neutral-700">{f.text}</p>
            </div>
          ))}
        </div>
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
                <Button to="/courses" variant="ghost">View All Courses</Button>
              </div>
            </>
          )}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <div className="flex flex-col gap-8 rounded-2xl bg-primary/5 p-8 md:flex-row md:items-center">
          <img
            src={heroImage}
            alt="Dr. Momena Begum"
            className="h-28 w-28 rounded-full object-cover"
            width="112"
            height="112"
            loading="lazy"
          />

          <div className="flex-1">
            <span className="text-xs font-semibold uppercase text-secondary-dark">
              From the Founder
            </span>
            <h3 className="text-xl font-bold text-primary">Dr. Momena Begum, MD</h3>
            <p className="mb-3 text-sm text-neutral-700">Founder &amp; Academic Director</p>
            <p className="text-sm text-neutral-700">
              Our mission is to empower the next generation of researchers with the knowledge, skills and confidence to evidence-based healthcare and scientific innovation.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6 text-center md:grid-cols-4">
            {[
              ['1000+', 'Students Trained'],
              ['50+', 'Courses & Workshops'],
              ['15+', 'Research Collaborations'],
              ['100+', 'Publications Supported']
            ].map(([n, l]) => (
              <div key={l}>
                <div className="text-2xl font-bold text-primary">{n}</div>
                <div className="text-xs text-neutral-700">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {!loading && caseStudies.length > 0 && (
        <section className="bg-neutral-50 py-16">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <SectionHeading
              eyebrow="Track Record"
              title="Existing Work & Case Studies"
              align="left"
            />

            <div className="grid gap-6 sm:grid-cols-2">
              {caseStudies.map((cs) => (
                <a
                  key={cs.id}
                  href={cs.externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group rounded-xl border border-neutral-100 bg-white p-6 shadow-card transition-transform hover:-translate-y-1"
                >
                  <h3 className="mb-2 font-semibold text-primary group-hover:text-secondary-dark">
                    {cs.title}
                  </h3>
                  <p className="text-sm text-neutral-700">{cs.shortDescription}</p>
                  <span className="mt-3 inline-block text-sm font-semibold text-secondary-dark">
                    View Project →
                  </span>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="mx-auto max-w-7xl px-4 py-16 lg:px-8">
        <SectionHeading eyebrow="Testimonials" title="What Our Students Say" />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <TestimonialCard key={t.name} {...t} />
          ))}
        </div>
      </section>

      <section className="bg-primary py-16 text-white">
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-6 px-4 text-center">
          <h2 className="font-serif text-3xl font-bold">
            Ready to Start Your Research Journey?
          </h2>
          <p className="text-white/80">
            Join thousands of learners who are building a successful research career with us.
          </p>
          <Button to="/apply">Apply Now</Button>
        </div>
      </section>
    </>
  );
}