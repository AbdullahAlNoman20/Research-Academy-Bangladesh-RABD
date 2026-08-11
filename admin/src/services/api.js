// FILE: src/services/api.js  (full rewrite — clearer diagnostics for non-JSON/HTML fallback responses)
import axios from 'axios';

const client = axios.create({
  baseURL: import.meta.env.BASE_URL || '/',
  timeout: 10000,
  headers: { Accept: 'application/json' }
});

export async function fetchJson(path) {
  const relativePath = path.replace(/^\//, '');
  let response;

  try {
    response = await client.get(relativePath);
  } catch (err) {
    if (err?.response?.status === 404) throw new Error(`Data file not found: ${path}`);
    throw new Error('Unable to load data. Please check your connection and try again.');
  }

  if (Array.isArray(response.data)) return response.data;

  const contentType = String(response.headers?.['content-type'] || '');
  if (contentType.includes('text/html')) {
    throw new Error(
      `Expected JSON at ${path} but the server returned an HTML page. Verify the file exists at /public${path} and that no catch-all rewrite is intercepting /data/* requests.`
    );
  }

  throw new Error(`Invalid data format received from ${path}.`);
}

export default client;