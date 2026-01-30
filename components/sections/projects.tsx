"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { LucideGithub, ExternalLink, ArrowRight, GitFork, Star, Folder } from "lucide-react";
import Link from "next/link";
import { projects } from "@/lib/data";
import { useEffect, useState } from "react";
import { PROJECTS } from "@/lib/constants";

const tagColors: Record<string, string> = {
  "PHP": "text-[#777bb4]",
  "Symfony": "text-foreground",
  "REST API": "text-[#22d3ee]",
  "Doctrine": "text-[#f59e0b]",
  "MySQL": "text-[#00758f]",
  "JWT": "text-[#d63aff]",
  "TypeScript": "text-[#3178c6]",
  "React": "text-[#61dafb]",
  "React Native": "text-[#61dafb]",
  "Next.js": "text-foreground",
  "Node.js": "text-[#68a063]",
  "Microservices": "text-[#a78bfa]",
  "Mobile": "text-[#f472b6]",
  "UX/UI": "text-[#f59e0b]",
  "Dashboard": "text-[#22d3ee]",
  "Admin": "text-[#f87171]",
};

export function Projects() {
  const [githubStats, setGithubStats] = useState<Record<string, { stars: number; forks: number }>>({});

  useEffect(() => {
    // Fetch GitHub stats for all projects
    projects.forEach(async (project) => {
      try {
        const repoPath = project.links.repo.replace('https://github.com/', '');
        const response = await fetch(`/api/github?repo=${repoPath}`);
        if (response.ok) {
          const data = await response.json();
          setGithubStats(prev => ({
            ...prev,
            [project.slug]: { stars: data.stars, forks: data.forks }
          }));
        }
      } catch (error) {
        console.error(`Failed to fetch stats for ${project.slug}:`, error);
      }
    });
  }, []);

  return (
    <section id="projects" className="py-20 md:py-32">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12 md:mb-16"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-primary font-mono text-sm">{PROJECTS.sectionNumber}.</span>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              {PROJECTS.title}
            </h2>
            <div className="h-px flex-1 bg-border max-w-xs" />
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl font-mono">
            <span className="text-[#ff7b72]">git log</span> <span className="text-muted-foreground/60">--oneline --graph</span>
          </p>
        </motion.div>

        <div className="space-y-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              {/* GitHub-style repo card */}
              <div className="rounded-lg border border-border bg-card hover:border-primary/50 transition-all overflow-hidden">
                {/* Card header */}
                <div className="p-4 md:p-6">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div className="flex items-center gap-3">
                      <Folder className="h-5 w-5 text-muted-foreground" />
                      <Link href={`/projects/${project.slug}`} className="group/link">
                        <h3 className="text-lg font-semibold text-accent hover:underline underline-offset-4">
                          {project.title}
                        </h3>
                      </Link>
                      <span className="rounded-full border border-border px-2 py-0.5 text-xs text-muted-foreground">
                        {PROJECTS.repoVisibility}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-muted-foreground">
                      <div className="flex items-center gap-1 text-xs">
                        <Star className="h-4 w-4" />
                        <span>{githubStats[project.slug]?.stars ?? PROJECTS.loading.stars}</span>
                      </div>
                      <div className="flex items-center gap-1 text-xs">
                        <GitFork className="h-4 w-4" />
                        <span>{githubStats[project.slug]?.forks ?? PROJECTS.loading.forks}</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-muted-foreground mb-4 line-clamp-2">
                    {project.description}
                  </p>

                  {/* Language/Tech tags */}
                  <div className="flex flex-wrap items-center gap-4 mb-4">
                    {project.tags.map((tag) => (
                      <div key={tag} className="flex items-center gap-1.5 text-xs">
                        <span className={`h-3 w-3 rounded-full ${tagColors[tag] ? tagColors[tag].replace('text-', 'bg-') : 'bg-muted-foreground'}`} style={{ backgroundColor: tagColors[tag]?.match(/#[a-f0-9]{6}/i)?.[0] || undefined }} />
                        <span className="text-muted-foreground">{tag}</span>
                      </div>
                    ))}
                  </div>

                  {/* Action buttons */}
                  <div className="flex items-center gap-3 pt-4 border-t border-border">
                    <Button variant="outline" size="sm" asChild className="border-border hover:border-primary hover:text-primary font-mono text-xs">
                      <Link href={project.links.repo} target="_blank">
                        <LucideGithub className="mr-2 h-4 w-4" /> {PROJECTS.buttons.viewSource}
                      </Link>
                    </Button>
                    {project.links.demo !== "#" && (
                      <Button size="sm" asChild className="bg-primary text-primary-foreground hover:bg-primary/90 font-mono text-xs">
                        <Link href={project.links.demo} target="_blank">
                          <ExternalLink className="mr-2 h-4 w-4" /> {PROJECTS.buttons.liveDemo}
                        </Link>
                      </Button>
                    )}
                    <Button variant="ghost" size="sm" asChild className="ml-auto hover:text-accent font-mono text-xs">
                      <Link href={`/projects/${project.slug}`}>
                        {PROJECTS.buttons.readme} <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>

                {/* Commit-style footer */}
                <div className="px-4 md:px-6 py-3 bg-secondary/30 border-t border-border flex items-center gap-4 text-xs text-muted-foreground font-mono">
                  <span className="text-primary">●</span>
                  <span>Updated recently</span>
                  <span className="text-border">|</span>
                  <span className="text-muted-foreground/60">Built with TypeScript</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View all link */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 text-center"
        >
          <Link 
            href="https://github.com/LuaScale" 
            target="_blank"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors font-mono text-sm"
          >
            View more on GitHub <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </Container>
    </section>
  );
}
