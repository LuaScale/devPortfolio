"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { experiences } from "@/lib/data";
import { GitCommit, GitBranch } from "lucide-react";
import { EXPERIENCE } from "@/lib/constants";

export function Experience() {
  return (
    <section id="experience" className="py-20 md:py-32 bg-card/30">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12 md:mb-16"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-primary font-mono text-sm">{EXPERIENCE.sectionNumber}.</span>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              {EXPERIENCE.title}
            </h2>
            <div className="h-px flex-1 bg-border max-w-xs" />
          </div>
          <p className="text-lg text-muted-foreground font-mono">
            <span className="text-[#ff7b72]">{EXPERIENCE.gitCommand}</span> <span className="text-muted-foreground/60">{EXPERIENCE.gitAuthor}</span>
          </p>
        </motion.div>

        {/* Git commit history style */}
        <div className="relative">
          {/* Main branch line */}
          <div className="absolute left-[19px] top-0 bottom-0 w-0.5 bg-border" />

          <div className="space-y-8">
            {experiences.map((experience, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative pl-12"
              >
                {/* Commit node */}
                <div className="absolute left-0 top-0 flex items-center justify-center">
                  <div className="h-10 w-10 rounded-full bg-card border-2 border-primary flex items-center justify-center shadow-[0_0_15px_rgba(74,222,128,0.3)]">
                    <GitCommit className="h-5 w-5 text-primary" />
                  </div>
                </div>

                {/* Commit card */}
                <div className="rounded-lg border border-border bg-card overflow-hidden hover:border-primary/50 transition-colors">
                  {/* Commit header */}
                  <div className="px-4 py-3 bg-secondary/30 border-b border-border flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <GitBranch className="h-4 w-4 text-muted-foreground" />
                      <span className="font-mono text-sm text-accent">{experience.company.toLowerCase().replace(/\s+/g, '-')}</span>
                    </div>
                    <span className="font-mono text-xs text-muted-foreground bg-secondary px-2 py-1 rounded">
                      {experience.period}
                    </span>
                  </div>

                  {/* Commit body */}
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-foreground mb-1 font-mono">
                      {EXPERIENCE.commitPrefix}{experience.role}
                    </h3>
                    <p className="text-sm text-primary mb-3">
                      {EXPERIENCE.companyPrefix}{experience.company}
                    </p>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {experience.description}
                    </p>
                  </div>

                  {/* Commit footer - stats */}
                  <div className="px-4 py-2 bg-secondary/20 border-t border-border flex items-center gap-4 text-xs font-mono text-muted-foreground">
                    <span className="text-primary">+</span>
                    <span>Contributions made</span>
                    <span className="text-border">|</span>
                    <span className="text-muted-foreground/60">verified commit</span>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Initial commit marker */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="relative pl-12"
            >
              <div className="absolute left-0 top-0 flex items-center justify-center">
                <div className="h-10 w-10 rounded-full bg-secondary border-2 border-border flex items-center justify-center">
                  <span className="text-xs font-mono text-muted-foreground">init</span>
                </div>
              </div>
              <div className="py-2 text-sm font-mono text-muted-foreground">
                <span className="text-[#ffa657]">commit</span> Initial commit — Started coding journey
              </div>
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  );
}
