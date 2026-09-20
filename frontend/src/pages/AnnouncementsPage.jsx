import React, { useState } from 'react';
import { ANNOUNCEMENTS } from '../data/announcements';
import { 
  Megaphone, 
  Calendar, 
  Search, 
  ArrowLeft, 
  FileText, 
  Info, 
  CheckCircle2,
  Tag
} from 'lucide-react';

export default function AnnouncementsPage({ onNavigate = () => {} }) {
  const [selectedCat, setSelectedCat] = useState('All');
  const [query, setQuery] = useState('');

  const categories = ['All', 'Maintenance', 'Digital Initiative', 'Water Utility', 'Disaster Cell'];

  const filtered = ANNOUNCEMENTS.filter((item) => {
    if (selectedCat !== 'All' && item.category !== selectedCat) return false;
    if (query.trim()) {
      const q = query.toLowerCase();
      return (
        item.title.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.details.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="space-y-6 py-2">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-200">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <Megaphone className="w-5 h-5 text-blue-600" />
            Municipal Announcements & Public Notices
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Official municipal circulars, scheduled infrastructure maintenance advisories, and civic drives.
          </p>
        </div>
        <button
          onClick={() => onNavigate('Dashboard')}
          className="text-xs font-semibold text-slate-600 hover:text-slate-900 flex items-center gap-1 px-3 py-1.5 rounded-md border border-slate-200 bg-white hover:bg-slate-50 transition cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Dashboard
        </button>
      </div>

      {/* Filters & Search */}
      <div className="bg-white rounded-xl border border-slate-200/90 p-3 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex flex-wrap gap-1.5 w-full sm:w-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCat(cat)}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors cursor-pointer ${
                selectedCat === cat
                  ? 'bg-blue-600 text-white shadow-2xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search circulars, wards..."
            className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-md focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-blue-500 text-slate-800"
          />
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
        </div>
      </div>

      {/* Announcements List */}
      <div className="space-y-4">
        {filtered.map((item) => (
          <article
            key={item.id}
            className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs hover:border-blue-300 transition-colors"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2 pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className={`px-2.5 py-0.5 rounded text-[11px] font-bold border ${item.badgeColor}`}>
                  {item.category}
                </span>
                <h3 className="text-base font-bold text-slate-900">
                  {item.title}
                </h3>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                <span>Published: {item.date}</span>
              </div>
            </div>

            <p className="text-xs sm:text-sm font-semibold text-slate-700 mb-1.5">
              {item.description}
            </p>
            <p className="text-xs text-slate-600 leading-relaxed">
              {item.details}
            </p>
          </article>
        ))}
      </div>
    </div>
  );
}
