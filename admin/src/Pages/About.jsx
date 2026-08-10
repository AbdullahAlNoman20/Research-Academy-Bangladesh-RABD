// FILE: src/pages/About.jsx
import SEO from '../components/shared/SEO';
import SectionHeading from '../components/shared/SectionHeading';
import heroImage from '../assets/dr-momena-begum.png';

export default function About() {
  return (
    <>
      <SEO title="About Us" description="Learn about Research Academy Bangladesh's mission, founder and commitment to advancing research education." path="/about" />
      <section className="mx-auto max-w-5xl px-4 py-16 lg:px-8">
        <SectionHeading eyebrow="About Us" title="Empowering Future Researchers" align="left" />
        <p className="mb-6 text-neutral-700">
          Research Academy Bangladesh is dedicated to advancing research education and promoting a culture of inquiry, innovation and impact across the medical and academic communities of Bangladesh.
        </p>
        <p className="mb-10 text-neutral-700">
          Through structured courses, hands-on workshops, mentorship, and publication support, we equip students, clinicians and professionals with the practical research skills needed to succeed on the global stage.
        </p>
        <div className="flex flex-col items-start gap-6 rounded-2xl bg-neutral-50 p-8 md:flex-row md:items-center">
          <img src={heroImage} alt="Dr. Momena Begum, Founder" className="h-32 w-32 rounded-full object-cover" width="128" height="128" loading="lazy" />
          <div>
            <h3 className="text-xl font-bold text-primary">Dr. Momena Begum, MD</h3>
            <p className="mb-2 text-sm font-semibold text-secondary-dark">Founder &amp; Academic Director</p>
            <p className="text-sm text-neutral-700">
              With years of experience in clinical research and academic mentorship, Dr. Begum founded Research Academy Bangladesh to bridge the gap between research theory and practical application.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}