import React, { useState } from 'react';
import { MapPin, ChevronDown } from 'lucide-react';

export default function Heatmap() {
  const [period, setPeriod] = useState('This Month');
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-3.5 shadow-2xs">
      {/* Header */}
      <div className="flex items-center justify-between gap-2 mb-2">
        <div className="flex items-center gap-1.5">
          <div className="w-5 h-5 rounded-full bg-blue-100 text-[#1E6FD9] flex items-center justify-center">
            <MapPin className="w-3 h-3 text-[#1E6FD9]" />
          </div>
          <h3 className="text-xs font-bold text-[#0F2C59] tracking-tight">
            Complaint Heatmap
          </h3>
        </div>

        <div className="relative">
          <button
            onClick={() => setOpen(!open)}
            className="text-[10px] font-medium text-slate-600 bg-slate-50 hover:bg-slate-100 px-2 py-0.5 rounded border border-slate-200 flex items-center gap-1 cursor-pointer"
          >
            <span>{period}</span>
            <ChevronDown className="w-2.5 h-2.5 text-slate-400" />
          </button>
          {open && (
            <div className="absolute right-0 top-5 w-24 bg-white rounded border border-slate-200 shadow-md py-1 z-20 text-[10px]">
              {['This Week', 'This Month', 'This Year'].map((p) => (
                <button
                  key={p}
                  onClick={() => { setPeriod(p); setOpen(false); }}
                  className="w-full text-left px-2 py-1 hover:bg-slate-50 font-medium"
                >
                  {p}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Heatmap Graphic Image */}
      <div className="w-full rounded-lg overflow-hidden border border-slate-200">
        <img 
          src="/demo/heatmap.png" 
          alt="Complaint Heatmap" 
          className="w-full h-auto object-cover block"
        />
      </div>

      {/* Legend */}
      <div className="mt-2 flex items-center justify-between text-[10px]">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-[#EF4444]" />
            <span className="font-semibold text-slate-700">High</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-[#F59E0B]" />
            <span className="font-semibold text-slate-700">Medium</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-[#10B981]" />
            <span className="font-semibold text-slate-700">Low</span>
          </div>
        </div>
      </div>
    </div>
  );
}
