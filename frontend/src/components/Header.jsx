import React, { useState, useRef, useEffect } from 'react';
import { 
  Search, 
  Bell, 
  ChevronDown, 
  User, 
  Menu, 
  X,
  AlertTriangle,
  Clock
} from 'lucide-react';

export default function Header({ 
  activeNav = 'Dashboard', 
  onNavigate = () => {}, 
  useMock = false, 
  onToggleMock = () => {},
  searchQuery = '',
  onSearchChange = () => {},
  onSearchSubmit = () => {}
}) {
  const [profileOpen, setProfileOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const profileRef = useRef(null);
  const notifRef = useRef(null);

  const navItems = [
    { name: 'Home', view: 'Dashboard' },
    { name: 'File Complaint', view: 'FileComplaint' },
    { name: 'Track Complaint', view: 'TrackComplaint' },
    { name: 'Services', view: 'Services' },
    { name: 'Dashboard', view: 'Dashboard' },
    { name: 'About', view: 'About' },
  ];

  useEffect(() => {
    function handleClickOutside(event) {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setNotifOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      onSearchSubmit(searchQuery);
    }
  };

  // Only highlight 'Home' when on Dashboard/Home
  const isItemActive = (itemName) => {
    if (activeNav === 'Dashboard' || activeNav === 'Home') {
      return itemName === 'Home';
    }
    return activeNav === itemName || 
      (itemName === 'File Complaint' && activeNav === 'FileComplaint') || 
      (itemName === 'Track Complaint' && activeNav === 'TrackComplaint');
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200/90 shadow-2xs">
      <div className="w-full px-5 sm:px-7 lg:px-8">
        <div className="h-[76px] flex items-center justify-between gap-5">
          
          {/* Left: Indian State Emblem + Municipal Citizen Grievance Portal */}
          <div className="flex items-center gap-3.5 shrink-0">
            {/* National Emblem Image */}
            <div className="flex items-center justify-center shrink-0">
              <img 
                src="/demo/emblem.png" 
                alt="State Emblem of India" 
                className="h-13 w-auto object-contain"
              />
            </div>

            {/* Portal Title & Motto */}
            <button 
              onClick={() => onNavigate('Dashboard')}
              className="text-left cursor-pointer focus:outline-hidden"
            >
              <h1 className="text-[17px] font-extrabold text-[#0F2C59] tracking-tight leading-[1.15]">
                Municipal Citizen<br />Grievance Portal
              </h1>
              <p className="text-[11px] text-slate-500 font-medium tracking-tight mt-0.5">
                Your Voice <span className="text-slate-400 mx-0.5">•</span> Our Responsibility
              </p>
            </button>
          </div>

          {/* Center: Main Navigation */}
          <nav className="hidden lg:flex items-center space-x-8 xl:space-x-10">
            {navItems.map((item) => {
              const active = isItemActive(item.name);
              return (
                <button
                  key={item.name}
                  onClick={() => onNavigate(item.view)}
                  className={`text-[13.5px] font-semibold transition-colors py-2 relative cursor-pointer ${
                    active
                      ? 'text-[#2563EB] font-bold'
                      : 'text-slate-700 hover:text-slate-900'
                  }`}
                >
                  {item.name}
                  {active && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#2563EB] rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right: Search, Notifications, Profile */}
          <div className="flex items-center gap-3.5">
            
            {/* Search Input Box */}
            <div className="relative hidden md:block w-60 xl:w-72">
              <input
                type="text"
                placeholder="Search complaints, services..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                onKeyDown={handleKeyDown}
                className="w-full pl-9 pr-3.5 py-2 text-xs bg-slate-50/90 border border-slate-200 rounded-lg focus:bg-white focus:outline-hidden focus:ring-1.5 focus:ring-blue-500 text-slate-800 placeholder-slate-400 transition-all"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            {/* Notification Bell with Red Badge */}
            <div className="relative" ref={notifRef}>
              <button
                onClick={() => setNotifOpen(!notifOpen)}
                className="relative p-2 text-slate-700 hover:text-slate-900 rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
                aria-label="Notifications"
              >
                <Bell className="w-4 h-4 text-slate-700 fill-slate-700" />
                <span className="absolute top-1 right-1 w-4 h-4 bg-red-600 text-white text-[9px] font-bold rounded-full flex items-center justify-center border-2 border-white">
                  3
                </span>
              </button>

              {/* Notification Dropdown */}
              {notifOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg border border-slate-200 shadow-lg py-2 z-50">
                  <div className="px-4 py-2 border-b border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-800">Operational Alerts</span>
                    <span className="text-[10px] bg-red-100 text-red-700 font-semibold px-1.5 py-0.5 rounded">3 New</span>
                  </div>
                  <div className="divide-y divide-slate-100 max-h-64 overflow-y-auto text-xs">
                    <div className="p-3 hover:bg-slate-50 cursor-pointer">
                      <div className="flex items-start gap-2">
                        <AlertTriangle className="w-3.5 h-3.5 text-red-600 shrink-0 mt-0.5" />
                        <div>
                          <p className="font-semibold text-slate-800">New High Priority Incident</p>
                          <p className="text-[11px] text-slate-500">Pothole on MG Road exceeds 70 priority threshold.</p>
                          <span className="text-[10px] text-slate-400">10 mins ago</span>
                        </div>
                      </div>
                    </div>
                    <div className="p-3 hover:bg-slate-50 cursor-pointer">
                      <div className="flex items-start gap-2">
                        <Clock className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                        <div>
                          <p className="font-semibold text-slate-800">SLA Pending: Water Leak</p>
                          <p className="text-[11px] text-slate-500">Ward 8 fire hydrant leak assigned to field team.</p>
                          <span className="text-[10px] text-slate-400">45 mins ago</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* User Profile: Kunal Deshmukh (Officer) */}
            <div className="relative" ref={profileRef}>
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-2 pl-2 pr-1 py-1 rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <div className="w-8 h-8 rounded-full bg-[#0F2C59] text-white flex items-center justify-center shrink-0 shadow-2xs">
                  <User className="w-4 h-4 text-white" />
                </div>
                <div className="hidden sm:flex flex-col text-left">
                  <span className="text-xs font-bold text-slate-800 leading-tight">
                    Kunal Deshmukh
                  </span>
                  <span className="text-[10px] text-slate-500 font-medium">
                    Officer
                  </span>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {/* Profile Dropdown */}
              {profileOpen && (
                <div className="absolute right-0 mt-2 w-60 bg-white rounded-lg border border-slate-200 shadow-lg py-2 z-50">
                  <div className="px-4 py-2.5 border-b border-slate-100">
                    <p className="text-xs font-bold text-slate-900">Kunal Deshmukh</p>
                    <p className="text-[11px] text-blue-600 font-medium">Operations Officer • Census AI</p>
                  </div>
                  <div className="px-2 py-1 text-xs">
                    <div className="px-3 py-1.5 flex items-center justify-between text-slate-600">
                      <span>Data Source:</span>
                      <button 
                        onClick={onToggleMock}
                        className={`text-[11px] font-bold px-2 py-0.5 rounded ${useMock ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'}`}
                      >
                        {useMock ? 'Demo Data' : 'Live API'}
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Menu */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-600 hover:text-slate-900 rounded-md hover:bg-slate-100"
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-2 pb-4 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.name}
              onClick={() => {
                onNavigate(item.view);
                setMobileMenuOpen(false);
              }}
              className={`w-full text-left px-3 py-2 rounded-md text-xs font-semibold ${
                activeNav === item.view
                  ? 'bg-blue-50 text-blue-700 font-bold'
                  : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              {item.name}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}
