import React, { useRef, useEffect } from 'react';
import { useSystem } from '../context/SystemContext';
import { 
  AlertTriangle, 
  CheckCircle2, 
  RefreshCw, 
  Terminal, 
  ArrowRight, 
  X, 
  ExternalLink,
  ShieldCheck,
  Server,
  Sparkles
} from 'lucide-react';

const STEPS_CONFIG = [
  {
    step: 1,
    title: '⚠ Deployment Failure Detected',
    desc: 'Canary release v1.5 returned HTTP 502 Bad Gateway. Ingress error spike detected.',
    activeColor: 'border-rose-200 bg-rose-50/90 text-rose-950',
    doneColor: 'border-purple-100 bg-white text-slate-700'
  },
  {
    step: 2,
    title: 'Analyzing system health...',
    desc: 'Prometheus & synthetic probes querying error rate (18.4%) and latency (2850ms).',
    activeColor: 'border-amber-200 bg-amber-50/90 text-amber-950',
    doneColor: 'border-purple-100 bg-white text-slate-700'
  },
  {
    step: 3,
    title: 'Failure confirmed.',
    desc: 'Threshold breached: 3 consecutive failed health probes. Severity marked CRITICAL.',
    activeColor: 'border-rose-200 bg-rose-50/90 text-rose-950',
    doneColor: 'border-purple-100 bg-white text-slate-700'
  },
  {
    step: 4,
    title: 'Automatic rollback initiated...',
    desc: 'DevOps watchdog dispatches automated rollback command to cluster orchestrator.',
    activeColor: 'border-purple-200 bg-purple-50/90 text-purple-950',
    doneColor: 'border-purple-100 bg-white text-slate-700'
  },
  {
    step: 5,
    title: 'Restoring previous stable version...',
    desc: 'Ingress reroutes 100% of candidate traffic to stable container tag examsafe:v1.4.',
    activeColor: 'border-purple-200 bg-purple-50/90 text-purple-950',
    doneColor: 'border-purple-100 bg-white text-slate-700'
  },
  {
    step: 6,
    title: 'Stable Version v1.4 restored successfully ✓',
    desc: 'Cluster health probes report all green (42ms latency, 0% errors). State verified.',
    activeColor: 'border-teal-200 bg-teal-50/90 text-teal-950',
    doneColor: 'border-teal-100 bg-teal-50/60 text-slate-800'
  },
  {
    step: 7,
    title: 'Examination service recovered ✓',
    desc: 'Zero candidate exam sessions severed. Student answers & timers preserved.',
    activeColor: 'border-teal-200 bg-teal-50/90 text-teal-950',
    doneColor: 'border-teal-100 bg-teal-50/60 text-slate-800'
  }
];

