import Link from "next/link";
import { Container } from "@/components/ui/container";
import { LucideGithub, LucideLinkedin, Mail, Heart } from "lucide-react";
import { FOOTER, SITE } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="border-t border-border bg-card/50">
      {/* VS Code-style status bar */}
      <div className="bg-primary/10 border-b border-border">
        <Container>
          <div className="flex items-center justify-between py-1 text-xs font-mono">
            <div className="flex items-center gap-4 text-muted-foreground">
              <span className="flex items-center gap-1">
                <span className="h-2 w-2 rounded-full bg-primary" />
                <span>{FOOTER.statusBar.status}</span>
              </span>
              <span className="hidden sm:inline">{FOOTER.statusBar.branch}</span>
              <span className="hidden md:inline">{FOOTER.statusBar.encoding}</span>
            </div>
            <div className="flex items-center gap-4 text-muted-foreground">
              <span className="hidden sm:inline">{FOOTER.statusBar.language}</span>
              <span>{FOOTER.statusBar.position}</span>
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
                <span className="text-[#8b949e]">{FOOTER.branding.comment}</span>
                {FOOTER.branding.text}
                <Link
                  href={FOOTER.branding.authorLink}
                  target="_blank"
                  className="text-primary hover:text-accent transition-colors"
                >
                  {FOOTER.branding.author}
                </Link>
              </p>
              <p className="text-xs text-muted-foreground/60 font-mono flex items-center gap-1">
                {FOOTER.tagline.split(' ').map((word, i) => 
                  word === '❤️' ? <Heart key={i} className="h-3 w-3 text-[#f85149] inline" /> : 
                  word === '☕' ? <span key={i} className="text-primary">☕</span> : 
                  word + ' '
                )}
              </p>
            </div>

            {/* Right side - social links */}
            <div className="flex items-center gap-3">
              <Link
                href="https://github.com/LuaScale"
                target="_blank"
                rel="noreferrer"
                className="h-9 w-9 rounded-md bg-secondary/50 border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-colors"
              >
                <LucideGithub className="h-4 w-4" />
                <span className="sr-only">GitHub</span>
              </Link>
              <Link
                href="https://linkedin.com/in/jules-vandeneede"
                target="_blank"
                rel="noreferrer"
                className="h-9 w-9 rounded-md bg-secondary/50 border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-colors"
              >
                <LucideLinkedin className="h-4 w-4" />
                <span className="sr-only">LinkedIn</span>
              </Link>
              <Link
                href="mailto:julesvandeneedepro@gmail.com"
                className="h-9 w-9 rounded-md bg-secondary/50 border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-colors"
              >
                <Mail className="h-4 w-4" />
                <span className="sr-only">Email</span>
              </Link>
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-6 pt-6 border-t border-border text-center">
            <p className="text-xs font-mono text-muted-foreground/60">
              {FOOTER.copyright}
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
