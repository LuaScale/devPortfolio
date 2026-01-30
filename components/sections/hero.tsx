"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import Link from "next/link";
import { ArrowRight, Terminal, GitBranch, Code2 } from "lucide-react";
import { useEffect, useState } from "react";
import { HERO } from "@/lib/constants";

function TypingText({ text, className }: { text: string; className?: string }) {
  const [displayText, setDisplayText] = useState("");
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index < text.length) {
        setDisplayText(text.slice(0, index + 1));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 50);
    return () => clearInterval(timer);
  }, [text]);

  useEffect(() => {
    const cursorTimer = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 530);
    return () => clearInterval(cursorTimer);
  }, []);

  return (
    <span className={className}>
      {displayText}
      <span className={`${showCursor ? "opacity-100" : "opacity-0"} transition-opacity`}>|</span>
    </span>
  );
}

export function Hero() {
  return (
    <section className="relative flex min-h-[calc(100vh-4rem)] items-center justify-center overflow-hidden py-20 md:py-32 bg-background">
      {/* Code-inspired grid background */}
      <div className="absolute inset-0 -z-10 h-full w-full">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#30363d_1px,transparent_1px),linear-gradient(to_bottom,#30363d_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20" />
        <div className="absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-primary/5 blur-[128px]" />
        <div className="absolute right-1/4 bottom-1/4 h-64 w-64 rounded-full bg-accent/5 blur-[128px]" />
      </div>

      <Container>
        <div className="flex flex-col items-start text-left max-w-4xl">
          {/* Terminal-like header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full rounded-lg border border-border bg-card/80 backdrop-blur-sm mb-8 overflow-hidden"
          >
            {/* Terminal title bar */}
            <div className="flex items-center gap-2 px-4 py-2 bg-secondary/50 border-b border-border">
              <div className="flex gap-1.5">
                <span className="h-3 w-3 rounded-full bg-[#ff5f56]" />
                <span className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
                <span className="h-3 w-3 rounded-full bg-[#27ca40]" />
              </div>
              <span className="text-xs text-muted-foreground font-mono ml-2">{HERO.terminalTitle}</span>
            </div>
            {/* Terminal content */}
            <div className="p-4 font-mono text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <span className="text-primary">❯</span>
                <span className="text-[#ff7b72]">{HERO.terminalCommand}</span>
              </div>
              <div className="mt-2 text-foreground">
                <TypingText text={HERO.terminalOutput} />
              </div>
            </div>
          </motion.div>

          {/* Main headline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-6"
          >
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
              <span className="text-muted-foreground font-mono text-lg md:text-xl block mb-2">{HERO.commentPrefix}</span>
              {HERO.headline.part1}
              <span className="text-primary">{HERO.headline.highlight}</span>
              <br />
              {HERO.headline.part2}
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-lg text-muted-foreground sm:text-xl max-w-2xl mb-8"
          >
            {HERO.description}
          </motion.p>

          {/* Status badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap gap-3 mb-10"
          >
            <div className="inline-flex items-center gap-2 rounded-md border border-primary/30 bg-primary/10 px-3 py-1.5 text-sm text-primary">
              <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
              Available for hire
            </div>
            <div className="inline-flex items-center gap-2 rounded-md border border-border bg-secondary/50 px-3 py-1.5 text-sm text-muted-foreground">
              <GitBranch className="h-3.5 w-3.5" />
              main
            </div>
            <div className="inline-flex items-center gap-2 rounded-md border border-border bg-secondary/50 px-3 py-1.5 text-sm text-muted-foreground">
              <Code2 className="h-3.5 w-3.5" />
              TypeScript
            </div>
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex flex-col gap-4 sm:flex-row"
          >
            <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-[0_0_20px_rgba(74,222,128,0.2)] hover:shadow-[0_0_30px_rgba(74,222,128,0.3)] transition-all" asChild>
              <Link href={HERO.cta.primary.href}>
                <Terminal className="mr-2 h-4 w-4" />
                {HERO.cta.primary.text}
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="border-border text-foreground hover:bg-secondary hover:border-primary/50" asChild>
              <Link href={HERO.cta.secondary.href}>
                {HERO.cta.secondary.text} <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
