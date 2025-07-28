"use client";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Vocabulary } from "@/types/vocabulary";
import { Edit, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import Pagination from "./Pagination";
import VocabFormDialog from "./VocabFormDialog";

export default function VocabTable({
  data,
  total,
  pageSize,
  currentPage,
}: {
  data: Vocabulary[];
  total: number;
  pageSize: number;
  currentPage: number;
}) {
  const router = useRouter();
  const [editVocab, setEditVocab] = useState<Vocabulary | null>(null);

  const handleDelete = async (id: string) => {
    const res = await fetch(`/api/vocab/${id}`, { method: "DELETE" });
    if (res.status === 200) {
      toast.success("Delete vocabulary successfully");
      router.push(`?page=${1}`);
      router.refresh();
    }
  };

  return (
    <>
      <div className="border rounded-md overflow-hidden">
        <Table className="min-w-full table-fixed text-sm">
          <TableHeader className="bg-muted text-muted-foreground">
            <TableRow>
              <TableHead className="px-4 py-2">Word</TableHead>
              <TableHead className="px-4 py-2">Meaning</TableHead>
              <TableHead className="px-4 py-2">Example</TableHead>
              <TableHead className="px-4 py-2">Status</TableHead>
              <TableHead className="w-[100px] px-4 py-2 text-right pr-9">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>
        </Table>

        {/* Scrollable body */}
        <div className="max-h-[360px] min-h-[360px] overflow-y-auto">
          <Table className="min-w-full table-fixed text-sm">
            {data.length > 0 ? (
              <TableBody>
                {data.map((vocab) => (
                  <TableRow key={vocab.id}>
                    <TableCell className="px-4 py-2">{vocab.word}</TableCell>
                    <TableCell className="px-4 py-2">{vocab.meaning}</TableCell>
                    <TableCell className="px-4 py-2">{vocab.example}</TableCell>
                    <TableCell className="px-4 py-2">
                      {vocab.known ? "✅" : "❌"}
                    </TableCell>
                    <TableCell className=" px-4 py-2 space-x-2 ">
                      <Button
                        className="cursor-pointer"
                        size="sm"
                        onClick={() => setEditVocab(vocab)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        className="cursor-pointer"
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDelete(vocab.id)}
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            ) : (
              <tbody>
                <tr>
                  <td colSpan={5}>
                    <div className="h-[300px] flex flex-col items-center justify-center text-center text-muted-foreground gap-2">
                      <p className="text-sm">No data</p>
                    </div>
                  </td>
                </tr>
              </tbody>
            )}
          </Table>
        </div>
        <div className="flex justify-between items-center mt-4 text-sm">
          <Pagination
            total={total}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={(page) => router.push(`?page=${page}`)}
          />
        </div>
      </div>

      {/* Edit Dialog */}
      <VocabFormDialog
        open={!!editVocab}
        onClose={() => setEditVocab(null)}
        defaultValues={editVocab}
        onSuccess={() => {
          setEditVocab(null);
          // router.refresh();
        }}
      />
    </>
  );
}
