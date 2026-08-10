// FILE: src/utils/generatePdf.js
import { jsPDF } from 'jspdf';

function addHeader(doc, title) {
  doc.setFillColor(15, 42, 82);
  doc.rect(0, 0, 210, 28, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(16);
  doc.text('Research Academy Bangladesh', 14, 12);
  doc.setFontSize(10);
  doc.text('Empowering Future Researchers', 14, 19);
  doc.setTextColor(15, 42, 82);
  doc.setFontSize(18);
  doc.text(title, 14, 40);
  doc.setDrawColor(242, 169, 59);
  doc.setLineWidth(1);
  doc.line(14, 44, 196, 44);
}

function addFooter(doc) {
  const pageCount = doc.internal.getNumberOfPages();
  for (let i = 1; i <= pageCount; i += 1) {
    doc.setPage(i);
    doc.setFontSize(9);
    doc.setTextColor(120, 120, 120);
    doc.text(
      `Research Academy Bangladesh | info@researchacademybd.com | Page ${i} of ${pageCount}`,
      14,
      289
    );
  }
}

export function generateProposalPdf(service) {
  if (!service || typeof service.title !== 'string') return;
  const doc = new jsPDF();
  addHeader(doc, `Service Proposal: ${service.title}`);
  let y = 55;
  doc.setFontSize(11);
  doc.setTextColor(51, 65, 85);
  const desc = doc.splitTextToSize(service.description || '', 180);
  doc.text(desc, 14, y);
  y += desc.length * 6 + 10;

  if (Array.isArray(service.roadmap) && service.roadmap.length) {
    doc.setFontSize(13);
    doc.setTextColor(15, 42, 82);
    doc.text('Engagement Roadmap', 14, y);
    y += 8;
    doc.setFontSize(11);
    doc.setTextColor(51, 65, 85);
    service.roadmap.forEach((step, idx) => {
      if (y > 270) { doc.addPage(); y = 20; }
      doc.text(`${idx + 1}. ${step}`, 18, y);
      y += 7;
    });
  }

  addFooter(doc);
  doc.save(`${service.slug || 'service'}-proposal.pdf`);
}

export function generateModulePdf(course) {
  if (!course || typeof course.title !== 'string') return;
  const doc = new jsPDF();
  addHeader(doc, `Course Module: ${course.title}`);
  let y = 55;
  doc.setFontSize(11);
  doc.setTextColor(51, 65, 85);
  const desc = doc.splitTextToSize(course.description || '', 180);
  doc.text(desc, 14, y);
  y += desc.length * 6 + 10;

  doc.setFontSize(11);
  doc.setTextColor(15, 42, 82);
  doc.text(`Duration: ${course.duration || 'N/A'}   |   Level: ${course.level || 'N/A'}`, 14, y);
  y += 12;

  if (Array.isArray(course.modules) && course.modules.length) {
    doc.setFontSize(13);
    doc.setTextColor(15, 42, 82);
    doc.text('Module Breakdown', 14, y);
    y += 8;
    doc.setFontSize(11);
    doc.setTextColor(51, 65, 85);
    course.modules.forEach((step, idx) => {
      if (y > 270) { doc.addPage(); y = 20; }
      doc.text(`Module ${idx + 1}: ${step}`, 18, y);
      y += 7;
    });
  }

  addFooter(doc);
  doc.save(`${course.slug || 'course'}-module.pdf`);
}