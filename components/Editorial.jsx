'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';

export default function Editorial() {
  const ref = useRef(null);
  useEffect(() => {
    let ctx;
    const init = async () => {
      const gsap = (await import('gsap')).default;
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);
      ctx = gsap.context(() => {
        gsap.utils.toArray('[data-speed]').forEach(el => {
          gsap.to(el, { y: parseFloat(el.dataset.speed) * 80, ease: 'none', scrollTrigger: { trigger: el.closest('.ed-block'), start: 'top bottom', end: 'bottom top', scrub: 1 } });
        });
        gsap.utils.toArray('.ed-text').forEach(el => {
          gsap.fromTo(el.children, { opacity: 0, y: 30 }, { opacity: 1, y: 0, stagger: 0.1, duration: 0.7, ease: 'power2.out', scrollTrigger: { trigger: el, start: 'top 85%' } });
        });
      }, ref);
    };
    init();
    return () => ctx && ctx.revert();
  }, []);

  return (
    <section ref={ref} className="py-20 lg:py-28 bg-white">
      <div className="max-w-[1440px] mx-auto px-5 lg:px-10">
        <div className="ed-block grid lg:grid-cols-2 gap-8 lg:gap-20 items-center mb-20 lg:mb-28">
          <div className="relative overflow-hidden aspect-[4/5]">
            <img data-speed="-0.12" src="https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=900&q=80" alt="Skincare" className="w-full h-[115%] object-cover -mt-[7%]"/>
          </div>
          <div className="ed-text py-8">
            <p className="text-[11px] font-medium tracking-[0.3em] uppercase text-lum-teal mb-4">The Beauty Edit</p>
            <h2 className="font-display text-4xl lg:text-5xl xl:text-6xl font-light leading-[1.05] mb-6">Skincare That<br/>Speaks for Itself</h2>
            <div className="w-12 h-px bg-lum-teal mb-6"/>
            <p className="text-lum-500 leading-relaxed mb-8 max-w-md">Premium serums, moisturizers, and treatments from the world&apos;s most trusted brands. Formulated for results you can see.</p>
            <Link href="/category/skincare" className="btn-primary"><span>Explore Skincare</span></Link>
          </div>
        </div>
        <div className="ed-block grid lg:grid-cols-2 gap-8 lg:gap-20 items-center">
          <div className="ed-text py-8 order-2 lg:order-1">
            <p className="text-[11px] font-medium tracking-[0.3em] uppercase text-lum-gold mb-4">The Fashion Edit</p>
            <h2 className="font-display text-4xl lg:text-5xl xl:text-6xl font-light leading-[1.05] mb-6">Designed to<br/>Make a Statement</h2>
            <div className="w-12 h-px bg-lum-gold mb-6"/>
            <p className="text-lum-500 leading-relaxed mb-8 max-w-md">From designer dresses to premium accessories — every piece selected for quality, craftsmanship, and timeless style.</p>
            <Link href="/category/womens-dresses" className="btn-primary"><span>Explore Fashion</span></Link>
          </div>
          <div className="relative overflow-hidden aspect-[4/5] order-1 lg:order-2">
            <img data-speed="-0.12" src="https://images.unsplash.com/photo-1558171813-4c088753af8f?w=900&q=80" alt="Fashion" className="w-full h-[115%] object-cover -mt-[7%]"/>
          </div>
        </div>
      </div>
    </section>
  );
}
