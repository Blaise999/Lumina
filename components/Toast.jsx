'use client';
import { useCart } from '@/context/CartContext';
export default function Toast() {
  const { toast } = useCart();
  if (!toast) return null;
  return (
    <div key={toast.id} className="fixed bottom-8 left-1/2 z-[100] px-6 py-3.5 bg-lum-800 text-white text-sm font-medium shadow-2xl flex items-center gap-3 toast-pop">
      <svg className="w-4 h-4 text-lum-teal flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5"/></svg>
      {toast.msg}
    </div>
  );
}
