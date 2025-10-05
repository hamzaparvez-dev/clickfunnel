# ClickFunnels Clone - GitHub Deployment Guide

## 🚀 Deploy to GitHub

### Step 1: Initialize Git Repository

```bash
# Initialize git repository
git init

# Add all files
git add .

# Initial commit
git commit -m "Initial commit: ClickFunnels clone with Next.js 15, Firebase Auth, Neon DB"

# Add remote origin
git remote add origin https://github.com/hamzaparvez-dev/clickfunnel.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### Step 2: Setup GitHub Repository

1. **Go to**: https://github.com/hamzaparvez-dev/clickfunnel
2. **Make sure repository is public** (for free Vercel deployment)
3. **Add repository description**: "Modern ClickFunnels clone built with Next.js 15, Firebase Auth, Neon PostgreSQL, and Stripe"

### Step 3: Deploy to Vercel

1. **Go to**: https://vercel.com/
2. **Sign up/Login** with GitHub
3. **Import project** from GitHub
4. **Configure environment variables** in Vercel dashboard

### Step 4: Environment Variables in Vercel

Add these environment variables in Vercel project settings:

```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# Neon PostgreSQL Database
DATABASE_URL=postgresql://username:password@host/database?sslmode=require

# Stripe Configuration
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_key
STRIPE_SECRET_KEY=sk_test_your_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
```

## 🔧 Pre-Deployment Checklist

### ✅ Code Cleanup (Completed)
- [x] Removed old React/Vite source files
- [x] Removed PHP backend files
- [x] Removed unused documentation files
- [x] Updated README.md with proper structure
- [x] Created environment template

### ✅ Project Structure
- [x] Next.js 15 App Router structure
- [x] TypeScript configuration
- [x] Tailwind CSS setup
- [x] Prisma database schema
- [x] Firebase authentication
- [x] API routes for CRUD operations

### ✅ Dependencies
- [x] All required packages installed
- [x] Development scripts configured
- [x] Build scripts optimized

## 🎯 Post-Deployment Steps

1. **Test the deployed app**:
   - Visit your Vercel URL
   - Test authentication (login/signup)
   - Test funnel creation
   - Test database operations

2. **Setup production database**:
   - Create production Neon database
   - Update Vercel environment variables
   - Run database migrations

3. **Configure Firebase**:
   - Add production domain to Firebase Auth
   - Update Firebase project settings

4. **Setup Stripe**:
   - Configure webhook endpoints
   - Test payment processing

## 📊 Project Status

### ✅ Completed Features
- Authentication system (Firebase)
- Database integration (Neon + Prisma)
- Funnel management (CRUD)
- Dashboard with analytics
- Responsive UI design
- API routes for all operations

### 🚧 Next Features to Add
- Page builder with drag-and-drop
- Stripe payment integration
- Email automation
- A/B testing
- Template marketplace

## 🔗 Useful Links

- **GitHub Repository**: https://github.com/hamzaparvez-dev/clickfunnel
- **Vercel Dashboard**: https://vercel.com/dashboard
- **Neon Console**: https://neon.tech/
- **Firebase Console**: https://console.firebase.google.com/
- **Stripe Dashboard**: https://dashboard.stripe.com/
