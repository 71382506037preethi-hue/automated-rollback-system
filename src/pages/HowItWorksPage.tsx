import React, { useState } from 'react';
import { useSystem } from '../context/SystemContext';
import { 
  Workflow, 
  CheckCircle2, 
  AlertTriangle, 
  RotateCcw, 
  Server, 
  Activity, 
  ShieldCheck, 
  Flame, 
  Clock,
  ArrowRight,
  Database,
  Sparkles,
  Cloud,
  Star,
  Check,
  Layers,
  Heart
} from 'lucide-react';

const SIX_STEPS = [
  {
    step: 1,
    title: "DEPLOY",
    subtitle: "New version released.",
    desc: "A software update (examsafe:v1.5) containing new exam features is deployed into the cluster following standard CI/CD pipeline approval.",
    detail: "Traffic routing splits 25% of incoming candidate requests to the new release while monitoring cluster metrics.",
    icon: Server,
    color: "from-pink-400 to-rose-400",
    badge: "bg-pink-50 text-pink-700 border-pink-200"
  },
  {
    step: 2,
    title: "MONITOR",
    subtitle: "System health is continuously checked.",
    desc: "Autonomous watchdog probes check HTTP 200 response codes and API latency every 1000 milliseconds to verify cluster stability.",
    detail: "Continuous telemetry tracks error rates, response latencies, memory utilization, and student session stability.",
    icon: Activity,
    color: "from-purple-400 to-indigo-400",
    badge: "bg-purple-50 text-purple-700 border-purple-200"
  },
  {
    step: 3,
    title: "DETECT",
    subtitle: "A problem is identified.",
    desc: "The monitoring engine detects a critical runtime exception in v1.5. API latency spikes past 2500ms, triggering synthetic health probe breaches.",
    detail: "Watchdog records HTTP 502/503 status codes. Health score drops below the mandatory 95% threshold, raising a critical alert.",
    icon: AlertTriangle,
    color: "from-rose-400 to-amber-400",
    badge: "bg-rose-50 text-rose-700 border-rose-200"
  },
  {
    step: 4,
    title: "ROLLBACK",
    subtitle: "Previous stable version is restored automatically.",
    desc: "Without requiring manual operator intervention or waiting for student complaint tickets, the autonomous DevOps engine triggers emergency rollback.",
    detail: "Remediation daemon references metadata registry for the designated target stable image (v1.4) and executes immediate routing failover.",
    icon: RotateCcw,
    color: "from-amber-400 to-yellow-400",
    badge: "bg-amber-50 text-amber-700 border-amber-200"
  },
  {
    step: 5,
    title: "RECOVER",
    subtitle: "Exam service becomes healthy again.",
    desc: "The ingress load balancer immediately diverts 100% of candidate traffic back to the immutable stable containers (v1.4). The defective v1.5 containers are cordoned off.",
    detail: "Network routing switch occurs in under 4 seconds. Application layer returns to verified 100% operational health.",
    icon: CheckCircle2,
    color: "from-teal-400 to-emerald-400",
    badge: "bg-teal-50 text-teal-700 border-teal-200"
  },
  {
    step: 6,
    title: "CONTINUE",
    subtitle: "Student continues with saved progress.",
    desc: "Students continue answering exam questions seamlessly. Because student responses and active timers are decoupled from application releases, zero data is lost.",
    detail: "Mean Time to Recovery (MTTR) < 4 seconds. LocalStorage and persistent session state ensure zero disruption to candidate examinations.",
    icon: Database,
    color: "from-sky-400 to-blue-400",
    badge: "bg-sky-50 text-sky-700 border-sky-200"
  }
];

