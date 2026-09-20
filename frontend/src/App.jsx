import React, { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import ComplaintDetailModal from './components/ComplaintDetailModal';
import EmergencyModal from './components/EmergencyModal';

// Pages
import DashboardPage from './pages/DashboardPage';
import FileComplaintPage from './pages/FileComplaintPage';
import TrackComplaintPage from './pages/TrackComplaintPage';
import MyComplaintsPage from './pages/MyComplaintsPage';
import ServicesPage from './pages/ServicesPage';
import FeedbackPage from './pages/FeedbackPage';
import AnalyticsPage from './pages/AnalyticsPage';
import AnnouncementsPage from './pages/AnnouncementsPage';
import HelpPage from './pages/HelpPage';
import AboutPage from './pages/AboutPage';

// API service
import { fetchReports, DEFAULT_USE_MOCK } from './services/api';

export default function App() {
  const [activeNav, setActiveNav] = useState('Dashboard');
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const [useMock, setUseMock] = useState(DEFAULT_USE_MOCK);
  
  // Modals & Sub-states
  const [selectedReport, setSelectedReport] = useState(null);
  const [emergencyOpen, setEmergencyOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [initialTrackingId, setInitialTrackingId] = useState('');

  // Fetch reports function
  const loadData = useCallback(async (isManual = false) => {
    if (isManual) {
      setRefreshing(true);
    } else {
      setLoading(true);
    }
    setError(null);

    const result = await fetchReports({ useMock });

    if (result.error) {
      setError(result.error);
      setReports([]);
    } else {
      setReports(result.data || []);
    }

    setLoading(false);
    setRefreshing(false);
  }, [useMock]);

  useEffect(() => {
    loadData(false);
  }, [loadData]);

  const handleReportCreated = (newReport) => {
    setReports((prev) => [newReport, ...prev]);
    loadData(false);
  };

  const handleNavigate = (view, extraParam = null) => {
    setActiveNav(view);
    if (view === 'TrackComplaint' && extraParam) {
      setInitialTrackingId(extraParam);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleToggleMock = () => {
    setUseMock((prev) => !prev);
  };

  const handleSwitchToMock = () => {
    setUseMock(true);
  };

  const handleSearchSubmit = (query) => {
    setSearchQuery(query);
    setActiveNav('Dashboard');
  };

  const renderActivePage = () => {
    switch (activeNav) {
      case 'Dashboard':
      case 'Home':
        return (
          <DashboardPage
            reports={reports}
            loading={loading}
            refreshing={refreshing}
            error={error}
            onRefresh={() => loadData(true)}
            useMock={useMock}
            onSwitchToMock={handleSwitchToMock}
            onNavigate={handleNavigate}
            onViewDetails={(report) => setSelectedReport(report)}
            onOpenEmergency={() => setEmergencyOpen(true)}
            searchQuery={searchQuery}
          />
        );

      case 'FileComplaint':
        return (
          <FileComplaintPage
            useMock={useMock}
            onNavigate={handleNavigate}
            onReportCreated={handleReportCreated}
          />
        );

      case 'TrackComplaint':
        return (
          <TrackComplaintPage
            useMock={useMock}
            reports={reports}
            onNavigate={handleNavigate}
            initialId={initialTrackingId}
          />
        );

      case 'MyComplaints':
        return (
          <MyComplaintsPage
            reports={reports}
            onNavigate={handleNavigate}
            onViewDetails={(report) => setSelectedReport(report)}
          />
        );

      case 'Services':
        return <ServicesPage onNavigate={handleNavigate} />;

      case 'Feedback':
        return <FeedbackPage reports={reports} onNavigate={handleNavigate} />;

      case 'Analytics':
        return <AnalyticsPage reports={reports} onNavigate={handleNavigate} />;

      case 'Announcements':
        return <AnnouncementsPage onNavigate={handleNavigate} />;

      case 'Help':
        return <HelpPage onNavigate={handleNavigate} />;

      case 'About':
        return <AboutPage onNavigate={handleNavigate} />;

      default:
        return (
          <DashboardPage
            reports={reports}
            loading={loading}
            refreshing={refreshing}
            error={error}
            onRefresh={() => loadData(true)}
            useMock={useMock}
            onSwitchToMock={handleSwitchToMock}
            onNavigate={handleNavigate}
            onViewDetails={(report) => setSelectedReport(report)}
            onOpenEmergency={() => setEmergencyOpen(true)}
            searchQuery={searchQuery}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#F3F6FA] text-slate-800 flex flex-col font-sans">
      
      {/* 1. Top Government Header */}
      <Header
        activeNav={activeNav}
        onNavigate={handleNavigate}
        useMock={useMock}
        onToggleMock={handleToggleMock}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onSearchSubmit={handleSearchSubmit}
      />

      {/* 2. Main Page Body: Left Sidebar + Main Content (Full screen width container) */}
      <div className="flex-1 flex w-full">
        {/* Left Sidebar */}
        <div className="hidden lg:block shrink-0">
          <Sidebar 
            activeNav={activeNav} 
            onNavigate={handleNavigate} 
          />
        </div>

        {/* Right Main Page View */}
        <main className="flex-1 min-w-0 p-4 sm:p-5 lg:p-6 overflow-x-hidden">
          {renderActivePage()}
        </main>
      </div>

      {/* 3. Official Government Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Detail Modal */}
      {selectedReport && (
        <ComplaintDetailModal
          report={selectedReport}
          onClose={() => setSelectedReport(null)}
        />
      )}

      {/* Emergency Modal */}
      <EmergencyModal
        isOpen={emergencyOpen}
        onClose={() => setEmergencyOpen(false)}
      />

    </div>
  );
}
