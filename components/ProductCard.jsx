'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { formatPrice, getOriginalPrice } from '@/lib/api';

export default function ProductCard({ product }) {
  const [hovered, setHovered] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);
  const { addItem } = useCart();
  const imgs = product._unsplashImages || product.images || [product._unsplashThumb || product.thumbnail];
  const thumb = product._unsplashThumb || product.thumbnail;
  const orig = getOriginalPrice(product.price, product.discountPercentage);

  return (
    <div className="product-card group" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      <div className="img-wrap aspect-[3/4]">
        {orig && <span className="absolute top-3 left-3 z-10 px-2 py-1 text-[10px] font-semibold tracking-wider bg-lum-800 text-white">−{Math.round(product.discountPercentage)}%</span>}
        <Link href={`/products/${product.id}`}>
          <img
            src={hovered && imgs.length > 1 ? imgs[1] : (thumb || imgs[0])}
            alt={product.title}
            className={`w-full h-full object-cover transition-all duration-700 ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}
            loading="lazy"
            onLoad={() => setImgLoaded(true)}
          />
          {!imgLoaded && <div className="absolute inset-0 skeleton" />}
        </Link>
        <div className="actions">
          <button onClick={e => { e.preventDefault(); addItem(product); }} className="quick-add">Add to Bag</button>
        </div>
      </div>
      <div className="px-1 pt-3 pb-4 space-y-1">
        <p className="text-[10px] tracking-[0.2em] uppercase text-lum-400 font-medium">{product.brand || product.category?.replace(/-/g,' ')}</p>
        <Link href={`/products/${product.id}`}><h3 className="text-sm font-medium line-clamp-1 hover:text-lum-teal transition-colors">{product.title}</h3></Link>
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold">{formatPrice(product.price)}</span>
          {orig && <span className="text-xs text-lum-400 line-through">{formatPrice(orig)}</span>}
        </div>
        <div className="flex items-center gap-0.5 pt-0.5">
          {[1,2,3,4,5].map(s => <div key={s} className={`w-1 h-1 rounded-full ${s <= Math.round(product.rating) ? 'bg-lum-gold' : 'bg-lum-200'}`}/>)}
          <span className="text-[10px] text-lum-400 ml-1">{product.rating?.toFixed(1)}</span>
        </div>
      </div>
    </div>
  );
}
