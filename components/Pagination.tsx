import { Button } from "@/components/ui/button";

export default function Pagination({
  total,
  pageSize,
  currentPage,
  onPageChange,
}: {
  total: number;
  pageSize: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}) {
  // const totalPages = Math.ceil(total / pageSize);

  return (
    <div className="flex items-center justify-between px-4 py-2 border-t bg-white w-full">
      <div>
        <span className="text-sm text-muted-foreground">
          Showing {(currentPage - 1) * pageSize + 1} -{" "}
          {Math.min(currentPage * pageSize, total)} of {total}
        </span>
      </div>

      <div className="flex items-center space-x-2">
        <Button
          className="cursor-pointer"
          variant="outline"
          size="icon"
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
        >
          &lt;
        </Button>

        {[...Array(Math.ceil(total / pageSize)).keys()].map((i) => (
          <Button
            key={i}
            variant={currentPage === i + 1 ? "default" : "outline"}
            size="icon"
            onClick={() => onPageChange(i + 1)}
          >
            {i + 1}
          </Button>
        ))}

        <Button
          className="cursor-pointer"
          variant="outline"
          size="icon"
          disabled={currentPage === Math.ceil(total / pageSize)}
          onClick={() => onPageChange(currentPage + 1)}
        >
          &gt;
        </Button>
      </div>
    </div>
  );
}
