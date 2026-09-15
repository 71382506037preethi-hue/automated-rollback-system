import React from 'react';
import { SystemProvider, useSystem } from './context/SystemContext';
import { DemoBanner } from './components/DemoBanner';
import { Navbar } from './components/Navbar';
import { SimulationModal } from './components/SimulationModal';
import { LandingPage } from './pages/LandingPage';
import { RegisterPage } from './pages/RegisterPage';
import { LoginPage } from './pages/LoginPage';
import { StudentDashboardPage } from './pages/StudentDashboardPage';
import { StudentResultsPage } from './pages/StudentResultsPage';
import { ProfilePage } from './pages/ProfilePage';
import { ExamPage } from './pages/ExamPage';
import { SystemRecoveryPage } from './pages/SystemRecoveryPage';
import { DevOpsDashboard } from './pages/DevOpsDashboard';
import { RollbackHistoryPage } from './pages/RollbackHistoryPage';
import { AdminDashboard } from './pages/AdminDashboard';
import { AdminExamsPage } from './pages/AdminExamsPage';
import { AdminEnrollmentPage } from './pages/AdminEnrollmentPage';
import { AdminMonitoringPage } from './pages/AdminMonitoringPage';
import { AdminResultsPage } from './pages/AdminResultsPage';
import { AdminAuditLogsPage } from './pages/AdminAuditLogsPage';
import { HowItWorksPage } from './pages/HowItWorksPage';
import { ArchitecturePage } from './pages/ArchitecturePage';
import { AboutPage } from './pages/AboutPage';
import { ShieldCheck, Info, X, Sparkles } from 'lucide-react';

const MainAppContent: React.FC = () => {
  const { activePage, toastMessage, clearToast, setActivePage } = useSystem();

  const renderActivePage = () => {
    switch (activePage) {
      case 'landing':
        return <LandingPage />;
      case 'register':
        return <RegisterPage />;
      case 'login':
        return <LoginPage />;
      case 'dashboard':
        return <StudentDashboardPage />;
      case 'student_results':
        return <StudentResultsPage />;
      case 'profile':
      case 'admin_profile':
        return <ProfilePage />;
      case 'exam':
        return <ExamPage />;
      case 'recovery':
        return <SystemRecoveryPage />;
      case 'devops':
        return <DevOpsDashboard />;
      case 'rollback_history':
        return <RollbackHistoryPage />;
      case 'admin':
      case 'admin_dashboard':
        return <AdminDashboard />;
      case 'admin_exams':
        return <AdminExamsPage />;
      case 'admin_enrollments':
        return <AdminEnrollmentPage />;
      case 'admin_monitoring':
        return <AdminMonitoringPage />;
      case 'admin_results':
        return <AdminResultsPage />;
      case 'admin_audit_logs':
        return <AdminAuditLogsPage />;
      case 'how_it_works':
        return <HowItWorksPage />;
      case 'architecture':
        return <ArchitecturePage />;
      case 'about':
        return <AboutPage />;
      default:
        return <LandingPage />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFF5F9] via-[#FAF5FF] to-[#F0F8FF] text-slate-800 flex flex-col font-sans selection:bg-purple-200 selection:text-purple-900">
      
      {/* Top Academic Demo Banner */}
      <DemoBanner />

      {/* Sticky Main Navigation */}
      <Navbar />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-4 right-4 z-50 max-w-sm p-3.5 rounded-2xl bg-white/95 backdrop-blur-xl border border-pink-200 text-slate-800 shadow-xl flex items-center justify-between gap-3 text-xs animate-in fade-in slide-in-from-bottom-2">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-purple-600 animate-pulse flex-shrink-0" />
            <p className="font-medium text-slate-700 leading-snug">{toastMessage}</p>
          </div>
          <button
            onClick={clearToast}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
            title="Dismiss notification"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Main Page Body */}
      <main className="flex-1">
        {renderActivePage()}
      </main>

      {/* Global failure & automated rollback simulation modal (10 steps) */}
      <SimulationModal />

      {/* Pastel Unicorn Footer */}
      <footer className="border-t border-pink-100 bg-white/80 backdrop-blur-md text-xs text-slate-500 py-8 px-4 sm:px-6 lg:px-8 mt-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-purple-500 to-pink-500 flex items-center justify-center text-white shadow-xs">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="font-extrabold text-slate-900 text-sm flex items-center gap-1.5">
                <span>ExamSafe</span>
                <span className="text-slate-400 font-normal">•</span>
                <span className="text-purple-600 font-medium">DevOps Examination Reliability</span>
              </div>
              <p className="text-[11px] text-slate-500">
                Automated Blue/Green & Canary Rollback Engine with Zero Student Data Loss
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs flex-wrap justify-center font-medium">
            <span className="px-2.5 py-1 rounded-full bg-purple-50 border border-purple-200 text-purple-700 font-mono text-[11px]">
              Final Year Engineering Project
            </span>
            <button
              onClick={() => setActivePage('about')}
              className="text-slate-600 hover:text-purple-600 hover:underline transition-colors"
            >
              Viva Defense Guide
            </button>
            <button
              onClick={() => setActivePage('architecture')}
              className="text-slate-600 hover:text-purple-600 hover:underline transition-colors"
            >
              System Architecture
            </button>
            <button
              onClick={() => setActivePage('recovery')}
              className="text-slate-600 hover:text-purple-600 hover:underline transition-colors"
            >
              System Recovery
            </button>
            <button
              onClick={() => setActivePage('devops')}
              className="text-slate-600 hover:text-purple-600 hover:underline transition-colors"
            >
              DevOps Monitor
            </button>
            <button
              onClick={() => setActivePage('rollback_history')}
              className="text-slate-600 hover:text-purple-600 hover:underline transition-colors"
            >
              Rollback History
            </button>
          </div>

        </div>
      </footer>

    </div>
  );
};

export default function App() {
  return (
    <SystemProvider>
      <MainAppContent />
    </SystemProvider>
  );
}
