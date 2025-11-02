import React, { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './components/Navbar';
import AgeGate from './components/AgeGate';
import Shop from './components/Shop';
import Footer from './components/Footer';

const App = () => {
  const [page, setPage] = useState('home');
  const [cart, setCart] = useState(() => {
    try { return JSON.parse(localStorage.getItem('smoking-cart') || '[]'); } catch { return []; }
  });

  useEffect(() => {
    localStorage.setItem('smoking-cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    document.title = `SMOKING Lebanon — ${page[0].toUpperCase() + page.slice(1)}`;
  }, [page]);

  const totalItems = useMemo(() => cart.reduce((a, c) => a + c.qty, 0), [cart]);
  const subtotal = useMemo(() => cart.reduce((a, c) => a + c.price * c.qty, 0), [cart]);

  const addToCart = (product, qty) => {
    setCart(prev => {
      const exists = prev.find(p => p.id === product.id);
      if (exists) return prev.map(p => p.id === product.id ? { ...p, qty: Math.min(99, p.qty + qty) } : p);
      return [...prev, { id: product.id, name: product.name, price: product.price, img: product.img, qty }];
    });
  };

  const setQty = (id, qty) => setCart(prev => prev.map(p => p.id === id ? { ...p, qty } : p).filter(p => p.qty > 0));
  const remove = (id) => setCart(prev => prev.filter(p => p.id !== id));

  const navigate = (next) => {
    setPage(next);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white text-brown-800">
      <AgeGate />
      <Navbar cartCount={totalItems} onNavigate={navigate} />

      <main className="pt-20">
        <AnimatePresence mode="wait">
          {page === 'home' && (
            <motion.section key="home" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.35 }}>
              <Hero onShop={() => navigate('shop')} />
              <Highlights onShop={() => navigate('shop')} />
            </motion.section>
          )}

          {page === 'shop' && (
            <motion.section key="shop" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.35 }} className="py-6">
              <Shop onAdd={addToCart} />
            </motion.section>
          )}

          {page === 'about' && (
            <motion.section key="about" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.35 }} className="px-4">
              <About />
            </motion.section>
          )}

          {page === 'contact' && (
            <motion.section key="contact" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.35 }} className="px-4">
              <Contact />
            </motion.section>
          )}

          {page === 'cart' && (
            <motion.section key="cart" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.35 }} className="px-4">
              <CartPage cart={cart} setQty={setQty} remove={remove} subtotal={subtotal} onCheckout={() => alert('Checkout complete. Thank you for shopping with SMOKING Lebanon!')} />
            </motion.section>
          )}
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
};

const Hero = ({ onShop }) => {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,#fff7e6_0%,white_50%)] pointer-events-none" />
      <div className="relative max-w-6xl mx-auto px-4 py-10 md:py-16 grid md:grid-cols-2 gap-8">
        <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
          <h1 className="text-3xl md:text-5xl font-extrabold leading-tight text-brown-900">
            Premium Vapes, Hookahs & Lebanese Tobacco
          </h1>
          <p className="mt-3 text-brown-600">
            Discover a curated selection of premium devices and accessories. A modern experience honoring authentic Lebanese tobacco culture.
          </p>
          <div className="mt-6 flex items-center gap-3">
            <button onClick={onShop} className="rounded-full bg-gradient-to-r from-amber-500 to-yellow-500 px-5 py-2.5 text-white font-medium shadow hover:opacity-95">Shop Now</button>
            <a href="#story" className="rounded-full border border-amber-200 px-5 py-2.5 text-brown-700 hover:border-amber-400">Our Story</a>
          </div>
          <div className="mt-8 grid grid-cols-3 gap-4 text-center">
            {['Vapes','Hookahs','Tobacco'].map((l,i) => (
              <div key={l} className="rounded-xl border border-amber-100 bg-white p-3 shadow-sm">
                <div className="text-2xl font-extrabold text-amber-700">{[500+,120+,35+][i]}</div>
                <div className="text-xs text-brown-500">{l}</div>
              </div>
            ))}
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="md:pl-10">
          <div className="aspect-[4/3] md:aspect-square rounded-3xl overflow-hidden shadow-xl">
            <img src="https://images.unsplash.com/photo-1752852381837-ce679ffdab31?ixid=M3w3OTkxMTl8MHwxfHNlYXJjaHwxfHxob29rYWglMjBhbmQlMjB2YXBlJTIwc2V0dXB8ZW58MHwwfHx8MTc2MjA3ODY2NHww&ixlib=rb-4.1.0&w=1600&auto=format&fit=crop&q=80" alt="Premium hookah and vape setup" className="h-full w-full object-cover" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const Highlights = ({ onShop }) => (
  <section className="max-w-6xl mx-auto px-4 py-12">
    <div className="grid md:grid-cols-3 gap-6">
      {[{
        title: 'Authentic Quality',
        text: 'Handpicked brands and Lebanese blends for a smooth experience.',
      }, {
        title: 'Fast Local Support',
        text: 'Chat with us on Instagram or WhatsApp for quick help.',
      }, {
        title: 'Secure & Safe',
        text: 'Age-verified shopping and safe checkout simulation.',
      }].map((card, i) => (
        <motion.div key={card.title} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: i * 0.06 }} className="rounded-2xl border border-amber-100 bg-white p-6 shadow-sm">
          <h3 className="font-semibold text-brown-800">{card.title}</h3>
          <p className="mt-2 text-sm text-brown-600">{card.text}</p>
          <button onClick={onShop} className="mt-4 text-sm rounded-full border border-amber-200 px-4 py-1.5 text-brown-700 hover:border-amber-400">Explore</button>
        </motion.div>
      ))}
    </div>
  </section>
);

