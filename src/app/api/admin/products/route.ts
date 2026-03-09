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
    const product = await prisma.product.create({
      data: {
        name: body.name,
        description: body.description,
        price: body.price,
        category: body.category,
        stock: body.stock,
        imageUrl: body.imageUrl || null,
      },
    })
    return NextResponse.json({ success: true, product })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Failed to save product' }, { status: 500 })
  }
}