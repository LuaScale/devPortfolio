type LocalizedContent = {
  en: string;
  fr: string;
};

type Project = {
  slug: string;
  title: LocalizedContent;
  description: LocalizedContent;
  longDescription: LocalizedContent;
  tags: string[];
  links: {
    demo: string;
    repo: string;
  };
  image: string;
};

export const projects: Project[] = [
  {
    slug: "symfony-api",
    title: {
      en: "Symfony REST API",
      fr: "API REST Symfony",
    },
    description: {
      en: "A robust REST API built with Symfony framework, featuring authentication, CRUD operations, and modern PHP best practices.",
      fr: "Une API REST robuste construite avec le framework Symfony, incluant l'authentification, les opérations CRUD et les meilleures pratiques PHP modernes.",
    },
    longDescription: {
      en: `
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
      fr: `
      **L'API REST Symfony** est une application backend prête pour la production, démontrant le développement PHP moderne avec le framework Symfony.

      **Fonctionnalités clés :**
      - **Architecture RESTful :** Conception d'API propre suivant les principes REST et les normes HTTP.
      - **Authentification & Autorisation :** Points de terminaison sécurisés avec jetons JWT et contrôle d'accès basé sur les rôles.
      - **Gestion de base de données :** Intégration Doctrine ORM avec migrations et fixtures.
      - **Documentation API :** Documentation Swagger/OpenAPI pour une intégration facile.

      **Points techniques :**
      - **Framework :** Symfony 6+ avec les fonctionnalités modernes de PHP 8+.
      - **Tests :** Tests PHPUnit garantissant la fiabilité du code.
      - **Meilleures pratiques :** Principes SOLID, injection de dépendances et architecture propre.
      - **Performance :** Requêtes optimisées et stratégies de mise en cache.
    `,
    },
    tags: ["PHP", "Symfony", "REST API", "Doctrine", "MySQL", "JWT"],
    links: {
      demo: "#",
      repo: "https://github.com/LuaScale/symfony-api",
    },
    image: "/project-1.jpg",
  },
  {
    slug: "good-food-mobile",
    title: {
      en: "GoodFood Mobile App",
      fr: "Application Mobile GoodFood",
    },
    description: {
      en: "The customer-facing mobile application for the GoodFood platform, allowing users to discover restaurants and track deliveries.",
      fr: "L'application mobile destinée aux clients de la plateforme GoodFood, permettant aux utilisateurs de découvrir des restaurants et de suivre les livraisons.",
    },
    longDescription: {
      en: `
      The **GoodFood Mobile Client** is the primary touchpoint for customers. It provides a seamless interface for food ordering and delivery tracking.

      **Features:**
      - **Restaurant Discovery:** Browse restaurants by category or location.
      - **Real-time Tracking:** Track order status and delivery driver location.
      - **Secure Payments:** Integrated payment processing for smooth checkout.
      
      **Development Focus:**
      - Built with **React Native** (inferred) / TypeScript for cross-platform performance.
      - Focus on intuitive UX/UI design to maximize conversion rates.
    `,
      fr: `
      Le **Client Mobile GoodFood** est le point de contact principal pour les clients. Il fournit une interface fluide pour la commande de nourriture et le suivi de livraison.

      **Fonctionnalités :**
      - **Découverte de restaurants :** Parcourez les restaurants par catégorie ou emplacement.
      - **Suivi en temps réel :** Suivez l'état de la commande et l'emplacement du livreur.
      - **Paiements sécurisés :** Traitement des paiements intégré pour un paiement fluide.
      
      **Axes de développement :**
      - Construit avec **React Native** / TypeScript pour des performances multiplateformes.
      - Accent sur la conception UX/UI intuitive pour maximiser les taux de conversion.
    `,
    },
    tags: ["React Native", "TypeScript", "Mobile", "UX/UI"],
    links: {
      demo: "#",
      repo: "https://github.com/GoodFood-MAALSI/GoodFoodMobileClient",
    },
    image: "/project-2.jpg",
  },
  {
    slug: "good-food-web-portals",
    title: {
      en: "GoodFood Web Portals",
      fr: "Portails Web GoodFood",
    },
    description: {
      en: "Dedicated web interfaces for restaurant partners and platform administrators to manage the GoodFood ecosystem.",
      fr: "Interfaces web dédiées pour les partenaires restaurateurs et les administrateurs de la plateforme pour gérer l'écosystème GoodFood.",
    },
    longDescription: {
      en: `
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
      fr: `
      Ce projet englobe les applications **WebRestaurateur** et **WebAdmin**, fournissant des outils de gestion critiques pour la plateforme.

      **Portail Restaurateur :**
      - Gestion du menu (opérations CRUD pour les plats).
      - Acceptation des commandes et gestion du flux de travail en cuisine.
      - Analyses des ventes et rapports.

      **Portail Admin :**
      - Gestion des utilisateurs et des rôles.
      - Configuration et surveillance à l'échelle de la plateforme.
      - Outils de résolution des litiges.

      **Stack technique :**
      - Construit avec des technologies web modernes (React/Next.js) pour des interfaces réactives et rapides.
    `,
    },
    tags: ["React", "Next.js", "TypeScript", "Dashboard", "Admin"],
    links: {
      demo: "#",
      repo: "https://github.com/GoodFood-MAALSI/GoodFoodWebRestaurateur",
    },
    image: "/project-3.jpg",
  },
];

type Experience = {
  company: string;
  role: LocalizedContent;
  period: string;
  description: LocalizedContent;
};

export const experiences: Experience[] = [
  {
    company: "GoodFood Project",
    role: {
      en: "Full Stack Developer & Contributor",
      fr: "Développeur Full Stack & Contributeur",
    },
    period: "2024 - Present",
    description: {
      en: "Collaborated in a team environment to build a scalable food delivery platform. Contributed to microservices architecture and frontend applications.",
      fr: "Collaboration en équipe pour construire une plateforme de livraison de nourriture évolutive. Contribution à l'architecture microservices et aux applications frontend.",
    },
  },
  {
    company: "Freelance",
    role: {
      en: "Full Stack Developer",
      fr: "Développeur Full Stack",
    },
    period: "2023 - Present",
    description: {
      en: "Developing web applications and digital solutions for various clients.",
      fr: "Développement d'applications web et de solutions numériques pour divers clients.",
    },
  },
];

// Helper function to get localized content
export function getLocalizedData<T extends Record<string, any>>(
  data: T,
  locale: string
): any {
  const result: any = {};
  for (const key in data) {
    const value = data[key];
    if (
      typeof value === "object" &&
      value !== null &&
      "en" in value &&
      "fr" in value
    ) {
      result[key] = (value as any)[locale] || value.en;
    } else {
      result[key] = value;
    }
  }
  return result;
}
