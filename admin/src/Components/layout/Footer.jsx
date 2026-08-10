// FILE: src/components/layout/Footer.jsx
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useToast } from '../../hooks/useToast';
import { isValidEmail, sanitizeText } from '../../utils/validators';

const QUICK_LINKS = [
  { label: 'About Us', to: '/about' },
  { label: 'Courses', to: '/courses' },
  { label: 'Workshops', to: '/workshops' },
  { label: 'Resources', to: '/resources' },
  { label: 'Blog', to: '/blog' },
  { label: 'Contact', to: '/contact' }
];

const SERVICES = [
  { label: 'Research Training', to: '/services/research-training' },
  { label: 'Scientific Writing', to: '/services/scientific-writing-support' },
  { label: 'Biostatistics Support', to: '/services/biostatistics-support' },
  { label: 'Publication Support', to: '/services/publication-support' },
  { label: 'Research Mentorship', to: '/services/research-mentorship' },
  { label: 'Consultation', to: '/services/consultation' }
];

export default function Footer() {
  const [email, setEmail] = useState('');
  const [website, setWebsite] = useState('');
  const { showToast } = useToast();

  function handleSubscribe(e) {
    e.preventDefault();
    if (website) return;
    const clean = sanitizeText(email, 254);
    if (!isValidEmail(clean)) {
      showToast('Please enter a valid email address.', 'error');
      return;
    }
    showToast('Subscribed successfully! Welcome aboard.', 'success');
    setEmail('');
  }

  return (
    <footer className="bg-primary text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:grid-cols-2 lg:grid-cols-5 lg:px-8">
        <div className="sm:col-span-2 lg:col-span-1">
          <div className="mb-3 text-lg font-bold">RESEARCH ACADEMY</div>
          <div className="mb-4 text-sm font-bold text-secondary -mt-3">BANGLADESH</div>
          <p className="text-sm text-white/70">
            We are committed to advancing research education and promoting a culture of inquiry, innovation and impact.
          </p>
        </div>

        <div>
          <h4 className="mb-4 font-semibold text-secondary">Quick Links</h4>
          <ul className="flex flex-col gap-2 text-sm text-white/80">
            {QUICK_LINKS.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="hover:text-white">{l.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-4 font-semibold text-secondary">Our Services</h4>
          <ul className="flex flex-col gap-2 text-sm text-white/80">
            {SERVICES.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="hover:text-white">{l.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-4 font-semibold text-secondary">Contact Us</h4>
          <ul className="flex flex-col gap-2 text-sm text-white/80">
            <li>Dhaka, Bangladesh</li>
            <li>
              <a href="mailto:info@researchacademybd.com" className="hover:text-white">info@researchacademybd.com</a>
            </li>
            <li>
              <a href="tel:+8801234567890" className="hover:text-white">+880 1234 567890</a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="mb-4 font-semibold text-secondary">Newsletter</h4>
          <p className="mb-3 text-sm text-white/70">Stay updated with our latest courses, workshops and research tips.</p>
          <form onSubmit={handleSubscribe} noValidate className="flex flex-col gap-2">
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
            <label htmlFor="newsletter-email" className="sr-only">Email address</label>
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
            <button type="submit" className="rounded-md bg-secondary px-4 py-2 text-sm font-semibold text-primary hover:bg-secondary-dark">
              Subscribe
            </button>
          </form>
        </div>
      </div>

      <div className="border-t border-white/10 px-4 py-4 text-center text-xs text-white/60 lg:px-8">
        © {new Date().getFullYear()} Research Academy Bangladesh. All Rights Reserved.
      </div>
    </footer>
  );
}