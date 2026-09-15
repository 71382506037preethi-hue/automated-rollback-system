import React, { useState } from 'react';
import { useSystem } from '../context/SystemContext';
import { DEFAULT_PIPELINE_STAGES } from '../data/mockData';
import { PipelineStage } from '../types';
import { 
  Terminal, 
  CheckCircle2, 
  AlertTriangle, 
  RotateCcw, 
  Flame, 
  Activity, 
  Server, 
  GitBranch, 
  Boxes, 
  RefreshCw, 
  Check,
  ShieldCheck,
  Cpu,
  Sparkles,
  Database
} from 'lucide-react';

export const DevOpsDashboard: React.FC = () => {
  const { 
    currentVersion, 
    stableVersion, 
    deploymentStatus, 
    systemStatus, 
    rollbackStatus, 
    activeExamSessions,
    triggerDeploymentFailureSimulation, 
    isSimulating,
    resetToInitialHealthyState
  } = useSystem();

  const [selectedStage, setSelectedStage] = useState<PipelineStage>(DEFAULT_PIPELINE_STAGES[3]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-purple-600 uppercase tracking-wider font-bold">
            <Sparkles className="w-3.5 h-3.5 text-pink-500 animate-star-twinkle" />
            <span>DevOps Reliability & Telemetry Controller</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
            DevOps Monitoring Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Real-time pipeline telemetry, deployment health probes, and automated rollback status.
          </p>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          <span className="px-3 py-1 rounded-full bg-purple-50 border border-purple-200 text-xs font-mono text-purple-700 font-bold shadow-2xs">
            Prototype Data
          </span>

          <button
            id="devops-simulate-btn"
            onClick={triggerDeploymentFailureSimulation}
            disabled={isSimulating}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 shadow-xs transition-all ${
              isSimulating
                ? 'bg-purple-100 text-purple-900 cursor-not-allowed border border-purple-300'
                : 'bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white border border-rose-400'
            }`}
          >
            <Flame className="w-4 h-4" />
            <span>{isSimulating ? 'Rollback Sequence Running...' : 'Simulate System Failure'}</span>
          </button>

          {systemStatus === 'recovered' && (
            <button
              id="devops-reset-btn"
              onClick={resetToInitialHealthyState}
              className="px-3.5 py-2 rounded-xl bg-white hover:bg-purple-50 text-purple-700 text-xs font-bold border border-purple-200 transition-colors shadow-2xs flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5 text-purple-500" />
              <span>Reset State</span>
            </button>
          )}
        </div>
      </div>

      {/* Exactly 6 Pastel Dashboard Cards Requested by User, clearly labeled "Prototype Data" */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* 1. Application Health */}
        <div className="p-6 rounded-3xl bg-gradient-to-br from-white to-purple-50/30 border border-purple-100 shadow-xs flex flex-col justify-between hover:shadow-md transition-all">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
            <span className="font-bold text-slate-700">Application Health</span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-purple-50 text-purple-600 font-bold border border-purple-100">
              Prototype Data
            </span>
          </div>
          <div>
            <div className="text-xl font-bold font-sans">
              {systemStatus === 'healthy' && (
                <span className="text-emerald-700 flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
                  100% Operational
                </span>
              )}
              {systemStatus === 'recovered' && (
                <span className="text-teal-700 flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-teal-400" />
                  Restored & Healthy ✓
                </span>
              )}
              {systemStatus === 'critical' && (
                <span className="text-rose-700 flex items-center gap-2 animate-pulse">
                  <span className="w-3 h-3 rounded-full bg-rose-500 animate-ping" />
                  Critical Failure (HTTP 502)
                </span>
              )}
              {systemStatus === 'rolling_back' && (
                <span className="text-purple-700 flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-purple-500 animate-spin" />
                  Automated Rollback Active
                </span>
              )}
            </div>
            <p className="text-xs text-slate-500 mt-2 leading-relaxed">
              Synthetically monitored ingress status responding within safety baseline.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-purple-50 flex items-center justify-between text-[11px] font-mono text-slate-500">
            <span>Latency Probe:</span>
            <span className="font-bold text-purple-700">{systemStatus === 'critical' ? '2850ms' : '42ms'}</span>
          </div>
        </div>

        {/* 2. Current Version */}
        <div className="p-6 rounded-3xl bg-gradient-to-br from-white to-pink-50/30 border border-pink-100 shadow-xs flex flex-col justify-between hover:shadow-md transition-all">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
            <span className="font-bold text-slate-700">Current Version</span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-pink-50 text-pink-600 font-bold border border-pink-100">
              Prototype Data
            </span>
          </div>
          <div>
            <div className="text-2xl font-mono font-extrabold text-purple-700">
              {currentVersion}
            </div>
            <p className="text-xs text-slate-500 mt-2 leading-relaxed">
              Active Docker image tag serving live candidate ingress requests.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-pink-50 flex items-center justify-between text-[11px] font-mono text-slate-500">
            <span>Container Hash:</span>
            <span className="font-bold text-slate-700">sha256:7f4c9a...</span>
          </div>
        </div>

        {/* 3. Previous Stable Version */}
        <div className="p-6 rounded-3xl bg-gradient-to-br from-white to-sky-50/30 border border-sky-100 shadow-xs flex flex-col justify-between hover:shadow-md transition-all">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
            <span className="font-bold text-slate-700">Previous Stable Version</span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-sky-50 text-sky-600 font-bold border border-sky-100">
              Prototype Data
            </span>
          </div>
          <div>
            <div className="text-2xl font-mono font-extrabold text-sky-700">
              {stableVersion}
            </div>
            <p className="text-xs text-slate-500 mt-2 leading-relaxed">
              Immutable verified baseline release designated for emergency automated failover.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-sky-50 flex items-center justify-between text-[11px] font-mono text-slate-500">
            <span>Verification:</span>
            <span className="font-bold text-teal-700">Green (0 Breaches)</span>
          </div>
        </div>

        {/* 4. Deployment Status */}
        <div className="p-6 rounded-3xl bg-gradient-to-br from-white to-amber-50/30 border border-amber-100 shadow-xs flex flex-col justify-between hover:shadow-md transition-all">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
            <span className="font-bold text-slate-700">Deployment Status</span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-50 text-amber-600 font-bold border border-amber-100">
              Prototype Data
            </span>
          </div>
          <div>
            <div className="text-lg font-bold font-sans">
              {deploymentStatus === 'deployed' && <span className="text-emerald-700">Canary Live</span>}
              {deploymentStatus === 'failed' && <span className="text-rose-700">Failed Deployment</span>}
              {deploymentStatus === 'rolling_back' && <span className="text-purple-700">Executing Reversion</span>}
              {deploymentStatus === 'rolled_back' && <span className="text-teal-700">Rolled Back to v1.4 ✓</span>}
            </div>
            <p className="text-xs text-slate-500 mt-2 leading-relaxed">
              Continuous deployment engine status controlling canary weight and target replica pods.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-amber-50 flex items-center justify-between text-[11px] font-mono text-slate-500">
            <span>Strategy:</span>
            <span className="font-bold text-slate-700">Canary (25/75 Split)</span>
          </div>
        </div>

        {/* 5. Monitoring Status */}
        <div className="p-6 rounded-3xl bg-gradient-to-br from-white to-teal-50/30 border border-teal-100 shadow-xs flex flex-col justify-between hover:shadow-md transition-all">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
            <span className="font-bold text-slate-700">Monitoring Status</span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-teal-50 text-teal-600 font-bold border border-teal-100">
              Prototype Data
            </span>
          </div>
          <div>
            <div className="text-lg font-bold font-sans text-teal-700 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-teal-400 animate-pulse" />
              Continuous Telemetry
            </div>
            <p className="text-xs text-slate-500 mt-2 leading-relaxed">
              Synthetic heartbeat daemon evaluating error anomalies every 1000 milliseconds.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-teal-50 flex items-center justify-between text-[11px] font-mono text-slate-500">
            <span>Probe Frequency:</span>
            <span className="font-bold text-slate-700">1000ms</span>
          </div>
        </div>

        {/* 6. Exam Service */}
        <div className="p-6 rounded-3xl bg-gradient-to-br from-white to-indigo-50/30 border border-indigo-100 shadow-xs flex flex-col justify-between hover:shadow-md transition-all">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
            <span className="font-bold text-slate-700">Exam Service</span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-600 font-bold border border-indigo-100">
              Prototype Data
            </span>
          </div>
          <div>
            <div className="text-lg font-bold font-sans text-emerald-700 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
              Active ({activeExamSessions} Active Candidates)
            </div>
            <p className="text-xs text-slate-500 mt-2 leading-relaxed">
              Stateless exam session controller. Candidate answers decoupled and protected.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-indigo-50 flex items-center justify-between text-[11px] font-mono text-slate-500">
            <span>Answer Preservation:</span>
            <span className="font-bold text-teal-700">100% Guaranteed</span>
          </div>
        </div>

      </div>

      {/* Interactive Pipeline Stage Detail Selector */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-purple-100 shadow-xs space-y-6">
        <div className="flex items-center justify-between border-b border-purple-50 pb-4">
          <div>
            <h2 className="text-base font-bold text-slate-900">
              Continuous Delivery Pipeline Stages
            </h2>
            <p className="text-xs text-slate-500">
              Click any stage to inspect its health status and logs.
            </p>
          </div>
          <span className="text-xs font-mono text-purple-600 font-bold">
            Selected: Stage {selectedStage.id}
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {DEFAULT_PIPELINE_STAGES.map((stg) => {
            const isSelected = selectedStage.id === stg.id;
            return (
              <button
                key={stg.id}
                onClick={() => setSelectedStage(stg)}
                className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-purple-50/80 border-purple-300 ring-2 ring-purple-300 shadow-xs'
                    : 'bg-white hover:bg-slate-50 border-slate-200'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[11px] font-mono font-bold text-slate-400">
                    0{stg.id}
                  </span>
                  <span className={`w-2 h-2 rounded-full ${
                    stg.status === 'success' ? 'bg-emerald-400' :
                    stg.status === 'in_progress' ? 'bg-purple-400 animate-spin' :
                    stg.status === 'failed' ? 'bg-rose-400' : 'bg-slate-300'
                  }`} />
                </div>
                <div className="text-xs font-bold text-slate-800 truncate">
                  {stg.name}
                </div>
                <div className="text-[10px] font-mono text-slate-500 mt-1">
                  {stg.duration}
                </div>
              </button>
            );
          })}
        </div>

        {/* Detail Box */}
        <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-200 text-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-bold text-slate-800">
              Stage {selectedStage.id}: {selectedStage.name}
            </span>
            <span className="font-mono text-purple-700 font-semibold">
              Execution Time: {selectedStage.duration}
            </span>
          </div>
          <div className="font-mono text-[11px] text-slate-600 bg-white p-3 rounded-xl border border-slate-200 overflow-x-auto">
            {selectedStage.details.map((detail, i) => (
              <div key={i} className="py-0.5">{detail}</div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
};