export const HowItWorksPage: React.FC = () => {
  const { triggerDeploymentFailureSimulation, isSimulating, setActivePage } = useSystem();
  const [activeStepIdx, setActiveStepIdx] = useState(0);

  const currentStep = SIX_STEPS[activeStepIdx];
  const Icon = currentStep.icon;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12 relative overflow-hidden">
      
      {/* Decorative ambient background clouds and sparkles */}
      <div className="absolute top-10 left-10 text-pink-200/50 animate-cloud-drift pointer-events-none -z-10">
        <Cloud className="w-24 h-24" />
      </div>
      <div className="absolute top-40 right-16 text-purple-200/50 animate-cloud-drift pointer-events-none -z-10" style={{ animationDelay: '4s' }}>
        <Cloud className="w-20 h-20" />
      </div>

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-purple-200 text-xs font-mono text-purple-700 font-bold shadow-2xs">
          <Sparkles className="w-3.5 h-3.5 text-pink-500 animate-star-twinkle" />
          <span>Automated DevOps Reliability</span>
        </div>
        
        {/* Title: Exact requested title "Your Exam Has a Safety Net ✨" */}
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
          Your Exam Has a Safety Net ✨
        </h1>
        
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-2xl mx-auto">
          Six connected pastel 3D stages show how automated rollback protects online exams from software defects, maintaining seamless session continuity for college examiners and students.
        </p>
      </div>

      {/* Interactive 6-Step Visual Flow with Rainbow Connectors */}
      <div className="bg-white/90 backdrop-blur-md border border-purple-100 rounded-3xl p-6 sm:p-10 shadow-xs space-y-8 relative">
        
        {/* Rainbow Accent Header Bar */}
        <div className="h-1.5 w-full bg-gradient-to-r from-pink-300 via-purple-300 via-sky-300 to-teal-300 rounded-full" />

        {/* 6 Connected Step Buttons with Rainbow Connectors */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 relative">
          {SIX_STEPS.map((s, idx) => {
            const isSelected = activeStepIdx === idx;
            const StepIcon = s.icon;

            return (
              <button
                key={s.step}
                id={`how-step-btn-${s.step}`}
                onClick={() => setActiveStepIdx(idx)}
                className={`p-4 rounded-2xl border text-left transition-all flex flex-col justify-between relative cursor-pointer group ${
                  isSelected
                    ? 'bg-gradient-to-b from-white to-purple-50/80 border-purple-400 ring-2 ring-purple-300 shadow-md scale-[1.02]'
                    : 'bg-white/80 hover:bg-purple-50/40 border-purple-100/90 hover:border-purple-200'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className={`w-8 h-8 rounded-xl bg-gradient-to-tr ${s.color} text-white flex items-center justify-center shadow-2xs group-hover:scale-105 transition-transform`}>
                      <StepIcon className="w-4 h-4" />
                    </div>
                    <span className="text-[11px] font-mono font-bold text-purple-300">
                      0{s.step}
                    </span>
                  </div>

                  <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${s.badge} border inline-block mb-1`}>
                    {s.title}
                  </span>

                  <h3 className="text-xs font-bold text-slate-800 leading-tight">
                    {s.subtitle}
                  </h3>
                </div>

                <div className="mt-3 pt-2 border-t border-purple-50 text-[10px] font-mono text-purple-600 font-bold flex items-center justify-between">
                  <span>Step {s.step} of 6</span>
                  {isSelected && <span className="text-pink-500">Active ✨</span>}
                </div>
              </button>
            );
          })}
        </div>

        {/* Deep Dive on Selected Step */}
        <div className="bg-gradient-to-br from-purple-50/40 via-white to-pink-50/30 border border-purple-100 rounded-2xl p-6 sm:p-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            
            <div className="md:col-span-8 space-y-4">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${currentStep.color} flex items-center justify-center text-white shadow-xs`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs font-mono font-bold text-purple-600 uppercase">
                    Stage {currentStep.step}: {currentStep.title}
                  </div>
                  <h3 className="text-lg sm:text-xl font-extrabold text-slate-900">
                    {currentStep.subtitle}
                  </h3>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                {currentStep.desc}
              </p>

              <div className="p-4 rounded-xl bg-white border border-purple-100 shadow-2xs">
                <span className="text-xs font-bold text-slate-800 block mb-1">
                  DevOps Telemetry & Architecture Behavior:
                </span>
                <p className="text-xs text-slate-600 leading-relaxed font-mono">
                  {currentStep.detail}
                </p>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={() => setActiveStepIdx((activeStepIdx + 1) % SIX_STEPS.length)}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-bold flex items-center gap-2 shadow-xs hover:from-purple-700 hover:to-pink-700 transition-all"
                >
                  <span>Next Stage ({((activeStepIdx + 1) % SIX_STEPS.length) + 1} of 6)</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={triggerDeploymentFailureSimulation}
                  disabled={isSimulating}
                  className="px-4 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-xs font-bold transition-colors"
                >
                  Simulate in Live Modal
                </button>
              </div>
            </div>

            <div className="md:col-span-4 space-y-3">
              <div className="p-5 rounded-2xl bg-white border border-purple-100 shadow-2xs space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-300" />
                  <span>Key Examiner Takeaway</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  During automated rollback, the web container version is rolled back, but candidate submissions and active timers are saved in an isolated layer.
                </p>
                <div className="pt-2 border-t border-purple-50 text-[11px] font-mono text-purple-700 flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-teal-500" />
                  <span>Verified B.Tech IT Architecture</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-teal-50/60 border border-teal-200 text-teal-900 text-xs space-y-1">
                <span className="font-bold block">Autonomous Failover</span>
                <span className="text-[11px] text-teal-800">
                  Requires zero manual intervention from college exam proctors.
                </span>
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* Complete Lifecycle Flow Summary */}
      <div className="bg-gradient-to-b from-white to-purple-50/30 border border-purple-100 rounded-3xl p-6 sm:p-8 space-y-6">
        <h3 className="text-base font-extrabold text-slate-900">
          Complete Automated Rollback Lifecycle Sequence
        </h3>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono">
          <div className="p-3 rounded-xl bg-pink-50 border border-pink-200 text-pink-800 text-center w-full">
            NEW VERSION DEPLOYED
          </div>
          <span className="text-purple-400 font-bold text-lg">↓</span>
          <div className="p-3 rounded-xl bg-purple-50 border border-purple-200 text-purple-800 text-center w-full">
            CONTINUOUS MONITORING
          </div>
          <span className="text-purple-400 font-bold text-lg">↓</span>
          <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-center w-full">
            FAILURE DETECTED
          </div>
          <span className="text-purple-400 font-bold text-lg">↓</span>
          <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-center w-full">
            ROLLBACK TRIGGERED
          </div>
          <span className="text-purple-400 font-bold text-lg">↓</span>
          <div className="p-3 rounded-xl bg-teal-50 border border-teal-200 text-teal-800 text-center w-full">
            STABLE VERSION RESTORED
          </div>
          <span className="text-purple-400 font-bold text-lg">↓</span>
          <div className="p-3 rounded-xl bg-sky-50 border border-sky-200 text-sky-800 text-center w-full">
            EXAM SESSION CONTINUES
          </div>
        </div>
      </div>

    </div>
  );
};
