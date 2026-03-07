"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Mail, 
  // eslint-disable-next-line deprecation/deprecation
  Github, 
  // eslint-disable-next-line deprecation/deprecation
  Linkedin, 
  Send, Loader2, CheckCircle2, XCircle 
} from "lucide-react";
import { useTranslations } from "next-intl";
import StaggeredText from "@/components/staggered-text";

type FormStatus = "idle" | "loading" | "success" | "error";

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to send message");
      }

      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
      
      // Reset success message after 5 seconds
      setTimeout(() => setStatus("idle"), 5000);
    } catch (error) {
      setStatus("error");
      setErrorMessage(error instanceof Error ? error.message : "Failed to send message");
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  
  const t = useTranslations("contact");
  
  return (
    <section id="contact" className="py-20 md:py-32 bg-background">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-primary font-mono text-sm">{t("number")}</span>
            <StaggeredText
              as="h2"
              text={t("title")}
              className="text-3xl font-bold tracking-tight sm:text-4xl"
              segmentBy="words"
              delay={60}
              duration={0.5}
              direction="top"
              blur
            />
            <div className="h-px flex-1 bg-border max-w-xs" />
          </div>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Terminal-style contact info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="rounded-lg border border-border bg-card overflow-hidden">
              {/* Terminal header */}
              <div className="flex items-center gap-2 px-4 py-2 bg-secondary/50 border-b border-border">
                <div className="flex gap-1.5">
                  <span className="h-3 w-3 rounded-full bg-[#ff5f56]" />
                  <span className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
                  <span className="h-3 w-3 rounded-full bg-[#27ca40]" />
                </div>
                <span className="text-xs text-muted-foreground font-mono ml-2">{t("terminalFile")}</span>
              </div>

              {/* Terminal content */}
              <div className="p-4 md:p-6 font-mono text-sm space-y-4">
                <div>
                  <span className="text-primary">❯</span>
                  <span className="text-[#ff7b72] ml-2">{t("command")}</span>
                </div>

                <div className="pl-4 text-muted-foreground">
                  <p>{"{"}</p>
                  <p className="pl-4">
                    <span className="text-[#a5d6ff]">&quot;status&quot;</span>
                    <span>: </span>
                    <span className="text-primary">&quot;{t("json.status")}&quot;</span>
                    <span>,</span>
                  </p>
                  <p className="pl-4">
                    <span className="text-[#a5d6ff]">&quot;location&quot;</span>
                    <span>: </span>
                    <span className="text-[#ffa657]">&quot;{t("json.location")}&quot;</span>
                    <span>,</span>
                  </p>
                  <p className="pl-4">
                    <span className="text-[#a5d6ff]">&quot;email&quot;</span>
                    <span>: </span>
                    <span className="text-[#ffa657]">&quot;{t("json.email")}&quot;</span>
                    <span>,</span>
                  </p>
                  <p className="pl-4">
                    <span className="text-[#a5d6ff]">&quot;response_time&quot;</span>
                    <span>: </span>
                    <span className="text-[#ffa657]">&quot;{t("json.responseTime")}&quot;</span>
                  </p>
                  <p>{"}"}  </p>
                </div>

                <div className="pt-4 border-t border-border">
                  <p className="text-muted-foreground mb-4">
                    {t("description")}
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <a
                      href="https://github.com/LuaScale"
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-secondary/50 border border-border text-muted-foreground hover:text-foreground hover:border-primary/50 transition-colors"
                    >
                      {/* eslint-disable-next-line deprecation/deprecation */}
                      <Github className="h-4 w-4" />
                      <span>{t("social.github")}</span>
                    </a>
                    <a
                      href="https://linkedin.com/in/jules-vandeneede"
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-secondary/50 border border-border text-muted-foreground hover:text-foreground hover:border-primary/50 transition-colors"
                    >
                      {/* eslint-disable-next-line deprecation/deprecation */}
                      <Linkedin className="h-4 w-4" />
                      <span>{t("social.linkedin")}</span>
                    </a>
                    <a
                      href="mailto:julesvandeneedepro@gmail.com"
                      className="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-secondary/50 border border-border text-muted-foreground hover:text-foreground hover:border-primary/50 transition-colors"
                    >
                      <Mail className="h-4 w-4" />
                      <span>{t("social.email")}</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact form - IDE style */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="rounded-lg border border-border bg-card overflow-hidden">
              {/* Form header */}
              <div className="flex items-center gap-2 px-4 py-2 bg-secondary/50 border-b border-border">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="text-xs text-muted-foreground font-mono">{t("form.header")}</span>
              </div>

              <form onSubmit={handleSubmit} className="p-4 md:p-6 space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-xs font-mono text-muted-foreground">
                      <span className="text-[#ff7b72]">const</span> {t("form.labels.name")} <span className="text-muted-foreground/60">=</span>
                    </label>
                    <input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      disabled={status === "loading"}
                      className="flex h-10 w-full rounded-md border border-border bg-secondary/30 px-3 py-2 text-sm font-mono placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      placeholder={t("form.placeholders.name")}
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-xs font-mono text-muted-foreground">
                      <span className="text-[#ff7b72]">const</span> {t("form.labels.email")} <span className="text-muted-foreground/60">=</span>
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      disabled={status === "loading"}
                      className="flex h-10 w-full rounded-md border border-border bg-secondary/30 px-3 py-2 text-sm font-mono placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      placeholder={t("form.placeholders.email")}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-xs font-mono text-muted-foreground">
                    <span className="text-[#ff7b72]">const</span> {t("form.labels.message")} <span className="text-muted-foreground/60">=</span> {"`"}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    disabled={status === "loading"}
                    className="flex min-h-[120px] w-full rounded-md border border-border bg-secondary/30 px-3 py-2 text-sm font-mono placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-colors resize-none disabled:opacity-50 disabled:cursor-not-allowed"
                    placeholder={t("form.placeholders.message")}
                  />
                  <span className="text-xs font-mono text-muted-foreground">{"`"}</span>
                </div>

                {status === "error" && (
                  <div className="flex items-center gap-2 p-3 rounded-md bg-red-500/10 border border-red-500/20 text-red-500 text-sm">
                    <XCircle className="h-4 w-4 flex-shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                {status === "success" && (
                  <div className="flex items-center gap-2 p-3 rounded-md bg-primary/10 border border-primary/20 text-primary text-sm">
                    <CheckCircle2 className="h-4 w-4 flex-shrink-0" />
                    <span>{t("form.success")}</span>
                  </div>
                )}

                <Button 
                  type="submit" 
                  disabled={status === "loading"}
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-mono shadow-[0_0_15px_rgba(74,222,128,0.2)] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status === "loading" ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      {t("form.sending")}
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      {t("form.button")}
                    </>
                  )}
                </Button>

                <p className="text-xs text-muted-foreground text-center font-mono">
                  <span className="text-[#8b949e]">{t("form.footer")}</span>
                </p>
              </form>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
