import React from 'react';
import { CIVIC_SERVICES } from '../data/civicServices';
import { 
  LayoutGrid, 
  Construction, 
  Trash2, 
  Waves, 
  Lightbulb, 
  Droplets, 
  Sparkles, 
  Clock, 
  Phone, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

export default function ServicesPage({ onNavigate = () => {} }) {
  const getServiceIcon = (iconName) => {
    switch (iconName) {
      case 'Construction':
        return <Construction className="w-6 h-6 text-blue-600" />;
      case 'Trash2':
        return <Trash2 className="w-6 h-6 text-emerald-600" />;
      case 'Waves':
        return <Waves className="w-6 h-6 text-indigo-600" />;
      case 'Lightbulb':
        return <Lightbulb className="w-6 h-6 text-amber-600" />;
      case 'Droplets':
        return <Droplets className="w-6 h-6 text-cyan-600" />;
      default:
        return <Sparkles className="w-6 h-6 text-purple-600" />;
    }
  };

  return (
    <div className="space-y-6 py-2">
      {/* Top Header */}
      <div className="pb-3 border-b border-slate-200">
        <h2 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
          <LayoutGrid className="w-5 h-5 text-blue-600" />
          Municipal Civic Services Directory
        </h2>
        <p className="text-xs text-slate-500 mt-0.5">
          Standard operational service levels, emergency helplines, and direct grievance submission for all civic departments.
        </p>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {CIVIC_SERVICES.map((service) => (
          <div
            key={service.id}
            className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs hover:border-blue-300 hover:shadow-sm transition-all flex flex-col justify-between"
          >
            <div>
              {/* Top Icon & Category */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center shadow-2xs">
                  {getServiceIcon(service.icon)}
                </div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider bg-slate-100 px-2 py-0.5 rounded">
                  {service.category}
                </span>
              </div>

              {/* Title & Department */}
              <h3 className="text-base font-bold text-slate-900 mb-0.5">
                {service.title}
              </h3>
              <p className="text-[11px] font-semibold text-blue-700 mb-2">
                {service.department}
              </p>

              {/* Description */}
              <p className="text-xs text-slate-600 leading-relaxed mb-3">
                {service.description}
              </p>

              {/* Popular Topics */}
              <div className="mb-4">
                <span className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Common Grievances</span>
                <div className="flex flex-wrap gap-1">
                  {service.popularTopics.map((topic, i) => (
                    <span key={i} className="text-[10px] bg-slate-50 border border-slate-200 text-slate-600 px-2 py-0.5 rounded-full">
                      {topic}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Metadata & Action */}
            <div className="pt-3 border-t border-slate-100 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500 flex items-center gap-1 text-[11px]">
                  <Clock className="w-3.5 h-3.5 text-slate-400" /> SLA: <strong className="text-slate-800">{service.sla}</strong>
                </span>
                <span className="text-slate-500 flex items-center gap-1 text-[11px]">
                  <Phone className="w-3.5 h-3.5 text-slate-400" /> {service.helpline}
                </span>
              </div>

              <button
                onClick={() => onNavigate('FileComplaint')}
                className="w-full py-2 text-xs font-bold rounded-lg bg-blue-50 hover:bg-blue-600 text-blue-700 hover:text-white border border-blue-200 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Report Grievance in this Category</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
