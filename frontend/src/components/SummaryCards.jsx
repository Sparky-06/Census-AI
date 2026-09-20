import React from 'react';
import { PRIORITIES } from '../types/contract';
import { 
  FileText, 
  AlertTriangle, 
  Clock, 
  CheckCircle2, 
  Calendar,
  ChevronRight,
  TrendingDown
} from 'lucide-react';

export default function SummaryCards({ reports = [], onFilterPriority = () => {} }) {
  const total = reports.length;
  const highCount = reports.filter((r) => r.priority === PRIORITIES.HIGH).length;
  const mediumCount = reports.filter((r) => r.priority === PRIORITIES.MEDIUM).length;
  const lowCount = reports.filter((r) => r.priority === PRIORITIES.LOW).length;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-5 gap-3.5 mb-5">
      
      {/* 1. Total Complaints Card */}
      <div className="bg-white rounded-xl border border-blue-200/90 p-4 shadow-2xs flex flex-col justify-between h-28 sm:h-[114px]">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-[#2D7FF9] text-white flex items-center justify-center shrink-0 shadow-2xs">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-bold text-slate-600 uppercase tracking-tight block">
                Total Complaints
              </span>
              <div className="text-2xl sm:text-[26px] font-black text-[#0F2C59] tracking-tight leading-none mt-1">
                {total}
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1 border-t border-slate-100">
          <span>All Active Records</span>
          {/* Mini 3-bar graph */}
          <div className="flex items-end gap-1 h-3.5">
            <span className="w-1 h-2 bg-blue-300 rounded-2xs"></span>
            <span className="w-1 h-3 bg-blue-400 rounded-2xs"></span>
            <span className="w-1 h-4 bg-blue-500 rounded-2xs"></span>
          </div>
        </div>
      </div>

      {/* 2. High Priority Card */}
      <div 
        onClick={() => onFilterPriority(PRIORITIES.HIGH)}
        className="bg-[#FEF2F2] rounded-xl border border-red-200/90 p-4 shadow-2xs flex flex-col justify-between h-28 sm:h-[114px] cursor-pointer hover:border-red-300 transition-colors group"
      >
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-red-600 text-white flex items-center justify-center shrink-0 shadow-2xs">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-bold text-red-900 uppercase tracking-tight block">
                High Priority
              </span>
              <div className="text-2xl sm:text-[26px] font-black text-red-600 tracking-tight leading-none mt-1">
                {highCount}
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between text-[11px] text-red-600 font-semibold pt-1 border-t border-red-100">
          <span>Requires Immediate Action</span>
          <div className="w-4.5 h-4.5 rounded-full bg-red-100 flex items-center justify-center text-red-600 group-hover:translate-x-0.5 transition-transform">
            <ChevronRight className="w-3.5 h-3.5" />
          </div>
        </div>
      </div>

      {/* 3. Medium Priority Card */}
      <div 
        onClick={() => onFilterPriority(PRIORITIES.MEDIUM)}
        className="bg-[#FFFBEB] rounded-xl border border-amber-200/90 p-4 shadow-2xs flex flex-col justify-between h-28 sm:h-[114px] cursor-pointer hover:border-amber-300 transition-colors group"
      >
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-2xs">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-bold text-amber-900 uppercase tracking-tight block">
                Medium Priority
              </span>
              <div className="text-2xl sm:text-[26px] font-black text-amber-600 tracking-tight leading-none mt-1">
                {mediumCount}
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between text-[11px] text-amber-700 font-semibold pt-1 border-t border-amber-100">
          <span>Requires Review</span>
          <div className="w-4.5 h-4.5 rounded-full bg-amber-100 flex items-center justify-center text-amber-700 group-hover:translate-x-0.5 transition-transform">
            <ChevronRight className="w-3.5 h-3.5" />
          </div>
        </div>
      </div>

      {/* 4. Low Priority Card */}
      <div 
        onClick={() => onFilterPriority(PRIORITIES.LOW)}
        className="bg-[#F0FDF4] rounded-xl border border-emerald-200/90 p-4 shadow-2xs flex flex-col justify-between h-28 sm:h-[114px] cursor-pointer hover:border-emerald-300 transition-colors group"
      >
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-2xs">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-bold text-emerald-900 uppercase tracking-tight block">
                Low Priority
              </span>
              <div className="text-2xl sm:text-[26px] font-black text-emerald-600 tracking-tight leading-none mt-1">
                {lowCount}
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between text-[11px] text-emerald-700 font-semibold pt-1 border-t border-emerald-100">
          <span>Routine Maintenance</span>
          <div className="w-4.5 h-4.5 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 group-hover:translate-x-0.5 transition-transform">
            <ChevronRight className="w-3.5 h-3.5" />
          </div>
        </div>
      </div>

      {/* 5. Average Resolution Time Card (Dark Blue) */}
      <div className="bg-[#0B3B6F] text-white rounded-xl p-4 shadow-2xs flex flex-col justify-between h-28 sm:h-[114px] col-span-2 sm:col-span-1 xl:col-span-1">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-blue-500/40 text-white flex items-center justify-center shrink-0 border border-blue-400/30">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-blue-200 uppercase tracking-tight block">
                Average Resolution Time
              </span>
              <div className="flex items-center gap-1.5 mt-1">
                <span className="text-2xl sm:text-[24px] font-black text-white tracking-tight leading-none">
                  4.2 Days
                </span>
                <span className="text-[10px] font-bold bg-emerald-500/30 text-emerald-300 px-1.5 py-0.5 rounded flex items-center gap-0.5">
                  <TrendingDown className="w-3 h-3" /> -18%
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="text-[11px] text-blue-200 pt-1 border-t border-blue-800/60">
          <span>Faster than last month</span>
        </div>
      </div>

    </div>
  );
}
