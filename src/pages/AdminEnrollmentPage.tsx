import React, { useState } from 'react';
import { useSystem } from '../context/SystemContext';
import { 
  Users, 
  UserPlus, 
  Upload, 
  Trash2, 
  CheckCircle2, 
  FileSpreadsheet, 
  BookOpen, 
  Mail, 
  User, 
  Building2, 
  Download,
  Search,
  Sparkles,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';
import { EnrolledStudent } from '../types';

export const AdminEnrollmentPage: React.FC = () => {
  const { 
    exams, 
    activeExamId, 
    setActiveExamId, 
    enrolledStudents, 
    enrollSingleStudent, 
    enrollBulkStudents, 
    unenrollStudent, 
    allAttempts,
    showToast 
  } = useSystem();

  const selectedExam = exams.find((e) => e.id === activeExamId) || exams[0];

  // Tab: Single vs CSV
  const [enrollTab, setEnrollTab] = useState<'single' | 'csv'>('single');

  // Single form
  const [singleName, setSingleName] = useState('');
  const [singleId, setSingleId] = useState('');
  const [singleEmail, setSingleEmail] = useState('');
  const [singleDept, setSingleDept] = useState('Computer Science & Engineering');

  // CSV text
  const [csvText, setCsvText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const enrolledInThisExam = enrolledStudents.filter((e) => e.examId === selectedExam?.id);

  const filteredStudents = enrolledInThisExam.filter((s) => {
    const q = searchQuery.toLowerCase();
    return (
      s.studentName.toLowerCase().includes(q) ||
      s.studentId.toLowerCase().includes(q) ||
      s.studentEmail.toLowerCase().includes(q)
    );
  });

  const handleSingleEnroll = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedExam) return;

    if (!singleName.trim() || !singleId.trim() || !singleEmail.trim()) {
      showToast('Please provide Name, Student ID, and College Email.');
      return;
    }

    const res = enrollSingleStudent(
      selectedExam.id,
      singleName.trim(),
      singleId.trim(),
      singleEmail.trim().toLowerCase(),
      singleDept
    );

    if (res.success) {
      setSingleName('');
      setSingleId('');
      setSingleEmail('');
    }
  };

  const handleLoadSampleCsv = () => {
    const sample = `Liam Henderson, STU-2026-9045, liam.h@campus.edu, Computer Science\nSophia Martinez, STU-2026-9046, sophia.m@campus.edu, Information Technology\nDavid Kim, STU-2026-9047, david.kim@campus.edu, Software Engineering`;
    setCsvText(sample);
  };

  const handleCsvSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedExam) return;

    if (!csvText.trim()) {
      showToast('Please enter or upload CSV data.');
      return;
    }

    const lines = csvText.split('\n');
    const studentsToEnroll: Omit<EnrolledStudent, 'id' | 'enrolledAt'>[] = [];

    for (const line of lines) {
      const parts = line.split(',').map((p) => p.trim());
      if (parts.length >= 3 && parts[0] && parts[1] && parts[2]) {
        studentsToEnroll.push({
          examId: selectedExam.id,
          studentName: parts[0],
          studentId: parts[1],
          studentEmail: parts[2].toLowerCase(),
          department: parts[3] || 'Computer Science',
          enrollmentStatus: 'enrolled',
          examStatus: 'not_started'
        });
      }
    }

    if (studentsToEnroll.length === 0) {
      showToast('No valid CSV rows parsed. Format: Name, StudentID, Email, Department');
      return;
    }

    enrollBulkStudents(selectedExam.id, studentsToEnroll);
    setCsvText('');
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      if (text) {
        setCsvText(text);
        showToast('CSV file content loaded into text area.');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 text-purple-700 text-xs font-mono font-bold border border-purple-200 mb-1">
            <Users className="w-3.5 h-3.5 text-purple-600" />
            <span>Candidate Enrollment & Roster Management</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Enroll Students in Examinations
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Eligibility verification requires students to be enrolled before access codes are accepted.
          </p>
        </div>

        {/* Exam Picker dropdown */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-600 font-mono">Exam:</span>
          <select
            value={selectedExam?.id || ''}
            onChange={(e) => setActiveExamId(e.target.value)}
            className="px-3.5 py-2 rounded-xl bg-white border border-purple-200 text-xs font-bold text-purple-900 focus:ring-2 focus:ring-purple-400 shadow-2xs"
          >
            {exams.map((ex) => (
              <option key={ex.id} value={ex.id}>
                {ex.name} ({ex.accessCode})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Main Grid: Enrollment Form (Left) & Enrolled Roster (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 1 Column: Enrollment Input Forms */}
        <div className="space-y-4">
          
          <div className="bg-white rounded-3xl p-6 border border-pink-100/80 shadow-xs space-y-5">
            
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <UserPlus className="w-4 h-4 text-purple-600" />
                <span>Enroll Candidates</span>
              </h3>
              <span className="text-[10px] font-mono text-purple-700 font-bold bg-purple-50 px-2 py-0.5 rounded">
                {selectedExam?.accessCode}
              </span>
            </div>

            {/* Tab switch: Single vs CSV */}
            <div className="p-1 bg-slate-100 rounded-xl grid grid-cols-2 gap-1 text-xs font-bold">
              <button
                type="button"
                onClick={() => setEnrollTab('single')}
                className={`py-1.5 rounded-lg transition-all ${
                  enrollTab === 'single'
                    ? 'bg-white text-purple-900 shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Single Candidate
              </button>
              <button
                type="button"
                onClick={() => setEnrollTab('csv')}
                className={`py-1.5 rounded-lg transition-all ${
                  enrollTab === 'csv'
                    ? 'bg-white text-purple-900 shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Bulk CSV Import
              </button>
            </div>

            {enrollTab === 'single' ? (
              <form onSubmit={handleSingleEnroll} className="space-y-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    Student Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={singleName}
                    onChange={(e) => setSingleName(e.target.value)}
                    placeholder="e.g. Rachel Adams"
                    className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs text-slate-800"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    Student ID
                  </label>
                  <input
                    type="text"
                    required
                    value={singleId}
                    onChange={(e) => setSingleId(e.target.value)}
                    placeholder="e.g. STU-2026-9048"
                    className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs text-slate-800 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    College Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={singleEmail}
                    onChange={(e) => setSingleEmail(e.target.value)}
                    placeholder="student@campus.edu"
                    className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs text-slate-800 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    Department
                  </label>
                  <input
                    type="text"
                    value={singleDept}
                    onChange={(e) => setSingleDept(e.target.value)}
                    placeholder="e.g. Computer Science"
                    className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs text-slate-800"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-md shadow-purple-200 transition-all pt-1"
                >
                  <UserPlus className="w-3.5 h-3.5" />
                  <span>Enroll in {selectedExam?.name.substring(0, 20)}...</span>
                </button>
              </form>
            ) : (
              <form onSubmit={handleCsvSubmit} className="space-y-3">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="font-bold text-slate-700">Paste or Upload CSV</span>
                  <button
                    type="button"
                    onClick={handleLoadSampleCsv}
                    className="text-purple-600 font-bold hover:underline"
                  >
                    Load Sample Data
                  </button>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-[10px] text-slate-500 font-mono">
                  Format: FullName, StudentID, Email, Department
                </div>

                <textarea
                  rows={4}
                  value={csvText}
                  onChange={(e) => setCsvText(e.target.value)}
                  placeholder="Liam Henderson, STU-2026-9045, liam.h@campus.edu, Computer Science"
                  className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs text-slate-800 font-mono"
                />

                <div className="flex items-center justify-between gap-2">
                  <label className="cursor-pointer px-3 py-1.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-[11px] font-semibold text-slate-600 flex items-center gap-1">
                    <Upload className="w-3 h-3" />
                    <span>Upload .CSV</span>
                    <input
                      type="file"
                      accept=".csv,.txt"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>

                  <button
                    type="submit"
                    className="px-4 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold shadow-xs"
                  >
                    Import & Enroll
                  </button>
                </div>
              </form>
            )}

          </div>

          {/* Quick Notice */}
          <div className="p-4 rounded-2xl bg-purple-50/70 border border-purple-100 text-xs text-purple-900 space-y-1">
            <div className="font-bold flex items-center gap-1 text-[11px]">
              <ShieldCheck className="w-3.5 h-3.5 text-purple-600" />
              <span>Eligibility Gate Rule</span>
            </div>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              When students log in with their college email, the system cross-references this roster. If their email is not present on this list, access is rejected immediately.
            </p>
          </div>

        </div>

        {/* Right 2 Columns: Enrolled Students Roster Table */}
        <div className="lg:col-span-2 space-y-4">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-slate-900">
                Enrolled Candidates Roster
              </h2>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-purple-100 text-purple-800">
                {enrolledInThisExam.length}
              </span>
            </div>

            {/* Search filter */}
            <div className="relative max-w-xs w-full">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name, ID, or email..."
                className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-white border border-slate-200 text-xs text-slate-800"
              />
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-pink-100/80 shadow-xs overflow-hidden">
            {filteredStudents.length === 0 ? (
              <div className="p-8 text-center space-y-2">
                <Users className="w-8 h-8 text-slate-300 mx-auto" />
                <p className="text-xs text-slate-500">
                  No candidates enrolled in this exam yet. Use the form on the left to add candidates.
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 border-b border-slate-100 text-[11px] uppercase tracking-wider text-slate-500 font-mono">
                    <tr>
                      <th className="px-5 py-3.5">Candidate Name</th>
                      <th className="px-4 py-3.5">Student ID</th>
                      <th className="px-4 py-3.5">College Email</th>
                      <th className="px-4 py-3.5">Department</th>
                      <th className="px-4 py-3.5">Exam Status</th>
                      <th className="px-4 py-3.5 text-right">Remove</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredStudents.map((st) => {
                      const attempt = allAttempts.find(
                        (a) => a.examId === selectedExam.id && a.studentEmail?.toLowerCase() === st.studentEmail.toLowerCase()
                      );

                      return (
                        <tr key={st.id} className="hover:bg-purple-50/20 transition-colors">
                          <td className="px-5 py-3.5 font-bold text-slate-900">
                            {st.studentName}
                          </td>
                          <td className="px-4 py-3.5 font-mono text-slate-600">
                            {st.studentId}
                          </td>
                          <td className="px-4 py-3.5 font-mono text-purple-700">
                            {st.studentEmail}
                          </td>
                          <td className="px-4 py-3.5 text-slate-600">
                            {st.department}
                          </td>
                          <td className="px-4 py-3.5">
                            {attempt?.status === 'submitted' ? (
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                                Submitted ({attempt.score}/{attempt.maxScore})
                              </span>
                            ) : attempt?.status === 'in_progress' ? (
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 animate-pulse">
                                In Progress
                              </span>
                            ) : (
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-600">
                                Not Started
                              </span>
                            )}
                          </td>
                          <td className="px-4 py-3.5 text-right">
                            <button
                              onClick={() => unenrollStudent(st.id)}
                              className="text-slate-400 hover:text-rose-600 p-1"
                              title="Unenroll student"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
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

    </div>
  );
};
