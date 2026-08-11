// FILE: src/components/ui/SignatureBlock.jsx  (new)
import signature from '../../assets/signature.png';

export default function SignatureBlock({ quote }) {
  return (
    <div className="flex flex-col items-start gap-2">
      <p className="max-w-md text-sm italic text-neutral-700">“{quote}”</p>
      <img src={signature} alt="Dr. Momena Begum signature" className="h-14 object-contain" width="160" height="56" loading="lazy" />
    </div>
  );
}