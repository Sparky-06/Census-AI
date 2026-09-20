import React from 'react';

export default function Footer({ onNavigate = () => {} }) {
  return (
    <footer className="border-t border-slate-200 bg-white py-3 mt-auto text-xs text-slate-500">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-3">
          
          {/* Left: Copyright */}
          <div className="text-center md:text-left text-slate-600 text-[11px]">
            © 2026 Municipal Corporation. All rights reserved.
          </div>

          {/* Center: Legal Links */}
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-slate-600 font-medium text-[11px]">
            <button onClick={() => onNavigate('Help')} className="hover:text-blue-700 hover:underline cursor-pointer">
              Privacy Policy
            </button>
            <span className="text-slate-300">|</span>
            <button onClick={() => onNavigate('Help')} className="hover:text-blue-700 hover:underline cursor-pointer">
              Terms of Use
            </button>
            <span className="text-slate-300">|</span>
            <button onClick={() => onNavigate('Help')} className="hover:text-blue-700 hover:underline cursor-pointer">
              Contact Us
            </button>
          </div>

          {/* Right: Social Media Icons + Digital India Badge */}
          <div className="flex items-center gap-4">
            {/* Social Icons */}
            <div className="flex items-center gap-2 text-slate-500">
              <span className="w-5 h-5 rounded-full bg-slate-100 hover:bg-blue-100 hover:text-blue-700 flex items-center justify-center cursor-pointer text-[10px] font-bold">
                f
              </span>
              <span className="w-5 h-5 rounded-full bg-slate-100 hover:bg-slate-200 hover:text-slate-900 flex items-center justify-center cursor-pointer text-[10px] font-bold">
                𝕏
              </span>
              <span className="w-5 h-5 rounded-full bg-slate-100 hover:bg-pink-100 hover:text-pink-700 flex items-center justify-center cursor-pointer text-[10px] font-bold">
                ig
              </span>
              <span className="w-5 h-5 rounded-full bg-slate-100 hover:bg-red-100 hover:text-red-700 flex items-center justify-center cursor-pointer text-[10px] font-bold">
                yt
              </span>
              <span className="w-5 h-5 rounded-full bg-slate-100 hover:bg-blue-100 hover:text-blue-700 flex items-center justify-center cursor-pointer text-[10px] font-bold">
                in
              </span>
            </div>

            {/* Digital India Badge Image */}
            <div className="flex items-center pl-2">
              <img 
                src="/demo/digital-india.png" 
                alt="Digital India Power To Empower" 
                className="h-6 w-auto object-contain"
              />
            </div>

          </div>

        </div>
      </div>
    </footer>
  );
}
