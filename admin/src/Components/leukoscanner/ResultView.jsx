// FILE: src/Components/leukoscanner/ResultView.jsx  (full rewrite — on-screen results table + reasons, Back button)
import { FaWhatsapp } from 'react-icons/fa';
import Button from '../Shared/Button';
import doctorPhoto from '../../assets/dr-momena-begum.png';
import { RESULT_META } from '../../utils/leukemiaClassifier';
import { generateLeukoReportPdf } from '../../utils/generateLeukoReportPdf';
import { WHATSAPP_URL } from '../../config/site';
import { useToast } from '../../hooks/useToast';

const COPY = {
  normal: {
    heading: 'Blood Cancer Risk: Normal',
    body: 'All submitted CBC parameters fall within normal reference ranges, and no atypical cells or blasts were detected. No specific action is required at this time; routine health checkups are still recommended.'
  },
  A: {
    heading: 'Blood Cancer Risk: High',
    body: 'Referral to a hematologist is recommended. The submitted values show a pattern consistent with a high-risk profile, and prompt clinical evaluation is strongly advised.'
  },
  B: {
    heading: 'Blood Cancer Risk: Moderate',
    body: 'The submitted values show a pattern that may warrant further evaluation. A consultation with a hematologist can be considered to confirm these findings with laboratory-grade diagnostics.'
  },
  C: {
    heading: 'Blood Cancer Risk: Low',
    body: 'The likelihood of a blood cancer-related finding is low based on the submitted values. A consultation is optional. Maintaining a balanced diet, adequate hydration, regular rest, and periodic health checkups is recommended.'
  },
  indeterminate: {
    heading: 'Result: Needs Professional Review',
    body: 'The submitted combination of values does not clearly match a single screening category. We recommend having these results reviewed by a qualified physician for an accurate assessment.'
  }
};

const STATUS_CLASS = {
  Normal: 'text-primary',
  Low: 'text-red-600',
  High: 'text-red-600',
  Present: 'text-red-600'
};

export default function ResultView({ classification, onRestart, onBack }) {
  const { riskClass, table, reasons } = classification;
  const meta = RESULT_META[riskClass];
  const copy = COPY[riskClass];
  const isHighRisk = riskClass === 'A';
  const { showToast } = useToast();

  async function handleDownload() {
    try {
      await generateLeukoReportPdf(classification);
      showToast('Report download started.', 'success');
    } catch {
      showToast('Download failed. Please try again.', 'error');
    }
  }

  return (
    <section className="mx-auto max-w-3xl px-4 py-16 lg:px-8">
      <button type="button" onClick={onBack} className="hover-underline-gold mb-6 inline-flex w-fit items-center gap-1 text-sm font-semibold text-primary">
        ← Back
      </button>

      <div className="mb-8 rounded-lg border border-neutral-100 bg-white p-8 text-center">
        <span className="mb-3 inline-block rounded-full px-4 py-1 text-xs font-semibold text-white" style={{ backgroundColor: meta.color }}>
          {meta.label}
        </span>
        <h1 className="mb-3 text-2xl font-bold text-primary">{copy.heading}</h1>
        <p className="mx-auto max-w-xl text-sm text-neutral-700">{copy.body}</p>
      </div>

      <div className="mb-8 overflow-x-auto rounded-lg border border-neutral-100 bg-white">
        <table className="w-full min-w-[560px] text-left text-sm">
          <thead>
            <tr className="border-b border-neutral-100 bg-neutral-50">
              <th className="px-4 py-3 font-semibold text-primary">Parameter</th>
              <th className="px-4 py-3 font-semibold text-primary">Your Value</th>
              <th className="px-4 py-3 font-semibold text-primary">Normal Range</th>
              <th className="px-4 py-3 font-semibold text-primary">Status</th>
            </tr>
          </thead>
          <tbody>
            {table.map((row) => (
              <tr key={row.parameter} className="border-b border-neutral-100 last:border-0">
                <td className="px-4 py-3 text-neutral-700">{row.parameter}</td>
                <td className="px-4 py-3 font-semibold text-primary">{row.value}</td>
                <td className="px-4 py-3 text-neutral-700">{row.normalRange}</td>
                <td className={`px-4 py-3 font-semibold ${STATUS_CLASS[row.status] || 'text-primary'}`}>{row.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mb-8 rounded-lg border border-neutral-100 bg-neutral-50 p-6">
        <h2 className="mb-3 text-sm font-bold text-primary">Why This Result</h2>
        <ul className="flex list-disc flex-col gap-1 pl-5 text-sm text-neutral-700">
          {reasons.map((r) => <li key={r}>{r}</li>)}
        </ul>
      </div>

      {isHighRisk && (
        <div className="mb-8 rounded-lg border border-red-100 bg-red-50 p-6">
          <p className="mb-4 text-sm font-semibold text-red-700">Referral to a hematologist is recommended.</p>
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start">
            <img src={doctorPhoto} alt="Dr. Momena Begum" className="h-20 w-20 rounded-full object-cover" width="80" height="80" loading="lazy" />
            <div>
              <h3 className="font-bold text-primary">Dr. Momena Begum, MD</h3>
              <p className="mb-1 text-xs font-semibold text-secondary-dark">Founder & Academic Director, Research Academy Bangladesh</p>
              <p className="text-xs text-neutral-700">info@researchacademybd.com · +880 1234 567890</p>
              <div className="mt-3 flex flex-wrap gap-3">
                <Button to="/apply" variant="primary">Book a Consultation</Button>
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn-reflect inline-flex items-center gap-2 rounded-md border-2 border-secondary px-6 py-3 text-sm font-semibold text-primary">
                  <FaWhatsapp className="h-4 w-4" /> Instant Meeting Booking
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {(riskClass === 'B' || riskClass === 'indeterminate') && (
        <div className="mb-8 rounded-lg border border-neutral-100 bg-neutral-50 p-6 text-center">
          <p className="mb-3 text-sm text-neutral-700">A hematologist consultation can help confirm these findings.</p>
          <Button to="/apply" variant="ghost">Book a Consultation</Button>
        </div>
      )}

      <div className="mb-8 flex flex-wrap justify-center gap-4">
        <Button onClick={handleDownload}>Download Medical Report</Button>
        <Button onClick={onRestart} variant="ghost">Start New Screening</Button>
      </div>

      <p className="text-center text-xs text-neutral-700">
        This tool provides an automated screening estimate only and is not a substitute for professional medical diagnosis.
      </p>
    </section>
  );
}