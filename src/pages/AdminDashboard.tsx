import React from 'react';
import { useSystem } from '../context/SystemContext';
import { 
  BarChart3, 
  Activity, 
  Server, 
  AlertTriangle, 
  CheckCircle2, 
  RotateCcw, 
  Flame, 
  Users, 
  ShieldAlert, 
  TrendingUp,
  FileText,
  KeyRound,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Award,
  Terminal,
  Clock
} from 'lucide-react';
import { AdminAccount } from '../types';

export const AdminDashboard: React.FC = () => {
  const { 
    currentUser,
    role,
    exams,
    enrolledStudents,
    allAttempts,
    systemStatus, 
    currentVersion, 
    previousStableVersion, 
    rollbackEvents,
    triggerDeploymentFailureSimulation,
    isSimulating,
    setActivePage,
    setActiveExamId
  } = useSystem();

  if (!currentUser || role !== 'admin') {
    return (
      <div className="max-w-md mx-auto my-16 text-center px-4">
        <div className="p-8 rounded-3xl bg-white/90 backdrop-blur-xl border border-pink-200 shadow-md">
          <p className="text-slate-700 mb-4 font-medium text-sm">Administration credentials required.</p>
          <button
            onClick={() => setActivePage('login')}
            className="px-5 py-2.5 rounded-2xl bg-indigo-600 text-white text-xs font-bold"
          >
            Go to Admin Login
          </button>
        </div>
      </div>
    );
  }

  const admin = currentUser as AdminAccount;

  // Real calculations
  const totalExams = exams.length;
  const activeExams = exams.filter((e) => e.status === 'active').length;
  const totalEnrolled = enrolledStudents.length;
  const inProgressAttempts = allAttempts.filter((a) => a.status === 'in_progress').length;
  const completedAttempts = allAttempts.filter((a) => a.status === 'submitted').length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-indigo-900 via-purple-900 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        {/* Ambient iridescent glows */}
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-pink-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs font-mono font-semibold text-purple-200 border border-white/10">
              <ShieldCheck className="w-3.5 h-3.5 text-pink-400" />
              <span>Campus Examination Control Board</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Welcome, {admin.fullName}
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl leading-relaxed">
              Examination orchestrator is running release <b className="text-pink-300 font-mono">{currentVersion}</b> with automated watchdog telemetry. All student answers and timers are protected.
            </p>

            <div className="flex items-center gap-3 pt-1 text-xs text-slate-400 font-mono">
              <span>Admin ID: {admin.adminId}</span>
              <span>•</span>
              <span>{admin.department}</span>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => setActivePage('admin_exams')}
              className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-lg shadow-purple-900/40 transition-all"
            >
              <FileText className="w-4 h-4" />
              <span>Create New Exam</span>
            </button>

            <button
              id="admin-simulate-btn"
              onClick={triggerDeploymentFailureSimulation}
              disabled={isSimulating}
              className="px-4 py-2.5 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-lg shadow-rose-900/40 transition-all"
            >
              <Flame className="w-4 h-4" />
              <span>Simulate System Failure</span>
            </button>
          </div>
        </div>
      </div>

      {/* Metric Cards (Real calculated data) */}
      <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
        
        {/* Total Exams */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white/90 backdrop-blur-md border border-purple-100 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
            <span>Total Exams</span>
            <FileText className="w-4 h-4 text-purple-600" />
          </div>
          <div className="text-2xl font-extrabold text-slate-900 font-mono">
            {totalExams}
          </div>
          <div className="text-[11px] text-purple-700 font-medium">
            {activeExams} Active Now
          </div>
        </div>

        {/* Active Exams */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white/90 backdrop-blur-md border border-purple-100 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
            <span>Active Exams</span>
            <Activity className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-extrabold text-emerald-700 font-mono">
            {activeExams}
          </div>
          <div className="text-[11px] text-slate-500 font-medium">
            Open for Candidates
          </div>
        </div>

        {/* Students Enrolled */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white/90 backdrop-blur-md border border-purple-100 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
            <span>Enrolled Students</span>
            <Users className="w-4 h-4 text-sky-600" />
          </div>
          <div className="text-2xl font-extrabold text-slate-900 font-mono">
            {totalEnrolled}
          </div>
          <div className="text-[11px] text-sky-700 font-medium">
            CSV & Single Roster
          </div>
        </div>

        {/* In Progress */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white/90 backdrop-blur-md border border-purple-100 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
            <span>Taking Exams Now</span>
            <Clock className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-2xl font-extrabold text-amber-700 font-mono">
            {inProgressAttempts}
          </div>
          <div className="text-[11px] text-amber-700 font-medium">
            Live Safe Sessions
          </div>
        </div>

        {/* Completed Attempts */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white/90 backdrop-blur-md border border-purple-100 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
            <span>Submissions</span>
            <Award className="w-4 h-4 text-teal-600" />
          </div>
          <div className="text-2xl font-extrabold text-slate-900 font-mono">
            {completedAttempts}
          </div>
          <div className="text-[11px] text-teal-700 font-medium">
            Results Recorded
          </div>
        </div>

        {/* System Health */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white/90 backdrop-blur-md border border-purple-100 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
            <span>Cluster Health</span>
            <Activity className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-base font-extrabold font-mono pt-1">
            {systemStatus === 'healthy' && <span className="text-emerald-700">Healthy ✓</span>}
            {systemStatus === 'recovered' && <span className="text-teal-700">Restored v1.9</span>}
            {systemStatus === 'critical' && <span className="text-rose-700 animate-pulse">Degraded ⚠</span>}
            {systemStatus === 'rolling_back' && <span className="text-purple-700">Rolling Back</span>}
          </div>
          <div className="text-[11px] text-slate-500 font-mono">
            Version: {currentVersion}
          </div>
        </div>

      </div>

      {/* Main Admin Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Columns: Exams Status & Access Codes */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <FileText className="w-4 h-4 text-purple-600" />
              <span>Examination Status & Generated Access Codes</span>
            </h2>
            <button
              onClick={() => setActivePage('admin_exams')}
              className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
            >
              <span>Manage All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="bg-white rounded-3xl border border-pink-100 shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50/80 border-b border-slate-100 text-[11px] uppercase tracking-wider text-slate-500 font-mono">
                  <tr>
                    <th className="px-5 py-3.5">Exam Name</th>
                    <th className="px-4 py-3.5">Subject</th>
                    <th className="px-4 py-3.5">Status</th>
                    <th className="px-4 py-3.5">Access Code</th>
                    <th className="px-4 py-3.5">Enrolled</th>
                    <th className="px-5 py-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {exams.map((exam) => {
                    const count = enrolledStudents.filter((e) => e.examId === exam.id).length;
                    return (
                      <tr key={exam.id} className="hover:bg-purple-50/30 transition-colors">
                        <td className="px-5 py-4 font-semibold text-slate-900 max-w-xs truncate">
                          {exam.name}
                        </td>
                        <td className="px-4 py-4 text-slate-600 font-medium">
                          {exam.subject}
                        </td>
                        <td className="px-4 py-4">
                          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                            exam.status === 'active' 
                              ? 'bg-emerald-100 text-emerald-800'
                              : exam.status === 'scheduled'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-slate-100 text-slate-700'
                          }`}>
                            {exam.status.toUpperCase()}
                          </span>
                        </td>
                        <td className="px-4 py-4 font-mono font-bold text-purple-700">
                          <span className="px-2 py-0.5 rounded bg-purple-50 border border-purple-200">
                            {exam.accessCode}
                          </span>
                        </td>
                        <td className="px-4 py-4 font-mono text-slate-700">
                          {count} students
                        </td>
                        <td className="px-5 py-4 text-right">
                          <button
                            onClick={() => {
                              setActiveExamId(exam.id);
                              setActivePage('admin_enrollments');
                            }}
                            className="text-xs font-bold text-purple-600 hover:text-purple-800 underline"
                          >
                            Enroll
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

        </div>

        {/* Right 1 Column: Quick Tools & Rollback Highlights */}
        <div className="space-y-4">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Terminal className="w-4 h-4 text-indigo-600" />
            <span>DevOps Orchestration</span>
          </h2>

          <div className="bg-white rounded-3xl p-5 border border-pink-100 shadow-xs space-y-4">
            
            <div className="p-4 rounded-2xl bg-purple-50/70 border border-purple-100 space-y-2 text-xs">
              <span className="font-bold text-purple-900 block">
                Autonomous Recovery Watchdog
              </span>
              <p className="text-slate-600 leading-relaxed text-[11px]">
                Monitors HTTP 5xx error rate spikes, latency breaches, and failed health probes. In the event of a crash, traffic reverts to <b className="font-mono text-purple-700">{previousStableVersion}</b> within 3.8 seconds.
              </p>
            </div>

            <div className="space-y-2">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider font-mono">
                Recent Rollback Events:
              </span>
              {rollbackEvents.slice(0, 2).map((rb) => (
                <div key={rb.id} className="p-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-1">
                  <div className="flex items-center justify-between font-mono text-[11px]">
                    <span className="font-bold text-slate-800">{rb.id}</span>
                    <span className="text-emerald-700 font-bold">{rb.status}</span>
                  </div>
                  <p className="text-[11px] text-slate-600 font-medium">
                    {rb.reason}
                  </p>
                  <div className="text-[10px] text-slate-400 font-mono">
                    Restored: {rb.previousStableVersion} in {rb.recoveryTimeSeconds}s
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => setActivePage('admin_monitoring')}
              className="w-full py-2.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-bold flex items-center justify-center gap-2 transition-colors"
            >
              <Activity className="w-4 h-4" />
              <span>Open Live Monitoring Dashboard</span>
            </button>

          </div>
        </div>

      </div>

    </div>
  );
};
