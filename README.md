# 💼 Jules Van Den Eede - Portfolio

A modern, terminal-inspired portfolio website showcasing my work as a Full Stack Developer. Built with Next.js 15, featuring a developer-first design aesthetic with dark/light themes and smooth animations.

## ✨ Features

- **🎨 Terminal-Inspired Design** - Unique UI/UX with code editor and terminal aesthetics
- **🌓 Theme Toggle** - Light, dark, and system theme modes with persistent preferences
- **📱 Fully Responsive** - Mobile-first design that works on all devices
- **⚡ Performance Optimized** - Built with Next.js 15 and Turbopack for blazing-fast performance
- **📧 Working Contact Form** - Integrated email functionality with Nodemailer
- **🔗 GitHub Integration** - Live repository stats (stars, forks) fetched dynamically
- **🎭 Smooth Animations** - Framer Motion animations for engaging user experience
- **♿ Accessible** - Semantic HTML and ARIA labels for screen reader support
- **🎯 SEO Optimized** - Dynamic metadata generation for better search engine visibility
- **📄 Dynamic Project Pages** - Individual pages for each project with detailed descriptions

## 🛠️ Tech Stack

### Frontend
- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Theme:** next-themes

### Backend
- **API Routes:** Next.js API Routes
- **Email:** Nodemailer
- **Validation:** Zod
- **Runtime:** Edge Runtime for GitHub API

### Development
- **Package Manager:** npm
- **Linting:** ESLint
- **Code Quality:** Centralized constants for maintainability

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/LuaScale/portfolio.git
cd portfolio
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure environment variables**
```bash
# Copy the example env file
cp .env.local.example .env.local

# Edit .env.local and add your SMTP credentials
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
EMAIL_FROM=your-email@gmail.com
EMAIL_TO=your-email@gmail.com

# Optional: Add GitHub token for higher API rate limits
GITHUB_TOKEN=your_github_token
```

4. **Run the development server**
```bash
npm run dev
```

5. **Open your browser**
Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
portfolio/
├── app/                          # Next.js app directory
│   ├── api/                      # API routes
│   │   ├── contact/             # Contact form endpoint
│   │   └── github/              # GitHub stats endpoint
│   ├── projects/[slug]/         # Dynamic project pages
│   ├── layout.tsx               # Root layout with theme provider
│   ├── page.tsx                 # Homepage
│   ├── not-found.tsx            # Custom 404 page
│   └── globals.css              # Global styles and theme variables
├── components/
│   ├── layout/                  # Layout components
│   │   ├── header.tsx          # Navigation header
│   │   └── footer.tsx          # VS Code-style footer
│   ├── sections/                # Homepage sections
│   │   ├── hero.tsx            # Hero section with terminal intro
│   │   ├── about.tsx           # About section with tech stack
│   │   ├── projects.tsx        # Featured projects showcase
│   │   ├── experience.tsx      # Work experience timeline
│   │   └── contact.tsx         # Contact form
│   ├── ui/                      # Reusable UI components
│   │   ├── button.tsx
│   │   ├── container.tsx
│   │   ├── text-reveal.tsx
│   │   └── theme-toggle.tsx
│   └── providers/               # Context providers
│       └── theme-provider.tsx
├── lib/
│   ├── constants.ts             # Centralized text content
│   ├── data.ts                  # Projects and experience data
│   └── utils.ts                 # Utility functions
└── public/                       # Static assets
```

## 🎨 Key Features Explained

### Terminal-Style Design
The portfolio features a unique terminal/code editor aesthetic with:
- Syntax-highlighted code blocks
- Terminal command prompts
- VS Code-inspired status bar
- Line numbers and file tabs

### Centralized Content Management
All text content is extracted into `lib/constants.ts` for:
- Easy content updates
- Consistent messaging
- Future i18n support
- Better maintainability

### Dynamic GitHub Stats
Project cards fetch live data from GitHub API:
- Repository stars
- Fork count
- Topics/tags
- Cached with edge runtime for performance

### Contact Form
Fully functional contact form with:
- Client-side validation
- Server-side validation with Zod
- Email delivery via Nodemailer
- Success/error feedback
- Loading states

## 🌐 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Deploy!

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/LuaScale/portfolio)

### Other Platforms
The project can be deployed on any platform supporting Next.js:
- Netlify
- AWS Amplify
- Railway
- DigitalOcean App Platform

## 📝 Customization

### Update Personal Information
Edit `lib/constants.ts`:
```typescript
export const SITE = {
  title: "Your Name | Portfolio",
  description: "Your description",
  author: "Your Name",
  email: "your-email@example.com",
  location: "Your Location",
  github: "https://github.com/yourusername",
  linkedin: "https://linkedin.com/in/yourprofile",
}
```

### Add Projects
Edit `lib/data.ts` to add your projects:
```typescript
export const projects = [
  {
    slug: "project-slug",
    title: "Project Title",
    description: "Short description",
    longDescription: "Detailed description with markdown",
    tags: ["React", "Node.js"],
    links: {
      demo: "https://demo.com",
      repo: "https://github.com/user/repo",
    },
    image: "/project-image.jpg",
  },
  // Add more projects...
]
```

### Modify Theme Colors
Edit `app/globals.css` to customize theme colors:
```css
@theme {
  --color-primary: #00ff88;
  --color-accent: #ff6b6b;
  /* Customize other colors... */
}
```

## 📧 Contact Form Setup

The contact form requires SMTP configuration:

1. **Gmail** (recommended for testing):
   - Enable 2-factor authentication
   - Generate an app password
   - Use in `.env.local`

2. **Other SMTP providers**:
   - SendGrid
   - Mailgun
   - Amazon SES
   - Postmark

See [SETUP.md](SETUP.md) for detailed email configuration guide.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/LuaScale/portfolio/issues).

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

**Jules Van Den Eede**
- GitHub: [@LuaScale](https://github.com/LuaScale)
- LinkedIn: [jules-vandeneede](https://linkedin.com/in/jules-vandeneede)
- Email: julesvandeneedepro@gmail.com

## 🙏 Acknowledgments

- Design inspiration from VS Code and terminal interfaces
- Built with [Next.js](https://nextjs.org/)
- Icons by [Lucide](https://lucide.dev/)
- Animations by [Framer Motion](https://www.framer.com/motion/)

---

⭐ If you found this project helpful, please give it a star!
