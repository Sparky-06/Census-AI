import React from 'react';
import { 
  Building2, 
  ShieldCheck, 
  Cpu, 
  Users, 
  ArrowLeft,
  Sparkles,
  CheckCircle2
} from 'lucide-react';

export default function AboutPage({ onNavigate = () => {} }) {
  return (
    <div className="max-w-4xl mx-auto py-2 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-200">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <Building2 className="w-5 h-5 text-blue-600" />
            About Census AI & Municipal Grievance Portal
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Empowering municipal corporations with AI-driven civic grievance classification and triage.
          </p>
        </div>
        <button
          onClick={() => onNavigate('Dashboard')}
          className="text-xs font-semibold text-slate-600 hover:text-slate-900 flex items-center gap-1 px-3 py-1.5 rounded-md border border-slate-200 bg-white hover:bg-slate-50 transition cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Dashboard
        </button>
      </div>

      {/* Mission Card */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs space-y-4">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Next-Generation Civic Technology</span>
        </div>

        <h3 className="text-lg font-bold text-slate-900">
          Transforming Municipal Governance with Intelligent Image Triage
        </h3>

        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          <strong>Census AI</strong> is an advanced municipal operations platform designed to bridge citizens and city engineering departments. By leveraging multimodal AI vision models, citizen-submitted photographs of potholes, overflowing garbage, water bursts, and streetlight failures are instantly inspected, geo-localized, and scored by severity.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <Cpu className="w-6 h-6 text-blue-600 mb-2" />
            <h4 className="text-xs font-bold text-slate-900 mb-1">Automated AI Vision</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Zero manual categorization needed. Gemini vision models classify category and safety risks in real-time.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <ShieldCheck className="w-6 h-6 text-emerald-600 mb-2" />
            <h4 className="text-xs font-bold text-slate-900 mb-1">Objective Priority Scoring</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              High-risk civic hazards automatically bypass delays and are dispatched immediately to field teams.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <Users className="w-6 h-6 text-purple-600 mb-2" />
            <h4 className="text-xs font-bold text-slate-900 mb-1">Transparent Citizen Trust</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              End-to-end transparent grievance tracking with verified photo audit trails upon job completion.
            </p>
          </div>
        </div>
      </div>

      {/* Disclaimers & Operational Notice */}
      <div className="p-4 rounded-2xl bg-slate-100 border border-slate-200 text-xs text-slate-600 space-y-1.5">
        <p className="font-bold text-slate-800">Project Notice:</p>
        <p className="leading-relaxed">
          Census AI Municipal Citizen Grievance Portal is an academic & operational demo engineering application. Real-time civic services are powered by connected local backend microservices.
        </p>
      </div>
    </div>
  );
}
