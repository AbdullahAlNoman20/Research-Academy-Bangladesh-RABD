// FILE: src/components/layout/Footer.jsx  (full rewrite — react-icons, small logo, Formspree newsletter)
import { Link } from "react-router-dom";
import { useState } from "react";
import { useToast } from "../../hooks/useToast";
import { isValidEmail, sanitizeText } from "../../utils/validators";
import { submitToFormspree } from "../../utils/formspree";
import logo from "../../assets/logo.jpeg";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaYoutube,
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhoneAlt,
  FaBook,
  FaHandsHelping,
  FaChalkboardTeacher,
  FaFolderOpen,
  FaBlog,
  FaEnvelopeOpenText,
} from "react-icons/fa";

const QUICK_LINKS = [
  { label: "About Us", to: "/about", icon: FaEnvelopeOpenText },
  { label: "Courses", to: "/courses", icon: FaBook },
  { label: "Workshops", to: "/workshops", icon: FaChalkboardTeacher },
  { label: "Resources", to: "/resources", icon: FaFolderOpen },
  { label: "Blog", to: "/blog", icon: FaBlog },
  { label: "Contact", to: "/contact", icon: FaEnvelope },
];

const SERVICES = [
  { label: "Research Training", to: "/services/research-training" },
  { label: "Scientific Writing", to: "/services/scientific-writing-support" },
  { label: "Biostatistics Support", to: "/services/biostatistics-support" },
  { label: "Publication Support", to: "/services/publication-support" },
  { label: "Research Mentorship", to: "/services/research-mentorship" },
  { label: "Consultation", to: "/services/consultation" },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { showToast } = useToast();

  async function handleSubscribe(e) {
    e.preventDefault();
    if (website) return;
    const clean = sanitizeText(email, 254);
    if (!isValidEmail(clean)) {
      showToast("Please enter a valid email address.", "error");
      return;
    }
    setSubmitting(true);
    try {
      await submitToFormspree(
        { email: clean, type: "newsletter" },
        `Someone subscribed to the newsletter: ${clean}`,
      );
      showToast("Subscribed successfully! Welcome aboard.", "success");
      setEmail("");
    } catch {
      showToast("Subscription failed. Please try again.", "error");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <footer className="bg-primary text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:grid-cols-2 lg:grid-cols-5 lg:px-8">
        <div className="sm:col-span-2 lg:col-span-1">
          <img
            src={logo}
            alt="Research Academy Bangladesh"
            className="mb-3 h-10 w-10 object-contain"
            width="40"
            height="40"
            loading="lazy"
          />
          <div className="mb-1 text-lg font-bold">RESEARCH ACADEMY</div>
          <div className="mb-4 -mt-1 text-sm font-bold text-secondary">
            BANGLADESH
          </div>
          <p className="mb-4 text-sm text-white/70">
            We are committed to advancing research education and promoting a
            culture of inquiry, innovation and impact.
          </p>
          <div className="flex gap-3">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="hover-underline-gold flex h-9 w-9 items-center justify-center rounded-full border border-white/20"
            >
              <FaFacebookF className="h-4 w-4" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="hover-underline-gold flex h-9 w-9 items-center justify-center rounded-full border border-white/20"
            >
              <FaLinkedinIn className="h-4 w-4" />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="hover-underline-gold flex h-9 w-9 items-center justify-center rounded-full border border-white/20"
            >
              <FaYoutube className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div>
          <h4 className="mb-4 font-semibold text-secondary">Quick Links</h4>
          <ul className="flex flex-col gap-2 text-sm text-white/80">
            {QUICK_LINKS.map((l) => {
              const LinkIcon = l.icon;
              return (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="hover-underline-gold flex w-fit items-center gap-2"
                  >
                    <LinkIcon className="h-3.5 w-3.5" /> {l.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        <div>
          <h4 className="mb-4 font-semibold text-secondary">Our Services</h4>
          <ul className="flex flex-col gap-2 text-sm text-white/80">
            {SERVICES.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="hover-underline-gold w-fit">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-4 font-semibold text-secondary">Contact Us</h4>
          <ul className="flex flex-col gap-2 text-sm text-white/80">
            <li className="flex items-center gap-2">
              <FaMapMarkerAlt className="h-4 w-4 shrink-0" /> Dhaka, Bangladesh
            </li>
            <li className="flex items-center gap-2">
              <FaEnvelope className="h-4 w-4 shrink-0" />
              <a
                href="mailto:info@researchacademybd.com"
                className="hover-underline-gold"
              >
                info@researchacademybd.com
              </a>
            </li>
            <li className="flex items-center gap-2">
              <FaPhoneAlt className="h-4 w-4 shrink-0" />
              <a href="tel:+8801764308876" className="hover-underline-gold">
                +880 1764 308876
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="mb-4 font-semibold text-secondary">Newsletter</h4>
          <p className="mb-3 text-sm text-white/70">
            Stay updated with our latest courses, workshops and research tips.
          </p>
          <form
            onSubmit={handleSubscribe}
            noValidate
            className="flex flex-col gap-2"
          >
            <input
              type="text"
              name="website"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              className="hidden"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
            />
            <label htmlFor="newsletter-email" className="sr-only">
              Email address
            </label>
            <input
              id="newsletter-email"
              type="email"
              required
              maxLength={254}
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="rounded-md border border-white/20 bg-white/10 px-3 py-2 text-sm text-white placeholder:text-white/50 focus:border-secondary focus:outline-none"
            />
            <button
              type="submit"
              disabled={submitting}
              className="btn-reflect rounded-md bg-secondary px-4 py-2 text-sm font-semibold text-primary disabled:opacity-50"
            >
              {submitting ? "Subscribing…" : "Subscribe"}
            </button>
          </form>
        </div>
      </div>

      <div className="border-t border-white/10 px-4 py-4 text-center text-xs text-white/60 lg:px-8">
        © {new Date().getFullYear()} Research Academy Bangladesh. All Rights
        Reserved.
      </div>
    </footer>
  );
}
