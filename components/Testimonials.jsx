'use client';
import { useEffect, useRef } from 'react';

const reviews = [
  { name: 'Adaeze O.', text: 'The quality is exceptional — every product feels curated with intention.', product: 'Skincare Set' },
  { name: 'Fatima K.', text: 'Beautiful pieces, stunning packaging. This is my new favorite brand.', product: 'Silk Dress' },
  { name: 'Ngozi M.', text: 'I\'ve received so many compliments. The jewellery is truly timeless.', product: 'Gold Pendant' },
  { name: 'Chidinma E.', text: 'Fast shipping, premium quality. Lumina understands modern elegance.', product: 'Fragrance Set' },
];

export default function Testimonials() {
  const ref = useRef(null);
  useEffect(() => {
    let ctx;
    const init = async () => {
      const gsap = (await import('gsap')).default;
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);
      ctx = gsap.context(() => {
        const cards = ref.current?.querySelectorAll('.rev');
        if (cards?.length) gsap.fromTo(cards, { opacity: 0, y: 30 }, { opacity: 1, y: 0, stagger: 0.1, duration: 0.6, scrollTrigger: { trigger: ref.current, start: 'top 80%' } });
      }, ref);
    };
    init();
    return () => ctx && ctx.revert();
  }, []);

  return (
    <section ref={ref} className="py-20 lg:py-28 bg-lum-50">
      <div className="max-w-[1440px] mx-auto px-5 lg:px-10">
        <div className="text-center mb-14">
          <p className="text-[11px] font-medium tracking-[0.3em] uppercase text-lum-400 mb-3">Testimonials</p>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-light">Trusted Worldwide</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {reviews.map((r, i) => (
            <div key={i} className="rev p-6 border border-lum-200 bg-white hover:border-lum-teal/20 hover:shadow-lg hover:shadow-lum-teal/5 transition-all duration-500">
              <span className="font-display text-3xl text-lum-200">&ldquo;</span>
              <p className="text-sm text-lum-600 leading-relaxed mt-2 mb-6">{r.text}</p>
              <div className="flex gap-0.5 mb-4">{[1,2,3,4,5].map(s => <div key={s} className="w-1 h-1 rounded-full bg-lum-gold"/>)}</div>
              <div className="pt-4 border-t border-lum-100">
                <p className="text-sm font-medium">{r.name}</p>
                <p className="text-[11px] text-lum-400 mt-0.5">Verified — {r.product}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-20 pt-10 border-t border-lum-200">
          <p className="text-center text-[11px] tracking-[0.3em] uppercase text-lum-400 mb-8">As Featured In</p>
          <div className="flex items-center justify-center gap-10 sm:gap-16 flex-wrap">
            {['VOGUE','ELLE','HARPER\'S BAZAAR','ALLURE','W MAGAZINE'].map(n => (
              <span key={n} className="font-display text-base sm:text-lg font-medium text-lum-300 tracking-[0.1em]">{n}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
