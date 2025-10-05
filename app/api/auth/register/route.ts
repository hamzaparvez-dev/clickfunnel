import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { email, password, name } = await request.json()

    // TODO: Implement user registration with Firebase Admin SDK
    // For now, return mock response
    return NextResponse.json({
      success: true,
      user: { id: 'user_123', email, name }
    })
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )
  }
}

