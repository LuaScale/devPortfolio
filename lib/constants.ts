/**
 * Website Content Constants
 * Centralized text content for easy maintenance and potential i18n support
 */

import { FileCode, Database, Server, Smartphone, GitBranch, Terminal } from "lucide-react";

// ============================================================================
// SITE METADATA
// ============================================================================
export const SITE = {
  title: "Jules Van Den Eede | Portfolio",
  description: "Portfolio of Jules Van Den Eede - Full Stack Developer",
  author: "Jules Van Den Eede",
  email: "julesvandeneedepro@gmail.com",
  location: "Lille, France",
  github: "https://github.com/LuaScale",
  linkedin: "https://linkedin.com/in/jules-vandeneede",
} as const;

// ============================================================================
// NAVIGATION
// ============================================================================
export const NAV_ITEMS = [
  { name: "projects", href: "/#projects", num: "01" },
  { name: "about", href: "/#about", num: "02" },
  { name: "experience", href: "/#experience", num: "03" },
  { name: "contact", href: "/#contact", num: "04" },
] as const;

export const NAV_CTA = {
  text: "./hire-me",
  href: "/#contact",
} as const;

// ============================================================================
// HERO SECTION
// ============================================================================
export const HERO = {
  terminalTitle: "~/jules-vandeneede",
  terminalCommand: "whoami",
  terminalOutput: "Jules Van Den Eede — Full Stack Developer",
  commentPrefix: "// ",
  headline: {
    part1: "I build ",
    highlight: "scalable",
    part2: " web experiences",
  },
  description:
    "Passionate about crafting elegant solutions with modern technologies. Specializing in full-stack development, microservices, and building products that make a difference.",
  cta: {
    primary: {
      text: "View My Work",
      href: "/#projects",
    },
    secondary: {
      text: "Get in Touch",
      href: "/#contact",
    },
  },
  stats: [
    { icon: "Code2", value: "3+", label: "Years Coding" },
    { icon: "GitBranch", value: "50+", label: "Projects" },
    { icon: "Terminal", value: "100%", label: "Coffee Powered" },
  ],
} as const;

// ============================================================================
// ABOUT SECTION
// ============================================================================
export const ABOUT = {
  sectionNumber: "02",
  title: "About Me",
  fileTab: "about.md",
  bio: {
    greeting: "Hello World!",
    role: "Full Stack Developer",
    location: "Lille, France",
    passion: "scalable",
    currentWork: {
      title: "/* Currently working on */",
      items: [
        "Food delivery platforms",
        "Microservices architecture",
        "Mobile experiences",
      ],
    },
    callToAction: [
      "// Let's build something",
      "// amazing together!",
    ],
  },
  techStack: {
    title: "techStack",
    categories: [
      {
        title: "Frontend",
        icon: FileCode,
        skills: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
        color: "text-[#61dafb]",
      },
      {
        title: "Mobile",
        icon: Smartphone,
        skills: ["React Native", "Expo"],
        color: "text-[#a78bfa]",
      },
      {
        title: "Backend",
        icon: Server,
        skills: ["Node.js", "Express", "Microservices"],
        color: "text-primary",
      },
      {
        title: "Database",
        icon: Database,
        skills: ["PostgreSQL", "MongoDB", "Redis"],
        color: "text-[#fbbf24]",
      },
      {
        title: "DevOps",
        icon: Terminal,
        skills: ["Docker", "CI/CD", "Linux"],
        color: "text-accent",
      },
      {
        title: "Tools",
        icon: GitBranch,
        skills: ["Git", "VS Code", "Figma"],
        color: "text-[#f85149]",
      },
    ],
  },
} as const;

// ============================================================================
// PROJECTS SECTION
// ============================================================================
export const PROJECTS = {
  sectionNumber: "01",
  title: "Featured Projects",
  repoVisibility: "Public",
  buttons: {
    viewSource: "View Source",
    liveDemo: "Live Demo",
    readme: "README.md",
    viewMore: "View more on GitHub",
  },
  loading: {
    stars: "—",
    forks: "—",
  },
} as const;

