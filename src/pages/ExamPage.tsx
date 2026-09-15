import React, { useState, useEffect } from 'react';
import { useSystem } from '../context/SystemContext';
import { MOCK_QUESTIONS } from '../data/mockData';
import { 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  RefreshCw, 
  ChevronLeft, 
  ChevronRight, 
  Send, 
  RotateCcw, 
  Bookmark, 
  ShieldCheck, 
  UserCheck, 
  HelpCircle, 
  Database, 
  ArrowLeft, 
  GraduationCap, 
  Sparkles,
  Flame,
  Check
} from 'lucide-react';
import { StudentAccount } from '../types';

export const ExamPage: React.FC = () => {
  const { 
    currentUser, 
    role,
    exams,
    activeExamId,
    allAttempts,
    saveStudentAnswer,
    updateExamProgress,
    submitExamAttempt,
    lastAnswerSavedTime,
    isRestoringSession,
    systemStatus,
    currentVersion,
    triggerDeploymentFailureSimulation,
    isSimulating,
    setActivePage
  } = useSystem();

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [markedForReview, setMarkedForReview] = useState<number[]>([]);
  const [timeLeftSeconds, setTimeLeftSeconds] = useState<number>(30 * 60);

  // Redirect if not student
  if (!currentUser || role !== 'student') {
    return (
      <div className="max-w-md mx-auto my-16 text-center px-4">
        <div className="p-8 rounded-3xl bg-white/90 backdrop-blur-xl border border-pink-200 shadow-md">
          <p className="text-slate-700 mb-4 font-medium text-sm">Please log in as a student to access the examination room.</p>
          <button
            onClick={() => setActivePage('login')}
            className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-bold shadow-xs"
          >
            Go to Student Login
          </button>
        </div>
      </div>
    );
  }

  const student = currentUser as StudentAccount;
  const currentExam = exams.find((e) => e.id === activeExamId) || exams[0];
  const questions = currentExam?.questions?.length > 0 ? currentExam.questions : MOCK_QUESTIONS;
  const totalQuestions = questions.length;

  const currentAttempt = allAttempts.find(
    (att) => att.examId === currentExam.id && att.studentId === student.id
  );

  // Redirect if already submitted (one attempt protection)
  useEffect(() => {
    if (currentAttempt && currentAttempt.status === 'submitted') {
      setActivePage('student_results');
    }
  }, [currentAttempt, setActivePage]);

  // Sync state from active attempt if exists
  useEffect(() => {
    if (currentAttempt) {
      if (currentAttempt.currentQuestionIndex !== undefined) {
        setCurrentQuestionIndex(currentAttempt.currentQuestionIndex);
      }
      if (currentAttempt.markedForReview) {
        setMarkedForReview(currentAttempt.markedForReview);
      }
      if (currentAttempt.timeRemainingSeconds !== undefined) {
        setTimeLeftSeconds(currentAttempt.timeRemainingSeconds);
      }
    }
  }, [currentExam.id, student.id]);

  // Countdown timer effect
  useEffect(() => {
    if (!currentAttempt || currentAttempt.status === 'submitted') return;

    const timer = setInterval(() => {
      setTimeLeftSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          submitExamAttempt(currentExam.id);
          setActivePage('student_results');
          return 0;
        }
        const updated = prev - 1;
        // Periodically sync time to storage
        if (updated % 15 === 0) {
          updateExamProgress(currentExam.id, currentQuestionIndex, markedForReview, updated);
        }
        return updated;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentAttempt?.status, currentExam.id, currentQuestionIndex, markedForReview, submitExamAttempt, updateExamProgress, setActivePage]);

  const currentQ = questions[currentQuestionIndex] || questions[0];
  const studentAnswers = currentAttempt?.answers || {};

  const handleSelectOption = (optionIndex: number) => {
    if (currentAttempt?.status === 'submitted') return;
    saveStudentAnswer(currentExam.id, currentQ.id, optionIndex);
  };

  const handleNext = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      const nextIdx = currentQuestionIndex + 1;
      setCurrentQuestionIndex(nextIdx);
      updateExamProgress(currentExam.id, nextIdx, markedForReview, timeLeftSeconds);
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      const prevIdx = currentQuestionIndex - 1;
      setCurrentQuestionIndex(prevIdx);
      updateExamProgress(currentExam.id, prevIdx, markedForReview, timeLeftSeconds);
    }
  };

  const toggleReview = (qId: number) => {
    const updated = markedForReview.includes(qId)
      ? markedForReview.filter((id) => id !== qId)
      : [...markedForReview, qId];
    setMarkedForReview(updated);
    updateExamProgress(currentExam.id, currentQuestionIndex, updated, timeLeftSeconds);
  };

  const handleFinalSubmit = () => {
    submitExamAttempt(currentExam.id);
    setShowSubmitModal(false);
    setActivePage('student_results');
  };

  // Format timer
  const minutes = Math.floor(timeLeftSeconds / 60);
  const seconds = timeLeftSeconds % 60;
  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  const answeredCount = Object.keys(studentAnswers).length;
  const unansweredCount = totalQuestions - answeredCount;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-5">
      
      {/* Top Bar: Return Link & Rollback Failover Demonstration Notice */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <button
          onClick={() => setActivePage('dashboard')}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-purple-700 hover:text-purple-900 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Exit to Student Dashboard</span>
        </button>

        {/* Evaluation Helper: Failover Button */}
        <div className="flex items-center gap-2">
          <span className="text-[11px] text-slate-500 font-mono hidden md:inline">
            Active Version: <b className="text-purple-700">{currentVersion}</b>
          </span>
          <button
            onClick={triggerDeploymentFailureSimulation}
            disabled={isSimulating}
            className="px-3 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-xs font-semibold flex items-center gap-1.5 shadow-2xs transition-colors"
            title="Trigger system failure to see how student answers and session stay 100% intact"
          >
            <Flame className="w-3.5 h-3.5 text-rose-500" />
            <span>Test Failover Recovery</span>
          </button>
        </div>
      </div>

      {/* DevOps Automated Recovery Notification Banner */}
      {(systemStatus === 'recovered' || isRestoringSession) && (
        <div className="p-4 rounded-2xl bg-gradient-to-r from-teal-50 via-emerald-50 to-teal-50 border border-teal-200 text-teal-900 shadow-xs flex items-center justify-between gap-3 animate-in fade-in">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-teal-500 text-white flex items-center justify-center flex-shrink-0">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-teal-900">
                System Recovered • Stable Release v1.9 Restored
              </h4>
              <p className="text-[11px] text-teal-700">
                {isRestoringSession 
                  ? "Restoring your examination session... ✓ Your progress is safe."
                  : "Zero-Data-Loss Architecture: All your answers, timers, and question states were preserved 100%."
                }
              </p>
            </div>
          </div>
          <span className="px-2 py-0.5 rounded-md bg-white/80 border border-teal-200 text-[10px] font-mono text-teal-800 font-bold uppercase">
            Data Intact
          </span>
        </div>
      )}

      {/* Main Examination Header Card */}
      <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-5 sm:p-6 border border-pink-100 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-purple-100 text-purple-800 border border-purple-200">
              {currentExam.subject}
            </span>
            <span className="text-xs text-slate-400 font-mono">•</span>
            <span className="text-xs font-mono font-semibold text-slate-600">
              Code: <span className="text-purple-700 font-bold">{currentExam.accessCode}</span>
            </span>
          </div>

          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900">
            {currentExam.name}
          </h1>

          <div className="flex items-center gap-2 text-xs text-slate-500 font-mono">
            <span>Candidate: <b>{student.fullName}</b> ({student.studentId})</span>
          </div>
        </div>

        {/* Live Timer & Auto-Save Badge */}
        <div className="flex items-center gap-3">
          
          {/* Auto-Save Indicator */}
          <div className="text-right hidden sm:block">
            <div className="flex items-center justify-end gap-1 text-[11px] font-semibold text-emerald-700">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
              <span>Answers Auto-Saved</span>
            </div>
            <p className="text-[10px] text-slate-400 font-mono">
              {lastAnswerSavedTime ? `Saved at ${lastAnswerSavedTime}` : 'Continuous Persistence'}
            </p>
          </div>

          {/* Countdown Clock Display */}
          <div className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 text-purple-900 shadow-2xs">
            <Clock className={`w-5 h-5 ${timeLeftSeconds < 300 ? 'text-rose-500 animate-pulse' : 'text-purple-600'}`} />
            <div className="font-mono">
              <div className="text-xs text-slate-500 font-semibold uppercase tracking-wider text-[9px]">
                Time Remaining
              </div>
              <div className={`text-lg font-extrabold tracking-wider ${timeLeftSeconds < 300 ? 'text-rose-600' : 'text-purple-900'}`}>
                {formattedTime}
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Main Exam Grid: Question Area + Question Palette Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Left 3 Columns: Active Question Card */}
        <div className="lg:col-span-3 space-y-4">
          
          <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-pink-100 shadow-sm space-y-6">
            
            {/* Question Top Meta */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 text-xs">
              <div className="flex items-center gap-2 font-mono">
                <span className="px-2.5 py-1 rounded-xl bg-purple-100 text-purple-800 font-bold">
                  Question {currentQuestionIndex + 1} of {totalQuestions}
                </span>
                <span className="text-slate-400">|</span>
                <span className="text-slate-500">Marks: {currentQ.marks || 5}</span>
              </div>

              <button
                type="button"
                onClick={() => toggleReview(currentQ.id)}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-semibold transition-all ${
                  markedForReview.includes(currentQ.id)
                    ? 'bg-amber-100 text-amber-800 border border-amber-300 font-bold'
                    : 'bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200'
                }`}
              >
                <Bookmark className={`w-3.5 h-3.5 ${markedForReview.includes(currentQ.id) ? 'fill-amber-500 text-amber-500' : ''}`} />
                <span>{markedForReview.includes(currentQ.id) ? 'Marked for Review' : 'Mark for Review'}</span>
              </button>
            </div>

            {/* Question Text */}
            <div className="space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-purple-600 font-mono">
                {currentQ.category || 'Examination Item'}
              </span>
              <p className="text-base sm:text-lg font-semibold text-slate-900 leading-relaxed">
                {currentQ.question}
              </p>
            </div>

            {/* Options List */}
            <div className="space-y-3 pt-2">
              {currentQ.options.map((optionText, optIdx) => {
                const isSelected = studentAnswers[currentQ.id] === optIdx;
                const optionLetter = String.fromCharCode(65 + optIdx); // A, B, C, D

                return (
                  <button
                    key={optIdx}
                    type="button"
                    onClick={() => handleSelectOption(optIdx)}
                    className={`w-full p-4 rounded-2xl border text-left flex items-start gap-3.5 transition-all ${
                      isSelected
                        ? 'bg-purple-50/90 border-purple-400 text-purple-950 shadow-xs ring-1 ring-purple-400/40'
                        : 'bg-white hover:bg-slate-50/70 border-slate-200 text-slate-800'
                    }`}
                  >
                    <div className={`w-7 h-7 rounded-xl flex items-center justify-center font-mono text-xs font-bold flex-shrink-0 transition-colors ${
                      isSelected
                        ? 'bg-purple-600 text-white shadow-2xs'
                        : 'bg-slate-100 text-slate-600 group-hover:bg-slate-200'
                    }`}>
                      {optionLetter}
                    </div>

                    <div className="flex-1 pt-0.5 text-xs sm:text-sm font-medium leading-relaxed">
                      {optionText}
                    </div>

                    {isSelected && (
                      <div className="w-5 h-5 rounded-full bg-purple-600 text-white flex items-center justify-center flex-shrink-0">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Bottom Question Controls */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={handlePrev}
                disabled={currentQuestionIndex === 0}
                className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 text-xs font-bold hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1.5 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous</span>
              </button>

              <div className="flex items-center gap-2">
                {currentQuestionIndex < totalQuestions - 1 ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors"
                  >
                    <span>Save & Next</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => setShowSubmitModal(true)}
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-emerald-200 transition-all"
                  >
                    <Send className="w-4 h-4" />
                    <span>Submit Examination</span>
                  </button>
                )}
              </div>
            </div>

          </div>

        </div>

        {/* Right 1 Column: Question Palette Sidebar */}
        <div className="space-y-4">
          
          <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-5 border border-pink-100 shadow-sm space-y-4">
            
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 font-mono flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-purple-600" />
              <span>Question Palette</span>
            </h3>

            {/* Palette Grid */}
            <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-4 gap-2">
              {questions.map((q, idx) => {
                const isAnswered = studentAnswers[q.id] !== undefined;
                const isCurrent = idx === currentQuestionIndex;
                const isMarked = markedForReview.includes(q.id);

                let bgClass = 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200';
                if (isCurrent) {
                  bgClass = 'bg-purple-600 text-white border-purple-700 ring-2 ring-purple-300 shadow-xs font-extrabold';
                } else if (isMarked) {
                  bgClass = 'bg-amber-100 text-amber-900 border-amber-300 font-bold';
                } else if (isAnswered) {
                  bgClass = 'bg-emerald-100 text-emerald-900 border-emerald-300 font-bold';
                }

                return (
                  <button
                    key={q.id}
                    type="button"
                    onClick={() => {
                      setCurrentQuestionIndex(idx);
                      updateExamProgress(currentExam.id, idx, markedForReview, timeLeftSeconds);
                    }}
                    className={`h-10 rounded-xl border text-xs font-mono transition-all flex items-center justify-center relative ${bgClass}`}
                  >
                    <span>{idx + 1}</span>
                    {isMarked && (
                      <span className="w-2 h-2 rounded-full bg-amber-500 absolute top-1 right-1" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Legend */}
            <div className="space-y-2 pt-3 border-t border-slate-100 text-[11px] text-slate-600">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-md bg-emerald-500" />
                  <span>Answered</span>
                </span>
                <span className="font-mono font-bold">{answeredCount}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-md bg-amber-400" />
                  <span>Marked for Review</span>
                </span>
                <span className="font-mono font-bold">{markedForReview.length}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-md bg-slate-200" />
                  <span>Not Answered</span>
                </span>
                <span className="font-mono font-bold">{unansweredCount}</span>
              </div>
            </div>

            {/* Finish & Submit Button */}
            <button
              type="button"
              onClick={() => setShowSubmitModal(true)}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 hover:opacity-95 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-md shadow-purple-200 transition-all"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Submit Paper</span>
            </button>

          </div>

          {/* DevOps Status Card inside Exam for Peace of Mind */}
          <div className="p-4 rounded-2xl bg-purple-50/70 border border-purple-100 space-y-2 text-xs">
            <div className="flex items-center gap-2 text-purple-900 font-bold">
              <ShieldCheck className="w-4 h-4 text-purple-600" />
              <span>Continuous Safe State</span>
            </div>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              Every option you pick is saved synchronously into localized persistent storage. Even if you refresh or the system encounters a cluster failover, nothing is lost.
            </p>
          </div>

        </div>

      </div>

      {/* Confirmation Submit Modal */}
      {showSubmitModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-pink-200 space-y-5 text-center">
            
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-500 text-white flex items-center justify-center mx-auto shadow-md">
              <Send className="w-6 h-6" />
            </div>

            <h3 className="text-lg font-bold text-slate-900">
              Submit Examination?
            </h3>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-600 text-left space-y-1.5">
              <div className="flex justify-between">
                <span>Total Questions:</span>
                <span className="font-mono font-bold text-slate-800">{totalQuestions}</span>
              </div>
              <div className="flex justify-between">
                <span>Questions Answered:</span>
                <span className="font-mono font-bold text-emerald-700">{answeredCount}</span>
              </div>
              <div className="flex justify-between">
                <span>Questions Unanswered:</span>
                <span className="font-mono font-bold text-rose-600">{unansweredCount}</span>
              </div>
              <div className="flex justify-between">
                <span>Marked for Review:</span>
                <span className="font-mono font-bold text-amber-600">{markedForReview.length}</span>
              </div>
            </div>

            <p className="text-xs text-rose-600 font-semibold">
              ⚠ Attention: Once submitted, you will not be able to re-enter this examination session (1-attempt policy).
            </p>

            <div className="flex gap-2.5 pt-2">
              <button
                type="button"
                onClick={() => setShowSubmitModal(false)}
                className="w-1/2 py-2.5 rounded-xl border border-slate-200 text-slate-700 text-xs font-bold hover:bg-slate-50"
              >
                Return to Exam
              </button>
              <button
                type="button"
                onClick={handleFinalSubmit}
                className="w-1/2 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-xs font-bold hover:from-emerald-700 shadow-md shadow-emerald-200"
              >
                Confirm & Submit
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
