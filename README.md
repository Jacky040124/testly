# Test Management System

## Overview
This project is a comprehensive test management system built with modern web technologies. It provides a platform for creating, managing, and analyzing test questions with a robust architecture focusing on scalability and user experience.

## Architecture

### Technology Stack
- **Frontend**: Next.js with React
- **Backend**: Node.js hosted on Vercel
- **Database**: 
  - PostgreSQL Server
  - Neon SQL Database
- **External Services**:
  - Lucia API for Authentication
  - Stripe API for Payment Processing
  - Resend API for Email Services

### System Architecture Diagram
![Architecture Diagram](./ArchitectureDiagram.png)
*System architecture showing the interaction between frontend, API routes, databases, and external services*

### Class Structure
![UML Class Diagram](./ClassUML.png)
*UML class diagram showing the system's core components and their relationships*

### Key Components
- **Frontend Layer**: Built with Next.js, providing a responsive and interactive user interface
- **API Layer**: RESTful API endpoints hosted on Vercel, handling business logic and data operations
- **Data Layer**: Dual database system with PostgreSQL and Neon SQL for robust data management
- **Authentication**: Secure user authentication handled by Lucia API
- **Payment Processing**: Integrated Stripe API for handling transactions
- **Email Services**: Automated email functionality using Resend API

## Core Features
Based on the UML design, the system includes:
- User Management System
- Question Set Management
- Test Creation and Management
- Progress Tracking
- Interactive UI Components
- Environment Configuration
- User Context Management

## Project Structure
```
├── src/
│   ├── components/    # React components
│   ├── pages/        # Next.js pages
│   └── contexts/     # React contexts
├── Classes/          # Core business logic classes
├── Tests/           # Test suites
├── public/          # Static assets
└── config/          # Configuration files
```

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- PostgreSQL
- npm or yarn

### Installation
1. Clone the repository
```bash
git clone [repository-url]
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Set up environment variables
```bash
cp .env.example .env.local
```
Configure the following variables:
- Database credentials
- API keys for Lucia, Stripe, and Resend
- Other environment-specific configurations

4. Run the development server
```bash
npm run dev
# or
yarn dev
```

## Testing
Run the test suite:
```bash
npm test
# or
yarn test
```

## Deployment
The application is configured for deployment on Vercel. Follow these steps:
1. Connect your repository to Vercel
2. Configure environment variables
3. Deploy

## Contributing
1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License
[Your License Here]

## Contact
[Your Contact Information]
