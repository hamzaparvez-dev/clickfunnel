import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { generateUniquePageSlug } from '@/lib/utils/slug'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    
    const pages = await prisma.page.findMany({
      where: { funnelId: id },
      orderBy: { order: 'asc' },
      include: {
        revisions: {
          orderBy: { createdAt: 'desc' },
          take: 1, // Get latest revision for preview
        },
      },
    })

    // Transform pages to include content from latest revision
    const pagesWithContent = pages.map(page => ({
      ...page,
      content: page.revisions[0]?.content || null,
    }))

    return NextResponse.json(pagesWithContent)
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
    
    // Debug: Log request details
    console.log('📄 Creating page for funnel:', id)
    console.log('📄 Request headers:', Object.fromEntries(request.headers.entries()))
    
    let body
    try {
      body = await request.json()
      console.log('📄 Request body:', body)
    } catch (jsonError) {
      console.error('❌ JSON parse error:', jsonError)
      return NextResponse.json(
        { error: 'Invalid JSON in request body' },
        { status: 400 }
      )
    }
    
    const { name, type, slug, path } = body

    // Validate name
    if (!name || typeof name !== 'string' || !name.trim()) {
      return NextResponse.json(
        { error: 'Name is required and must be a non-empty string' },
        { status: 400 }
      )
    }

    // Verify funnel exists
    const funnel = await prisma.funnel.findUnique({
      where: { id },
      select: { id: true },
    })

    if (!funnel) {
      return NextResponse.json(
        { error: 'Funnel not found' },
        { status: 404 }
      )
    }

    // Get the highest order number for this funnel
    const lastPage = await prisma.page.findFirst({
      where: { funnelId: id },
      orderBy: { order: 'desc' },
    })

    const order = lastPage ? lastPage.order + 1 : 1
    
    // Generate unique, sanitized slug
    let pageSlug: string
    try {
      pageSlug = await generateUniquePageSlug(id, name, slug)
    } catch (slugError: any) {
      return NextResponse.json(
        { error: slugError.message || 'Unable to generate a valid slug' },
        { status: 400 }
      )
    }
    
    // Generate path from the unique slug if not provided
    const pagePath = path || `/${pageSlug}`

    const page = await prisma.page.create({
      data: {
        name: name.trim(),
        slug: pageSlug,
        path: pagePath,
        type: type || 'landing',
        order,
        funnelId: id,
        status: 'draft',
      },
    })

    console.log('✅ Page created successfully:', page.id, 'with slug:', page.slug)

    return NextResponse.json(page, { status: 201 })
  } catch (error) {
    console.error('Error creating page:', error)
    return NextResponse.json(
      { error: 'Failed to create page' },
      { status: 500 }
    )
  }
}
