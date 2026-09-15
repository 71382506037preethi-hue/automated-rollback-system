import React, { useState } from 'react';
import { useSystem } from '../context/SystemContext';
import { 
  ShieldCheck, 
  Terminal, 
  History, 
  Workflow, 
  Layers, 
  Menu, 
  X, 
  BookOpen,
  Activity,
  RotateCcw, 
  User, 
  LogOut, 
  Sparkles, 
  GraduationCap,
  Shield,
  FileText,
  Users,
  Award,
  ClipboardList,
  AlertTriangle,
  Flame,
  UserCheck,
  ChevronDown
} from 'lucide-react';
import { ActivePage } from '../types';

export const Navbar: React.FC = () => {
  const { 
    activePage, 
    setActivePage, 
    currentUser, 
    role,
    logoutUser, 
    systemStatus, 
    currentVersion,
    triggerDeploymentFailureSimulation,
    isSimulating
  } = useSystem();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [adminDropdownOpen, setAdminDropdownOpen] = useState(false);

  const handleNavClick = (pageId: ActivePage) => {
    setActivePage(pageId);
    setMobileMenuOpen(false);
    setAdminDropdownOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-xl border-b border-pink-100/70 shadow-xs relative">
      {/* Delicate iridescent rainbow top accent line */}
      <div className="h-[2.5px] w-full bg-gradient-to-r from-pink-300 via-purple-300 via-sky-300 to-teal-200 opacity-90" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Brand: Shield + Graduation Cap + Rainbow/Iridescent Accent */}
          <div 
            id="brand-logo-container"
            onClick={() => handleNavClick(role === 'admin' ? 'admin_dashboard' : 'landing')}
            className="flex items-center gap-3 cursor-pointer group select-none flex-shrink-0"
          >
            <div className="relative">
              {/* Soft iridescent glow behind logo */}
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-pink-400 via-purple-400 to-sky-400 opacity-40 blur-xs group-hover:opacity-75 transition-opacity" />
              
              <div className="relative w-10 h-10 rounded-2xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-pink-500 flex items-center justify-center shadow-sm text-white group-hover:scale-105 transition-transform">
                <div className="relative flex items-center justify-center">
                  <Shield className="w-5 h-5 text-white/90" />
                  <GraduationCap className="w-3.5 h-3.5 text-yellow-200 absolute -top-1 -right-1 drop-shadow-xs" />
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-lg font-bold tracking-tight text-slate-800 font-sans">
                  Exam<span className="bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 bg-clip-text text-transparent font-extrabold">Safe</span>
                </span>
                
                {role === 'admin' ? (
                  <span className="inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded-full bg-gradient-to-r from-indigo-50 to-purple-100 text-indigo-800 border border-indigo-200 font-bold shadow-2xs">
                    <ShieldCheck className="w-2.5 h-2.5 text-indigo-600" />
                    <span>Admin Control</span>
                  </span>
                ) : role === 'student' ? (
                  <span className="inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded-full bg-gradient-to-r from-pink-50 to-purple-50 text-purple-700 border border-purple-200 font-semibold shadow-2xs">
                    <Sparkles className="w-2.5 h-2.5 text-pink-500" />
                    <span>Student Portal</span>
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded-full bg-gradient-to-r from-pink-50 to-purple-50 text-purple-700 border border-purple-200 font-semibold shadow-2xs">
                    <Sparkles className="w-2.5 h-2.5 text-pink-500" />
                    <span>Study Campus</span>
                  </span>
                )}
              </div>
              <p className="text-[10px] text-slate-500 leading-none hidden sm:block">
                DevOps-Based Examination Reliability System
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links based on role */}
          <nav aria-label="Main Navigation" className="hidden lg:flex items-center space-x-1">
            
            {/* 1. If not logged in */}
            {!currentUser && (
              <>
                <button
                  id="nav-link-home"
                  onClick={() => handleNavClick('landing')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                    activePage === 'landing'
                      ? 'bg-purple-100/80 text-purple-800 font-bold shadow-2xs'
                      : 'text-slate-600 hover:text-purple-700 hover:bg-pink-50/60'
                  }`}
                >
                  Home
                </button>

                <button
                  id="nav-link-how-it-works"
                  onClick={() => handleNavClick('how_it_works')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                    activePage === 'how_it_works'
                      ? 'bg-purple-100/80 text-purple-800 font-bold shadow-2xs'
                      : 'text-slate-600 hover:text-purple-700 hover:bg-pink-50/60'
                  }`}
                >
                  <Workflow className="w-3.5 h-3.5 text-purple-500" />
                  <span>How It Works</span>
                </button>

                <button
                  id="nav-link-architecture"
                  onClick={() => handleNavClick('architecture')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                    activePage === 'architecture'
                      ? 'bg-purple-100/80 text-purple-800 font-bold shadow-2xs'
                      : 'text-slate-600 hover:text-purple-700 hover:bg-pink-50/60'
                  }`}
                >
                  <Layers className="w-3.5 h-3.5 text-sky-500" />
                  <span>Architecture</span>
                </button>

                <button
                  id="nav-link-recovery-public"
                  onClick={() => handleNavClick('recovery')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                    activePage === 'recovery'
                      ? 'bg-purple-100/80 text-purple-800 font-bold shadow-2xs'
                      : 'text-slate-600 hover:text-purple-700 hover:bg-pink-50/60'
                  }`}
                >
                  <RotateCcw className="w-3.5 h-3.5 text-pink-500" />
                  <span>System Recovery</span>
                </button>
              </>
            )}

            {/* 2. If Logged In as STUDENT */}
            {currentUser && role === 'student' && (
              <>
                <button
                  id="nav-student-home"
                  onClick={() => handleNavClick('landing')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                    activePage === 'landing'
                      ? 'bg-purple-100/80 text-purple-800 font-bold shadow-2xs'
                      : 'text-slate-600 hover:text-purple-700 hover:bg-pink-50/60'
                  }`}
                >
                  Home
                </button>

                <button
                  id="nav-student-my-exams"
                  onClick={() => handleNavClick('dashboard')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                    activePage === 'dashboard' || activePage === 'exam' || activePage === 'student_results'
                      ? 'bg-purple-100/80 text-purple-800 font-bold shadow-2xs'
                      : 'text-slate-600 hover:text-purple-700 hover:bg-pink-50/60'
                  }`}
                >
                  <BookOpen className="w-3.5 h-3.5 text-sky-500" />
                  <span>My Exams</span>
                </button>

                <button
                  id="nav-student-profile"
                  onClick={() => handleNavClick('profile')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                    activePage === 'profile'
                      ? 'bg-purple-100/80 text-purple-800 font-bold shadow-2xs'
                      : 'text-slate-600 hover:text-purple-700 hover:bg-pink-50/60'
                  }`}
                >
                  <User className="w-3.5 h-3.5 text-pink-500" />
                  <span>Profile</span>
                </button>

                <button
                  id="nav-student-how-it-works"
                  onClick={() => handleNavClick('how_it_works')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                    activePage === 'how_it_works'
                      ? 'bg-purple-100/80 text-purple-800 font-bold shadow-2xs'
                      : 'text-slate-600 hover:text-purple-700 hover:bg-pink-50/60'
                  }`}
                >
                  <Workflow className="w-3.5 h-3.5 text-purple-500" />
                  <span>How It Works</span>
                </button>

                <button
                  id="nav-student-recovery"
                  onClick={() => handleNavClick('recovery')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                    activePage === 'recovery'
                      ? 'bg-purple-100/80 text-purple-800 font-bold shadow-2xs'
                      : 'text-slate-600 hover:text-purple-700 hover:bg-pink-50/60'
                  }`}
                >
                  <RotateCcw className="w-3.5 h-3.5 text-pink-500" />
                  <span>System Recovery</span>
                </button>
              </>
            )}

            {/* 3. If Logged In as ADMIN */}
            {currentUser && role === 'admin' && (
              <>
                <button
                  id="nav-admin-dashboard"
                  onClick={() => handleNavClick('admin_dashboard')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                    activePage === 'admin_dashboard'
                      ? 'bg-indigo-100/90 text-indigo-900 font-bold shadow-2xs'
                      : 'text-slate-600 hover:text-indigo-700 hover:bg-indigo-50/60'
                  }`}
                >
                  <Activity className="w-3.5 h-3.5 text-indigo-600" />
                  <span>Dashboard</span>
                </button>

                <button
                  id="nav-admin-exams"
                  onClick={() => handleNavClick('admin_exams')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                    activePage === 'admin_exams'
                      ? 'bg-indigo-100/90 text-indigo-900 font-bold shadow-2xs'
                      : 'text-slate-600 hover:text-indigo-700 hover:bg-indigo-50/60'
                  }`}
                >
                  <FileText className="w-3.5 h-3.5 text-purple-500" />
                  <span>Exams</span>
                </button>

                <button
                  id="nav-admin-students"
                  onClick={() => handleNavClick('admin_enrollments')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                    activePage === 'admin_enrollments'
                      ? 'bg-indigo-100/90 text-indigo-900 font-bold shadow-2xs'
                      : 'text-slate-600 hover:text-indigo-700 hover:bg-indigo-50/60'
                  }`}
                >
                  <Users className="w-3.5 h-3.5 text-teal-600" />
                  <span>Students & Enrollments</span>
                </button>

                <button
                  id="nav-admin-monitoring"
                  onClick={() => handleNavClick('admin_monitoring')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                    activePage === 'admin_monitoring'
                      ? 'bg-indigo-100/90 text-indigo-900 font-bold shadow-2xs'
                      : 'text-slate-600 hover:text-indigo-700 hover:bg-indigo-50/60'
                  }`}
                >
                  <Terminal className="w-3.5 h-3.5 text-indigo-600" />
                  <span>Monitoring</span>
                </button>

                <button
                  id="nav-admin-recovery"
                  onClick={() => handleNavClick('recovery')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                    activePage === 'recovery'
                      ? 'bg-indigo-100/90 text-indigo-900 font-bold shadow-2xs'
                      : 'text-slate-600 hover:text-indigo-700 hover:bg-indigo-50/60'
                  }`}
                >
                  <RotateCcw className="w-3.5 h-3.5 text-pink-500" />
                  <span>Recovery</span>
                </button>

                {/* More Admin tools dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setAdminDropdownOpen(!adminDropdownOpen)}
                    className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-semibold text-slate-600 hover:text-indigo-700 hover:bg-indigo-50/60 transition-colors"
                  >
                    <span>More</span>
                    <ChevronDown className="w-3 h-3 text-slate-400" />
                  </button>

                  {adminDropdownOpen && (
                    <div className="absolute top-full left-0 mt-1 w-48 rounded-2xl bg-white shadow-xl border border-purple-100 py-1.5 z-50 animate-in fade-in slide-in-from-top-1">
                      <button
                        onClick={() => handleNavClick('rollback_history')}
                        className="w-full text-left px-3.5 py-2 text-xs font-medium text-slate-700 hover:bg-purple-50 flex items-center gap-2"
                      >
                        <History className="w-3.5 h-3.5 text-teal-500" />
                        <span>Rollback History</span>
                      </button>
                      <button
                        onClick={() => handleNavClick('admin_audit_logs')}
                        className="w-full text-left px-3.5 py-2 text-xs font-medium text-slate-700 hover:bg-purple-50 flex items-center gap-2"
                      >
                        <ClipboardList className="w-3.5 h-3.5 text-indigo-500" />
                        <span>Audit Logs</span>
                      </button>
                      <button
                        onClick={() => handleNavClick('admin_results')}
                        className="w-full text-left px-3.5 py-2 text-xs font-medium text-slate-700 hover:bg-purple-50 flex items-center gap-2"
                      >
                        <Award className="w-3.5 h-3.5 text-amber-500" />
                        <span>Results</span>
                      </button>
                      <button
                        onClick={() => handleNavClick('architecture')}
                        className="w-full text-left px-3.5 py-2 text-xs font-medium text-slate-700 hover:bg-purple-50 flex items-center gap-2"
                      >
                        <Layers className="w-3.5 h-3.5 text-sky-500" />
                        <span>Architecture</span>
                      </button>
                    </div>
                  )}
                </div>
              </>
            )}

          </nav>

          {/* Right side status pill & user controls */}
          <div className="hidden sm:flex items-center gap-2.5">
            {/* Quick system status pill */}
            <div 
              id="nav-system-status-indicator"
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-white/90 border border-purple-100 text-xs font-mono shadow-2xs"
            >
              <span className={`w-2 h-2 rounded-full ${
                systemStatus === 'healthy' ? 'bg-emerald-400' : 
                systemStatus === 'recovered' ? 'bg-teal-400' :
                systemStatus === 'rolling_back' ? 'bg-purple-400 animate-spin' : 'bg-rose-400 animate-pulse'
              }`} />
              <span className="text-slate-500 text-[11px]">v{currentVersion}:</span>
              <span className={`font-semibold ${
                systemStatus === 'healthy' ? 'text-emerald-700' : 
                systemStatus === 'recovered' ? 'text-teal-700' :
                systemStatus === 'rolling_back' ? 'text-purple-700' : 'text-rose-700'
              }`}>
                {systemStatus === 'healthy' && 'Healthy'}
                {systemStatus === 'recovered' && 'Restored'}
                {systemStatus === 'rolling_back' && 'Rolling Back...'}
                {systemStatus === 'critical' && 'Degraded'}
              </span>
            </div>

            {/* Simulate failure trigger button for quick testing */}
            <button
              onClick={triggerDeploymentFailureSimulation}
              disabled={isSimulating}
              title="Simulate system failure to observe automated rollback"
              className="px-2.5 py-1 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-xs font-semibold flex items-center gap-1 transition-colors"
            >
              <Flame className="w-3 h-3 text-rose-500" />
              <span className="hidden xl:inline">Failover Test</span>
            </button>

            {currentUser ? (
              <div className="flex items-center gap-2 pl-2 border-l border-pink-200/60">
                <button
                  id="nav-user-profile-btn"
                  onClick={() => handleNavClick(role === 'admin' ? 'admin_profile' : 'profile')}
                  className="flex items-center gap-2 px-2.5 py-1 rounded-xl hover:bg-purple-50/80 border border-transparent hover:border-purple-200 transition-colors text-left"
                >
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-white text-xs font-bold shadow-2xs ${
                    role === 'admin'
                      ? 'bg-gradient-to-tr from-indigo-500 to-purple-600'
                      : 'bg-gradient-to-tr from-pink-400 via-purple-500 to-indigo-500'
                  }`}>
                    {currentUser.fullName.charAt(0)}
                  </div>
                  <div className="text-left leading-tight hidden xl:block">
                    <span className="text-xs font-bold text-slate-800 block">
                      {currentUser.fullName}
                    </span>
                    <span className="text-[10px] text-purple-600 font-mono block">
                      {role === 'admin' ? 'Administrator' : (currentUser as any).studentId}
                    </span>
                  </div>
                </button>

                <button
                  id="nav-logout-btn"
                  onClick={logoutUser}
                  className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                  title="Log out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  id="nav-login-btn"
                  onClick={() => handleNavClick('login')}
                  className="px-3.5 py-1.5 rounded-xl text-xs font-bold text-purple-700 hover:bg-purple-50 transition-colors"
                >
                  Login
                </button>
                <button
                  id="nav-register-btn"
                  onClick={() => handleNavClick('register')}
                  className="px-3.5 py-1.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 shadow-2xs transition-all"
                >
                  Create Account
                </button>
              </div>
            )}
          </div>

          {/* Mobile hamburger button */}
          <div className="flex items-center lg:hidden">
            <button
              id="nav-mobile-menu-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-600 hover:text-purple-700 hover:bg-purple-50 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white/95 backdrop-blur-xl border-b border-pink-200/70 px-4 pt-2 pb-4 space-y-1 shadow-lg">
          {!currentUser ? (
            <>
              <button
                onClick={() => handleNavClick('landing')}
                className="w-full text-left px-3 py-2 rounded-xl text-xs font-bold text-slate-700 hover:bg-purple-50"
              >
                Home
              </button>
              <button
                onClick={() => handleNavClick('how_it_works')}
                className="w-full text-left px-3 py-2 rounded-xl text-xs font-bold text-slate-700 hover:bg-purple-50"
              >
                How It Works
              </button>
              <button
                onClick={() => handleNavClick('architecture')}
                className="w-full text-left px-3 py-2 rounded-xl text-xs font-bold text-slate-700 hover:bg-purple-50"
              >
                Architecture
              </button>
              <button
                onClick={() => handleNavClick('recovery')}
                className="w-full text-left px-3 py-2 rounded-xl text-xs font-bold text-slate-700 hover:bg-purple-50"
              >
                System Recovery
              </button>
            </>
          ) : role === 'student' ? (
            <>
              <button
                onClick={() => handleNavClick('landing')}
                className="w-full text-left px-3 py-2 rounded-xl text-xs font-bold text-slate-700 hover:bg-purple-50"
              >
                Home
              </button>
              <button
                onClick={() => handleNavClick('dashboard')}
                className="w-full text-left px-3 py-2 rounded-xl text-xs font-bold text-slate-700 hover:bg-purple-50 flex items-center gap-2"
              >
                <BookOpen className="w-3.5 h-3.5 text-sky-500" />
                <span>My Exams</span>
              </button>
              <button
                onClick={() => handleNavClick('profile')}
                className="w-full text-left px-3 py-2 rounded-xl text-xs font-bold text-slate-700 hover:bg-purple-50 flex items-center gap-2"
              >
                <User className="w-3.5 h-3.5 text-pink-500" />
                <span>Profile</span>
              </button>
              <button
                onClick={() => handleNavClick('how_it_works')}
                className="w-full text-left px-3 py-2 rounded-xl text-xs font-bold text-slate-700 hover:bg-purple-50 flex items-center gap-2"
              >
                <Workflow className="w-3.5 h-3.5 text-purple-500" />
                <span>How It Works</span>
              </button>
              <button
                onClick={() => handleNavClick('recovery')}
                className="w-full text-left px-3 py-2 rounded-xl text-xs font-bold text-slate-700 hover:bg-purple-50 flex items-center gap-2"
              >
                <RotateCcw className="w-3.5 h-3.5 text-pink-500" />
                <span>System Recovery</span>
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => handleNavClick('admin_dashboard')}
                className="w-full text-left px-3 py-2 rounded-xl text-xs font-bold text-slate-700 hover:bg-indigo-50 flex items-center gap-2"
              >
                <Activity className="w-3.5 h-3.5 text-indigo-600" />
                <span>Dashboard</span>
              </button>
              <button
                onClick={() => handleNavClick('admin_exams')}
                className="w-full text-left px-3 py-2 rounded-xl text-xs font-bold text-slate-700 hover:bg-indigo-50 flex items-center gap-2"
              >
                <FileText className="w-3.5 h-3.5 text-purple-500" />
                <span>Exams</span>
              </button>
              <button
                onClick={() => handleNavClick('admin_enrollments')}
                className="w-full text-left px-3 py-2 rounded-xl text-xs font-bold text-slate-700 hover:bg-indigo-50 flex items-center gap-2"
              >
                <Users className="w-3.5 h-3.5 text-teal-600" />
                <span>Students & Enrollments</span>
              </button>
              <button
                onClick={() => handleNavClick('admin_monitoring')}
                className="w-full text-left px-3 py-2 rounded-xl text-xs font-bold text-slate-700 hover:bg-indigo-50 flex items-center gap-2"
              >
                <Terminal className="w-3.5 h-3.5 text-indigo-600" />
                <span>Monitoring</span>
              </button>
              <button
                onClick={() => handleNavClick('recovery')}
                className="w-full text-left px-3 py-2 rounded-xl text-xs font-bold text-slate-700 hover:bg-indigo-50 flex items-center gap-2"
              >
                <RotateCcw className="w-3.5 h-3.5 text-pink-500" />
                <span>System Recovery</span>
              </button>
              <button
                onClick={() => handleNavClick('rollback_history')}
                className="w-full text-left px-3 py-2 rounded-xl text-xs font-bold text-slate-700 hover:bg-indigo-50 flex items-center gap-2"
              >
                <History className="w-3.5 h-3.5 text-teal-500" />
                <span>Rollback History</span>
              </button>
              <button
                onClick={() => handleNavClick('admin_audit_logs')}
                className="w-full text-left px-3 py-2 rounded-xl text-xs font-bold text-slate-700 hover:bg-indigo-50 flex items-center gap-2"
              >
                <ClipboardList className="w-3.5 h-3.5 text-indigo-500" />
                <span>Audit Logs</span>
              </button>
              <button
                onClick={() => handleNavClick('admin_results')}
                className="w-full text-left px-3 py-2 rounded-xl text-xs font-bold text-slate-700 hover:bg-indigo-50 flex items-center gap-2"
              >
                <Award className="w-3.5 h-3.5 text-amber-500" />
                <span>Results</span>
              </button>
              <button
                onClick={() => handleNavClick('admin_profile')}
                className="w-full text-left px-3 py-2 rounded-xl text-xs font-bold text-slate-700 hover:bg-indigo-50 flex items-center gap-2"
              >
                <User className="w-3.5 h-3.5 text-pink-500" />
                <span>Profile</span>
              </button>
            </>
          )}

          {currentUser ? (
            <div className="pt-3 mt-2 border-t border-purple-100 flex items-center justify-between">
              <div className="text-xs">
                <span className="font-bold text-slate-800 block">{currentUser.fullName}</span>
                <span className="text-[10px] text-purple-600 font-mono">
                  {role === 'admin' ? 'Administrator' : (currentUser as any).studentId}
                </span>
              </div>
              <button
                onClick={logoutUser}
                className="px-3 py-1 rounded-xl text-xs font-bold text-rose-600 bg-rose-50 hover:bg-rose-100"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="pt-3 mt-2 border-t border-purple-100 flex items-center gap-2">
              <button
                onClick={() => handleNavClick('login')}
                className="w-1/2 py-2 text-center rounded-xl text-xs font-bold text-purple-700 bg-purple-50"
              >
                Login
              </button>
              <button
                onClick={() => handleNavClick('register')}
                className="w-1/2 py-2 text-center rounded-xl text-xs font-bold text-white bg-gradient-to-r from-pink-500 to-purple-600"
              >
                Create Account
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
};
