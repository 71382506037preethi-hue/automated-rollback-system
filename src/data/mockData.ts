import { Question, RollbackEvent, PipelineStage, Exam, EnrolledStudent, AuditLog, AdminAccount, StudentAccount } from '../types';

export const DEFAULT_ADMIN_ACCOUNTS: AdminAccount[] = [
  {
    id: 'ADM-2026-001',
    fullName: 'Dr. Evelyn Reed',
    adminId: 'ADM-2026-001',
    officialEmail: 'admin@examsafe.edu',
    password: 'admin123',
    role: 'admin',
    department: 'Department of Computer Science & DevOps Engineering',
    joinedDate: 'Jan 2026'
  },
  {
    id: 'ADM-2026-002',
    fullName: 'Prof. Marcus Vance',
    adminId: 'ADM-2026-002',
    officialEmail: 'marcus.vance@examsafe.edu',
    password: 'admin123',
    role: 'admin',
    department: 'Examination Control Board',
    joinedDate: 'Feb 2026'
  }
];

export const DEFAULT_SAMPLE_STUDENTS: StudentAccount[] = [
  {
    id: 'STU-2026-9042',
    studentId: 'STU-2026-9042',
    fullName: 'Alex Chen',
    collegeEmail: 'alex.chen@campus.edu',
    password: 'password123',
    department: 'Computer Science & Engineering',
    year: '3rd Year',
    role: 'student',
    avatarColor: 'from-blue-500 to-indigo-600',
    joinedDate: 'Fall Semester 2026'
  },
  {
    id: 'STU-2026-8819',
    studentId: 'STU-2026-8819',
    fullName: 'Sophia Martinez',
    collegeEmail: 'sophia.m@campus.edu',
    password: 'password123',
    department: 'Information Technology',
    year: '4th Year',
    role: 'student',
    avatarColor: 'from-purple-500 to-pink-600',
    joinedDate: 'Fall Semester 2026'
  },
  {
    id: 'STU-2026-7731',
    studentId: 'STU-2026-7731',
    fullName: 'Rahul Sharma',
    collegeEmail: 'rahul.s@campus.edu',
    password: 'password123',
    department: 'Computer Science & Engineering',
    year: '3rd Year',
    role: 'student',
    avatarColor: 'from-teal-500 to-emerald-600',
    joinedDate: 'Fall Semester 2026'
  }
];

export const MOCK_QUESTIONS: Question[] = [
  {
    id: 1,
    question: "In automated continuous deployment (CD), which DevOps strategy is primarily utilized to route a small percentage of user traffic to a newly deployed release before full rollout?",
    options: [
      "Canary Deployment",
      "Big Bang Deployment",
      "Cold Standby Rollout",
      "Static Shadowing"
    ],
    correctAnswer: 0,
    marks: 5,
    category: "DevOps Deployment Strategies"
  },
  {
    id: 2,
    question: "What is the primary role of a readiness and liveness health check probe in containerized orchestration systems like Kubernetes?",
    options: [
      "To compress database transaction logs automatically",
      "To detect unresponsive application pods and trigger restart or automated traffic isolation",
      "To encrypt student passwords at the network gateway",
      "To compile frontend assets during runtime"
    ],
    correctAnswer: 1,
    marks: 5,
    category: "Container Orchestration & Monitoring"
  },
  {
    id: 3,
    question: "During an online examination, if an application server crashes, which design principle ensures student answers are not lost during an automated rollback?",
    options: [
      "Stateless Application Tier with External Distributed Session/State Store (e.g., Redis/Database)",
      "Storing active student tokens in local server RAM variables only",
      "Direct hardcoded cookies without server validation",
      "Restarting the entire database cluster simultaneously"
    ],
    correctAnswer: 0,
    marks: 5,
    category: "System Reliability & Fault Tolerance"
  },
  {
    id: 4,
    question: "Which metric is most critical for an automated monitoring agent to evaluate whether a deployment failure threshold has been breached?",
    options: [
      "Font rendering speed in CSS",
      "HTTP 5xx Server Error Rate Spike and Consecutive Unhealthy Heartbeat Probes",
      "Number of commits in Git repository",
      "Developer desktop idle time"
    ],
    correctAnswer: 1,
    marks: 5,
    category: "Observability & Telemetry"
  },
  {
    id: 5,
    question: "In a Blue/Green deployment architecture, what action accomplishes an instant automated rollback when Green displays critical regression?",
    options: [
      "Rebuilding the application container from source code",
      "Switching the load balancer/ingress router traffic pointer back to the stable Blue environment",
      "Formatting the host operating system disk",
      "Manually editing production environment variables"
    ],
    correctAnswer: 1,
    marks: 5,
    category: "DevOps Architecture"
  },
  {
    id: 6,
    question: "What does the term 'Mean Time to Recovery' (MTTR) signify in high-reliability DevOps systems?",
    options: [
      "The average time taken to diagnose and restore service after an outage or deployment failure",
      "The total time spent writing automated unit test cases",
      "The duration of the student examination paper",
      "The time taken to push code to GitHub"
    ],
    correctAnswer: 0,
    marks: 5,
    category: "DevOps Metrics"
  }
];

