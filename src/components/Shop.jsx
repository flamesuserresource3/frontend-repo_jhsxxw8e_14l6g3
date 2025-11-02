import React, { useMemo, useState } from 'react';
import { Minus, Plus, Search, Filter } from 'lucide-react';
import { motion } from 'framer-motion';

const PRODUCTS = [
  { id: 'v1', name: 'Beirut Breeze Vape', price: 12, category: 'vapes', img: 'https://images.unsplash.com/photo-1541976844346-f18aeac57d80?q=80&w=1200&auto=format&fit=crop' },
  { id: 'v2', name: 'Cedars Mint Pod', price: 9, category: 'vapes', img: 'https://images.unsplash.com/photo-1541504721085-ec8084f62a30?q=80&w=1200&auto=format&fit=crop' },
  { id: 'h1', name: 'Classic Hookah', price: 65, category: 'hookahs', img: 'https://images.unsplash.com/photo-1602524817803-fef47a6882ea?q=80&w=1200&auto=format&fit=crop' },
  { id: 'h2', name: 'Mini Hookah Set', price: 40, category: 'hookahs', img: 'https://images.unsplash.com/photo-1700239962620-53cc4b7886d7?q=80&w=1200&auto=format&fit=crop' },
  { id: 't1', name: 'Lebanese Gold Tobacco', price: 18, category: 'tobacco', img: 'https://images.unsplash.com/photo-1519585983491-9584d3c79bff?q=80&w=1200&auto=format&fit=crop' },
  { id: 't2', name: 'Cedar Blend Tobacco', price: 22, category: 'tobacco', img: 'https://images.unsplash.com/photo-1565508227843-08b21808d2e6?q=80&w=1200&auto=format&fit=crop' },
  { id: 'a1', name: 'Charcoal Cubes', price: 6, category: 'accessories', img: 'https://images.unsplash.com/photo-1519505186638-3f03cf111a7e?q=80&w=1200&auto=format&fit=crop' },
  { id: 'a2', name: 'Premium Mouth Tips', price: 5, category: 'accessories', img: 'https://images.unsplash.com/photo-1599096634913-3f65b3108c1e?q=80&w=1200&auto=format&fit=crop' },
];

const CATEGORIES = [
  { key: 'all', label: 'All' },
  { key: 'vapes', label: 'Vapes' },
  { key: 'hookahs', label: 'Hookahs' },
  { key: 'tobacco', label: 'Tobacco' },
  { key: 'accessories', label: 'Accessories' },
];

const Shop = ({ onAdd }) => {
  const [active, setActive] = useState('all');
  const [q, setQ] = useState('');
  const [price, setPrice] = useState([0, 100]);
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    return PRODUCTS.filter(p => (active === 'all' || p.category === active))
      .filter(p => p.name.toLowerCase().includes(q.toLowerCase()))
      .filter(p => p.price >= price[0] && p.price <= price[1]);
  }, [active, q, price]);

  return (
    <section className="max-w-6xl mx-auto px-4">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-xl font-bold text-brown-800">Shop Products</h2>
        <button className="md:hidden text-brown-700 flex items-center gap-2" onClick={() => setShowFilters(s => !s)}>
          <Filter className="h-4 w-4" /> Filters
        </button>
      </div>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-[240px_1fr] gap-6">
        <aside className={`rounded-xl border border-amber-100 bg-white p-4 shadow-sm ${showFilters ? 'block' : 'hidden md:block'}`}>
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-brown-400" />
            <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search" className="w-full rounded-full border border-amber-200 bg-white py-2 pl-9 pr-3 text-sm outline-none focus:border-amber-400" />
          </div>
          <div className="mt-4">
            <p className="mb-2 text-xs font-semibold tracking-wide text-brown-500">Categories</p>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map(c => (
                <button key={c.key} onClick={() => setActive(c.key)} className={`rounded-full px-3 py-1 text-sm border transition ${active === c.key ? 'bg-amber-500 text-white border-amber-500' : 'border-amber-200 text-brown-700 hover:border-amber-400'}`}>
                  {c.label}
                </button>
              ))}
            </div>
          </div>
          <div className="mt-4">
            <p className="mb-2 text-xs font-semibold tracking-wide text-brown-500">Price Range (${price[0]} - ${price[1]})</p>
            <div className="flex items-center gap-2">
              <input type="range" min="0" max="100" value={price[0]} onChange={e => setPrice([Number(e.target.value), price[1]])} className="w-full" />
              <input type="range" min="0" max="100" value={price[1]} onChange={e => setPrice([price[0], Number(e.target.value)])} className="w-full" />
            </div>
          </div>
        </aside>

        <div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {filtered.map((p, idx) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="group rounded-2xl border border-amber-100 bg-white p-3 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="aspect-square w-full overflow-hidden rounded-xl">
                  <img src={p.img} alt={p.name} className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]" />
                </div>
                <div className="mt-3 flex items-start justify-between gap-2">
                  <div>
                    <h3 className="text-sm font-semibold text-brown-800">{p.name}</h3>
                    <p className="text-xs text-brown-500 capitalize">{p.category}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-amber-700">${p.price.toFixed(2)}</p>
                  </div>
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <div className="text-xs text-brown-500">Qty</div>
                  <QtyPicker onChange={(qty) => onAdd(p, qty)} />
                </div>
              </motion.div>
            ))}
          </div>
          {filtered.length === 0 && (
            <div className="text-center py-16 text-brown-500">No products match your filters.</div>
          )}
        </div>
      </div>
    </section>
  );
};

const QtyPicker = ({ onChange }) => {
  const [qty, setQty] = useState(1);
  const inc = () => setQty(q => Math.min(99, q + 1));
  const dec = () => setQty(q => Math.max(1, q - 1));

  return (
    <div className="flex items-center gap-2">
      <button onClick={dec} className="rounded-full border border-amber-200 p-1 hover:border-amber-400"><Minus className="h-4 w-4 text-brown-700" /></button>
      <span className="min-w-[2ch] text-center text-sm">{qty}</span>
      <button onClick={inc} className="rounded-full border border-amber-200 p-1 hover:border-amber-400"><Plus className="h-4 w-4 text-brown-700" /></button>
      <button onClick={() => onChange(qty)} className="ml-2 rounded-full bg-amber-500 px-3 py-1 text-xs font-medium text-white shadow hover:opacity-95">Add to Cart</button>
    </div>
  );
};

export default Shop;
