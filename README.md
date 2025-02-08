# Greenlit 🌱

Greenlit is a modern web application designed to help businesses analyze their Environmental, Social, and Governance (ESG) performance and plan Corporate Social Responsibility (CSR) initiatives effectively.

## Overview

Greenlit provides an intuitive platform for companies to:

- Assess their current ESG performance through dynamic questionnaires
- Track sustainability metrics in real-time
- Plan and monitor CSR initiatives
- Generate comprehensive ESG reports
- Benchmark against industry standards

## Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org) (App Router)
- **Authentication**: [NextAuth.js](https://next-auth.js.org)
- **Database**: Prisma with PostgreSQL
- **Styling**:
  - [Tailwind CSS](https://tailwindcss.com)
  - [Framer Motion](https://www.framer.com/motion/) for animations
- **UI Components**:
  - [shadcn/ui](https://ui.shadcn.com)
  - [Sonner](https://sonner.emilkowal.ski) for toast notifications
- **Data Visualization**:
  - [Recharts](https://recharts.org)
  - [D3.js](https://d3js.org)

## Key Features

### Authentication

- Secure email/password authentication with NextAuth.js
- Protected routes and session management
- Glassmorphic UI design for sign-in/register pages

### Dashboard

- Interactive questionnaire system
- Real-time progress tracking
- Dynamic sector analysis
- Performance insights

### Questionnaire System

- Multi-step questionnaire interface
- Progress persistence
- Real-time validation
- Sector-specific analysis

## Getting Started

1. Clone the repository
2. Install dependencies:

```bash
pnpm install
```

3. Set up environment variables:

```bash
cp .env.example .env.local
```

4. Run the development server:

```bash
pnpm dev
# or
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
app/
├── api/              # API routes
├── auth/             # Authentication pages
│   ├── signin/
│   └── register/
├── components/       # Reusable components
│   ├── ui/          # shadcn/ui components
│   └── Icons.tsx    # Icon components
├── data/            # Mock data and constants
└── layout.tsx       # Root layout
```

## Environment Variables

```env
DATABASE_URL="postgresql://..."
NEXTAUTH_SECRET="your-secret"
NEXTAUTH_URL="http://localhost:3000"
```

## Deployment

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Contributing

We welcome contributions! Please feel free to submit a Pull Request.

## License

MIT License - see LICENSE.md for details
