// FILE: src/utils/formspree.js
import { FORMSPREE_ENDPOINT } from '../config/site';

export async function submitToFormspree(data, subject) {
  const payload = { ...data, _subject: subject };
  const res = await fetch(FORMSPREE_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(payload)
  });
  if (!res.ok) throw new Error('Submission failed. Please try again.');
  return res.json();
}