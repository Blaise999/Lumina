'use client';

const testimonials = [
  {
    name: 'Amara O.',
    avatar: 'AO',
    role: 'Skincare Enthusiast',
    text: 'Lumina changed my entire routine. My skin has never looked this radiant — the glow is real!',
    rating: 5,
    product: 'Hydra Glow Serum',
  },
  {
    name: 'Fatima K.',
    avatar: 'FK',
    role: 'Fashion Blogger',
    text: 'The dresses are absolutely stunning. Premium quality that you can feel the moment you unbox.',
    rating: 5,
    product: 'Silk Evening Dress',
  },
  {
    name: 'Ngozi M.',
    avatar: 'NM',
    role: 'Beauty Creator',
    text: 'Finally, a store that gets it — beauty and fashion under one roof, curated with taste.',
    rating: 5,
    product: 'Complete Glow Kit',
  },
  {
    name: 'Sarah I.',
    avatar: 'SI',
    role: 'Style Coach',
    text: 'My clients always ask where I shop. Lumina is my secret weapon for effortless elegance.',
    rating: 5,
    product: 'Statement Gold Necklace',
  },
];

const seenIn = ['VOGUE', 'ELLE', 'BAZAAR', 'ALLURE', 'GLAMOUR', 'W MAG'];

export default function SocialProof() {
  return (
    <section className="py-16 lg:py-24 bg-lumina-cream">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-12">
          <span className="text-xs font-semibold tracking-[0.25em] text-lumina-rose uppercase">Testimonials</span>
          <h2 className="mt-3 font-display text-3xl lg:text-4xl font-bold">Loved by Glowing Queens</h2>
          <div className="section-divider mt-4" />
        </div>

        {/* Testimonial grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-6 hover:shadow-xl hover:shadow-lumina-teal/5 transition-all duration-500 border border-transparent hover:border-lumina-teal/10"
            >
              {/* Stars */}
              <div className="flex gap-0.5 mb-4">
                {[1,2,3,4,5].map((s) => (
                  <svg key={s} className="w-4 h-4 star-filled" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              {/* Quote */}
              <p className="text-sm text-lumina-charcoal-light leading-relaxed mb-6">&ldquo;{t.text}&rdquo;</p>

              {/* Product tag */}
              <p className="text-xs text-lumina-teal font-medium mb-4">RE: {t.product}</p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-lumina-cream-dark">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-lumina-teal to-lumina-teal-dark flex items-center justify-center text-white text-xs font-bold">
                  {t.avatar}
                </div>
                <div>
                  <p className="text-sm font-semibold">{t.name}</p>
                  <p className="text-xs text-lumina-warm">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* As seen in */}
        <div className="mt-16 pt-12 border-t border-lumina-cream-dark">
          <p className="text-center text-xs font-semibold tracking-[0.25em] text-lumina-warm uppercase mb-8">As Featured In</p>
          <div className="flex items-center justify-center gap-8 sm:gap-12 lg:gap-16 flex-wrap">
            {seenIn.map((name) => (
              <span
                key={name}
                className="font-display text-lg sm:text-xl font-bold text-lumina-charcoal/15 hover:text-lumina-charcoal/30 transition-colors duration-300 tracking-widest"
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
