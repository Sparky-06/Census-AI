import React from 'react';
import { 
  X, 
  PhoneCall, 
  Flame, 
  ShieldAlert, 
  Droplets, 
  Zap, 
  Ambulance, 
  AlertTriangle,
  Building2
} from 'lucide-react';

export default function EmergencyModal({ isOpen = false, onClose = () => {} }) {
  if (!isOpen) return null;

  const contacts = [
    {
      title: 'National Emergency Helpline',
      number: '112',
      desc: 'All-in-one emergency response service (Police, Fire, Ambulance)',
      icon: ShieldAlert,
      color: 'bg-red-600 text-white',
    },
    {
      title: 'Municipal Disaster Management Control',
      number: '1077',
      desc: '24/7 disaster cell for floods, tree falls, building collapse',
      icon: Building2,
      color: 'bg-amber-600 text-white',
    },
    {
      title: 'Water Supply & Pipeline Emergency',
      number: '1916',
      desc: 'Emergency water main burst, sewer overflow, valve collapse',
      icon: Droplets,
      color: 'bg-blue-600 text-white',
    },
    {
      title: 'Electricity & High Tension Faults',
      number: '1912',
      desc: 'Exposed live power cables, transformer sparks, street pole short-circuits',
      icon: Zap,
      color: 'bg-yellow-600 text-white',
    },
    {
      title: 'Fire & Rescue Services',
      number: '101',
      desc: 'Immediate emergency fire fighting and structural rescue',
      icon: Flame,
      color: 'bg-rose-600 text-white',
    },
    {
      title: 'Ambulance & Medical Emergency',
      number: '108',
      desc: 'Emergency paramedic dispatch and critical patient transit',
      icon: Ambulance,
      color: 'bg-emerald-600 text-white',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div 
        className="bg-white rounded-2xl border border-red-200 shadow-2xl max-w-xl w-full overflow-hidden animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-red-600 to-rose-700 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center">
              <PhoneCall className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-base font-bold leading-tight">
                Municipal Emergency Civic Helplines
              </h3>
              <p className="text-xs text-red-100 mt-0.5">
                Immediate response lines for life-threatening civic hazards
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-white/80 hover:text-white rounded-lg hover:bg-white/20 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Contacts Grid */}
        <div className="p-6 max-h-[70vh] overflow-y-auto space-y-3">
          <div className="p-3 bg-red-50 border border-red-200 rounded-xl flex items-start gap-2.5 text-xs text-red-900 mb-4">
            <AlertTriangle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
            <p>
              <strong>Notice:</strong> For standard non-emergency complaints (potholes, missed garbage), please use the regular grievance submission form.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {contacts.map((c) => {
              const Icon = c.icon;
              return (
                <div 
                  key={c.number} 
                  className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition-colors flex flex-col justify-between shadow-2xs"
                >
                  <div className="flex items-start gap-2.5 mb-2">
                    <div className={`w-8 h-8 rounded-lg ${c.color} flex items-center justify-center shrink-0`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 leading-tight">
                        {c.title}
                      </h4>
                      <p className="text-[10px] text-slate-500 mt-0.5 leading-snug">
                        {c.desc}
                      </p>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-200/80 flex items-center justify-between">
                    <span className="text-[10px] font-bold text-slate-400 uppercase">Emergency Dial</span>
                    <a
                      href={`tel:${c.number}`}
                      className="text-sm font-extrabold text-red-700 hover:text-red-900 font-mono tracking-wider bg-red-100/70 px-2 py-0.5 rounded"
                    >
                      {c.number}
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-semibold rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-800 transition cursor-pointer"
          >
            Close Helplines
          </button>
        </div>
      </div>
    </div>
  );
}
