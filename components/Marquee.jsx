'use client';
export default function Marquee({ items, sep = '—' }) {
  const txt = items.join(` ${sep} `) + ` ${sep} `;
  return (
    <div className="overflow-hidden py-5 border-y border-lum-200/50">
      <div className="marquee-track whitespace-nowrap">
        {[0,1].map(i => <span key={i} className="inline-block pr-4 text-sm font-display font-light tracking-wide text-lum-400">{txt}</span>)}
      </div>
    </div>
  );
}
