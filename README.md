# Testly - Interactive Learning Platform

## Overview
Testly is an interactive learning platform built with modern web technologies, featuring a Duolingo-inspired interface for engaging test preparation. The platform focuses on providing an intuitive user experience with real-time feedback and AI-powered assistance.

## Architecture

### Technology Stack
- **Frontend**: Next.js 15.1 with React 18
- **Backend**: Next.js API Routes
- **Database**: Neon SQL Database
- **External Services**:
  - Google OAuth for Authentication
  - OpenAI API for AI Assistant
  - Resend API for Email Services

### Key Components
- **Frontend Layer**: Responsive UI with Tailwind CSS and Radix UI components
- **Authentication**: Secure authentication using NextAuth.js with Google provider
- **AI Integration**: GPT-powered chatbot for interactive learning assistance
- **Progress Tracking**: Real-time progress monitoring and feedback system
- **Email Services**: Automated feedback collection using Resend API

## Core Features
- Interactive Question Interface
- Real-time Progress Tracking
- AI-powered Learning Assistant
- User Authentication
- Progress Grid Visualization
- Rating & Feedback System
- Lives System
- Sound Effects

## Project Structure
```
├── src/
│   ├── app/          # Next.js app router pages
│   ├── components/   # React components
│   ├── contexts/     # Global state management
│   ├── hooks/        # Custom React hooks
│   ├── lib/          # Utility functions
│   └── types/        # TypeScript definitions
├── public/           # Static assets
└── config/           # Configuration files
```

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation
1. Clone the repository
```bash
git clone [repository-url]
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
Create a `.env.local` file with:
```
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
OPENAI_API_KEY=
RESEND_API_KEY=
```

4. Run the development server
```bash
npm run dev
```

## Development

### Key Technologies
- **Styling**: Tailwind CSS with custom variables
- **Components**: Mix of custom components and shadcn/ui
- **State Management**: React Context API
- **Form Handling**: React Hook Form
- **Testing**: Vitest with React Testing Library

### Scripts
- `npm run dev` - Start development server with Turbopack
- `npm run build` - Create production build
- `npm run test` - Run test suite with coverage
- `npm run lint` - Run ESLint checks

## Contributing
1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License
MIT License

## Contact
For support or inquiries, please open an issue in the repository.
