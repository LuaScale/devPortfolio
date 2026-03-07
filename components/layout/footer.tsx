"use client";

import { Container } from "@/components/ui/container";
// eslint-disable-next-line deprecation/deprecation
import { Github, Linkedin, Mail, Heart } from "lucide-react";
import { useTranslations } from "next-intl";

export function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="border-t border-border bg-card/50">
      {/* VS Code-style status bar */}
      <div className="bg-primary/10 border-b border-border">
        <Container>
          <div className="flex items-center justify-between py-1 text-xs font-mono">
            <div className="flex items-center gap-4 text-muted-foreground">
              <span className="flex items-center gap-1">
                <span className="h-2 w-2 rounded-full bg-primary" />
                <span>{t("statusBar.ready")}</span>
              </span>
              <span className="hidden sm:inline">{t("statusBar.branch")}</span>
              <span className="hidden md:inline">{t("statusBar.encoding")}</span>
            </div>
            <div className="flex items-center gap-4 text-muted-foreground">
              <span className="hidden sm:inline">{t("statusBar.language")}</span>
              <span>{t("statusBar.position")}</span>
            </div>
          </div>
        </Container>
      </div>

      <Container>
        <div className="py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Left side - branding */}
            <div className="flex flex-col items-center md:items-start gap-2">
              <p className="text-sm font-mono text-muted-foreground">
                <span className="text-[#8b949e]">{t("branding")}</span>
              </p>
              <p className="text-xs text-muted-foreground/60 font-mono flex items-center gap-1">
                {t("tagline").split(" ").map((word, idx) => {
                  if (word === "❤️")
                    return <Heart key="heart" className="h-3 w-3 text-[#f85149] inline" />;
                  if (word === "☕")
                    return (
                      <span key="coffee" className="text-primary">
                        ☕
                      </span>
                    );
                  return <span key={`word-${word}-${idx}`}>{word} </span>;
                })}
              </p>
            </div>

            {/* Right side - social links */}
            <div className="flex items-center gap-3">
              <a
                href="https://github.com/LuaScale"
                target="_blank"
                rel="noreferrer"
                className="h-9 w-9 rounded-md bg-secondary/50 border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-colors"
              >
                {/* eslint-disable-next-line deprecation/deprecation */}
                <Github className="h-4 w-4" />
                <span className="sr-only">GitHub</span>
              </a>
              <a
                href="https://linkedin.com/in/jules-vandeneede"
                target="_blank"
                rel="noreferrer"
                className="h-9 w-9 rounded-md bg-secondary/50 border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-colors"
              >
                {/* eslint-disable-next-line deprecation/deprecation */}
                <Linkedin className="h-4 w-4" />
                <span className="sr-only">LinkedIn</span>
              </a>
              <a
                href="mailto:julesvandeneedepro@gmail.com"
                className="h-9 w-9 rounded-md bg-secondary/50 border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-colors"
              >
                <Mail className="h-4 w-4" />
                <span className="sr-only">Email</span>
              </a>
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-6 pt-6 border-t border-border text-center">
            <p className="text-xs font-mono text-muted-foreground/60">
              {t("copyright")}
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
