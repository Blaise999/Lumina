'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { CATEGORIES } from '@/lib/api';

const catImgs = {
  skincare: 'photo-1619451334792-150fd785ee74',
  beauty: 'photo-1596462502278-27bfdc403348',
  fragrances: 'photo-1592945403244-b3fbafd7f539',
  'womens-dresses': 'photo-1572804013309-59a88b7e92f1',
  'womens-bags': 'photo-1548036328-c9fa89d128fa',
  'womens-jewellery': 'photo-1611591437281-460bfbe1220a',
  'womens-shoes': 'photo-1560769629-975ec94e6a86',
  'womens-watches': 'photo-1542496658-e33a6d0d50f6',
  sunglasses: 'photo-1572635196237-14b3f281503f',
  tops: 'photo-1525507119028-ed4c629a60a3',
};

export default function CategoryShowcase() {
  const ref = useRef(null);
  useEffect(() => {
    let ctx;
    const init = async () => {
      const gsap = (await import('gsap')).default;
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);
      ctx = gsap.context(() => {
        const items = ref.current?.querySelectorAll('.cat-item');
        if (items?.length) gsap.fromTo(items, { opacity: 0, y: 50, scale: 0.95 }, { opacity: 1, y: 0, scale: 1, stagger: 0.06, duration: 0.6, ease: 'power2.out', scrollTrigger: { trigger: ref.current, start: 'top 80%' } });
      }, ref);
    };
    init();
    return () => ctx && ctx.revert();
  }, []);

  return (
    <section ref={ref} className="py-20 lg:py-28 bg-white">
      <div className="max-w-[1440px] mx-auto px-5 lg:px-10">
        <div className="text-center mb-14">
          <p className="text-[11px] font-medium tracking-[0.3em] uppercase text-lum-400 mb-3">Collections</p>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-light">Shop by Category</h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {CATEGORIES.map((cat) => (
            <Link key={cat.slug} href={`/category/${cat.slug}`} className="cat-item group relative aspect-[3/4] overflow-hidden bg-lum-100">
              <img src={`https://images.unsplash.com/${catImgs[cat.slug]}?w=500&h=660&fit=crop&q=80`} alt={cat.label} className="w-full h-full object-cover transition-transform duration-[1.2s] group-hover:scale-110" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-lum-900/70 via-lum-900/10 to-transparent transition-all duration-500 group-hover:from-lum-900/80" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 className="font-display text-lg text-white font-medium">{cat.label}</h3>
                <p className="text-[11px] text-white/50 mt-0.5 group-hover:text-lum-teal transition-colors duration-500">Shop Now →</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
