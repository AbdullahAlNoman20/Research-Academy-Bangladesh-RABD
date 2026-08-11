// FILE: src/components/layout/Navbar.jsx  (full rewrite — icons per link, gold underline hover, no shadow-on-hover scale)
import { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import Button from '../shared/Button';
import logo from '../../assets/logo.jpeg';
import { FaHome, FaInfoCircle, FaBook, FaHandsHelping, FaChalkboardTeacher, FaFolderOpen, FaBlog, FaEnvelope } from 'react-icons/fa';

const NAV_LINKS = [
  { label: 'Home', to: '/', icon: FaHome },
  { label: 'About Us', to: '/about', icon: FaInfoCircle },
  { label: 'Courses', to: '/courses', icon: FaBook },
  { label: 'Services', to: '/services', icon: FaHandsHelping },
  { label: 'Workshops', to: '/workshops', icon: FaChalkboardTeacher },
  { label: 'Resources', to: '/resources', icon: FaFolderOpen },
  { label: 'Blog', to: '/blog', icon: FaBlog },
  { label: 'Contact', to: '/contact', icon: FaEnvelope }
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    function onKeyDown(e) { if (e.key === 'Escape') setOpen(false); }
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, []);

  return (
    <header className={`sticky top-0 z-50 border-b bg-white transition-colors ${scrolled ? 'border-neutral-100' : 'border-transparent'}`}>
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 lg:px-8" aria-label="Main navigation">
        <Link to="/" className="flex items-center gap-2" aria-label="Research Academy Bangladesh home">
          <img src={logo} alt="Research Academy Bangladesh logo" className="h-12 w-12 object-contain" width="48" height="48" loading="eager" />
          <span className="hidden flex-col leading-tight sm:flex">
            <span className="text-lg font-bold text-primary">RESEARCH ACADEMY</span>
            <span className="-mt-1 text-sm font-bold text-secondary-dark">BANGLADESH</span>
          </span>
        </Link>

        <ul className="hidden items-center gap-6 lg:flex">
          {NAV_LINKS.map((link) => {
            const LinkIcon = link.icon;
            return (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  end={link.to === '/'}
                  className={({ isActive }) =>
                    `hover-underline-gold flex items-center gap-1.5 text-sm font-semibold transition-colors ${isActive ? 'text-secondary-dark' : 'text-primary'}`
                  }
                >
                  <LinkIcon className="h-3.5 w-3.5" /> {link.label}
                </NavLink>
              </li>
            );
          })}
        </ul>

        <div className="hidden lg:block">
          <Button to="/apply">Apply Now</Button>
        </div>

        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-md text-primary lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((v) => !v)}
        >
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2">
            {open ? <path d="M6 6l12 12M6 18L18 6" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </nav>

      {open && (
        <div id="mobile-menu" className="border-t border-neutral-100 bg-white px-4 pb-6 lg:hidden">
          <ul className="flex flex-col gap-1 pt-2">
            {NAV_LINKS.map((link) => {
              const LinkIcon = link.icon;
              return (
                <li key={link.to}>
                  <NavLink
                    to={link.to}
                    end={link.to === '/'}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center gap-2 rounded-md px-3 py-2 text-sm font-semibold ${isActive ? 'bg-primary/5 text-secondary-dark' : 'text-primary'}`
                    }
                  >
                    <LinkIcon className="h-4 w-4" /> {link.label}
                  </NavLink>
                </li>
              );
            })}
          </ul>
          <Button to="/apply" className="mt-4 w-full" onClick={() => setOpen(false)}>Apply Now</Button>
        </div>
      )}
    </header>
  );
}