// ============================================================================
// EXPERIENCE SECTION
// ============================================================================
export const EXPERIENCE = {
  sectionNumber: "03",
  title: "Experience",
  gitCommand: "git log",
  gitAuthor: '--author="Jules"',
  commitPrefix: "feat: ",
  companyPrefix: "@ ",
  statsLabels: {
    added: "added",
    modified: "modified",
    deleted: "deleted",
  },
} as const;

// ============================================================================
// CONTACT SECTION
// ============================================================================
export const CONTACT = {
  sectionNumber: "04",
  title: "Contact",
  terminalHeader: {
    file: "contact.sh",
  },
  terminal: {
    command: "cat",
    file: "~/contact.json",
    data: {
      status: "Available for hire",
      location: SITE.location,
      email: SITE.email,
      responseTime: "~24h",
    },
  },
  description: "Looking for opportunities to build something amazing? Let's connect!",
  socialLinks: {
    github: { text: "GitHub", href: SITE.github },
    linkedin: { text: "LinkedIn", href: SITE.linkedin },
    email: { text: "Email", href: `mailto:${SITE.email}` },
  },
  form: {
    header: "new_message.tsx",
    labels: {
      name: "name",
      email: "email",
      message: "message",
    },
    placeholders: {
      name: "'Your Name'",
      email: "'you@email.com'",
      message: "Tell me about your project...",
    },
    button: {
      idle: "sendMessage()",
      loading: "Sending...",
    },
    messages: {
      success: "Message sent successfully! I'll get back to you soon.",
      footer: "// I'll get back to you within 24 hours",
    },
  },
} as const;

// ============================================================================
// FOOTER
// ============================================================================
export const FOOTER = {
  statusBar: {
    status: "Ready",
    branch: "main",
    encoding: "UTF-8",
    language: "TypeScript React",
    position: "Ln 420, Col 69",
  },
  branding: {
    comment: "// ",
    text: "Designed & Built by ",
    author: SITE.author,
    authorLink: SITE.github,
  },
  tagline: "Made with ❤️ and lots of ☕",
  copyright: `© ${new Date().getFullYear()} ${SITE.author}. All rights reserved.`,
  socialLinks: {
    github: { label: "GitHub", href: SITE.github },
    linkedin: { label: "LinkedIn", href: SITE.linkedin },
    email: { label: "Email", href: `mailto:${SITE.email}` },
  },
} as const;

// ============================================================================
// 404 PAGE
// ============================================================================
export const NOT_FOUND = {
  terminalFile: "error.sh",
  errorCode: "404",
  title: "Page Not Found",
  commands: [
    {
      command: "ls",
      args: "-la requested_page",
      output: [
        "Error: ENOENT: no such file or directory",
        "The page you're looking for doesn't exist.",
      ],
    },
    {
      command: "cat",
      args: "suggestions.txt",
      output: {
        suggestions: [
          "Check the URL for typos",
          "Return to the homepage",
          "Use the navigation menu",
        ],
      },
    },
  ],
  buttons: {
    home: "cd ~/home",
    back: "cd ../",
  },
  footer: {
    comment: "// ",
    text: "If you believe this is a mistake, please ",
    linkText: "contact me",
    linkHref: "/#contact",
  },
} as const;

// ============================================================================
// PROJECT DETAIL PAGE
// ============================================================================
export const PROJECT_DETAIL = {
  backButton: "Back to Projects",
  projectScreenshot: "Project Screenshot",
  sections: {
    links: "Project Links",
    technologies: "Technologies",
  },
  buttons: {
    liveDemo: "Live Demo",
    viewCode: "View Code",
  },
} as const;

// ============================================================================
// API & FORMS
// ============================================================================
export const API_MESSAGES = {
  contact: {
    success: "Email sent successfully",
    validation: "Validation failed",
    error: "Failed to send email. Please try again later.",
  },
  github: {
    error: "Failed to fetch repository data",
    missingRepo: "Repository parameter is required",
  },
} as const;

export const VALIDATION = {
  contact: {
    name: {
      min: 2,
      message: "Name must be at least 2 characters",
    },
    email: {
      message: "Invalid email address",
    },
    message: {
      min: 10,
      message: "Message must be at least 10 characters",
    },
  },
} as const;
