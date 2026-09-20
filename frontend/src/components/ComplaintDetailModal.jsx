import React, { useState } from 'react';
import PriorityBadge from './PriorityBadge';
import CategoryBadge from './CategoryBadge';
import { formatReportTime, formatStatus } from '../utils/formatters';
import { formatPhotoUrl } from '../services/api';
import { 
  X, 
  MapPin, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  FileText, 
  Printer, 
  Copy, 
  Check,
  ShieldAlert,
  ArrowRight
} from 'lucide-react';

export default function ComplaintDetailModal({ report, onClose = () => {} }) {
  const [copied, setCopied] = useState(false);
  const [imgError, setImgError] = useState(false);

  if (!report) return null;

  const photoUrl = formatPhotoUrl(report.photo_url);

  const copyId = () => {
    if (report.id && navigator.clipboard) {
      navigator.clipboard.writeText(report.id);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const stages = [
    { key: 'reported', label: 'Reported' },
    { key: 'assigned', label: 'Assigned' },
    { key: 'in_progress', label: 'In Progress' },
    { key: 'resolved', label: 'Resolved' },
    { key: 'verified', label: 'Verified' },
  ];

  const currentStageIndex = stages.findIndex((s) => s.key === report.status) !== -1
    ? stages.findIndex((s) => s.key === report.status)
    : 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div 
        className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50/70">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#0F4C81] text-white flex items-center justify-center shadow-2xs font-bold text-sm">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 leading-tight">
                Civic Grievance Case File
              </h3>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-xs font-mono font-medium text-slate-500">
                  Case ID: {report.id}
                </span>
                <button
                  onClick={copyId}
                  className="p-1 text-slate-400 hover:text-slate-700 rounded transition-colors"
                  title="Copy Complaint ID"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="p-2 text-slate-500 hover:text-slate-800 rounded-lg hover:bg-slate-200/60 transition-colors"
              title="Print Case Summary"
            >
              <Printer className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 text-slate-500 hover:text-slate-800 rounded-lg hover:bg-slate-200/60 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-5">
          
          {/* Top Status & Priority Strip */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
            <div className="flex items-center gap-2">
              <CategoryBadge category={report.category} />
              <PriorityBadge priority={report.priority} />
            </div>

            <div className="flex items-center gap-3 text-right">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">
                  Priority Score
                </span>
                <span className="text-base font-extrabold text-slate-900 font-mono">
                  {report.priority_score || 0} / 100
                </span>
              </div>
            </div>
          </div>

          {/* Lifecycle Progress Bar */}
          <div>
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2">
              Grievance Lifecycle Status
            </span>
            <div className="grid grid-cols-5 gap-1.5">
              {stages.map((stage, idx) => {
                const isPassed = idx <= currentStageIndex;
                const isCurrent = idx === currentStageIndex;

                return (
                  <div key={stage.key} className="flex flex-col items-center text-center">
                    <div
                      className={`w-full h-2 rounded-full mb-1.5 transition-colors ${
                        isPassed ? 'bg-blue-600' : 'bg-slate-200'
                      }`}
                    />
                    <span
                      className={`text-[10px] font-medium leading-tight ${
                        isCurrent
                          ? 'font-bold text-blue-700'
                          : isPassed
                          ? 'text-slate-800'
                          : 'text-slate-400'
                      }`}
                    >
                      {stage.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Photo & Incident Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-100">
            {/* Photo Evidence */}
            <div>
              <span className="text-xs font-bold text-slate-700 block mb-1.5">
                Photo Evidence Attached
              </span>
              <div className="w-full h-48 rounded-xl border border-slate-200 bg-slate-100 overflow-hidden relative">
                <img
                  src={imgError ? '/demo/placeholder.svg' : photoUrl}
                  alt={report.location}
                  onError={() => setImgError(true)}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Incident Details Summary */}
            <div className="space-y-3">
              <div>
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                  Reported Location / Landmark
                </span>
                <p className="text-sm font-bold text-slate-900 mt-0.5 flex items-start gap-1.5">
                  <MapPin className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                  <span>{report.location || 'Not Specified'}</span>
                </p>
              </div>

              <div>
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                  Detailed Description
                </span>
                <p className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-2.5 rounded-lg border border-slate-200 mt-1">
                  {report.description || 'No additional narrative description provided.'}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs pt-1">
                <div>
                  <span className="text-[10px] text-slate-400 block font-medium">Reported On:</span>
                  <span className="font-semibold text-slate-800 text-[11px]">
                    {formatReportTime(report.created_at)}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block font-medium">Last Updated:</span>
                  <span className="font-semibold text-slate-800 text-[11px]">
                    {formatReportTime(report.updated_at)}
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <span className="text-[11px] text-slate-500">
            Census AI Municipal Operations Engine
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-bold rounded-lg bg-blue-600 hover:bg-blue-700 text-white shadow-xs transition-colors cursor-pointer"
          >
            Close Case View
          </button>
        </div>
      </div>
    </div>
  );
}
