import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/app/lib/prisma'
import { auth } from '@/app/admin/auth'

export async function POST(req: NextRequest) {
  const session = await auth()

  if (!session || session.user?.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await req.json()
    const event = await prisma.event.create({
      data: {
        title: body.title,
        description: body.description,
        imageUrl: body.imageUrl,
        link: body.link,
        isActive: true,
      },
    })
    return NextResponse.json(event)
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Failed to create event' }, { status: 500 })
  }
}