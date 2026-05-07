'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import ProductCard from './ProductCard';
import { fetchCategory, getProducts } from '@/lib/api';

// Category mood images for the Revolut-style reveal
const MOOD_IMAGES = {
  skincare: 'photo-1556228578-0d85b1a4d571',
  beauty: 'photo-1487412720507-e7ab37603c6f',
  fragrances: 'photo-1541643600914-78b084683601',
  'womens-dresses': 'photo-1496747611176-843222e1e57c',
  'womens-bags': 'photo-1584917865442-de89df76afd3',
  'womens-jewellery': 'photo-1602751584552-8ba73aad10e1',
  'womens-shoes': 'photo-1543163521-1bf539c55dd2',
  'womens-watches': 'photo-1522312346375-d1a52e2b99b3',
  sunglasses: 'photo-1511499767150-a48a237f0083',
  tops: 'photo-1469334031218-e382a71b716b',
};

export default function FeaturedSection({ title, label, categories, limit = 8, viewAllHref, viewAllText = 'View All', bg = 'bg-lum-50', showReveal = false }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const ref = useRef(null);
  const revealRef = useRef(null);

  useEffect(() => {
    async function load() {
      try {
        const perCat = Math.ceil(limit / categories.length);
        const results = await Promise.all(categories.map((c) => fetchCategory(c, perCat)));
        const all = results.flat().slice(0, limit);
        setProducts(all.length >= limit ? all : getProducts(1, limit, categories[0]).products);
      } catch {
        setProducts(getProducts(1, limit).products);
      }
      setLoading(false);
    }
    load();
  }, [categories, limit]);

  useEffect(() => {
    if (loading) return;
    let ctx;
    const init = async () => {
      const gsap = (await import('gsap')).default;
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);
      ctx = gsap.context(() => {
        // Reveal effect: mood image scales up and fades to reveal products
        if (showReveal && revealRef.current) {
          const overlay = revealRef.current;
          gsap.fromTo(overlay, { opacity: 1, scale: 1 }, {
            opacity: 0,
            scale: 1.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: ref.current,
              start: 'top 60%',
              end: 'top 10%',
              scrub: 1,
            },
          });
        }

        // Product cards stagger in
        const cards = ref.current?.querySelectorAll('.product-card');
        if (cards?.length) {
          gsap.fromTo(cards, { opacity: 0, y: 40 }, {
            opacity: 1, y: 0, stagger: 0.06, duration: 0.6, ease: 'power2.out',
            scrollTrigger: { trigger: ref.current, start: showReveal ? 'top 30%' : 'top 80%' },
          });
        }
      }, ref);
    };
    init();
    return () => ctx && ctx.revert();
  }, [loading, showReveal]);

  const moodImg = MOOD_IMAGES[categories[0]] || MOOD_IMAGES.beauty;

  return (
    <section ref={ref} className={`py-20 lg:py-28 ${bg} relative`}>
      {/* Revolut-style reveal overlay */}
      {showReveal && (
        <div
          ref={revealRef}
          className="absolute inset-0 z-10 overflow-hidden pointer-events-none"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-lum-900/50 via-lum-900/30 to-lum-900/60 z-10" />
          <img
            src={`https://images.unsplash.com/${moodImg}?w=1600&h=900&fit=crop&q=85`}
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 z-20 flex items-center justify-center">
            <div className="text-center">
              {label && <p className="text-[11px] font-medium tracking-[0.3em] uppercase text-white/60 mb-3">{label}</p>}
              <h2 className="font-display text-4xl sm:text-5xl lg:text-7xl font-light text-white">{title}</h2>
              <div className="w-12 h-px bg-lum-teal mx-auto mt-6" />
            </div>
          </div>
        </div>
      )}

      <div className="max-w-[1440px] mx-auto px-5 lg:px-10 relative z-20">
        <div className="flex items-end justify-between mb-12">
          <div>
            {label && <p className="text-[11px] font-medium tracking-[0.3em] uppercase text-lum-400 mb-3">{label}</p>}
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-light">{title}</h2>
          </div>
          {viewAllHref && (
            <Link href={viewAllHref} className="hidden sm:inline-flex items-center gap-2 text-sm font-medium text-lum-500 hover:text-lum-teal transition-colors group">
              {viewAllText}
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
            </Link>
          )}
        </div>
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
            {Array.from({ length: limit }).map((_, i) => <div key={i}><div className="aspect-[3/4] skeleton" /><div className="pt-3 space-y-2"><div className="h-2.5 skeleton w-1/4" /><div className="h-3 skeleton w-3/4" /></div></div>)}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
            {products.map((p, i) => <ProductCard key={`${p._uid ?? p.id}-${i}`} product={p} />)}
          </div>
        )}
      </div>
    </section>
  );
}
