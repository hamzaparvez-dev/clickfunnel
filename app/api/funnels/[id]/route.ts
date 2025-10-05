import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    
    const funnel = await prisma.funnel.findUnique({
      where: { id },
      include: {
        pages: {
          orderBy: { order: 'asc' },
        },
        _count: {
          select: {
            pages: true,
            leads: true,
            orders: true,
          },
        },
      },
    })

    if (!funnel) {
      return NextResponse.json(
        { error: 'Funnel not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(funnel)
  } catch (error) {
    console.error('Error fetching funnel:', error)
    return NextResponse.json(
      { error: 'Failed to fetch funnel' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const { name, description, status } = body

    const funnel = await prisma.funnel.update({
      where: { id },
      data: {
        ...(name && { name }),
        ...(description !== undefined && { description }),
        ...(status && { status }),
      },
      include: {
        pages: true,
        _count: {
          select: {
            pages: true,
            leads: true,
            orders: true,
          },
        },
      },
    })

    return NextResponse.json(funnel)
  } catch (error) {
    console.error('Error updating funnel:', error)
    return NextResponse.json(
      { error: 'Failed to update funnel' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    await prisma.funnel.delete({
      where: { id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting funnel:', error)
    return NextResponse.json(
      { error: 'Failed to delete funnel' },
      { status: 500 }
    )
  }
}