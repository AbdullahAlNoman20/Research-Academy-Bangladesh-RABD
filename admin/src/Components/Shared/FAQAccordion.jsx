// FILE: src/components/shared/FAQAccordion.jsx  (new)
import { useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';

export default function FAQAccordion({ items }) {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className="flex flex-col divide-y divide-neutral-100 rounded-lg border border-neutral-100">
      {items.map((item, idx) => {
        const isOpen = openIndex === idx;
        return (
          <div key={item.question}>
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : idx)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between px-5 py-4 text-left text-sm font-semibold text-primary"
            >
              {item.question}
              <FaChevronDown className={`h-4 w-4 shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            {isOpen && <p className="px-5 pb-4 text-sm text-neutral-700">{item.answer}</p>}
          </div>
        );
      })}
    </div>
  );
}