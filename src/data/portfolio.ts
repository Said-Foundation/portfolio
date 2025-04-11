import { config } from '../config';
import { loadProjects } from './projects';

export interface Experience {
  company: string;
  title: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface Education {
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
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
  title: string;
  description: string;
  technologies: string[];
  year: number;
  month: number;
  role: string;
  projectType: string;
  infrastructure?: Infrastructure[];
  skillsRequired?: Skill[];
  challengesFaced?: string[];
  outcomes?: string[];
  links?: Link[];
  githubUrl?: string;
  demoUrl?: string;
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

export const portfolioData = {
  name: "Said Mustafa",
  title: "AI & ML Specialist | DevOps Engineer",
  bio: "AI and Cloud ML Specialist with 2+ years of experience developing secure, scalable cloud solutions. Skilled in optimizing machine learning workflows and deploying models efficiently on cloud platforms.",
  skills: {
    technical: [
      // Cloud & Infrastructure
      "AWS",
      "Kubernetes",
      "Terraform",
      "EC2",
      "S3",
      "Lambda",
      "CloudWatch",
      "RDS",
      "ElastiCache",
      "CloudFront",
      "SageMaker",
      // AI & Machine Learning
      "TensorFlow",
      "PyTorch",
      "MLflow",
      "Large Language Models (LLMs)",
      "Retrieval-Augmented Generation (RAG)",
      "Natural Language Processing",
      "Computer Vision",
      "Deep Learning",
      "Model Optimization",
      "Hyperparameter Tuning",
      // DevOps & Automation
      "CI/CD",
      "Docker",
      "Bash",
      "Git",
      "GitHub Actions",
      "Jenkins",
      // Data Science & Analytics
      "Pandas",
      "NumPy",
      "Scikit-learn",
      "Matplotlib",
      "Seaborn",
      "SQL",
    ],
    soft: [
      "Problem Solving",
      "Team Leadership",
      "Technical Writing",
      "Project Management",
      "Communication"
    ],
    languages: ["English", "Spanish"],
  },
  experience: [
    {
      company: "Skyloop Cloud",
      title: "Cloud Machine Learning Specialist",
      startDate: "September 2023",
      endDate: "Present",
      description:
        "Architected and managed AWS infrastructure for high-performance AI applications with 99.9% uptime. Developed and deployed ML models using MLflow, fine-tuned LLMs, implemented RAG systems, built intelligent agent-based systems, and automated data processing pipelines.",
    },
    {
      company: "BGA Bilgi Güvenliği A.Ş.",
      title: "Intern Penetration Tester",
      startDate: "August 2022",
      endDate: "October 2022",
      description:
        "Conducted penetration testing and security audits using Burp Suite and Metasploit. Automated security tasks with Python and Bash, and presented complex security concepts to non-technical stakeholders.",
    },
    {
      company: "Self-employed",
      title: "Freelance Script Writer",
      startDate: "January 2023",
      endDate: "Present",
      description:
        "Developed automation scripts for Linux systems, applied web scraping techniques with BeautifulSoup and Scrapy, and created an AI-integrated trading bot using Python and TensorFlow.",
    },
  ] as Experience[],
  education: [
    {
      institution: "Bahçeşehir University",
      degree: "Bachelor of Science",
      field: "Software Engineering (AI, Cloud Computing, Cybersecurity)",
      startDate: "2019",
      endDate: "2023",
    },
  ] as Education[],
  projects: loadProjects(),
  certificates: [
    {
      title: "AWS Certified Cloud Practitioner",
      issuer: "Amazon Web Services",
      date: "2023",
      image: config.images.certificates[0],
    },
    {
      title: "TensorFlow Developer Certificate",
      issuer: "TensorFlow",
      date: "2023",
      image: config.images.certificates[1],
    },
    {
      title: "Kubernetes Administrator (CKA)",
      issuer: "Cloud Native Computing Foundation",
      date: "2023",
      image: config.images.certificates[2],
    },
  ] as Certificate[],
  blogPosts: [
    {
      title: "Understanding LLMs",
      date: "2024-03-15",
      excerpt:
        "A deep dive into how Large Language Models work and their applications in modern AI solutions.",
      url: "/blog/understanding-llms",
    },
  ] as BlogPost[],
  contact: config.contact,
};
