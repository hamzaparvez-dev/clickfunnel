# 🗄️ Neon Database Setup Guide

## Step 1: Create Neon Account & Database

1. **Go to Neon**: https://neon.tech/
2. **Sign up** with GitHub
3. **Create New Project**:
   - Project name: `clickfunnels-clone`
   - Database name: `clickfunnels`
   - Region: Choose closest to you
4. **Copy the connection string** from the dashboard

## Step 2: Update Environment Variables

Add your Neon connection string to `.env.local`:

```bash
# Replace with your actual Neon connection string
DATABASE_URL="postgresql://username:password@host/database?sslmode=require"
```

## Step 3: Setup Database

Run these commands in order:

```bash
# 1. Generate Prisma client
pnpm run db:generate

# 2. Push schema to database
pnpm run db:push

# 3. Seed with sample data
pnpm run db:seed
```

## Step 4: Verify Connection

1. **Start dev server**: `pnpm dev`
2. **Visit**: http://localhost:3000/funnels
3. **You should see**: Sample funnels loaded from database

## 🎯 What's Included

### Database Schema
- **Users** - Authentication & profiles
- **Funnels** - Sales funnels & campaigns
- **Pages** - Individual funnel pages
- **Leads** - Captured leads
- **Orders** - Purchase transactions
- **Subscriptions** - Billing & plans

### Sample Data
- 2 sample funnels (E-commerce & Lead Gen)
- 5 sample pages with different types
- Ready-to-use content structure

### API Routes
- `GET /api/funnels` - List all funnels
- `POST /api/funnels` - Create new funnel
- `GET /api/funnels/[id]` - Get specific funnel
- `PUT /api/funnels/[id]` - Update funnel
- `DELETE /api/funnels/[id]` - Delete funnel
- `GET /api/funnels/[id]/pages` - Get funnel pages
- `POST /api/funnels/[id]/pages` - Create new page

## 🚀 Next Steps

1. **Connect Firebase Auth** (already done!)
2. **Add Stripe Payments**
3. **Build Page Builder**
4. **Deploy to Vercel**

## 🔧 Troubleshooting

### Database Connection Issues
```bash
# Check if DATABASE_URL is set
echo $DATABASE_URL

# Test connection
npx prisma db push
```

### Schema Issues
```bash
# Reset database
npx prisma db push --force-reset

# Re-seed data
pnpm run db:seed
```

### API Errors
- Check browser console for errors
- Verify `.env.local` has correct DATABASE_URL
- Ensure Prisma client is generated: `pnpm run db:generate`
