import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const funnels = await prisma.funnel.findMany({
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
      orderBy: {
        createdAt: 'desc',
      },
    })

    return NextResponse.json(funnels)
  } catch (error) {
    console.error('Error fetching funnels:', error)
    return NextResponse.json(
      { error: 'Failed to fetch funnels' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, description, type } = body

    const funnel = await prisma.funnel.create({
      data: {
        name,
        description: description || '',
        type: type || 'sales',
        status: 'draft',
        userId: 'temp-user-id', // TODO: Get from auth context
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

    return NextResponse.json(funnel, { status: 201 })
  } catch (error) {
    console.error('Error creating funnel:', error)
    return NextResponse.json(
      { error: 'Failed to create funnel' },
      { status: 500 }
    )
  }
}