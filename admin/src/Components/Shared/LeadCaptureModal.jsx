// FILE: src/Components/Shared/LeadCaptureModal.jsx  (new)
import { useState } from "react";
import { isValidEmail, isValidPhone, isNonEmpty } from "../../utils/validators";
import { submitToFormspree } from "../../utils/formspree";

export default function LeadCaptureModal({
  resourceTitle,
  onClose,
  onVerified,
}) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    reason: "",
    honeypot: "",
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (form.honeypot) return;
    const errs = {};
    if (!isNonEmpty(form.name, 100)) errs.name = "Name is required";
    if (!isValidEmail(form.email)) errs.email = "Enter a valid email address";
    if (!isValidPhone(form.phone)) errs.phone = "Enter a valid phone number";
    if (!isNonEmpty(form.reason, 300))
      errs.reason = "Please tell us your reason";
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setSubmitting(true);
    try {
      await submitToFormspree(
        {
          name: form.name,
          email: form.email,
          phone: form.phone,
          reason: form.reason,
          resource: resourceTitle,
        },
        `Resource Download Request: ${resourceTitle}`,
      );
      onVerified();
    } catch {
      setErrors({ _submit: "Something went wrong. Please try again." });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div
      className="fixed inset-0 z-[90] flex items-center justify-center bg-black/50 px-4"
      role="dialog"
      aria-modal="true"
      aria-label="Download request form"
    >
      <div className="w-full max-w-md rounded-xl bg-white p-6">
        <h3 className="mb-1 text-lg font-bold text-primary">
          Request Download
        </h3>
        <p className="mb-4 text-sm text-neutral-700">
          Please provide your details to download “{resourceTitle}”.
        </p>
        <form
          onSubmit={handleSubmit}
          noValidate
          className="flex flex-col gap-3"
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
            <input
              name="name"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
              maxLength={100}
              className="w-full rounded-md border border-neutral-100 px-3 py-2 text-sm focus:border-primary focus:outline-none"
            />
            {errors.name && (
              <p role="alert" className="mt-1 text-xs text-red-600">
                {errors.name}
              </p>
            )}
          </div>
          <div>
            <input
              name="email"
              type="email"
              placeholder="Email Address"
              value={form.email}
              onChange={handleChange}
              maxLength={254}
              className="w-full rounded-md border border-neutral-100 px-3 py-2 text-sm focus:border-primary focus:outline-none"
            />
            {errors.email && (
              <p role="alert" className="mt-1 text-xs text-red-600">
                {errors.email}
              </p>
            )}
          </div>
          <div>
            <input
              name="phone"
              type="tel"
              placeholder="Phone Number"
              value={form.phone}
              onChange={handleChange}
              maxLength={20}
              className="w-full rounded-md border border-neutral-100 px-3 py-2 text-sm focus:border-primary focus:outline-none"
            />
            {errors.phone && (
              <p role="alert" className="mt-1 text-xs text-red-600">
                {errors.phone}
              </p>
            )}
          </div>
          <div>
            <textarea
              name="reason"
              placeholder="Reason for download"
              rows={3}
              value={form.reason}
              onChange={handleChange}
              maxLength={300}
              className="w-full rounded-md border border-neutral-100 px-3 py-2 text-sm focus:border-primary focus:outline-none"
            />
            {errors.reason && (
              <p role="alert" className="mt-1 text-xs text-red-600">
                {errors.reason}
              </p>
            )}
          </div>
          {errors._submit && (
            <p role="alert" className="text-xs text-red-600">
              {errors._submit}
            </p>
          )}
          <div className="mt-2 flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-md border border-neutral-100 px-4 py-2 text-sm font-semibold text-primary"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="flex-1 rounded-md bg-secondary px-4 py-2 text-sm font-semibold text-primary disabled:opacity-50"
            >
              {submitting ? "Submitting…" : "Continue to Download"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
