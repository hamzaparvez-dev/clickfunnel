import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/products/[id] - Get a single product
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const product = await prisma.product.findUnique({
      where: { id },
      include: {
        collections: {
          include: {
            collection: true
          }
        },
        inventoryLogs: {
          orderBy: { createdAt: 'desc' },
          take: 10
        }
      }
    })

    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ product })
  } catch (error) {
    console.error('Error fetching product:', error)
    return NextResponse.json(
      { error: 'Failed to fetch product' },
      { status: 500 }
    )
  }
}

// PATCH /api/products/[id] - Update a product
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
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
      status,
      collections
    } = body

    const updateData: any = {}
    if (name !== undefined) updateData.name = name
    if (description !== undefined) updateData.description = description
    if (type !== undefined) updateData.type = type
    if (price !== undefined) updateData.price = parseFloat(price)
    if (compareAtPrice !== undefined) updateData.compareAtPrice = compareAtPrice ? parseFloat(compareAtPrice) : null
    if (images !== undefined) updateData.images = images
    if (sku !== undefined) updateData.sku = sku
    if (inventory !== undefined) updateData.inventory = inventory ? parseInt(inventory) : null
    if (trackInventory !== undefined) updateData.trackInventory = trackInventory
    if (allowBackorder !== undefined) updateData.allowBackorder = allowBackorder
    if (weight !== undefined) updateData.weight = weight ? parseFloat(weight) : null
    if (dimensions !== undefined) updateData.dimensions = dimensions
    if (tags !== undefined) updateData.tags = tags
    if (status !== undefined) updateData.status = status

    const product = await prisma.product.update({
      where: { id },
      data: updateData,
      include: {
        collections: {
          include: {
            collection: true
          }
        }
      }
    })

    // Update collections if provided
    if (collections !== undefined) {
      // Remove existing collections
      await prisma.productCollection.deleteMany({
        where: { productId: id }
      })

      // Add new collections
      if (collections.length > 0) {
        await prisma.productCollection.createMany({
          data: collections.map((collectionId: string, index: number) => ({
            productId: id,
            collectionId,
            sortOrder: index
          }))
        })
      }
    }

    return NextResponse.json({ product })
  } catch (error) {
    console.error('Error updating product:', error)
    return NextResponse.json(
      { error: 'Failed to update product' },
      { status: 500 }
    )
  }
}

// DELETE /api/products/[id] - Delete a product
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    await prisma.product.delete({
      where: { id }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting product:', error)
    return NextResponse.json(
      { error: 'Failed to delete product' },
      { status: 500 }
    )
  }
}

