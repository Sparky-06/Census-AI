import React, { useState } from 'react';
import PriorityBadge from './PriorityBadge';
import CategoryBadge from './CategoryBadge';
import { formatReportTime, formatStatus } from '../utils/formatters';
import { formatPhotoUrl, getCategoryFallback } from '../services/api';
import { 
  MapPin, 
  Calendar, 
  ArrowRight, 
  MoreVertical 
} from 'lucide-react';

export default function ComplaintCard({ report, onViewDetails = () => {} }) {
  const [imgError, setImgError] = useState(false);

  const rawPhotoUrl = report.photo_url;
  const initialPhotoUrl = formatPhotoUrl(rawPhotoUrl, report.category);

  const getUrgencyText = () => {
    switch (report.priority) {
      case 'High':
        return { text: 'Requires Immediate Action', color: 'text-red-600' };
      case 'Medium':
        return { text: 'Requires Assessment', color: 'text-amber-700' };
      case 'Low':
        return { text: 'Routine Maintenance', color: 'text-emerald-700' };
      default:
        return { text: 'Standard Review', color: 'text-slate-600' };
    }
  };

  const urgency = getUrgencyText();

  return (
    <article className="bg-white rounded-xl border border-slate-200/90 p-4 sm:p-4.5 shadow-2xs hover:border-blue-300 transition-colors">
      <div className="flex flex-col md:flex-row gap-4">
        
        {/* Left: Evidence Photo (Generous dimensions matching reference) */}
        <div className="shrink-0 w-full md:w-44 lg:w-48 h-36 md:h-32 rounded-lg border border-slate-200 bg-slate-100 overflow-hidden relative">
          <img
            src={imgError ? getCategoryFallback(report.category) : initialPhotoUrl}
            alt={report.location}
            onError={() => setImgError(true)}
            className="w-full h-full object-cover block"
            loading="lazy"
          />
        </div>

        {/* Center: Complaint Details */}
        <div className="flex-1 flex flex-col justify-between min-w-0">
          <div>
            {/* Category badge */}
            <div className="mb-1.5">
              <CategoryBadge category={report.category} />
            </div>

            {/* Location Title Heading */}
            <h3 className="text-sm sm:text-[15px] font-bold text-slate-900 leading-snug mb-1">
              {report.location || 'Location Not Specified'}
            </h3>

            {/* Description */}
            <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
              {report.description || 'No additional description provided.'}
            </p>
          </div>

          {/* Bottom Metadata Line */}
          <div className="pt-2.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-[11.5px] text-slate-500 border-t border-slate-100/80 mt-2">
            {/* Location Pin */}
            <div className="flex items-center gap-1 text-slate-600 font-medium">
              <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span className="truncate max-w-[190px]">{report.location || 'MG Road, Ward 12'}</span>
            </div>

            {/* Reported Date */}
            <div className="flex items-center gap-1 text-slate-500">
              <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span>{formatReportTime(report.created_at)}</span>
            </div>

            {/* Status Dot */}
            <div className="flex items-center gap-1.5 font-medium text-slate-700">
              <span className="w-2 h-2 rounded-full bg-blue-600 shrink-0" />
              <span>{formatStatus(report.status)}</span>
            </div>
          </div>
        </div>

        {/* Right: Priority, Score, View Details */}
        <div className="shrink-0 md:w-40 lg:w-44 flex md:flex-col justify-between items-start md:items-end border-t md:border-t-0 md:border-l border-slate-100 pt-3 md:pt-0 md:pl-4">
          
          {/* Top Row: Priority Badge & 3-dots */}
          <div className="flex items-center justify-between w-full md:justify-end gap-1.5">
            <PriorityBadge priority={report.priority} />
            <button
              onClick={() => onViewDetails(report)}
              className="p-1 text-slate-400 hover:text-slate-700 rounded cursor-pointer"
              title="More details"
            >
              <MoreVertical className="w-4 h-4" />
            </button>
          </div>

          {/* Center: Priority Score */}
          <div className="text-left md:text-right my-1.5 md:my-0">
            <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
              Priority Score
            </div>
            <div className="text-base font-extrabold text-slate-900 font-mono leading-tight mt-0.5">
              {report.priority_score || 0} <span className="text-xs text-slate-400 font-normal">/ 100</span>
            </div>
            <div className={`text-[10.5px] font-semibold mt-0.5 ${urgency.color}`}>
              {urgency.text}
            </div>
          </div>

          {/* Bottom Action: View Details */}
          <button
            onClick={() => onViewDetails(report)}
            className="inline-flex items-center gap-1 text-xs font-bold text-[#1E6FD9] hover:underline cursor-pointer"
          >
            <span>View Details</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

        </div>

      </div>
    </article>
  );
}
