import React from 'react';
import HeroBanner from '../components/HeroBanner';
import SummaryCards from '../components/SummaryCards';
import ComplaintList from '../components/ComplaintList';
import Heatmap from '../components/Heatmap';
import QuickActions from '../components/QuickActions';
import AnnouncementsWidget from '../components/AnnouncementsWidget';

export default function DashboardPage({
  reports = [],
  loading = false,
  refreshing = false,
  error = null,
  onRefresh = () => {},
  useMock = false,
  onSwitchToMock = () => {},
  onNavigate = () => {},
  onViewDetails = () => {},
  onOpenEmergency = () => {},
  searchQuery = ''
}) {
  return (
    <div className="space-y-4.5">
      {/* 1. Civic Hero Campaign Banner */}
      <HeroBanner />

      {/* 2. Five Summary Cards Strip */}
      <SummaryCards reports={reports} />

      {/* 3. Main Two-Column Layout (70% Left / 30% Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        
        {/* Left Column: Citizen Complaints (approx 68% width -> 8 cols) */}
        <section className="lg:col-span-8">
          <ComplaintList
            reports={reports}
            loading={loading}
            refreshing={refreshing}
            error={error}
            onRefresh={onRefresh}
            useMock={useMock}
            onSwitchToMock={onSwitchToMock}
            onViewDetails={onViewDetails}
            searchQuery={searchQuery}
          />
        </section>

        {/* Right Column: Heatmap, Quick Actions, Announcements (approx 32% width -> 4 cols) */}
        <aside className="lg:col-span-4 space-y-4">
          <Heatmap />
          <QuickActions onNavigate={onNavigate} onOpenEmergency={onOpenEmergency} />
          <AnnouncementsWidget onNavigate={onNavigate} />
        </aside>

      </div>
    </div>
  );
}
