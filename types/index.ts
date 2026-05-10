export interface User {
  id: string;
  email: string;
  full_name?: string;
  avatar_url?: string;
}

export interface Resume {
  id: string;
  user_id: string;
  file_name: string;
  storage_path: string;
  ats_score?: number;
  analysis?: ResumeAnalysis;
  created_at: string;
}

export interface ResumeAnalysis {
  ats_score: number;
  summary: string;
  strengths: string[];
  missing_skills: string[];
  suggestions: string[];
  keywords_found: string[];
}

export interface InterviewSession {
  id: string;
  user_id: string;
  job_role: string;
  experience_level: string;
  questions: string[];
  answers?: string[];
  feedback?: AnswerFeedback[];
  created_at: string;
}

export interface AnswerFeedback {
  question: string;
  answer: string;
  score: number;
  feedback: string;
  improvement: string;
}

export interface RoadmapPhase {
  phase: number;
  title: string;
  duration: string;
  skills: string[];
  resources: string[];
  milestone: string;
}

export interface CareerRoadmap {
  target_role: string;
  total_duration: string;
  phases: RoadmapPhase[];
  summary: string;
}
