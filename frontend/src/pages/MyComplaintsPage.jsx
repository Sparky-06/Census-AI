import React, { useState } from 'react';
import ComplaintCard from '../components/ComplaintCard';
import { 
  FileText, 
  Search, 
  Filter, 
  ArrowLeft, 
  Inbox,
  CheckCircle2,
  AlertTriangle,
  Clock
} from 'lucide-react';

export default function MyComplaintsPage({ 
  reports = [], 
  onNavigate = () => {},
  onViewDetails = () => {} 
}) {
  const [tab, setTab] = useState('all');
  const [query, setQuery] = useState('');

  const filtered = reports.filter((r) => {
    if (tab === 'reported' && r.status !== 'reported') return false;
    if (tab === 'in_progress' && r.status !== 'in_progress' && r.status !== 'assigned') return false;
    if (tab === 'resolved' && r.status !== 'resolved' && r.status !== 'verified') return false;

    if (query.trim()) {
      const q = query.toLowerCase();
      return (
        (r.location && r.location.toLowerCase().includes(q)) ||
        (r.description && r.description.toLowerCase().includes(q)) ||
        (r.category && r.category.toLowerCase().includes(q)) ||
        (r.id && r.id.toLowerCase().includes(q))
      );
    }
    return true;
  });

  return (
    <div className="space-y-5">
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <FileText className="w-5 h-5 text-blue-600" />
              My Complaints & Current Reports
            </h2>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-300">
              Demo / Current Reports View
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Active civic incident records filed across current operational sessions.
          </p>
        </div>
        <button
          onClick={() => onNavigate('FileComplaint')}
          className="text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 px-3.5 py-2 rounded-lg shadow-xs transition cursor-pointer"
        >
          + File New Complaint
        </button>
      </div>

      {/* Filter Tabs & Search Bar */}
      <div className="bg-white rounded-xl border border-slate-200/90 p-3 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Status Tabs */}
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg w-full sm:w-auto">
          {[
            { id: 'all', label: `All (${reports.length})` },
            { id: 'reported', label: `Reported (${reports.filter(r => r.status === 'reported').length})` },
            { id: 'in_progress', label: `In Progress (${reports.filter(r => r.status === 'in_progress' || r.status === 'assigned').length})` },
            { id: 'resolved', label: `Resolved (${reports.filter(r => r.status === 'resolved' || r.status === 'verified').length})` },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors cursor-pointer ${
                tab === t.id
                  ? 'bg-white text-blue-700 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-64">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by location, category..."
            className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-md focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-blue-500 text-slate-800 placeholder-slate-400"
          />
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
        </div>
      </div>

      {/* Reports List */}
      {filtered.length === 0 ? (
        <div className="text-center py-12 px-4 bg-white rounded-xl border border-slate-200 shadow-2xs">
          <Inbox className="w-10 h-10 text-slate-300 mx-auto mb-2" />
          <h3 className="text-sm font-bold text-slate-800 mb-1">
            No Complaints in this Filter
          </h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto mb-3">
            Try choosing a different tab or clear search terms.
          </p>
          <button
            onClick={() => { setTab('all'); setQuery(''); }}
            className="px-3.5 py-1.5 text-xs font-semibold rounded-md bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300 cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="space-y-3.5">
          {filtered.map((report) => (
            <ComplaintCard
              key={report.id}
              report={report}
              onViewDetails={onViewDetails}
            />
          ))}
        </div>
      )}
    </div>
  );
}
