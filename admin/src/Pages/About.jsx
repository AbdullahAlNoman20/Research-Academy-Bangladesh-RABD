// FILE: src/Pages/About.jsx  (full rewrite — journey, mission/vision, founder signature, team)
import { useEffect, useState } from "react";
import SEO from "../Components/Shared/SEO";
import SectionHeading from "../Components/Shared/SectionHeading";
import SignatureBlock from "../Components/ui/SignatureBlock";
import TeamMemberCard from "../Components/ui/TeamMemberCard";
import Marquee from "../Components/Shared/Marquee";
import Loader from "../Components/Shared/Loader";
import { fetchJson } from "../services/api";
import heroImage from "../assets/dr-momena-begum.png";

const JOURNEY = [
  {
    year: "2019",
    text: "Research Academy Bangladesh founded with a single research methodology course for medical residents.",
  },
  {
    year: "2021",
    text: "Expanded into biostatistics and scientific writing training, reaching 300+ clinicians.",
  },
  {
    year: "2023",
    text: "Launched institutional research training programs for hospitals and universities.",
  },
  {
    year: "2026",
    text: "Serving 1000+ students with courses, workshops, mentorship and publication support nationwide.",
  },
];

export default function About() {
  const [team, setTeam] = useState([]);

  useEffect(() => {
    let active = true;
    fetchJson("/data/teamMembers.json").then((data) => active && setTeam(data));
    return () => {
      active = false;
    };
  }, []);

  return (
    <>
      <SEO
        title="About Us"
        description="Learn about Research Academy Bangladesh's mission, journey and founder."
        path="/about"
      />

      <section className="mx-auto max-w-5xl px-4 py-16 lg:px-8">
        <SectionHeading
          eyebrow="About Us"
          title="Empowering Future Researchers"
          align="left"
        />
        <p className="mb-10 text-neutral-700">
          Research Academy Bangladesh is dedicated to advancing research
          education and promoting a culture of inquiry, innovation and impact
          across the medical and academic communities of Bangladesh.
        </p>

        <h2 className="mb-6 text-xl font-bold text-primary">Our Journey</h2>
        <div className="relative mb-16 flex flex-col gap-8 border-l-2 border-secondary pl-6">
          {JOURNEY.map((j) => (
            <div key={j.year} className="relative">
              <span className="absolute -left-[31px] flex h-6 w-6 items-center justify-center rounded-full bg-secondary text-[10px] font-bold text-primary">
                {j.year.slice(2)}
              </span>
              <span className="text-xs font-semibold text-secondary-dark">
                {j.year}
              </span>
              <p className="text-sm text-neutral-700">{j.text}</p>
            </div>
          ))}
        </div>

        <div className="mb-16 grid gap-6 sm:grid-cols-2">
          <div className="rounded-lg border border-neutral-100 bg-white p-6">
            <h3 className="mb-2 text-lg font-bold text-primary">Our Mission</h3>
            <p className="text-sm text-neutral-700">
              To equip students, clinicians and professionals with practical,
              ethical, and internationally recognized research skills.
            </p>
          </div>
          <div className="rounded-lg border border-neutral-100 bg-white p-6">
            <h3 className="mb-2 text-lg font-bold text-primary">Our Vision</h3>
            <p className="text-sm text-neutral-700">
              To become the leading research education platform in South Asia,
              driving evidence-based healthcare and academic excellence.
            </p>
          </div>
        </div>

        <div className="mb-16 flex flex-col items-start gap-6 rounded-2xl bg-neutral-50 p-8 md:flex-row md:items-center">
          <img
            src={heroImage}
            alt="Dr. Momena Begum, Founder"
            className="h-32 w-32 rounded-full object-cover"
            width="128"
            height="128"
            loading="lazy"
          />
          <div className="flex-1">
            <h3 className="text-xl font-bold text-primary">
              Dr. Momena Begum, MD
            </h3>
            <p className="mb-3 text-sm font-semibold text-secondary-dark">
              Founder &amp; Academic Director
            </p>
            <p className="mb-4 text-sm text-neutral-700">
              With years of experience in clinical research and academic
              mentorship, Dr. Begum founded Research Academy Bangladesh to
              bridge the gap between research theory and practical application.
            </p>
            <SignatureBlock quote="Our mission is to empower the next generation of researchers with the knowledge, skills and confidence to advance evidence-based healthcare." />
          </div>
        </div>

        <h2 className="mb-6 text-xl font-bold text-primary">Our Team</h2>
        {team.length === 0 ? (
          <Loader label="Loading team" />
        ) : (
          <Marquee>
            {team.map((m) => (
              <div key={m.id} className="w-48">
                <TeamMemberCard member={m} />
              </div>
            ))}
          </Marquee>
        )}
      </section>
    </>
  );
}
