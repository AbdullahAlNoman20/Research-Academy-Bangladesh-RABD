// FILE: src/Pages/About.jsx  (full rewrite — richer expanded journey with snake road timeline, large non-circular founder photo)
import { useEffect, useState } from 'react';
import SEO from '../Components/Shared/SEO';
import SectionHeading from '../Components/Shared/SectionHeading';
import SignatureBlock from '../Components/ui/SignatureBlock';
import TeamMemberCard from '../Components/ui/TeamMemberCard';
import JourneyTimeline from '../Components/ui/JourneyTimeline';
import Marquee from '../Components/Shared/Marquee';
import Loader from '../Components/Shared/Loader';
import { fetchJson } from '../services/api';
import heroImage from '../assets/dr-momena-begum.png';

const JOURNEY = [
  { year: '2019', title: 'The Beginning', text: 'Research Academy Bangladesh founded with a single Research Methodology course for medical residents in Dhaka.' },
  { year: '2020', title: 'First Cohort Graduates', text: '50 residents complete the founding course, with the first cohort presenting at a national conference.' },
  { year: '2021', title: 'Biostatistics Launch', text: 'Expanded into biostatistics and scientific writing training, reaching 300+ clinicians across three institutions.' },
  { year: '2022', title: 'Publication Milestone', text: 'Alumni cross the milestone of 50 peer-reviewed publications supported through our mentorship program.' },
  { year: '2023', title: 'Institutional Partnerships', text: 'Launched institutional research training programs for hospitals and universities nationwide.' },
  { year: '2024', title: 'National Recognition', text: 'Recognized as a leading research education provider, expanding workshops to 8 divisions of Bangladesh.' },
  { year: '2025', title: 'Digital Expansion', text: 'Introduced online workshops and AI-assisted research tools training to reach remote learners.' },
  { year: '2026', title: 'Where We Stand', text: 'Serving 1000+ students with courses, workshops, mentorship and publication support nationwide.' }
];

export default function About() {
  const [team, setTeam] = useState([]);

  useEffect(() => {
    let active = true;
    fetchJson('/data/teamMembers.json').then((data) => active && setTeam(data));
    return () => { active = false; };
  }, []);

  return (
    <>
      <SEO title="About Us" description="Learn about Research Academy Bangladesh's mission, journey and founder." path="/about" />

      <section className="mx-auto max-w-5xl px-4 py-16 lg:px-8">
        <SectionHeading eyebrow="About Us" title="Empowering Future Researchers" align="left" />
        <p className="mb-16 text-neutral-700">
          Research Academy Bangladesh is dedicated to advancing research education and promoting a culture of inquiry, innovation and impact across the medical and academic communities of Bangladesh.
        </p>

        <SectionHeading eyebrow="Since 2019" title="Our Journey" />
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16 lg:px-8">
        <JourneyTimeline milestones={JOURNEY} />
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 lg:px-8">
        <div className="mb-16 grid gap-6 sm:grid-cols-2">
          <div className="rounded-lg border border-neutral-100 bg-white p-6">
            <h3 className="mb-2 text-lg font-bold text-primary">Our Mission</h3>
            <p className="text-sm text-neutral-700">To equip students, clinicians and professionals with practical, ethical, and internationally recognized research skills.</p>
          </div>
          <div className="rounded-lg border border-neutral-100 bg-white p-6">
            <h3 className="mb-2 text-lg font-bold text-primary">Our Vision</h3>
            <p className="text-sm text-neutral-700">To become the leading research education platform in South Asia, driving evidence-based healthcare and academic excellence.</p>
          </div>
        </div>

        <div className="mb-16 grid gap-8 rounded-2xl bg-neutral-50 p-6 md:grid-cols-2 md:items-stretch md:p-0">
          <img
            src={heroImage}
            alt="Dr. Momena Begum, Founder & Academic Director"
            className="h-72 w-full rounded-xl object-cover md:h-full md:rounded-l-2xl md:rounded-r-none"
            loading="lazy"
          />
          <div className="flex flex-col justify-center p-2 md:p-10">
            <span className="mb-2 w-fit rounded-full bg-secondary/20 px-3 py-1 text-xs font-semibold text-secondary-dark">From the Founder</span>
            <h3 className="mb-1 text-2xl font-bold text-primary">Dr. Momena Begum, MD</h3>
            <p className="mb-5 text-sm font-semibold text-secondary-dark">Founder &amp; Academic Director</p>
            <p className="mb-4 text-sm text-neutral-700">
              With years of experience in clinical research and academic mentorship, Dr. Begum founded Research Academy Bangladesh to bridge the gap between research theory and practical application.
            </p>
            <p className="mb-6 text-sm text-neutral-700">
              Her vision was simple but ambitious: to build a generation of researchers in Bangladesh who could compete, publish, and lead on the global academic stage — without having to leave home to gain world-class research training.
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