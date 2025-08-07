import { loadProjects } from './projects';
import infoData from './info.json';

// Type definitions
export interface Experience {
  company: string;
  title: string;
  startDate: string;
  endDate: string;
  description: string[];
}

export interface Education {
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  description?: string[];
}

export interface Technology {
  name: string;
  description: string;
}

export interface Infrastructure {
  name: string;
  description: string;
  steps: string[];
}

export interface Skill {
  name: string;
  description: string;
}

export interface Link {
  type: string;
  url: string;
  label?: string;
}

export interface Project {
  id: number;
  ranking?: number;
  title: string;
  description: string;
  technologies: string[];
  year: number;
  month: number;
  duration?: number; // Duration in weeks
  role: string;
  projectType: string;
  infrastructure?: Infrastructure[];
  skillsRequired?: Skill[];
  challengesFaced?: string[];
  outcomes?: string[];
  links?: Link[];
  githubUrl?: string;
  demoUrl?: string;
  achievementLog?: string;
}

export interface Certificate {
  title: string;
  issuer: string;
  date: string;
  image: string;
}

export interface BlogPost {
  title: string;
  date: string;
  excerpt: string;
  url: string;
}

// Portfolio data loaded from info.json
export const portfolioData = {
  ...infoData.personal,
  skills: infoData.skills,
  experience: infoData.experience as Experience[],
  education: infoData.education as Education[],
  projects: loadProjects(),
  certificates: infoData.certificates as Certificate[],
  blogPosts: infoData.blogPosts as BlogPost[],
  contact: infoData.contact,
  theme: infoData.theme,
  layout: infoData.layout,
  animation: infoData.animation,
  images: infoData.images,
  settings: infoData.settings,
};
