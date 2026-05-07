'use client';

import { useState, useEffect, useRef } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { fetchProduct, fetchCategory, formatPrice, getOriginalPrice } from '@/lib/api';
import ProductCard from '@/components/ProductCard';

export default function ProductPage() {
  const { id } = useParams();
  const { addItem } = useCart();
  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selImg, setSelImg] = useState(0);
  const [qty, setQty] = useState(1);
  const [tab, setTab] = useState('details');
  const ref = useRef(null);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const p = await fetchProduct(id);
        setProduct(p); setSelImg(0); setQty(1);
        const rel = await fetchCategory(p.category, 8);
        setRelated(rel.filter(r => r.id !== p.id).slice(0, 4));
      } catch (e) { console.error(e); }
      setLoading(false);
    }
    load();
  }, [id]);

  useEffect(() => {
    if (loading || !ref.current) return;
    let ctx;
    const init = async () => {
      const gsap = (await import('gsap')).default;
      ctx = gsap.context(() => {
        gsap.fromTo('.pdp-r', { opacity: 0, y: 25 }, { opacity: 1, y: 0, stagger: 0.07, duration: 0.5, ease: 'power2.out', delay: 0.1 });
      }, ref);
    };
    init();
    return () => ctx && ctx.revert();
  }, [loading, id]);

  if (loading) return (
    <div className="pt-32 pb-20 max-w-[1440px] mx-auto px-5 lg:px-10">
      <div className="grid lg:grid-cols-2 gap-12"><div className="aspect-square skeleton"/><div className="space-y-5 py-8"><div className="h-3 skeleton w-1/4"/><div className="h-8 skeleton w-3/4"/><div className="h-6 skeleton w-1/4"/><div className="h-20 skeleton"/><div className="h-14 skeleton w-1/2"/></div></div>
    </div>
  );

  if (!product) return <div className="pt-32 pb-20 text-center"><h1 className="font-display text-2xl">Product not found</h1><Link href="/" className="btn-primary mt-6 inline-block"><span>Back to Shop</span></Link></div>;

  const images = product._unsplashImages || product.images || [product._unsplashThumb || product.thumbnail];
  const orig = getOriginalPrice(product.price, product.discountPercentage);
  const isBeauty = ['skincare','beauty','fragrances'].includes(product.category);

  return (
    <div ref={ref} className="pt-28 lg:pt-32 pb-20 bg-lum-50">
      <div className="max-w-[1440px] mx-auto px-5 lg:px-10 mb-8">
        <nav className="flex items-center gap-2 text-[11px] text-lum-400">
          <Link href="/" className="hover:text-lum-800 transition-colors">Home</Link><span>/</span>
          <Link href={`/category/${product.category}`} className="hover:text-lum-800 transition-colors capitalize">{product.category?.replace(/-/g,' ')}</Link><span>/</span>
          <span className="text-lum-600 truncate max-w-[180px]">{product.title}</span>
        </nav>
      </div>
      <div className="max-w-[1440px] mx-auto px-5 lg:px-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">
          <div className="pdp-r space-y-3">
            <div className="aspect-square bg-white overflow-hidden">
              <img src={images[selImg]} alt={product.title} className="w-full h-full object-cover hover:scale-[1.03] transition-transform duration-[1.2s]"/>
            </div>
            {images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto">
                {images.map((img, i) => <button key={i} onClick={() => setSelImg(i)} className={`flex-shrink-0 w-20 h-20 overflow-hidden border transition-all ${i===selImg ? 'border-lum-800' : 'border-transparent opacity-50 hover:opacity-80'}`}><img src={img} alt="" className="w-full h-full object-cover"/></button>)}
              </div>
            )}
          </div>
          <div className="py-2 lg:py-4">
            <p className="pdp-r text-[11px] tracking-[0.25em] uppercase text-lum-400 font-medium">{product.brand || product.category?.replace(/-/g,' ')}</p>
            <h1 className="pdp-r mt-3 font-display text-3xl lg:text-4xl font-light leading-tight">{product.title}</h1>
            <div className="pdp-r mt-4 flex items-center gap-2">
              <div className="flex gap-0.5">{[1,2,3,4,5].map(s => <div key={s} className={`w-1.5 h-1.5 rounded-full ${s<=Math.round(product.rating)?'bg-lum-gold':'bg-lum-200'}`}/>)}</div>
              <span className="text-xs text-lum-400">{product.rating?.toFixed(1)}</span>
            </div>
            <div className="pdp-r mt-6 flex items-end gap-3">
              <span className="text-2xl lg:text-3xl font-display font-medium">{formatPrice(product.price)}</span>
              {orig && <><span className="text-base text-lum-400 line-through">{formatPrice(orig)}</span><span className="px-2 py-0.5 text-[10px] font-semibold tracking-wider bg-lum-teal text-white">SAVE {Math.round(product.discountPercentage)}%</span></>}
            </div>
            <p className="pdp-r mt-6 text-sm text-lum-500 leading-relaxed">{product.description}</p>
            <div className="pdp-r mt-6 grid grid-cols-3 gap-px bg-lum-200">
              {[{l:'Stock',v:product.stock>0?'In Stock':'Sold Out'},{l:'Shipping',v:'Free Over $75'},{l:'Returns',v:product.returnPolicy||'30 Days'}].map(x=>(
                <div key={x.l} className="bg-white p-3 text-center"><p className="text-[10px] text-lum-400 uppercase tracking-wider">{x.l}</p><p className="text-xs font-medium mt-1">{x.v}</p></div>
              ))}
            </div>
            <div className="pdp-r mt-8 flex gap-3">
              <div className="flex items-center border border-lum-200">
                <button onClick={() => setQty(Math.max(1,qty-1))} className="w-12 h-12 flex items-center justify-center hover:bg-lum-100 text-lg">−</button>
                <span className="w-12 text-center font-medium">{qty}</span>
                <button onClick={() => setQty(qty+1)} className="w-12 h-12 flex items-center justify-center hover:bg-lum-100 text-lg">+</button>
              </div>
              <button onClick={() => addItem(product, qty)} disabled={product.stock<=0} className="btn-primary flex-1 disabled:opacity-40"><span>{product.stock>0?'Add to Bag':'Sold Out'}</span></button>
            </div>
            <div className="pdp-r mt-10 border-t border-lum-200 pt-8">
              <div className="flex gap-8 border-b border-lum-100 mb-6">
                {['details', isBeauty?'ingredients':'materials', 'reviews'].map(t => (
                  <button key={t} onClick={() => setTab(t)} className={`pb-3 text-xs font-medium uppercase tracking-[0.15em] border-b -mb-px transition-all ${tab===t?'border-lum-800 text-lum-800':'border-transparent text-lum-400'}`}>{t}</button>
                ))}
              </div>
              {tab==='details' && <div className="text-sm text-lum-500 space-y-2 leading-relaxed"><p>{product.description}</p>{product.sku&&<p>SKU: {product.sku}</p>}</div>}
              {tab===(isBeauty?'ingredients':'materials') && (
                <div className="text-sm text-lum-500 space-y-3"><p>{isBeauty?'Clinically proven active ingredients. Dermatologist tested.':'Premium materials selected for quality and comfort.'}</p>
                <div className="grid grid-cols-2 gap-2 mt-3">{(isBeauty?['Hyaluronic Acid','Vitamin C','Niacinamide','Retinol','Peptides','Ceramides']:['Premium Cotton','Italian Leather','Silk Blend','Hand-finished']).map(x=><div key={x} className="flex items-center gap-2 text-xs"><div className="w-1 h-1 rounded-full bg-lum-teal"/>{x}</div>)}</div></div>
              )}
              {tab==='reviews' && (
                <div className="space-y-3">
                  {(product.reviews||[]).map((r,i)=>(
                    <div key={i} className="p-4 border border-lum-100">
                      <div className="flex items-center gap-2 mb-2"><span className="text-sm font-medium">{r.reviewerName}</span><div className="flex gap-0.5">{[1,2,3,4,5].map(s=><div key={s} className={`w-1 h-1 rounded-full ${s<=r.rating?'bg-lum-gold':'bg-lum-200'}`}/>)}</div></div>
                      <p className="text-sm text-lum-500">{r.comment}</p>
                    </div>
                  ))}
                  {!product.reviews?.length && <p className="text-sm text-lum-400 text-center py-6">No reviews yet.</p>}
                </div>
              )}
            </div>
          </div>
        </div>
        {related.length>0 && (
          <div className="mt-24">
            <div className="text-center mb-12"><p className="text-[11px] font-medium tracking-[0.3em] uppercase text-lum-400 mb-3">You May Also Like</p><h2 className="font-display text-3xl lg:text-4xl font-light">Complete Your Look</h2></div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">{related.map(p => <ProductCard key={p.id} product={p}/>)}</div>
          </div>
        )}
      </div>
    </div>
  );
}
