// FILE: src/config/contentTypes.js  (full rewrite — blog kept generic-list-only; course/service/workshop have dedicated detail pages now)
export const CONTENT_TYPES = Object.freeze({
  courses: { key: 'courses', label: 'Courses', singular: 'Course', dataUrl: '/data/courses.json', basePath: '/courses' },
  services: { key: 'services', label: 'Services', singular: 'Service', dataUrl: '/data/services.json', basePath: '/services' },
  workshops: { key: 'workshops', label: 'Workshops', singular: 'Workshop', dataUrl: '/data/workshops.json', basePath: '/workshops' },
  blog: { key: 'blog', label: 'Blog', singular: 'Article', dataUrl: '/data/blogs.json', basePath: '/blog' }
});

export function getContentType(key) {
  const type = CONTENT_TYPES[key];
  if (!type) throw new Error(`Unknown content type: ${key}`);
  return type;
}