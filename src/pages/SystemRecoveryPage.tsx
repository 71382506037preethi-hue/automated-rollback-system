import React from 'react';
import { useSystem } from '../context/SystemContext';
import { 
  RotateCcw, 
  AlertTriangle, 
  CheckCircle2, 
  Activity, 
  ShieldCheck, 
  RefreshCw, 
  Database, 
  UserCheck, 
  FileCheck2, 
  ArrowDown, 
  Server, 
  Cpu, 
  Check, 
  X,
  Play,
  Flame,
  Clock,
  Sparkles,
  Heart,
  Star
} from 'lucide-react';

export const SystemRecoveryPage: React.FC = () => {
  const { 
    currentUser, 
    systemStatus, 
    currentVersion, 
    stableVersion, 
    rollbackEvents,
    triggerDeploymentFailureSimulation, 
    isSimulating, 
    simulationStage, 
    resetToInitialHealthyState,
    studentAnswers
  } = useSystem();

  const answeredCount = Object.keys(studentAnswers).length;

  // Exact 7-step timeline requested by user
  const TIMELINE_STEPS = [
    { 
      step: 1, 
      text: "Checking system health...", 
      desc: "Synthetic probes continuously monitoring API response times and HTTP 200 return status." 
    },
    { 
      step: 2, 
      text: "New application version detected.", 
      desc: "Software update (examsafe:v1.5) introduced into production cluster via canary deployment." 
    },
    { 
      step: 3, 
      text: "⚠ Application failure detected.", 
      desc: "Watchdog catches critical latency spike (>2500ms) and HTTP 502/503 errors breaching safety threshold." 
    },
    { 
      step: 4, 
      text: "Automatic recovery initiated.", 
      desc: "Autonomous DevOps orchestrator executes emergency rollback without requiring manual operator intervention." 
    },
    { 
      step: 5, 
      text: "Restoring previous stable version...", 
      desc: "Ingress routing immediately switches 100% of candidate traffic back to stable container tag v1.4." 
    },
    { 
      step: 6, 
      text: "Stable version restored ✓", 
      desc: "Immutable stable image v1.4 active. Cluster health returns to 100% with < 50ms latency." 
    },
    { 
      step: 7, 
      text: "Examination service recovered ✓ (Student data preserved)", 
      desc: "Zero candidate exam sessions severed. Student answers, progress, and timers remain 100% intact." 
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-purple-200 text-purple-700 text-xs font-mono font-bold shadow-2xs">
          <Sparkles className="w-3.5 h-3.5 text-pink-500 animate-star-twinkle" />
          <span>Autonomous DevOps Telemetry & Failover</span>
        </div>

        {/* Exact Title: System Recovery Center */}
        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          System Recovery Center
        </h1>

        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          Interactive evaluation dashboard demonstrating how faulty application releases trigger continuous health checks and automated rollback while keeping student examination data completely safe.
        </p>
      </div>

      {/* Main Interactive Presentation Card in Pearl Glass Style */}
      <div className="bg-white/95 backdrop-blur-xl border border-purple-100 rounded-3xl p-6 sm:p-8 shadow-xs space-y-8">
        
        {/* Top Control Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 rounded-2xl bg-gradient-to-r from-purple-50/70 via-pink-50/40 to-sky-50/60 border border-purple-100">
          <div>
            <div className="text-xs font-bold text-purple-900 uppercase tracking-wider font-mono">
              Live Simulation Controller (Examiner Presentation)
            </div>
            <p className="text-xs text-slate-600 mt-0.5">
              Trigger a software failure during an examination to observe the 7-step automated rollback lifecycle.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Button: Simulate System Failure */}
            <button
              id="recovery-simulate-failure-btn"
              onClick={triggerDeploymentFailureSimulation}
              disabled={isSimulating}
              className={`px-5 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition-all shadow-xs cursor-pointer ${
                isSimulating
                  ? 'bg-purple-100 text-purple-900 border border-purple-300 cursor-not-allowed'
                  : 'bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white border border-rose-400/80 hover:shadow-md'
              }`}
            >
              <Flame className={`w-4 h-4 ${isSimulating ? 'animate-spin' : ''}`} />
              <span>{isSimulating ? 'Rollback Sequence Running...' : 'Simulate System Failure'}</span>
            </button>

            {systemStatus === 'recovered' && (
              <button
                id="recovery-reset-btn"
                onClick={resetToInitialHealthyState}
                className="px-4 py-2.5 rounded-xl bg-white hover:bg-purple-50 text-purple-700 border border-purple-200 font-bold text-xs flex items-center gap-1.5 shadow-2xs transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5 text-purple-500" />
                <span>Reset to v1.5</span>
              </button>
            )}
          </div>
        </div>

        {/* Current Status Highlights (Pastel colors during normal, soft red/pink on failure, green/cyan on recovery) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          
          <div className={`p-4 rounded-2xl border transition-all ${
            systemStatus === 'critical'
              ? 'bg-rose-50/80 border-rose-200 ring-1 ring-rose-300'
              : systemStatus === 'recovered'
              ? 'bg-teal-50/80 border-teal-200'
              : 'bg-purple-50/60 border-purple-100'
          }`}>
            <span className="text-[11px] font-mono text-slate-500 font-bold uppercase block">
              Cluster State
            </span>
            <div className="text-base font-extrabold mt-1">
              {systemStatus === 'healthy' && <span className="text-emerald-700">Healthy (Sub-50ms)</span>}
              {systemStatus === 'recovered' && <span className="text-teal-700">Restored to Stable ✓</span>}
              {systemStatus === 'critical' && <span className="text-rose-700 animate-pulse">Degraded (HTTP 502)</span>}
              {systemStatus === 'rolling_back' && <span className="text-purple-700">Traffic Swapping...</span>}
            </div>
            <span className="text-[10px] text-slate-500 mt-1 block">Continuous synthetic probing</span>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-purple-100">
            <span className="text-[11px] font-mono text-slate-500 font-bold uppercase block">
              Active Image
            </span>
            <div className="text-base font-mono font-extrabold text-purple-700 mt-1">
              {currentVersion}
            </div>
            <span className="text-[10px] text-slate-500 mt-1 block">Rollback Target: {stableVersion}</span>
          </div>

          <div className="p-4 rounded-2xl bg-teal-50/60 border border-teal-200">
            <span className="text-[11px] font-mono text-teal-800 font-bold uppercase block">
              Student Answers
            </span>
            <div className="text-base font-extrabold text-teal-900 mt-1">
              100% Preserved ✓
            </div>
            <span className="text-[10px] text-teal-700 mt-1 block">
              {answeredCount} answers cached in separate store
            </span>
          </div>

        </div>

        {/* 7-Step Animated Timeline (Pastel styling with Soft Red/Pink on Failure, Green/Cyan on Recovery) */}
        <div className="space-y-4 pt-2">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-extrabold text-slate-900 font-sans">
              7-Step Automated Rollback Timeline
            </h3>
            <span className="text-xs font-mono text-purple-600 font-bold">
              {isSimulating ? `Executing Stage ${simulationStage} of 7...` : systemStatus === 'recovered' ? 'All 7 Stages Complete ✓' : 'Ready for Evaluation'}
            </span>
          </div>

          <div className="space-y-3">
            {TIMELINE_STEPS.map((s) => {
              const isPast = systemStatus === 'recovered' || (isSimulating && s.step < simulationStage);
              const isCurrent = isSimulating && s.step === simulationStage;
              const isFailureStep = s.step === 3;
              const isRecoveryStep = s.step >= 6;

              let cardStyle = 'bg-white border-purple-100/80 text-slate-600';
              let badgeStyle = 'bg-slate-100 text-slate-500 border-slate-200';

              if (isPast) {
                cardStyle = 'bg-teal-50/50 border-teal-200 text-slate-800';
                badgeStyle = 'bg-teal-100 text-teal-800 border-teal-300';
              } else if (isCurrent) {
                if (isFailureStep) {
                  cardStyle = 'bg-rose-50 border-rose-300 ring-2 ring-rose-400 text-rose-900 shadow-sm';
                  badgeStyle = 'bg-rose-100 text-rose-800 border-rose-300 animate-pulse';
                } else if (isRecoveryStep) {
                  cardStyle = 'bg-teal-50 border-teal-300 ring-2 ring-teal-400 text-teal-900 shadow-sm';
                  badgeStyle = 'bg-teal-100 text-teal-800 border-teal-300';
                } else {
                  cardStyle = 'bg-purple-50 border-purple-300 ring-2 ring-purple-300 text-purple-900 shadow-sm';
                  badgeStyle = 'bg-purple-100 text-purple-800 border-purple-300 animate-spin';
                }
              }

              return (
                <div
                  key={s.step}
                  className={`p-4 rounded-2xl border transition-all flex items-start gap-4 ${cardStyle}`}
                >
                  <div className={`w-8 h-8 rounded-xl font-mono text-xs font-extrabold flex items-center justify-center flex-shrink-0 border mt-0.5 ${badgeStyle}`}>
                    {isPast ? <Check className="w-4 h-4" /> : `0${s.step}`}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs sm:text-sm font-bold font-sans">
                        {s.text}
                      </h4>
                      {isCurrent && (
                        <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-white border border-purple-200 text-purple-700">
                          Active Telemetry
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                      {s.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Data Isolation Verification Guarantee */}
        <div className="p-5 rounded-2xl bg-gradient-to-r from-purple-50/60 to-pink-50/60 border border-purple-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white border border-purple-200 flex items-center justify-center text-purple-600 shadow-2xs flex-shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div className="text-xs text-slate-700">
              <span className="font-bold text-slate-900 block">Student Data Preservation Guarantee</span>
              Application containers are stateless. Candidate answers and examination countdown timers are persisted in dedicated storage and remain unaffected by software rollbacks.
            </div>
          </div>

          <button
            onClick={() => window.open('#', '_self')}
            className="text-xs font-bold text-purple-700 hover:text-purple-900 whitespace-nowrap"
          >
            MTTR &lt; 4.0 Seconds
          </button>
        </div>

      </div>

    </div>
  );
};
