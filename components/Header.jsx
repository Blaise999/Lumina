'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import CartDrawer from './CartDrawer';

function Logo({ light }) {
  return (
    <Link href="/" className="flex items-center gap-2.5 group">
      <svg width="36" height="36" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="transition-transform duration-700 group-hover:rotate-12">
        <circle cx="60" cy="60" r="58" stroke={light ? 'rgba(255,255,255,0.4)' : 'url(#logoGrad)'} strokeWidth="1.2" />
        <circle cx="60" cy="60" r="50" stroke={light ? 'rgba(255,255,255,0.15)' : '#C49A3C'} strokeWidth="0.4" opacity="0.3" />
        {[0, 45, 90, 135, 180, 225, 270, 315].map((a, i) => (
          <line key={i} x1="60" y1="60" x2={60 + 48 * Math.cos(a * Math.PI / 180)} y2={60 + 48 * Math.sin(a * Math.PI / 180)} stroke={light ? 'rgba(255,255,255,0.1)' : '#C49A3C'} strokeWidth="0.3" opacity="0.15" />
        ))}
        <path d="M60 18L72 48L72 72L60 102L48 72L48 48Z" fill="none" stroke={light ? '#fff' : '#1A1A1A'} strokeWidth="1.2" />
        <path d="M60 26L68 50L68 70L60 94L52 70L52 50Z" fill="none" stroke={light ? 'rgba(255,255,255,0.3)' : '#C49A3C'} strokeWidth="0.5" opacity="0.4" />
        <path d="M60 34L64 52L64 68L60 86L56 68L56 52Z" fill="none" stroke="#00BFA5" strokeWidth="0.4" opacity="0.3" />
        <text x="60" y="68" textAnchor="middle" fontFamily="Cormorant Garamond,serif" fontSize="32" fontWeight="600" fill={light ? '#fff' : '#1A1A1A'}>L</text>
        <circle cx="60" cy="14" r="2" fill="#C49A3C" /><circle cx="60" cy="106" r="2" fill="#C49A3C" />
        <circle cx="14" cy="60" r="1.5" fill="#00BFA5" opacity="0.5" /><circle cx="106" cy="60" r="1.5" fill="#00BFA5" opacity="0.5" />
        {!light && <defs><linearGradient id="logoGrad" x1="0" y1="0" x2="120" y2="120"><stop stopColor="#C49A3C" /><stop offset="0.5" stopColor="#1A1A1A" /><stop offset="1" stopColor="#00BFA5" /></linearGradient></defs>}
      </svg>
      <div className="flex flex-col">
        <span className={`font-display text-[22px] font-semibold tracking-[0.02em] leading-none ${light ? 'text-white' : ''}`}>Lumina</span>
        <span className={`text-[7px] tracking-[0.4em] uppercase font-medium mt-0.5 ${light ? 'text-white/40' : 'text-lum-400'}`}>Beauty & Fashion</span>
      </div>
    </Link>
  );
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const { totalItems, setIsOpen } = useCart();
  const searchRef = useRef(null);
  const timer = useRef(null);

  // Detect if we're on the hero — transparent mode
  const isOnHero = !scrolled;

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => {
    if (searchOpen && searchRef.current) searchRef.current.focus();
  }, [searchOpen]);

  const doSearch = (q) => {
    setQuery(q);
    clearTimeout(timer.current);
    if (q.length < 2) { setResults([]); return; }
    timer.current = setTimeout(async () => {
      try {
        const res = await fetch(`https://dummyjson.com/products/search?q=${q}&limit=8`);
        const d = await res.json();
        setResults(d.products || []);
      } catch { setResults([]); }
    }, 350);
  };

  const closeSearch = () => { setSearchOpen(false); setQuery(''); setResults([]); };

  const nav = [
    { href: '/category/skincare', label: 'Skincare' },
    { href: '/category/beauty', label: 'Beauty' },
    { href: '/category/womens-dresses', label: 'Dresses' },
    { href: '/category/womens-jewellery', label: 'Jewellery' },
    { href: '/category/womens-bags', label: 'Bags' },
    { href: '/shop', label: 'Shop All' },
  ];

  const textColor = isOnHero ? 'text-white/70 hover:text-white' : 'text-lum-500 hover:text-lum-800';
  const iconColor = isOnHero ? 'text-white/70 hover:text-white' : 'text-lum-500 hover:text-lum-800';
  const hamburgerColor = isOnHero ? 'bg-white' : 'bg-lum-800';

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${scrolled ? 'header-solid' : ''}`}
      >
        {/* Top banner — hidden when on hero for clean look */}
        <div className={`text-center py-2 text-[10px] tracking-[0.25em] font-light uppercase transition-all duration-500 ${isOnHero ? 'bg-transparent text-white/50' : 'bg-lum-800 text-white/80'}`}>
          Complimentary Shipping on Orders Over $75
        </div>
        <div className="max-w-[1440px] mx-auto px-5 lg:px-10">
          <div className="flex items-center justify-between h-[68px]">
            <button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden w-10 h-10 flex items-center justify-center" aria-label="Menu">
              <div className="space-y-[5px]">
                <span className={`block w-5 h-px transition-all duration-500 ${hamburgerColor} ${menuOpen ? 'rotate-45 translate-y-[6px]' : ''}`} />
                <span className={`block w-5 h-px transition-all duration-500 ${hamburgerColor} ${menuOpen ? 'opacity-0' : ''}`} />
                <span className={`block w-5 h-px transition-all duration-500 ${hamburgerColor} ${menuOpen ? '-rotate-45 -translate-y-[6px]' : ''}`} />
              </div>
            </button>
            <Logo light={isOnHero} />
            <nav className="hidden lg:flex items-center gap-7">
              {nav.map((n) => (
                <Link key={n.href} href={n.href} className={`relative text-[13px] font-medium transition-colors duration-400 group ${textColor}`}>
                  {n.label}
                  <span className="absolute left-0 -bottom-0.5 w-0 h-px bg-lum-teal transition-all duration-400 group-hover:w-full" />
                </Link>
              ))}
            </nav>
            <div className="flex items-center gap-1">
              <button onClick={() => setSearchOpen(true)} className={`w-10 h-10 flex items-center justify-center transition-colors ${iconColor}`} aria-label="Search">
                <svg className="w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" /></svg>
              </button>
              <button onClick={() => setIsOpen(true)} className={`relative w-10 h-10 flex items-center justify-center transition-colors ${iconColor}`} aria-label="Bag">
                <svg className="w-[18px] h-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" /></svg>
                {totalItems > 0 && <span className="absolute top-1 right-1 w-[18px] h-[18px] rounded-full bg-lum-teal text-white text-[9px] font-bold flex items-center justify-center">{totalItems}</span>}
              </button>
            </div>
          </div>
        </div>
        {/* Search overlay */}
        {searchOpen && (
          <div className="fixed inset-0 z-[70] bg-lum-50/98 backdrop-blur-xl flex items-start justify-center pt-[18vh]" onClick={closeSearch}>
            <div className="w-full max-w-2xl px-6" onClick={(e) => e.stopPropagation()}>
              <input ref={searchRef} type="text" value={query} onChange={(e) => doSearch(e.target.value)} placeholder="Search products..." className="w-full text-2xl lg:text-3xl font-display font-light bg-transparent border-b-2 border-lum-200 pb-4 outline-none placeholder-lum-300 focus:border-lum-800 transition-colors text-lum-800" />
              {results.length > 0 && (
                <div className="mt-6 space-y-2">
                  {results.map((p) => (
                    <Link key={p.id} href={`/products/${p.id}`} onClick={closeSearch} className="flex items-center gap-4 p-3 hover:bg-lum-100 transition-colors -mx-3">
                      <img src={p.thumbnail} alt="" className="w-14 h-14 object-cover bg-lum-100" />
                      <div className="flex-1 min-w-0"><p className="text-sm font-medium truncate text-lum-800">{p.title}</p><p className="text-xs text-lum-400 capitalize">{p.category?.replace(/-/g, ' ')}</p></div>
                      <p className="text-sm font-semibold text-lum-800">${p.price}</p>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
        {/* Mobile menu */}
        {menuOpen && (
          <div className="lg:hidden fixed inset-0 z-[65] bg-lum-50 pt-[120px]">
            <nav className="px-6 space-y-1">
              {nav.map((n) => <Link key={n.href} href={n.href} onClick={() => setMenuOpen(false)} className="block py-3 text-lg font-display font-medium border-b border-lum-100 text-lum-800">{n.label}</Link>)}
            </nav>
          </div>
        )}
      </header>
      <CartDrawer />
    </>
  );
}
