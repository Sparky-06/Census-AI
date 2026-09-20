import React from 'react';
import { PRIORITIES } from '../types/contract';
import { AlertCircle, AlertTriangle, CheckCircle2, ShieldAlert } from 'lucide-react';

export default function PriorityBadge({ priority, showIcon = true, className = '' }) {
  const getBadgeConfig = () => {
    switch (priority) {
      case PRIORITIES.HIGH:
        return {
          icon: <AlertCircle className="w-3.5 h-3.5 text-red-600 shrink-0" />,
          label: 'HIGH PRIORITY',
          style: 'bg-red-50 text-red-700 border-red-200',
        };
      case PRIORITIES.MEDIUM:
        return {
          icon: <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0" />,
          label: 'MEDIUM PRIORITY',
          style: 'bg-amber-50 text-amber-700 border-amber-200',
        };
      case PRIORITIES.LOW:
        return {
          icon: <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />,
          label: 'LOW PRIORITY',
          style: 'bg-emerald-50 text-emerald-700 border-emerald-200',
        };
      default:
        return {
          icon: <ShieldAlert className="w-3.5 h-3.5 text-slate-500 shrink-0" />,
          label: priority ? `${priority.toUpperCase()} PRIORITY` : 'STANDARD',
          style: 'bg-slate-50 text-slate-700 border-slate-200',
        };
    }
  };

  const { icon, label, style } = getBadgeConfig();

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[11px] font-bold tracking-wide border uppercase ${style} ${className}`}
    >
      {showIcon && icon}
      <span>{label}</span>
    </span>
  );
}
