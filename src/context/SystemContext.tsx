import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { 
  SystemHealthStatus, 
  DeploymentStatusType, 
  RollbackEvent, 
  ActivePage, 
  AdminAccount,
  StudentAccount, 
  CurrentUser,
  UserRole,
  Exam,
  EnrolledStudent,
  ExamAttempt,
  AuditLog,
  StudentAnswers
} from '../types';
import { 
  DEFAULT_ADMIN_ACCOUNTS, 
  DEFAULT_SAMPLE_STUDENTS, 
  INITIAL_EXAMS, 
  generateInitialEnrolledStudents, 
  INITIAL_AUDIT_LOGS, 
  INITIAL_ROLLBACK_EVENTS,
  MOCK_QUESTIONS 
} from '../data/mockData';

interface BulkEnrollResult {
  total: number;
  valid: number;
  invalid: number;
  alreadyEnrolled: number;
  added: number;
}

interface SystemContextType {
  activePage: ActivePage;
  setActivePage: (page: ActivePage) => void;

  // Authentication & Users
  currentUser: CurrentUser | null;
  role: UserRole | null;
  loginUser: (emailOrId: string, pass: string, role: UserRole) => { success: boolean; message: string };
  registerAdmin: (data: Omit<AdminAccount, 'id' | 'role' | 'joinedDate'>) => { success: boolean; message: string };
  registerStudent: (data: Omit<StudentAccount, 'id' | 'role' | 'joinedDate'>) => { success: boolean; message: string };
  logoutUser: () => void;
  updateProfile: (updatedData: Partial<CurrentUser>) => void;
  adminAccounts: AdminAccount[];
  studentAccounts: StudentAccount[];

  // Exams Management
  exams: Exam[];
  createExam: (examData: Omit<Exam, 'id' | 'createdAt' | 'accessCode'>) => { success: boolean; exam: Exam };
  updateExam: (examId: string, data: Partial<Exam>) => void;
  deleteExam: (examId: string) => void;
  generateExamCode: (examId: string) => string;
  changeExamStatus: (examId: string, status: 'scheduled' | 'active' | 'closed') => void;
  activeExamId: string;
  setActiveExamId: (id: string) => void;

  // Enrollments
  enrolledStudents: EnrolledStudent[];
  enrollStudent: (examId: string, email: string, name?: string, studentId?: string) => { success: boolean; message: string };
  bulkEnrollStudents: (examId: string, emailList: string[]) => BulkEnrollResult;
  removeEnrolledStudent: (enrollmentId: string) => void;
  isStudentEnrolledInExam: (examId: string, studentEmail: string) => boolean;
  getEnrolledStudentsForExam: (examId: string) => EnrolledStudent[];

  // Exam Access & Eligibility Verification
  verifyExamEligibility: (examId: string, inputCode: string) => { eligible: boolean; reason?: string };

  // Student Active Exam Session & Attempts
  activeAttempt: ExamAttempt | null;
  startExamAttempt: (examId: string) => ExamAttempt;
  saveStudentAnswer: (examId: string, questionId: number, optionIndex: number) => void;
  updateExamProgress: (examId: string, questionIndex: number, markedList: number[], timeLeft: number) => void;
  submitExamAttempt: (examId: string) => { score: number; maxScore: number; success: boolean };
  hasStudentSubmittedExam: (examId: string, studentId: string) => boolean;
  getAttemptForStudentAndExam: (examId: string, studentId: string) => ExamAttempt | undefined;
  allAttempts: ExamAttempt[];

  // Auto-Save notification states
  lastAnswerSavedTime: string | null;
  isRestoringSession: boolean;

  // DevOps & Automated Rollback
  systemStatus: SystemHealthStatus;
  currentVersion: string;
  previousStableVersion: string;
  deploymentStatus: DeploymentStatusType;
  rollbackStatus: 'Idle' | 'Initiating' | 'Restoring' | 'Completed';
  activeExamSessions: number;
  rollbackEvents: RollbackEvent[];
  isSimulating: boolean;
  simulationStep: number;
  simulationLogs: string[];
  triggerDeploymentFailureSimulation: () => void;
  closeSimulationModal: () => void;
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
  resetToInitialHealthyState: () => void;

  // Audit Logs
  auditLogs: AuditLog[];
  addAuditLog: (user: string, action: string, status: AuditLog['status'], details?: string) => void;

  // UI Toast
  toastMessage: string | null;
  showToast: (msg: string) => void;
  clearToast: () => void;
}

const SystemContext = createContext<SystemContextType | undefined>(undefined);

