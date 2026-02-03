# CLB French Trainer 🇫🇷

A discipline-focused French language training application designed to help users prepare for Canadian Language Benchmarks (CLB) certification exams. Built with Next.js, MongoDB, and modern web technologies.

![CLB French Trainer](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-green?style=flat-square&logo=mongodb)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-blue?style=flat-square&logo=tailwindcss)

## 📋 Table of Contents

- [Features](#-features)
- [Learning Pathways](#-learning-pathways)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [API Documentation](#-api-documentation)
- [Project Structure](#-project-structure)
- [Subscription Tiers](#-subscription-tiers)
- [Contributing](#-contributing)
- [License](#-license)

## ✨ Features

### Core Features
- **Structured Learning Pathways**: CLB 5 (4 months) and CLB 7 (8-12 months) training programs
- **Daily Learning Activities**: Listening, Reading, Writing, and Speaking exercises
- **Progress Tracking**: Track your daily progress, streaks, and completion rates
- **Practice Tests**: Full practice tests for all four language skills
- **AI Writing Evaluation**: Get instant feedback on your writing using AI

### Daily Resources
- **336-Day Curriculum**: Comprehensive content from A1 to B2 CEFR levels
- **Curated Content**: Verified links to quality French learning resources
- **Progressive Difficulty**: Content adapts as you advance through the program

### Account Management
- **Multiple Exam Types**: Support for CLB 5, CLB 7, TEF Canada, and TCF Canada
- **Notification Settings**: Customizable reminders and progress updates
- **Dark Mode**: Full dark/light theme support

### Subscription Features
- **Freemium Model**: Free tier with basic access
- **Premium Features**: Unlimited tests, AI evaluations, and full analytics
- **Stripe Integration**: Secure payment processing

## 📚 Learning Pathways

| Pathway | Duration | Target Level | Daily Commitment |
|---------|----------|--------------|------------------|
| CLB 5 | 4 months (112 days) | A1 → B1 | 3-4 hours |
| CLB 7 | 8-12 months (336 days) | A1 → B2 | 3-4 hours |

### CEFR Level Progression (CLB 7)
- **Days 1-56**: A1 (Beginner)
- **Days 57-140**: A2 (Elementary)
- **Days 141-252**: B1 (Intermediate)
- **Days 253-336**: B2 (Upper Intermediate)

## 🛠 Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Database**: [MongoDB](https://www.mongodb.com/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) + [shadcn/ui](https://ui.shadcn.com/)
- **Authentication**: JWT with bcrypt password hashing
- **Payments**: [Stripe](https://stripe.com/)
- **AI**: OpenAI GPT for writing evaluation
- **TTS**: Google Cloud Text-to-Speech

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- MongoDB instance
- Yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/clb-french-trainer.git
   cd clb-french-trainer
   ```

2. **Install dependencies**
   ```bash
   yarn install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Run the development server**
   ```bash
   yarn dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔐 Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Database
MONGO_URL=mongodb://localhost:27017/clb-french-trainer

# Application
NEXT_PUBLIC_BASE_URL=http://localhost:3000
JWT_SECRET=your-jwt-secret-key

# Google OAuth (Optional)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Stripe (Optional - for payments)
STRIPE_SECRET_KEY=your-stripe-secret-key
STRIPE_WEBHOOK_SECRET=your-stripe-webhook-secret
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your-stripe-publishable-key

# OpenAI (Optional - for AI writing evaluation)
OPENAI_API_KEY=your-openai-api-key

# Google Cloud TTS (Optional)
GOOGLE_TTS_API_KEY=your-google-tts-api-key
```

## 📡 API Documentation

### Authentication

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/auth/register` | POST | Register new user |
| `/api/auth/login` | POST | Login user |
| `/api/auth/me` | GET | Get current user |

### Onboarding & Progress

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/onboarding` | POST | Complete onboarding |
| `/api/pathway/reset` | POST | Reset pathway progress |
| `/api/progress` | GET | Get user progress stats |

### Daily Learning

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/daily-log/today` | GET | Get today's log |
| `/api/daily-log` | PUT | Update daily log |
| `/api/daily-log/complete` | POST | Mark day complete |

### Account Settings

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/account/settings` | GET | Get account settings |
| `/api/account/settings` | PUT | Update settings |
| `/api/account/change-exam-type` | POST | Change exam type |

### Tests & Evaluation

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/tests/results` | POST | Save test result |
| `/api/tests/results` | GET | Get test history |
| `/api/writing/evaluate` | POST | AI writing evaluation |

### Subscription

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/stripe/create-checkout` | POST | Create checkout session |
| `/api/stripe/webhook` | POST | Stripe webhook handler |

## 📁 Project Structure

```
/app
├── app/                      # Next.js App Router
│   ├── api/[[...path]]/     # API routes
│   ├── dashboard/           # Dashboard pages
│   │   ├── account/         # Account settings
│   │   ├── grammar/         # Grammar exercises
│   │   └── page.js          # Main dashboard
│   ├── tests/               # Practice tests
│   ├── privacy/             # Privacy policy
│   ├── terms/               # Terms of service
│   └── page.js              # Landing page
├── components/
│   └── ui/                  # shadcn/ui components
├── lib/
│   ├── daily-resources.js   # Daily learning content
│   └── utils.js             # Utility functions
├── public/                  # Static assets
└── .env                     # Environment variables
```

## 💳 Subscription Tiers

### Free Tier
- 3 practice tests per month
- 6 AI writing evaluations per month
- Last 3 tests history
- Access to daily learning content
- Basic progress tracking

### Premium Tier ($9/month or $70/year)
- Unlimited practice tests
- Unlimited AI writing evaluations
- Full test history
- Advanced analytics
- Performance trends
- Weak areas analysis
- Ad-free experience
- Priority support

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Guidelines

- Follow the existing code style
- Write meaningful commit messages
- Update documentation as needed
- Test your changes thoroughly

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Practice Makes Perfect: Complete French Grammar](https://www.mhprofessional.com/) - Referenced grammar content
- [TV5Monde](https://apprendre.tv5monde.com/) - French learning exercises
- [Lingua.com](https://lingua.com/french/) - Reading comprehension texts
- [RFI](https://savoirs.rfi.fr/) - Easy French news content

---

<p align="center">
  Made with ❤️ for French learners preparing for CLB certification
</p>
