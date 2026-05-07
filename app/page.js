import Hero from '@/components/Hero';
import Marquee from '@/components/Marquee';
import FeaturedSection from '@/components/FeaturedSection';
import Editorial from '@/components/Editorial';
import CategoryShowcase from '@/components/CategoryShowcase';
import Testimonials from '@/components/Testimonials';

export default function HomePage() {
  return (
    <>
      <Hero />

      <Marquee items={['Skincare', 'Beauty', 'Fragrances', 'Designer Dresses', 'Premium Bags', 'Jewellery', 'Watches', 'Sunglasses', 'New Arrivals', 'Limited Edition']} />

      <FeaturedSection
        title="New Arrivals"
        label="Just In"
        categories={['skincare', 'beauty', 'womens-dresses', 'womens-jewellery']}
        limit={8}
        viewAllHref="/shop"
        viewAllText="View All New"
        bg="bg-lum-50"
        showReveal={true}
      />

      <Editorial />

      <FeaturedSection
        title="Best Sellers"
        label="Most Popular"
        categories={['skincare', 'fragrances', 'womens-bags', 'sunglasses']}
        limit={8}
        viewAllHref="/shop"
        viewAllText="Shop Best Sellers"
        bg="bg-white"
      />

      <Marquee items={['Free Shipping Over $75', 'Premium Quality', 'Curated Collections', 'Secure Checkout', 'Easy Returns', 'Worldwide Delivery']} sep="·" />

      <CategoryShowcase />

      <FeaturedSection
        title="The Beauty Edit"
        label="Skincare & Fragrance"
        categories={['skincare', 'beauty', 'fragrances']}
        limit={8}
        viewAllHref="/category/skincare"
        viewAllText="Explore Beauty"
        bg="bg-lum-50"
      />

      <FeaturedSection
        title="Designer Fashion"
        label="Curated Selection"
        categories={['womens-dresses', 'womens-shoes', 'tops', 'womens-watches']}
        limit={8}
        viewAllHref="/category/womens-dresses"
        viewAllText="Explore Fashion"
        bg="bg-white"
      />

      <Testimonials />
    </>
  );
  }
