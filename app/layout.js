import './globals.css';
import { CartProvider } from '@/context/CartContext';
import SmoothScroll from '@/components/SmoothScroll';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Toast from '@/components/Toast';

export const metadata = {
  title: 'Lumina — Beauty & Fashion',
  description: 'Premium beauty, skincare, and designer fashion curated for the modern woman.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="font-body bg-lum-50 text-lum-800">
        <CartProvider>
          <SmoothScroll>
            <Header />
            <main className="min-h-screen">{children}</main>
            <Footer />
            <Toast />
          </SmoothScroll>
        </CartProvider>
      </body>
    </html>
  );
}
