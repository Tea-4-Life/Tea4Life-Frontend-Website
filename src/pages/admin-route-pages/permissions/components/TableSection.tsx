import React from "react";
import { Plus, Edit2, Trash2, MoreVertical } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import EmptyState from "@/components/custom/EmptyState";
import type { PermissionResponse } from "@/types/permission/PermissionResponse";

interface TableSectionProps {
  loading: boolean;
  data: PermissionResponse[];
  totalElements: number;
  onCreateOpen: () => void;
  onEdit: (permission: PermissionResponse) => void;
  onDelete: (id: string) => void;
}

const TableSection: React.FC<TableSectionProps> = ({
  loading,
  data,
  totalElements,
  onCreateOpen,
  onEdit,
  onDelete,
}) => {
  return (
    <Card className="border-none shadow-sm rounded-3xl overflow-hidden bg-white">
      <div className="p-6 border-b border-emerald-50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Badge
            variant="secondary"
            className="bg-emerald-50 text-emerald-700 border-emerald-100 px-3 py-1 rounded-lg"
          >
            Tổng số: {totalElements}
          </Badge>
        </div>

        <Button
          onClick={onCreateOpen}
          className="bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl shadow-lg shadow-emerald-100 gap-2 px-6"
        >
          <Plus className="h-4 w-4" />
          Tạo quyền mới
        </Button>
      </div>

      <CardContent className="p-0">
        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-emerald-500 border-t-transparent" />
            <p className="text-slate-500 mt-4 font-medium italic">
              Đang tải dữ liệu...
            </p>
          </div>
        ) : (
          <Table className="border border-emerald-50">
            <TableHeader className="bg-slate-50/50">
              <TableRow className="hover:bg-transparent border-emerald-50">
                <TableHead className="w-[120px] font-bold text-slate-700 pl-6 border-r border-emerald-50">
                  ID
                </TableHead>
                <TableHead className="font-bold text-slate-700 border-r border-emerald-50">
                  Tên quyền
                </TableHead>
                <TableHead className="font-bold text-slate-700 border-r border-emerald-50">
                  Nhóm quyền
                </TableHead>
                <TableHead className="font-bold text-slate-700 border-r border-emerald-50">
                  Mô tả
                </TableHead>
                <TableHead className="text-right pr-6 font-bold text-slate-700">
                  Thao tác
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="h-auto p-0">
                    <div className="p-8">
                      <EmptyState
                        title="Chưa có quyền hạn nào"
                        description="Hệ thống chưa tìm thấy dữ liệu quyền hạn nào phù hợp."
                        actionLabel="Tạo quyền đầu tiên"
                        onAction={onCreateOpen}
                        className="border-none shadow-none bg-transparent"
                      />
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                data.map((item) => (
                  <TableRow
                    key={item.id}
                    className="group hover:bg-emerald-50/30 border-emerald-50 transition-colors"
                  >
                    <TableCell className="font-mono text-xs text-slate-500 pl-6 border-r border-emerald-50">
                      #{item.id}
                    </TableCell>
                    <TableCell className="font-semibold text-slate-700 border-r border-emerald-50">
                      {item.name}
                    </TableCell>
                    <TableCell className="border-r border-emerald-50">
                      <Badge className="bg-emerald-50 text-emerald-600 border-none px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider">
                        {item.permissionGroup}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-slate-500 max-w-[300px] truncate border-r border-emerald-50">
                      {item.description || "Không có mô tả"}
                    </TableCell>
                    <TableCell className="text-right pr-6">
                      <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 rounded-lg text-emerald-600 hover:bg-emerald-100"
                          onClick={() => onEdit(item)}
                        >
                          <Edit2 className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 rounded-lg text-red-500 hover:bg-red-50"
                          onClick={() => onDelete(item.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="group-hover:hidden">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-slate-400"
                            >
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent
                            align="end"
                            className="rounded-xl border-emerald-50 shadow-lg shadow-emerald-100/20"
                          >
                            <DropdownMenuItem
                              className="gap-2 text-emerald-600 focus:text-emerald-700 focus:bg-emerald-50 cursor-pointer"
                              onClick={() => onEdit(item)}
                            >
                              <Edit2 className="h-4 w-4" /> Sửa
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="gap-2 text-red-600 focus:text-red-700 focus:bg-red-50 cursor-pointer"
                              onClick={() => onDelete(item.id)}
                            >
                              <Trash2 className="h-4 w-4" /> Xóa
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
};

export default TableSection;