export const INITIAL_EXAMS: Exam[] = [
  {
    id: "cs402",
    name: "Data Structures & Algorithms - Mid-Semester",
    subject: "Computer Science & Engineering",
    description: "Core examination on algorithmic complexity, trees, graphs, and dynamic programming with DevOps failover protection.",
    durationMinutes: 30,
    totalQuestions: 6,
    marksPerQuestion: 5,
    maxAttempts: 1,
    startDate: "2026-09-10T09:00",
    endDate: "2026-09-30T23:59",
    status: "active",
    accessCode: "DS7K9P",
    questions: MOCK_QUESTIONS,
    createdAt: "2026-09-10"
  },
  {
    id: "cs405",
    name: "Operating Systems & DevOps Reliability",
    subject: "Information Technology",
    description: "Evaluates process synchronization, distributed memory, and failover architectures under high concurrency.",
    durationMinutes: 25,
    totalQuestions: 6,
    marksPerQuestion: 5,
    maxAttempts: 1,
    startDate: "2026-09-12T14:00",
    endDate: "2026-09-30T23:59",
    status: "active",
    accessCode: "OS5R3X",
    questions: MOCK_QUESTIONS,
    createdAt: "2026-09-12"
  },
  {
    id: "cs403",
    name: "Database Management Systems & Sharding",
    subject: "Computer Science",
    description: "Comprehensive test on ACID transactions, indexing strategies, and distributed replication partitions.",
    durationMinutes: 30,
    totalQuestions: 6,
    marksPerQuestion: 5,
    maxAttempts: 1,
    startDate: "2026-09-20T11:00",
    endDate: "2026-09-30T23:59",
    status: "scheduled",
    accessCode: "DB9W4Q",
    questions: MOCK_QUESTIONS,
    createdAt: "2026-09-13"
  }
];

// Helper to generate 100+ student enrollment records for CS402
export const generateInitialEnrolledStudents = (): EnrolledStudent[] => {
  const students: EnrolledStudent[] = [
    {
      id: 'ENR-001',
      examId: 'cs402',
      studentEmail: 'alex.chen@campus.edu',
      studentName: 'Alex Chen',
      studentId: 'STU-2026-9042',
      enrolledAt: '2026-09-14 09:10',
      enrollmentStatus: 'enrolled',
      examStatus: 'not_started'
    },
    {
      id: 'ENR-002',
      examId: 'cs402',
      studentEmail: 'sophia.m@campus.edu',
      studentName: 'Sophia Martinez',
      studentId: 'STU-2026-8819',
      enrolledAt: '2026-09-14 09:10',
      enrollmentStatus: 'enrolled',
      examStatus: 'not_started'
    },
    {
      id: 'ENR-003',
      examId: 'cs402',
      studentEmail: 'rahul.s@campus.edu',
      studentName: 'Rahul Sharma',
      studentId: 'STU-2026-7731',
      enrolledAt: '2026-09-14 09:10',
      enrollmentStatus: 'enrolled',
      examStatus: 'not_started'
    },
    {
      id: 'ENR-004',
      examId: 'cs405',
      studentEmail: 'alex.chen@campus.edu',
      studentName: 'Alex Chen',
      studentId: 'STU-2026-9042',
      enrolledAt: '2026-09-14 09:15',
      enrollmentStatus: 'enrolled',
      examStatus: 'not_started'
    }
  ];

  const firstNames = ['Aarav', 'Emma', 'Liam', 'Olivia', 'Noah', 'Ava', 'Lucas', 'Mia', 'Ethan', 'Harper', 'Mason', 'Evelyn', 'Daniel', 'Abigail', 'Logan', 'Emily', 'Jackson', 'Ella', 'Sebastian', 'Elizabeth', 'Aiden', 'Camila', 'Matthew', 'Luna', 'Samuel', 'Sofia', 'David', 'Avery', 'Joseph', 'Mila'];
  const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson', 'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin', 'Lee', 'Perez', 'Thompson', 'White', 'Harris', 'Sanchez', 'Clark', 'Ramirez', 'Lewis', 'Robinson'];

  for (let i = 5; i <= 104; i++) {
    const fName = firstNames[(i * 3) % firstNames.length];
    const lName = lastNames[(i * 7) % lastNames.length];
    const email = `${fName.toLowerCase()}.${lName.toLowerCase()}${i}@campus.edu`;
    students.push({
      id: `ENR-${String(i).padStart(3, '0')}`,
      examId: 'cs402',
      studentEmail: email,
      studentName: `${fName} ${lName}`,
      studentId: `STU-2026-${1000 + i}`,
      enrolledAt: '2026-09-14 09:20',
      enrollmentStatus: 'enrolled',
      examStatus: i % 15 === 0 ? 'submitted' : i % 5 === 0 ? 'in_progress' : 'not_started'
    });
  }

  return students;
};

