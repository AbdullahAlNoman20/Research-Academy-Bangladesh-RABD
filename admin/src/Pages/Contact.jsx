// FILE: src/pages/Contact.jsx
import { useState } from 'react';
import SEO from '../components/shared/SEO';
import SectionHeading from '../components/shared/SectionHeading';
import Button from '../components/shared/Button';
import { useToast } from '../hooks/useToast';
import { validateContactForm, sanitizeText } from '../utils/validators';

const INITIAL = { name: '', email: '', phone: '', message: '', honeypot: '' };

export default function Contact() {
  const [form, setForm] = useState(INITIAL);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const { showToast } = useToast();

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const { valid, errors: validationErrors } = validateContactForm(form);
    setErrors(validationErrors);
    if (!valid) {
      if (!validationErrors._bot) showToast('Please fix the highlighted fields.', 'error');
      return;
    }
    setSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 600));
      showToast('Message sent successfully. We will get back to you soon.', 'success');
      setForm(INITIAL);
    } catch {
      showToast('Something went wrong. Please try again.', 'error');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <SEO title="Contact" description="Get in touch with Research Academy Bangladesh." path="/contact" />
      <section className="mx-auto max-w-3xl px-4 py-16 lg:px-8">
        <SectionHeading eyebrow="Get in Touch" title="Contact Us" />
        <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
          <input
            type="text"
            name="honeypot"
            value={form.honeypot}
            onChange={handleChange}
            className="hidden"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
          />
          <div>
            <label htmlFor="name" className="mb-1 block text-sm font-semibold text-primary">Full Name</label>
            <input
              id="name" name="name" type="text" required maxLength={100}
              value={form.name} onChange={handleChange}
              aria-invalid={!!errors.name} aria-describedby={errors.name ? 'name-error' : undefined}
              className="w-full rounded-md border border-neutral-100 px-3 py-2 text-sm focus:border-primary focus:outline-none"
            />
            {errors.name && <p id="name-error" role="alert" className="mt-1 text-xs text-red-600">{errors.name}</p>}
          </div>
          <div>
            <label htmlFor="email" className="mb-1 block text-sm font-semibold text-primary">Email Address</label>
            <input
              id="email" name="email" type="email" required maxLength={254}
              value={form.email} onChange={handleChange}
              aria-invalid={!!errors.email} aria-describedby={errors.email ? 'email-error' : undefined}
              className="w-full rounded-md border border-neutral-100 px-3 py-2 text-sm focus:border-primary focus:outline-none"
            />
            {errors.email && <p id="email-error" role="alert" className="mt-1 text-xs text-red-600">{errors.email}</p>}
          </div>
          <div>
            <label htmlFor="phone" className="mb-1 block text-sm font-semibold text-primary">Phone (optional)</label>
            <input
              id="phone" name="phone" type="tel" maxLength={20}
              value={form.phone} onChange={handleChange}
              aria-invalid={!!errors.phone} aria-describedby={errors.phone ? 'phone-error' : undefined}
              className="w-full rounded-md border border-neutral-100 px-3 py-2 text-sm focus:border-primary focus:outline-none"
            />
            {errors.phone && <p id="phone-error" role="alert" className="mt-1 text-xs text-red-600">{errors.phone}</p>}
          </div>
          <div>
            <label htmlFor="message" className="mb-1 block text-sm font-semibold text-primary">Message</label>
            <textarea
              id="message" name="message" required rows={5} maxLength={2000}
              value={form.message} onChange={handleChange}
              aria-invalid={!!errors.message} aria-describedby={errors.message ? 'message-error' : undefined}
              className="w-full rounded-md border border-neutral-100 px-3 py-2 text-sm focus:border-primary focus:outline-none"
            />
            {errors.message && <p id="message-error" role="alert" className="mt-1 text-xs text-red-600">{errors.message}</p>}
          </div>
          <Button type="submit" disabled={submitting}>{submitting ? 'Sending…' : 'Send Message'}</Button>
        </form>
      </section>
    </>
  );
}