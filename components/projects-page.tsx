"use client";

import { motion } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/routing";
import StaggeredText from "@/components/staggered-text";
import AsciiWaves from "@/components/ascii-waves";
import { projects, getLocalizedData } from "@/lib/data";
import { TAG_COLORS } from "@/lib/constants";
import {
  // eslint-disable-next-line deprecation/deprecation
  Github,
  ExternalLink,
  ArrowRight,
  ArrowDown,
  Terminal,
  Code2,
  GitBranch,
  Layers,
} from "lucide-react";

// ─── Per-project visual configuration ─────────────────────────────────────────
const projectVisuals: Record<
  string,
  { gradient: string; accentColor: string; gridColor: string; codeLines: string[] }
> = {
  "symfony-api": {
    gradient: "from-[#1e1030] via-[#2d1a50] to-[#0f0a1e]",
    accentColor: "#977dd6",
    gridColor: "#777bb4",
    codeLines: [
      "#[Route('/api/v1', name: 'api_')]",
      "class ProductController extends AbstractController {",
      "  #[Route('', methods: ['GET'])]",
      "  public function index(ProductRepo $repo): Response",
      "  {",
      "    return $this->json($repo->findAll());",
      "  }",
      "",
      "  #[OA_Get(path: '/api/v1/products')]",
      "  #[Security('is_granted(ROLE_USER)')]",
    ],
  },
  "good-food-mobile": {
    gradient: "from-[#061525] via-[#0d2a45] to-[#030c18]",
    accentColor: "#61dafb",
    gridColor: "#3b9fd4",
    codeLines: [
      "const RestaurantCard = ({ restaurant }: Props) => {",
      "  const { coords } = useGeolocation();",
      "  const distance = calcDistance(coords, restaurant);",
      "",
      "  return (",
      "    <Pressable style={styles.card}>",
      "      <FastImage source={{ uri: restaurant.imageUrl }} />",
      "      <Text style={styles.name}>{restaurant.name}</Text>",
      "      <Badge>{distance}km away</Badge>",
      "    </Pressable>",
    ],
  },
  "good-food-web-portals": {
    gradient: "from-[#061820] via-[#0d2f3a] to-[#030e14]",
    accentColor: "#22d3ee",
    gridColor: "#0e9ab5",
    codeLines: [
      "export default function Dashboard() {",
      "  const { orders } = useOrderStream();",
      "  const stats = useRestaurantStats({ days: 7 });",
      "",
      "  return (",
      "    <DashboardLayout>",
      "      <StatCard title='Revenue' value={stats.revenue} trend='+12%' />",
      "      <StatCard title='Orders' value={orders.length} live />",
      "      <OrderQueue orders={orders} autoRefresh />",
      "    </DashboardLayout>",
    ],
  },
};

// ─── Tag color palette ────────────────────────────────────────────────────────
function getAllTags() {
  const seen = new Set<string>();
  const result: string[] = [];
  projects.forEach((p) => {
    p.tags.forEach((t) => {
      if (!seen.has(t)) {
        seen.add(t);
        result.push(t);
      }
    });
  });
  return result;
}

