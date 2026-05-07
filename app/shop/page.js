'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import { getProducts, CATEGORIES } from '@/lib/api';

export default function ShopAll() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [sort, setSort] = useState('default');
  const [catFilter, setCatFilter] = useState(null);
  const loaderRef = useRef(null);

  const loadPage = useCallback((p, append = false) => {
    if (append) setLoadingMore(true); else setLoading(true);
    const data = getProducts(p, 24, catFilter);
    setProducts(prev => append ? [...prev, ...data.products] : data.products);
    setTotal(data.total);
    setTotalPages(data.totalPages);
    setPage(p);
    setLoading(false);
    setLoadingMore(false);
  }, [catFilter]);

  useEffect(() => { loadPage(1); }, [loadPage]);

  useEffect(() => {
    if (!loaderRef.current) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !loadingMore && page < totalPages) loadPage(page + 1, true);
    }, { threshold: 0.1 });
    obs.observe(loaderRef.current);
    return () => obs.disconnect();
  }, [page, totalPages, loadingMore, loadPage]);

  let display = [...products];
  if (sort === 'price-asc') display.sort((a, b) => a.price - b.price);
  if (sort === 'price-desc') display.sort((a, b) => b.price - a.price);
  if (sort === 'rating') display.sort((a, b) => b.rating - a.rating);

  return (
    <div className="pt-28 lg:pt-32 pb-20 bg-lum-50 min-h-screen">
      <div className="max-w-[1440px] mx-auto px-5 lg:px-10">
        <div className="mb-10">
          <h1 className="font-display text-4xl lg:text-5xl xl:text-6xl font-light">All Products</h1>
          <p className="text-sm text-lum-400 mt-3">{total.toLocaleString()} products</p>
          <div className="w-12 h-px bg-lum-teal mt-4"/>
        </div>

        {/* Category filter */}
        <div className="flex items-center gap-2 flex-wrap mb-6">
          <button onClick={() => setCatFilter(null)} className={`px-4 py-2 text-[11px] font-medium tracking-[0.1em] uppercase transition-all ${!catFilter ? 'bg-lum-800 text-white' : 'border border-lum-200 text-lum-400 hover:text-lum-800'}`}>All</button>
          {CATEGORIES.map(c => (
            <button key={c.slug} onClick={() => setCatFilter(c.slug)} className={`px-4 py-2 text-[11px] font-medium tracking-[0.1em] uppercase transition-all ${catFilter===c.slug ? 'bg-lum-800 text-white' : 'border border-lum-200 text-lum-400 hover:text-lum-800'}`}>{c.label}</button>
          ))}
        </div>

        <div className="flex items-center justify-between mb-8 pb-4 border-b border-lum-200">
          <p className="text-xs text-lum-400">Showing {display.length} of {total.toLocaleString()}</p>
          <select value={sort} onChange={e => setSort(e.target.value)} className="text-[11px] tracking-wider uppercase text-lum-500 bg-transparent border border-lum-200 px-4 py-2 outline-none cursor-pointer">
            <option value="default">Featured</option>
            <option value="price-asc">Price: Low → High</option>
            <option value="price-desc">Price: High → Low</option>
            <option value="rating">Top Rated</option>
          </select>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {Array.from({length:24}).map((_,i) => <div key={i}><div className="aspect-[3/4] skeleton"/><div className="pt-3 space-y-2"><div className="h-2.5 skeleton w-1/4"/><div className="h-3 skeleton w-3/4"/></div></div>)}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {display.map((p,i) => <ProductCard key={`${p._uid}-${i}`} product={p}/>)}
            </div>
            {page < totalPages && (
              <div ref={loaderRef} className="mt-12 text-center py-8">
                {loadingMore ? (
                  <div className="flex items-center justify-center gap-3 text-sm text-lum-400">
                    <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
                    Loading more...
                  </div>
                ) : <p className="text-xs text-lum-400">Scroll for more</p>}
              </div>
            )}
            {page >= totalPages && <p className="mt-12 text-center text-xs text-lum-400">You&apos;ve browsed all {total.toLocaleString()} products</p>}
          </>
        )}
      </div>
    </div>
  );
}
