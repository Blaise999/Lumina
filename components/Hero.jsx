'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

const HERO_IMAGES = [
  'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=1400&h=900&fit=crop&q=85',
  'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=1400&h=900&fit=crop&q=85',
  'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=1400&h=900&fit=crop&q=85',
];

export default function Hero() {
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const imgRefs = useRef([]);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  // Preload hero images
  useEffect(() => {
    let loaded = 0;
    HERO_IMAGES.forEach((src) => {
      const img = new Image();
      img.onload = () => {
        loaded++;
        if (loaded >= HERO_IMAGES.length) setImagesLoaded(true);
      };
      img.onerror = () => {
        loaded++;
        if (loaded >= HERO_IMAGES.length) setImagesLoaded(true);
      };
      img.src = src;
    });
    // Fallback
    const t = setTimeout(() => setImagesLoaded(true), 3000);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!imagesLoaded) return;
    let ctx;
    const init = async () => {
      const gsap = (await import('gsap')).default;
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        const section = sectionRef.current;
        if (!section) return;
        const img0 = imgRefs.current[0];
        const img1 = imgRefs.current[1];
        const img2 = imgRefs.current[2];

        if (!img0 || !img1 || !img2) return;

        // Main pinned timeline — using refs instead of data selectors to avoid removeChild errors
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: '+=250%',
            pin: true,
            pinSpacing: true,
            scrub: 1,
            anticipatePin: 1,
          },
        });

        // Image transitions
        tl.to(img0, { scale: 1.15, opacity: 0, duration: 1 }, 0);
        tl.fromTo(img1, { opacity: 0, scale: 1.3 }, { opacity: 1, scale: 1, duration: 0.6 }, 0.4);
        tl.to(img1, { scale: 1.1, opacity: 0, duration: 1 }, 1.2);
        tl.fromTo(img2, { opacity: 0, scale: 1.2 }, { opacity: 1, scale: 1, duration: 0.6 }, 1.5);

        // Text parallax
        if (textRef.current) {
          tl.to(textRef.current, { y: -60, duration: 2.5 }, 0);
        }

        // Shine line
        const shine = section.querySelector('.hero-shine');
        if (shine) {
          tl.fromTo(shine, { x: '-100%' }, { x: '200%', duration: 2, repeat: 1 }, 0);
        }

        // Floating parallax
        section.querySelectorAll('[data-float]').forEach((el) => {
          gsap.to(el, {
            y: parseFloat(el.dataset.float) * 80,
            ease: 'none',
            scrollTrigger: { trigger: section, start: 'top top', end: 'bottom top', scrub: true },
          });
        });

        // Entrance animation
        const words = section.querySelectorAll('.hero-title .word');
        if (words.length) {
          gsap.fromTo(words, { opacity: 0, y: 50, rotateX: -40 }, { opacity: 1, y: 0, rotateX: 0, stagger: 0.12, duration: 0.9, ease: 'power3.out', delay: 0.3 });
        }
        gsap.fromTo('.hero-sub', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7, delay: 1 });
        gsap.fromTo('.hero-cta', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7, delay: 1.3 });
        gsap.fromTo('.hero-badge', { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 0.5, delay: 1.6 });
      }, sectionRef);
    };
    init();
    return () => ctx && ctx.revert();
  }, [imagesLoaded]);

  return (
    <section ref={sectionRef} className="hero-section relative h-screen overflow-hidden bg-lum-900">
      {/* Image layers — using refs, less fade */}
      {HERO_IMAGES.map((src, i) => (
        <div
          key={i}
          ref={(el) => (imgRefs.current[i] = el)}
          className="absolute inset-0"
          style={{ opacity: i === 0 ? 1 : 0, zIndex: i, willChange: 'transform, opacity' }}
        >
          {/* Reduced overlay — much less faded */}
          <div className="absolute inset-0 bg-gradient-to-r from-lum-900/70 via-lum-900/30 to-transparent z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-lum-900/40 via-transparent to-lum-900/20 z-10" />
          <img
            src={src}
            alt=""
            className={`w-full h-full object-cover object-center transition-opacity duration-500 ${imagesLoaded ? 'opacity-100' : 'opacity-0'}`}
            style={{ willChange: 'transform' }}
            fetchpriority={i === 0 ? 'high' : 'auto'}
          />
        </div>
      ))}

      {/* Revolut-style shine sweep */}
      <div className="absolute inset-0 z-20 overflow-hidden pointer-events-none">
        <div className="hero-shine absolute top-0 bottom-0 w-[300px] bg-gradient-to-r from-transparent via-white/15 to-transparent -skew-x-12" />
      </div>

      {/* Floating parallax decorations */}
      <div data-float="-0.3" className="absolute top-[20%] right-[15%] z-20 w-24 h-24 rounded-full border border-white/10" />
      <div data-float="-0.5" className="absolute top-[60%] right-[8%] z-20 w-3 h-3 rounded-full bg-lum-gold/40" />
      <div data-float="-0.2" className="absolute bottom-[25%] right-[25%] z-20 w-16 h-16 border border-lum-rose/20 rotate-45" />
      <div data-float="-0.4" className="absolute top-[35%] right-[35%] z-20">
        <svg width="40" height="40" viewBox="0 0 40 40" className="opacity-15">
          <circle cx="20" cy="20" r="18" stroke="white" strokeWidth="0.5" fill="none" />
        </svg>
      </div>

      {/* Grain texture overlay */}
      <div className="absolute inset-0 z-20 pointer-events-none opacity-[0.03]" style={{backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\' opacity=\'1\'/%3E%3C/svg%3E")', backgroundRepeat: 'repeat', backgroundSize: '128px'}} />

      {/* Content — white text on dark hero */}
      <div ref={textRef} className="absolute inset-0 z-30 flex items-center">
        <div className="max-w-[1440px] mx-auto px-5 lg:px-10 w-full">
          <div className="max-w-2xl">
            <div className="hero-badge inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/10 mb-8 opacity-0">
              <span className="w-1.5 h-1.5 rounded-full bg-lum-teal animate-pulse" />
              <span className="text-[11px] tracking-[0.25em] uppercase font-medium text-white/80">New Collection 2026</span>
            </div>

            <h1
              className="hero-title font-display text-5xl sm:text-6xl lg:text-7xl xl:text-[90px] font-light leading-[0.95] tracking-[-0.02em] text-white"
              style={{ perspective: '600px' }}
            >
              {'Beauty That Radiates'.split(' ').map((word, i) => (
                <span key={i} className="word inline-block mr-[0.3em] opacity-0" style={{ transformOrigin: 'bottom' }}>
                  {i === 2 ? <span className="text-lum-teal">{word}</span> : word}
                </span>
              ))}
            </h1>

            <p className="hero-sub mt-6 text-base sm:text-lg text-white/60 max-w-lg leading-relaxed opacity-0">
              Premium skincare, beauty essentials, and designer fashion — curated for women who celebrate their confidence.
            </p>

            <div className="hero-cta mt-10 flex flex-wrap gap-4 opacity-0">
              <Link href="/shop" className="hero-btn-primary">
                <span className="relative z-10">Explore Collection</span>
              </Link>
              <Link href="/category/skincare" className="hero-btn-outline">Shop Skincare</Link>
            </div>

            {/* Stats */}
            <div className="hero-cta mt-14 flex gap-10 opacity-0">
              {[['2,400+', 'Products'], ['12K+', 'Happy Clients'], ['4.9', 'Avg. Rating']].map(([num, label]) => (
                <div key={label}>
                  <p className="text-2xl font-display font-semibold text-white">{num}</p>
                  <p className="text-[11px] text-white/40 tracking-wider uppercase mt-1">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2">
        <span className="text-[9px] tracking-[0.3em] uppercase text-white/40">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-white/40 to-transparent relative overflow-hidden">
          <div className="w-full h-3 bg-lum-teal absolute animate-bounce" style={{ animationDuration: '2s' }} />
        </div>
      </div>
    </section>
  );
}
