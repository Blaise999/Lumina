'use client';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/lib/api';

export default function CartDrawer() {
  const { items, isOpen, setIsOpen, removeItem, updateQty, subtotal, totalItems } = useCart();
  if (!isOpen) return null;
  return (
    <>
      <div className="fixed inset-0 z-[60] bg-lum-900/25 backdrop-blur-sm" onClick={() => setIsOpen(false)}/>
      <div className="fixed right-0 top-0 bottom-0 w-full max-w-[420px] bg-lum-50 z-[61] shadow-2xl flex flex-col drawer-enter">
        <div className="flex items-center justify-between px-6 py-5 border-b border-lum-200">
          <div><h2 className="font-display text-xl">Shopping Bag</h2><p className="text-[11px] text-lum-400 mt-0.5">{totalItems} {totalItems===1?'item':'items'}</p></div>
          <button onClick={() => setIsOpen(false)} className="w-10 h-10 flex items-center justify-center text-lum-400 hover:text-lum-800 transition-colors">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length===0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <p className="font-display text-lg mb-2">Your bag is empty</p>
              <p className="text-sm text-lum-400 mb-6">Browse our collections to find something you love.</p>
              <button onClick={() => setIsOpen(false)} className="btn-primary"><span>Continue Shopping</span></button>
            </div>
          ) : (
            <div className="space-y-5">
              {items.map(item => (
                <div key={`${item.id}-${item._uid}`} className="flex gap-4">
                  <Link href={`/products/${item.id}`} onClick={() => setIsOpen(false)} className="flex-shrink-0">
                    <img src={item._unsplashThumb||item.thumbnail} alt={item.title} className="w-20 h-24 object-cover bg-lum-100"/>
                  </Link>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium truncate">{item.title}</h4>
                    <p className="text-[10px] text-lum-400 uppercase tracking-wider mt-0.5">{item.brand||item.category}</p>
                    <p className="text-sm font-semibold mt-1.5">{formatPrice(item.price)}</p>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center border border-lum-200">
                        <button onClick={() => updateQty(item.id, item._uid, item.quantity-1)} className="w-7 h-7 flex items-center justify-center text-xs hover:bg-lum-100">−</button>
                        <span className="w-7 text-center text-xs font-medium">{item.quantity}</span>
                        <button onClick={() => updateQty(item.id, item._uid, item.quantity+1)} className="w-7 h-7 flex items-center justify-center text-xs hover:bg-lum-100">+</button>
                      </div>
                      <button onClick={() => removeItem(item.id, item._uid)} className="text-[11px] text-lum-400 underline hover:text-lum-800">Remove</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        {items.length>0 && (
          <div className="border-t border-lum-200 px-6 py-5 space-y-3">
            <div className="flex justify-between text-sm"><span className="text-lum-400">Subtotal</span><span className="font-semibold">{formatPrice(subtotal)}</span></div>
            <p className="text-[11px] text-lum-400">Shipping calculated at checkout.</p>
            <Link href="/checkout" onClick={() => setIsOpen(false)} className="btn-primary block text-center w-full"><span>Checkout — {formatPrice(subtotal)}</span></Link>
            <button onClick={() => setIsOpen(false)} className="w-full text-center text-sm text-lum-400 hover:text-lum-800 transition-colors">Continue Shopping</button>
          </div>
        )}
      </div>
    </>
  );
}
