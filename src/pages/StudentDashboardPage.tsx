import React, { useState } from 'react';
import { useSystem } from '../context/SystemContext';
import { 
  BookOpen, 
  Clock, 
  CheckCircle2, 
  Activity, 
  ArrowRight, 
  Calendar, 
  ShieldCheck, 
  Sparkles, 
  KeyRound, 
  AlertTriangle, 
  RotateCcw, 
  Award,
  Lock,
  FileCheck2,
  HelpCircle,
  X
} from 'lucide-react';
import { Exam, StudentAccount } from '../types';

export const StudentDashboardPage: React.FC = () => {
  const { 
    currentUser, 
    role,
    exams, 
    enrolledStudents,
    allAttempts,
    setActiveExamId, 
    setActivePage, 
    verifyExamEligibility,
    startExamAttempt,
    hasStudentSubmittedExam,
    systemStatus,
    currentVersion
  } = useSystem();

  const [selectedExamForModal, setSelectedExamForModal] = useState<Exam | null>(null);
  const [examCodeInput, setExamCodeInput] = useState('');
  const [eligibilityError, setEligibilityError] = useState<string | null>(null);
  const [eligibilitySuccess, setEligibilitySuccess] = useState<boolean>(false);

  if (!currentUser || role !== 'student') {
    return (
      <div className="max-w-md mx-auto my-16 text-center px-4">
        <div className="p-8 rounded-3xl bg-white/90 backdrop-blur-xl border border-pink-200/80 shadow-lg shadow-purple-100/30">
          <Sparkles className="w-8 h-8 text-pink-500 mx-auto mb-3" />
          <h2 className="text-lg font-bold text-slate-900 mb-2">Student Portal Access</h2>
          <p className="text-slate-600 text-xs mb-4">Please authenticate with your student account to access your examination dashboard.</p>
          <button
            onClick={() => setActivePage('login')}
            className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-bold shadow-md shadow-purple-200"
          >
            Go to Student Login
          </button>
        </div>
      </div>
    );
  }

  const student = currentUser as StudentAccount;

  // Filter exams that student is enrolled in
  const myEnrolledExams = exams.filter((exam) =>
    enrolledStudents.some(
      (enr) => enr.examId === exam.id && enr.studentEmail.toLowerCase() === student.collegeEmail.toLowerCase()
    )
  );

  const handleOpenCodeModal = (exam: Exam) => {
    setSelectedExamForModal(exam);
    setExamCodeInput('');
    setEligibilityError(null);
    setEligibilitySuccess(false);
  };

  const handleVerifyAndStart = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedExamForModal) return;

    setEligibilityError(null);
    const verification = verifyExamEligibility(selectedExamForModal.id, examCodeInput);

    if (!verification.eligible) {
      setEligibilityError(verification.reason || 'Verification failed. Please contact your administrator.');
      return;
    }

    setEligibilitySuccess(true);
    setTimeout(() => {
      setActiveExamId(selectedExamForModal.id);
      startExamAttempt(selectedExamForModal.id);
      setSelectedExamForModal(null);
      setActivePage('exam');
    }, 600);
  };

  const handleResumeExam = (examId: string) => {
    setActiveExamId(examId);
    setActivePage('exam');
  };

  const handleViewResults = (examId: string) => {
    setActiveExamId(examId);
    setActivePage('student_results');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Welcome Banner: Soft Pearl Gradient with Iridescent Accent */}
      <div className="bg-gradient-to-r from-purple-100/90 via-pink-100/70 to-sky-100/90 rounded-3xl p-6 sm:p-8 border border-purple-200/70 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-pink-300/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 right-28 w-48 h-48 bg-purple-300/20 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-xs font-mono font-bold text-purple-700 border border-purple-200 shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-pink-500 animate-star-twinkle" />
              <span>Campus Examination Portal</span>
            </div>
            
            <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Welcome back, {student.fullName} ✨
            </h1>

            <p className="text-xs sm:text-sm text-slate-600 max-w-xl leading-relaxed">
              Your registered examinations are monitored in real-time. Even during cluster deployment anomalies, your answers and session state remain 100% safe.
            </p>

            <div className="flex items-center gap-3 pt-1 text-xs text-slate-500 font-mono flex-wrap">
              <span className="bg-white/80 px-2 py-0.5 rounded-lg border border-purple-100">
                ID: {student.studentId}
              </span>
              <span>•</span>
              <span className="bg-white/80 px-2 py-0.5 rounded-lg border border-purple-100">
                {student.department}
              </span>
              <span>•</span>
              <span className="bg-white/80 px-2 py-0.5 rounded-lg border border-purple-100">
                {student.year}
              </span>
              <span>•</span>
              <span className="bg-white/80 px-2 py-0.5 rounded-lg border border-purple-100">
                {student.collegeEmail}
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 flex-shrink-0">
            {/* System Status Pill */}
            <div className="p-3 rounded-2xl bg-white/80 border border-purple-100 shadow-2xs text-left space-y-1">
              <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${
                  systemStatus === 'healthy' ? 'bg-emerald-400' : 
                  systemStatus === 'recovered' ? 'bg-teal-400' : 'bg-rose-400 animate-pulse'
                }`} />
                <span className="text-[11px] font-bold text-slate-700 font-mono">DevOps Engine</span>
              </div>
              <p className="text-[10px] text-slate-500">
                {systemStatus === 'healthy' && 'Cluster Status: 100% Operational'}
                {systemStatus === 'recovered' && 'Cluster Restored to Stable v1.9'}
                {systemStatus === 'critical' && 'Failover watchdog resolving issue'}
                {systemStatus === 'rolling_back' && 'Rolling back to stable version'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Section: My Enrolled Examinations */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-purple-600" />
              <span>My Enrolled Examinations</span>
            </h2>
            <p className="text-xs text-slate-500">
              Select an exam, enter the secure access code provided by your proctor, and begin.
            </p>
          </div>

          <span className="px-3 py-1 rounded-full bg-purple-50 border border-purple-200 text-purple-700 text-xs font-mono font-bold">
            {myEnrolledExams.length} Enrolled {myEnrolledExams.length === 1 ? 'Exam' : 'Exams'}
          </span>
        </div>

        {myEnrolledExams.length === 0 ? (
          <div className="p-8 rounded-3xl bg-white border border-slate-200 text-center space-y-3">
            <BookOpen className="w-10 h-10 text-slate-300 mx-auto" />
            <h3 className="text-sm font-bold text-slate-700">No Examinations Enrolled Yet</h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              Your email ({student.collegeEmail}) is not currently enrolled in any active examinations. Ask your instructor to enroll you via the Admin Portal.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {myEnrolledExams.map((exam) => {
              const attempt = allAttempts.find(
                (att) => att.examId === exam.id && att.studentId === student.id
              );
              const isSubmitted = attempt?.status === 'submitted';
              const isInProgress = attempt?.status === 'in_progress';
              const answeredCount = attempt ? Object.keys(attempt.answers).length : 0;

              return (
                <div 
                  key={exam.id}
                  className="bg-white/90 backdrop-blur-xl rounded-3xl border border-pink-100/80 hover:border-purple-300 p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group relative overflow-hidden"
                >
                  <div className="space-y-4">
                    
                    {/* Top status badges */}
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase bg-purple-50 text-purple-700 border border-purple-200">
                        {exam.subject}
                      </span>

                      {isSubmitted ? (
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>Submitted</span>
                        </span>
                      ) : isInProgress ? (
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 flex items-center gap-1 animate-pulse">
                          <Clock className="w-3 h-3" />
                          <span>In Progress</span>
                        </span>
                      ) : (
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
                          {exam.status === 'active' ? 'Ready to Start' : exam.status}
                        </span>
                      )}
                    </div>

                    {/* Exam Name & Description */}
                    <div>
                      <h3 className="text-base font-bold text-slate-900 group-hover:text-purple-700 transition-colors line-clamp-2">
                        {exam.name}
                      </h3>
                      <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                        {exam.description}
                      </p>
                    </div>

                    {/* Metadata chips */}
                    <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 text-[11px] text-slate-600">
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-purple-500" />
                        <span>{exam.durationMinutes} Minutes</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <FileCheck2 className="w-3.5 h-3.5 text-pink-500" />
                        <span>{exam.totalQuestions} Questions</span>
                      </div>
                    </div>

                    {/* Progress indicator if in progress */}
                    {isInProgress && (
                      <div className="p-2.5 rounded-xl bg-purple-50/70 border border-purple-100 text-[11px] space-y-1">
                        <div className="flex justify-between text-purple-900 font-semibold">
                          <span>Progress Saved</span>
                          <span>{answeredCount} / {exam.totalQuestions} answered</span>
                        </div>
                        <div className="w-full h-1.5 bg-purple-200 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-purple-500 to-pink-500" 
                            style={{ width: `${Math.round((answeredCount / exam.totalQuestions) * 100)}%` }}
                          />
                        </div>
                      </div>
                    )}

                    {/* Submission summary if submitted */}
                    {isSubmitted && (
                      <div className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-100 text-[11px] space-y-1 text-emerald-900">
                        <div className="flex justify-between font-bold">
                          <span>Exam Result</span>
                          <span>{attempt.score} / {attempt.maxScore} Marks</span>
                        </div>
                        <p className="text-[10px] text-emerald-700">
                          Submitted at {attempt.submittedAt}. Re-attempts are locked.
                        </p>
                      </div>
                    )}

                  </div>

                  {/* Bottom Action Button */}
                  <div className="pt-5 mt-2">
                    {isSubmitted ? (
                      <button
                        onClick={() => handleViewResults(exam.id)}
                        className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold flex items-center justify-center gap-2 transition-colors"
                      >
                        <Award className="w-4 h-4 text-emerald-600" />
                        <span>View Results & Breakdown</span>
                      </button>
                    ) : isInProgress ? (
                      <button
                        onClick={() => handleResumeExam(exam.id)}
                        className="w-full py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-xs transition-all"
                      >
                        <span>Resume Examination</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    ) : (
                      <button
                        onClick={() => handleOpenCodeModal(exam)}
                        className="w-full py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-xs transition-all"
                      >
                        <KeyRound className="w-4 h-4" />
                        <span>Enter Exam Code & Start</span>
                      </button>
                    )}
                  </div>

                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Verification & Code Modal */}
      {selectedExamForModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-pink-200 space-y-5 relative">
            
            <button
              onClick={() => setSelectedExamForModal(null)}
              className="absolute top-5 right-5 p-1.5 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-500 to-pink-500 text-white flex items-center justify-center mx-auto shadow-md">
                <KeyRound className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                Enter Examination Code
              </h3>
              <p className="text-xs text-slate-500">
                To take <span className="font-semibold text-slate-800">{selectedExamForModal.name}</span>, please enter the access code.
              </p>
            </div>

            {/* Quick helper tip */}
            <div className="p-3 rounded-2xl bg-purple-50/70 border border-purple-100 text-xs text-purple-800 space-y-1">
              <div className="font-semibold flex items-center gap-1 text-[11px]">
                <ShieldCheck className="w-3.5 h-3.5 text-purple-600" />
                <span>Eligibility Verification Rule:</span>
              </div>
              <ul className="list-disc pl-4 text-[10px] space-y-0.5 text-purple-700">
                <li>Logged in student: <b>{student.fullName}</b></li>
                <li>Enrolled email: <b>{student.collegeEmail}</b></li>
                <li>Demo access code: <code className="bg-purple-100 px-1 py-0.5 rounded font-bold font-mono">{selectedExamForModal.accessCode}</code></li>
              </ul>
            </div>

            {eligibilityError && (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                <span>{eligibilityError}</span>
              </div>
            )}

            {eligibilitySuccess && (
              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-medium flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                <span>Eligibility Verified ✓ Launching examination room...</span>
              </div>
            )}

            <form onSubmit={handleVerifyAndStart} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  6-Digit Exam Access Code
                </label>
                <input
                  type="text"
                  required
                  autoFocus
                  maxLength={10}
                  value={examCodeInput}
                  onChange={(e) => setExamCodeInput(e.target.value.toUpperCase())}
                  placeholder={`e.g. ${selectedExamForModal.accessCode}`}
                  className="w-full px-4 py-3 rounded-2xl bg-white border border-slate-300 text-center text-lg font-mono font-bold tracking-widest text-slate-900 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400"
                />
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedExamForModal(null)}
                  className="w-1/2 py-2.5 rounded-xl border border-slate-200 text-slate-600 text-xs font-bold hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-1/2 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white text-xs font-bold shadow-md shadow-purple-200 transition-all"
                >
                  Verify & Start
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
};