// ─── Visual panel for each project ───────────────────────────────────────────
function ProjectPanel({
  slug,
  index,
}: Readonly<{
  slug: string;
  index: number;
}>) {
  const vis = projectVisuals[slug] ?? {
    gradient: "from-[#111] to-[#1a1a1a]",
    accentColor: "#4ade80",
    gridColor: "#4ade80",
    codeLines: [],
  };

  return (
    <div className="group relative">
      {/* Ambient glow */}
      <div
        className="absolute -inset-2 rounded-2xl opacity-20 blur-2xl group-hover:opacity-35 transition-opacity duration-700 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at 50% 60%, ${vis.accentColor}50, transparent 70%)`,
        }}
      />
      {/* Window chrome wrapper */}
      <div className="relative rounded-xl overflow-hidden border border-white/10 shadow-2xl bg-[#0a0a0a]">
        {/* Title bar */}
        <div className="flex items-center gap-3 px-4 py-3 bg-[#161616] border-b border-white/[0.06]">
          <div className="flex gap-1.5 shrink-0">
            <span className="h-3 w-3 rounded-full bg-[#ff5f56]" />
            <span className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
            <span className="h-3 w-3 rounded-full bg-[#27ca40]" />
          </div>
          <div className="flex-1 min-w-0 mx-2">
            <div className="px-3 py-1 rounded-md bg-black/50 text-[11px] font-mono text-white/30 truncate">
              ~/projects/{slug}
            </div>
          </div>
        </div>

        {/* Content viewport */}
        <div
          className={`relative aspect-[16/10] overflow-hidden bg-gradient-to-br ${vis.gradient}`}
        >
          {/* Subtle grid */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.12]"
            style={{
              backgroundImage: `linear-gradient(to right, ${vis.gridColor} 1px, transparent 1px), linear-gradient(to bottom, ${vis.gridColor} 1px, transparent 1px)`,
              backgroundSize: "2rem 2rem",
            }}
          />

          {/* Large index watermark */}
          <div
            className="absolute -right-4 bottom-0 font-black font-mono leading-none select-none pointer-events-none opacity-[0.04] text-[11rem]"
            style={{ color: vis.accentColor }}
          >
            {String(index + 1).padStart(2, "0")}
          </div>

          {/* Code editor block */}
          <div className="absolute inset-0 flex flex-col justify-center p-6 md:p-8">
            <div className="rounded-lg bg-black/50 backdrop-blur-sm border border-white/[0.06] overflow-hidden">
              {/* Editor tab */}
              <div className="flex items-center gap-2 px-4 py-2 bg-white/[0.03] border-b border-white/[0.05]">
                <span
                  className="h-2 w-2 rounded-full"
                  style={{ backgroundColor: vis.accentColor }}
                />
                <span className="text-[10px] font-mono text-white/30">
                  {slug}.ts
                </span>
              </div>
              {/* Code lines */}
              <div className="p-4 font-mono text-[11px] md:text-xs leading-relaxed space-y-0.5">
                {vis.codeLines.map((line, i) => {
                  const isAnnotation = line.trimStart().startsWith("#[") || line.trimStart().startsWith("//");
                  const isKeyword = /\b(const|export|return|public|default|function|class)\b/.test(line);
                  const isString = /['"`]/.test(line) && !isKeyword && !isAnnotation;
                  let lineColor = "#cdd6f4";
                  if (isAnnotation) lineColor = `${vis.accentColor}cc`;
                  else if (isKeyword) lineColor = "#c792ea";
                  else if (isString) lineColor = "#c3e88d";

                  return (
                    // eslint-disable-next-line react/no-array-index-key
                    <div key={`ln-${i}`} className="flex gap-4 min-h-[1.1em]">
                      <span className="text-white/[0.2] w-4 text-right shrink-0 select-none">
                        {line ? i + 1 : ""}
                      </span>
                      <span
                        className="whitespace-pre"
                        style={{ color: lineColor }}
                      >
                        {line || " "}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Bottom accent line */}
          <div
            className="absolute bottom-0 left-0 right-0 h-px"
            style={{
              background: `linear-gradient(to right, transparent 0%, ${vis.accentColor}80 50%, transparent 100%)`,
            }}
          />
        </div>
      </div>
    </div>
  );
}

// ─── Main page component ──────────────────────────────────────────────────────
export function ProjectsPage() {
  const t = useTranslations("projectsPage");
  const locale = useLocale();

  const localizedProjects = projects.map((p) => ({
    ...getLocalizedData(p, locale),
    slug: p.slug,
    tags: p.tags,
    links: p.links,
  }));

  const allTags = getAllTags();

  return (
    <div className="flex flex-col">
      {/* ═══════════════════════════════════════════════════════════
          SECTION 1 — HERO
      ═══════════════════════════════════════════════════════════ */}
      <section className="relative flex min-h-[80vh] items-center justify-center overflow-hidden py-24">
        {/* ASCII waves background */}
        <div className="absolute inset-0 -z-10">
          <AsciiWaves
            characters=" .·:–=+*"
            color="#22d3ee"
            intensity={0.15}
            speed={0.3}
            elementSize={20}
            noiseScale={2}
            waveTension={0.25}
            waveTwist={0.06}
            interactionIntensity={0.8}
            className="opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />
        </div>

        <Container>
          <div className="max-w-4xl mx-auto text-center">
            {/* Terminal command badge */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-card/80 backdrop-blur-sm mb-8 font-mono text-sm"
            >
              <span className="text-primary">❯</span>
              <span className="text-[#22d3ee]">{t("command")}</span>
            </motion.div>

            {/* Eyebrow */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="text-muted-foreground font-mono text-sm mb-4"
            >
              {t("eyebrow")}
            </motion.p>

            {/* Big title + "so far" inline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-6 flex flex-wrap items-baseline justify-center gap-x-4"
            >
              <StaggeredText
                as="h1"
                text={t("title")}
                className="text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl"
                segmentBy="words"
                delay={80}
                duration={0.6}
                direction="top"
                blur
              />
              <motion.span
                initial={{ opacity: 0, x: 14 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.58, ease: [0.22, 1, 0.36, 1] }}
                className="text-3xl sm:text-4xl md:text-5xl italic font-light tracking-tight"
                style={{ color: "#4ade80cc" }}
              >
                — {t("titleSuffix")}
              </motion.span>
            </motion.div>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-lg text-muted-foreground max-w-2xl mx-auto mb-14"
            >
              {t("subtitle")}
            </motion.p>

            {/* Stats row */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.55 }}
              className="flex justify-center flex-wrap gap-10 mb-14"
            >
              {[
                {
                  value: `${projects.length}`,
                  label: t("stats.projects"),
                  icon: <Layers className="h-4 w-4" style={{ color: "#4ade80" }} />,
                  color: "#4ade80",
                },
                {
                  value: `${allTags.length}`,
                  label: t("stats.technologies"),
                  icon: <Code2 className="h-4 w-4" style={{ color: "#22d3ee" }} />,
                  color: "#22d3ee",
                },
                {
                  value: "100%",
                  label: t("stats.openSource"),
                  icon: <GitBranch className="h-4 w-4" style={{ color: "#a78bfa" }} />,
                  color: "#a78bfa",
                },
              ].map((stat) => (
                <div key={stat.label} className="flex flex-col items-center gap-1.5">
                  <div className="mb-0.5">{stat.icon}</div>
                  <span
                    className="text-4xl font-bold font-mono tabular-nums"
                    style={{ color: stat.color }}
                  >
                    {stat.value}
                  </span>
                  <span className="text-xs text-muted-foreground uppercase tracking-widest font-mono">
                    {stat.label}
                  </span>
                </div>
              ))}
            </motion.div>

            {/* Scroll bounce */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="flex justify-center"
            >
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
                className="text-muted-foreground/40"
              >
                <ArrowDown className="h-5 w-5" />
              </motion.div>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 2 — FEATURED SHOWCASE (alternating cards)
      ═══════════════════════════════════════════════════════════ */}
      <section className="py-28 border-t border-border/40">
        <Container>
          <div className="space-y-36">
            {localizedProjects.map((project, index) => {
              const vis = projectVisuals[project.slug] ?? {
                accentColor: "#4ade80",
                gridColor: "#4ade80",
                gradient: "",
                codeLines: [],
              };
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={project.slug}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center"
                >
                  {/* Visual panel */}
                  <div className={isEven ? "" : "lg:order-2"}>
                    <ProjectPanel slug={project.slug} index={index} />
                  </div>

                  {/* Info panel */}
                  <div
                    className={`flex flex-col ${
                      isEven ? "" : "lg:order-1 lg:items-end lg:text-right"
                    }`}
                  >
                    {/* Counter */}
                    <motion.span
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 }}
                      className="font-mono text-sm mb-4 block"
                      style={{ color: vis.accentColor }}
                    >
                      {String(index + 1).padStart(2, "0")} /{" "}
                      {String(localizedProjects.length).padStart(2, "0")}
                    </motion.span>

                    {/* Project title */}
                    <h3
                      className="text-2xl sm:text-3xl font-bold tracking-tight mb-4"
                      style={{ color: "#ffffff" }}
                    >
                      <span style={{ color: vis.accentColor }}>{"// "}</span>
                      {project.title}
                    </h3>

                    {/* Tech tags */}
                    <div
                      className={`flex flex-wrap gap-2 mb-6 ${
                        isEven ? "" : "lg:justify-end"
                      }`}
                    >
                      {project.tags.map((tag: string) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 rounded-full text-xs font-mono border"
                          style={{
                            color: TAG_COLORS[tag]?.text ?? "#e5e5e5",
                            borderColor: `${TAG_COLORS[tag]?.text ?? "#e5e5e5"}35`,
                            backgroundColor: TAG_COLORS[tag]?.bg ?? "#e5e5e515",
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Description */}
                    <p className="text-muted-foreground text-base leading-relaxed mb-8 max-w-lg">
                      {project.description}
                    </p>

                    {/* Actions */}
                    <div
                      className={`flex gap-3 flex-wrap ${
                        isEven ? "" : "lg:justify-end"
                      }`}
                    >
                      <Button
                        variant="outline"
                        size="sm"
                        asChild
                        className="border-border hover:border-primary hover:text-primary font-mono text-xs"
                      >
                        <a
                          href={project.links.repo}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {/* eslint-disable-next-line deprecation/deprecation */}
                          <Github className="mr-2 h-4 w-4" />
                          {t("viewSource")}
                        </a>
                      </Button>
                      {project.links.demo !== "#" && (
                        <Button
                          size="sm"
                          asChild
                          className="font-mono text-xs"
                          style={{
                            backgroundColor: vis.accentColor,
                            color: "#000",
                          }}
                        >
                          <a
                            href={project.links.demo}
                            target="_blank"
                            rel="noreferrer"
                          >
                            <ExternalLink className="mr-2 h-4 w-4" />
                            {t("viewDemo")}
                          </a>
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        asChild
                        className="font-mono text-xs hover:text-accent ml-auto lg:ml-0"
                      >
                        <Link href={`/projects/${project.slug}`}>
                          {t("readMore")}{" "}
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 3 — TECHNOLOGY ARSENAL
      ═══════════════════════════════════════════════════════════ */}
      <section className="py-24 border-t border-border/40 bg-secondary/5">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-10"
          >
            <p className="text-muted-foreground font-mono text-sm mb-4">
              <span className="text-primary">❯</span>{" "}
              <span className="text-[#ff7b72]">{t("techSection.command")}</span>
            </p>
            <StaggeredText
              as="h2"
              text={t("techSection.title")}
              className="text-3xl font-bold tracking-tight sm:text-4xl"
              segmentBy="words"
              delay={60}
              duration={0.5}
              direction="top"
              blur
            />
          </motion.div>

          {/* Opening brace */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-mono text-muted-foreground/50 text-sm mb-5"
          >
            {"{"}
          </motion.p>

          <div className="flex flex-wrap gap-3 pl-6 mb-5">
            {allTags.map((tag, i) => (
              <motion.div
                key={tag}
                initial={{ opacity: 0, y: 12, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.04 }}
                whileHover={{ scale: 1.06, y: -2 }}
                className="group"
              >
                <div
                  className="flex items-center gap-2 px-4 py-2 rounded-lg border font-mono text-sm cursor-default transition-shadow duration-200 group-hover:shadow-md"
                  style={{
                    color: TAG_COLORS[tag]?.text ?? "#e5e5e5",
                    borderColor: `${TAG_COLORS[tag]?.text ?? "#e5e5e5"}30`,
                    backgroundColor: TAG_COLORS[tag]?.bg ?? "#e5e5e510",
                  }}
                >
                  <span
                    className="h-2 w-2 rounded-full shrink-0"
                    style={{ backgroundColor: TAG_COLORS[tag]?.text ?? "#e5e5e5" }}
                  />
                  {tag}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Closing brace */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-mono text-muted-foreground/50 text-sm"
          >
            {"}"}
          </motion.p>
        </Container>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 4 — GITHUB CTA
      ═══════════════════════════════════════════════════════════ */}
      <section className="py-24 border-t border-border/40">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative rounded-2xl overflow-hidden border border-border bg-card p-12 md:p-20 text-center"
          >
            {/* Background layers */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-[#22d3ee]/5" />
              <div
                className="absolute inset-0 opacity-[0.035]"
                style={{
                  backgroundImage:
                    "linear-gradient(to right, #4ade80 1px, transparent 1px), linear-gradient(to bottom, #4ade80 1px, transparent 1px)",
                  backgroundSize: "4rem 4rem",
                }}
              />
              {/* Corner glows */}
              <div className="absolute -top-20 -left-20 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
              <div className="absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-[#22d3ee]/10 blur-3xl" />
            </div>

            <div className="relative">
              {/* Terminal command */}
              <p className="font-mono text-sm text-muted-foreground mb-8">
                <span className="text-primary">❯</span>{" "}
                <span className="text-[#ff7b72]">{t("cta.command")}</span>
              </p>

              {/* CTA title + "it's there for it" inline */}
              <div className="mb-8 flex flex-wrap items-baseline justify-center gap-x-4">
                <StaggeredText
                  as="h2"
                  text={t("cta.title")}
                  className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl"
                  segmentBy="words"
                  delay={70}
                  duration={0.5}
                  direction="top"
                  blur
                />
                <motion.span
                  initial={{ opacity: 0, x: 14 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="text-xl sm:text-2xl md:text-3xl italic font-light tracking-tight"
                  style={{ color: "#4ade80cc" }}
                >
                  — {t("cta.tagline")}
                </motion.span>
              </div>

              <p className="text-muted-foreground max-w-md mx-auto mb-10">
                {t("cta.subtitle")}
              </p>

              <Button
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-[0_0_20px_rgba(74,222,128,0.2)] hover:shadow-[0_0_35px_rgba(74,222,128,0.35)] transition-all font-mono"
                asChild
              >
                <a
                  href="https://github.com/LuaScale"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Terminal className="mr-2 h-4 w-4" />
                  {t("cta.button")}
                </a>
              </Button>
            </div>
          </motion.div>
        </Container>
      </section>
    </div>
  );
}
