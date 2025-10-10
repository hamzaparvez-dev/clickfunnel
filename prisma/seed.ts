import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Create or find a sample team (idempotent)
  const team = await prisma.team.upsert({
    where: { slug: 'default-team' },
    update: {},
    create: {
      name: 'Default Team',
      slug: 'default-team',
    },
  })

  // Create sample funnels
  const funnel1 = await prisma.funnel.upsert({
    where: { slug: 'ecommerce-sales-funnel' },
    update: {},
    create: {
      name: 'E-commerce Sales Funnel',
      description: 'Complete sales funnel for online products',
      status: 'active',
      slug: 'ecommerce-sales-funnel',
      teamId: team.id,
    },
  })

  const funnel2 = await prisma.funnel.upsert({
    where: { slug: 'lead-generation-funnel' },
    update: {},
    create: {
      name: 'Lead Generation Funnel',
      description: 'Capture leads and nurture prospects',
      status: 'draft',
      slug: 'lead-generation-funnel',
      teamId: team.id,
    },
  })

  // Create sample pages for funnel1
  await prisma.page.createMany({
    data: [
      {
        name: 'Landing Page',
        slug: 'landing-page',
        path: '/landing',
        type: 'landing',
        funnelId: funnel1.id,
        status: 'published',
      },
      {
        name: 'Sales Page',
        slug: 'sales-page',
        path: '/sales',
        type: 'sales',
        funnelId: funnel1.id,
        status: 'published',
      },
      {
        name: 'Checkout Page',
        slug: 'checkout-page',
        path: '/checkout',
        type: 'checkout',
        funnelId: funnel1.id,
        status: 'published',
      },
    ],
    skipDuplicates: true,
  })

  // Create sample pages for funnel2
  await prisma.page.createMany({
    data: [
      {
        name: 'Lead Capture Page',
        slug: 'lead-capture-page',
        path: '/lead-capture',
        type: 'landing',
        funnelId: funnel2.id,
        status: 'draft',
      },
      {
        name: 'Thank You Page',
        slug: 'thank-you-page',
        path: '/thank-you',
        type: 'thankyou',
        funnelId: funnel2.id,
        status: 'draft',
      },
    ],
    skipDuplicates: true,
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
