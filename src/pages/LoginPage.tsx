import React, { useState } from 'react';
import { useSystem } from '../context/SystemContext';
import { 
  Lock, 
  Mail, 
  User, 
  GraduationCap, 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  Star,
  Info,
  KeyRound,
  BookOpen
} from 'lucide-react';
import { UserRole } from '../types';

export const LoginPage: React.FC = () => {
  const { loginUser, setActivePage } = useSystem();

  const [selectedRole, setSelectedRole] = useState<UserRole>('student');
  const [emailOrId, setEmailOrId] = useState('alex.chen@campus.edu');
  const [password, setPassword] = useState('password123');
  const [errorMessage, setErrorMessage] = useState('');

  const handleRoleChange = (newRole: UserRole) => {
    setSelectedRole(newRole);
    setErrorMessage('');
    if (newRole === 'student') {
      setEmailOrId('alex.chen@campus.edu');
      setPassword('password123');
    } else {
      setEmailOrId('admin@examsafe.edu');
      setPassword('admin123');
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!emailOrId.trim() || !password.trim()) {
      setErrorMessage('Please enter both identifier and password.');
      return;
    }

    const res = loginUser(emailOrId.trim(), password, selectedRole);
    if (!res.success) {
      setErrorMessage(res.message);
      return;
    }

    if (selectedRole === 'admin') {
      setActivePage('admin_dashboard');
    } else {
      setActivePage('dashboard');
    }
  };

  return (
    <div className="min-h-[82vh] flex items-center justify-center px-4 py-10 relative overflow-hidden">
      {/* Soft ambient background glows */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-pink-200/25 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-purple-200/25 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md space-y-6 relative z-10">
        
        {/* Title Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-purple-200/80 text-purple-700 text-xs font-mono font-bold shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-pink-500 animate-star-twinkle" />
            <span>Dual-Role Unified Gateway</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Sign In to Exam<span className="bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 bg-clip-text text-transparent">Safe</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Select your academic portal to access examinations or administration controls.
          </p>
        </div>

        {/* Role Toggle Tabs */}
        <div className="p-1.5 bg-white/80 backdrop-blur-md rounded-2xl border border-purple-100 shadow-xs grid grid-cols-2 gap-1.5">
          <button
            type="button"
            id="role-select-student-tab"
            onClick={() => handleRoleChange('student')}
            className={`py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all ${
              selectedRole === 'student'
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-xs shadow-purple-200'
                : 'text-slate-600 hover:text-purple-700 hover:bg-purple-50/50'
            }`}
          >
            <GraduationCap className="w-4 h-4" />
            <span>Continue as Student</span>
          </button>

          <button
            type="button"
            id="role-select-admin-tab"
            onClick={() => handleRoleChange('admin')}
            className={`py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all ${
              selectedRole === 'admin'
                ? 'bg-gradient-to-r from-indigo-700 to-purple-700 text-white shadow-xs shadow-indigo-200'
                : 'text-slate-600 hover:text-indigo-700 hover:bg-indigo-50/50'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Continue as Admin</span>
          </button>
        </div>

        {/* Login Card */}
        <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-pink-100/80 shadow-lg shadow-purple-100/30 space-y-5">
          
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
              {selectedRole === 'student' ? (
                <>
                  <BookOpen className="w-3.5 h-3.5 text-purple-600" />
                  <span>Student Credentials</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="w-3.5 h-3.5 text-indigo-600" />
                  <span>Admin Credentials</span>
                </>
              )}
            </span>
            <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-md bg-purple-50 text-purple-700 border border-purple-100">
              {selectedRole === 'student' ? 'Role: STUDENT' : 'Role: ADMIN'}
            </span>
          </div>

          {errorMessage && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium animate-in fade-in">
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                {selectedRole === 'student' ? 'College Email or Student ID' : 'Official Email or Admin ID'}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  {selectedRole === 'student' ? <Mail className="w-4 h-4" /> : <User className="w-4 h-4" />}
                </div>
                <input
                  id="login-identifier-input"
                  type="text"
                  required
                  value={emailOrId}
                  onChange={(e) => setEmailOrId(e.target.value)}
                  placeholder={selectedRole === 'student' ? 'alex.chen@campus.edu or STU-2026-9042' : 'admin@examsafe.edu or ADM-2026-001'}
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-400/50 focus:border-purple-400 transition-all font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  id="login-password-input"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-400/50 focus:border-purple-400 transition-all font-mono"
                />
              </div>
            </div>

            <button
              id="login-submit-btn"
              type="submit"
              className={`w-full py-3 rounded-2xl text-white text-xs font-bold flex items-center justify-center gap-2 shadow-md transition-all ${
                selectedRole === 'admin'
                  ? 'bg-gradient-to-r from-indigo-700 to-purple-700 hover:from-indigo-800 hover:to-purple-800 shadow-indigo-200'
                  : 'bg-gradient-to-r from-purple-600 via-pink-600 to-purple-700 hover:opacity-95 shadow-purple-200'
              }`}
            >
              <span>{selectedRole === 'admin' ? 'Authenticate as Admin' : 'Access Student Dashboard'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Quick 1-Click Demo Accounts for Test Evaluators */}
          <div className="pt-3 border-t border-slate-100 space-y-2">
            <span className="text-[11px] font-bold text-slate-500 block uppercase tracking-wider">
              Quick Test Credentials:
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <button
                type="button"
                id="quick-fill-student-btn"
                onClick={() => {
                  setSelectedRole('student');
                  setEmailOrId('alex.chen@campus.edu');
                  setPassword('password123');
                }}
                className="p-2 rounded-xl bg-purple-50/70 hover:bg-purple-100/70 border border-purple-200/60 text-left transition-colors"
              >
                <div className="flex items-center gap-1 text-[11px] font-bold text-purple-900">
                  <GraduationCap className="w-3 h-3 text-purple-600" />
                  <span>Student (Alex Chen)</span>
                </div>
                <div className="text-[10px] text-slate-500 font-mono mt-0.5 truncate">
                  alex.chen@campus.edu
                </div>
              </button>

              <button
                type="button"
                id="quick-fill-admin-btn"
                onClick={() => {
                  setSelectedRole('admin');
                  setEmailOrId('admin@examsafe.edu');
                  setPassword('admin123');
                }}
                className="p-2 rounded-xl bg-indigo-50/70 hover:bg-indigo-100/70 border border-indigo-200/60 text-left transition-colors"
              >
                <div className="flex items-center gap-1 text-[11px] font-bold text-indigo-900">
                  <ShieldCheck className="w-3 h-3 text-indigo-600" />
                  <span>Admin (Dr. Reed)</span>
                </div>
                <div className="text-[10px] text-slate-500 font-mono mt-0.5 truncate">
                  admin@examsafe.edu
                </div>
              </button>
            </div>
          </div>

          <div className="text-center pt-2">
            <span className="text-xs text-slate-500">
              Need a new account?{' '}
              <button
                id="goto-register-btn"
                onClick={() => setActivePage('register')}
                className="font-bold text-purple-700 hover:text-purple-900 hover:underline"
              >
                Create an account
              </button>
            </span>
          </div>

        </div>

      </div>
    </div>
  );
};
