import React from 'react';
import { Instagram, Facebook, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="mt-16 border-t border-amber-100 bg-gradient-to-b from-white to-amber-50/40">
      <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-1 sm:grid-cols-3 gap-8 text-sm">
        <div>
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-full bg-gradient-to-br from-yellow-400 to-amber-600 shadow-inner" />
            <div>
              <div className="font-extrabold tracking-wider text-brown-800">SMOKING</div>
              <div className="text-xs text-brown-500">Lebanon</div>
            </div>
          </div>
          <p className="mt-3 text-brown-600">Premium vapes, hookahs, tobacco and accessories. Authentic Lebanese tobacco culture with a modern touch.</p>
        </div>
        <div>
          <h4 className="font-semibold text-brown-800 mb-3">Contact</h4>
          <ul className="space-y-2 text-brown-700">
            <li className="flex items-center gap-2"><Mail className="h-4 w-4" /> contact@smokinglb.com</li>
            <li className="flex items-center gap-2"><Phone className="h-4 w-4" /> +961 70 123 456</li>
            <li className="flex items-center gap-2"><MapPin className="h-4 w-4" /> Beirut, Lebanon</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-brown-800 mb-3">Follow Us</h4>
          <div className="flex items-center gap-3">
            <a className="inline-flex items-center gap-2 rounded-full border border-amber-200 px-3 py-1.5 text-brown-700 hover:border-amber-400" href="https://instagram.com" target="_blank" rel="noreferrer">
              <Instagram className="h-4 w-4" /> Instagram
            </a>
            <a className="inline-flex items-center gap-2 rounded-full border border-amber-200 px-3 py-1.5 text-brown-700 hover:border-amber-400" href="https://facebook.com" target="_blank" rel="noreferrer">
              <Facebook className="h-4 w-4" /> Facebook
            </a>
          </div>
        </div>
      </div>
      <div className="text-center py-4 text-xs text-brown-500">© {new Date().getFullYear()} SMOKING Lebanon — vape shop & hookah accessories</div>
    </footer>
  );
};

export default Footer;
