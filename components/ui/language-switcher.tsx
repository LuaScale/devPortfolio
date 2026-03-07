"use client";

import * as React from "react";
import { useParams } from "next/navigation";
import { usePathname, useRouter } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { ChevronDown, Languages } from "lucide-react";

type Locale = "en" | "fr";

const languages: { code: Locale; name: string; flag: string }[] = [
  { code: "en", name: "English", flag: "🇬🇧" },
  { code: "fr", name: "Français", flag: "🇫🇷" },
];

export function LanguageSwitcher() {
  const params = useParams();
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = (params.locale as Locale) || "en";
  const [isOpen, setIsOpen] = React.useState(false);

  const handleLanguageChange = (locale: Locale) => {
    router.replace(pathname, { locale });
    setIsOpen(false);
  };

  const currentLanguage = languages.find((lang) => lang.code === currentLocale);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md border border-border bg-secondary/30 text-muted-foreground hover:text-foreground hover:bg-secondary/50 hover:border-primary/50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/20"
        aria-label="Select language"
      >
        <Languages className="h-4 w-4" />
        <span className="text-sm font-mono">{currentLanguage?.flag}</span>
        <ChevronDown className={cn("h-3 w-3 transition-transform", isOpen && "rotate-180")} />
      </button>

      {isOpen && (
        <>
          <button
            className="fixed inset-0 z-40 cursor-default"
            onClick={() => setIsOpen(false)}
            onKeyDown={(e) => e.key === "Escape" && setIsOpen(false)}
            tabIndex={-1}
            aria-label="Close dropdown"
          />
          <div className="absolute right-0 mt-2 w-40 rounded-md border border-border bg-card shadow-lg z-50 overflow-hidden">
            {languages.map((language) => (
              <button
                key={language.code}
                onClick={() => handleLanguageChange(language.code)}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-2.5 text-sm font-mono transition-colors",
                  currentLocale === language.code
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
                )}
              >
                <span className="text-lg">{language.flag}</span>
                <span className="flex-1 text-left">{language.name}</span>
                {currentLocale === language.code && (
                  <span className="text-primary">✓</span>
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

