import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { usePagination, DOTS } from "@/hooks/use-pagination";
import { cn } from "@/lib/utils";

interface PaginationComponentProps {
  totalCount: number;
  pageSize: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  className?: string;
  siblingCount?: number;
}

const PaginationComponent: React.FC<PaginationComponentProps> = ({
  totalCount,
  pageSize,
  currentPage,
  onPageChange,
  className,
  siblingCount = 1,
}) => {
  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  // Không hiển thị nếu chỉ có 1 trang hoặc không có dữ liệu
  if (!paginationRange || paginationRange.length < 2) {
    return null;
  }

  const lastPage = paginationRange[paginationRange.length - 1] as number;

  const handlePrevious = (e: React.MouseEvent) => {
    e.preventDefault();
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.preventDefault();
    if (currentPage < lastPage) onPageChange(currentPage + 1);
  };

  const handlePageClick = (e: React.MouseEvent, page: number) => {
    e.preventDefault();
    onPageChange(page);
  };

  return (
    <Pagination className={cn("mt-4", className)}>
      <PaginationContent>
        {/* Nút Previous */}
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={handlePrevious}
            className={cn(
              "select-none cursor-pointer hover:bg-emerald-50 hover:text-emerald-600 transition-colors",
              currentPage === 1 && "pointer-events-none opacity-40",
            )}
          />
        </PaginationItem>

        {/* Danh sách trang */}
        {paginationRange.map((pageNumber, index) => {
          if (pageNumber === DOTS) {
            return (
              <PaginationItem key={`dots-${index}`}>
                <PaginationEllipsis className="text-emerald-300" />
              </PaginationItem>
            );
          }

          const page = pageNumber as number;
          const isActive = page === currentPage;

          return (
            <PaginationItem key={page}>
              <PaginationLink
                href="#"
                isActive={isActive}
                onClick={(e) => handlePageClick(e, page)}
                className={cn(
                  "select-none cursor-pointer transition-all duration-200",
                  isActive
                    ? "bg-emerald-500 text-white hover:bg-emerald-600 hover:text-white border-emerald-500"
                    : "text-emerald-700 hover:bg-emerald-50 hover:text-emerald-600 border-transparent hover:border-emerald-100",
                )}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          );
        })}

        {/* Nút Next */}
        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={handleNext}
            className={cn(
              "select-none cursor-pointer hover:bg-emerald-50 hover:text-emerald-600 transition-colors",
              currentPage === lastPage && "pointer-events-none opacity-40",
            )}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationComponent;
