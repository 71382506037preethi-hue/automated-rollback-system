export type UserRole = 'admin' | 'student';

export type SystemHealthStatus = 'healthy' | 'warning' | 'critical' | 'rolling_back' | 'recovered';

export type DeploymentStatusType = 'active' | 'failed' | 'rollback_in_progress' | 'restored' | 'canary_testing';

export interface AdminAccount {
  id: string;
  fullName: string;
  adminId: string;
  officialEmail: string;
  password: string;
  role: 'admin';
  department?: string;
  joinedDate?: string;
}

export interface StudentAccount {
  id: string;
  fullName: string;
  studentId: string;
  collegeEmail: string;
  password: string;
  department: string;
  year: string;
  role: 'student';
  avatarColor?: string;
  joinedDate?: string;
}

export type CurrentUser = (AdminAccount | StudentAccount) & { role: UserRole };

export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number; // 0 for Option A, 1 for B, 2 for C, 3 for D
  marks?: number;
  category?: string;
}

export interface StudentAnswers {
  [questionId: number]: number; // option index 0..3
}

export interface Exam {
  id: string;
  name: string;
  subject: string;
  description: string;
  durationMinutes: number;
  totalQuestions: number;
  marksPerQuestion: number;
  maxAttempts: number;
  startDate: string;
  endDate: string;
  status: 'scheduled' | 'active' | 'closed';
  accessCode: string; // e.g. "DS7K9P"
  questions: Question[];
  createdAt: string;
}

// Kept for backwards compatibility
export interface ExamItem {
  id: string;
  code: string;
  title: string;
  department: string;
  totalQuestions: number;
  durationMinutes: number;
  status: 'not_started' | 'in_progress' | 'completed';
  description: string;
  scheduledTime?: string;
}

export interface EnrolledStudent {
  id: string;
  examId: string;
  studentEmail: string;
  studentName?: string;
  studentId?: string;
  department?: string;
  enrolledAt: string;
  enrollmentStatus: 'enrolled' | 'withdrawn';
  examStatus: 'not_started' | 'in_progress' | 'submitted';
}

export interface ExamAttempt {
  id: string;
  examId: string;
  studentId: string;
  studentEmail: string;
  studentName: string;
  currentQuestionIndex: number;
  answers: StudentAnswers;
  markedForReview: number[];
  timeRemainingSeconds: number;
  status: 'not_started' | 'in_progress' | 'submitted';
  score: number;
  maxScore: number;
  startedAt: string;
  submittedAt?: string;
}

export interface AuditLog {
  id: string;
  timestamp: string;
  user: string;
  action: string;
  status: 'Success' | 'Triggered' | 'Warning' | 'Restored' | 'Info';
  details?: string;
}

export interface RollbackEvent {
  id: string;
  version: string;
  previousStableVersion: string;
  reason: string;
  timestamp: string;
  status: 'Completed' | 'In Progress' | 'Failed' | 'Verified';
  recoveryTimeSeconds: number;
  affectedSessions: number;
  trigger: 'Automatic Probe Threshold' | 'Manual Override' | 'Canary Error Spike';
  logsSummary: string;
}

export interface PipelineStage {
  id: string;
  name: string;
  description: string;
  status: 'success' | 'failed' | 'in_progress' | 'pending' | 'rolled_back';
  duration: string;
  details: string[];
}

export interface SimulationStepInfo {
  step: number;
  title: string;
  subtitle: string;
  codeSnippet: string;
  status: 'pending' | 'active' | 'completed';
}

export type ActivePage = 
  | 'landing' 
  | 'login' 
  | 'register'
  | 'dashboard'          // Student dashboard
  | 'profile'            // Student profile
  | 'exam'               // Student active exam
  | 'student_results'    // Student results view
  | 'admin_dashboard'    // Admin main dashboard
  | 'admin_exams'        // Admin create & manage exams
  | 'admin_enrollments'  // Admin enroll students & bulk CSV
  | 'admin_monitoring'   // Admin live exam monitoring
  | 'admin_results'      // Admin view all candidate results
  | 'admin_audit_logs'   // Admin audit logs
  | 'admin_profile'      // Admin profile
  | 'recovery'           // System Recovery Center
  | 'devops'             // DevOps Dashboard
  | 'rollback_history'   // Rollback History
  | 'how_it_works'       // How It Works
  | 'architecture'       // Architecture
  | 'about';             // About Project
