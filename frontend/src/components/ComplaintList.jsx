import React, { useState, useMemo } from 'react';
import ComplaintCard from './ComplaintCard';
import { ChevronDown, RotateCw } from 'lucide-react';

export default function ComplaintList({
  reports = [],
  loading = false,
  refreshing = false,
  error = null,
  onRefresh = () => {},
  useMock = false,
  onSwitchToMock = () => {},
  onViewDetails = () => {},
  searchQuery = ''
}) {
  const [sortOption, setSortOption] = useState('priority_desc');
  const [sortOpen, setSortOpen] = useState(false);

  const sortLabels = {
    priority_desc: 'Priority — Highest First',
    priority_asc: 'Priority — Lowest First',
    date_desc: 'Date — Newest First',
    date_asc: 'Date — Oldest First',
  };

  const processedReports = useMemo(() => {
    let list = [...reports];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter((r) => 
        (r.location && r.location.toLowerCase().includes(q)) ||
        (r.description && r.description.toLowerCase().includes(q)) ||
        (r.category && r.category.toLowerCase().includes(q))
      );
    }

    switch (sortOption) {
      case 'priority_desc':
        list.sort((a, b) => (b.priority_score || 0) - (a.priority_score || 0));
        break;
      case 'priority_asc':
        list.sort((a, b) => (a.priority_score || 0) - (b.priority_score || 0));
        break;
      case 'date_desc':
        list.sort((a, b) => new Date(b.created_at || 0) - new Date(a.created_at || 0));
        break;
      case 'date_asc':
        list.sort((a, b) => new Date(a.created_at || 0) - new Date(b.created_at || 0));
        break;
      default:
        break;
    }

    return list;
  }, [reports, searchQuery, sortOption]);

  return (
    <div className="space-y-3">
      {/* Section Header: Title & Sort Control (Exact match to screenshot) */}
      <div className="flex items-center justify-between gap-3 pb-1">
        <div>
          <h2 className="text-base font-bold text-[#0F2C59] tracking-tight">
            Citizen Complaints
          </h2>
          <p className="text-[11px] text-slate-500">
            Review and prioritize reported civic issues across municipal jurisdictions
          </p>
        </div>

        {/* Sort by dropdown */}
        <div className="relative">
          <button
            onClick={() => setSortOpen(!sortOpen)}
            type="button"
            className="text-xs text-slate-700 bg-white hover:bg-slate-50 px-3 py-1.5 rounded-md border border-slate-200 shadow-2xs flex items-center gap-1.5 cursor-pointer font-medium"
          >
            <span className="text-slate-500">Sort by:</span>
            <span className="font-semibold text-slate-800">{sortLabels[sortOption]}</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {sortOpen && (
            <div className="absolute right-0 top-8 w-52 bg-white rounded-md border border-slate-200 shadow-lg py-1 z-30 text-xs">
              {Object.entries(sortLabels).map(([key, label]) => (
                <button
                  key={key}
                  onClick={() => {
                    setSortOption(key);
                    setSortOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2 hover:bg-slate-50 ${
                    sortOption === key ? 'text-[#1E6FD9] font-bold bg-blue-50/50' : 'text-slate-700'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Loading Skeletons */}
      {loading && (
        <div className="space-y-3">
          {[1, 2, 3].map((n) => (
            <div key={n} className="h-32 bg-white rounded-xl border border-slate-200 shadow-2xs animate-pulse" />
          ))}
        </div>
      )}

      {/* Error state */}
      {!loading && error && (
        <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-xs text-red-900 shadow-2xs">
          <p className="font-bold">Unable to connect to the grievance server.</p>
          <p className="mt-0.5">{error.message || 'Make sure the backend is running at http://localhost:4000'}</p>
          <div className="mt-2.5 flex gap-2">
            <button
              onClick={onRefresh}
              className="px-3 py-1 bg-red-700 hover:bg-red-800 text-white rounded font-semibold cursor-pointer"
            >
              Retry
            </button>
            {!useMock && (
              <button
                onClick={onSwitchToMock}
                className="px-3 py-1 bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 rounded font-semibold cursor-pointer"
              >
                Switch to Demo Data
              </button>
            )}
          </div>
        </div>
      )}

      {/* Complaints List */}
      {!loading && !error && processedReports.map((report) => (
        <ComplaintCard
          key={report.id}
          report={report}
          onViewDetails={onViewDetails}
        />
      ))}
    </div>
  );
}
