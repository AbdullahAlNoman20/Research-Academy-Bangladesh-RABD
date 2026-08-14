// FILE: src/pages/Contact.jsx  (full rewrite — Formspree + map + FAQ)
import { useState } from "react";
import SEO from "../Components/Shared/SEO";
import SectionHeading from "../Components/Shared/SectionHeading";
import Button from "../Components/Shared/Button";
import GoogleMapEmbed from "../Components/Shared/GoogleMapEmbed";
import FAQAccordion from "../Components/Shared/FAQAccordion";
import { useToast } from "../hooks/useToast";
import { validateContactForm } from "../utils/validators";
import { submitToFormspree } from "../utils/formspree";
import { OFFICE_ADDRESS } from "../config/site";

const INITIAL = { name: "", email: "", phone: "", message: "", honeypot: "" };

const FAQS = [
  {
    question: "How do I enroll in a course?",
    answer:
      "Visit the Apply Now page, select your program of interest, and submit the application form. Our team will contact you within 2 business days.",
  },
  {
    question: "Are certificates provided upon completion?",
    answer:
      "Yes, all courses and most workshops include a certificate of completion issued by Research Academy Bangladesh.",
  },
  {
    question: "Do you offer institutional training programs?",
    answer:
      "Yes, our Research Training service is designed for hospitals, medical colleges, and universities. Contact us for a customized proposal.",
  },
  {
    question: "Can I get one-on-one mentorship?",
    answer:
      "Yes, our Research Mentorship service pairs you with an experienced academic mentor for long-term guidance.",
  },
];

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
      if (!validationErrors._bot)
        showToast("Please fix the highlighted fields.", "error");
      return;
    }
    setSubmitting(true);
    try {
      await submitToFormspree(
        {
          name: form.name,
          email: form.email,
          phone: form.phone,
          message: form.message,
        },
        `New Contact Form Submission from ${form.name}`,
      );
      showToast(
        "Message sent successfully. We will get back to you soon.",
        "success",
      );
      setForm(INITIAL);
    } catch {
      showToast("Something went wrong. Please try again.", "error");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <SEO
        title="Contact"
        description="Get in touch with Research Academy Bangladesh."
        path="/contact"
      />
      <section className="mx-auto max-w-6xl px-4 py-16 lg:px-8">
        <SectionHeading eyebrow="Get in Touch" title="Contact Us" />
        <div className="grid gap-10 lg:grid-cols-2">
          <form
            onSubmit={handleSubmit}
            noValidate
            className="flex flex-col gap-5"
          >
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
              <label
                htmlFor="name"
                className="mb-1 block text-sm font-semibold text-primary"
              >
                Full Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                maxLength={100}
                value={form.name}
                onChange={handleChange}
                className="w-full rounded-md border border-neutral-100 px-3 py-2 text-sm focus:border-primary focus:outline-none"
              />
              {errors.name && (
                <p role="alert" className="mt-1 text-xs text-red-600">
                  {errors.name}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="email"
                className="mb-1 block text-sm font-semibold text-primary"
              >
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                maxLength={254}
                value={form.email}
                onChange={handleChange}
                className="w-full rounded-md border border-neutral-100 px-3 py-2 text-sm focus:border-primary focus:outline-none"
              />
              {errors.email && (
                <p role="alert" className="mt-1 text-xs text-red-600">
                  {errors.email}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="phone"
                className="mb-1 block text-sm font-semibold text-primary"
              >
                Phone (optional)
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                maxLength={20}
                value={form.phone}
                onChange={handleChange}
                className="w-full rounded-md border border-neutral-100 px-3 py-2 text-sm focus:border-primary focus:outline-none"
              />
              {errors.phone && (
                <p role="alert" className="mt-1 text-xs text-red-600">
                  {errors.phone}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="message"
                className="mb-1 block text-sm font-semibold text-primary"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                maxLength={2000}
                value={form.message}
                onChange={handleChange}
                className="w-full rounded-md border border-neutral-100 px-3 py-2 text-sm focus:border-primary focus:outline-none"
              />
              {errors.message && (
                <p role="alert" className="mt-1 text-xs text-red-600">
                  {errors.message}
                </p>
              )}
            </div>
            <Button type="submit" disabled={submitting}>
              {submitting ? "Sending…" : "Send Message"}
            </Button>
          </form>

          <div className="flex flex-col gap-6">
            <div>
              <h3 className="mb-2 text-sm font-bold text-primary">
                Head Office
              </h3>
              <p className="mb-3 text-sm text-neutral-700">{OFFICE_ADDRESS}</p>
              <GoogleMapEmbed />
            </div>
          </div>
        </div>

        <div className="mt-16">
          <SectionHeading
            eyebrow="Support"
            title="Frequently Asked Questions"
          />
          <FAQAccordion items={FAQS} />
        </div>
      </section>
    </>
  );
}