const About = () => (
  <section id="story" className="max-w-4xl mx-auto py-10">
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="rounded-3xl border border-amber-100 bg-white p-6 md:p-10 shadow-sm">
      <h2 className="text-2xl md:text-3xl font-bold">About SMOKING Lebanon</h2>
      <p className="mt-3 text-brown-700">
        Founded in Beirut, SMOKING blends modern e-commerce with Lebanon’s rich tobacco heritage. We believe in quality, authenticity and community. From premium vapes to elegant hookahs and curated accessories, our goal is to elevate your ritual with safe, reliable products.
      </p>
      <p className="mt-3 text-brown-700">
        We partner with trusted suppliers and local artisans, ensuring every item meets our standards for craftsmanship and performance. Thank you for supporting a Lebanese tobacco store that values culture and premium service.
      </p>
    </motion.div>
  </section>
);

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Valid email required';
    if (form.message.trim().length < 10) e.message = 'Message must be at least 10 characters';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onSubmit = (ev) => {
    ev.preventDefault();
    if (!validate()) return;
    alert('Thank you! We will get back to you shortly.');
    setForm({ name: '', email: '', message: '' });
  };

  return (
    <section className="max-w-4xl mx-auto py-10">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="rounded-3xl border border-amber-100 bg-white p-6 md:p-10 shadow-sm">
        <h2 className="text-2xl md:text-3xl font-bold">Contact Us</h2>
        <div className="mt-4 grid md:grid-cols-2 gap-6">
          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Your Name" className={`w-full rounded-xl border px-4 py-2.5 outline-none ${errors.name ? 'border-red-300' : 'border-amber-200 focus:border-amber-400'}`} />
              {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
            </div>
            <div>
              <input value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="Email" className={`w-full rounded-xl border px-4 py-2.5 outline-none ${errors.email ? 'border-red-300' : 'border-amber-200 focus:border-amber-400'}`} />
              {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
            </div>
            <div>
              <textarea value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} placeholder="Message" rows={5} className={`w-full rounded-xl border px-4 py-2.5 outline-none ${errors.message ? 'border-red-300' : 'border-amber-200 focus:border-amber-400'}`} />
              {errors.message && <p className="mt-1 text-xs text-red-500">{errors.message}</p>}
            </div>
            <button type="submit" className="rounded-full bg-gradient-to-r from-amber-500 to-yellow-500 px-5 py-2.5 text-white font-medium shadow hover:opacity-95">Send Message</button>
          </form>
          <div className="rounded-2xl border border-amber-100 bg-amber-50/40 p-4 text-sm">
            <p className="text-brown-700">Email: <a className="text-amber-700 underline" href="mailto:contact@smokinglb.com">contact@smokinglb.com</a></p>
            <p className="text-brown-700 mt-2">Phone: <a className="text-amber-700 underline" href="tel:+96170123456">+961 70 123 456</a></p>
            <p className="text-brown-700 mt-2">Instagram: <a className="text-amber-700 underline" href="https://instagram.com" target="_blank" rel="noreferrer">@smoking.lb</a></p>
            <p className="text-brown-700 mt-2">Location: <a className="text-amber-700 underline" href="https://maps.google.com/?q=Beirut%20Lebanon" target="_blank" rel="noreferrer">Beirut, Lebanon</a></p>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

const CartPage = ({ cart, setQty, remove, subtotal, onCheckout }) => (
  <section className="max-w-5xl mx-auto py-10">
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="rounded-3xl border border-amber-100 bg-white p-6 md:p-10 shadow-sm">
      <h2 className="text-2xl md:text-3xl font-bold">Your Cart</h2>
      {cart.length === 0 ? (
        <p className="mt-3 text-brown-600">Your cart is empty.</p>
      ) : (
        <div className="mt-6 grid md:grid-cols-[1fr_320px] gap-6">
          <div className="space-y-4">
            {cart.map(item => (
              <div key={item.id} className="flex items-center gap-4 rounded-2xl border border-amber-100 p-3">
                <img src={item.img} alt={item.name} className="h-20 w-20 rounded-xl object-cover" />
                <div className="flex-1">
                  <div className="font-medium">{item.name}</div>
                  <div className="text-sm text-brown-500">${item.price.toFixed(2)}</div>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => setQty(item.id, Math.max(1, item.qty - 1))} className="rounded-full border border-amber-200 px-2">-</button>
                  <span className="min-w-[2ch] text-center">{item.qty}</span>
                  <button onClick={() => setQty(item.id, Math.min(99, item.qty + 1))} className="rounded-full border border-amber-200 px-2">+</button>
                </div>
                <button onClick={() => remove(item.id)} className="text-sm text-red-600 hover:underline">Remove</button>
              </div>
            ))}
          </div>
          <div className="rounded-2xl border border-amber-100 bg-amber-50/40 p-4 h-max">
            <div className="flex items-center justify-between text-sm">
              <span>Subtotal</span>
              <span className="font-semibold">${subtotal.toFixed(2)}</span>
            </div>
            <div className="mt-2 flex items-center justify-between text-sm">
              <span>Shipping</span>
              <span className="text-brown-500">Calculated at checkout</span>
            </div>
            <button onClick={onCheckout} className="mt-4 w-full rounded-full bg-gradient-to-r from-amber-500 to-yellow-500 px-5 py-2.5 text-white font-medium shadow hover:opacity-95">Checkout</button>
          </div>
        </div>
      )}
    </motion.div>
  </section>
);

export default App;
