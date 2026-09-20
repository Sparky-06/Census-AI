import React, { useState, useEffect, useCallback } from 'react';
import ReportCard from './ReportCard';
import SummaryHeader from './SummaryHeader';
import { fetchReports, DEFAULT_USE_MOCK } from '../services/api';
import { 
  RotateCw, 
  Building, 
  AlertCircle, 
  CheckCircle2, 
  Inbox,
  ChevronDown,
  Layers,
  FileCheck
} from 'lucide-react';

export default function Dashboard() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const [useMock, setUseMock] = useState(DEFAULT_USE_MOCK);
  const [lastRefreshed, setLastRefreshed] = useState(null);

  const loadData = useCallback(async (isManualRefresh = false) => {
    if (isManualRefresh) {
      setRefreshing(true);
    } else {
      setLoading(true);
    }
    setError(null);

    const result = await fetchReports({ useMock });

    if (result.error) {
      setError(result.error);
      setReports([]);
    } else {
      setReports(result.data || []);
      setLastRefreshed(new Date());
    }

    setLoading(false);
    setRefreshing(false);
  }, [useMock]);

  useEffect(() => {
    loadData(false);
  }, [loadData]);

  const handleRefresh = () => {
    loadData(true);
  };

  const toggleMockMode = () => {
    setUseMock((prev) => !prev);
  };

  return (
    <div className="min-h-screen bg-[#F4F6F9] text-slate-800 flex flex-col">
      {/* Top Official Municipal Header */}
      <header className="sticky top-0 z-20 bg-[#0B5CAB] text-white shadow-xs border-b border-[#094b8c]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-3 flex flex-wrap items-center justify-between gap-4">
            {/* Government Portal Brand & Identity */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded bg-white text-[#0B5CAB] flex items-center justify-center shadow-xs shrink-0 font-bold">
                <Building className="w-5 h-5" />
              </div>
              <div>
                <h1 className="text-base sm:text-lg font-bold tracking-tight text-white leading-tight">
                  Municipal Citizen Grievance Portal
                </h1>
                <p className="text-xs text-blue-100 font-normal">
                  CENSUS AI • Officer Operations Dashboard
                </p>
              </div>
            </div>

            {/* Right Action & Status Area */}
            <div className="flex items-center flex-wrap gap-3">
              {/* Subtle System Status */}
              <div className="hidden sm:flex items-center gap-1.5 text-xs text-blue-100 bg-blue-900/30 px-2.5 py-1 rounded border border-blue-400/20">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                <span>System Status: Online</span>
              </div>

              {/* Mode Indicator / Switch */}
              <button
                onClick={toggleMockMode}
                type="button"
                title="Click to toggle between Demo Data and Live API mode"
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-semibold bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-colors cursor-pointer"
              >
                <span className={`w-2 h-2 rounded-full ${useMock ? 'bg-amber-400' : 'bg-emerald-400'}`}></span>
                <span>{useMock ? 'Demo Data' : 'Live API'}</span>
              </button>

              {/* Official Refresh Button */}
              <button
                onClick={handleRefresh}
                disabled={loading || refreshing}
                type="button"
                className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded text-xs font-semibold bg-white text-[#0B5CAB] hover:bg-blue-50 shadow-xs transition-colors active:scale-98 disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
              >
                <RotateCw
                  className={`w-3.5 h-3.5 ${refreshing ? 'animate-spin' : ''}`}
                />
                <span>{refreshing ? 'Updating...' : 'Refresh'}</span>
              </button>
            </div>
          </div>

          {/* Institutional Navigation Bar */}
          <div className="flex items-center gap-6 text-xs font-medium border-t border-blue-400/20 pt-2 pb-1 overflow-x-auto">
            <span className="text-white border-b-2 border-white pb-1 font-semibold flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5" />
              Citizen Complaints
            </span>
            <span className="text-blue-200 hover:text-white pb-1 transition-colors cursor-default flex items-center gap-1.5">
              <FileCheck className="w-3.5 h-3.5" />
              Dashboard Summary
            </span>
            {lastRefreshed && (
              <span className="ml-auto text-[11px] text-blue-200 hidden md:inline">
                Last synced: {lastRefreshed.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
              </span>
            )}
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-6">
        {/* KPI Summary Header */}
        <SummaryHeader reports={reports} />

        {/* Section Header: Page Heading & Sort Control */}
        <div className="flex flex-wrap items-end justify-between gap-3 mb-4 pb-2 border-b border-slate-200">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
              Citizen Complaints
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Review and prioritize reported civic issues across municipal jurisdictions
            </p>
          </div>

          {/* Administrative Sort Bar */}
          <div className="text-xs text-slate-600 flex items-center gap-2 bg-white px-3 py-1.5 rounded border border-slate-200 shadow-2xs">
            <span className="text-slate-500">Sort by:</span>
            <span className="font-semibold text-slate-800 flex items-center gap-1">
              Priority — Highest First
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </span>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="space-y-3 py-6">
            <div className="text-center mb-4">
              <RotateCw className="w-6 h-6 text-[#0B5CAB] animate-spin mx-auto mb-1.5" />
              <p className="text-xs text-slate-600 font-medium">Loading civic complaint records...</p>
            </div>
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className="h-36 bg-white rounded border border-slate-200 shadow-2xs animate-pulse"
              />
            ))}
          </div>
        )}

        {/* Error State */}
        {!loading && error && (
          <div className="p-4 rounded bg-red-50 border border-red-200 text-red-900 my-4 shadow-2xs">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-700 shrink-0 mt-0.5" />
              <div className="flex-1">
                <h3 className="text-sm font-bold text-red-900">
                  Unable to load reports ({error.code || 'API_ERROR'})
                </h3>
                <p className="text-xs text-red-800 mt-1 leading-relaxed">
                  {error.message}
                </p>
                <div className="mt-2.5 flex flex-wrap gap-2">
                  <button
                    onClick={handleRefresh}
                    type="button"
                    className="px-3 py-1 text-xs font-semibold rounded bg-red-700 hover:bg-red-800 text-white transition cursor-pointer"
                  >
                    Retry
                  </button>
                  {!useMock && (
                    <button
                      onClick={() => setUseMock(true)}
                      type="button"
                      className="px-3 py-1 text-xs font-semibold rounded bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 transition cursor-pointer"
                    >
                      Switch to Demo Data
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && reports.length === 0 && (
          <div className="text-center py-12 px-4 bg-white rounded border border-slate-200 shadow-2xs my-4">
            <Inbox className="w-9 h-9 text-slate-400 mx-auto mb-2" />
            <h3 className="text-sm font-bold text-slate-800 mb-1">
              No Civic Complaints Available
            </h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto mb-3">
              There are currently no active complaints in the queue. New submissions from citizens will appear here after processing.
            </p>
            <button
              onClick={handleRefresh}
              type="button"
              className="px-3 py-1 text-xs font-semibold rounded bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300 transition cursor-pointer"
            >
              Refresh Queue
            </button>
          </div>
        )}

        {/* Complaint Records Queue */}
        {!loading && !error && reports.length > 0 && (
          <div className="space-y-3">
            {reports.map((report) => (
              <ReportCard key={report.id} report={report} />
            ))}
          </div>
        )}
      </main>

      {/* Official Government Footer */}
      <footer className="border-t border-slate-200 bg-white mt-auto py-3 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between gap-2">
          <div>
            <span className="font-semibold text-slate-700">CENSUS AI</span>
            <span className="mx-1 text-slate-400">•</span>
            <span>Municipal Citizen Grievance Portal</span>
          </div>
          <span className="text-slate-400">Officer Operations Dashboard • Demo interface for civic complaint management</span>
        </div>
      </footer>
    </div>
  );
}