export const SimulationModal: React.FC = () => {
  const { 
    isModalOpen, 
    closeSimulationModal, 
    simulationStep, 
    isSimulating,
    simulationLogs, 
    setActivePage,
    previousStableVersion
  } = useSystem();

  const terminalEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [simulationLogs]);

  if (!isModalOpen) return null;

  const progressPercent = Math.min(Math.round((simulationStep / 7) * 100), 100);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/40 backdrop-blur-xs overflow-y-auto">
      <div 
        id="simulation-modal-container"
        className="relative w-full max-w-3xl bg-white/95 backdrop-blur-xl border border-purple-100 rounded-3xl shadow-2xl overflow-hidden my-6 max-h-[92vh] flex flex-col"
      >
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-purple-100 bg-gradient-to-r from-purple-50/80 via-pink-50/50 to-sky-50/80">
          <div className="flex items-center gap-3">
            <div className={`w-9 h-9 rounded-2xl flex items-center justify-center border shadow-2xs ${
              simulationStep >= 6 
                ? 'bg-teal-50 border-teal-200 text-teal-600' 
                : 'bg-rose-50 border-rose-200 text-rose-600'
            }`}>
              {simulationStep >= 6 ? (
                <CheckCircle2 className="w-5 h-5 text-teal-600" />
              ) : (
                <AlertTriangle className="w-5 h-5 text-rose-600 animate-pulse" />
              )}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-slate-900">
                  DevOps Automated Rollback Demonstration
                </h3>
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-purple-50 border border-purple-200 text-purple-700 font-bold">
                  Live Sequence
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Observing real-time detection, container rerouting, and zero-data-loss recovery
              </p>
            </div>
          </div>

          <button
            id="simulation-modal-close-btn"
            onClick={closeSimulationModal}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-purple-50 transition-colors"
            title="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress bar */}
        <div className="px-6 pt-3 pb-2 bg-purple-50/40 border-b border-purple-100">
          <div className="flex justify-between items-center text-xs text-slate-600 mb-1.5 font-medium">
            <span>Execution Stage: Step {simulationStep} of 7</span>
            <span className="font-mono text-purple-700 font-bold">{progressPercent}%</span>
          </div>
          <div className="w-full bg-purple-100/70 h-2 rounded-full overflow-hidden">
            <div 
              className={`h-full transition-all duration-700 ease-out rounded-full ${
                simulationStep >= 6 
                  ? 'bg-teal-500' 
                  : 'bg-gradient-to-r from-rose-500 via-amber-400 to-purple-600'
              }`}
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="p-6 space-y-5 overflow-y-auto flex-1">

          {/* Traffic Switch Visualizer */}
          <div className="bg-purple-50/40 border border-purple-100 rounded-2xl p-4">
            <div className="text-[11px] font-semibold text-slate-700 uppercase tracking-wider mb-2.5 flex items-center gap-1.5 font-mono">
              <Server className="w-3.5 h-3.5 text-purple-600" />
              Traffic Ingress & Container Routing Diagram
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-center text-center">
              {/* Client Ingress */}
              <div className="p-3 rounded-2xl bg-white border border-purple-100 shadow-2xs">
                <div className="text-xs font-bold text-slate-800">Exam Ingress Controller</div>
                <div className="text-[11px] text-purple-600 font-mono font-semibold mt-0.5">128 Active Exam Sessions</div>
                <div className="text-[10px] text-slate-500 mt-1">Routing: Dynamic Failover</div>
              </div>

              {/* Arrow with state */}
              <div className="flex flex-col items-center justify-center py-1">
                <div className="text-[11px] font-mono font-semibold mb-1 text-slate-700 flex items-center gap-1">
                  {simulationStep < 4 && <span className="text-rose-600">Traffic at Risk (v1.5)</span>}
                  {simulationStep === 4 || simulationStep === 5 ? (
                    <span className="text-purple-700 flex items-center gap-1">
                      <RefreshCw className="w-3 h-3 animate-spin text-purple-600" /> Rerouting to v1.4...
                    </span>
                  ) : null}
                  {simulationStep >= 6 && (
                    <span className="text-teal-700 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-teal-600" /> Restored to v1.4
                    </span>
                  )}
                </div>
                <div className="w-full flex items-center justify-center">
                  <div className="h-0.5 w-16 bg-purple-200 relative">
                    <div className={`absolute inset-0 ${simulationStep >= 4 ? 'bg-purple-500' : 'bg-rose-500'}`} />
                  </div>
                  <ArrowRight className={`w-4 h-4 -ml-1 ${simulationStep >= 4 ? 'text-purple-600' : 'text-rose-500'}`} />
                </div>
              </div>

              {/* Containers Comparison */}
              <div className="grid grid-cols-2 gap-2 text-left text-xs">
                <div className={`p-2.5 rounded-xl border transition-colors ${
                  simulationStep <= 4 
                    ? 'bg-rose-50 border-rose-200 text-rose-900' 
                    : 'bg-white border-slate-200 text-slate-400 opacity-60'
                }`}>
                  <div className="text-[10px] font-mono font-bold text-slate-500">Release v1.5</div>
                  <div className="text-[11px] font-bold text-rose-700">Canary Pod</div>
                  <div className="text-[10px] text-slate-600">
                    {simulationStep <= 4 ? 'CrashLoopBackOff' : '0% (Isolated)'}
                  </div>
                </div>

                <div className={`p-2.5 rounded-xl border transition-colors ${
                  simulationStep >= 5 
                    ? 'bg-teal-50 border-teal-200 text-teal-900 shadow-2xs' 
                    : 'bg-white border-slate-200 text-slate-600'
                }`}>
                  <div className="text-[10px] font-mono font-bold text-slate-500">Release v1.4</div>
                  <div className="text-[11px] font-bold text-teal-700">Stable Baseline</div>
                  <div className="text-[10px] text-slate-600">
                    {simulationStep >= 5 ? '100% Active ✓' : 'Standby Pod'}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Timeline of 7 Steps */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-700 mb-2 font-mono">
              Automated Sequence Execution Timeline
            </h4>
            
            <div className="space-y-1.5">
              {STEPS_CONFIG.map((item) => {
                const isCurrent = simulationStep === item.step;
                const isPassed = simulationStep > item.step;

                return (
                  <div
                    key={item.step}
                    className={`flex items-start gap-3 p-3 rounded-2xl border transition-all duration-300 ${
                      isCurrent
                        ? `${item.activeColor} shadow-sm ring-1 ring-purple-300`
                        : isPassed
                        ? `${item.doneColor} opacity-95`
                        : 'bg-slate-50/50 border-slate-200 text-slate-400 opacity-60'
                    }`}
                  >
                    <div className="mt-0.5 flex-shrink-0">
                      {isPassed ? (
                        <CheckCircle2 className="w-4 h-4 text-teal-600" />
                      ) : isCurrent ? (
                        isSimulating ? (
                          <RefreshCw className="w-4 h-4 text-purple-600 animate-spin" />
                        ) : (
                          <CheckCircle2 className="w-4 h-4 text-teal-600" />
                        )
                      ) : (
                        <div className="w-4 h-4 rounded-full border border-slate-300 flex items-center justify-center text-[9px] font-mono text-slate-500">
                          {item.step}
                        </div>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <span className={`text-xs font-bold ${isCurrent ? 'text-slate-900' : isPassed ? 'text-slate-800' : 'text-slate-500'}`}>
                          {item.title}
                        </span>
                        <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-white text-slate-600 border border-purple-100">
                          {isPassed ? 'Done' : isCurrent ? 'Running' : 'Queued'}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-600 mt-0.5 leading-snug">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Live Streaming Terminal Log Window */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-inner">
            <div className="flex items-center justify-between px-3.5 py-2 bg-slate-950 border-b border-slate-800 text-[11px] font-mono text-slate-400">
              <span className="flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-purple-400" />
                DevOps Automated Rollback Daemon (daemon.log)
              </span>
              <span className="text-emerald-400 flex items-center gap-1.5 text-[10px]">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                Live Stream
              </span>
            </div>
            
            <div className="p-3.5 font-mono text-[11px] leading-relaxed max-h-36 overflow-y-auto space-y-1 text-slate-200">
              {simulationLogs.map((log, idx) => (
                <div key={idx} className="flex gap-2">
                  <span className="text-purple-400 select-none">&gt;</span>
                  <span className={log.includes('⚠') || log.includes('failed') ? 'text-rose-300' : log.includes('✓') ? 'text-teal-300 font-semibold' : 'text-slate-300'}>
                    {log}
                  </span>
                </div>
              ))}
              <div ref={terminalEndRef} />
            </div>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-purple-50/40 border-t border-purple-100 flex flex-wrap items-center justify-between gap-3">
          <div className="text-xs text-slate-600">
            {simulationStep >= 6 ? (
              <span className="text-teal-700 font-semibold flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-teal-600" /> System Status: Recovered ✓ (Active: {previousStableVersion})
              </span>
            ) : (
              <span className="text-purple-700 font-medium flex items-center gap-1.5">
                <RefreshCw className="w-3.5 h-3.5 animate-spin text-purple-600" /> Automated remediation in progress...
              </span>
            )}
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <button
              id="modal-goto-devops-btn"
              onClick={() => {
                setActivePage('devops');
                closeSimulationModal();
              }}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white hover:bg-purple-50 text-purple-700 text-xs font-bold border border-purple-200 transition-colors shadow-2xs"
            >
              <ExternalLink className="w-3.5 h-3.5 text-purple-500" />
              <span>DevOps Monitor</span>
            </button>

            <button
              id="modal-goto-history-btn"
              onClick={() => {
                setActivePage('rollback_history');
                closeSimulationModal();
              }}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white hover:bg-purple-50 text-purple-700 text-xs font-bold border border-purple-200 transition-colors shadow-2xs"
            >
              <span>Rollback History</span>
            </button>

            <button
              id="modal-return-exam-btn"
              onClick={() => {
                setActivePage('exam');
                closeSimulationModal();
              }}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white text-xs font-bold transition-all shadow-xs"
            >
              <span>Launch / Return to Exam</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
