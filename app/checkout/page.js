'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/lib/api';

export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart();
  const [step, setStep] = useState(1);
  const [processing, setProcessing] = useState(false);
  const [complete, setComplete] = useState(false);
  const [contact, setContact] = useState({ email: '', phone: '' });
  const [ship, setShip] = useState({ first: '', last: '', address: '', city: '', state: '', zip: '', country: 'US' });
  const [card, setCard] = useState({ number: '', expiry: '', cvc: '', name: '' });
  const [errors, setErrors] = useState({});

  const shipping = subtotal >= 75 ? 0 : 5.99;
  const tax = subtotal * 0.085;
  const total = subtotal + shipping + tax;

  const fmtNum = v => v.replace(/\D/g,'').slice(0,16).replace(/(\d{4})(?=\d)/g,'$1 ');
  const fmtExp = v => { const d=v.replace(/\D/g,'').slice(0,4); return d.length>=3?d.slice(0,2)+'/'+d.slice(2):d; };
  const detectCard = n => { const d=n.replace(/\s/g,''); if(d.startsWith('4'))return'Visa'; if(/^5[1-5]|^2[2-7]/.test(d))return'Mastercard'; if(d.startsWith('3'))return'Amex'; return null; };

  const v1 = () => { const e={}; if(!contact.email.includes('@'))e.email=1; if(!ship.first)e.first=1; if(!ship.last)e.last=1; if(!ship.address)e.address=1; if(!ship.city)e.city=1; if(!ship.zip)e.zip=1; setErrors(e); return !Object.keys(e).length; };
  const v2 = () => { const e={}; if(card.number.replace(/\s/g,'').length<15)e.num=1; if(card.expiry.length<5)e.exp=1; if(card.cvc.length<3)e.cvc=1; if(!card.name)e.cname=1; setErrors(e); return !Object.keys(e).length; };

  const pay = async () => { if(!v2())return; setProcessing(true); await new Promise(r=>setTimeout(r,2800)); setProcessing(false); setComplete(true); clearCart(); };

  if (!items.length && !complete) return <div className="pt-32 pb-20 text-center min-h-screen bg-lum-50"><p className="font-display text-xl mb-4">Nothing to check out</p><Link href="/shop" className="btn-primary"><span>Shop Now</span></Link></div>;

  if (complete) return (
    <div className="pt-32 pb-20 min-h-screen bg-lum-50">
      <div className="max-w-lg mx-auto px-5 text-center">
        <div className="w-16 h-16 border-2 border-lum-teal rounded-full flex items-center justify-center mx-auto mb-6"><svg className="w-8 h-8 text-lum-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5"/></svg></div>
        <h1 className="font-display text-3xl font-light mb-3">Order Confirmed</h1>
        <p className="text-sm text-lum-400 mb-2">Order #{Math.random().toString(36).substring(2,10).toUpperCase()}</p>
        <p className="text-sm text-lum-400 mb-8">Confirmation sent to {contact.email||'your email'}.</p>
        <div className="border border-lum-200 bg-white p-6 text-left text-sm space-y-2 mb-8">
          <div className="flex justify-between"><span className="text-lum-400">Subtotal</span><span>{formatPrice(subtotal)}</span></div>
          <div className="flex justify-between"><span className="text-lum-400">Shipping</span><span>{shipping===0?'Free':formatPrice(shipping)}</span></div>
          <div className="flex justify-between"><span className="text-lum-400">Tax</span><span>{formatPrice(tax)}</span></div>
          <div className="h-px bg-lum-200 my-2"/>
          <div className="flex justify-between font-semibold text-base"><span>Total</span><span>{formatPrice(total)}</span></div>
        </div>
        <Link href="/" className="btn-primary"><span>Continue Shopping</span></Link>
      </div>
    </div>
  );

  const ic = e => `input-box ${e?'border-red-400 focus:border-red-500 focus:ring-red-500/20':''}`;

  return (
    <div className="pt-28 lg:pt-32 pb-20 bg-lum-50 min-h-screen">
      <div className="max-w-[1100px] mx-auto px-5 lg:px-10">
        <h1 className="font-display text-3xl lg:text-4xl font-light mb-8">Checkout</h1>
        <div className="flex items-center gap-4 mb-10">
          {['Shipping','Payment'].map((s,i) => (
            <div key={s} className="flex items-center gap-3">
              <div className={`w-7 h-7 flex items-center justify-center text-[11px] font-semibold transition-all ${step>i+1?'bg-lum-teal text-white':step===i+1?'bg-lum-800 text-white':'border border-lum-300 text-lum-400'}`}>{step>i+1?'✓':i+1}</div>
              <span className={`text-sm ${step>=i+1?'text-lum-800 font-medium':'text-lum-400'}`}>{s}</span>
              {i<1&&<div className="w-12 h-px bg-lum-200 mx-2"/>}
            </div>
          ))}
        </div>
        <div className="grid lg:grid-cols-5 gap-10">
          <div className="lg:col-span-3">
            {step===1 && (
              <div className="space-y-6">
                <div className="bg-white border border-lum-200 p-6 space-y-4">
                  <h2 className="font-display text-lg mb-2">Contact</h2>
                  <div><label className="text-[11px] font-medium tracking-wider uppercase text-lum-400 block mb-1">Email</label><input type="email" value={contact.email} onChange={e=>setContact({...contact,email:e.target.value})} className={ic(errors.email)} placeholder="you@example.com"/></div>
                  <div><label className="text-[11px] font-medium tracking-wider uppercase text-lum-400 block mb-1">Phone (optional)</label><input type="tel" value={contact.phone} onChange={e=>setContact({...contact,phone:e.target.value})} className="input-box" placeholder="+1 (555) 000-0000"/></div>
                </div>
                <div className="bg-white border border-lum-200 p-6 space-y-4">
                  <h2 className="font-display text-lg mb-2">Shipping Address</h2>
                  <div className="grid grid-cols-2 gap-3">
                    <div><label className="text-[11px] font-medium tracking-wider uppercase text-lum-400 block mb-1">First Name</label><input value={ship.first} onChange={e=>setShip({...ship,first:e.target.value})} className={ic(errors.first)}/></div>
                    <div><label className="text-[11px] font-medium tracking-wider uppercase text-lum-400 block mb-1">Last Name</label><input value={ship.last} onChange={e=>setShip({...ship,last:e.target.value})} className={ic(errors.last)}/></div>
                  </div>
                  <div><label className="text-[11px] font-medium tracking-wider uppercase text-lum-400 block mb-1">Address</label><input value={ship.address} onChange={e=>setShip({...ship,address:e.target.value})} className={ic(errors.address)}/></div>
                  <div className="grid grid-cols-3 gap-3">
                    <div><label className="text-[11px] font-medium tracking-wider uppercase text-lum-400 block mb-1">City</label><input value={ship.city} onChange={e=>setShip({...ship,city:e.target.value})} className={ic(errors.city)}/></div>
                    <div><label className="text-[11px] font-medium tracking-wider uppercase text-lum-400 block mb-1">State</label><input value={ship.state} onChange={e=>setShip({...ship,state:e.target.value})} className="input-box"/></div>
                    <div><label className="text-[11px] font-medium tracking-wider uppercase text-lum-400 block mb-1">ZIP</label><input value={ship.zip} onChange={e=>setShip({...ship,zip:e.target.value})} className={ic(errors.zip)}/></div>
                  </div>
                  <div><label className="text-[11px] font-medium tracking-wider uppercase text-lum-400 block mb-1">Country</label>
                    <select value={ship.country} onChange={e=>setShip({...ship,country:e.target.value})} className="input-box"><option value="US">United States</option><option value="NG">Nigeria</option><option value="GB">United Kingdom</option><option value="CA">Canada</option><option value="GH">Ghana</option></select>
                  </div>
                </div>
                <button onClick={() => v1()&&setStep(2)} className="btn-primary w-full"><span>Continue to Payment</span></button>
              </div>
            )}
            {step===2 && (
              <div className="space-y-6">
                <div className="bg-white border border-lum-200 p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="font-display text-lg">Payment</h2>
                    <div className="flex items-center gap-1 text-[10px] text-lum-400"><svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"/></svg>Secured by <span className="font-bold text-[#635BFF] text-xs ml-1">stripe</span></div>
                  </div>
                  <div className={`border ${errors.num||errors.exp||errors.cvc?'border-red-400':'border-lum-200'} focus-within:border-lum-800 focus-within:ring-1 focus-within:ring-lum-800/10 transition-all`}>
                    <div className="relative"><input type="text" value={card.number} onChange={e=>setCard({...card,number:fmtNum(e.target.value)})} placeholder="Card number" className="w-full px-4 py-4 text-sm outline-none placeholder-lum-300 font-mono tracking-wider bg-transparent" maxLength={19}/><div className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-semibold text-lum-400">{detectCard(card.number)||''}</div></div>
                    <div className="flex border-t border-lum-200">
                      <input type="text" value={card.expiry} onChange={e=>setCard({...card,expiry:fmtExp(e.target.value)})} placeholder="MM / YY" className="flex-1 px-4 py-3 text-sm outline-none placeholder-lum-300 font-mono border-r border-lum-200 bg-transparent" maxLength={5}/>
                      <input type="text" value={card.cvc} onChange={e=>setCard({...card,cvc:e.target.value.replace(/\D/g,'').slice(0,4)})} placeholder="CVC" className="flex-1 px-4 py-3 text-sm outline-none placeholder-lum-300 font-mono bg-transparent" maxLength={4}/>
                    </div>
                  </div>
                  <div className="mt-4"><label className="text-[11px] font-medium tracking-wider uppercase text-lum-400 block mb-1">Name on card</label><input value={card.name} onChange={e=>setCard({...card,name:e.target.value})} className={ic(errors.cname)} placeholder="Full name"/></div>
                </div>
                <div className="bg-white border border-lum-200 p-5 flex items-center justify-between">
                  <div><p className="text-[10px] text-lum-400 uppercase tracking-wider mb-1">Shipping to</p><p className="text-sm text-lum-600">{ship.first} {ship.last}, {ship.address}, {ship.city} {ship.zip}</p></div>
                  <button onClick={() => setStep(1)} className="text-xs text-lum-teal hover:underline">Edit</button>
                </div>
                <div className="flex gap-3">
                  <button onClick={() => setStep(1)} className="btn-outline">Back</button>
                  <button onClick={pay} disabled={processing} className="btn-primary flex-1 flex items-center justify-center gap-2 disabled:opacity-60">
                    <span>{processing ? 'Processing...' : `Pay ${formatPrice(total)}`}</span>
                  </button>
                </div>
              </div>
            )}
          </div>
          <div className="lg:col-span-2">
            <div className="bg-white border border-lum-200 p-6 sticky top-32">
              <h3 className="font-display text-lg mb-5">Summary</h3>
              <div className="space-y-3 max-h-[260px] overflow-y-auto mb-5">
                {items.map(item => (
                  <div key={`${item.id}-${item._uid}`} className="flex gap-3">
                    <div className="relative flex-shrink-0"><img src={item._unsplashThumb||item.thumbnail} alt="" className="w-14 h-14 object-cover bg-lum-100"/><span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-lum-800 text-white text-[9px] font-bold flex items-center justify-center">{item.quantity}</span></div>
                    <div className="flex-1 min-w-0"><p className="text-xs font-medium truncate">{item.title}</p><p className="text-[10px] text-lum-400">{item.brand}</p></div>
                    <p className="text-xs font-semibold">{formatPrice(item.price*item.quantity)}</p>
                  </div>
                ))}
              </div>
              <div className="flex gap-2 mb-4"><input type="text" placeholder="Promo code" className="input-box flex-1 text-xs py-2.5"/><button className="px-4 py-2 text-[10px] font-semibold uppercase tracking-wider border border-lum-200 hover:bg-lum-800 hover:text-white hover:border-lum-800 transition-all">Apply</button></div>
              <div className="h-px bg-lum-200 mb-4"/>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-lum-400">Subtotal</span><span>{formatPrice(subtotal)}</span></div>
                <div className="flex justify-between"><span className="text-lum-400">Shipping</span><span>{shipping===0?'Free':formatPrice(shipping)}</span></div>
                <div className="flex justify-between"><span className="text-lum-400">Tax</span><span>{formatPrice(tax)}</span></div>
                <div className="h-px bg-lum-200 my-2"/>
                <div className="flex justify-between font-semibold text-base"><span>Total</span><span>{formatPrice(total)}</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
