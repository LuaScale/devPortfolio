import Link from "next/link";
import { AlertCircle, Home, ArrowLeft } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { NOT_FOUND } from "@/lib/constants";

export default function NotFound() {
  return (
    <div className="min-h-[calc(100vh-16rem)] flex items-center justify-center py-20 bg-background">
      <Container>
        <div className="max-w-2xl mx-auto">
          {/* Terminal-style 404 */}
          <div className="rounded-lg border border-border bg-card overflow-hidden shadow-2xl shadow-black/50">
            {/* Terminal header */}
            <div className="flex items-center gap-2 px-4 py-2 bg-secondary/50 border-b border-border">
              <div className="flex gap-1.5">
                <span className="h-3 w-3 rounded-full bg-[#ff5f56]" />
                <span className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
                <span className="h-3 w-3 rounded-full bg-[#27ca40]" />
              </div>
                <span className="text-xs text-muted-foreground font-mono ml-2">{NOT_FOUND.terminalFile}</span>
              </div>

              {/* Terminal content */}
              <div className="p-8 md:p-12 font-mono text-sm space-y-6">
                <div className="flex items-center gap-3 mb-8">
                  <AlertCircle className="h-12 w-12 text-[#ff5f56]" />
                  <div>
                    <h1 className="text-4xl font-bold text-[#ff5f56]">{NOT_FOUND.errorCode}</h1>
                    <p className="text-muted-foreground">{NOT_FOUND.title}</p>
                </div>
              </div>

              <div>
                <span className="text-primary">❯</span>
                <span className="text-[#ff7b72] ml-2">ls</span>
                <span className="text-muted-foreground ml-2">-la requested_page</span>
              </div>

              <div className="pl-4 text-muted-foreground">
                <p className="text-[#ff5f56]">Error: ENOENT: no such file or directory</p>
                <p className="mt-2">The page you&apos;re looking for doesn&apos;t exist.</p>
              </div>

              <div>
                <span className="text-primary">❯</span>
                <span className="text-[#ff7b72] ml-2">cat</span>
                <span className="text-muted-foreground ml-2">suggestions.txt</span>
              </div>

              <div className="pl-4 text-muted-foreground space-y-2">
                <p>{"{"}</p>
                <p className="pl-4">
                  <span className="text-[#a5d6ff]">&quot;suggestions&quot;</span>
                  <span>: [</span>
                </p>
                <p className="pl-8">
                  <span className="text-[#ffa657]">&quot;Check the URL for typos&quot;</span>,
                </p>
                <p className="pl-8">
                  <span className="text-[#ffa657]">&quot;Return to the homepage&quot;</span>,
                </p>
                <p className="pl-8">
                  <span className="text-[#ffa657]">&quot;Use the navigation menu&quot;</span>
                </p>
                <p className="pl-4">]</p>
                <p>{"}"}</p>
              </div>

              <div className="pt-6 border-t border-border flex flex-col sm:flex-row gap-3">
                <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90 font-mono shadow-[0_0_15px_rgba(74,222,128,0.2)]">
                  <Link href="/">
                    <Home className="mr-2 h-4 w-4" />
                    {NOT_FOUND.buttons.home}
                  </Link>
                </Button>
                <Button variant="outline" asChild className="border-border text-foreground hover:border-primary hover:text-primary font-mono">
                  <Link href="javascript:history.back()">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    {NOT_FOUND.buttons.back}
                  </Link>
                </Button>
              </div>

              <div className="text-xs text-muted-foreground">
                  <span className="text-[#8b949e]">{NOT_FOUND.footer.comment}</span>
                  {NOT_FOUND.footer.text}
                  <Link href={NOT_FOUND.footer.linkHref} className="text-primary hover:text-accent transition-colors">
                    {NOT_FOUND.footer.linkText}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
