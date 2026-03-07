"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun, Monitor, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const themes = [
  { value: "light", label: "Light", icon: Sun },
  { value: "dark", label: "Dark", icon: Moon },
  { value: "system", label: "System", icon: Monitor },
];

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-9 h-9 rounded-md border border-border bg-secondary/30" />
    );
  }

  const currentTheme = themes.find((t) => t.value === theme) || themes[2];
  const Icon = currentTheme.icon;

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md border border-border bg-secondary/30 text-muted-foreground hover:text-foreground hover:bg-secondary/50 hover:border-primary/50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/20"
        aria-label="Select theme"
      >
        <Icon className="h-4 w-4" />
        <ChevronDown className={cn("h-3 w-3 transition-transform", isOpen && "rotate-180")} />
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
            onKeyDown={(e) => e.key === "Escape" && setIsOpen(false)}
            role="button"
            tabIndex={-1}
            aria-label="Close dropdown"
          />
          <div className="absolute right-0 mt-2 w-40 rounded-md border border-border bg-card shadow-lg z-50 overflow-hidden">
            {themes.map((themeOption) => {
              const ThemeIcon = themeOption.icon;
              return (
                <button
                  key={themeOption.value}
                  onClick={() => {
                    setTheme(themeOption.value);
                    setIsOpen(false);
                  }}
                  className={cn(
                    "w-full flex items-center gap-3 px-4 py-2.5 text-sm font-mono transition-colors",
                    theme === themeOption.value
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
                  )}
                >
                  <ThemeIcon className="h-4 w-4" />
                  <span className="flex-1 text-left">{themeOption.label}</span>
                  {theme === themeOption.value && (
                    <span className="text-primary">✓</span>
                  )}
                </button>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
