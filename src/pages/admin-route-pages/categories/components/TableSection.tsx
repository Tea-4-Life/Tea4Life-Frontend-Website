import type { ProductCategoryResponse } from "@/types/product-category/ProductCategoryResponse";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, Image as ImageIcon, LayoutGrid } from "lucide-react";
import { getMediaUrl } from "@/lib/utils";

interface TableSectionProps {
  loading: boolean;
  data: ProductCategoryResponse[];
  onEdit: (category: ProductCategoryResponse) => void;
  onDelete: (id: string, name: string) => void;
}

export default function TableSection({
  loading,
  data,
  onEdit,
  onDelete,
}: TableSectionProps) {
  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-sm border p-8 flex flex-col items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-emerald-500 border-t-transparent" />
        <p className="mt-4 text-emerald-600 font-medium">Đang tải biểu đồ...</p>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm border p-12 flex flex-col items-center justify-center text-slate-500">
        <LayoutGrid className="h-12 w-12 text-slate-300 mb-4" />
        <p className="text-lg font-medium text-slate-900">
          Không có danh mục nào
        </p>
        <p className="text-sm">Hãy tạo danh mục đầu tiên của bạn.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader className="bg-slate-50/50">
            <TableRow>
              <TableHead className="font-bold w-[100px]">Icon</TableHead>
              <TableHead className="font-bold w-[30%]">Tên danh mục</TableHead>
              <TableHead className="font-bold">Mô tả</TableHead>
              <TableHead className="font-bold text-right w-[120px]">
                Hành động
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((cat) => (
              <TableRow
                key={cat.id}
                className="hover:bg-slate-50/50 transition-colors"
              >
                <TableCell>
                  <div className="h-12 w-12 rounded-lg bg-emerald-50 border border-emerald-100 flex items-center justify-center overflow-hidden shrink-0">
                    {cat.iconUrl ? (
                      <img
                        src={getMediaUrl(cat.iconUrl)}
                        alt={cat.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <ImageIcon className="h-5 w-5 text-emerald-400" />
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="font-semibold text-emerald-900">
                    {cat.name}
                  </div>
                  <div className="text-slate-400 font-mono text-xs mt-0.5">
                    {cat.id.split("-")[0]}...
                  </div>
                </TableCell>
                <TableCell>
                  <p className="text-slate-600 text-sm line-clamp-2">
                    {cat.description || (
                      <span className="text-slate-400 italic">
                        Không có mô tả
                      </span>
                    )}
                  </p>
                </TableCell>
                <TableCell className="text-right space-x-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onEdit(cat)}
                    className="text-blue-600 hover:bg-blue-50"
                    title="Chỉnh sửa"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onDelete(cat.id, cat.name)}
                    className="text-red-600 hover:bg-red-50"
                    title="Xóa"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
