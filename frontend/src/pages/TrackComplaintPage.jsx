import React, { useState, useEffect } from 'react';
import { fetchReportById, formatPhotoUrl } from '../services/api';
import PriorityBadge from '../components/PriorityBadge';
import CategoryBadge from '../components/CategoryBadge';
import { formatReportTime, formatStatus } from '../utils/formatters';
import { 
  Search, 
  RotateCw, 
  AlertCircle, 
  MapPin, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  ArrowLeft,
  FileSearch,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';

export default function TrackComplaintPage({ 
  useMock = false, 
  reports = [], 
  onNavigate = () => {},
  initialId = '' 
}) {
  const [searchId, setSearchId] = useState(initialId);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [report, setReport] = useState(null);
  const [imgError, setImgError] = useState(false);

  // If initialId passed, perform search
  useEffect(() => {
    if (initialId) {
      handleSearch(initialId);
    } else if (reports.length > 0) {
      // Default to first report for quick exploration
      handleSearch(reports[0].id);
    }
  }, [initialId, reports]);

  const handleSearch = async (idToSearch) => {
    const targetId = (idToSearch || searchId).trim();
    if (!targetId) {
      setError('Please enter a valid Complaint ID or UUID');
      return;
    }

    setLoading(true);
    setError(null);
    setImgError(false);

    const result = await fetchReportById(targetId, { useMock });

    setLoading(false);

    if (result.error) {
      setError(result.error.message || `No complaint found with ID "${targetId}"`);
      setReport(null);
    } else {
      setReport(result.data);
      setSearchId(targetId);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    handleSearch(searchId);
  };

  const stages = [
    { key: 'reported', label: '1. Reported', desc: 'Complaint registered by citizen' },
    { key: 'assigned', label: '2. Assigned', desc: 'Assigned to Ward Junior Engineer' },
    { key: 'in_progress', label: '3. In Progress', desc: 'Field teams executing repair' },
    { key: 'resolved', label: '4. Resolved', desc: 'Work completed by engineering cell' },
    { key: 'verified', label: '5. Verified', desc: 'Citizen & audit verification complete' },
  ];

  const currentStageIndex = report 
    ? (stages.findIndex((s) => s.key === report.status) !== -1 ? stages.findIndex((s) => s.key === report.status) : 0)
    : 0;

  return (
    <div className="max-w-4xl mx-auto py-2 space-y-6">
      {/* Top Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-200">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <FileSearch className="w-5 h-5 text-blue-600" />
            Track Grievance Status
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Query real-time municipal records using official Complaint Case ID (UUID).
          </p>
        </div>
        <button
          onClick={() => onNavigate('Dashboard')}
          className="text-xs font-semibold text-slate-600 hover:text-slate-900 flex items-center gap-1 px-3 py-1.5 rounded-md border border-slate-200 bg-white hover:bg-slate-50 transition cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Dashboard
        </button>
      </div>

      {/* Search Bar Input */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs">
        <form onSubmit={onSubmit} className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <input
              type="text"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
              placeholder="Enter Complaint ID / UUID (e.g. b02e17ac-9dd8-4a38-ba26-3dc0bfe8e9cf)"
              className="w-full pl-9 pr-3 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-blue-500 text-slate-800 placeholder-slate-400 font-mono shadow-inner"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full sm:w-auto px-5 py-2.5 text-xs font-bold rounded-lg bg-[#0F4C81] hover:bg-blue-900 text-white shadow-xs transition-colors flex items-center justify-center gap-2 shrink-0 cursor-pointer disabled:opacity-50"
          >
            {loading ? <RotateCw className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
            <span>Track Case</span>
          </button>
        </form>

        {/* Quick Sample ID Chips */}
        {reports.length > 0 && (
          <div className="mt-3 pt-3 border-t border-slate-100 flex flex-wrap items-center gap-2 text-xs">
            <span className="text-[11px] font-semibold text-slate-400">Sample Active Cases:</span>
            {reports.slice(0, 4).map((r) => (
              <button
                key={r.id}
                type="button"
                onClick={() => handleSearch(r.id)}
                className={`px-2 py-0.5 rounded text-[11px] font-mono border transition cursor-pointer ${
                  searchId === r.id
                    ? 'bg-blue-100 text-blue-800 border-blue-300 font-bold'
                    : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                }`}
              >
                {r.id.length > 14 ? `${r.id.substring(0, 8)}...` : r.id} ({r.category})
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Error Message */}
      {error && (
        <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-xs text-red-800 flex items-start gap-2.5">
          <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
          <div>
            <p className="font-bold">Tracking Notice</p>
            <p className="mt-0.5">{error}</p>
          </div>
        </div>
      )}

      {/* Loading Skeleton */}
      {loading && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs animate-pulse space-y-4">
          <div className="h-6 bg-slate-200 rounded w-1/3" />
          <div className="h-24 bg-slate-100 rounded" />
          <div className="h-36 bg-slate-100 rounded" />
        </div>
      )}

      {/* Report Case Result Card */}
      {!loading && report && (
        <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs space-y-6">
          
          {/* Header Row */}
          <div className="flex flex-wrap items-start justify-between gap-4 pb-4 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <CategoryBadge category={report.category} />
                <PriorityBadge priority={report.priority} />
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                {report.location || 'Location Not Specified'}
              </h3>
              <p className="text-xs text-slate-500 font-mono mt-0.5">
                Case UUID: {report.id}
              </p>
            </div>

            <div className="text-right">
              <span className="text-[10px] text-slate-400 font-bold uppercase block">AI Priority Score</span>
              <div className="text-2xl font-extrabold text-slate-900 font-mono">
                {report.priority_score || 0} <span className="text-xs text-slate-400 font-normal">/ 100</span>
              </div>
            </div>
          </div>

          {/* 5-Stage Visual Progress Timeline */}
          <div>
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-3">
              Redressal Lifecycle Tracker
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
              {stages.map((stage, idx) => {
                const isPassed = idx <= currentStageIndex;
                const isCurrent = idx === currentStageIndex;

                return (
                  <div 
                    key={stage.key}
                    className={`p-3 rounded-xl border transition-all ${
                      isCurrent
                        ? 'bg-blue-50 border-blue-300 ring-2 ring-blue-500/20'
                        : isPassed
                        ? 'bg-emerald-50/60 border-emerald-200'
                        : 'bg-slate-50/50 border-slate-200 opacity-60'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 mb-1">
                      {isPassed ? (
                        <CheckCircle2 className={`w-3.5 h-3.5 ${isCurrent ? 'text-blue-600' : 'text-emerald-600'}`} />
                      ) : (
                        <span className="w-3.5 h-3.5 rounded-full border border-slate-300 inline-block" />
                      )}
                      <span className={`text-xs font-bold ${isCurrent ? 'text-blue-700' : isPassed ? 'text-emerald-800' : 'text-slate-500'}`}>
                        {stage.label}
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-500 leading-tight">
                      {stage.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Evidence Photo & Description */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-4 border-t border-slate-100">
            <div>
              <span className="text-xs font-bold text-slate-700 block mb-2">
                Attached Photo Evidence
              </span>
              <div className="w-full h-52 rounded-xl border border-slate-200 bg-slate-100 overflow-hidden">
                <img
                  src={imgError ? '/demo/placeholder.svg' : formatPhotoUrl(report.photo_url)}
                  alt={report.location}
                  onError={() => setImgError(true)}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  Problem Description
                </span>
                <p className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-200 mt-1">
                  {report.description || 'No additional narrative description provided.'}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                  <span className="text-[10px] text-slate-400 block font-medium">Reported Date & Time</span>
                  <span className="font-semibold text-slate-800 text-[11px] flex items-center gap-1 mt-0.5">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    {formatReportTime(report.created_at)}
                  </span>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                  <span className="text-[10px] text-slate-400 block font-medium">Last Audit Sync</span>
                  <span className="font-semibold text-slate-800 text-[11px] flex items-center gap-1 mt-0.5">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    {formatReportTime(report.updated_at)}
                  </span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-100 border border-slate-200 text-xs text-slate-600 flex items-center justify-between">
                <span>Current Status: <strong className="text-slate-900">{formatStatus(report.status)}</strong></span>
                <span className="text-[11px] text-blue-600 font-semibold">Ward Assigned: Ward 12</span>
              </div>
            </div>
          </div>

        </div>
      )}
    </div>
  );
}
