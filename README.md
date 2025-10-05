# ClickFunnels Clone

A modern, production-ready ClickFunnels clone built with Next.js 15, TypeScript, Firebase Auth, Neon PostgreSQL, and Stripe.

## 🚀 Features

- **Authentication**: Firebase Auth with Google OAuth
- **Database**: Neon PostgreSQL with Prisma ORM
- **Payments**: Stripe integration for subscriptions
- **Funnel Builder**: Drag-and-drop page builder
- **Analytics**: Real-time conversion tracking
- **Templates**: Pre-built funnel templates
- **Responsive**: Mobile-first design

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 18, TypeScript
- **Styling**: Tailwind CSS, Framer Motion
- **Database**: Neon PostgreSQL, Prisma ORM
- **Auth**: Firebase Authentication
- **Payments**: Stripe
- **Deployment**: Vercel

## 📦 Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/hamzaparvez-dev/clickfunnel.git
   cd clickfunnel
   ```

2. **Install dependencies**:
   ```bash
   pnpm install
   ```

3. **Setup environment variables**:
   ```bash
   cp .env.local.example .env.local
   ```
   
   Update `.env.local` with your credentials:
   ```env
   # Firebase Configuration
   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

   # Neon PostgreSQL Database
   DATABASE_URL="postgresql://username:password@host/database?sslmode=require"

   # Stripe Configuration
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_key
   STRIPE_SECRET_KEY=sk_test_your_key
   STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
   ```

4. **Setup database**:
   ```bash
   pnpm run db:generate
   pnpm run db:push
   pnpm run db:seed
   ```

5. **Start development server**:
   ```bash
   pnpm dev
   ```

## 🗄️ Database Setup

### Neon PostgreSQL Setup

1. Create account at [Neon](https://neon.tech/)
2. Create new project: `clickfunnels-clone`
3. Copy connection string to `DATABASE_URL`
4. Run database setup commands

See [DATABASE_SETUP.md](./DATABASE_SETUP.md) for detailed instructions.

## 🚀 Deployment

### Vercel Deployment

1. **Connect GitHub repository** to Vercel
2. **Add environment variables** in Vercel dashboard
3. **Deploy automatically** on push to main branch

### Environment Variables for Production

Add these to your Vercel project settings:
- All Firebase variables
- `DATABASE_URL` (Neon connection string)
- All Stripe variables

## 📁 Project Structure

```
├── app/                    # Next.js App Router
│   ├── (auth)/            # Authentication pages
│   ├── api/               # API routes
│   ├── dashboard/         # Dashboard pages
│   └── ...
├── components/            # React components
│   ├── auth/             # Authentication components
│   ├── dashboard/        # Dashboard components
│   └── ...
├── lib/                  # Utility libraries
│   ├── context/         # React contexts
│   ├── firebase/        # Firebase config
│   └── prisma.ts        # Database client
├── prisma/               # Database schema & seeds
└── scripts/             # Setup scripts
```

## 🎯 Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint
- `pnpm db:generate` - Generate Prisma client
- `pnpm db:push` - Push schema to database
- `pnpm db:seed` - Seed database with sample data

## 🔧 Development

### Adding New Features

1. **Database changes**: Update `prisma/schema.prisma`
2. **API routes**: Add to `app/api/`
3. **Components**: Add to `components/`
4. **Pages**: Add to `app/`

### Code Style

- **TypeScript** for type safety
- **ESLint** for code quality
- **Prettier** for formatting
- **Tailwind CSS** for styling

## 📊 Database Schema

- **Users**: Authentication & profiles
- **Funnels**: Sales funnels & campaigns
- **Pages**: Individual funnel pages
- **Leads**: Captured leads
- **Orders**: Purchase transactions
- **Subscriptions**: Billing & plans

## 🤝 Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [ClickFunnels](https://www.clickfunnels.com/) for inspiration
- [Next.js](https://nextjs.org/) for the amazing framework
- [Vercel](https://vercel.com/) for deployment platform
- [Neon](https://neon.tech/) for PostgreSQL hosting
- [Firebase](https://firebase.google.com/) for authentication
- [Stripe](https://stripe.com/) for payments