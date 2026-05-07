'use client';
import { createContext, useContext, useState, useCallback } from 'react';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = useCallback((msg) => { setToast({ msg, id: Date.now() }); setTimeout(() => setToast(null), 3000); }, []);
  const addItem = useCallback((product, qty = 1) => {
    setItems(prev => {
      const ex = prev.find(i => i.id === product.id && i._uid === product._uid);
      if (ex) return prev.map(i => (i.id === product.id && i._uid === product._uid) ? { ...i, quantity: i.quantity + qty } : i);
      return [...prev, { ...product, quantity: qty }];
    });
    showToast(`${product.title} added to bag`);
  }, [showToast]);
  const removeItem = useCallback((id, uid) => setItems(prev => prev.filter(i => !(i.id === id && i._uid === uid))), []);
  const updateQty = useCallback((id, uid, qty) => {
    if (qty <= 0) return setItems(prev => prev.filter(i => !(i.id === id && i._uid === uid)));
    setItems(prev => prev.map(i => (i.id === id && i._uid === uid) ? { ...i, quantity: qty } : i));
  }, []);
  const clearCart = useCallback(() => setItems([]), []);
  const totalItems = items.reduce((s, i) => s + i.quantity, 0);
  const subtotal = items.reduce((s, i) => s + i.price * i.quantity, 0);

  return (
    <CartContext.Provider value={{ items, isOpen, setIsOpen, addItem, removeItem, updateQty, clearCart, totalItems, subtotal, toast }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() { const c = useContext(CartContext); if (!c) throw new Error('useCart requires CartProvider'); return c; }
