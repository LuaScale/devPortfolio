export const projects = [
  {
    slug: "symfony-api",
    title: "Symfony REST API",
    description:
      "A robust REST API built with Symfony framework, featuring authentication, CRUD operations, and modern PHP best practices.",
    longDescription: `
      **Symfony REST API** is a production-ready backend application showcasing modern PHP development with the Symfony framework.

      **Key Features:**
      - **RESTful Architecture:** Clean API design following REST principles and HTTP standards.
      - **Authentication & Authorization:** Secure endpoints with JWT tokens and role-based access control.
      - **Database Management:** Doctrine ORM integration with migrations and fixtures.
      - **API Documentation:** Swagger/OpenAPI documentation for easy integration.

      **Technical Highlights:**
      - **Framework:** Symfony 6+ with modern PHP 8+ features.
      - **Testing:** PHPUnit tests ensuring code reliability.
      - **Best Practices:** SOLID principles, dependency injection, and clean architecture.
      - **Performance:** Optimized queries and caching strategies.
    `,
    tags: ["PHP", "Symfony", "REST API", "Doctrine", "MySQL", "JWT"],
    links: {
      demo: "#",
      repo: "https://github.com/LuaScale/symfony-api",
    },
    image: "/project-1.jpg",
  },
  {
    slug: "good-food-mobile",
    title: "GoodFood Mobile App",
    description:
      "The customer-facing mobile application for the GoodFood platform, allowing users to discover restaurants and track deliveries.",
    longDescription: `
      The **GoodFood Mobile Client** is the primary touchpoint for customers. It provides a seamless interface for food ordering and delivery tracking.

      **Features:**
      - **Restaurant Discovery:** Browse restaurants by category or location.
      - **Real-time Tracking:** Track order status and delivery driver location.
      - **Secure Payments:** Integrated payment processing for smooth checkout.
      
      **Development Focus:**
      - Built with **React Native** (inferred) / TypeScript for cross-platform performance.
      - Focus on intuitive UX/UI design to maximize conversion rates.
    `,
    tags: ["React Native", "TypeScript", "Mobile", "UX/UI"],
    links: {
      demo: "#",
      repo: "https://github.com/GoodFood-MAALSI/GoodFoodMobileClient",
    },
    image: "/project-2.jpg",
  },
  {
    slug: "good-food-web-portals",
    title: "GoodFood Web Portals",
    description:
      "Dedicated web interfaces for restaurant partners and platform administrators to manage the GoodFood ecosystem.",
    longDescription: `
      This project encompasses the **WebRestaurateur** and **WebAdmin** applications, providing critical management tools for the platform.

      **Restaurateur Portal:**
      - Menu management (CRUD operations for dishes).
      - Order acceptance and kitchen workflow management.
      - Sales analytics and reporting.

      **Admin Portal:**
      - User and role management.
      - Platform-wide configuration and monitoring.
      - Dispute resolution tools.

      **Tech Stack:**
      - Built with modern web technologies (React/Next.js) for responsive and fast interfaces.
    `,
    tags: ["React", "Next.js", "TypeScript", "Dashboard", "Admin"],
    links: {
      demo: "#",
      repo: "https://github.com/GoodFood-MAALSI/GoodFoodWebRestaurateur",
    },
    image: "/project-3.jpg",
  },
];

export const experiences = [
  {
    company: "GoodFood Project",
    role: "Full Stack Developer & Contributor",
    period: "2024 - Present",
    description: "Collaborated in a team environment to build a scalable food delivery platform. Contributed to microservices architecture and frontend applications.",
  },
  {
    company: "Freelance",
    role: "Full Stack Developer",
    period: "2023 - Present",
    description: "Developing web applications and digital solutions for various clients.",
  },
];
