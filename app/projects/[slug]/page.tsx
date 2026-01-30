import { notFound } from "next/navigation";
import Link from "next/link";
import { 
  ArrowLeft, 
  // eslint-disable-next-line deprecation/deprecation
  Github, 
  ExternalLink 
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { projects } from "@/lib/data";
import ReactMarkdown from "react-markdown";
import type { Metadata } from "next";

interface ProjectPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return {
      title: "Project Not Found",
      description: "The requested project could not be found.",
    };
  }

  return {
    title: `${project.title} | Jules Van Den Eede`,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description,
      type: "website",
      url: `https://yourdomain.com/projects/${project.slug}`,
      images: [
        {
          url: project.image || "/og-image.png",
          width: 1200,
          height: 630,
          alt: project.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: project.title,
      description: project.description,
      images: [project.image || "/og-image.png"],
    },
  };
}

export default async function ProjectPage({ params }: Readonly<ProjectPageProps>) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="py-20 md:py-32 bg-background">
      <Container>
        <Button variant="ghost" size="sm" asChild className="mb-8 text-muted-foreground hover:text-primary hover:bg-secondary/20">
          <Link href="/#projects">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Projects
          </Link>
        </Button>

        <div className="grid gap-12 lg:grid-cols-[2fr_1fr]">
          <div>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-6 text-primary">
              {project.title}
            </h1>
            
            <div className="aspect-video w-full bg-muted rounded-xl overflow-hidden mb-8 relative border border-border">
               <div className="absolute inset-0 flex items-center justify-center text-muted-foreground bg-secondary/20">
                  Project Screenshot
                </div>
            </div>

            <div className="prose prose-invert max-w-none prose-headings:text-primary prose-p:text-foreground prose-strong:text-primary prose-a:text-accent hover:prose-a:text-primary">
              <ReactMarkdown>{project.longDescription}</ReactMarkdown>
            </div>
          </div>

          <div className="space-y-8">
            <div className="rounded-xl border border-border bg-card p-6 shadow-lg shadow-black/20">
              <h3 className="font-semibold mb-4 text-primary">Project Links</h3>
              <div className="flex flex-col gap-3">
                <Button asChild className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                  <Link href={project.links.demo} target="_blank">
                    <ExternalLink className="mr-2 h-4 w-4" /> Live Demo
                  </Link>
                </Button>
                <Button variant="outline" asChild className="w-full border-accent/50 text-foreground hover:border-primary hover:text-primary">
                  <Link href={project.links.repo} target="_blank">
                    {/* eslint-disable-next-line deprecation/deprecation */}
                    <Github className="mr-2 h-4 w-4" /> View Code
                  </Link>
                </Button>
              </div>
            </div>

            <div className="rounded-xl border border-border bg-card p-6 shadow-lg shadow-black/20">
              <h3 className="font-semibold mb-4 text-primary">Technologies</h3>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center rounded-md bg-secondary/30 border border-secondary/50 px-2.5 py-1 text-sm font-medium text-primary"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