export const INITIAL_AUDIT_LOGS: AuditLog[] = [
  {
    id: 'LOG-101',
    timestamp: '09:00:12 AM',
    user: 'Dr. Evelyn Reed (Admin)',
    action: 'Admin Authentication',
    status: 'Success',
    details: 'Admin authenticated securely into the Examination Control Board.'
  },
  {
    id: 'LOG-102',
    timestamp: '09:12:45 AM',
    user: 'Dr. Evelyn Reed (Admin)',
    action: 'Create Examination',
    status: 'Success',
    details: 'Created examination CS-402: Data Structures & Algorithms with 6 questions.'
  },
  {
    id: 'LOG-103',
    timestamp: '09:15:30 AM',
    user: 'Dr. Evelyn Reed (Admin)',
    action: 'Bulk Student Enrollment',
    status: 'Success',
    details: 'Enrolled 104 verified candidate emails into exam CS-402 via CSV import.'
  },
  {
    id: 'LOG-104',
    timestamp: '09:16:02 AM',
    user: 'Dr. Evelyn Reed (Admin)',
    action: 'Generate Access Code',
    status: 'Success',
    details: 'Generated secure access code [DS7K9P] for CS-402 candidate verification.'
  },
  {
    id: 'LOG-105',
    timestamp: '09:30:15 AM',
    user: 'Alex Chen (Student)',
    action: 'Student Login & Verification',
    status: 'Success',
    details: 'Logged in with student ID STU-2026-9042 and verified academic profile.'
  },
  {
    id: 'LOG-106',
    timestamp: '09:31:40 AM',
    user: 'Alex Chen (Student)',
    action: 'Exam Code Verification',
    status: 'Success',
    details: 'Entered code DS7K9P. System checked eligibility: enrolled & exam active.'
  },
  {
    id: 'LOG-107',
    timestamp: '09:35:10 AM',
    user: 'System Watchdog',
    action: 'Continuous Telemetry Probe',
    status: 'Info',
    details: 'Cluster health checked. Latency 42ms, HTTP 200 rate 100% on release v2.0.'
  }
];

export const INITIAL_ROLLBACK_EVENTS: RollbackEvent[] = [
  {
    id: "RB-001",
    version: "v2.0.0-rc1",
    previousStableVersion: "v1.9.0",
    reason: "HTTP 502 Bad Gateway Spike on Exam Ingress Controller",
    timestamp: "10:32 AM",
    status: "Completed",
    recoveryTimeSeconds: 3.8,
    affectedSessions: 128,
    trigger: "Automatic Probe Threshold",
    logsSummary: "Heartbeat failed 3x. Latency exceeded 1200ms. Ingress automatically shifted traffic to v1.9.0 without candidate answer loss."
  },
  {
    id: "RB-002",
    version: "v1.9.1",
    previousStableVersion: "v1.8.4",
    reason: "Database Connection Pool Exhaustion under concurrent exam load",
    timestamp: "Yesterday, 14:15 PM",
    status: "Completed",
    recoveryTimeSeconds: 4.2,
    affectedSessions: 94,
    trigger: "Automatic Probe Threshold",
    logsSummary: "Connection wait timeouts tripped automated watchdog. Reverted database connection configuration."
  }
];

