import React, { useState } from 'react';
import { useSystem } from '../context/SystemContext';
import { 
  Lock, 
  Mail, 
  User, 
  GraduationCap, 
  ShieldCheck, 
  Building2, 
  Calendar, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { UserRole } from '../types';

export const RegisterPage: React.FC = () => {
  const { registerStudent, registerAdmin, setActivePage } = useSystem();

  const [regRole, setRegRole] = useState<UserRole>('student');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Common fields
  const [fullName, setFullName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [department, setDepartment] = useState('Computer Science & Engineering');

  // Student specific
  const [studentId, setStudentId] = useState('');
  const [collegeEmail, setCollegeEmail] = useState('');
  const [year, setYear] = useState('3rd Year');

  // Admin specific
  const [adminId, setAdminId] = useState('');
  const [officialEmail, setOfficialEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }

    if (password.length < 6) {
      setErrorMessage('Password must be at least 6 characters long.');
      return;
    }

    if (regRole === 'student') {
      if (!fullName.trim() || !studentId.trim() || !collegeEmail.trim()) {
        setErrorMessage('Please fill in all required student registration fields.');
        return;
      }

      const res = registerStudent({
        fullName: fullName.trim(),
        studentId: studentId.trim(),
        collegeEmail: collegeEmail.trim().toLowerCase(),
        password,
        department,
        year
      });

      if (!res.success) {
        setErrorMessage(res.message);
        return;
      }

      setSuccessMessage('Student account created successfully! Redirecting to student portal...');
      setTimeout(() => {
        setActivePage('dashboard');
      }, 800);
    } else {
      if (!fullName.trim() || !adminId.trim() || !officialEmail.trim()) {
        setErrorMessage('Please fill in all required admin registration fields.');
        return;
      }

      const res = registerAdmin({
        fullName: fullName.trim(),
        adminId: adminId.trim(),
        officialEmail: officialEmail.trim().toLowerCase(),
        password,
        department
      });

      if (!res.success) {
        setErrorMessage(res.message);
        return;
      }

      setSuccessMessage('Admin credentials verified & registered! Redirecting to administration dashboard...');
      setTimeout(() => {
        setActivePage('admin_dashboard');
      }, 800);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-10 relative overflow-hidden">
      {/* Background ambient orbs */}
      <div className="absolute -top-20 -left-20 w-80 h-80 bg-pink-300/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-purple-300/20 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-lg space-y-6 relative z-10">
        
        {/* Title */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-purple-200 text-purple-700 text-xs font-mono font-bold shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-pink-500 animate-star-twinkle" />
            <span>Academic Identity Verification</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Create an Account
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Register as a candidate or academic examination controller.
          </p>
        </div>

        {/* Role Select Pills */}
        <div className="p-1.5 bg-white/85 backdrop-blur-md rounded-2xl border border-purple-100 shadow-xs grid grid-cols-2 gap-1.5">
          <button
            type="button"
            id="register-role-student-btn"
            onClick={() => {
              setRegRole('student');
              setErrorMessage('');
            }}
            className={`py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all ${
              regRole === 'student'
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-purple-700 hover:bg-purple-50/50'
            }`}
          >
            <GraduationCap className="w-4 h-4" />
            <span>Register as Student</span>
          </button>

          <button
            type="button"
            id="register-role-admin-btn"
            onClick={() => {
              setRegRole('admin');
              setErrorMessage('');
            }}
            className={`py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all ${
              regRole === 'admin'
                ? 'bg-gradient-to-r from-indigo-700 to-purple-700 text-white shadow-xs'
                : 'text-slate-600 hover:text-indigo-700 hover:bg-indigo-50/50'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Register as Admin</span>
          </button>
        </div>

        {/* Registration Card */}
        <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-pink-100/80 shadow-lg shadow-purple-100/30 space-y-5">
          
          {errorMessage && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {successMessage && (
            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-medium flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
              <span>{successMessage}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Full Name */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <User className="w-4 h-4" />
                </div>
                <input
                  id="reg-fullname-input"
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder={regRole === 'student' ? 'e.g. Alex Chen' : 'e.g. Dr. Marcus Vance'}
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-white border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:ring-2 focus:ring-purple-400/50 focus:border-purple-400"
                />
              </div>
            </div>

            {/* Role-Specific ID and Email */}
            {regRole === 'student' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Student ID
                  </label>
                  <input
                    id="reg-studentid-input"
                    type="text"
                    required
                    value={studentId}
                    onChange={(e) => setStudentId(e.target.value)}
                    placeholder="e.g. STU-2026-9042"
                    className="w-full px-3 py-2.5 rounded-xl bg-white border border-slate-200 text-xs text-slate-800 placeholder-slate-400 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    College Email
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                      <Mail className="w-4 h-4" />
                    </div>
                    <input
                      id="reg-student-email-input"
                      type="email"
                      required
                      value={collegeEmail}
                      onChange={(e) => setCollegeEmail(e.target.value)}
                      placeholder="student@campus.edu"
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-white border border-slate-200 text-xs text-slate-800 placeholder-slate-400 font-mono"
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Admin ID
                  </label>
                  <input
                    id="reg-adminid-input"
                    type="text"
                    required
                    value={adminId}
                    onChange={(e) => setAdminId(e.target.value)}
                    placeholder="e.g. ADM-2026-009"
                    className="w-full px-3 py-2.5 rounded-xl bg-white border border-slate-200 text-xs text-slate-800 placeholder-slate-400 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Official Email
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                      <Mail className="w-4 h-4" />
                    </div>
                    <input
                      id="reg-admin-email-input"
                      type="email"
                      required
                      value={officialEmail}
                      onChange={(e) => setOfficialEmail(e.target.value)}
                      placeholder="admin@examsafe.edu"
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-white border border-slate-200 text-xs text-slate-800 placeholder-slate-400 font-mono"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Department & Year / Academic Unit */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Department
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <Building2 className="w-4 h-4" />
                  </div>
                  <select
                    id="reg-department-select"
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-white border border-slate-200 text-xs text-slate-800 focus:ring-2 focus:ring-purple-400/50"
                  >
                    <option>Computer Science & Engineering</option>
                    <option>Information Technology</option>
                    <option>Software Engineering & DevOps</option>
                    <option>Electrical & Computer Engineering</option>
                    <option>Data Science & AI</option>
                  </select>
                </div>
              </div>

              {regRole === 'student' ? (
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Academic Year
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                      <Calendar className="w-4 h-4" />
                    </div>
                    <select
                      id="reg-year-select"
                      value={year}
                      onChange={(e) => setYear(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-white border border-slate-200 text-xs text-slate-800 focus:ring-2 focus:ring-purple-400/50"
                    >
                      <option>1st Year (Freshman)</option>
                      <option>2nd Year (Sophomore)</option>
                      <option>3rd Year (Junior)</option>
                      <option>4th Year (Senior)</option>
                      <option>Postgraduate / Masters</option>
                    </select>
                  </div>
                </div>
              ) : (
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Administration Level
                  </label>
                  <input
                    type="text"
                    disabled
                    value="Exam Controller / Proctor"
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-500 font-medium"
                  />
                </div>
              )}
            </div>

            {/* Password & Confirm */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    id="reg-password-input"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Min 6 characters"
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-white border border-slate-200 text-xs text-slate-800 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Confirm Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    id="reg-confirm-password-input"
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Repeat password"
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-white border border-slate-200 text-xs text-slate-800 font-mono"
                  />
                </div>
              </div>
            </div>

            <button
              id="register-submit-btn"
              type="submit"
              className={`w-full py-3 rounded-2xl text-white text-xs font-bold flex items-center justify-center gap-2 shadow-md transition-all ${
                regRole === 'admin'
                  ? 'bg-gradient-to-r from-indigo-700 to-purple-700 hover:from-indigo-800'
                  : 'bg-gradient-to-r from-purple-600 via-pink-600 to-purple-700 hover:opacity-95'
              }`}
            >
              <span>{regRole === 'admin' ? 'Register as Examination Admin' : 'Complete Student Registration'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="text-center pt-2">
            <span className="text-xs text-slate-500">
              Already have an account?{' '}
              <button
                id="goto-login-btn"
                onClick={() => setActivePage('login')}
                className="font-bold text-purple-700 hover:text-purple-900 hover:underline"
              >
                Sign In
              </button>
            </span>
          </div>

        </div>

      </div>
    </div>
  );
};
