// FILE: src/utils/generatePdf.js  (full rewrite — logo watermark on every page + branding)
import { jsPDF } from 'jspdf';
import logo from '../assets/logo.jpeg';
import { loadImageAsDataUrl } from './imageDataUrl';

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

function addWatermark(doc, logoDataUrl) {
  const pageCount = doc.internal.getNumberOfPages();
  for (let i = 1; i <= pageCount; i += 1) {
    doc.setPage(i);
    if (logoDataUrl) {
      doc.saveGraphicsState();
      doc.setGState(new doc.GState({ opacity: 0.08 }));
      doc.addImage(logoDataUrl, 'PNG', 45, 90, 120, 120);
      doc.restoreGraphicsState();
    }
  }
}

function addFooter(doc) {
  const pageCount = doc.internal.getNumberOfPages();
  for (let i = 1; i <= pageCount; i += 1) {
    doc.setPage(i);
    doc.setFontSize(9);
    doc.setTextColor(120, 120, 120);
    doc.text(`Research Academy Bangladesh | info@researchacademybd.com | Page ${i} of ${pageCount}`, 14, 289);
  }
}

async function getLogoDataUrl() {
  try {
    return await loadImageAsDataUrl(logo);
  } catch {
    return null;
  }
}

export async function generateProposalPdf(service) {
  if (!service?.title) return;
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

  const logoDataUrl = await getLogoDataUrl();
  addWatermark(doc, logoDataUrl);
  addFooter(doc);
  doc.save(`${service.slug || 'service'}-proposal.pdf`);
}

export async function generateModulePdf(course) {
  if (!course?.title) return;
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
    course.modules.forEach((m, idx) => {
      if (y > 265) { doc.addPage(); y = 20; }
      doc.setFontSize(11);
      doc.setTextColor(15, 42, 82);
      doc.text(`Module ${idx + 1}: ${m.title}`, 14, y);
      y += 6;
      doc.setFontSize(10);
      doc.setTextColor(51, 65, 85);
      (m.points || []).forEach((p) => {
        if (y > 270) { doc.addPage(); y = 20; }
        const lines = doc.splitTextToSize(`• ${p}`, 170);
        doc.text(lines, 20, y);
        y += lines.length * 5 + 2;
      });
      y += 4;
    });
  }

  const logoDataUrl = await getLogoDataUrl();
  addWatermark(doc, logoDataUrl);
  addFooter(doc);
  doc.save(`${course.slug || 'course'}-module.pdf`);
}

export async function generateWorkshopSummaryPdf(workshop) {
  if (!workshop?.title) return;
  const doc = new jsPDF();
  addHeader(doc, `Workshop Summary: ${workshop.title}`);
  let y = 55;
  doc.setFontSize(11);
  doc.setTextColor(51, 65, 85);
  const desc = doc.splitTextToSize(workshop.description || '', 180);
  doc.text(desc, 14, y);
  y += desc.length * 6 + 10;

  doc.setFontSize(11);
  doc.setTextColor(15, 42, 82);
  doc.text(`Location: ${workshop.location || 'N/A'}`, 14, y); y += 6;
  doc.text(`Date: ${workshop.date || 'N/A'}   |   Duration: ${workshop.durationLabel || 'N/A'}`, 14, y); y += 6;
  doc.text(`Attendees: ${workshop.attendeesCount ?? 'N/A'}`, 14, y); y += 10;

  if (Array.isArray(workshop.timeline) && workshop.timeline.length) {
    doc.setFontSize(13);
    doc.setTextColor(15, 42, 82);
    doc.text('Timeline', 14, y);
    y += 8;
    doc.setFontSize(10);
    doc.setTextColor(51, 65, 85);
    workshop.timeline.forEach((t) => {
      if (y > 270) { doc.addPage(); y = 20; }
      doc.text(`${t.time} — ${t.activity}`, 18, y);
      y += 7;
    });
    y += 4;
  }

  if (workshop.outcome) {
    if (y > 250) { doc.addPage(); y = 20; }
    doc.setFontSize(13);
    doc.setTextColor(15, 42, 82);
    doc.text('Outcome', 14, y);
    y += 8;
    doc.setFontSize(10);
    doc.setTextColor(51, 65, 85);
    const outcomeLines = doc.splitTextToSize(workshop.outcome, 180);
    doc.text(outcomeLines, 14, y);
  }

  const logoDataUrl = await getLogoDataUrl();
  addWatermark(doc, logoDataUrl);
  addFooter(doc);
  doc.save(`${workshop.slug || 'workshop'}-summary.pdf`);
}

export async function generateResourcePdf(resource) {
  if (!resource?.title) return;
  const doc = new jsPDF();
  addHeader(doc, resource.title);
  let y = 55;
  doc.setFontSize(11);
  doc.setTextColor(51, 65, 85);
  const desc = doc.splitTextToSize(resource.shortDescription || '', 180);
  doc.text(desc, 14, y);
  y += desc.length * 6 + 14;

  doc.setFontSize(9);
  doc.setTextColor(150, 150, 150);
  doc.text(`© ${new Date().getFullYear()} Research Academy Bangladesh. All rights reserved. Unauthorized redistribution prohibited.`, 14, 280);

  const logoDataUrl = await getLogoDataUrl();
  addWatermark(doc, logoDataUrl);
  addFooter(doc);
  doc.save(resource.fileName || `${resource.slug || 'resource'}.pdf`);
}