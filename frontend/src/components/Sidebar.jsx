import React from 'react';
import { 
  Home,
  PlusCircle, 
  Search, 
  FileText, 
  LayoutGrid, 
  Star, 
  BarChart2, 
  Megaphone, 
  HelpCircle,
} from 'lucide-react';

export default function Sidebar({ activeNav = 'Dashboard', onNavigate = () => {} }) {
  const sidebarItems = [
    { id: 'Dashboard',      label: 'Dashboard',           icon: Home },
    { id: 'FileComplaint',  label: 'File a Complaint',    icon: PlusCircle },
    { id: 'TrackComplaint', label: 'Track Complaint',     icon: Search },
    { id: 'MyComplaints',   label: 'My Complaints',       icon: FileText },
    { id: 'Services',       label: 'Services',            icon: LayoutGrid },
    { id: 'Feedback',       label: 'Citizen Feedback',    icon: Star },
    { id: 'Analytics',      label: 'Reports & Analytics', icon: BarChart2 },
    { id: 'Announcements',  label: 'Announcements',       icon: Megaphone },
    { id: 'Help',           label: 'Help & Support',      icon: HelpCircle },
  ];

  return (
    <aside className="w-[220px] xl:w-[232px] bg-white border-r border-slate-200 shrink-0 flex flex-col justify-between sticky top-[76px] h-[calc(100vh-76px)] z-20 overflow-hidden">
      {/* Top Navigation List */}
      <nav className="space-y-1.5 p-3 pb-2 overflow-y-auto">
        {sidebarItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            activeNav === item.id ||
            (item.id === 'Dashboard' && (activeNav === 'Home' || activeNav === 'Dashboard'));

          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-[13px] font-medium transition-all text-left cursor-pointer ${
                isActive
                  ? 'bg-[#2D7FF9] text-white font-semibold shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <Icon className={`w-4.5 h-4.5 shrink-0 ${isActive ? 'text-white' : 'text-slate-500'}`} />
              <span className="truncate">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Bottom Civic Branding Area */}
      <div className="w-full shrink-0 mt-auto overflow-hidden">
        <img
          src="/demo/sidebar-branding.png"
          alt="My City My Responsibility"
          className="w-full h-auto object-cover block"
        />
      </div>
    </aside>
  );
}
