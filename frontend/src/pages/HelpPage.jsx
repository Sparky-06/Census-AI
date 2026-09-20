import React, { useState } from 'react';
import { FAQS, ESCALATION_MATRIX } from '../data/faqs';
import { 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  ShieldCheck, 
  PhoneCall, 
  ArrowLeft, 
  BookOpen, 
  AlertTriangle,
  Mail,
  FileText
} from 'lucide-react';

export default function HelpPage({ onNavigate = () => {} }) {
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <div className="max-w-4xl mx-auto py-2 space-y-7">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-200">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-blue-600" />
            Citizen Help Desk & Portal Documentation
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Step-by-step guides, AI priority rules, grievance escalation matrix, and FAQs.
          </p>
        </div>
        <button
          onClick={() => onNavigate('Dashboard')}
          className="text-xs font-semibold text-slate-600 hover:text-slate-900 flex items-center gap-1 px-3 py-1.5 rounded-md border border-slate-200 bg-white hover:bg-slate-50 transition cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back
        </button>
      </div>

      {/* 3 Step Grievance Redressal Guide */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs space-y-4">
        <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-blue-600" />
          How Civic Grievance Redressal Works (3 Simple Steps)
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-blue-50/50 border border-blue-100">
            <div className="w-7 h-7 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center mb-2 text-xs">
              1
            </div>
            <h4 className="font-bold text-slate-900 mb-1">Submit Evidence Photo</h4>
            <p className="text-slate-600 leading-relaxed">
              Snap a clear photo of the pothole, water leakage, or garbage spill and submit the location.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-purple-50/50 border border-purple-100">
            <div className="w-7 h-7 rounded-full bg-purple-600 text-white font-bold flex items-center justify-center mb-2 text-xs">
              2
            </div>
            <h4 className="font-bold text-slate-900 mb-1">Autonomous AI Assessment</h4>
            <p className="text-slate-600 leading-relaxed">
              Census AI inspects severity, generates a priority score (0-100), and dispatches work orders to the zonal ward crew.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-emerald-50/50 border border-emerald-100">
            <div className="w-7 h-7 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center mb-2 text-xs">
              3
            </div>
            <h4 className="font-bold text-slate-900 mb-1">Resolution & Tracking</h4>
            <p className="text-slate-600 leading-relaxed">
              Track the resolution timeline from "Assigned" to "Resolved" using your unique Case UUID.
            </p>
          </div>
        </div>
      </div>

      {/* Priority Scoring Rules */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs space-y-3">
        <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          AI Priority Score Classification Standard
        </h3>
        <p className="text-xs text-slate-600">
          The Census AI multimodal classification engine assigns priority scores based on hazard severity and public safety risk:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs pt-1">
          <div className="p-3 rounded-xl bg-red-50 border border-red-200">
            <span className="font-bold text-red-900 block">High Priority (Score: 70 - 100)</span>
            <p className="text-[11px] text-red-700 mt-1 leading-snug">
              Immediate hazard to life, high-speed traffic obstruction, or major water main bursts. SLA: 12 - 24 Hours.
            </p>
          </div>
          <div className="p-3 rounded-xl bg-amber-50 border border-amber-200">
            <span className="font-bold text-amber-900 block">Medium Priority (Score: 40 - 69)</span>
            <p className="text-[11px] text-amber-700 mt-1 leading-snug">
              Significant inconvenience, dark pedestrian walkways, or clogged drain gratings. SLA: 24 - 48 Hours.
            </p>
          </div>
          <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200">
            <span className="font-bold text-emerald-900 block">Low Priority (Score: 0 - 39)</span>
            <p className="text-[11px] text-emerald-700 mt-1 leading-snug">
              Minor cosmetic maintenance, slow irrigation leaks, or scheduled routine sweeping. SLA: 48 - 72 Hours.
            </p>
          </div>
        </div>
      </div>

      {/* Escalation Matrix */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs space-y-3">
        <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-amber-600" />
          Municipal Redressal Escalation Hierarchy
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 text-slate-500 font-bold border-b border-slate-200 uppercase text-[10px]">
              <tr>
                <th className="py-2.5 px-3">Escalation Stage</th>
                <th className="py-2.5 px-3">Designated Municipal Authority</th>
                <th className="py-2.5 px-3">Contact Email</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {ESCALATION_MATRIX.map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-50">
                  <td className="py-2.5 px-3 font-semibold text-slate-900">{item.level}</td>
                  <td className="py-2.5 px-3 text-slate-700">{item.role}</td>
                  <td className="py-2.5 px-3 font-mono text-blue-600">{item.contact}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* FAQs Accordion */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs space-y-3">
        <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
          <HelpCircle className="w-4 h-4 text-blue-600" />
          Frequently Asked Questions
        </h3>

        <div className="divide-y divide-slate-100">
          {FAQS.map((faq, idx) => (
            <div key={idx} className="py-3">
              <button
                onClick={() => setOpenFaq(openFaq === idx ? -1 : idx)}
                className="w-full flex items-center justify-between text-left text-xs font-bold text-slate-900 hover:text-blue-700 cursor-pointer"
              >
                <span>{faq.q}</span>
                {openFaq === idx ? (
                  <ChevronUp className="w-4 h-4 text-slate-400 shrink-0" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                )}
              </button>
              {openFaq === idx && (
                <p className="text-xs text-slate-600 leading-relaxed mt-2 pt-1">
                  {faq.a}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
