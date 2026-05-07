'use client';

import Link from 'next/link';
import { ALL_CATEGORIES } from '@/lib/api';

export default function CategoryScroll() {
  return (
    <section id="categories" className="py-16 lg:py-24 bg-white">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-12">
          <span className="text-xs font-semibold tracking-[0.25em] text-lumina-teal uppercase">Explore</span>
          <h2 className="mt-3 font-display text-3xl lg:text-4xl font-bold">Glow Categories</h2>
          <div className="section-divider mt-4" />
        </div>

        {/* Category grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {ALL_CATEGORIES.map((cat, i) => (
            <Link
              key={cat.slug}
              href={`/category/${cat.slug}`}
              className="group relative bg-lumina-cream rounded-2xl p-6 text-center hover:bg-white hover:shadow-xl hover:shadow-lumina-teal/5 transition-all duration-500 border border-transparent hover:border-lumina-teal/10"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-500">{cat.icon}</div>
              <h3 className="font-display text-sm font-semibold mb-1">{cat.label}</h3>
              <p className="text-xs text-lumina-warm">{cat.desc}</p>
              <div className="absolute inset-0 rounded-2xl border-2 border-lumina-teal/0 group-hover:border-lumina-teal/20 transition-all duration-500" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
