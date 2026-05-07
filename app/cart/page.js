'use client';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/lib/api';

export default function CartPage() {
  const { items, removeItem, updateQty, subtotal, totalItems } = useCart();
  const shipping = subtotal >= 75 ? 0 : 5.99;
  return (
    <div className="pt-28 lg:pt-32 pb-20 bg-lum-50 min-h-screen">
      <div className="max-w-[1000px] mx-auto px-5 lg:px-10">
        <h1 className="font-display text-3xl lg:text-4xl font-light mb-2">Shopping Bag</h1>
        <p className="text-sm text-lum-400 mb-10">{totalItems} {totalItems===1?'item':'items'}</p>
        {items.length===0 ? (
          <div className="text-center py-20 border border-lum-200 bg-white">
            <p className="font-display text-xl mb-3">Your bag is empty</p>
            <p className="text-sm text-lum-400 mb-8">Browse our collections to find something you love.</p>
            <Link href="/shop" className="btn-primary"><span>Continue Shopping</span></Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-0">
              <div className="hidden sm:grid grid-cols-[1fr_100px_100px_40px] gap-4 pb-3 border-b border-lum-200 text-[10px] uppercase tracking-[0.2em] text-lum-400 font-medium"><span>Product</span><span className="text-center">Qty</span><span className="text-right">Total</span><span/></div>
              {items.map(item => (
                <div key={`${item.id}-${item._uid}`} className="grid sm:grid-cols-[1fr_100px_100px_40px] gap-4 items-center py-5 border-b border-lum-100">
                  <div className="flex gap-4">
                    <Link href={`/products/${item.id}`} className="flex-shrink-0"><img src={item._unsplashThumb||item.thumbnail} alt="" className="w-20 h-24 object-cover bg-lum-100"/></Link>
                    <div className="min-w-0">
                      <p className="text-[10px] text-lum-400 uppercase tracking-wider">{item.brand||item.category}</p>
                      <Link href={`/products/${item.id}`}><h3 className="text-sm font-medium mt-0.5 hover:text-lum-teal transition-colors">{item.title}</h3></Link>
                      <p className="text-sm mt-1">{formatPrice(item.price)}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-center">
                    <div className="flex items-center border border-lum-200">
                      <button onClick={() => updateQty(item.id, item._uid, item.quantity-1)} className="w-8 h-8 flex items-center justify-center text-xs hover:bg-lum-100">−</button>
                      <span className="w-8 text-center text-xs font-medium">{item.quantity}</span>
                      <button onClick={() => updateQty(item.id, item._uid, item.quantity+1)} className="w-8 h-8 flex items-center justify-center text-xs hover:bg-lum-100">+</button>
                    </div>
                  </div>
                  <p className="text-sm font-semibold text-right">{formatPrice(item.price * item.quantity)}</p>
                  <button onClick={() => removeItem(item.id, item._uid)} className="text-lum-400 hover:text-lum-800 transition-colors justify-self-end"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/></svg></button>
                </div>
              ))}
            </div>
            <div className="bg-white border border-lum-200 p-6 h-fit sticky top-32">
              <h3 className="font-display text-lg mb-6">Order Summary</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between"><span className="text-lum-400">Subtotal</span><span>{formatPrice(subtotal)}</span></div>
                <div className="flex justify-between"><span className="text-lum-400">Shipping</span><span>{shipping===0?'Complimentary':formatPrice(shipping)}</span></div>
                {subtotal<75 && <p className="text-[11px] text-lum-teal">Add {formatPrice(75-subtotal)} for free shipping</p>}
                <div className="h-px bg-lum-200 my-3"/>
                <div className="flex justify-between text-base font-semibold"><span>Total</span><span>{formatPrice(subtotal+shipping)}</span></div>
              </div>
              <Link href="/checkout" className="btn-primary block text-center w-full mt-6"><span>Proceed to Checkout</span></Link>
              <Link href="/shop" className="block text-center text-xs text-lum-400 mt-4 hover:text-lum-800 transition-colors">Continue Shopping</Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
