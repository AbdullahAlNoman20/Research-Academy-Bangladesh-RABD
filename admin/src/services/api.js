// FILE: src/services/api.js
import axios from 'axios';

const client = axios.create({
  baseURL: '/',
  timeout: 10000,
  headers: { Accept: 'application/json' }
});

client.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(new Error(error?.response?.status === 404 ? 'Resource not found' : 'Unable to load data. Please try again.'));
  }
);

export async function fetchJson(url) {
  const { data } = await client.get(url);
  if (!Array.isArray(data)) throw new Error('Invalid data format');
  return data;
}

export default client;