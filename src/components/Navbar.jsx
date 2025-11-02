import React, { useEffect, useState } from 'react';
import { ShoppingCart, Menu } from 'lucide-react';

const Navbar = ({ cartCount, onNavigate }) => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const linkBase = 'cursor-pointer transition-colors duration-200 text-brown-700 hover:text-yellow-700';

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all ${
      scrolled ? 'backdrop-blur bg-white/70 shadow-sm py-2' : 'bg-white py-3'
    }`}>
      <nav className="max-w-6xl mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-full bg-gradient-to-br from-yellow-400 to-amber-600 shadow-inner" />
          <div className="leading-5">
            <div className="font-extrabold tracking-wider text-brown-800">SMOKING</div>
            <div className="text-xs text-brown-500">Lebanon</div>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-6 text-sm font-medium">
          <span className={linkBase} onClick={() => onNavigate('home')}>Home</span>
          <span className={linkBase} onClick={() => onNavigate('shop')}>Shop</span>
          <span className={linkBase} onClick={() => onNavigate('about')}>About</span>
          <span className={linkBase} onClick={() => onNavigate('contact')}>Contact</span>
        </div>

        <div className="flex items-center gap-3">
          <button aria-label="Cart" onClick={() => onNavigate('cart')} className="relative p-2 rounded-full border border-amber-200 hover:border-amber-400 transition-colors">
            <ShoppingCart className="h-5 w-5 text-brown-700" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 text-[10px] bg-amber-500 text-white rounded-full px-1.5 py-0.5">
                {cartCount}
              </span>
            )}
          </button>
          <button className="md:hidden p-2" onClick={() => setOpen(!open)} aria-label="Menu">
            <Menu className="h-6 w-6 text-brown-700" />
          </button>
        </div>
      </nav>
      {open && (
        <div className="md:hidden border-t border-amber-100 bg-white/95 backdrop-blur-sm">
          <div className="max-w-6xl mx-auto px-4 py-3 grid gap-2 text-sm">
            <span className={linkBase} onClick={() => { onNavigate('home'); setOpen(false); }}>Home</span>
            <span className={linkBase} onClick={() => { onNavigate('shop'); setOpen(false); }}>Shop</span>
            <span className={linkBase} onClick={() => { onNavigate('about'); setOpen(false); }}>About</span>
            <span className={linkBase} onClick={() => { onNavigate('contact'); setOpen(false); }}>Contact</span>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
