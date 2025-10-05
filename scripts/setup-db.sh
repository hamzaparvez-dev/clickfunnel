#!/bin/bash

echo "🚀 Setting up Neon Database for ClickFunnels Clone..."

# Check if DATABASE_URL is set
if [ -z "$DATABASE_URL" ]; then
    echo "❌ Error: DATABASE_URL not found in .env.local"
    echo "Please add your Neon connection string to .env.local:"
    echo "DATABASE_URL=\"postgresql://username:password@host/database?sslmode=require\""
    exit 1
fi

echo "✅ DATABASE_URL found"

# Generate Prisma client
echo "📦 Generating Prisma client..."
npx prisma generate

# Push schema to database
echo "🗄️ Pushing schema to Neon database..."
npx prisma db push

# Seed database with sample data
echo "🌱 Seeding database with sample data..."
npx prisma db seed

echo "✅ Database setup complete!"
echo "🎉 Your ClickFunnels clone is now connected to Neon PostgreSQL!"
