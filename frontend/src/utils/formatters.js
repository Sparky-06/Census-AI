import { CATEGORIES, CATEGORY_LABELS, PRIORITIES } from '../types/contract';

/**
 * Format ISO8601 UTC timestamp to readable municipal date & time string
 * Example: "2026-09-20T08:30:00Z" -> "20 September 2026, 08:30 AM"
 */
export function formatReportTime(isoString) {
  if (!isoString) return 'Time unknown';
  try {
    const date = new Date(isoString);
    if (isNaN(date.getTime())) return isoString;

    return new Intl.DateTimeFormat('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    }).format(date);
  } catch {
    return isoString;
  }
}

/**
 * Get human-readable category name from canonical enum
 */
export function formatCategory(category) {
  if (!category) return 'Other';
  return CATEGORY_LABELS[category] || category.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
}

/**
 * Official Government Priority styling mapping (Clean, trustworthy, no neon)
 */
export function getPriorityTheme(priority) {
  switch (priority) {
    case PRIORITIES.HIGH:
      return {
        badgeBg: 'bg-red-50 text-red-800 border-red-200 font-semibold',
        scoreBg: 'bg-red-700 text-white',
        cardBorder: 'border-slate-200/90 hover:border-red-300',
        topAccent: 'border-t-2 border-t-red-700',
        indicator: 'bg-red-700',
        textColor: 'text-red-800',
        urgencyText: 'Requires Immediate Action',
        label: 'HIGH PRIORITY',
        shortLabel: 'HIGH',
      };
    case PRIORITIES.MEDIUM:
      return {
        badgeBg: 'bg-amber-50 text-amber-800 border-amber-200 font-semibold',
        scoreBg: 'bg-amber-600 text-white',
        cardBorder: 'border-slate-200/90 hover:border-amber-300',
        topAccent: 'border-t-2 border-t-amber-600',
        indicator: 'bg-amber-600',
        textColor: 'text-amber-800',
        urgencyText: 'Requires Assessment',
        label: 'MEDIUM PRIORITY',
        shortLabel: 'MEDIUM',
      };
    case PRIORITIES.LOW:
      return {
        badgeBg: 'bg-emerald-50 text-emerald-800 border-emerald-200 font-semibold',
        scoreBg: 'bg-emerald-700 text-white',
        cardBorder: 'border-slate-200/90 hover:border-emerald-300',
        topAccent: 'border-t-2 border-t-emerald-600',
        indicator: 'bg-emerald-600',
        textColor: 'text-emerald-800',
        urgencyText: 'Routine Maintenance',
        label: 'LOW PRIORITY',
        shortLabel: 'LOW',
      };
    default:
      return {
        badgeBg: 'bg-slate-50 text-slate-700 border-slate-200 font-medium',
        scoreBg: 'bg-slate-600 text-white',
        cardBorder: 'border-slate-200/90 hover:border-slate-300',
        topAccent: 'border-t-2 border-t-slate-400',
        indicator: 'bg-slate-400',
        textColor: 'text-slate-700',
        urgencyText: 'Standard Review',
        label: priority || 'STANDARD',
        shortLabel: priority || 'STANDARD',
      };
  }
}

/**
 * Format status for presentation in government portal
 */
export function formatStatus(status) {
  if (!status) return 'Reported';
  return status.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
}
