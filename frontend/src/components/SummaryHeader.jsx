import React from 'react';
import { PRIORITIES } from '../types/contract';
import { FileText, AlertCircle, AlertTriangle, CheckCircle2 } from 'lucide-react';

export default function SummaryHeader({ reports = [] }) {
  const total = reports.length;
  const highCount = reports.filter((r) => r.priority === PRIORITIES.HIGH).length;
  const mediumCount = reports.filter((r) => r.priority === PRIORITIES.MEDIUM).length;
  const lowCount = reports.filter((r) => r.priority === PRIORITIES.LOW).length;

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 mb-6">
      {/* Total Complaints */}
      <div className="bg-white border border-slate-200/90 rounded-md p-3.5 shadow-2xs border-t-3 border-t-[#0B5CAB] flex flex-col justify-between">
        <div className="flex items-center justify-between gap-2 mb-1">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
            Total Complaints
          </span>
          <FileText className="w-4 h-4 text-[#0B5CAB]" />
        </div>
        <div className="flex items-baseline justify-between mt-1">
          <span className="text-2xl font-bold text-slate-900 tracking-tight">{total}</span>
          <span className="text-[11px] font-medium text-slate-500">All Active Records</span>
        </div>
      </div>

      {/* High Priority */}
      <div className="bg-white border border-slate-200/90 rounded-md p-3.5 shadow-2xs border-t-3 border-t-red-600 flex flex-col justify-between">
        <div className="flex items-center justify-between gap-2 mb-1">
          <span className="text-[11px] font-semibold text-red-800 uppercase tracking-wider">
            High Priority
          </span>
          <AlertCircle className="w-4 h-4 text-red-600" />
        </div>
        <div className="flex items-baseline justify-between mt-1">
          <span className="text-2xl font-bold text-red-700 tracking-tight">{highCount}</span>
          <span className="text-[11px] font-medium text-red-700">Immediate Action</span>
        </div>
      </div>

      {/* Medium Priority */}
      <div className="bg-white border border-slate-200/90 rounded-md p-3.5 shadow-2xs border-t-3 border-t-amber-500 flex flex-col justify-between">
        <div className="flex items-center justify-between gap-2 mb-1">
          <span className="text-[11px] font-semibold text-amber-800 uppercase tracking-wider">
            Medium Priority
          </span>
          <AlertTriangle className="w-4 h-4 text-amber-600" />
        </div>
        <div className="flex items-baseline justify-between mt-1">
          <span className="text-2xl font-bold text-amber-700 tracking-tight">{mediumCount}</span>
          <span className="text-[11px] font-medium text-amber-700">Requires Review</span>
        </div>
      </div>

      {/* Low Priority */}
      <div className="bg-white border border-slate-200/90 rounded-md p-3.5 shadow-2xs border-t-3 border-t-emerald-600 flex flex-col justify-between">
        <div className="flex items-center justify-between gap-2 mb-1">
          <span className="text-[11px] font-semibold text-emerald-800 uppercase tracking-wider">
            Low Priority
          </span>
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
        </div>
        <div className="flex items-baseline justify-between mt-1">
          <span className="text-2xl font-bold text-emerald-700 tracking-tight">{lowCount}</span>
          <span className="text-[11px] font-medium text-emerald-700">Routine Maintenance</span>
        </div>
      </div>
    </div>
  );
}
