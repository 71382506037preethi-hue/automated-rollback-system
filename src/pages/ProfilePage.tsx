import React, { useState } from 'react';
import { useSystem } from '../context/SystemContext';
import { 
  User, 
  Mail, 
  BookOpen, 
  Building2, 
  Calendar, 
  ShieldCheck, 
  Check, 
  Edit3, 
  Camera, 
  Sparkles,
  GraduationCap
} from 'lucide-react';

export const ProfilePage: React.FC = () => {
  const { currentUser, updateProfile, setActivePage } = useSystem();

  if (!currentUser) {
    return (
      <div className="max-w-md mx-auto my-16 text-center px-4">
        <div className="p-8 rounded-3xl bg-white/90 backdrop-blur-xl border border-pink-200 shadow-md">
          <p className="text-slate-700 mb-4 font-medium text-sm">Please log in to view your profile.</p>
          <button
            onClick={() => setActivePage('login')}
            className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-bold shadow-xs"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  const [isEditing, setIsEditing] = useState(false);
  const [fullName, setFullName] = useState(currentUser.fullName);
  const [department, setDepartment] = useState(currentUser.department);
  const [year, setYear] = useState(currentUser.year);
  const [collegeEmail, setCollegeEmail] = useState(currentUser.collegeEmail);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      fullName: fullName.trim(),
      department,
      year,
      collegeEmail: collegeEmail.trim()
    });
    setIsEditing(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-purple-600 uppercase tracking-wider font-mono">
            <Sparkles className="w-3.5 h-3.5 text-pink-500 animate-star-twinkle" />
            <span>Student Credentials & Identity</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
            Student Profile
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Persistent academic record and session verification for the online examination system.
          </p>
        </div>

        <div>
          {!isEditing ? (
            <button
              id="edit-profile-btn"
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 rounded-xl bg-white border border-purple-200 hover:border-pink-300 hover:bg-purple-50 text-purple-700 text-xs font-bold flex items-center gap-1.5 shadow-2xs transition-all cursor-pointer"
            >
              <Edit3 className="w-4 h-4 text-purple-600" />
              <span>Edit Profile Details</span>
            </button>
          ) : (
            <button
              id="cancel-edit-profile-btn"
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-700 text-xs font-bold transition-all cursor-pointer"
            >
              Cancel Editing
            </button>
          )}
        </div>
      </div>

      {/* Main Profile Card in Pearl Glass Style */}
      <div className="bg-white/95 backdrop-blur-xl border border-purple-100 rounded-3xl shadow-xs overflow-hidden">
        
        {/* Banner header: Iridescent unicorn gradient */}
        <div className="h-32 bg-gradient-to-r from-pink-300 via-purple-300 via-sky-300 to-teal-300 relative p-6 flex items-end">
          <div className="absolute top-4 right-4 flex items-center gap-2 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-purple-800 text-xs font-mono font-bold shadow-2xs border border-white">
            <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
            <span>Persistent Identity Verified</span>
          </div>
        </div>

        {/* Profile Info Content */}
        <div className="p-6 sm:p-8 relative">
          
          {/* Avatar floating */}
          <div className="-mt-20 mb-6 flex items-end gap-5">
            <div className="w-24 h-24 rounded-3xl bg-gradient-to-tr from-purple-600 to-pink-500 border-4 border-white shadow-md flex items-center justify-center text-white text-3xl font-extrabold shadow-purple-200">
              {currentUser.fullName.charAt(0)}
            </div>

            <div className="mb-2">
              <h2 className="text-xl font-extrabold text-slate-900">
                {currentUser.fullName}
              </h2>
              <div className="flex items-center gap-2 text-xs font-mono text-purple-700">
                <span className="bg-purple-50 px-2 py-0.5 rounded-lg border border-purple-100">
                  ID: {currentUser.studentId}
                </span>
                <span>•</span>
                <span className="text-slate-500">{currentUser.department}</span>
              </div>
            </div>
          </div>

          {!isEditing ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-sans">
              <div className="p-4 rounded-2xl bg-purple-50/40 border border-purple-100 space-y-1">
                <span className="text-[11px] font-mono text-slate-400 font-bold uppercase">
                  Institutional Email
                </span>
                <div className="text-sm font-bold text-slate-800 flex items-center gap-2">
                  <Mail className="w-4 h-4 text-purple-500" />
                  <span>{currentUser.collegeEmail}</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-purple-50/40 border border-purple-100 space-y-1">
                <span className="text-[11px] font-mono text-slate-400 font-bold uppercase">
                  Department
                </span>
                <div className="text-sm font-bold text-slate-800 flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-purple-500" />
                  <span>{currentUser.department}</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-purple-50/40 border border-purple-100 space-y-1">
                <span className="text-[11px] font-mono text-slate-400 font-bold uppercase">
                  Academic Year
                </span>
                <div className="text-sm font-bold text-slate-800 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-purple-500" />
                  <span>Year {currentUser.year}</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-purple-50/40 border border-purple-100 space-y-1">
                <span className="text-[11px] font-mono text-slate-400 font-bold uppercase">
                  Exam System Status
                </span>
                <div className="text-sm font-bold text-teal-700 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-teal-600" />
                  <span>Protected by DevOps Watchdog</span>
                </div>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-purple-50/40 border border-purple-100 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-purple-400 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Institutional Email
                  </label>
                  <input
                    type="email"
                    value={collegeEmail}
                    onChange={(e) => setCollegeEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-purple-50/40 border border-purple-100 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-purple-400 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Department
                  </label>
                  <input
                    type="text"
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-purple-50/40 border border-purple-100 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-purple-400 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Academic Year
                  </label>
                  <select
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-purple-50/40 border border-purple-100 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-purple-400 focus:bg-white"
                  >
                    <option value="1">1st Year</option>
                    <option value="2">2nd Year</option>
                    <option value="3">3rd Year</option>
                    <option value="4">4th Year</option>
                  </select>
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-bold shadow-xs"
                >
                  Save Profile Changes
                </button>
              </div>
            </form>
          )}

        </div>

      </div>

    </div>
  );
};
