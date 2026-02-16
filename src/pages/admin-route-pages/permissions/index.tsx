import { useState, useEffect, useCallback } from "react";
import { usePaginationState } from "@/hooks/use-pagination-state";
import { findAllPermissions } from "@/services/permissionApi";
import type { PermissionResponse } from "@/types/permission/PermissionResponse";
import { handleError } from "@/lib/utils";

// Sub-components
import HeaderSection from "./components/HeaderSection";
import SearchSection from "./components/SearchSection";
import TableSection from "./components/TableSection";
import PaginationSection from "./components/PaginationSection";

export default function AdminPermissionsPage() {
  const { pagination, onPageChange, onSizeChange } = usePaginationState();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<PermissionResponse[]>([]);
  const [totalElements, setTotalElements] = useState(0);

  // Search local state
  const [searchQuery, setSearchQuery] = useState("");

  const fetchPermissions = useCallback(async () => {
    setLoading(true);
    try {
      const response = await findAllPermissions(pagination);
      const pageData = response.data.data;
      setData(pageData.content);
      setTotalElements(pageData.totalElements);
    } catch (error) {
      handleError(error, "Không thể tải danh sách quyền.");
    } finally {
      setTimeout(() => setLoading(false), 500);
    }
  }, [pagination]);

  useEffect(() => {
    fetchPermissions();
  }, [fetchPermissions]);

  const handleEdit = (permission: PermissionResponse) => {
    console.log("Edit permission:", permission);
    // Logic modal sửa sẽ ở đây
  };

  const handleDelete = (id: string) => {
    console.log("Delete permission ID:", id);
    // Logic xóa sẽ ở đây
  };

  const handleCreateOpen = () => {
    console.log("Open create modal");
    // Logic modal tạo mới sẽ ở đây
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* 1. Header Section (Tiêu đề và Mô tả) */}
      <HeaderSection />

      {/* 2. Search Section (Ô tìm kiếm và Bộ lọc) */}
      <SearchSection
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {/* 3. Table Section */}
      <TableSection
        loading={loading}
        data={data}
        totalElements={totalElements}
        onCreateOpen={handleCreateOpen}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {/* 3. Pagination Section */}
      <PaginationSection
        page={pagination.page}
        size={pagination.size}
        totalElements={totalElements}
        onPageChange={onPageChange}
        onSizeChange={onSizeChange}
      />
    </div>
  );
}
