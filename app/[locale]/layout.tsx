import type { Metadata } from "next";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { SidebarNav } from "@/components/layout/sidebar-nav";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";
import { PortfolioPreloader } from "@/components/portfolio-preloader";
import AsciiCursor from "@/components/ascii-cursor";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  return {
    title: "Jules Van Den Eede | Portfolio",
    description:
      locale === "fr"
        ? "Portfolio de Jules Van Den Eede - Développeur Full Stack"
        : "Portfolio of Jules Van Den Eede - Full Stack Developer",
    alternates: {
      languages: {
        en: "/en",
        fr: "/fr",
      },
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  // Ensure that the incoming locale is valid
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  // Providing all messages to the client side
  const messages = await getMessages({ locale });

  return (
    <NextIntlClientProvider messages={messages}>
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem
        disableTransitionOnChange
      >
        <PortfolioPreloader>
          {/* ASCII cursor trail — hidden on touch/mobile devices */}
          <div
            className="fixed inset-0 pointer-events-none z-50 hidden md:block"
            aria-hidden="true"
          >
            <AsciiCursor
              characters="✶✷$☺✦☉∗ϟ▵.;."
              color="#4ade80"
              backgroundColor="#000000"
              size={24}
              spread={18}
              persistence={2}
              opacity={0.55}
              enableFade
            />
          </div>
          <Header />
          <SidebarNav />
          <main className="flex-1">{children}</main>
          <Footer />
        </PortfolioPreloader>
      </ThemeProvider>
    </NextIntlClientProvider>
  );
}
