"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

const SECTION_IDS = ["hero", "projects", "experience", "about", "contact"] as const;

export function SidebarNav() {
  const pathname = usePathname();
  const t = useTranslations("nav");
  const [activeSection, setActiveSection] = React.useState<string>("hero");

  // Only visible on home page (pathname is just the locale segment)
  const pathParts = pathname.split("/").filter(Boolean);
  const isHome = pathParts.length <= 1;

  React.useEffect(() => {
    if (!isHome) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Find the topmost intersecting section
        const intersecting = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (intersecting.length > 0) {
          setActiveSection(intersecting[0].target.id);
        }
      },
      { rootMargin: "-20% 0px -60% 0px", threshold: 0 }
    );

    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [isHome]);

  if (!isHome) return null;

  const SECTIONS = [
    { id: "hero", label: t("items.hero"), num: "00" },
    { id: "projects", label: t("items.projects"), num: "01" },
    { id: "experience", label: t("items.experience"), num: "02" },
    { id: "about", label: t("items.about"), num: "03" },
    { id: "contact", label: t("items.contact"), num: "04" },
  ];

  return (
    <aside
      className="fixed right-0 top-0 h-full z-40 hidden lg:flex flex-col justify-center"
      aria-label="Section navigation"
    >
      <nav className="flex flex-col gap-5 pr-5 items-end">
        {/* Terminal-style label */}
        <span className="text-[9px] font-mono text-muted-foreground/30 tracking-widest uppercase select-none mb-1">
          ~/nav
        </span>

        {SECTIONS.map((section) => {
          const isActive = activeSection === section.id;
          return (
            <a
              key={section.id}
              href={`#${section.id}`}
              className={cn(
                "group flex items-center gap-3 transition-all duration-300 select-none flex-row-reverse",
                isActive
                  ? "text-foreground"
                  : "text-muted-foreground/40 hover:text-muted-foreground"
              )}
            >
              {/* Horizontal tick / active bar */}
              <div
                className={cn(
                  "h-px shrink-0 transition-all duration-300",
                  isActive
                    ? "w-5 bg-[#4ade80]"
                    : "w-2.5 bg-muted-foreground/25 group-hover:w-3.5 group-hover:bg-muted-foreground/40"
                )}
              />

              {/* Number + label */}
              <div className="flex items-baseline gap-1.5 overflow-hidden flex-row-reverse">
                <span
                  className={cn(
                    "text-[10px] font-mono shrink-0 transition-colors duration-300",
                    isActive ? "text-[#4ade80]" : "text-muted-foreground/35"
                  )}
                >
                  {section.num}.
                </span>
                <span
                  className={cn(
                    "text-[11px] font-mono whitespace-nowrap transition-all duration-300",
                    isActive
                      ? "opacity-100 translate-x-0"
                      : "opacity-0 translate-x-1 group-hover:opacity-50 group-hover:translate-x-0"
                  )}
                >
                  {section.label}
                </span>
              </div>
            </a>
          );
        })}
      </nav>
    </aside>
  );
}
