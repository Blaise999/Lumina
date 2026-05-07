'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import { fetchCategory, getProducts, CATEGORIES } from '@/lib/api';

export default function CategoryPage() {
  const { slug } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState('default');
  const [priceFilter, setPriceFilter] = useState('all');
  const perPage = 24;

  const cat = CATEGORIES.find(c => c.slug === slug);
  const title = cat?.label || slug.replace(/-/g,' ').replace(/\b\w/g,c=>c.toUpperCase());

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        // Fetch real DummyJSON products
        const real = await fetchCategory(slug, 30);
        // Also get generated products for this category
        const gen = getProducts(1, 200, slug).products;
        // Merge: real first, then generated
        const merged = [...real, ...gen.filter(g => !real.find(r => r.id === g.id))];
        setProducts(merged);
      } catch {
        setProducts(getProducts(1, 200, slug).products);
      }
      setLoading(false);
    }
    load();
    setPage(1);
  }, [slug]);

  let display = [...products];
  if (priceFilter !== 'all') {
    const [min, max] = priceFilter.split('-').map(Number);
    display = display.filter(p => p.price >= min && (max ? p.price <= max : true));
  }
  if (sort === 'price-asc') display.sort((a,b) => a.price - b.price);
  if (sort === 'price-desc') display.sort((a,b) => b.price - a.price);
  if (sort === 'rating') display.sort((a,b) => b.rating - a.rating);

  const paginated = display.slice((page-1)*perPage, page*perPage);
  const totalPages = Math.ceil(display.length / perPage);

  return (
    <div className="pt-28 lg:pt-32 pb-20 bg-lum-50 min-h-screen">
      <div className="max-w-[1440px] mx-auto px-5 lg:px-10">
        <nav className="flex items-center gap-2 text-[11px] text-lum-400 mb-8">
          <Link href="/" className="hover:text-lum-800 transition-colors">Home</Link><span>/</span><span className="text-lum-600">{title}</span>
        </nav>
        <div className="mb-10">
          <h1 className="font-display text-4xl lg:text-5xl xl:text-6xl font-light">{title}</h1>
          <p className="text-sm text-lum-400 mt-3">{display.length} products</p>
          <div className="w-12 h-px bg-lum-teal mt-4"/>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-4 border-b border-lum-200">
          <div className="flex items-center gap-2 flex-wrap">
            {['all','0-25','25-50','50-100','100-500'].map(r => {
              const labels = {all:'All','0-25':'Under $25','25-50':'$25–$50','50-100':'$50–$100','100-500':'$100+'};
              return <button key={r} onClick={() => {setPriceFilter(r);setPage(1);}} className={`px-4 py-2 text-[11px] font-medium tracking-[0.1em] uppercase transition-all ${priceFilter===r?'bg-lum-800 text-white':'border border-lum-200 text-lum-400 hover:text-lum-800'}`}>{labels[r]}</button>;
            })}
          </div>
          <select value={sort} onChange={e => setSort(e.target.value)} className="text-[11px] tracking-wider uppercase text-lum-500 bg-transparent border border-lum-200 px-4 py-2 outline-none cursor-pointer">
            <option value="default">Featured</option><option value="price-asc">Price: Low → High</option><option value="price-desc">Price: High → Low</option><option value="rating">Top Rated</option>
          </select>
        </div>
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">{Array.from({length:perPage}).map((_,i) => <div key={i}><div className="aspect-[3/4] skeleton"/><div className="pt-3 space-y-2"><div className="h-2.5 skeleton w-1/4"/><div className="h-3 skeleton w-3/4"/></div></div>)}</div>
        ) : paginated.length > 0 ? (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">{paginated.map((p,i) => <ProductCard key={`${p._uid??p.id}-${i}`} product={p}/>)}</div>
            {totalPages > 1 && (
              <div className="mt-14 flex items-center justify-center gap-2">
                <button onClick={() => {setPage(Math.max(1,page-1)); window.scrollTo({top:0,behavior:'smooth'});}} disabled={page<=1} className="px-4 py-2 text-xs font-medium border border-lum-200 disabled:opacity-30 hover:bg-lum-800 hover:text-white hover:border-lum-800 transition-all">Previous</button>
                {Array.from({length:Math.min(7,totalPages)},(_,i)=>{
                  let pn; if(totalPages<=7)pn=i+1; else if(page<=4)pn=i+1; else if(page>=totalPages-3)pn=totalPages-6+i; else pn=page-3+i;
                  return <button key={pn} onClick={()=>{setPage(pn);window.scrollTo({top:0,behavior:'smooth'});}} className={`w-10 h-10 text-xs font-medium transition-all ${page===pn?'bg-lum-800 text-white':'text-lum-400 border border-lum-200 hover:text-lum-800'}`}>{pn}</button>;
                })}
                <button onClick={() => {setPage(Math.min(totalPages,page+1)); window.scrollTo({top:0,behavior:'smooth'});}} disabled={page>=totalPages} className="px-4 py-2 text-xs font-medium border border-lum-200 disabled:opacity-30 hover:bg-lum-800 hover:text-white hover:border-lum-800 transition-all">Next</button>
              </div>
            )}
          </>
        ) : <div className="text-center py-20"><p className="font-display text-xl mb-2">No products found</p><p className="text-sm text-lum-400">Try adjusting your filters.</p></div>}
        <div className="mt-20 pt-10 border-t border-lum-200">
          <p className="text-[11px] tracking-[0.3em] uppercase text-lum-400 text-center mb-6">Browse Other Collections</p>
          <div className="flex flex-wrap justify-center gap-2">
            {CATEGORIES.filter(c => c.slug !== slug).map(c => <Link key={c.slug} href={`/category/${c.slug}`} className="px-5 py-2.5 text-xs font-medium tracking-wider uppercase border border-lum-200 text-lum-500 hover:bg-lum-800 hover:text-white hover:border-lum-800 transition-all">{c.label}</Link>)}
          </div>
        </div>
      </div>
    </div>
  );
}
