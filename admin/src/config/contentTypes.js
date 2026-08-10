// FILE: src/config/contentTypes.js
export const CONTENT_TYPES = Object.freeze({
  courses: {
    key: 'courses',
    label: 'Courses',
    singular: 'Course',
    dataUrl: '/data/courses.json',
    basePath: '/courses',
    downloadKind: 'module',
    downloadLabel: 'Download Module',
    hasRoadmap: false,
    hasGallery: false
  },
  services: {
    key: 'services',
    label: 'Services',
    singular: 'Service',
    dataUrl: '/data/services.json',
    basePath: '/services',
    downloadKind: 'proposal',
    downloadLabel: 'Download Proposal',
    hasRoadmap: true,
    hasGallery: true
  },
  workshops: {
    key: 'workshops',
    label: 'Workshops',
    singular: 'Workshop',
    dataUrl: '/data/workshops.json',
    basePath: '/workshops',
    downloadKind: 'module',
    downloadLabel: 'Download Outline',
    hasRoadmap: false,
    hasGallery: false
  },
  blog: {
    key: 'blog',
    label: 'Blog',
    singular: 'Article',
    dataUrl: '/data/blogs.json',
    basePath: '/blog',
    downloadKind: null,
    downloadLabel: null,
    hasRoadmap: false,
    hasGallery: false
  }
});

export function getContentType(key) {
  const type = CONTENT_TYPES[key];
  if (!type) throw new Error(`Unknown content type: ${key}`);
  return type;
}