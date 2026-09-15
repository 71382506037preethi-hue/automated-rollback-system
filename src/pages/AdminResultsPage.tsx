import React, { useState } from 'react';
import { useSystem } from '../context/SystemContext';
import { 
  Award, 
  FileText, 
  CheckCircle2, 
  XCircle, 
  Search, 
  Download, 
  BookOpen, 
  Sparkles, 
  TrendingUp, 
  BarChart2,
  Users,
  Percent
} from 'lucide-react';
import { AdminAccount } from '../types';

export const AdminResultsPage: React.FC = () => {
  const { 
    currentUser,
    role,
    exams,
    allAttempts,
    activeExamId,
    setActiveExamId,
    setActivePage,
    showToast
  } = useSystem();

  const [searchQuery, setSearchQuery] = useState('');

  if (!currentUser || role !== 'admin') {
    return (
      <div className="max-w-md mx-auto my-16 text-center px-4">
        <button
          onClick={() => setActivePage('login')}
          className="px-5 py-2.5 rounded-2xl bg-indigo-600 text-white text-xs font-bold"
        >
          Admin Login Required
        </button>
      </div>
    );
  }

  const selectedExam = exams.find((e) => e.id === activeExamId) || exams[0];

  const submittedAttempts = allAttempts.filter((a) => a.status === 'submitted');
  const examFilteredAttempts = submittedAttempts.filter((a) => a.examId === selectedExam?.id);

  const filtered = examFilteredAttempts.filter((a) => {
    const q = searchQuery.toLowerCase();
    return (
      a.studentName.toLowerCase().includes(q) ||
      a.studentEmail.toLowerCase().includes(q) ||
      a.studentId.toLowerCase().includes(q)
    );
  });

  const totalEvaluated = examFilteredAttempts.length;
  const averageScore = totalEvaluated > 0
    ? Math.round(examFilteredAttempts.reduce((acc, a) => acc + a.score, 0) / totalEvaluated)
    : 0;
  const maxPossible = selectedExam?.totalQuestions * selectedExam?.marksPerQuestion || 25;
  const passCount = examFilteredAttempts.filter((a) => (a.score / maxPossible) >= 0.5).length;
  const passRate = totalEvaluated > 0 ? Math.round((passCount / totalEvaluated) * 100) : 0;

  const handleExportCsv = () => {
    if (examFilteredAttempts.length === 0) {
      showToast('No submitted attempts to export.');
      return;
    }

    const headers = 'StudentID,StudentName,Email,Score,MaxScore,Percentage,SubmittedAt\n';
    const rows = examFilteredAttempts.map((a) => {
      const pct = Math.round((a.score / a.maxScore) * 100);
      return `"${a.studentId}","${a.studentName}","${a.studentEmail}",${a.score},${a.maxScore},${pct}%,"${a.submittedAt}"`;
    }).join('\n');

    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${selectedExam?.name.replace(/\s+/g, '_')}_Results.csv`;
    link.click();
    showToast('Results CSV exported successfully!');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 text-purple-700 text-xs font-mono font-bold border border-purple-200 mb-1">
            <Award className="w-3.5 h-3.5 text-purple-600" />
            <span>Academic Performance & Grading Registry</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Examination Results & Submissions
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Automated grading evaluation, score breakdowns, and result records.
          </p>
        </div>

        {/* Exam filter & Export */}
        <div className="flex items-center gap-2 flex-wrap">
          <select
            value={selectedExam?.id || ''}
            onChange={(e) => setActiveExamId(e.target.value)}
            className="px-3.5 py-2 rounded-xl bg-white border border-purple-200 text-xs font-bold text-purple-900 focus:ring-2 focus:ring-purple-400 shadow-2xs"
          >
            {exams.map((ex) => (
              <option key={ex.id} value={ex.id}>
                {ex.name}
              </option>
            ))}
          </select>

          <button
            onClick={handleExportCsv}
            className="px-3.5 py-2 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200 text-xs font-bold flex items-center gap-1.5 transition-colors shadow-2xs"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="p-5 rounded-2xl bg-white border border-purple-100 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
            <span>Total Submissions</span>
            <Users className="w-4 h-4 text-purple-600" />
          </div>
          <div className="text-2xl font-extrabold text-slate-900 font-mono">
            {totalEvaluated}
          </div>
          <p className="text-[11px] text-slate-500">Auto-graded in storage</p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-purple-100 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
            <span>Average Score</span>
            <TrendingUp className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-extrabold text-emerald-700 font-mono">
            {averageScore} <span className="text-sm text-slate-400 font-normal">/ {maxPossible}</span>
          </div>
          <p className="text-[11px] text-emerald-700 font-medium">
            {maxPossible > 0 ? `${Math.round((averageScore / maxPossible) * 100)}% Mean` : ''}
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-purple-100 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
            <span>Pass Rate (&gt;=50%)</span>
            <Percent className="w-4 h-4 text-sky-600" />
          </div>
          <div className="text-2xl font-extrabold text-sky-700 font-mono">
            {passRate}%
          </div>
          <p className="text-[11px] text-slate-500">{passCount} of {totalEvaluated} passed</p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-purple-100 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
            <span>Re-attempt Lock</span>
            <CheckCircle2 className="w-4 h-4 text-teal-600" />
          </div>
          <div className="text-base font-extrabold text-teal-700 font-mono pt-1">
            Enforced (1 Attempt)
          </div>
          <p className="text-[11px] text-slate-500">Tamper-proof integrity</p>
        </div>

      </div>

      {/* Submissions Table */}
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <FileText className="w-4 h-4 text-purple-600" />
            <span>Submission Records for {selectedExam?.name}</span>
          </h2>

          <div className="relative max-w-xs w-full">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search candidate name or ID..."
              className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-white border border-slate-200 text-xs text-slate-800"
            />
          </div>
        </div>

        <div className="bg-white rounded-3xl border border-pink-100 shadow-xs overflow-hidden">
          {filtered.length === 0 ? (
            <div className="p-8 text-center space-y-2">
              <Award className="w-8 h-8 text-slate-300 mx-auto" />
              <p className="text-xs text-slate-500">
                No submitted exam attempts found for this examination.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-100 text-[11px] uppercase tracking-wider text-slate-500 font-mono">
                  <tr>
                    <th className="px-5 py-3.5">Candidate Name</th>
                    <th className="px-4 py-3.5">Student ID</th>
                    <th className="px-4 py-3.5">Email</th>
                    <th className="px-4 py-3.5">Score</th>
                    <th className="px-4 py-3.5">Percentage</th>
                    <th className="px-4 py-3.5">Grade</th>
                    <th className="px-5 py-3.5 text-right">Submitted At</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filtered.map((att) => {
                    const percentage = Math.round((att.score / att.maxScore) * 100);
                    let grade = 'F';
                    let gradeColor = 'bg-rose-100 text-rose-800';
                    if (percentage >= 90) {
                      grade = 'A+';
                      gradeColor = 'bg-emerald-100 text-emerald-800 font-bold';
                    } else if (percentage >= 80) {
                      grade = 'A';
                      gradeColor = 'bg-emerald-100 text-emerald-800 font-bold';
                    } else if (percentage >= 70) {
                      grade = 'B';
                      gradeColor = 'bg-teal-100 text-teal-800';
                    } else if (percentage >= 60) {
                      grade = 'C';
                      gradeColor = 'bg-amber-100 text-amber-800';
                    } else if (percentage >= 50) {
                      grade = 'D';
                      gradeColor = 'bg-amber-100 text-amber-800';
                    }

                    return (
                      <tr key={att.id} className="hover:bg-purple-50/20 transition-colors">
                        <td className="px-5 py-4 font-bold text-slate-900">
                          {att.studentName}
                        </td>
                        <td className="px-4 py-4 font-mono text-slate-600">
                          {att.studentId}
                        </td>
                        <td className="px-4 py-4 font-mono text-purple-700">
                          {att.studentEmail}
                        </td>
                        <td className="px-4 py-4 font-mono font-bold text-slate-900">
                          {att.score} / {att.maxScore}
                        </td>
                        <td className="px-4 py-4 font-mono font-bold text-purple-800">
                          {percentage}%
                        </td>
                        <td className="px-4 py-4">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono ${gradeColor}`}>
                            Grade {grade}
                          </span>
                        </td>
                        <td className="px-5 py-4 text-right font-mono text-slate-500 text-[11px]">
                          {att.submittedAt}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
