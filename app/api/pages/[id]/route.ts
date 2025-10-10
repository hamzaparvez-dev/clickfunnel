import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// PATCH /api/pages/[id] - Update a page
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const { name, type, content, status, metaTitle, metaDescription, customCSS, customJS } = body

    const updateData: any = {}
    if (name !== undefined) updateData.name = name
    if (type !== undefined) updateData.type = type
    if (status !== undefined) updateData.status = status
    if (metaTitle !== undefined) updateData.metaTitle = metaTitle
    if (metaDescription !== undefined) updateData.metaDescription = metaDescription
    if (customCSS !== undefined) updateData.customCSS = customCSS
    if (customJS !== undefined) updateData.customJS = customJS

    // If content is provided, persist it as a new PageRevision entry
    let createdRevision = null
    if (content !== undefined) {
      let contentJson: any = content
      try {
        contentJson = typeof content === 'string' ? JSON.parse(content) : content
      } catch (e) {
        // keep as-is if not JSON string
      }

      const latest = await prisma.pageRevision.findFirst({
        where: { pageId: id },
        orderBy: { version: 'desc' },
      })

      const nextVersion = (latest?.version || 0) + 1
      createdRevision = await prisma.pageRevision.create({
        data: {
          pageId: id,
          content: contentJson,
          version: nextVersion,
        },
      })

      // Optionally set as published draft if status sent
      if (status === 'published') {
        updateData.publishedRevisionId = createdRevision.id
      }
    }

    const page = await prisma.page.update({
      where: { id },
      data: updateData,
    })

    return NextResponse.json({ page, revision: createdRevision })
  } catch (error) {
    console.error('Error updating page:', error)
    return NextResponse.json(
      { error: 'Failed to update page' },
      { status: 500 }
    )
  }
}

// DELETE /api/pages/[id] - Delete a page
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    await prisma.page.delete({
      where: { id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting page:', error)
    return NextResponse.json(
      { error: 'Failed to delete page' },
      { status: 500 }
    )
  }
}

// GET /api/pages/[id] - Get a single page
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    const page = await prisma.page.findUnique({
      where: { id },
      include: {
        funnel: true,
        revisions: {
          orderBy: { createdAt: 'desc' },
          take: 10,
        },
      },
    })

    if (!page) {
      return NextResponse.json(
        { error: 'Page not found' },
        { status: 404 }
      )
    }

    // Add content from latest revision to page object
    const pageWithContent = {
      ...page,
      content: page.revisions[0]?.content || null,
    }

    return NextResponse.json({ page: pageWithContent })
  } catch (error) {
    console.error('Error fetching page:', error)
    return NextResponse.json(
      { error: 'Failed to fetch page' },
      { status: 500 }
    )
  }
}

