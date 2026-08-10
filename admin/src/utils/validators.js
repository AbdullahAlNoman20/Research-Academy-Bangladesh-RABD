// FILE: src/utils/validators.js
const EMAIL_RE = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const PHONE_RE = /^[+]?[0-9\s-]{7,15}$/;

export function isValidEmail(value) {
  return typeof value === 'string' && value.length <= 254 && EMAIL_RE.test(value.trim());
}

export function isValidPhone(value) {
  return typeof value === 'string' && PHONE_RE.test(value.trim());
}

export function sanitizeText(value, maxLen = 500) {
  if (typeof value !== 'string') return '';
  return value
    .replace(/<[^>]*>?/gm, '')
    .replace(/[<>]/g, '')
    .trim()
    .slice(0, maxLen);
}

export function isNonEmpty(value, maxLen = 200) {
  return typeof value === 'string' && value.trim().length > 0 && value.trim().length <= maxLen;
}

export function validateContactForm({ name, email, phone, message, honeypot }) {
  const errors = {};
  if (honeypot) errors._bot = 'Spam detected';
  if (!isNonEmpty(name, 100)) errors.name = 'Name is required';
  if (!isValidEmail(email)) errors.email = 'Enter a valid email address';
  if (phone && !isValidPhone(phone)) errors.phone = 'Enter a valid phone number';
  if (!isNonEmpty(message, 2000)) errors.message = 'Message is required';
  return { valid: Object.keys(errors).length === 0, errors };
}