import React, { useState } from 'react';
import PriorityBadge from './PriorityBadge';
import CategoryBadge from './CategoryBadge';
import { formatReportTime, getPriorityTheme, formatStatus } from '../utils/formatters';
import { MapPin, Clock } from 'lucide-react';

export default function ReportCard({ report }) {
  const [imgError, setImgError] = useState(false);
  const theme = getPriorityTheme(report.priority);

  return (
    <article className="bg-white rounded-md border border-slate-200 p-3.5 sm:p-4 shadow-2xs hover:border-slate-300 transition-colors">
      <div className="flex flex-col md:flex-row gap-4">
        {/* Left Column: Evidence Photo */}
        <div className="shrink-0 w-full md:w-48 lg:w-52 h-36 md:h-auto min-h-[140px] max-h-[160px] rounded border border-slate-200 bg-slate-50 overflow-hidden relative flex items-center justify-center">
          <img
            src={imgError ? '/demo/placeholder.svg' : (report.photo_url || '/demo/placeholder.svg')}
            alt={`Evidence for ${report.id} - ${report.category}`}
            onError={() => setImgError(true)}
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute bottom-1.5 left-1.5 px-1.5 py-0.5 rounded bg-black/65 backdrop-blur-xs text-[10px] font-medium text-white tracking-wide">
            Evidence Photo
          </div>
        </div>

        {/* Center Column: Complaint Information */}
        <div className="flex-1 flex flex-col justify-between min-w-0">
          <div>
            {/* Category tag & Location title */}
            <div className="flex flex-wrap items-center gap-2 mb-1.5">
              <CategoryBadge category={report.category} />
              <div className="flex items-center gap-1 text-xs text-slate-500 md:hidden">
                <span>• ID:</span>
                <span className="font-mono font-medium text-slate-700">{report.id}</span>
              </div>
            </div>

            {/* Main Location Heading */}
            <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-snug mb-1.5">
              {report.location || 'Location not specified'}
            </h3>

            {/* Description */}
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-2.5 line-clamp-2">
              {report.description || 'No detailed description provided.'}
            </p>
          </div>

          {/* Administrative Metadata */}
          <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500">
            {/* Timestamp */}
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span>Reported: </span>
              <span className="font-medium text-slate-700">
                {formatReportTime(report.created_at)}
              </span>
            </div>

            {/* Status Indicator */}
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-blue-600 shrink-0"></span>
              <span className="font-medium text-slate-700">
                Status: {formatStatus(report.status)}
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Priority & Case Dispatch Panel */}
        <div className="shrink-0 md:w-44 lg:w-48 flex md:flex-col justify-between items-start md:items-end border-t md:border-t-0 md:border-l border-slate-100 pt-2.5 md:pt-0 md:pl-4">
          {/* Priority Badge & Urgency Score */}
          <div className="flex md:flex-col items-center md:items-end gap-2 md:gap-1.5">
            <PriorityBadge priority={report.priority} />
            
            <div className="text-left md:text-right">
              <div className="text-[11px] text-slate-400 uppercase tracking-wider font-medium">
                Priority Score
              </div>
              <div className="text-sm sm:text-base font-bold text-slate-900 font-mono">
                {report.priority_score} <span className="text-xs text-slate-400 font-normal">/ 100</span>
              </div>
              <div className={`text-[11px] font-medium hidden md:block ${theme.textColor}`}>
                {theme.urgencyText}
              </div>
            </div>
          </div>

          {/* Complaint Case ID */}
          <div className="text-xs text-slate-400 font-mono text-right mt-auto pt-2">
            <span className="hidden md:inline">Case ID: </span>
            <span className="font-semibold text-slate-700">{report.id}</span>
          </div>
        </div>
      </div>
    </article>
  );
}
