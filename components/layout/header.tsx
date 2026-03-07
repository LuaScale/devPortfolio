"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { LanguageSwitcher } from "@/components/ui/language-switcher";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
// eslint-disable-next-line deprecation/deprecation
import * as lucideReact from "lucide-react";
import { SITE } from "@/lib/constants";

export function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const t = useTranslations("nav");

  // Home page = pathname is just the locale segment (e.g. /en or /fr)
  const pathParts = pathname.split("/").filter(Boolean);
  const isHome = pathParts.length <= 1;

  // Section anchors — used in mobile menu on home page only
  const SECTION_ITEMS = [
    { name: t("items.hero"), href: "#hero", num: "00." },
    { name: t("items.projects"), href: "#projects", num: "01." },
    { name: t("items.experience"), href: "#experience", num: "02." },
    { name: t("items.about"), href: "#about", num: "03." },
    { name: t("items.contact"), href: "#contact", num: "04." },
  ];

  // Page-level links — shown in desktop nav + mobile menu on sub-pages
  const PAGE_LINKS = [
    { name: t("pages.home"), href: "/", num: "~/" },
    { name: t("pages.projects"), href: "/projects", num: "~/" },
  ];

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  React.useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        "fixed top-0 z-50 w-full transition-all duration-300",
        isScrolled || isMobileMenuOpen
          ? "bg-background/95 backdrop-blur-md border-b border-border"
          : "bg-transparent"
      )}
    >
      <Container>
        <div className="flex h-16 items-center justify-between">
          {/* Logo - Terminal style */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="h-8 w-8 rounded bg-primary/10 border border-primary/30 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
              <lucideReact.Terminal className="h-4 w-4 text-primary" />
            </div>
            <span className="font-mono text-sm text-foreground">
              <span className="text-primary">jules</span>
              <span className="text-muted-foreground">@dev</span>
              <span className="text-foreground">:~$</span>
            </span>
          </Link>

          {/* Desktop Nav — always show page links */}
          <nav className="hidden md:flex items-center gap-1">
            {PAGE_LINKS.map((item) => {
              const isActive = pathname.endsWith(item.href) || (item.href === "/" && isHome);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "px-4 py-2 text-sm font-mono transition-colors hover:text-primary rounded-md hover:bg-secondary/50",
                    isActive ? "text-primary" : "text-muted-foreground"
                  )}
                >
                  <span className="text-[#4ade80]/70 text-xs mr-0.5">{item.num}</span>
                  {item.name}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <div className="hidden md:flex items-center gap-2">
              <LanguageSwitcher />
              <ThemeToggle />
              <Button variant="ghost" size="icon" asChild className="text-muted-foreground hover:text-primary hover:bg-secondary/50">
                <a href={SITE.github} target="_blank" rel="noreferrer">
                  {/* eslint-disable-next-line deprecation/deprecation */}
                  <lucideReact.Github className="h-5 w-5" />
                  <span className="sr-only">GitHub</span>
                </a>
              </Button>
              <Button variant="ghost" size="icon" asChild className="text-muted-foreground hover:text-primary hover:bg-secondary/50">
                <a href={SITE.linkedin} target="_blank" rel="noreferrer">
                  {/* eslint-disable-next-line deprecation/deprecation */}
                  <lucideReact.Linkedin className="h-5 w-5" />
                  <span className="sr-only">LinkedIn</span>
                </a>
              </Button>
              <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90 font-mono text-sm shadow-[0_0_15px_rgba(74,222,128,0.2)]">
                <Link href="/#contact">{t("cta")}</Link>
              </Button>
            </div>

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-muted-foreground hover:text-primary"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <lucideReact.X className="h-5 w-5" />
              ) : (
                <lucideReact.Menu className="h-5 w-5" />
              )}
              <span className="sr-only">Toggle menu</span>
            </Button>
          </div>
        </div>
      </Container>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="border-b border-border bg-background/98 backdrop-blur-md md:hidden"
          >
            <Container className="py-4 pb-6">
              <nav className="flex flex-col gap-2">
                {/* Home page: show section anchors. Sub-pages: show page links */}
                {(isHome ? SECTION_ITEMS : PAGE_LINKS).map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "px-4 py-3 font-mono text-base transition-colors rounded-md",
                      pathname === item.href
                        ? "text-primary bg-primary/10"
                        : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                    )}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <span className="text-[#4ade80]/70 text-sm mr-2">{item.num}</span>
                    {item.name}
                  </Link>
                ))}
                <div className="flex items-center gap-3 mt-4 pt-4 border-t border-border">
                  <LanguageSwitcher />
                  <ThemeToggle />
                  <Button variant="ghost" size="icon" asChild className="text-muted-foreground hover:text-primary">
                    <a href={SITE.github} target="_blank" rel="noreferrer">
                      {/* eslint-disable-next-line deprecation/deprecation */}
                      <lucideReact.Github className="h-5 w-5" />
                    </a>
                  </Button>
                  <Button variant="ghost" size="icon" asChild className="text-muted-foreground hover:text-primary">
                    <a href={SITE.linkedin} target="_blank" rel="noreferrer">
                      {/* eslint-disable-next-line deprecation/deprecation */}
                      <lucideReact.Linkedin className="h-5 w-5" />
                    </a>
                  </Button>
                  <Button className="flex-1 font-mono" asChild>
                    <Link href="/#contact">{t("cta")}</Link>
                  </Button>
                </div>
              </nav>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
