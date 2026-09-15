import React, { useState } from 'react';
import { useSystem } from '../context/SystemContext';
import { MOCK_QUESTIONS } from '../data/mockData';
import { 
  FileText, 
  Plus, 
  Copy, 
  RefreshCw, 
  Trash2, 
  Edit3, 
  CheckCircle2, 
  Clock, 
  KeyRound, 
  Sparkles, 
  HelpCircle,
  X,
  Users,
  Calendar,
  Check
} from 'lucide-react';
import { Exam, Question } from '../types';

export const AdminExamsPage: React.FC = () => {
  const { 
    exams, 
    createExam, 
    updateExam, 
    deleteExam, 
    generateExamCode, 
    changeExamStatus, 
    setActiveExamId, 
    setActivePage, 
    showToast 
  } = useSystem();

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [copiedCodeExamId, setCopiedCodeExamId] = useState<string | null>(null);

  // New exam form state
  const [examName, setExamName] = useState('');
  const [subject, setSubject] = useState('Computer Science & Engineering');
  const [description, setDescription] = useState('');
  const [durationMinutes, setDurationMinutes] = useState(30);
  const [marksPerQuestion, setMarksPerQuestion] = useState(5);
  const [maxAttempts, setMaxAttempts] = useState(1);
  const [startDate, setStartDate] = useState('2026-09-15T09:00');
  const [endDate, setEndDate] = useState('2026-09-30T23:59');
  const [status, setStatus] = useState<'scheduled' | 'active' | 'closed'>('active');

  // Custom questions list in creator
  const [questionsList, setQuestionsList] = useState<Question[]>([...MOCK_QUESTIONS]);

  // Question builder fields
  const [currentQText, setCurrentQText] = useState('');
  const [optA, setOptA] = useState('');
  const [optB, setOptB] = useState('');
  const [optC, setOptC] = useState('');
  const [optD, setOptD] = useState('');
  const [correctOpt, setCorrectOpt] = useState<number>(0);
  const [qMarks, setQMarks] = useState<number>(5);

  const handleCopyCode = (examId: string, code: string) => {
    navigator.clipboard?.writeText(code);
    setCopiedCodeExamId(examId);
    showToast(`Access code ${code} copied to clipboard!`);
    setTimeout(() => setCopiedCodeExamId(null), 2000);
  };

  const handleAddQuestionToBuilder = () => {
    if (!currentQText.trim() || !optA.trim() || !optB.trim() || !optC.trim() || !optD.trim()) {
      showToast('Please fill in question text and all four options.');
      return;
    }

    const newQ: Question = {
      id: questionsList.length + 1,
      question: currentQText.trim(),
      options: [optA.trim(), optB.trim(), optC.trim(), optD.trim()],
      correctAnswer: correctOpt,
      marks: qMarks,
      category: 'Exam Question'
    };

    setQuestionsList((prev) => [...prev, newQ]);
    setCurrentQText('');
    setOptA('');
    setOptB('');
    setOptC('');
    setOptD('');
    setCorrectOpt(0);
    showToast('Question added to exam list!');
  };

  const handleRemoveQuestion = (idx: number) => {
    setQuestionsList((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleSaveExam = (e: React.FormEvent) => {
    e.preventDefault();
    if (!examName.trim()) {
      showToast('Please specify an examination title.');
      return;
    }

    if (questionsList.length === 0) {
      showToast('Exam must contain at least one question.');
      return;
    }

    const result = createExam({
      name: examName.trim(),
      subject,
      description: description.trim() || 'Comprehensive online examination paper.',
      durationMinutes: Number(durationMinutes),
      totalQuestions: questionsList.length,
      marksPerQuestion: Number(marksPerQuestion),
      maxAttempts: Number(maxAttempts),
      startDate,
      endDate,
      status,
      questions: questionsList
    });

    if (result.success) {
      setShowCreateModal(false);
      setExamName('');
      setDescription('');
      setQuestionsList([...MOCK_QUESTIONS]);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 text-purple-700 text-xs font-mono font-bold border border-purple-200 mb-1">
            <Sparkles className="w-3.5 h-3.5 text-pink-500" />
            <span>Examination Registry & Question Authoring</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Manage Examinations
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Create exams, manage questions, configure timing, and distribute secure access codes.
          </p>
        </div>

        <button
          onClick={() => setShowCreateModal(true)}
          className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 hover:opacity-95 text-white text-xs font-bold flex items-center gap-2 shadow-md shadow-purple-200 transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Create New Examination</span>
        </button>
      </div>

      {/* Exams Grid Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {exams.map((exam) => (
          <div
            key={exam.id}
            className="bg-white rounded-3xl border border-pink-100/80 shadow-xs hover:shadow-md transition-all p-6 flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-purple-50 text-purple-700 border border-purple-200">
                  {exam.subject}
                </span>

                {/* Status selector */}
                <select
                  value={exam.status}
                  onChange={(e) => changeExamStatus(exam.id, e.target.value as any)}
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-lg border focus:outline-none cursor-pointer ${
                    exam.status === 'active'
                      ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                      : exam.status === 'scheduled'
                      ? 'bg-blue-50 text-blue-800 border-blue-300'
                      : 'bg-slate-100 text-slate-700 border-slate-300'
                  }`}
                >
                  <option value="scheduled">SCHEDULED</option>
                  <option value="active">ACTIVE</option>
                  <option value="closed">CLOSED</option>
                </select>
              </div>

              <div>
                <h3 className="text-base font-bold text-slate-900 line-clamp-2">
                  {exam.name}
                </h3>
                <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                  {exam.description}
                </p>
              </div>

              {/* Metadata */}
              <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-600 pt-2 border-t border-slate-100">
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-purple-500" />
                  <span>{exam.durationMinutes} Minutes</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-pink-500" />
                  <span>{exam.totalQuestions} Questions</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  <span>{exam.marksPerQuestion} Marks / Q</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-blue-500" />
                  <span>Max: {exam.maxAttempts} Attempt</span>
                </div>
              </div>

              {/* Generated Exam Access Code with Copy & Regenerate */}
              <div className="p-3 rounded-2xl bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-500 font-mono block uppercase tracking-wider font-semibold">
                    Access Code
                  </span>
                  <span className="font-mono font-extrabold text-base text-purple-900 tracking-wider">
                    {exam.accessCode}
                  </span>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleCopyCode(exam.id, exam.accessCode)}
                    className="p-1.5 rounded-lg bg-white hover:bg-purple-100 text-purple-700 border border-purple-200 transition-colors"
                    title="Copy Access Code"
                  >
                    {copiedCodeExamId === exam.id ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>

                  <button
                    onClick={() => generateExamCode(exam.id)}
                    className="p-1.5 rounded-lg bg-white hover:bg-purple-100 text-purple-700 border border-purple-200 transition-colors"
                    title="Regenerate Access Code"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

            </div>

            {/* Bottom Card Actions */}
            <div className="pt-2 flex items-center gap-2 border-t border-slate-100">
              <button
                onClick={() => {
                  setActiveExamId(exam.id);
                  setActivePage('admin_enrollments');
                }}
                className="flex-1 py-2 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-700 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
              >
                <Users className="w-3.5 h-3.5" />
                <span>Enrolled Students</span>
              </button>

              <button
                onClick={() => deleteExam(exam.id)}
                className="p-2 rounded-xl hover:bg-rose-50 text-slate-400 hover:text-rose-600 transition-colors"
                title="Delete Exam"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

          </div>
        ))}
      </div>

      {/* Create New Examination Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto animate-in fade-in">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-2xl w-full shadow-2xl border border-pink-200 space-y-6 my-8 max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  Create New Examination
                </h3>
                <p className="text-xs text-slate-500">
                  Define parameters, author questions, and generate candidate access code.
                </p>
              </div>
              <button
                onClick={() => setShowCreateModal(false)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveExam} className="space-y-5">
              
              {/* Exam Name */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Examination Title
                </label>
                <input
                  type="text"
                  required
                  value={examName}
                  onChange={(e) => setExamName(e.target.value)}
                  placeholder="e.g. Distributed Cloud & Reliability Final Exam"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-xs text-slate-800 focus:ring-2 focus:ring-purple-400"
                />
              </div>

              {/* Subject & Description */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Subject / Department
                  </label>
                  <input
                    type="text"
                    required
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="e.g. Computer Science"
                    className="w-full px-3 py-2.5 rounded-xl bg-white border border-slate-200 text-xs text-slate-800"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Status
                  </label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as any)}
                    className="w-full px-3 py-2.5 rounded-xl bg-white border border-slate-200 text-xs text-slate-800 font-semibold"
                  >
                    <option value="active">ACTIVE (Open to Enrolled Students)</option>
                    <option value="scheduled">SCHEDULED</option>
                    <option value="closed">CLOSED</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Description / Instructions
                </label>
                <textarea
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="e.g. Covers ACID properties, Sharding strategies, and automated failover."
                  className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs text-slate-800"
                />
              </div>

              {/* Timing & Scoring Parameters */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    Duration (Mins)
                  </label>
                  <input
                    type="number"
                    min={5}
                    max={180}
                    value={durationMinutes}
                    onChange={(e) => setDurationMinutes(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs text-slate-800 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    Marks per Question
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={50}
                    value={marksPerQuestion}
                    onChange={(e) => setMarksPerQuestion(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs text-slate-800 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    Max Attempts
                  </label>
                  <input
                    type="number"
                    disabled
                    value={1}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    Total Questions
                  </label>
                  <input
                    type="number"
                    disabled
                    value={questionsList.length}
                    className="w-full px-3 py-2 rounded-xl bg-purple-50 border border-purple-200 text-xs text-purple-900 font-bold font-mono"
                  />
                </div>
              </div>

              {/* Questions Section */}
              <div className="pt-2 border-t border-slate-100 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 font-mono">
                    Questions in Exam ({questionsList.length})
                  </h4>
                  <span className="text-[11px] text-slate-400">
                    Pre-populated with {questionsList.length} verified questions
                  </span>
                </div>

                {/* List of current questions */}
                <div className="max-h-44 overflow-y-auto space-y-2 pr-1">
                  {questionsList.map((q, idx) => (
                    <div key={idx} className="p-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs flex items-center justify-between gap-3">
                      <div className="truncate flex-1">
                        <span className="font-mono font-bold text-purple-700 mr-2">Q{idx + 1}:</span>
                        <span className="text-slate-800 font-medium">{q.question}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveQuestion(idx)}
                        className="text-slate-400 hover:text-rose-600 p-1"
                        title="Remove question"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Add Question Sub-form */}
                <div className="p-4 rounded-2xl bg-purple-50/50 border border-purple-200 space-y-3">
                  <span className="text-xs font-bold text-purple-900 block">
                    Add New Question
                  </span>

                  <div>
                    <input
                      type="text"
                      value={currentQText}
                      onChange={(e) => setCurrentQText(e.target.value)}
                      placeholder="Type question stem..."
                      className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs text-slate-800"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <input
                      type="text"
                      value={optA}
                      onChange={(e) => setOptA(e.target.value)}
                      placeholder="Option A"
                      className="px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-xs"
                    />
                    <input
                      type="text"
                      value={optB}
                      onChange={(e) => setOptB(e.target.value)}
                      placeholder="Option B"
                      className="px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-xs"
                    />
                    <input
                      type="text"
                      value={optC}
                      onChange={(e) => setOptC(e.target.value)}
                      placeholder="Option C"
                      className="px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-xs"
                    />
                    <input
                      type="text"
                      value={optD}
                      onChange={(e) => setOptD(e.target.value)}
                      placeholder="Option D"
                      className="px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-xs"
                    />
                  </div>

                  <div className="flex items-center justify-between text-xs pt-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-700">Correct Option:</span>
                      <select
                        value={correctOpt}
                        onChange={(e) => setCorrectOpt(Number(e.target.value))}
                        className="px-2 py-1 rounded-lg border bg-white text-xs font-mono font-bold text-purple-800"
                      >
                        <option value={0}>Option A</option>
                        <option value={1}>Option B</option>
                        <option value={2}>Option C</option>
                        <option value={3}>Option D</option>
                      </select>
                    </div>

                    <button
                      type="button"
                      onClick={handleAddQuestionToBuilder}
                      className="px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs flex items-center gap-1 shadow-xs"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add to Exam</span>
                    </button>
                  </div>
                </div>

              </div>

              {/* Submit Buttons */}
              <div className="flex gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="w-1/2 py-2.5 rounded-xl border border-slate-200 text-slate-700 text-xs font-bold hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-1/2 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 text-white text-xs font-bold shadow-md shadow-purple-200"
                >
                  Publish & Generate Code
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
};
