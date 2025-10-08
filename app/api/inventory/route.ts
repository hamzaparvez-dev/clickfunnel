import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/inventory - Get all inventory logs
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const productId = searchParams.get('productId')

    const where: any = {}
    if (productId) where.productId = productId

    const logs = await prisma.inventoryLog.findMany({
      where,
      include: {
        product: true
      },
      orderBy: { createdAt: 'desc' },
      take: 100
    })

    return NextResponse.json({ logs })
  } catch (error) {
    console.error('Error fetching inventory logs:', error)
    return NextResponse.json(
      { error: 'Failed to fetch inventory logs' },
      { status: 500 }
    )
  }
}

// POST /api/inventory - Create inventory adjustment
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { productId, quantity, type, note } = body

    // Create inventory log
    const log = await prisma.inventoryLog.create({
      data: {
        productId,
        quantity: parseInt(quantity),
        type: type || 'adjustment',
        note
      },
      include: {
        product: true
      }
    })

    // Update product inventory
    await prisma.product.update({
      where: { id: productId },
      data: {
        inventory: {
          increment: parseInt(quantity)
        }
      }
    })

    return NextResponse.json({ log }, { status: 201 })
  } catch (error) {
    console.error('Error creating inventory log:', error)
    return NextResponse.json(
      { error: 'Failed to create inventory log' },
      { status: 500 }
    )
  }
}