// Storage keys
const STORAGE_KEYS = {
  ADMINS: 'examsafe_admin_accounts_v2',
  STUDENTS: 'examsafe_student_accounts_v2',
  CURRENT_USER: 'examsafe_current_user_v2',
  EXAMS: 'examsafe_exams_v2',
  ENROLLMENTS: 'examsafe_enrollments_v2',
  ATTEMPTS: 'examsafe_attempts_v2',
  ROLLBACKS: 'examsafe_rollbacks_v2',
  AUDIT_LOGS: 'examsafe_audit_logs_v2'
};

export const SystemProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Navigation
  const [activePage, setActivePageRaw] = useState<ActivePage>('landing');

  // Accounts state
  const [adminAccounts, setAdminAccounts] = useState<AdminAccount[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ADMINS);
      if (saved) return JSON.parse(saved);
    } catch { /* fallback */ }
    return DEFAULT_ADMIN_ACCOUNTS;
  });

  const [studentAccounts, setStudentAccounts] = useState<StudentAccount[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.STUDENTS);
      if (saved) return JSON.parse(saved);
    } catch { /* fallback */ }
    return DEFAULT_SAMPLE_STUDENTS;
  });

  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
      if (saved) return JSON.parse(saved);
    } catch { /* fallback */ }
    // By default, not logged in so landing screen shows Login choice
    return null;
  });

  const role: UserRole | null = currentUser ? currentUser.role : null;

  // Save accounts to storage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.ADMINS, JSON.stringify(adminAccounts));
    } catch (e) {
      console.error(e);
    }
  }, [adminAccounts]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.STUDENTS, JSON.stringify(studentAccounts));
    } catch (e) {
      console.error(e);
    }
  }, [studentAccounts]);

  useEffect(() => {
    try {
      if (currentUser) {
        localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(currentUser));
      } else {
        localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
      }
    } catch (e) {
      console.error(e);
    }
  }, [currentUser]);

  // Exams State
  const [exams, setExams] = useState<Exam[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.EXAMS);
      if (saved) return JSON.parse(saved);
    } catch { /* fallback */ }
    return INITIAL_EXAMS;
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.EXAMS, JSON.stringify(exams));
    } catch (e) {
      console.error(e);
    }
  }, [exams]);

  const [activeExamId, setActiveExamId] = useState<string>('cs402');

  // Enrollments State
  const [enrolledStudents, setEnrolledStudents] = useState<EnrolledStudent[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ENROLLMENTS);
      if (saved) return JSON.parse(saved);
    } catch { /* fallback */ }
    return generateInitialEnrolledStudents();
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.ENROLLMENTS, JSON.stringify(enrolledStudents));
    } catch (e) {
      console.error(e);
    }
  }, [enrolledStudents]);

  // Exam Attempts State
  const [allAttempts, setAllAttempts] = useState<ExamAttempt[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ATTEMPTS);
      if (saved) return JSON.parse(saved);
    } catch { /* fallback */ }
    return [];
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.ATTEMPTS, JSON.stringify(allAttempts));
    } catch (e) {
      console.error(e);
    }
  }, [allAttempts]);

  // Audit Logs State
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.AUDIT_LOGS);
      if (saved) return JSON.parse(saved);
    } catch { /* fallback */ }
    return INITIAL_AUDIT_LOGS;
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.AUDIT_LOGS, JSON.stringify(auditLogs));
    } catch (e) {
      console.error(e);
    }
  }, [auditLogs]);

  // Rollback Events State
  const [rollbackEvents, setRollbackEvents] = useState<RollbackEvent[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ROLLBACKS);
      if (saved) return JSON.parse(saved);
    } catch { /* fallback */ }
    return INITIAL_ROLLBACK_EVENTS;
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.ROLLBACKS, JSON.stringify(rollbackEvents));
    } catch (e) {
      console.error(e);
    }
  }, [rollbackEvents]);

  // Telemetry & DevOps State
  const [systemStatus, setSystemStatus] = useState<SystemHealthStatus>('healthy');
  const [currentVersion, setCurrentVersion] = useState<string>('v2.0');
  const [previousStableVersion] = useState<string>('v1.9');
  const [deploymentStatus, setDeploymentStatus] = useState<DeploymentStatusType>('active');
  const [rollbackStatus, setRollbackStatus] = useState<'Idle' | 'Initiating' | 'Restoring' | 'Completed'>('Idle');
  const [activeExamSessions] = useState<number>(128);

  // Simulation Controls
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [simulationStep, setSimulationStep] = useState<number>(0);
  const [simulationLogs, setSimulationLogs] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // UI Toast & Session restore indicator
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [lastAnswerSavedTime, setLastAnswerSavedTime] = useState<string | null>(null);
  const [isRestoringSession, setIsRestoringSession] = useState<boolean>(false);

  const showToast = useCallback((msg: string) => setToastMessage(msg), []);
  const clearToast = useCallback(() => setToastMessage(null), []);

  const addAuditLog = useCallback((user: string, action: string, status: AuditLog['status'], details?: string) => {
    const newLog: AuditLog = {
      id: `LOG-${Date.now().toString().slice(-4)}`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      user,
      action,
      status,
      details: details || action
    };
    setAuditLogs((prev) => [newLog, ...prev]);
  }, []);

  // Safe navigation with Role-Based Access Control
  const setActivePage = useCallback((page: ActivePage) => {
    // Check if user is trying to access admin pages
    const adminOnlyPages: ActivePage[] = [
      'admin_dashboard',
      'admin_exams',
      'admin_enrollments',
      'admin_monitoring',
      'admin_results',
      'admin_audit_logs',
      'admin_profile'
    ];

    if (adminOnlyPages.includes(page)) {
      if (!currentUser || currentUser.role !== 'admin') {
        showToast('Access Denied: Administration credentials required.');
        setActivePageRaw('login');
        return;
      }
    }

    // Check student-only exam page
    if (page === 'exam' || page === 'student_results') {
      if (!currentUser || currentUser.role !== 'student') {
        showToast('Please log in as a student to access the examination interface.');
        setActivePageRaw('login');
        return;
      }
    }

    setActivePageRaw(page);
  }, [currentUser, showToast]);

  // Auth: Register Admin
  const registerAdmin = (adminData: Omit<AdminAccount, 'id' | 'role' | 'joinedDate'>) => {
    const emailLower = adminData.officialEmail.trim().toLowerCase();
    const idLower = adminData.adminId.trim().toLowerCase();

    const exists = adminAccounts.some(
      (a) => a.officialEmail.toLowerCase() === emailLower || a.adminId.toLowerCase() === idLower
    );

    if (exists) {
      return { success: false, message: 'An admin account with this Official Email or Admin ID already exists.' };
    }

    const newAdmin: AdminAccount = {
      ...adminData,
      officialEmail: emailLower,
      adminId: adminData.adminId.trim(),
      id: `ADM-${Date.now().toString().slice(-4)}`,
      role: 'admin',
      joinedDate: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
    };

    setAdminAccounts((prev) => [newAdmin, ...prev]);
    setCurrentUser(newAdmin);
    addAuditLog(`${newAdmin.fullName} (Admin)`, 'Admin Registration', 'Success', `New admin account registered: ${newAdmin.officialEmail}`);
    showToast(`Admin account created! Welcome, ${newAdmin.fullName}.`);
    return { success: true, message: 'Admin account registered successfully!' };
  };

  // Auth: Register Student
  const registerStudent = (studentData: Omit<StudentAccount, 'id' | 'role' | 'joinedDate'>) => {
    const emailLower = studentData.collegeEmail.trim().toLowerCase();
    const idLower = studentData.studentId.trim().toLowerCase();

    const exists = studentAccounts.some(
      (s) => s.collegeEmail.toLowerCase() === emailLower || s.studentId.toLowerCase() === idLower
    );

    if (exists) {
      return { success: false, message: 'A student account with this College Email or Student ID already exists.' };
    }

    const newStudent: StudentAccount = {
      ...studentData,
      collegeEmail: emailLower,
      studentId: studentData.studentId.trim(),
      id: studentData.studentId.trim().toUpperCase().replace(/\s+/g, '-'),
      role: 'student',
      avatarColor: 'from-purple-500 to-pink-600',
      joinedDate: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
    };

    setStudentAccounts((prev) => [newStudent, ...prev]);
    setCurrentUser(newStudent);
    addAuditLog(`${newStudent.fullName} (Student)`, 'Student Registration', 'Success', `New student account registered: ${newStudent.collegeEmail}`);
    showToast(`Welcome, ${newStudent.fullName}! Student registration complete.`);
    return { success: true, message: 'Student account registered successfully!' };
  };

  // Auth: Login User
  const loginUser = (emailOrId: string, pass: string, targetRole: UserRole) => {
    const term = emailOrId.trim().toLowerCase();

    if (targetRole === 'admin') {
      const foundAdmin = adminAccounts.find(
        (a) => (a.officialEmail.toLowerCase() === term || a.adminId.toLowerCase() === term) && a.password === pass
      );

      if (!foundAdmin) {
        return { success: false, message: 'Invalid Admin credentials. Check your Official Email / Admin ID and password.' };
      }

      setCurrentUser(foundAdmin);
      addAuditLog(`${foundAdmin.fullName} (Admin)`, 'Admin Login', 'Success', `Admin logged in from control portal.`);
      showToast(`Welcome to Administration, ${foundAdmin.fullName}!`);
      return { success: true, message: 'Login successful' };
    } else {
      const foundStudent = studentAccounts.find(
        (s) => (s.collegeEmail.toLowerCase() === term || s.studentId.toLowerCase() === term) && s.password === pass
      );

      if (!foundStudent) {
        return { success: false, message: 'Invalid Student credentials. Check your College Email / Student ID and password.' };
      }

      setCurrentUser(foundStudent);
      addAuditLog(`${foundStudent.fullName} (Student)`, 'Student Login', 'Success', `Student logged into exam portal.`);
      showToast(`Welcome back, ${foundStudent.fullName}!`);
      return { success: true, message: 'Login successful' };
    }
  };

  // Auth: Logout
  const logoutUser = () => {
    if (currentUser) {
      addAuditLog(currentUser.fullName, `${currentUser.role === 'admin' ? 'Admin' : 'Student'} Logout`, 'Info', 'User logged out securely.');
    }
    setCurrentUser(null);
    showToast('You have been logged out securely.');
    setActivePageRaw('landing');
  };

  // Update Profile
  const updateProfile = (updatedData: Partial<CurrentUser>) => {
    if (!currentUser) return;
    const updated = { ...currentUser, ...updatedData } as CurrentUser;
    setCurrentUser(updated);

    if (updated.role === 'admin') {
      setAdminAccounts((prev) => prev.map((a) => (a.id === updated.id ? (updated as AdminAccount) : a)));
    } else {
      setStudentAccounts((prev) => prev.map((s) => (s.id === updated.id ? (updated as StudentAccount) : s)));
    }
    showToast('Profile information saved successfully!');
  };

  // Exams Management: Create Exam
  const createExam = (examData: Omit<Exam, 'id' | 'createdAt' | 'accessCode'>) => {
    // Generate random 6-character access code
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let code = '';
    for (let i = 0; i < 6; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    const newExam: Exam = {
      ...examData,
      id: `exam-${Date.now().toString().slice(-6)}`,
      accessCode: code,
      createdAt: new Date().toISOString().split('T')[0]
    };

    setExams((prev) => [newExam, ...prev]);
    addAuditLog(
      currentUser?.fullName || 'Admin',
      'Create Examination',
      'Success',
      `Created exam "${newExam.name}" with access code ${newExam.accessCode}`
    );
    showToast(`Exam "${newExam.name}" created! Access Code: ${newExam.accessCode}`);
    return { success: true, exam: newExam };
  };

  const updateExam = (examId: string, data: Partial<Exam>) => {
    setExams((prev) =>
      prev.map((e) => {
        if (e.id === examId) {
          return { ...e, ...data };
        }
        return e;
      })
    );
    showToast('Exam updated successfully.');
  };

  const deleteExam = (examId: string) => {
    const exam = exams.find((e) => e.id === examId);
    setExams((prev) => prev.filter((e) => e.id !== examId));
    setEnrolledStudents((prev) => prev.filter((enr) => enr.examId !== examId));
    addAuditLog(currentUser?.fullName || 'Admin', 'Delete Examination', 'Warning', `Deleted exam ${exam?.name || examId}`);
    showToast(`Exam deleted.`);
  };

  // Generate or Regenerate Exam Code
  const generateExamCode = (examId: string) => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let code = '';
    for (let i = 0; i < 6; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    setExams((prev) =>
      prev.map((e) => (e.id === examId ? { ...e, accessCode: code } : e))
    );
    addAuditLog(currentUser?.fullName || 'Admin', 'Regenerate Exam Code', 'Success', `New access code [${code}] generated for exam ${examId}`);
    showToast(`New Access Code: ${code}`);
    return code;
  };

  const changeExamStatus = (examId: string, status: 'scheduled' | 'active' | 'closed') => {
    setExams((prev) =>
      prev.map((e) => (e.id === examId ? { ...e, status } : e))
    );
    addAuditLog(currentUser?.fullName || 'Admin', 'Exam Status Changed', 'Info', `Exam ${examId} status changed to ${status.toUpperCase()}`);
    showToast(`Exam status changed to ${status.toUpperCase()}`);
  };

  // Enrollments: Add individual student
  const enrollStudent = (examId: string, email: string, name?: string, studentId?: string) => {
    const cleanEmail = email.trim().toLowerCase();
    if (!cleanEmail.includes('@')) {
      return { success: false, message: 'Invalid email address format.' };
    }

    // Check if already enrolled in this exam
    const already = enrolledStudents.some(
      (enr) => enr.examId === examId && enr.studentEmail.toLowerCase() === cleanEmail
    );

    if (already) {
      return { success: false, message: `Student ${cleanEmail} is already enrolled in this examination.` };
    }

    // Match with student account if exists
    const matchingStudent = studentAccounts.find((s) => s.collegeEmail.toLowerCase() === cleanEmail);

    const newEnrollment: EnrolledStudent = {
      id: `ENR-${Date.now().toString().slice(-6)}`,
      examId,
      studentEmail: cleanEmail,
      studentName: name || matchingStudent?.fullName || cleanEmail.split('@')[0],
      studentId: studentId || matchingStudent?.studentId || `STU-${cleanEmail.slice(0, 4).toUpperCase()}`,
      enrolledAt: new Date().toLocaleDateString('en-US', { hour: '2-digit', minute: '2-digit' }),
      enrollmentStatus: 'enrolled',
      examStatus: 'not_started'
    };

    setEnrolledStudents((prev) => [newEnrollment, ...prev]);
    addAuditLog(
      currentUser?.fullName || 'Admin',
      'Student Enrolled',
      'Success',
      `Enrolled student ${cleanEmail} for exam ${examId}`
    );
    showToast(`Student ${cleanEmail} enrolled successfully!`);
    return { success: true, message: 'Student enrolled successfully!' };
  };

  // Bulk CSV Student Enrollment (Supports 100+ students!)
  const bulkEnrollStudents = (examId: string, emailList: string[]): BulkEnrollResult => {
    let valid = 0;
    let invalid = 0;
    let alreadyEnrolled = 0;
    let added = 0;

    const newEntries: EnrolledStudent[] = [];
    const currentEnrolledEmails = new Set(
      enrolledStudents.filter((e) => e.examId === examId).map((e) => e.studentEmail.toLowerCase())
    );

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    emailList.forEach((rawEmail, idx) => {
      const email = rawEmail.trim().toLowerCase();
      if (!email) return;

      if (!emailRegex.test(email)) {
        invalid++;
        return;
      }

      valid++;

      if (currentEnrolledEmails.has(email)) {
        alreadyEnrolled++;
        return;
      }

      // Add to set to avoid duplicates within the same batch
      currentEnrolledEmails.add(email);

      const matching = studentAccounts.find((s) => s.collegeEmail.toLowerCase() === email);
      const parts = email.split('@')[0].split('.');
      const formattedName = parts.map((p) => p.charAt(0).toUpperCase() + p.slice(1)).join(' ');

      newEntries.push({
        id: `ENR-BULK-${Date.now().toString().slice(-4)}-${idx}`,
        examId,
        studentEmail: email,
        studentName: matching?.fullName || formattedName,
        studentId: matching?.studentId || `STU-2026-${1000 + idx}`,
        enrolledAt: new Date().toLocaleDateString('en-US', { hour: '2-digit', minute: '2-digit' }),
        enrollmentStatus: 'enrolled',
        examStatus: 'not_started'
      });
      added++;
    });

    if (newEntries.length > 0) {
      setEnrolledStudents((prev) => [...newEntries, ...prev]);
    }

    addAuditLog(
      currentUser?.fullName || 'Admin',
      'Bulk Student Enrollment',
      'Success',
      `Processed ${emailList.length} candidate emails. Added ${added} new students to exam ${examId}.`
    );

    showToast(`Bulk Enrollment: ${added} students enrolled successfully!`);

    return {
      total: emailList.length,
      valid,
      invalid,
      alreadyEnrolled,
      added
    };
  };

  const removeEnrolledStudent = (enrollmentId: string) => {
    setEnrolledStudents((prev) => prev.filter((enr) => enr.id !== enrollmentId));
    showToast('Enrolled student removed from exam.');
  };

  const isStudentEnrolledInExam = (examId: string, studentEmail: string) => {
    return enrolledStudents.some(
      (enr) => enr.examId === examId && enr.studentEmail.toLowerCase() === studentEmail.trim().toLowerCase()
    );
  };

  const getEnrolledStudentsForExam = (examId: string) => {
    return enrolledStudents.filter((enr) => enr.examId === examId);
  };

  // Eligibility Verification Check
  const verifyExamEligibility = (examId: string, inputCode: string) => {
    if (!currentUser) {
      return { eligible: false, reason: 'You must be logged in with a registered student account.' };
    }
    if (currentUser.role !== 'student') {
      return { eligible: false, reason: 'Only students are permitted to take examinations.' };
    }

    const student = currentUser as StudentAccount;
    const exam = exams.find((e) => e.id === examId);

    if (!exam) {
      return { eligible: false, reason: 'Examination not found in the campus registry.' };
    }

    // 1. Check if student email is enrolled in this exam
    const isEnrolled = enrolledStudents.some(
      (enr) => enr.examId === examId && enr.studentEmail.toLowerCase() === student.collegeEmail.toLowerCase()
    );

    if (!isEnrolled) {
      return { eligible: false, reason: 'You are not enrolled in this examination. Contact your examination administrator.' };
    }

    // 2. Check exam availability status
    if (exam.status !== 'active') {
      if (exam.status === 'scheduled') {
        return { eligible: false, reason: 'This examination is scheduled but not yet open for candidates.' };
      }
      return { eligible: false, reason: 'This examination has been closed.' };
    }

    // 3. Check correct exam code
    if (!inputCode || inputCode.trim().toUpperCase() !== exam.accessCode.toUpperCase()) {
      return { eligible: false, reason: 'Incorrect exam code. Please check with your exam proctor.' };
    }

    // 4. One attempt protection: check if student has already submitted
    const existingAttempt = allAttempts.find(
      (att) => att.examId === examId && att.studentId === student.id
    );

    if (existingAttempt && existingAttempt.status === 'submitted') {
      return { eligible: false, reason: 'You have already submitted this examination. Re-attempts are not permitted.' };
    }

    return { eligible: true };
  };

  // Active Student Attempt for activeExamId
  const currentStudentId = currentUser && currentUser.role === 'student' ? (currentUser as StudentAccount).id : '';

  const activeAttempt = allAttempts.find(
    (att) => att.examId === activeExamId && att.studentId === currentStudentId
  ) || null;

  const startExamAttempt = (examId: string): ExamAttempt => {
    if (!currentUser || currentUser.role !== 'student') {
      throw new Error('Must be logged in as a student to start attempt.');
    }
    const student = currentUser as StudentAccount;
    const exam = exams.find((e) => e.id === examId);
    if (!exam) throw new Error('Exam not found.');

    const existing = allAttempts.find(
      (att) => att.examId === examId && att.studentId === student.id
    );

    if (existing) {
      // Restore existing attempt
      setIsRestoringSession(true);
      setTimeout(() => setIsRestoringSession(false), 2000);
      return existing;
    }

    const newAttempt: ExamAttempt = {
      id: `ATT-${Date.now().toString().slice(-6)}`,
      examId,
      studentId: student.id,
      studentEmail: student.collegeEmail,
      studentName: student.fullName,
      currentQuestionIndex: 0,
      answers: {},
      markedForReview: [],
      timeRemainingSeconds: exam.durationMinutes * 60,
      status: 'in_progress',
      score: 0,
      maxScore: exam.totalQuestions * (exam.marksPerQuestion || 5),
      startedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setAllAttempts((prev) => [newAttempt, ...prev]);

    // Update enrollment status for this student
    setEnrolledStudents((prev) =>
      prev.map((enr) =>
        enr.examId === examId && enr.studentEmail.toLowerCase() === student.collegeEmail.toLowerCase()
          ? { ...enr, examStatus: 'in_progress' }
          : enr
      )
    );

    addAuditLog(
      student.fullName,
      'Started Examination',
      'Success',
      `Candidate began attempt for exam ${exam.name} with session ID ${newAttempt.id}`
    );

    return newAttempt;
  };

  // Auto-save student answer
  const saveStudentAnswer = (examId: string, questionId: number, optionIndex: number) => {
    if (!currentUser || currentUser.role !== 'student') return;
    const studentId = (currentUser as StudentAccount).id;

    setAllAttempts((prev) =>
      prev.map((att) => {
        if (att.examId === examId && att.studentId === studentId) {
          const updatedAnswers: StudentAnswers = {
            ...att.answers,
            [questionId]: optionIndex
          };
          return {
            ...att,
            answers: updatedAnswers
          };
        }
        return att;
      })
    );

    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    setLastAnswerSavedTime(timeStr);
  };

  // Update progress: question index, marked list, time
  const updateExamProgress = (examId: string, questionIndex: number, markedList: number[], timeLeft: number) => {
    if (!currentUser || currentUser.role !== 'student') return;
    const studentId = (currentUser as StudentAccount).id;

    setAllAttempts((prev) =>
      prev.map((att) => {
        if (att.examId === examId && att.studentId === studentId) {
          return {
            ...att,
            currentQuestionIndex: questionIndex,
            markedForReview: markedList,
            timeRemainingSeconds: timeLeft
          };
        }
        return att;
      })
    );
  };

  // Submit Exam Attempt & Calculate Score
  const submitExamAttempt = (examId: string) => {
    if (!currentUser || currentUser.role !== 'student') {
      return { score: 0, maxScore: 0, success: false };
    }
    const student = currentUser as StudentAccount;
    const exam = exams.find((e) => e.id === examId);
    if (!exam) return { score: 0, maxScore: 0, success: false };

    const targetAttempt = allAttempts.find(
      (att) => att.examId === examId && att.studentId === student.id
    );

    if (!targetAttempt) {
      return { score: 0, maxScore: 0, success: false };
    }

    // Calculate score
    const questions = exam.questions.length > 0 ? exam.questions : MOCK_QUESTIONS;
    let score = 0;
    const marksPerQ = exam.marksPerQuestion || 5;

    questions.forEach((q) => {
      const selected = targetAttempt.answers[q.id];
      if (selected !== undefined && selected === q.correctAnswer) {
        score += marksPerQ;
      }
    });

    const maxScore = questions.length * marksPerQ;
    const submittedAt = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    setAllAttempts((prev) =>
      prev.map((att) => {
        if (att.examId === examId && att.studentId === student.id) {
          return {
            ...att,
            status: 'submitted',
            score,
            maxScore,
            submittedAt
          };
        }
        return att;
      })
    );

    // Update enrollment status
    setEnrolledStudents((prev) =>
      prev.map((enr) =>
        enr.examId === examId && enr.studentEmail.toLowerCase() === student.collegeEmail.toLowerCase()
          ? { ...enr, examStatus: 'submitted' }
          : enr
      )
    );

    addAuditLog(
      student.fullName,
      'Examination Submitted',
      'Success',
      `Submitted exam ${exam.name}. Score: ${score}/${maxScore}. Answers preserved.`
    );

    showToast(`Examination submitted successfully! Score: ${score} / ${maxScore}`);
    return { score, maxScore, success: true };
  };

  const hasStudentSubmittedExam = (examId: string, studentId: string) => {
    const att = allAttempts.find((a) => a.examId === examId && a.studentId === studentId);
    return att ? att.status === 'submitted' : false;
  };

  const getAttemptForStudentAndExam = (examId: string, studentId: string) => {
    return allAttempts.find((a) => a.examId === examId && a.studentId === studentId);
  };

  // Reset to initial healthy state
  const resetToInitialHealthyState = () => {
    setSystemStatus('healthy');
    setCurrentVersion('v2.0');
    setDeploymentStatus('active');
    setRollbackStatus('Idle');
    setIsSimulating(false);
    setSimulationStep(0);
    setSimulationLogs([]);
    setIsModalOpen(false);
    showToast('System state restored to baseline v2.0 (Healthy).');
  };

  const closeSimulationModal = () => {
    setIsModalOpen(false);
  };

  // 10-Step Automated Rollback Simulation
  const triggerDeploymentFailureSimulation = useCallback(() => {
    if (isSimulating) return;

    setIsSimulating(true);
    setIsModalOpen(true);
    setSimulationStep(1);
    setSystemStatus('critical');
    setDeploymentStatus('failed');
    setRollbackStatus('Initiating');

    addAuditLog('System Monitor', 'Deployment Failure Detected', 'Warning', 'HTTP 502 error spike detected on candidate ingress controller.');

    const initialLog = `[${new Date().toLocaleTimeString()}] STEP 1: Health monitoring active... Synthetic watchdog detecting error surge.`;
    setSimulationLogs([initialLog]);

    const timers: NodeJS.Timeout[] = [];

    // STEP 2: "New application version v2.0 detected."
    timers.push(
      setTimeout(() => {
        setSimulationStep(2);
        setSimulationLogs((prev) => [
          ...prev,
          `[${new Date().toLocaleTimeString()}] STEP 2: New application version v2.0 detected. Ingress traffic encountering unstable worker pods.`
        ]);
      }, 1200)
    );

    // STEP 3: "⚠ Critical application failure detected."
    timers.push(
      setTimeout(() => {
        setSimulationStep(3);
        setSimulationLogs((prev) => [
          ...prev,
          `[${new Date().toLocaleTimeString()}] STEP 3: ⚠ Critical application failure detected. HTTP 502 Bad Gateway spike. Error rate 18.4% > 5.0% SLA threshold.`
        ]);
      }, 2400)
    );

    // STEP 4: "Monitoring system confirms failure."
    timers.push(
      setTimeout(() => {
        setSimulationStep(4);
        setSimulationLogs((prev) => [
          ...prev,
          `[${new Date().toLocaleTimeString()}] STEP 4: Monitoring system confirms failure. 3 consecutive failed health probes recorded. Severity: CRITICAL.`
        ]);
      }, 3600)
    );

    // STEP 5: "Automatic rollback triggered."
    timers.push(
      setTimeout(() => {
        setSimulationStep(5);
        setRollbackStatus('Restoring');
        setDeploymentStatus('rollback_in_progress');
        setSimulationLogs((prev) => [
          ...prev,
          `[${new Date().toLocaleTimeString()}] STEP 5: Automatic rollback triggered. Autonomous cluster failover orchestrator engaged without human intervention.`
        ]);
      }, 4800)
    );

    // STEP 6: "Previous stable version identified: v1.9"
    timers.push(
      setTimeout(() => {
        setSimulationStep(6);
        setSystemStatus('rolling_back');
        setSimulationLogs((prev) => [
          ...prev,
          `[${new Date().toLocaleTimeString()}] STEP 6: Previous stable version identified: examsafe:v1.9 (verified zero error rate tag).`
        ]);
      }, 6000)
    );

    // STEP 7: "Restoring v1.9..."
    timers.push(
      setTimeout(() => {
        setSimulationStep(7);
        setSimulationLogs((prev) => [
          ...prev,
          `[${new Date().toLocaleTimeString()}] STEP 7: Restoring v1.9... Rerouting ingress pointers from failed release v2.0 to immutable stable baseline.`
        ]);
      }, 7200)
    );

    // STEP 8: "✓ Stable version restored."
    timers.push(
      setTimeout(() => {
        setSimulationStep(8);
        setCurrentVersion(previousStableVersion);
        setDeploymentStatus('restored');
        setSimulationLogs((prev) => [
          ...prev,
          `[${new Date().toLocaleTimeString()}] STEP 8: ✓ Stable version restored. Release ${previousStableVersion} active on 100% of exam pods.`
        ]);
      }, 8400)
    );

    // STEP 9: "✓ Examination service recovered."
    timers.push(
      setTimeout(() => {
        setSimulationStep(9);
        setSystemStatus('recovered');
        setRollbackStatus('Completed');
        setSimulationLogs((prev) => [
          ...prev,
          `[${new Date().toLocaleTimeString()}] STEP 9: ✓ Examination service recovered. Cluster health probes: 100% green. Latency normalized to 42ms.`
        ]);
      }, 9600)
    );

    // STEP 10: "✓ Student progress preserved."
    timers.push(
      setTimeout(() => {
        setSimulationStep(10);
        setIsSimulating(false);
        setIsRestoringSession(true);
        setTimeout(() => setIsRestoringSession(false), 3000);

        setSimulationLogs((prev) => [
          ...prev,
          `[${new Date().toLocaleTimeString()}] STEP 10: ✓ Student progress preserved. All candidate exam answers, countdown timers, and question states retained 100% intact.`
        ]);

        const newEvent: RollbackEvent = {
          id: `RB-00${rollbackEvents.length + 1}`,
          version: 'v2.0.0-rc1',
          previousStableVersion: 'v1.9.0',
          reason: 'Application Gateway HTTP 502 Anomaly',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
          status: 'Completed',
          recoveryTimeSeconds: 3.4,
          affectedSessions: activeExamSessions,
          trigger: 'Automatic Probe Threshold',
          logsSummary: 'Watchdog detected HTTP 502 > 5%. Ingress safely restored stable v1.9 without candidate answer loss.'
        };

        setRollbackEvents((prev) => [newEvent, ...prev]);
        addAuditLog(
          'DevOps Automated Rollback Engine',
          'Automatic Rollback Completed',
          'Restored',
          `Restored release ${previousStableVersion}. Student exam attempts, session states, and answers preserved.`
        );

        showToast(`Rollback Complete! Application restored to stable release ${previousStableVersion}. Student session is safe.`);
      }, 10800)
    );

    return () => {
      timers.forEach(clearTimeout);
    };
  }, [isSimulating, previousStableVersion, rollbackEvents.length, activeExamSessions, addAuditLog, showToast]);

  return (
    <SystemContext.Provider
      value={{
        activePage,
        setActivePage,
        currentUser,
        role,
        loginUser,
        registerAdmin,
        registerStudent,
        logoutUser,
        updateProfile,
        adminAccounts,
        studentAccounts,
        exams,
        createExam,
        updateExam,
        deleteExam,
        generateExamCode,
        changeExamStatus,
        activeExamId,
        setActiveExamId,
        enrolledStudents,
        enrollStudent,
        bulkEnrollStudents,
        removeEnrolledStudent,
        isStudentEnrolledInExam,
        getEnrolledStudentsForExam,
        verifyExamEligibility,
        activeAttempt,
        startExamAttempt,
        saveStudentAnswer,
        updateExamProgress,
        submitExamAttempt,
        hasStudentSubmittedExam,
        getAttemptForStudentAndExam,
        allAttempts,
        lastAnswerSavedTime,
        isRestoringSession,
        systemStatus,
        currentVersion,
        previousStableVersion,
        deploymentStatus,
        rollbackStatus,
        activeExamSessions,
        rollbackEvents,
        isSimulating,
        simulationStep,
        simulationLogs,
        triggerDeploymentFailureSimulation,
        closeSimulationModal,
        isModalOpen,
        setIsModalOpen,
        resetToInitialHealthyState,
        auditLogs,
        addAuditLog,
        toastMessage,
        showToast,
        clearToast
      }}
    >
      {children}
    </SystemContext.Provider>
  );
};

export const useSystem = () => {
  const context = useContext(SystemContext);
  if (!context) {
    throw new Error('useSystem must be used within a SystemProvider');
  }
  return context;
};
