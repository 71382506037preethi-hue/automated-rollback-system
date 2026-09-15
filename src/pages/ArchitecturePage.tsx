import React, { useState } from 'react';
import { 
  Layers, 
  Server, 
  Activity, 
  RotateCcw, 
  Database, 
  ShieldCheck, 
  ArrowDown, 
  CheckCircle2, 
  Cpu, 
  Lock,
  Sparkles,
  Cloud,
  Terminal,
  ArrowRight
} from 'lucide-react';

const ARCH_LAYERS = [
  {
    layer: 1,
    title: "Student Examination Interface",
    tech: "React 18 + TypeScript + Tailwind CSS",
    gradient: "from-pink-400 to-purple-400",
    border: "border-pink-200",
    bg: "from-white via-pink-50/30 to-purple-50/20",
    badge: "bg-pink-50 text-pink-700 border-pink-200",
    icon: Layers,
    description: "Renders the exam paper, question navigation palette, and timer. Communicates with backend endpoints via lightweight JSON requests.",
    responsibilities: [
      "Dynamic single-question view with instantaneous option selection",
      "Local state cache holding unanswered and answered state maps",
      "Zero-latency local countdown clock and proctoring guidelines"
    ]
  },
  {
    layer: 2,
    title: "DevOps Continuous Deployment & Watchdog Service",
    tech: "Prometheus Probes + Canary Traffic Ingress + Synthetic Health",
    gradient: "from-purple-400 to-indigo-400",
    border: "border-purple-200",
    bg: "from-white via-purple-50/30 to-indigo-50/20",
    badge: "bg-purple-50 text-purple-700 border-purple-200",
    icon: Activity,
    description: "Continuously polls HTTP endpoints every 1000ms. Calculates running failure rates, response latency percentiles (p95), and 5xx status codes.",
    responsibilities: [
      "Real-time health telemetry evaluation against 95% availability threshold",
      "Synthetic HTTP 200 heartbeat probes to active container instances",
      "Instantaneous anomaly detection without waiting for user support tickets"
    ]
  },
  {
    layer: 3,
    title: "Automated Rollback Orchestrator",
    tech: "Docker Container Daemon / CI/CD Ingress Routing Controller",
    gradient: "from-amber-400 to-rose-400",
    border: "border-amber-200",
    bg: "from-white via-amber-50/30 to-rose-50/20",
    badge: "bg-amber-50 text-amber-700 border-amber-200",
    icon: RotateCcw,
    description: "Executes automated remediation when error thresholds are breached. Reroutes ingress traffic from defective v1.5 back to immutable stable v1.4.",
    responsibilities: [
      "Deterministic trigger logic (error rate > 5% or latency > 2000ms)",
      "Zero-downtime routing swap via reverse proxy layer in < 4.0 seconds",
      "Audit event generation and persistent logging into the rollback ledger"
    ]
  },
  {
    layer: 4,
    title: "Persistent Student & Exam State Storage",
    tech: "Isolated LocalStorage + Key-Value Session Store",
    gradient: "from-teal-400 to-sky-400",
    border: "border-teal-200",
    bg: "from-white via-teal-50/30 to-sky-50/20",
    badge: "bg-teal-50 text-teal-700 border-teal-200",
    icon: Database,
    description: "Stateless architecture design decoupling user identity and candidate answers from web application container lifecycles.",
    responsibilities: [
      "Guaranteed answer preservation across application version transitions",
      "Unique per-student-exam key scoping (examsafe_answers_${id})",
      "Zero session disconnect or answer erasure during container failover"
    ]
  }
];

export const ArchitecturePage: React.FC = () => {
  const [activeLayer, setActiveLayer] = useState<number>(1);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-purple-200 text-purple-700 text-xs font-mono font-bold shadow-2xs">
          <Sparkles className="w-3.5 h-3.5 text-pink-500 animate-star-twinkle" />
          <span>System Architecture & Structural Decoupling</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          System Architecture
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          Four 3D pastel layers demonstrate how ExamSafe isolates software application rollbacks from persistent student examination state.
        </p>
      </div>

      {/* 4 Pastel 3D Layer Cards with Gradient Connectors */}
      <div className="space-y-4">
        {ARCH_LAYERS.map((layer, idx) => {
          const LayerIcon = layer.icon;
          const isSelected = activeLayer === layer.layer;

          return (
            <React.Fragment key={layer.layer}>
              
              <div 
                onClick={() => setActiveLayer(layer.layer)}
                className={`rounded-3xl p-6 sm:p-7 border transition-all cursor-pointer bg-gradient-to-r ${layer.bg} ${layer.border} ${
                  isSelected ? 'ring-2 ring-purple-400 shadow-md scale-[1.01]' : 'shadow-xs hover:shadow-sm'
                }`}
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${layer.gradient} text-white flex items-center justify-center shadow-2xs flex-shrink-0 mt-0.5`}>
                      <LayerIcon className="w-6 h-6" />
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className={`text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full ${layer.badge} border`}>
                          Layer 0{layer.layer}
                        </span>
                        <span className="text-xs font-mono text-purple-700 font-semibold">
                          {layer.tech}
                        </span>
                      </div>

                      <h3 className="text-base sm:text-lg font-bold text-slate-900 font-sans">
                        {layer.title}
                      </h3>

                      <p className="text-xs text-slate-600 leading-relaxed max-w-2xl">
                        {layer.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end md:self-center flex-shrink-0">
                    <span className="text-[11px] font-mono text-purple-600 font-bold hidden sm:inline">
                      {isSelected ? 'Selected' : 'Inspect'}
                    </span>
                    <ArrowRight className={`w-4 h-4 text-purple-500 transition-transform ${isSelected ? 'rotate-90' : ''}`} />
                  </div>

                </div>

                {/* Expanded details when selected */}
                {isSelected && (
                  <div className="mt-5 pt-4 border-t border-purple-100/80 space-y-2">
                    <span className="text-xs font-bold text-slate-800 font-mono uppercase">
                      Core Layer Responsibilities:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                      {layer.responsibilities.map((resp, rIdx) => (
                        <div key={rIdx} className="p-3 rounded-xl bg-white/90 border border-purple-100 shadow-2xs text-xs text-slate-700 flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 flex-shrink-0 mt-0.5" />
                          <span>{resp}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Gradient Connector Arrow between layers */}
              {idx < ARCH_LAYERS.length - 1 && (
                <div className="flex justify-center items-center py-1">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-b from-purple-200 to-pink-200 flex items-center justify-center text-purple-700 shadow-2xs">
                    <ArrowDown className="w-4 h-4" />
                  </div>
                </div>
              )}

            </React.Fragment>
          );
        })}
      </div>

      {/* Academic Examiners Takeaway */}
      <div className="p-6 rounded-3xl bg-white/90 border border-purple-100 shadow-xs space-y-3">
        <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
          <ShieldCheck className="w-5 h-5 text-purple-600" />
          <span>Stateless Application & State Isolation Principle</span>
        </div>
        <p className="text-xs text-slate-600 leading-relaxed">
          The core innovation of the ExamSafe DevOps system is the strict architectural segregation between the transient web application container (Layer 1 & 3) and the candidate state repository (Layer 4). When automated rollback destroys and restarts defective web containers, the candidate session tokens and saved answers remain untouched.
        </p>
      </div>

    </div>
  );
};
