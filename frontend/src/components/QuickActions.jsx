import React from 'react';
import { 
  FileText, 
  Search, 
  LayoutGrid, 
  PhoneCall, 
  FolderKanban 
} from 'lucide-react';

export default function QuickActions({ onNavigate = () => {}, onOpenEmergency = () => {} }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-3.5 shadow-2xs">
      <div className="flex items-center gap-1.5 mb-2.5">
        <div className="w-5 h-5 rounded-full bg-blue-100 text-[#1E6FD9] flex items-center justify-center">
          <FolderKanban className="w-3 h-3 text-[#1E6FD9]" />
        </div>
        <h3 className="text-xs font-bold text-[#0F2C59] tracking-tight">
          Quick Actions
        </h3>
      </div>

      {/* 4 Compact Action Tiles */}
      <div className="grid grid-cols-4 gap-2.5">
        
        {/* 1. File Complaint */}
        <button
          onClick={() => onNavigate('FileComplaint')}
          className="flex flex-col items-center justify-center p-2.5 rounded-lg bg-blue-50/70 hover:bg-blue-100/80 border border-blue-100 transition-colors cursor-pointer group"
        >
          <FileText className="w-4.5 h-4.5 text-[#1E6FD9] mb-1.5 group-hover:scale-110 transition-transform" />
          <span className="text-[10.5px] font-bold text-slate-700 text-center leading-tight">
            File Complaint
          </span>
        </button>

        {/* 2. Track Status */}
        <button
          onClick={() => onNavigate('TrackComplaint')}
          className="flex flex-col items-center justify-center p-2.5 rounded-lg bg-blue-50/70 hover:bg-blue-100/80 border border-blue-100 transition-colors cursor-pointer group"
        >
          <Search className="w-4.5 h-4.5 text-[#1E6FD9] mb-1.5 group-hover:scale-110 transition-transform" />
          <span className="text-[10.5px] font-bold text-slate-700 text-center leading-tight">
            Track Status
          </span>
        </button>

        {/* 3. View Services */}
        <button
          onClick={() => onNavigate('Services')}
          className="flex flex-col items-center justify-center p-2.5 rounded-lg bg-blue-50/70 hover:bg-blue-100/80 border border-blue-100 transition-colors cursor-pointer group"
        >
          <LayoutGrid className="w-4.5 h-4.5 text-[#1E6FD9] mb-1.5 group-hover:scale-110 transition-transform" />
          <span className="text-[10.5px] font-bold text-slate-700 text-center leading-tight">
            View Services
          </span>
        </button>

        {/* 4. Emergency */}
        <button
          onClick={onOpenEmergency}
          className="flex flex-col items-center justify-center p-2.5 rounded-lg bg-[#FEF2F2] hover:bg-red-100 border border-red-200 transition-colors cursor-pointer group"
        >
          <PhoneCall className="w-4.5 h-4.5 text-red-600 mb-1.5 group-hover:scale-110 transition-transform" />
          <span className="text-[10.5px] font-bold text-red-700 text-center leading-tight">
            Emergency
          </span>
        </button>

      </div>
    </div>
  );
}
