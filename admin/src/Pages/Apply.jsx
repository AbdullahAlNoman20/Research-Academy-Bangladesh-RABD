// FILE: src/pages/Apply.jsx
import { useState } from "react";
import SEO from "../Components/Shared/SEO";
import SectionHeading from "../Components/Shared/SectionHeading";
import Button from "../Components/Shared/Button";
import { useToast } from "../hooks/useToast";
import {
  isValidEmail,
  isValidPhone,
  isNonEmpty,
  sanitizeText,
} from "../utils/validators";

const INITIAL = { name: "", email: "", phone: "", program: "", honeypot: "" };

export default function Apply() {
  const [form, setForm] = useState(INITIAL);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const { showToast } = useToast();

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function validate() {
    const errs = {};
    if (form.honeypot) errs._bot = "Spam detected";
    if (!isNonEmpty(form.name, 100)) errs.name = "Name is required";
    if (!isValidEmail(form.email)) errs.email = "Enter a valid email address";
    if (!isValidPhone(form.phone)) errs.phone = "Enter a valid phone number";
    if (!isNonEmpty(form.program, 100))
      errs.program = "Please select a program";
    return errs;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) {
      if (!validationErrors._bot)
        showToast("Please fix the highlighted fields.", "error");
      return;
    }
    setSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 600));
      showToast("Application submitted successfully!", "success");
      setForm(INITIAL);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <SEO
        title="Apply Now"
        description="Apply to a course, workshop or program at Research Academy Bangladesh."
        path="/apply"
      />
      <section className="mx-auto max-w-2xl px-4 py-16 lg:px-8">
        <SectionHeading eyebrow="Get Started" title="Apply Now" />
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
              htmlFor="a-name"
              className="mb-1 block text-sm font-semibold text-primary"
            >
              Full Name
            </label>
            <input
              id="a-name"
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
              htmlFor="a-email"
              className="mb-1 block text-sm font-semibold text-primary"
            >
              Email Address
            </label>
            <input
              id="a-email"
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
              htmlFor="a-phone"
              className="mb-1 block text-sm font-semibold text-primary"
            >
              Phone
            </label>
            <input
              id="a-phone"
              name="phone"
              type="tel"
              required
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
              htmlFor="a-program"
              className="mb-1 block text-sm font-semibold text-primary"
            >
              Program of Interest
            </label>
            <select
              id="a-program"
              name="program"
              required
              value={form.program}
              onChange={handleChange}
              className="w-full rounded-md border border-neutral-100 px-3 py-2 text-sm focus:border-primary focus:outline-none"
            >
              <option value="">Select a program</option>
              <option value="research-methodology">Research Methodology</option>
              <option value="research-proposal-writing">
                Research Proposal Writing
              </option>
              <option value="biostatistics-using-spss">
                Biostatistics using SPSS
              </option>
              <option value="scientific-writing">Scientific Writing</option>
              <option value="systematic-review-meta-analysis">
                Systematic Review & Meta-analysis
              </option>
            </select>
            {errors.program && (
              <p role="alert" className="mt-1 text-xs text-red-600">
                {errors.program}
              </p>
            )}
          </div>
          <Button type="submit" disabled={submitting}>
            {submitting ? "Submitting…" : "Submit Application"}
          </Button>
        </form>
      </section>
    </>
  );
}
