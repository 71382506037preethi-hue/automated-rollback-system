import React from 'react';
import { useSystem } from '../context/SystemContext';
import { 
  ShieldCheck, 
  ArrowRight, 
  Activity, 
  RotateCcw, 
  CheckCircle2, 
  Server, 
  Workflow, 
  AlertTriangle,
  Play,
  Terminal,
  Database,
  Lock,
  Layers,
  Sparkles,
  Info,
  Clock,
  Check,
  GraduationCap,
  BookOpen,
  Laptop,
  CheckCircle,
  FileText,
  Flame,
  ArrowDown,
  Star,
  Cloud,
  Heart
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const { 
    currentUser,
    setActivePage, 
    triggerDeploymentFailureSimulation, 
    resetToInitialHealthyState,
    isSimulating, 
    systemStatus, 
    currentVersion,
    stableVersion,
    activeExamSessions
  } = useSystem();

  const handleGoToExam = () => {
    if (currentUser) {
      setActivePage('dashboard');
    } else {
      setActivePage('login');
    }
  };

  // 6 connected pastel cards for "Your Exam Has a Safety Net ✨"
  const safetyNetCards = [
    {
      num: 1,
      title: 'DEPLOY',
      subtitle: 'New version released.',
      desc: 'A software update or canary build is introduced into the examination environment.',
      icon: Server,
      color: 'from-pink-400 to-rose-400',
      tagBg: 'bg-pink-100 text-pink-700 border-pink-200'
    },
    {
      num: 2,
      title: 'MONITOR',
      subtitle: 'System health is continuously checked.',
      desc: 'Synthetic health probes verify HTTP 200 response rates and sub-second API latency.',
      icon: Activity,
      color: 'from-purple-400 to-indigo-400',
      tagBg: 'bg-purple-100 text-purple-700 border-purple-200'
    },
    {
      num: 3,
      title: 'DETECT',
      subtitle: 'A problem is identified.',
      desc: 'Watchdog catches error rate spikes or runtime crashes before candidates submit.',
      icon: AlertTriangle,
      color: 'from-rose-400 to-amber-400',
      tagBg: 'bg-rose-100 text-rose-700 border-rose-200'
    },
    {
      num: 4,
      title: 'ROLLBACK',
      subtitle: 'Previous stable version is restored automatically.',
      desc: 'The orchestrator reroutes ingress traffic back to the immutable stable container image.',
      icon: RotateCcw,
      color: 'from-amber-400 to-yellow-400',
      tagBg: 'bg-amber-100 text-amber-700 border-amber-200'
    },
    {
      num: 5,
      title: 'RECOVER',
      subtitle: 'Exam service becomes healthy again.',
      desc: 'Container ingress recovers in < 4 seconds with verified 100% operational health.',
      icon: CheckCircle2,
      color: 'from-teal-400 to-emerald-400',
      tagBg: 'bg-teal-100 text-teal-700 border-teal-200'
    },
    {
      num: 6,
      title: 'CONTINUE',
      subtitle: 'Student continues with saved progress.',
      desc: 'Exam timers and answers remain intact, allowing uninterrupted test completion.',
      icon: Database,
      color: 'from-sky-400 to-blue-400',
      tagBg: 'bg-sky-100 text-sky-700 border-sky-200'
    }
  ];

  // 8-Stage 3D DevOps Pipeline with rainbow connectors
  const pipelineStages = [
    { id: 'code', label: 'Code', role: 'Dev', icon: '💻', color: 'from-pink-400 to-rose-400' },
    { id: 'build', label: 'Build', role: 'CI/CD', icon: '📦', color: 'from-rose-400 to-purple-400' },
    { id: 'test', label: 'Test', role: 'QA', icon: '🧪', color: 'from-purple-400 to-indigo-400' },
    { id: 'deploy', label: 'Deploy', role: 'Canary', icon: '🚀', color: 'from-indigo-400 to-sky-400' },
    { id: 'monitor', label: 'Monitor', role: 'Watchdog', icon: '📡', color: 'from-sky-400 to-teal-400' },
    { id: 'detect', label: 'Detect', role: 'Anomaly', icon: '🔍', color: 'from-teal-400 to-amber-400' },
    { id: 'rollback', label: 'Rollback', role: 'Self-Healing', icon: '🔄', color: 'from-amber-400 to-rose-400' },
    { id: 'recover', label: 'Recover', role: 'Zero-Loss', icon: '✨', color: 'from-rose-400 to-pink-400' }
  ];

  return (
    <div className="space-y-20 pb-20 overflow-hidden">
      
      {/* 1. HERO SECTION WITH 3D WORKSPACE */}
      <section className="relative pt-8 sm:pt-14 pb-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        
        {/* Soft pastel background ambient gradient clouds */}
        <div className="absolute top-10 left-1/4 w-96 h-96 bg-pink-200/30 rounded-full blur-3xl pointer-events-none -z-10 animate-cloud-drift" />
        <div className="absolute top-20 right-10 w-96 h-96 bg-purple-200/35 rounded-full blur-3xl pointer-events-none -z-10" />
        <div className="absolute bottom-10 left-10 w-80 h-80 bg-sky-200/30 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Hero Content */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Academic title label with subtle sparkle */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-pink-200/80 text-purple-700 text-xs font-bold shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-pink-500 animate-star-twinkle" />
              <span>DevOps-Based Examination Reliability System</span>
            </div>

            {/* Main Hero Heading: Keep exact words + pastel gradient treatment */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.14]">
              Your Exam. Your Focus. <br />
              <span className="rainbow-shimmer-text">
                We Keep It Running.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl font-normal">
              A smarter examination platform designed to keep your exam experience stable, even when unexpected system problems occur.
            </p>

            {/* Academic prototype note */}
            <div className="text-xs text-slate-500 font-mono flex items-center gap-2 flex-wrap">
              <span className="px-2.5 py-0.5 rounded-full bg-purple-50 text-purple-700 border border-purple-200 font-bold shadow-2xs">
                B.Tech IT Prototype
              </span>
              <span className="text-pink-300">•</span>
              <span>Automated Rollback using Continuous DevOps Telemetry</span>
            </div>

            {/* Primary Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                id="hero-go-to-exam-btn"
                onClick={handleGoToExam}
                className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-extrabold text-sm shadow-md shadow-purple-200 hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer group"
              >
                <span>{currentUser ? 'Go to My Exams' : 'Go to Examination'}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                id="hero-how-it-works-btn"
                onClick={() => setActivePage('how_it_works')}
                className="px-6 py-3.5 rounded-2xl bg-white/90 hover:bg-white text-purple-700 hover:text-purple-900 font-bold text-sm border border-purple-200 shadow-2xs hover:shadow-xs transition-all flex items-center gap-2 cursor-pointer"
              >
                <Workflow className="w-4 h-4 text-purple-500" />
                <span>How It Works</span>
              </button>

              <button
                id="hero-system-recovery-btn"
                onClick={() => setActivePage('recovery')}
                className="px-4 py-3.5 rounded-2xl bg-gradient-to-r from-pink-50 to-purple-50 hover:from-pink-100 hover:to-purple-100 text-purple-700 font-bold text-xs border border-purple-200 transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs"
              >
                <RotateCcw className="w-3.5 h-3.5 text-pink-500" />
                <span>Test Recovery</span>
              </button>
            </div>

            {/* Micro proof badges */}
            <div className="pt-4 border-t border-purple-100/80 grid grid-cols-3 gap-4 text-xs">
              <div className="p-3 rounded-2xl bg-white/80 border border-pink-100 shadow-2xs">
                <span className="font-bold text-purple-900 block text-sm">0% Data Loss</span>
                <span className="text-slate-500 text-[11px]">Decoupled answers</span>
              </div>
              <div className="p-3 rounded-2xl bg-white/80 border border-purple-100 shadow-2xs">
                <span className="font-bold text-purple-900 block text-sm">&lt; 4.0s Rollback</span>
                <span className="text-slate-500 text-[11px]">Instant failover</span>
              </div>
              <div className="p-3 rounded-2xl bg-white/80 border border-purple-100 shadow-2xs">
                <span className="font-bold text-purple-900 block text-sm">100% Continuity</span>
                <span className="text-slate-500 text-[11px]">Uninterrupted timer</span>
              </div>
            </div>

          </div>

          {/* Right Hero Visual: 3D Digital Student Study Workspace with Pastel Unicorn Figurine */}
          <div className="lg:col-span-5 relative">
            
            {/* Layered 3D Card Stage: Pearl Surface with Iridescent Glow */}
            <div className="relative mx-auto max-w-md bg-gradient-to-b from-white/95 via-purple-50/40 to-pink-50/40 backdrop-blur-xl border border-purple-100/90 rounded-3xl p-6 shadow-xl shadow-purple-200/40">
              
              {/* Floating Status Pill top-left */}
              <div className="absolute -top-4 -left-3 px-4 py-2 rounded-2xl bg-white border border-pink-200 shadow-md flex items-center gap-2 text-xs font-bold text-purple-900 animate-unicorn-float">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                <span>Exam in Progress ✨</span>
              </div>

              {/* Floating Health Badge top-right */}
              <div className="absolute -top-3 -right-3 px-3 py-1.5 rounded-2xl bg-white border border-teal-200 text-teal-700 shadow-md flex items-center gap-1.5 text-xs font-bold font-mono animate-unicorn-float" style={{ animationDelay: '1s' }}>
                <ShieldCheck className="w-3.5 h-3.5 text-teal-500" />
                <span>Health: 100%</span>
              </div>

              {/* Isometric 3D Desk & Study Scene SVG */}
              <div className="w-full h-80 sm:h-96 flex items-center justify-center relative">
                <svg
                  viewBox="0 0 500 420"
                  className="w-full h-full drop-shadow-sm select-none"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <linearGradient id="unicornDeskTop" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#FFFFFF" />
                      <stop offset="50%" stopColor="#FAF5FF" />
                      <stop offset="100%" stopColor="#FDF2F8" />
                    </linearGradient>
                    <linearGradient id="unicornHornGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#FDE047" />
                      <stop offset="50%" stopColor="#F472B6" />
                      <stop offset="100%" stopColor="#38BDF8" />
                    </linearGradient>
                    <linearGradient id="unicornManeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#F472B6" />
                      <stop offset="50%" stopColor="#C084FC" />
                      <stop offset="100%" stopColor="#67E8F9" />
                    </linearGradient>
                    <linearGradient id="laptopScreenGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#3B82F6" />
                      <stop offset="100%" stopColor="#8B5CF6" />
                    </linearGradient>
                  </defs>

                  {/* Soft ground shadow with pastel tone */}
                  <ellipse cx="250" cy="370" rx="190" ry="35" fill="#E9D5FF" fillOpacity="0.4" />

                  {/* Soft Background Clouds drifting */}
                  <g className="animate-cloud-drift" opacity="0.85">
                    <path d="M70,70 Q80,50 100,55 Q115,40 135,50 Q150,55 145,70 Q150,85 130,85 L85,85 Q65,85 70,70 Z" fill="#FFFFFF" filter="drop-shadow(0px 3px 6px rgba(236,72,153,0.08))" />
                    <circle cx="105" cy="65" r="4" fill="#FDF2F8" />
                    <circle cx="125" cy="68" r="3" fill="#FDF2F8" />
                  </g>
                  <g className="animate-cloud-drift" style={{ animationDelay: '3s' }} opacity="0.8">
                    <path d="M360,50 Q370,35 385,40 Q395,30 410,38 Q420,42 418,55 Q422,65 408,65 L370,65 Q355,65 360,50 Z" fill="#FFFFFF" filter="drop-shadow(0px 3px 6px rgba(168,85,247,0.08))" />
                  </g>

                  {/* Floating Twinkling Stars */}
                  <g className="animate-star-twinkle">
                    <polygon points="170,40 173,48 181,51 173,54 170,62 167,54 159,51 167,48" fill="#FDE047" />
                    <polygon points="320,35 322,40 327,42 322,44 320,49 318,44 313,42 318,40" fill="#F472B6" />
                    <polygon points="90,140 92,145 97,147 92,149 90,154 88,149 83,147 88,145" fill="#C084FC" />
                    <polygon points="410,130 412,135 417,137 412,139 410,144 408,139 403,137 408,135" fill="#38BDF8" />
                  </g>

                  {/* 3D Modern Study Desk Surface (Pearl White + Lavender Edges) */}
                  <polygon points="120,270 250,220 380,270 250,320" fill="url(#unicornDeskTop)" stroke="#E9D5FF" strokeWidth="2" />
                  <polygon points="120,270 120,285 250,335 250,320" fill="#F3E8FF" />
                  <polygon points="380,270 380,285 250,335 250,320" fill="#E9D5FF" />

                  {/* Desk Legs with Soft Lavender Chrome Finish */}
                  <line x1="125" y1="285" x2="125" y2="355" stroke="#C4B5FD" strokeWidth="6" strokeLinecap="round" />
                  <line x1="375" y1="285" x2="375" y2="355" stroke="#C4B5FD" strokeWidth="6" strokeLinecap="round" />
                  <line x1="250" y1="335" x2="250" y2="375" stroke="#A78BFA" strokeWidth="6" strokeLinecap="round" />

                  {/* 3D Laptop on Desk */}
                  <polygon points="205,258 250,238 295,258 250,278" fill="#E2E8F0" />
                  <polygon points="208,259 250,241 292,259 250,276" fill="#F1F5F9" />
                  {/* Laptop Screen Standing */}
                  <polygon points="215,250 215,180 285,180 285,250" fill="#1E1B4B" rx="4" />
                  <polygon points="218,248 218,183 282,183 282,248" fill="url(#laptopScreenGrad)" />
                  {/* Exam question mock on laptop screen */}
                  <rect x="223" y="189" width="40" height="4" rx="2" fill="#FFFFFF" />
                  <rect x="223" y="197" width="50" height="2" rx="1" fill="#DDD6FE" />
                  <rect x="223" y="202" width="46" height="2" rx="1" fill="#DDD6FE" />
                  <rect x="223" y="209" width="12" height="4" rx="1" fill="#34D399" />
                  <rect x="238" y="209" width="12" height="4" rx="1" fill="#E0E7FF" />
                  <rect x="253" y="209" width="12" height="4" rx="1" fill="#E0E7FF" />
                  {/* Tiny exam checkmark on laptop */}
                  <circle cx="270" cy="235" r="5" fill="#10B981" />
                  <path d="M268 235 L270 237 L273 233" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />

                  {/* Stack of 3D Pastel Study Textbooks (Lavender, Baby Blue, Mint Pink) */}
                  {/* Book 1: Lavender */}
                  <polygon points="145,268 185,253 205,263 165,278" fill="#A855F7" />
                  <polygon points="145,268 145,276 165,286 165,278" fill="#7E22CE" />
                  <polygon points="205,263 205,271 165,286 165,278" fill="#C084FC" />
                  {/* Book 2: Baby Blue */}
                  <polygon points="143,260 183,245 203,255 163,270" fill="#38BDF8" />
                  <polygon points="143,260 143,268 163,278 163,270" fill="#0284C7" />
                  <polygon points="203,255 203,263 163,278 163,270" fill="#7DD3FC" />
                  {/* Book 3: Pastel Pink */}
                  <polygon points="141,252 181,237 201,247 161,262" fill="#F472B6" />
                  <polygon points="141,252 141,260 161,270 161,262" fill="#DB2777" />
                  <polygon points="201,247 201,255 161,270 161,262" fill="#FBCFE8" />

                  {/* Notebook & Pastel Pencil on Right side */}
                  <polygon points="305,258 340,243 360,256 325,271" fill="#FFFFFF" stroke="#E9D5FF" strokeWidth="1" />
                  <line x1="311" y1="256" x2="330" y2="264" stroke="#C4B5FD" strokeWidth="1" />
                  <line x1="315" y1="253" x2="335" y2="261" stroke="#C4B5FD" strokeWidth="1" />
                  {/* Pastel Yellow/Gold Pencil */}
                  <line x1="340" y1="270" x2="355" y2="258" stroke="#FBBF24" strokeWidth="2.5" strokeLinecap="round" />

                  {/* Potted Small Succulent Plant */}
                  <ellipse cx="355" cy="242" rx="10" ry="4" fill="#FCE7F3" />
                  <polygon points="347,242 349,257 361,257 363,242" fill="#FBCFE8" />
                  <circle cx="355" cy="237" r="6" fill="#34D399" />
                  <circle cx="352" cy="232" r="5" fill="#10B981" />
                  <circle cx="359" cy="234" r="5" fill="#6EE7B7" />

                  {/* ==================================================== */}
                  {/* SMALL CUTE UNICORN DECORATIVE OBJECT ON DESK */}
                  {/* Tasteful ceramic decorative figurine with spiral horn & pastel mane */}
                  {/* ==================================================== */}
                  <g transform="translate(180, 220)" className="animate-unicorn-bob">
                    {/* Figurine base shadow */}
                    <ellipse cx="20" cy="38" rx="12" ry="4" fill="#E9D5FF" opacity="0.6" />
                    {/* Cute rounded unicorn body (Pearl White) */}
                    <path d="M12,24 Q10,34 18,36 Q28,36 28,26 Q28,20 22,18 Q14,18 12,24 Z" fill="#FFFFFF" stroke="#E9D5FF" strokeWidth="1" />
                    {/* Unicorn cute head & neck */}
                    <path d="M14,19 Q12,13 18,10 Q24,10 24,16 Q24,19 19,21 Z" fill="#FFFFFF" stroke="#E9D5FF" strokeWidth="0.8" />
                    {/* Small cute ear */}
                    <polygon points="17,10 19,6 21,10" fill="#FBCFE8" />
                    {/* Gentle sleepy/happy eye */}
                    <path d="M15,14 Q17,17 19,14" stroke="#9333EA" strokeWidth="1" fill="none" strokeLinecap="round" />
                    {/* Cute blush cheek */}
                    <circle cx="15" cy="17" r="1.5" fill="#F472B6" opacity="0.8" />
                    {/* Magical Iridescent / Golden Spiral Horn */}
                    <polygon points="19,10 22,0 23,10" fill="url(#unicornHornGrad)" filter="drop-shadow(0px 1px 2px rgba(251,191,36,0.5))" />
                    {/* Delicate Pastel Rainbow Mane curls */}
                    <path d="M21,10 Q26,12 25,18 Q27,22 23,26" stroke="url(#unicornManeGrad)" strokeWidth="2" fill="none" strokeLinecap="round" />
                    {/* Tiny Star on the Unicorn Flank */}
                    <polygon points="24,28 25,30 27,31 25,32 24,34 23,32 21,31 23,30" fill="#FDE047" />
                  </g>

                  {/* 3D Floating Graduation Cap with Gold Tassel */}
                  <g transform="translate(315, 85)" className="animate-unicorn-float" style={{ animationDelay: '0.8s' }}>
                    <polygon points="50,15 90,30 50,45 10,30" fill="#6366F1" />
                    <polygon points="50,45 90,30 90,35 50,50" fill="#4F46E5" />
                    <polygon points="50,45 10,30 10,35 50,50" fill="#4338CA" />
                    <path d="M50,22 L50,10" stroke="#FDE047" strokeWidth="2" />
                    <circle cx="50" cy="10" r="2" fill="#F59E0B" />
                    <line x1="50" y1="22" x2="75" y2="35" stroke="#FDE047" strokeWidth="1.5" />
                    <circle cx="75" cy="35" r="3" fill="#F59E0B" />
                  </g>

                  {/* Floating Soft Cloud Card ("Answers Saved ✨") */}
                  <g transform="translate(75, 110)" className="animate-unicorn-float" style={{ animationDelay: '1.6s' }}>
                    <rect x="0" y="0" width="112" height="36" rx="18" fill="#FFFFFF" filter="drop-shadow(0px 4px 12px rgba(192,132,252,0.25))" />
                    <circle cx="19" cy="18" r="9" fill="#F5F3FF" />
                    <path d="M15 18 L18 21 L24 15" stroke="#8B5CF6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <text x="34" y="22" fontFamily="sans-serif" fontSize="10.5" fontWeight="bold" fill="#6B21A8">Answers Saved ✨</text>
                  </g>
                </svg>
              </div>

              {/* Floating Bottom Card: Real-Time DevOps Guard */}
              <div className="mt-2 p-3.5 rounded-2xl bg-white/95 border border-purple-100 shadow-sm flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                    <Activity className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-800 block">
                      Active Image: <span className="font-mono text-purple-700">{currentVersion}</span>
                    </span>
                    <span className="text-[10px] text-slate-400">
                      Rollback target: {stableVersion}
                    </span>
                  </div>
                </div>

                <button
                  id="hero-quick-simulate-btn"
                  onClick={triggerDeploymentFailureSimulation}
                  disabled={isSimulating}
                  className="px-3 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-xs font-bold flex items-center gap-1 transition-colors"
                >
                  <Flame className="w-3.5 h-3.5 text-rose-600" />
                  <span>Test Crash</span>
                </button>
              </div>

            </div>

          </div>

        </div>

      </section>

      {/* 2. MAGICAL "HOW IT WORKS" SECTION: "Your Exam Has a Safety Net ✨" */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white/80 backdrop-blur-md border border-purple-100/90 rounded-3xl p-6 sm:p-10 shadow-sm space-y-8 relative overflow-hidden">
          
          {/* Subtle background decorative stars */}
          <div className="absolute top-4 right-8 text-purple-300 opacity-60 animate-star-twinkle">
            <Star className="w-6 h-6 fill-purple-200" />
          </div>
          <div className="absolute bottom-6 left-6 text-pink-300 opacity-60 animate-star-twinkle" style={{ animationDelay: '1.2s' }}>
            <Sparkles className="w-6 h-6" />
          </div>

          <div className="text-center max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 text-purple-700 text-xs font-mono font-bold border border-purple-200 mb-2 shadow-2xs">
              <Sparkles className="w-3 h-3 text-pink-500" />
              <span>DevOps Self-Healing Mechanism</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Your Exam Has a Safety Net ✨
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
              Six connected stages show how automated rollback detects application defects, recovers the previous stable version, and keeps your examination session running without data loss.
            </p>
          </div>

          {/* 6 Connected 3D Pastel Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 relative">
            {safetyNetCards.map((card, idx) => {
              const Icon = card.icon;
              return (
                <div
                  key={card.title}
                  className="bg-white/95 border border-purple-100 hover:border-pink-300 rounded-2xl p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group relative"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className={`w-10 h-10 rounded-2xl bg-gradient-to-tr ${card.color} flex items-center justify-center text-white shadow-xs group-hover:scale-105 transition-transform`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-xs font-extrabold font-mono text-purple-300">
                        0{card.num}
                      </span>
                    </div>

                    <div className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${card.tagBg} border inline-block mb-2`}>
                      {card.title}
                    </div>

                    <h3 className="text-xs font-bold text-slate-800 leading-tight">
                      {card.subtitle}
                    </h3>

                    <p className="text-[11px] text-slate-500 leading-relaxed mt-2">
                      {card.desc}
                    </p>
                  </div>

                  {/* Rainbow connector arrow between cards on large screens */}
                  {idx < safetyNetCards.length - 1 && (
                    <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-10">
                      <div className="w-6 h-6 rounded-full bg-white border border-pink-200 flex items-center justify-center text-xs font-bold text-purple-400 shadow-2xs">
                        →
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="text-center pt-2">
            <button
              onClick={() => setActivePage('how_it_works')}
              className="text-xs font-bold text-purple-700 hover:text-purple-900 underline underline-offset-4"
            >
              Explore the detailed technical walkthrough →
            </button>
          </div>

        </div>
      </section>

      {/* 3. 3D DEVOPS PIPELINE VISUALIZATION (Rainbow Gradient Connecting Lines) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white border border-purple-100 rounded-3xl p-6 sm:p-10 shadow-sm space-y-8">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-purple-100 pb-6">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-purple-600 font-mono">
                Continuous Delivery & Rollback
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-1">
                3D DevOps Examination Pipeline
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Visual pipeline showing continuous progression from code check-in to automated cluster recovery.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className={`px-3 py-1 rounded-full text-xs font-mono font-bold shadow-2xs ${
                systemStatus === 'critical' ? 'bg-rose-100 text-rose-800 border border-rose-300 animate-pulse' :
                systemStatus === 'rolling_back' ? 'bg-purple-100 text-purple-800 border border-purple-300' :
                'bg-emerald-100 text-emerald-800 border border-emerald-300'
              }`}>
                Pipeline State: {systemStatus.toUpperCase()}
              </span>
            </div>
          </div>

          {/* Rainbow Gradient Connecting Bar above cards */}
          <div className="h-1.5 w-full bg-gradient-to-r from-pink-300 via-purple-300 via-sky-300 to-teal-300 rounded-full" />

          {/* Connected 8-Stage Horizontal Pipeline Flow */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
            {pipelineStages.map((stage, idx) => {
              const isFailureStage = stage.id === 'detect' || stage.id === 'rollback';
              const isAlerting = isFailureStage && (systemStatus === 'critical' || systemStatus === 'rolling_back');

              return (
                <div
                  key={stage.id}
                  className={`p-3.5 rounded-2xl border text-center transition-all flex flex-col justify-between ${
                    isAlerting
                      ? 'bg-rose-50 border-rose-300 ring-2 ring-rose-400 shadow-sm'
                      : systemStatus === 'recovered' && stage.id === 'recover'
                      ? 'bg-emerald-50 border-emerald-300 ring-2 ring-emerald-400 shadow-sm'
                      : 'bg-gradient-to-b from-white to-purple-50/40 border-purple-100'
                  }`}
                >
                  <div className="text-lg mb-1">{stage.icon}</div>
                  <div className="text-[10px] font-mono text-purple-400 font-bold mb-0.5">
                    {idx + 1}. {stage.role}
                  </div>
                  <div className={`text-xs font-bold font-sans ${
                    isAlerting ? 'text-rose-700' : 'text-slate-800'
                  }`}>
                    {stage.label}
                  </div>
                  <div className="mt-2 pt-2 border-t border-purple-100/60 text-[10px] font-mono text-slate-500">
                    {stage.id === 'monitor' ? '1000ms' : stage.id === 'rollback' ? '<4.0s' : 'Automated'}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="p-4 rounded-2xl bg-purple-50/70 border border-purple-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-purple-900">
            <span className="flex items-center gap-2">
              <Info className="w-4 h-4 text-purple-600 flex-shrink-0" />
              <span>When health checks detect high error rates during canary release, <strong>Detect</strong> signals <strong>Rollback</strong> to immediately restore verified release <strong>v1.4</strong>.</span>
            </span>
            <button
              onClick={() => setActivePage('architecture')}
              className="font-bold text-purple-700 hover:text-purple-900 underline whitespace-nowrap"
            >
              Detailed Architecture →
            </button>
          </div>

        </div>
      </section>

      {/* 4. IMPORTANT DATA PRESERVATION VISUAL: "Your Progress Stays Safe 💗" */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-b from-white to-pink-50/30 border border-pink-100 rounded-3xl p-6 sm:p-10 shadow-sm space-y-6">
          
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-50 text-pink-700 text-xs font-mono font-bold border border-pink-200 mb-2">
              <Heart className="w-3.5 h-3.5 text-pink-500 fill-pink-400" />
              <span>Zero-Loss Architecture</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-1">
              Your Progress Stays Safe 💗
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
              Rollback restores the application version. Student account information and examination progress are stored separately and are preserved.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Path 1: APPLICATION LAYER */}
            <div className="p-6 rounded-3xl bg-white border border-rose-100 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-600">
                    <Layers className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">APPLICATION LAYER</h3>
                    <span className="text-[11px] text-slate-500 font-mono">Stateless Container & Routing</span>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full text-[11px] font-mono font-bold bg-rose-50 text-rose-700 border border-rose-200">
                  Swapped on Rollback
                </span>
              </div>

              {/* Exact required Application Flow */}
              <div className="p-4 rounded-2xl bg-rose-50/50 border border-rose-100 text-xs font-mono space-y-2">
                <div className="flex items-center justify-between text-rose-700 font-bold">
                  <span>Candidate Release:</span>
                  <span>v1.5 ❌</span>
                </div>
                <div className="flex items-center justify-center text-rose-400">
                  <span>↓ Automatic Rollback ↓</span>
                </div>
                <div className="flex items-center justify-between text-emerald-700 font-bold">
                  <span>Restored Release:</span>
                  <span>v1.4 ✓</span>
                </div>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                When defective version v1.5 experiences errors, the ingress controller immediately reverts network traffic to stable container tag <strong>v1.4</strong>.
              </p>
            </div>

            {/* Path 2: EXAM DATA LAYER */}
            <div className="p-6 rounded-3xl bg-white border border-teal-100 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-teal-50 border border-teal-200 flex items-center justify-center text-teal-600">
                    <Database className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">EXAM DATA LAYER</h3>
                    <span className="text-[11px] text-slate-500 font-mono">Decoupled & 100% Preserved</span>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full text-[11px] font-mono font-bold bg-teal-50 text-teal-700 border border-teal-200">
                  100% Protected
                </span>
              </div>

              {/* Exact required Exam Data Checkpoints */}
              <div className="p-4 rounded-2xl bg-teal-50/50 border border-teal-100 text-xs font-mono space-y-2">
                <div className="flex items-center justify-between text-teal-800 font-semibold">
                  <span>Selected Answers:</span>
                  <span className="text-teal-600 font-bold">Answers ✓</span>
                </div>
                <div className="flex items-center justify-between text-teal-800 font-semibold">
                  <span>Exam Progress:</span>
                  <span className="text-teal-600 font-bold">Progress ✓</span>
                </div>
                <div className="flex items-center justify-between text-teal-800 font-semibold">
                  <span>Student Credentials:</span>
                  <span className="text-teal-600 font-bold">Student Account ✓</span>
                </div>
                <div className="flex items-center justify-between text-teal-800 font-semibold">
                  <span>Active Session & Clock:</span>
                  <span className="text-teal-600 font-bold">Session Information ✓</span>
                </div>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                Student account information and examination progress are stored separately in dedicated storage and are completely preserved.
              </p>
            </div>

          </div>

        </div>
      </section>

    </div>
  );
};
