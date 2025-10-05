import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    
    const pages = await prisma.page.findMany({
      where: { funnelId: id },
      orderBy: { order: 'asc' },
    })

    return NextResponse.json(pages)
  } catch (error) {
    console.error('Error fetching pages:', error)
    return NextResponse.json(
      { error: 'Failed to fetch pages' },
      { status: 500 }
    )
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const { name, type, content } = body

    // Get the highest order number for this funnel
    const lastPage = await prisma.page.findFirst({
      where: { funnelId: id },
      orderBy: { order: 'desc' },
    })

    const order = lastPage ? lastPage.order + 1 : 1

    const page = await prisma.page.create({
      data: {
        name,
        type: type || 'landing',
        content: content || {},
        order,
        funnelId: id,
        status: 'draft',
      },
    })

    return NextResponse.json(page, { status: 201 })
  } catch (error) {
    console.error('Error creating page:', error)
    return NextResponse.json(
      { error: 'Failed to create page' },
      { status: 500 }
    )
  }
}