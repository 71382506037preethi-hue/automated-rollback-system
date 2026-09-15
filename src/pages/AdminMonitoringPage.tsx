import React from 'react';
import { useSystem } from '../context/SystemContext';
import { 
  Activity, 
  Server, 
  Users, 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  RotateCcw, 
  Flame, 
  Database, 
  ShieldCheck, 
  Cpu, 
  Sparkles,
  ArrowRight,
  TrendingUp,
  Terminal,
  FileText
} from 'lucide-react';
import { AdminAccount } from '../types';

export const AdminMonitoringPage: React.FC = () => {
  const { 
    currentUser,
    role,
    exams,
    enrolledStudents,
    allAttempts,
    systemStatus,
    currentVersion,
    previousStableVersion,
    deploymentStatus,
    triggerDeploymentFailureSimulation,
    isSimulating,
    setActivePage
  } = useSystem();

  if (!currentUser || role !== 'admin') {
    return (
      <div className="max-w-md mx-auto my-16 text-center px-4">
        <button
          onClick={() => setActivePage('login')}
          className="px-5 py-2.5 rounded-2xl bg-indigo-600 text-white text-xs font-bold"
        >
          Admin Login Required
        </button>
      </div>
    );
  }

  const activeAttempts = allAttempts.filter((a) => a.status === 'in_progress');
  const submittedAttempts = allAttempts.filter((a) => a.status === 'submitted');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 text-purple-700 text-xs font-mono font-bold border border-purple-200 mb-1">
            <Activity className="w-3.5 h-3.5 text-purple-600 animate-pulse" />
            <span>Real-time Examination Telemetry</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Live Monitoring & Proctor Console
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Real-time tracking of candidate examination sessions and zero-data-loss failover state.
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          <button
            onClick={triggerDeploymentFailureSimulation}
            disabled={isSimulating}
            className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-rose-200 transition-all"
          >
            <Flame className="w-4 h-4" />
            <span>Simulate Deployment Failure</span>
          </button>
        </div>
      </div>

      {/* Real-time Status Gauges */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="p-5 rounded-2xl bg-white border border-purple-100 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
            <span>Candidates In Exam</span>
            <Users className="w-4 h-4 text-purple-600" />
          </div>
          <div className="text-2xl font-extrabold text-slate-900 font-mono">
            {activeAttempts.length}
          </div>
          <div className="text-[11px] text-emerald-700 font-medium flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span>Continuous State Syncing</span>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-purple-100 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
            <span>HTTP 5xx Error Rate</span>
            <TrendingUp className="w-4 h-4 text-rose-500" />
          </div>
          <div className="text-2xl font-extrabold font-mono">
            {systemStatus === 'healthy' ? (
              <span className="text-emerald-700">0.02%</span>
            ) : systemStatus === 'recovered' ? (
              <span className="text-teal-700">0.00%</span>
            ) : (
              <span className="text-rose-600 animate-pulse">48.6% ⚠</span>
            )}
          </div>
          <div className="text-[11px] text-slate-500">
            Threshold: &gt; 5.0% triggers rollback
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-purple-100 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
            <span>Data Persistence Rate</span>
            <Database className="w-4 h-4 text-sky-600" />
          </div>
          <div className="text-2xl font-extrabold text-slate-900 font-mono">
            100%
          </div>
          <div className="text-[11px] text-sky-700 font-medium">
            Zero student answers lost
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-purple-100 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
            <span>Target Deployment</span>
            <Server className="w-4 h-4 text-indigo-600" />
          </div>
          <div className="text-2xl font-extrabold text-purple-900 font-mono">
            {currentVersion}
          </div>
          <div className="text-[11px] text-slate-500 font-mono">
            Stable Fallback: {previousStableVersion}
          </div>
        </div>

      </div>

      {/* Live Candidates Session Table */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Users className="w-4 h-4 text-purple-600" />
            <span>Active Student Examination Sessions</span>
          </h2>
          <span className="text-xs text-slate-500 font-mono">
            Auto-refreshed on state change
          </span>
        </div>

        <div className="bg-white rounded-3xl border border-pink-100 shadow-xs overflow-hidden">
          {allAttempts.length === 0 ? (
            <div className="p-8 text-center space-y-2">
              <Users className="w-8 h-8 text-slate-300 mx-auto" />
              <p className="text-xs text-slate-500">
                No active or submitted exam attempts yet. When students start taking exams, their real-time progress will appear here.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-100 text-[11px] uppercase tracking-wider text-slate-500 font-mono">
                  <tr>
                    <th className="px-5 py-3.5">Candidate</th>
                    <th className="px-4 py-3.5">Exam</th>
                    <th className="px-4 py-3.5">Status</th>
                    <th className="px-4 py-3.5">Answers Saved</th>
                    <th className="px-4 py-3.5">Time Remaining</th>
                    <th className="px-4 py-3.5">Current Question</th>
                    <th className="px-5 py-3.5 text-right">Score</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {allAttempts.map((att) => {
                    const exam = exams.find((e) => e.id === att.examId);
                    const answeredCount = Object.keys(att.answers).length;
                    const mins = Math.floor(att.timeRemainingSeconds / 60);
                    const secs = att.timeRemainingSeconds % 60;

                    return (
                      <tr key={att.id} className="hover:bg-purple-50/20 transition-colors">
                        <td className="px-5 py-4">
                          <div className="font-bold text-slate-900">{att.studentName}</div>
                          <div className="text-[10px] text-slate-500 font-mono">{att.studentEmail}</div>
                        </td>
                        <td className="px-4 py-4 text-slate-700 font-medium max-w-xs truncate">
                          {exam?.name || att.examId}
                        </td>
                        <td className="px-4 py-4">
                          {att.status === 'submitted' ? (
                            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                              SUBMITTED
                            </span>
                          ) : (
                            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 animate-pulse">
                              IN PROGRESS
                            </span>
                          )}
                        </td>
                        <td className="px-4 py-4 font-mono font-semibold text-purple-700">
                          {answeredCount} / {exam?.totalQuestions || 5}
                        </td>
                        <td className="px-4 py-4 font-mono text-slate-700">
                          {att.status === 'submitted' ? 'Finished' : `${mins}m ${secs}s`}
                        </td>
                        <td className="px-4 py-4 font-mono text-slate-600">
                          Q{att.currentQuestionIndex + 1}
                        </td>
                        <td className="px-5 py-4 text-right font-mono font-bold">
                          {att.status === 'submitted' ? (
                            <span className="text-emerald-700">{att.score} / {att.maxScore}</span>
                          ) : (
                            <span className="text-slate-400">Pending</span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

    </div>
  );
};
