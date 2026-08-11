// FILE: src/components/shared/GoogleMapEmbed.jsx  (new)
import { MAP_EMBED_URL } from '../../config/site';

export default function GoogleMapEmbed({ title = 'Head Office Location' }) {
  return (
    <div className="overflow-hidden rounded-lg border border-neutral-100">
      <iframe
        title={title}
        src={MAP_EMBED_URL}
        width="100%"
        height="320"
        style={{ border: 0 }}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
}