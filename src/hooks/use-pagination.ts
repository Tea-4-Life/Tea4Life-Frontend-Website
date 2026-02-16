import { useMemo } from "react";

export const DOTS = "...";

interface UsePaginationProps {
  totalCount: number;
  pageSize: number;
  siblingCount?: number;
  currentPage: number;
}

/**
 * Hook logic để tính toán dãy số trang hiển thị (bao gồm cả dấu ba chấm).
 */
export const usePagination = ({
  totalCount,
  pageSize,
  siblingCount = 1,
  currentPage,
}: UsePaginationProps) => {
  const paginationRange = useMemo(() => {
    const totalPageCount = Math.ceil(totalCount / pageSize);

    // Số lượng item hiển thị: siblingCount + firstPage + lastPage + currentPage + 2*DOTS
    const totalPageNumbers = siblingCount + 5;

    // Case 1: Tổng số trang ít hơn số item muốn hiển thị
    if (totalPageNumbers >= totalPageCount) {
      return Array.from({ length: totalPageCount }, (_, idx) => idx + 1);
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(
      currentPage + siblingCount,
      totalPageCount,
    );

    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2;

    const firstPageIndex = 1;
    const lastPageIndex = totalPageCount;

    // Case 2: Chỉ hiện dots bên phải
    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftItemCount = 3 + 2 * siblingCount;
      const leftRange = Array.from(
        { length: leftItemCount },
        (_, idx) => idx + 1,
      );
      return [...leftRange, DOTS, totalPageCount];
    }

    // Case 3: Chỉ hiện dots bên trái
    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightItemCount = 3 + 2 * siblingCount;
      const rightRange = Array.from(
        { length: rightItemCount },
        (_, idx) => totalPageCount - rightItemCount + idx + 1,
      );
      return [firstPageIndex, DOTS, ...rightRange];
    }

    // Case 4: Hiện dots cả 2 bên
    if (shouldShowLeftDots && shouldShowRightDots) {
      const middleRange = Array.from(
        { length: rightSiblingIndex - leftSiblingIndex + 1 },
        (_, idx) => leftSiblingIndex + idx,
      );
      return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
    }
  }, [totalCount, pageSize, siblingCount, currentPage]);

  return paginationRange;
};
