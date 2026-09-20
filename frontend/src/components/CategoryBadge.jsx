import React from 'react';
import { CATEGORIES } from '../types/contract';
import { formatCategory } from '../utils/formatters';
import { 
  Construction, 
  Trash2, 
  Droplets, 
  Lightbulb, 
  Waves, 
  HelpCircle,
  AlertCircle
} from 'lucide-react';

export default function CategoryBadge({ category, className = '' }) {
  const getCategoryDetails = (cat) => {
    switch (cat) {
      case CATEGORIES.POTHOLE:
        return {
          icon: <Construction className="w-3.5 h-3.5 text-blue-700 shrink-0" />,
          label: 'Pothole',
          style: 'bg-blue-50 text-blue-800 border-blue-200',
        };
      case CATEGORIES.GARBAGE:
        return {
          icon: <Trash2 className="w-3.5 h-3.5 text-slate-700 shrink-0" />,
          label: 'Garbage',
          style: 'bg-slate-100 text-slate-800 border-slate-200',
        };
      case CATEGORIES.WATER_LEAK:
        return {
          icon: <Droplets className="w-3.5 h-3.5 text-cyan-700 shrink-0" />,
          label: 'Water Leak',
          style: 'bg-cyan-50 text-cyan-800 border-cyan-200',
        };
      case CATEGORIES.STREETLIGHT:
        return {
          icon: <Lightbulb className="w-3.5 h-3.5 text-amber-700 shrink-0" />,
          label: 'Streetlight',
          style: 'bg-amber-50 text-amber-800 border-amber-200',
        };
      case CATEGORIES.DRAINAGE:
        return {
          icon: <Waves className="w-3.5 h-3.5 text-indigo-700 shrink-0" />,
          label: 'Drainage',
          style: 'bg-indigo-50 text-indigo-800 border-indigo-200',
        };
      default:
        return {
          icon: <HelpCircle className="w-3.5 h-3.5 text-slate-600 shrink-0" />,
          label: formatCategory(cat) || 'Civic Issue',
          style: 'bg-slate-100 text-slate-700 border-slate-200',
        };
    }
  };

  const { icon, label, style } = getCategoryDetails(category);

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-xs font-semibold border ${style} ${className}`}
    >
      {icon}
      <span>{label}</span>
    </span>
  );
}
