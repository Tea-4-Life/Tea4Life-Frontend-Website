"use client";

import { useCallback, useEffect, useState } from "react";
import { handleError } from "@/lib/utils";
import AuditLogsTableSection from "./components/AuditLogsTableSection";
import { getAllAuditLogsApi } from "@/services/admin/auditLogAdminApi";
import type { AuditLog } from "@/types/audit-log/AuditLog";
import { Filter } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function AdminAuditLogsPage() {
  const [items, setItems] = useState<AuditLog[]>([]);
  const [loading, setLoading] = useState(false);

  const [totalElements, setTotalElements] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Thêm 2 state để quản lý giá trị Filter
  const [filterType, setFilterType] = useState<string>("ALL");
  const [filterAction, setFilterAction] = useState<string>("ALL");

  const fetchLogs = useCallback(
    async (page: number, size: number, type: string, action: string) => {
      setLoading(true);
      try {
        const res = await getAllAuditLogsApi(page - 1, size, type, action);
        const pageData = res.data.data;
        if (pageData) {
          setItems(pageData.content || []);
          setTotalElements(pageData.totalElements || 0);
        }
      } catch (error) {
        handleError(error, "Không thể tải danh sách nhật ký hệ thống.");
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  // Gọi lại API khi Page, Size, hoặc bộ lọc (Type/Action) thay đổi
  useEffect(() => {
    fetchLogs(currentPage, pageSize, filterType, filterAction);
  }, [fetchLogs, currentPage, pageSize, filterType, filterAction]);

  // Xử lý khi đổi Filter (phải reset về trang 1)
  const handleFilterChange = (type: "type" | "action", value: string) => {
    setCurrentPage(1);
    if (type === "type") setFilterType(value);
    if (type === "action") setFilterAction(value);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 px-4">
        <div>
          <h1 className="text-3xl font-black text-slate-800 tracking-tight">
            Nhật ký hệ thống
          </h1>
          <p className="text-slate-500 mt-1.5 font-medium text-sm">
            Theo dõi mọi hoạt động tạo, sửa, xóa trên hệ thống
          </p>
        </div>
      </div>

      {/* Thanh công cụ Filter */}
      <div className="flex flex-wrap items-center gap-4 px-4">
        <div className="flex items-center gap-2 text-sm font-semibold text-slate-600 bg-white px-3 py-2 rounded-xl border border-emerald-100 shadow-sm">
          <Filter className="h-4 w-4 text-emerald-500" />
          <span>Bộ lọc:</span>
        </div>

        {/* Lọc theo Thực thể */}
        <Select
          value={filterType}
          onValueChange={(val) => handleFilterChange("type", val)}
        >
          <SelectTrigger className="w-[180px] h-10 border-emerald-100 rounded-xl bg-white focus:ring-emerald-500 shadow-sm">
            <SelectValue placeholder="Thực thể" />
          </SelectTrigger>
          <SelectContent className="rounded-xl border-emerald-50 shadow-xl">
            <SelectItem value="ALL">Tất cả thực thể</SelectItem>
            <SelectItem value="PRODUCT">Sản phẩm</SelectItem>
            <SelectItem value="CATEGORY">Loại sản phẩm</SelectItem>
            <SelectItem value="PRODUCT_OPTION">Topping</SelectItem>
            <SelectItem value="PRODUCT_OPTION_VALUE">
              Giá trị Topping
            </SelectItem>
          </SelectContent>
        </Select>

        {/* Lọc theo Hành động */}
        <Select
          value={filterAction}
          onValueChange={(val) => handleFilterChange("action", val)}
        >
          <SelectTrigger className="w-[180px] h-10 border-emerald-100 rounded-xl bg-white focus:ring-emerald-500 shadow-sm">
            <SelectValue placeholder="Hành động" />
          </SelectTrigger>
          <SelectContent className="rounded-xl border-emerald-50 shadow-xl">
            <SelectItem value="ALL">Tất cả hành động</SelectItem>
            <SelectItem value="CREATE" className="text-emerald-600 font-medium">
              CREATE
            </SelectItem>
            <SelectItem value="UPDATE" className="text-blue-600 font-medium">
              UPDATE
            </SelectItem>
            <SelectItem value="DELETE" className="text-red-600 font-medium">
              DELETE
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      <AuditLogsTableSection
        loading={loading}
        items={items}
        totalElements={totalElements}
        pageSize={pageSize}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        onSizeChange={(newSize) => {
          setPageSize(newSize);
          setCurrentPage(1);
        }}
      />
    </div>
  );
}
