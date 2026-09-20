import React from 'react';
import { Megaphone, FileText, Info, ExternalLink } from 'lucide-react';

export default function AnnouncementsWidget({ onNavigate = () => {} }) {
  const items = [
    {
      id: 1,
      title: 'Ward Maintenance Drive',
      date: '18 Sept 2026',
      desc: 'Scheduled maintenance in Ward 5 this weekend.',
      icon: Megaphone,
      iconBg: 'bg-amber-100 text-amber-600',
    },
    {
      id: 2,
      title: 'New Mobile App Launched',
      date: '15 Sept 2026',
      desc: 'Access all services on the go!',
      icon: FileText,
      iconBg: 'bg-blue-100 text-[#1E6FD9]',
    },
    {
      id: 3,
      title: 'Water Supply Update',
      date: '12 Sept 2026',
      desc: 'Intermittent supply in select areas.',
      icon: Info,
      iconBg: 'bg-blue-100 text-[#1E6FD9]',
    },
  ];

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-3.5 shadow-2xs">
      {/* Header */}
      <div className="flex items-center justify-between gap-2 mb-2.5">
        <div className="flex items-center gap-1.5">
          <div className="w-5 h-5 rounded-full bg-blue-100 text-[#1E6FD9] flex items-center justify-center">
            <Megaphone className="w-3 h-3 text-[#1E6FD9]" />
          </div>
          <h3 className="text-xs font-bold text-[#0F2C59] tracking-tight">
            Recent Announcements
          </h3>
        </div>

        <button
          onClick={() => onNavigate('Announcements')}
          className="text-[11px] font-bold text-[#1E6FD9] hover:underline flex items-center gap-0.5 cursor-pointer"
        >
          <span>View All</span>
          <ExternalLink className="w-3 h-3" />
        </button>
      </div>

      {/* 3 Announcement items */}
      <div className="space-y-2.5">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.id}
              onClick={() => onNavigate('Announcements')}
              className="flex items-start gap-2.5 p-1.5 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer group"
            >
              <div className={`w-7 h-7 rounded-lg ${item.iconBg} flex items-center justify-center shrink-0 mt-0.5`}>
                <Icon className="w-3.5 h-3.5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline justify-between gap-1">
                  <h4 className="text-xs font-bold text-slate-900 truncate group-hover:text-blue-700">
                    {item.title}
                  </h4>
                  <span className="text-[10px] text-slate-400 shrink-0 font-medium">
                    {item.date}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 leading-tight truncate mt-0.5">
                  {item.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
