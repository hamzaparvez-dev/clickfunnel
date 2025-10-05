import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Create sample funnels
  const funnel1 = await prisma.funnel.create({
    data: {
      name: 'E-commerce Sales Funnel',
      description: 'Complete sales funnel for online products',
      type: 'sales',
      status: 'active',
      userId: 'temp-user-id',
    },
  })

  const funnel2 = await prisma.funnel.create({
    data: {
      name: 'Lead Generation Funnel',
      description: 'Capture leads and nurture prospects',
      type: 'lead',
      status: 'draft',
      userId: 'temp-user-id',
    },
  })

  // Create sample pages for funnel1
  await prisma.page.createMany({
    data: [
      {
        name: 'Landing Page',
        type: 'landing',
        content: {
          title: 'Welcome to Our Product',
          subtitle: 'The best solution for your needs',
          cta: 'Get Started Now',
        },
        order: 1,
        funnelId: funnel1.id,
        status: 'published',
      },
      {
        name: 'Sales Page',
        type: 'sales',
        content: {
          title: 'Why Choose Our Product?',
          subtitle: 'See what makes us different',
          cta: 'Buy Now',
        },
        order: 2,
        funnelId: funnel1.id,
        status: 'published',
      },
      {
        name: 'Checkout Page',
        type: 'checkout',
        content: {
          title: 'Complete Your Purchase',
          subtitle: 'Secure checkout process',
          cta: 'Pay Now',
        },
        order: 3,
        funnelId: funnel1.id,
        status: 'published',
      },
    ],
  })

  // Create sample pages for funnel2
  await prisma.page.createMany({
    data: [
      {
        name: 'Lead Capture Page',
        type: 'landing',
        content: {
          title: 'Get Your Free Guide',
          subtitle: 'Download our comprehensive guide',
          cta: 'Download Now',
        },
        order: 1,
        funnelId: funnel2.id,
        status: 'draft',
      },
      {
        name: 'Thank You Page',
        type: 'thankyou',
        content: {
          title: 'Thank You!',
          subtitle: 'Check your email for the download link',
          cta: 'Continue',
        },
        order: 2,
        funnelId: funnel2.id,
        status: 'draft',
      },
    ],
  })

  console.log('✅ Database seeded successfully!')
  console.log(`📊 Created ${await prisma.funnel.count()} funnels`)
  console.log(`📄 Created ${await prisma.page.count()} pages`)
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
