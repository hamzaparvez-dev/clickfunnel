import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/collections - Get all collections
export async function GET() {
  try {
    const collections = await prisma.collection.findMany({
      include: {
        products: {
          include: {
            product: true
          }
        }
      },
      orderBy: { sortOrder: 'asc' }
    })

    return NextResponse.json({ collections })
  } catch (error) {
    console.error('Error fetching collections:', error)
    return NextResponse.json(
      { error: 'Failed to fetch collections' },
      { status: 500 }
    )
  }
}

// POST /api/collections - Create a new collection
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, description, slug, image, status } = body

    const collection = await prisma.collection.create({
      data: {
        name,
        description,
        slug: slug || name.toLowerCase().replace(/\s+/g, '-'),
        image,
        status: status || 'active'
      }
    })

    return NextResponse.json({ collection }, { status: 201 })
  } catch (error) {
    console.error('Error creating collection:', error)
    return NextResponse.json(
      { error: 'Failed to create collection' },
      { status: 500 }
    )
  }
}

