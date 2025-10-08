const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
  console.log('🔍 Testing database connection...\n')
  
  // Test connection
  try {
    await prisma.$connect()
    console.log('✅ Database connected successfully!\n')
    
    // Count records in each table
    const productCount = await prisma.product.count()
    const collectionCount = await prisma.collection.count()
    const customerCount = await prisma.customer.count()
    const funnelCount = await prisma.funnel.count()
    const orderCount = await prisma.order.count()
    
    console.log('📊 Database Statistics:')
    console.log('  - Products:', productCount)
    console.log('  - Collections:', collectionCount)
    console.log('  - Customers:', customerCount)
    console.log('  - Funnels:', funnelCount)
    console.log('  - Orders:', orderCount)
    
    console.log('\n✅ All tables created successfully!')
    console.log('🚀 Your dashboard is ready to use!')
    
  } catch (error) {
    console.error('❌ Database error:', error.message)
  } finally {
    await prisma.$disconnect()
  }
}

main()


