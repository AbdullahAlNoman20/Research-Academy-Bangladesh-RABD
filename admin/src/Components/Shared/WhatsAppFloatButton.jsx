
// FILE: src/components/shared/WhatsAppFloatButton.jsx  (new)

import { FaWhatsapp } from 'react-icons/fa';
import { WHATSAPP_URL } from '../../config/site';

export default function WhatsAppFloatButton() {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Message us on WhatsApp"
        className="relative flex h-14 w-14 items-center justify-center rounded-full border-2 border-secondary bg-[#25D366] text-white shadow-lg transition-transform duration-200 hover:scale-110"
      >
        <span
          className="absolute inset-0 animate-ping rounded-full bg-[#25D366]/40"
          aria-hidden="true"
        />

        <FaWhatsapp className="relative h-6 w-6" />
      </a>
    </div>
  );
}