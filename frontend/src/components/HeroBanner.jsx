import React from 'react';

export default function HeroBanner() {
  return (
    <div className="w-full rounded-xl overflow-hidden shadow-2xs mb-3.5">
      <img 
        src="/demo/hero-banner-hd.png" 
        alt="Cleaner Cities Stronger Communities — Report Track Resolve Together for a Better Tomorrow" 
        className="w-full h-auto object-contain block"
      />
    </div>
  );
}
