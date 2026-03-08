import React from "react";
import { Eye, Loader2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import EmptyState from "@/components/custom/EmptyState";
import type { WorkflowInstanceResponse } from "@/types/workflow/response/WorkflowInstanceResponse";

interface TableSectionProps {
  loading: boolean;
  data: WorkflowInstanceResponse[];
  totalElements: number;
  onRefresh: () => void;
  refreshing: boolean;
  onViewDetail: (instanceKey: string) => void;
}

const statusConfig: Record<string, { label: string; color: string }> = {
  ACTIVE: { label: "Đang chạy", color: "border-blue-500 text-blue-600" },
  COMPLETED: {
    label: "Hoàn thành",
    color: "border-emerald-500 text-emerald-600",
  },
  CANCELLED: { label: "Đã hủy", color: "border-red-500 text-red-600" },
  INCIDENT: { label: "Lỗi", color: "border-orange-500 text-orange-600" },
};

function getStatusBadge(status: string) {
  const config = statusConfig[status] || {
    label: status,
    color: "border-slate-500 text-slate-600",
  };
  return (
    <Badge variant="outline" className={cn("font-medium", config.color)}>
      {config.label}
    </Badge>
  );
}

function formatDate(dateStr: string | null | undefined) {
  if (!dateStr) return "—";
  try {
    return new Intl.DateTimeFormat("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(dateStr));
  } catch {
    return dateStr;
  }
}

const TableSection: React.FC<TableSectionProps> = ({
  loading,
  data,
  totalElements,
  onRefresh,
  refreshing,
  onViewDetail,
}) => {
  return (
    <div className="space-y-6">
      {/* Table Header Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-4">
        <div className="flex flex-col">
          <h2 className="text-2xl font-black text-slate-800 tracking-tight">
            Danh sách luồng xử lý {totalElements > 0 && `(${totalElements})`}
          </h2>
          <p className="text-sm text-slate-500 font-medium">
            Theo dõi trạng thái và chi tiết các workflow instances
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          className="gap-2 border-emerald-200 hover:bg-emerald-50 hover:text-emerald-600"
          onClick={onRefresh}
          disabled={refreshing}
        >
          {refreshing ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <svg
              className="h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
              <path d="M3 3v5h5" />
              <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
              <path d="M16 21h5v-5" />
            </svg>
          )}
          Làm mới
        </Button>
      </div>

      {/* Main Table */}
      <div className="overflow-hidden border border-emerald-200 rounded-[2rem] bg-white shadow-sm min-h-[500px] flex flex-col">
        {loading ? (
          <div className="flex-1 flex flex-col items-center justify-center bg-white">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-emerald-500 border-t-transparent" />
            <p className="text-slate-500 mt-4 font-bold italic tracking-wide">
              Đang chuẩn bị dữ liệu...
            </p>
          </div>
        ) : data.length === 0 ? (
          <div className="flex-1 flex items-center justify-center">
            <EmptyState
              title="Chưa có dữ liệu"
              description="Hiện tại chưa có luồng xử lý nào trong hệ thống."
              className="border-none shadow-none bg-white"
            />
          </div>
        ) : (
          <div className="flex-1">
            <Table>
              <TableHeader className="bg-emerald-50/50 transition-colors">
                <TableRow className="hover:bg-transparent border-emerald-200">
                  <TableHead className="font-black text-slate-700 pl-8 border-r border-emerald-200 uppercase text-[11px] tracking-wider text-left">
                    Instance Key
                  </TableHead>
                  <TableHead className="font-black text-slate-700 border-r border-emerald-200 uppercase text-[11px] tracking-wider text-left pl-6">
                    Process ID
                  </TableHead>
                  <TableHead className="font-black text-slate-700 border-r border-emerald-200 uppercase text-[11px] tracking-wider text-left pl-6">
                    Business Key
                  </TableHead>
                  <TableHead className="font-black text-slate-700 border-r border-emerald-200 uppercase text-[11px] tracking-wider text-left pl-6">
                    Trạng thái
                  </TableHead>
                  <TableHead className="font-black text-slate-700 border-r border-emerald-200 uppercase text-[11px] tracking-wider text-left pl-6">
                    Tạo lúc
                  </TableHead>
                  <TableHead className="font-black text-slate-700 border-r border-emerald-200 uppercase text-[11px] tracking-wider text-left pl-6">
                    Cập nhật
                  </TableHead>
                  <TableHead className="pr-8 font-black text-slate-700 uppercase text-[11px] tracking-wider text-center">
                    Thao tác
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.map((inst) => (
                  <TableRow
                    key={inst.instanceKey}
                    className="group hover:bg-emerald-50/40 border-emerald-200 transition-colors h-16"
                  >
                    <TableCell className="font-mono text-xs font-bold text-slate-700 pl-8 border-r border-emerald-100/50">
                      {inst.instanceKey}
                    </TableCell>
                    <TableCell className="font-mono text-xs text-slate-600 border-r border-emerald-100/50 pl-6">
                      {inst.processId}
                    </TableCell>
                    <TableCell className="text-sm text-slate-600 border-r border-emerald-100/50 pl-6">
                      {inst.businessKey || "—"}
                    </TableCell>
                    <TableCell className="border-r border-emerald-100/50 pl-6">
                      {getStatusBadge(inst.status)}
                    </TableCell>
                    <TableCell className="text-sm text-slate-500 border-r border-emerald-100/50 pl-6">
                      {formatDate(inst.createdAt)}
                    </TableCell>
                    <TableCell className="text-sm text-slate-500 border-r border-emerald-100/50 pl-6">
                      {formatDate(inst.updatedAt)}
                    </TableCell>
                    <TableCell className="pr-8 text-center bg-slate-50/30">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-9 w-9 rounded-2xl text-emerald-600 hover:bg-emerald-100 hover:text-emerald-700 transition-all active:scale-95 group/btn"
                        onClick={() => onViewDetail(inst.instanceKey)}
                        title="Chi tiết"
                      >
                        <Eye className="h-4 w-4 group-hover/btn:scale-110 transition-transform" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
                {/* Empty Spacer Rows */}
                {Array.from({ length: Math.max(0, 5 - data.length) }).map(
                  (_, index) => (
                    <TableRow
                      key={`empty-${index}`}
                      className="h-16 border-emerald-100/30 hover:bg-transparent"
                    >
                      <TableCell className="border-r border-emerald-100/20" />
                      <TableCell className="border-r border-emerald-100/20" />
                      <TableCell className="border-r border-emerald-100/20" />
                      <TableCell className="border-r border-emerald-100/20" />
                      <TableCell className="border-r border-emerald-100/20" />
                      <TableCell className="border-r border-emerald-100/20" />
                      <TableCell className="bg-slate-50/10" />
                    </TableRow>
                  ),
                )}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    </div>
  );
};

export default TableSection;
