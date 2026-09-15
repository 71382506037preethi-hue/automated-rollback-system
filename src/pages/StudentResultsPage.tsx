import React from 'react';
import { useSystem } from '../context/SystemContext';
import { MOCK_QUESTIONS } from '../data/mockData';
import { 
  Award, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  ArrowLeft, 
  FileText, 
  Sparkles, 
  BookOpen,
  HelpCircle,
  RotateCcw
} from 'lucide-react';
import { StudentAccount } from '../types';

export const StudentResultsPage: React.FC = () => {
  const { 
    currentUser, 
    role,
    exams, 
    activeExamId, 
    allAttempts, 
    setActivePage 
  } = useSystem();

  if (!currentUser || role !== 'student') {
    return (
      <div className="max-w-md mx-auto my-16 text-center px-4">
        <button
          onClick={() => setActivePage('login')}
          className="px-5 py-2.5 rounded-2xl bg-purple-600 text-white text-xs font-bold"
        >
          Go to Login
        </button>
      </div>
    );
  }

  const student = currentUser as StudentAccount;
  const currentExam = exams.find((e) => e.id === activeExamId) || exams[0];
  const questions = currentExam.questions.length > 0 ? currentExam.questions : MOCK_QUESTIONS;

  const attempt = allAttempts.find(
    (att) => att.examId === currentExam.id && att.studentId === student.id
  );

  if (!attempt || attempt.status !== 'submitted') {
    return (
      <div className="max-w-xl mx-auto my-16 text-center px-4 space-y-4">
        <div className="p-8 rounded-3xl bg-white border border-pink-200 shadow-sm space-y-3">
          <BookOpen className="w-10 h-10 text-purple-500 mx-auto" />
          <h2 className="text-lg font-bold text-slate-900">No Submission Found</h2>
          <p className="text-xs text-slate-500">
            You have not submitted an examination session for this test yet.
          </p>
          <button
            onClick={() => setActivePage('dashboard')}
            className="px-5 py-2 rounded-xl bg-purple-600 text-white text-xs font-bold"
          >
            Return to My Exams
          </button>
        </div>
      </div>
    );
  }

  const percentage = Math.round((attempt.score / attempt.maxScore) * 100);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Back button */}
      <button
        onClick={() => setActivePage('dashboard')}
        className="inline-flex items-center gap-1.5 text-xs font-bold text-purple-700 hover:text-purple-900 transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Return to Dashboard</span>
      </button>

      {/* Score Summary Card */}
      <div className="bg-gradient-to-r from-purple-100/90 via-pink-100/80 to-sky-100/90 rounded-3xl p-6 sm:p-8 border border-purple-200 shadow-sm relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-xs font-mono font-bold text-purple-700 border border-purple-200">
              <Sparkles className="w-3.5 h-3.5 text-pink-500" />
              <span>Official Academic Result Record</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Examination Completed ✓
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 max-w-lg">
              {currentExam.name} ({currentExam.subject}). All responses were verified and score was computed automatically.
            </p>

            <div className="flex items-center gap-2 text-xs text-slate-500 font-mono pt-1">
              <span>Candidate: <b>{student.fullName}</b></span>
              <span>•</span>
              <span>ID: {student.studentId}</span>
              <span>•</span>
              <span>Submitted: {attempt.submittedAt}</span>
            </div>
          </div>

          {/* Big Score Box */}
          <div className="p-6 rounded-3xl bg-white/90 backdrop-blur-md border border-purple-200 text-center space-y-1 shadow-md flex-shrink-0 min-w-[160px]">
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-bold block">
              Total Score
            </span>
            <div className="text-3xl sm:text-4xl font-extrabold font-mono text-purple-900">
              {attempt.score} <span className="text-base text-slate-400 font-normal">/ {attempt.maxScore}</span>
            </div>
            <div className="inline-block px-2.5 py-0.5 rounded-full text-xs font-bold font-mono bg-emerald-100 text-emerald-800">
              {percentage}% Grade
            </div>
          </div>

        </div>
      </div>

      {/* Question by question breakdown */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <FileText className="w-5 h-5 text-purple-600" />
            <span>Answers & Solutions Breakdown</span>
          </h2>
          <span className="text-xs text-slate-500 font-mono">
            {questions.length} Questions Evaluated
          </span>
        </div>

        <div className="space-y-4">
          {questions.map((q, idx) => {
            const studentSelected = attempt.answers[q.id];
            const isCorrect = studentSelected === q.correctAnswer;
            const isAnswered = studentSelected !== undefined;

            return (
              <div 
                key={q.id}
                className="bg-white/90 backdrop-blur-xl rounded-3xl p-6 border border-pink-100/80 shadow-xs space-y-4"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono font-bold uppercase text-purple-600">
                      Question {idx + 1} • {q.category || 'Topic'}
                    </span>
                    <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-relaxed">
                      {q.question}
                    </h3>
                  </div>

                  <div className="flex-shrink-0">
                    {isCorrect ? (
                      <span className="px-3 py-1 rounded-xl text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span>+{q.marks || 5} Marks</span>
                      </span>
                    ) : (
                      <span className="px-3 py-1 rounded-xl text-xs font-bold bg-rose-50 text-rose-700 border border-rose-200 flex items-center gap-1.5">
                        <XCircle className="w-4 h-4 text-rose-600" />
                        <span>0 Marks</span>
                      </span>
                    )}
                  </div>
                </div>

                {/* Options Review */}
                <div className="space-y-2 pt-1">
                  {q.options.map((opt, optIdx) => {
                    const isOptionCorrect = optIdx === q.correctAnswer;
                    const isOptionPicked = studentSelected === optIdx;

                    let rowStyle = 'bg-slate-50/70 border-slate-200 text-slate-700';
                    if (isOptionCorrect) {
                      rowStyle = 'bg-emerald-50/80 border-emerald-300 text-emerald-950 font-semibold ring-1 ring-emerald-300/50';
                    } else if (isOptionPicked && !isOptionCorrect) {
                      rowStyle = 'bg-rose-50/80 border-rose-300 text-rose-950 line-through';
                    }

                    return (
                      <div
                        key={optIdx}
                        className={`p-3 rounded-2xl border text-xs flex items-center justify-between gap-3 ${rowStyle}`}
                      >
                        <div className="flex items-center gap-2.5">
                          <span className="w-6 h-6 rounded-lg bg-white/80 border border-slate-200 flex items-center justify-center font-mono font-bold text-[11px]">
                            {String.fromCharCode(65 + optIdx)}
                          </span>
                          <span>{opt}</span>
                        </div>

                        <div>
                          {isOptionCorrect && (
                            <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                              Correct Answer
                            </span>
                          )}
                          {isOptionPicked && !isOptionCorrect && (
                            <span className="px-2 py-0.5 rounded-md bg-rose-100 text-rose-800 text-[10px] font-bold">
                              Your Choice
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
