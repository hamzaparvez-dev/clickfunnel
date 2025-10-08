import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/products - Get all products
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type')
    const status = searchParams.get('status')

    const where: any = {}
    if (type) where.type = type
    if (status) where.status = status

    const products = await prisma.product.findMany({
      where,
      include: {
        collections: {
          include: {
            collection: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json({ products })
  } catch (error) {
    console.error('Error fetching products:', error)
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    )
  }
}

// POST /api/products - Create a new product
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      name,
      description,
      type,
      price,
      compareAtPrice,
      images,
      sku,
      inventory,
      trackInventory,
      allowBackorder,
      weight,
      dimensions,
      tags,
      collections
    } = body

    const product = await prisma.product.create({
      data: {
        name,
        description,
        type: type || 'digital',
        price: parseFloat(price),
        compareAtPrice: compareAtPrice ? parseFloat(compareAtPrice) : null,
        images: images || [],
        sku,
        inventory: inventory ? parseInt(inventory) : null,
        trackInventory: trackInventory || false,
        allowBackorder: allowBackorder || false,
        weight: weight ? parseFloat(weight) : null,
        dimensions: dimensions || null,
        tags: tags || [],
        status: 'active'
      },
      include: {
        collections: {
          include: {
            collection: true
          }
        }
      }
    })

    // Add to collections if provided
    if (collections && collections.length > 0) {
      await prisma.productCollection.createMany({
        data: collections.map((collectionId: string, index: number) => ({
          productId: product.id,
          collectionId,
          sortOrder: index
        }))
      })
    }

    return NextResponse.json({ product }, { status: 201 })
  } catch (error) {
    console.error('Error creating product:', error)
    return NextResponse.json(
      { error: 'Failed to create product' },
      { status: 500 }
    )
  }
}

