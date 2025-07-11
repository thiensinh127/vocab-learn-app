import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
  const session = await auth()
  if (!session || !session.user?.id) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
  }

  const data = await prisma.vocabulary.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: 'desc' }
  })

  return NextResponse.json(data)
}

export async function POST(req: Request) {
  const session = await auth()
  if (!session || !session.user?.id) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
  }

  const body = await req.json()
  const { word, meaning, pronunciation, partOfSpeech, example, topic } = body

  const newVocab = await prisma.vocabulary.create({
    data: {
      word,
      meaning,
      pronunciation,
      partOfSpeech,
      example,
      topic,
      userId: session.user.id
    }
  })

  return NextResponse.json(newVocab, { status: 201 })
}
