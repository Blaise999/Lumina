'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [done, setDone] = useState(false);
  return (
    <footer className="bg-lum-800 text-white">
      <div className="border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-5 lg:px-10 py-16">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <p className="text-[11px] tracking-[0.3em] uppercase text-white/40 mb-3">Newsletter</p>
              <h3 className="font-display text-2xl lg:text-3xl font-light">Stay in the know.</h3>
              <p className="text-sm text-white/40 mt-2">Early access, exclusive offers, and curated content.</p>
            </div>
            {!done ? (
              <form onSubmit={e => { e.preventDefault(); if(email){ setDone(true); setEmail(''); }}} className="flex gap-0">
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Your email" className="flex-1 bg-transparent border border-white/20 px-5 py-4 text-sm outline-none placeholder-white/30 focus:border-white/50 transition-colors" required/>
                <button type="submit" className="px-8 py-4 bg-white text-lum-800 text-sm font-medium tracking-wide hover:bg-lum-teal hover:text-white transition-all duration-500 flex-shrink-0">Subscribe</button>
              </form>
            ) : <p className="text-sm text-lum-teal">Thank you — you&apos;re on the list.</p>}
          </div>
        </div>
      </div>
      <div className="max-w-[1440px] mx-auto px-5 lg:px-10 py-14">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          <div>
            <span className="font-display text-xl font-semibold">Lumina</span>
            <p className="text-xs text-white/30 mt-3 leading-relaxed">Premium beauty & designer fashion curated for the modern woman.</p>
          </div>
          {[
            { t: 'Shop', links: [{l:'Skincare',h:'/category/skincare'},{l:'Beauty',h:'/category/beauty'},{l:'Dresses',h:'/category/womens-dresses'},{l:'Jewellery',h:'/category/womens-jewellery'},{l:'All Products',h:'/shop'}] },
            { t: 'Company', links: [{l:'About'},{l:'Sustainability'},{l:'Careers'},{l:'Press'}] },
            { t: 'Support', links: [{l:'Contact'},{l:'Shipping & Returns'},{l:'Size Guide'},{l:'FAQ'}] },
          ].map(col => (
            <div key={col.t}>
              <h4 className="text-[11px] font-medium tracking-[0.2em] uppercase text-white/30 mb-5">{col.t}</h4>
              <ul className="space-y-3">
                {col.links.map(lnk => <li key={lnk.l}>{lnk.h ? <Link href={lnk.h} className="text-sm text-white/50 hover:text-white transition-colors">{lnk.l}</Link> : <a href="#" className="text-sm text-white/50 hover:text-white transition-colors">{lnk.l}</a>}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="border-t border-white/5">
        <div className="max-w-[1440px] mx-auto px-5 lg:px-10 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[11px] text-white/25">&copy; 2026 Lumina. All rights reserved.</p>
          <div className="flex gap-6 text-[11px] text-white/25">
            <a href="#" className="hover:text-white/50 transition-colors">Privacy</a>
            <a href="#" className="hover:text-white/50 transition-colors">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
