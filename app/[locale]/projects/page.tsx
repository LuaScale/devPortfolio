import { type Metadata } from "next";
import { ProjectsPage } from "@/components/projects-page";

export const metadata: Metadata = {
  title: "Projects | Jules Van Den Eede",
  description:
    "A showcase of my development projects — REST APIs, mobile apps, and web portals.",
};

export default function Page() {
  return <ProjectsPage />;
}
