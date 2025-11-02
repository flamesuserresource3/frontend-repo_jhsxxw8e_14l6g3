import React, { useEffect, useState } from 'react';

const AgeGate = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const ok = localStorage.getItem('smoking-age-ok');
    if (!ok) setOpen(true);
  }, []);

  const allow = () => {
    localStorage.setItem('smoking-age-ok', 'yes');
    setOpen(false);
  };

  const deny = () => {
    window.location.href = 'https://www.google.com';
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60">
      <div className="mx-4 max-w-md rounded-2xl bg-white p-6 text-center shadow-xl">
        <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-gradient-to-br from-amber-400 to-amber-600" />
        <h2 className="text-xl font-semibold text-brown-800">Are you 18 or older?</h2>
        <p className="mt-2 text-sm text-brown-600">This website sells vaping and smoking accessories intended for adults only.</p>
        <div className="mt-6 grid grid-cols-2 gap-3">
          <button onClick={deny} className="rounded-full border border-brown-200 px-4 py-2 text-brown-700 hover:bg-brown-50">No</button>
          <button onClick={allow} className="rounded-full bg-gradient-to-r from-amber-500 to-yellow-500 px-4 py-2 font-medium text-white shadow hover:opacity-95">Yes, enter</button>
        </div>
        <p className="mt-3 text-xs text-brown-500">By entering, you confirm you are of legal smoking age in Lebanon.</p>
      </div>
    </div>
  );
};

export default AgeGate;
