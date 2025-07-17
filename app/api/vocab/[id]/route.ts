import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const session = await auth();
  if (!session || !session.user?.id) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { word, meaning, pronunciation, partOfSpeech, example, topic } = body;

  const updated = await prisma.vocabulary.update({
    where: { id: params.id },
    data: {
      word,
      meaning,
      pronunciation,
      partOfSpeech,
      example,
      topic,
    },
  });

  return NextResponse.json(updated);
}

export async function DELETE(
  _: Request,
  { params }: { params: { id: string } }
) {
  const session = await auth();
  if (!session || !session.user?.id) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  await prisma.vocabulary.delete({
    where: { id: params.id },
  });

  return new NextResponse(null, { status: 200 });
}
