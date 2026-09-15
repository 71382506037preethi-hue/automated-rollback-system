import React from 'react';
import { useSystem } from '../context/SystemContext';
import { AlertTriangle, RotateCcw, CheckCircle2, RefreshCw, Cpu, Sparkles, Shield } from 'lucide-react';

export const DemoBanner: React.FC = () => {
  const { 
    systemStatus, 
    currentVersion, 
    triggerDeploymentFailureSimulation, 
    isSimulating,
    resetToInitialHealthyState,
    activePage,
    setActivePage
  } = useSystem();

  return (
    <aside aria-label="Simulation control banner" className="bg-gradient-to-r from-pink-50/90 via-purple-50/85 to-sky-50/90 backdrop-blur-md border-b border-pink-200/50 text-xs px-4 py-2 text-slate-700 shadow-2xs">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/90 border border-pink-200 text-purple-700 font-semibold tracking-wide text-[11px] shadow-2xs">
            <Sparkles className="w-3 h-3 text-pink-500 animate-star-twinkle" />
            <span>ACADEMIC PROTOTYPE</span>
          </span>
          <span className="text-pink-200 hidden sm:inline">•</span>
          <span className="text-slate-600 hidden md:inline">
            Project: <strong className="text-slate-900 font-semibold">Automated Rollback for Online Examination System Using DevOps</strong>
          </span>
          <span className="text-pink-200 hidden sm:inline">•</span>
          <span className="text-slate-600">
            Active Image: <span className="font-mono text-purple-700 font-bold bg-white/90 px-2 py-0.5 rounded-md border border-purple-200 shadow-2xs">{currentVersion}</span>
          </span>
        </div>

        <div className="flex items-center gap-2 flex-wrap ml-auto">
          {/* Status badge in soft pastel */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-white/90 border border-purple-100 shadow-2xs">
            <span className="text-slate-500 text-[11px]">System:</span>
            {systemStatus === 'healthy' && (
              <span className="text-emerald-700 font-medium flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400" /> Healthy ✓
              </span>
            )}
            {systemStatus === 'critical' && (
              <span className="text-rose-700 font-medium animate-pulse flex items-center gap-1">
                <AlertTriangle className="w-3 h-3 text-rose-500" /> Degraded ⚠
              </span>
            )}
            {systemStatus === 'rolling_back' && (
              <span className="text-purple-700 font-medium flex items-center gap-1">
                <RefreshCw className="w-3 h-3 text-purple-500 animate-spin" /> Rolling Back...
              </span>
            )}
            {systemStatus === 'recovered' && (
              <span className="text-teal-700 font-medium flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-teal-500" /> Recovered ✓
              </span>
            )}
          </div>

          {/* Simulate failure button */}
          <button
            id="demo-banner-simulate-failure-btn"
            onClick={triggerDeploymentFailureSimulation}
            disabled={isSimulating}
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-semibold transition-all shadow-xs ${
              isSimulating
                ? 'bg-purple-100 text-purple-800 border border-purple-300 cursor-not-allowed'
                : 'bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white border border-rose-400/50 hover:shadow-xs'
            }`}
            title="Triggers the deployment failure & automated rollback sequence"
          >
            <AlertTriangle className={`w-3.5 h-3.5 ${isSimulating ? 'animate-spin' : ''}`} />
            <span>{isSimulating ? 'Simulation Running...' : 'Simulate Deployment Failure'}</span>
          </button>

          {/* Reset button if already recovered */}
          {systemStatus === 'recovered' && (
            <button
              id="demo-banner-reset-btn"
              onClick={resetToInitialHealthyState}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-white/90 hover:bg-white text-purple-700 border border-purple-200 transition-colors shadow-2xs font-medium"
              title="Reset state back to baseline v1.5"
            >
              <RotateCcw className="w-3 h-3 text-purple-500" />
              <span>Reset State</span>
            </button>
          )}

          {activePage !== 'about' && (
            <button
              id="demo-banner-viva-btn"
              onClick={() => setActivePage('about')}
              className="text-purple-600 hover:text-purple-800 font-medium underline underline-offset-2 ml-1 hidden lg:inline"
            >
              Viva Guide
            </button>
          )}
        </div>
      </div>
    </aside>
  );
};


