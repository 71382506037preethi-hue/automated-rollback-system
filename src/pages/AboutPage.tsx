import React, { useState } from 'react';
import { useSystem } from '../context/SystemContext';
import { VIVA_QUESTIONS } from '../data/mockData';
import { 
  Info, 
  GraduationCap, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  Terminal, 
  Copy, 
  Check, 
  BookOpen,
  Sparkles,
  ShieldCheck,
  RotateCcw
} from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { setActivePage, triggerDeploymentFailureSimulation } = useSystem();

  const [expandedVivaIndex, setExpandedVivaIndex] = useState<number | null>(0);
  const [copiedCode, setCopiedCode] = useState(false);

  const toggleViva = (index: number) => {
    setExpandedVivaIndex(expandedVivaIndex === index ? null : index);
  };

  const devopsConcepts = [
    {
      title: "CI/CD (Continuous Integration / Continuous Deployment)",
      desc: "Automates the building, testing, and delivery of new exam software releases without manual operator staging.",
      badge: "Automation",
      color: "from-pink-400 to-purple-400"
    },
    {
      title: "Continuous Monitoring",
      desc: "Synthetic health daemons query API response times and HTTP status codes every 1,000ms to detect early degradation.",
      badge: "Observability",
      color: "from-purple-400 to-indigo-400"
    },
    {
      title: "Automated Testing",
      desc: "Unit, regression, and load smoke tests validate functionality before traffic is routed to new container images.",
      badge: "Quality Assurance",
      color: "from-sky-400 to-blue-400"
    },
    {
      title: "Deployment (Canary Strategy)",
      desc: "A safe deployment method where a new version is initially exposed to only a fraction of exam traffic to minimize risk.",
      badge: "Release Engineering",
      color: "from-teal-400 to-emerald-400"
    },
    {
      title: "Version Control & Registry",
      desc: "Semantic container tagging (e.g. examsafe:v1.4 vs v1.5) ensures all production releases are immutable and roll-back ready.",
      badge: "Artifact Management",
      color: "from-indigo-400 to-purple-400"
    },
    {
      title: "Failure Detection",
      desc: "Algorithmic breach detection that triggers automatically when HTTP 5xx error rates cross 5% or 3 health probes fail.",
      badge: "Resilience",
      color: "from-rose-400 to-pink-400"
    },
    {
      title: "Automated Rollback",
      desc: "Autonomous ingress rerouting to the last known stable image tag without requiring human developer intervention.",
      badge: "Self-Healing",
      color: "from-amber-400 to-yellow-400"
    },
    {
      title: "System Recovery (MTTR Optimization)",
      desc: "Reducing Mean Time to Recovery from 45 minutes down to less than 4 seconds, preserving candidate exam sessions.",
      badge: "High Availability",
      color: "from-emerald-400 to-teal-400"
    }
  ];

  const localRunInstructions = `# Clone or extract the project repository
cd examsafe

# Install dependencies (React 19, Tailwind CSS, Lucide, Motion)
npm install

# Launch the development server
npm run dev

# Open http://localhost:3000 in your browser
# The interactive academic prototype will run immediately with full simulation!`;

  const copyInstructions = () => {
    navigator.clipboard.writeText(localRunInstructions);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-12">
      
      {/* Hero Overview */}
      <div className="bg-white/95 backdrop-blur-xl border border-purple-100 rounded-3xl p-6 sm:p-10 shadow-xs relative overflow-hidden space-y-6">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 border border-purple-200 text-xs font-mono text-purple-700 font-bold shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-pink-500 animate-star-twinkle" />
            <span>Academic Project Specification</span>
          </span>
          <span className="text-xs text-slate-500 font-mono hidden sm:inline">B.Tech IT Engineering Presentation</span>
        </div>

        <div className="space-y-3">
          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Automated Rollback for Online Examination System Using DevOps
          </h1>
          <p className="text-sm sm:text-base text-purple-700 font-mono font-medium">
            “ExamSafe: Your Exam. Your Focus. We Keep It Running.”
          </p>
        </div>

        {/* Academic Prototype Notice */}
        <div className="p-4 rounded-2xl bg-purple-50/60 border border-purple-100 text-xs text-slate-700 space-y-1.5 font-sans">
          <div className="font-bold flex items-center gap-2 text-purple-900">
            <Info className="w-4 h-4 text-purple-600" />
            <span>Academic Prototype & Demonstration Notice</span>
          </div>
          <p className="text-slate-600 leading-relaxed">
            This project is designed as an academic prototype for college evaluation and engineering demonstration. 
            All server logs, candidate counts, and failure spikes are simulated via interactive local state engines 
            to provide evaluators with a working, hands-on demonstration without external cloud database dependencies.
          </p>
        </div>

        {/* Purpose */}
        <div className="space-y-2 pt-2">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-purple-600" />
            <span>Project Purpose</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            The core objective of this project is to demonstrate how modern DevOps practices (Continuous Monitoring, 
            Health Checking Probes, and Automated Rollback) can fundamentally improve the reliability of mission-critical 
            online examination systems. When high concurrency or buggy software deployments cause server-side degradation, 
            the system autonomously detects the fault and reverts traffic to the verified stable release in under 4 seconds, 
            ensuring zero candidate timer desynchronization or answer loss.
          </p>
        </div>

        {/* Action buttons */}
        <div className="flex flex-wrap items-center gap-3 pt-2">
          <button
            onClick={() => setActivePage('exam')}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white text-xs font-bold transition-all shadow-xs"
          >
            Launch Student Exam View
          </button>
          <button
            onClick={() => setActivePage('devops')}
            className="px-4 py-2 rounded-xl bg-white hover:bg-purple-50 text-purple-700 text-xs font-bold border border-purple-200 transition-colors shadow-2xs"
          >
            Open DevOps Pipeline
          </button>
          <button
            onClick={triggerDeploymentFailureSimulation}
            className="px-4 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-bold border border-rose-200 transition-colors"
          >
            Simulate Failure Sequence
          </button>
        </div>

      </div>

      {/* 8 Key DevOps Concepts Grid */}
      <div className="space-y-6">
        <div>
          <span className="text-xs font-mono text-purple-700 uppercase tracking-wider font-semibold">
            Curriculum Alignment
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
            Key DevOps Concepts Implemented
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Eight essential pillars demonstrated through the ExamSafe prototype.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {devopsConcepts.map((c, idx) => (
            <div 
              key={idx}
              className="p-5 rounded-2xl bg-white border border-purple-100 hover:border-purple-300 transition-colors shadow-2xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[10px] font-mono text-purple-700 bg-purple-50 border border-purple-200 px-2 py-0.5 rounded font-bold">
                    {c.badge}
                  </span>
                  <span className="text-[10px] font-mono text-purple-300 font-bold">
                    Pillar 0{idx + 1}
                  </span>
                </div>
                <h3 className="text-sm font-bold text-slate-900 mb-1.5">
                  {c.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {c.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Viva Voce Questions & Answers Section */}
      <div className="space-y-6">
        <div>
          <span className="text-xs font-mono text-purple-700 uppercase tracking-wider font-semibold">
            Examiner Preparation
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
            Viva Voce & Technical Defense
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Common questions posed by college engineering evaluation committees.
          </p>
        </div>

        <div className="space-y-3">
          {VIVA_QUESTIONS.map((vq, idx) => {
            const isExpanded = expandedVivaIndex === idx;
            return (
              <div 
                key={idx}
                className="rounded-2xl border border-purple-100 bg-white overflow-hidden shadow-2xs transition-all"
              >
                <button
                  onClick={() => toggleViva(idx)}
                  className="w-full p-4 text-left flex items-center justify-between gap-4 hover:bg-purple-50/40 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-lg bg-purple-50 text-purple-700 border border-purple-200 text-xs font-mono font-bold flex items-center justify-center flex-shrink-0">
                      Q{idx + 1}
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-slate-800">
                      {vq.q}
                    </span>
                  </div>
                  {isExpanded ? (
                    <ChevronUp className="w-4 h-4 text-purple-600 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400 flex-shrink-0" />
                  )}
                </button>

                {isExpanded && (
                  <div className="p-4 pt-0 text-xs text-slate-600 leading-relaxed border-t border-purple-50 bg-purple-50/20 font-sans">
                    {vq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Local Run Instructions */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-purple-200 text-slate-200 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-purple-300">
            <Terminal className="w-4 h-4" />
            <span>Running Locally for Evaluation</span>
          </div>
          <button
            onClick={copyInstructions}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 border border-slate-700 transition-colors"
          >
            {copiedCode ? <Check className="w-3.5 h-3.5 text-teal-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedCode ? 'Copied' : 'Copy Commands'}</span>
          </button>
        </div>

        <pre className="text-xs font-mono p-4 rounded-2xl bg-slate-950 text-purple-200 overflow-x-auto leading-relaxed border border-slate-800">
          {localRunInstructions}
        </pre>
      </div>

    </div>
  );
};
