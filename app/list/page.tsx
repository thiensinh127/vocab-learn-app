import VocabFormDialogTrigger from "@/components/VocabFormDialogTrigger";
import VocabTable from "@/components/VocabTable";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function Page({
  searchParams,
}: {
  searchParams?: { page?: string };
}) {
  const param = await searchParams;
  const page = parseInt(param?.page || "1");
  const pageSize = 10;

  const session = await auth();
  if (!session || !session.user?.id) {
    return <div>Unauthorized</div>; // hoặc redirect
  }

  const [items, total] = await Promise.all([
    prisma.vocabulary.findMany({
      where: { userId: session.user.id },
      skip: (page - 1) * pageSize,
      take: pageSize,
      orderBy: { createdAt: "desc" },
    }),
    prisma.vocabulary.count({
      where: { userId: session.user.id },
    }),
  ]);

  return (
    <div className="p-6">
      <div className="flex justify-between mb-4">
        <h2 className="text-xl font-semibold">Vocabulary List</h2>
        <VocabFormDialogTrigger />
      </div>

      <VocabTable
        data={items}
        total={total}
        pageSize={pageSize}
        currentPage={page}
      />
    </div>
  );
}
