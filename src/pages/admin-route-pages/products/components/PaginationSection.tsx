import React from "react";
import { Button } from "@/components/ui/button";

interface PaginationSectionProps {
  page: number;
  totalPages: number;
  setPage: (arg: number | ((prev: number) => number)) => void;
}

const PaginationSection: React.FC<PaginationSectionProps> = ({
  page,
  totalPages,
  setPage,
}) => {
  return (
    <div className="flex items-center justify-between px-4 py-3 bg-white border border-emerald-100/50 rounded-2xl shadow-sm">
      <div className="text-sm text-slate-500 font-medium">
        Trang <span className="font-bold text-slate-700">{page}</span> /{" "}
        <span className="font-bold text-slate-700">
          {Math.max(1, totalPages)}
        </span>
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          className="rounded-xl border-emerald-100 hover:bg-emerald-50 hover:text-emerald-600 transition-colors h-9 px-4"
          disabled={page <= 1}
          onClick={() => setPage((prev) => prev - 1)}
        >
          Trang trước
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="rounded-xl border-emerald-100 hover:bg-emerald-50 hover:text-emerald-600 transition-colors h-9 px-4"
          disabled={page >= totalPages}
          onClick={() => setPage((prev) => prev + 1)}
        >
          Trang tiếp
        </Button>
      </div>
    </div>
  );
};

export default PaginationSection;
