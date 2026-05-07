'use client';

import Link from 'next/link';

export default function PromoBanner() {
  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Beauty promo */}
          <div className="relative group rounded-3xl overflow-hidden bg-gradient-to-br from-lumina-teal/10 via-lumina-teal/5 to-lumina-cream p-8 lg:p-12 min-h-[320px] flex flex-col justify-end border border-lumina-teal/10 hover:border-lumina-teal/20 transition-all duration-500">
            <div className="absolute top-8 right-8 text-8xl opacity-20 group-hover:opacity-30 transition-opacity duration-500">✨</div>
            <span className="text-xs font-bold tracking-[0.2em] text-lumina-teal uppercase">Skincare Edit</span>
            <h3 className="mt-3 font-display text-2xl lg:text-3xl font-bold">Your Glow-Up<br />Starts Here</h3>
            <p className="mt-3 text-sm text-lumina-charcoal-light max-w-xs">Discover our curated collection of serums, moisturizers & treatments for radiant skin.</p>
            <Link href="/category/skincare" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-lumina-teal hover:text-lumina-teal-dark group/link transition-colors">
              Shop Skincare
              <svg className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>

          {/* Fashion promo */}
          <div className="relative group rounded-3xl overflow-hidden bg-gradient-to-br from-lumina-rose/15 via-lumina-gold/5 to-lumina-cream p-8 lg:p-12 min-h-[320px] flex flex-col justify-end border border-lumina-rose/10 hover:border-lumina-rose/20 transition-all duration-500">
            <div className="absolute top-8 right-8 text-8xl opacity-20 group-hover:opacity-30 transition-opacity duration-500">👗</div>
            <span className="text-xs font-bold tracking-[0.2em] text-lumina-gold uppercase">Designer Picks</span>
            <h3 className="mt-3 font-display text-2xl lg:text-3xl font-bold">Fashion That<br />Elevates</h3>
            <p className="mt-3 text-sm text-lumina-charcoal-light max-w-xs">Statement dresses, premium bags & jewellery curated for the modern queen.</p>
            <Link href="/category/womens-dresses" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-lumina-gold hover:text-yellow-700 group/link transition-colors">
              Shop Fashion
              <svg className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