export const DEFAULT_PIPELINE_STAGES: PipelineStage[] = [
  {
    id: "commit",
    name: "Code Commit",
    description: "Git webhook triggered from release branch",
    status: "success",
    duration: "1.2s",
    details: ["Commit hash: #7f89ab4", "Author: devops-bot", "Branch: release/v2.0"]
  },
  {
    id: "build",
    name: "Build Container",
    description: "Docker multi-stage build & asset bundling",
    status: "success",
    duration: "42s",
    details: ["Node 20 runtime base", "Layer caching optimized", "Image tag: examsafe:v2.0"]
  },
  {
    id: "test",
    name: "Automated Tests",
    description: "Unit, integration & exam load smoke tests",
    status: "success",
    duration: "28s",
    details: ["34 unit tests passed", "12 API integration tests passed", "Code coverage: 92%"]
  },
  {
    id: "deploy",
    name: "Deployment",
    description: "Rollout to exam cluster pods",
    status: "failed",
    duration: "15s",
    details: ["Traffic routed: 25% canary", "Pod crashloop backoff detected", "HTTP 502 errors > 15%"]
  },
  {
    id: "monitor",
    name: "Health Monitoring",
    description: "Prometheus & synthetic probe checks",
    status: "failed",
    duration: "4.5s",
    details: ["Threshold breached: 3/3 failed probes", "Latency: 2850ms (Limit: 500ms)", "Trigger: Rollback event"]
  },
  {
    id: "failure",
    name: "Failure Detected",
    description: "Automated anomaly detection alert",
    status: "failed",
    duration: "0.8s",
    details: ["Rule: HIGH_5XX_DURING_EXAM", "Severity: CRITICAL", "Orchestrator notified"]
  },
  {
    id: "rollback",
    name: "Rollback Initiated",
    description: "Traffic shifting to last known healthy tag",
    status: "rolled_back",
    duration: "3.2s",
    details: ["Selected target: examsafe:v1.9", "Ingress traffic re-routed 100%", "Zero session termination"]
  },
  {
    id: "stable",
    name: "Stable Restored",
    description: "Exam cluster verified healthy on v1.9",
    status: "success",
    duration: "1.1s",
    details: ["Health probes: 100% green", "Active exam sessions preserved: 128", "Latency normalized: 42ms"]
  }
];

export const VIVA_QUESTIONS = [
  {
    q: "Why is automated rollback critical for an Online Examination System compared to standard web apps?",
    a: "In regular websites (like blogs or e-commerce), a temporary failure merely inconveniences users. But in high-stakes online examinations, even 2 minutes of downtime causes immense panic, unfair loss of exam timers, socket disconnections, unsubmitted answers, and potential examination cancellation. Automated rollback detects defects within seconds and reverts traffic without human intervention."
  },
  {
    q: "How does the system prevent student answers and exam timers from being wiped out during rollback?",
    a: "By decoupling the stateful data tier from the application pods. Session tokens, current countdown timers, and answer drafts are persisted in distributed stores (such as Redis and cloud databases). When container versions rollback from v2.0 to v1.9, the stateless web workers seamlessly re-attach to the same session data."
  },
  {
    q: "What trigger criteria indicate a deployment failure that justifies an immediate rollback?",
    a: "DevOps systems use Prometheus/Grafana or custom synthetic probes monitoring three main thresholds: (1) HTTP 5xx error rate exceeding a safety threshold (e.g. > 5%), (2) Application latency breaching SLAs (> 1000ms), and (3) Consecutive failed Kubernetes readiness/liveness probes (e.g. 3 consecutive timeouts)."
  },
  {
    q: "What is the difference between Canary Rollback and Blue/Green Rollback?",
    a: "In Canary Rollback, the new version is initially exposed to a subset of users (e.g. 10%). If errors spike, only that small subset is rolled back instantly. In Blue/Green, two identical production environments exist; the router switches 100% of live traffic between them, enabling instantaneous pointer reversal if Green exhibits failure."
  },
  {
    q: "Why is this system labelled as an Academic Prototype?",
    a: "This project is engineered to demonstrate the theoretical, architectural, and practical concepts of DevOps automated rollback in a controlled simulation environment for university evaluators, without interacting with real university examination databases or live test takers."
  }
];
