"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { FileCode } from "lucide-react";
import { ABOUT } from "@/lib/constants";

export function About() {
  return (
    <section id="about" className="py-20 md:py-32 bg-card/30">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-primary font-mono text-sm">{ABOUT.sectionNumber}.</span>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              {ABOUT.title}
            </h2>
            <div className="h-px flex-1 bg-border max-w-xs" />
          </div>
        </motion.div>

        <div className="grid gap-12 lg:grid-cols-5">
          {/* About text - code editor style */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-2"
          >
            <div className="rounded-lg border border-border bg-card overflow-hidden">
              {/* Editor tab */}
              <div className="flex items-center gap-2 px-4 py-2 bg-secondary/50 border-b border-border">
                <FileCode className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground font-mono">{ABOUT.fileTab}</span>
              </div>
              {/* Content with line numbers */}
              <div className="p-4 font-mono text-sm">
                <div className="flex">
                  <div className="pr-4 text-muted-foreground/50 select-none text-right w-8">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13].map((n) => (
                      <div key={n}>{n}</div>
                    ))}
                  </div>
                  <div className="flex-1 text-muted-foreground leading-relaxed">
                    <p className="text-[#ff7b72]"># {ABOUT.bio.greeting}</p>
                    <p>&nbsp;</p>
                    <p>I&apos;m a <span className="text-primary">{ABOUT.bio.role}</span></p>
                    <p>based in {ABOUT.bio.location}, passionate about</p>
                    <p>building <span className="text-accent">{ABOUT.bio.passion}</span> applications.</p>
                    <p>&nbsp;</p>
                    <p className="text-[#8b949e]">{ABOUT.bio.currentWork.title}</p>
                    {ABOUT.bio.currentWork.items.map((item, i) => (
                      <p key={i}>- {item}</p>
                    ))}
                    <p>&nbsp;</p>
                    <p className="text-[#8b949e]">{ABOUT.bio.callToAction[0]}</p>
                    <p className="text-[#8b949e]">{ABOUT.bio.callToAction[1]}</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Skills grid */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-3"
          >
            <h3 className="text-lg font-semibold mb-6 text-foreground font-mono">
              <span className="text-primary">const</span> {ABOUT.techStack.title} <span className="text-muted-foreground">=</span> {"{"}
            </h3>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {ABOUT.techStack.categories.map((category, index) => (
                <motion.div
                  key={category.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="group rounded-lg border border-border bg-card/50 p-4 hover:border-primary/50 hover:bg-card transition-all"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <category.icon className={`h-4 w-4 ${category.color}`} />
                    <span className="font-mono text-sm text-foreground">{category.title}</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {category.skills.map((skill) => (
                      <span
                        key={skill}
                        className="inline-flex items-center rounded bg-secondary/50 px-2 py-1 text-xs font-mono text-muted-foreground group-hover:text-foreground transition-colors"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
            <p className="text-lg font-mono mt-6 text-muted-foreground">{"}"}</p>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
