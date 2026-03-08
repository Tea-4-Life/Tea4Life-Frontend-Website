import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Edit, Trash2, Image as ImageIcon } from "lucide-react";
import type { ProductResponse } from "@/types/product/ProductResponse";
import { getMediaUrl } from "@/lib/utils";

function formatPrice(v: number) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(v);
}

interface ProductsTableSectionProps {
  loading: boolean;
  filtered: ProductResponse[];
  keyword: string;
  setKeyword: (kw: string) => void;
  page: number;
  totalPages: number;
  setPage: (arg: number | ((prev: number) => number)) => void;
  openEdit: (item: ProductResponse) => void;
  openDelete: (item: ProductResponse) => void;
}

export default function ProductsTableSection({
  loading,
  filtered,
  keyword,
  setKeyword,
  page,
  totalPages,
  setPage,
  openEdit,
  openDelete,
}: ProductsTableSectionProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
      <div className="relative max-w-md mb-5">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
        <Input
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="Tìm theo tên sản phẩm / danh mục..."
          className="pl-9 bg-slate-50 border-slate-200 focus-visible:ring-emerald-500 rounded-lg"
        />
      </div>

      <div className="rounded-lg border border-slate-200 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-slate-50 border-b border-slate-200">
              <TableHead className="font-semibold text-slate-600">ID</TableHead>
              <TableHead className="font-semibold text-slate-600 w-[60px]">
                Ảnh
              </TableHead>
              <TableHead className="font-semibold text-slate-600">
                Tên sản phẩm
              </TableHead>
              <TableHead className="font-semibold text-slate-600">
                Danh mục
              </TableHead>
              <TableHead className="font-semibold text-slate-600">
                Giá bán
              </TableHead>
              <TableHead className="font-semibold text-slate-600">
                Tuỳ chọn
              </TableHead>
              <TableHead className="text-right font-semibold text-slate-600">
                Hành động
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="divide-y divide-slate-100">
            {loading ? (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="h-24 text-center text-slate-500"
                >
                  Đang tải dữ liệu...
                </TableCell>
              </TableRow>
            ) : filtered.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="h-24 text-center text-slate-500"
                >
                  Không tìm thấy sản phẩm nào.
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((p) => (
                <TableRow
                  key={p.id}
                  className="hover:bg-emerald-50/50 transition-colors"
                >
                  <TableCell className="font-mono text-xs text-slate-500">
                    {p.id.slice(0, 8)}...
                  </TableCell>
                  <TableCell>
                    <div className="h-10 w-10 rounded-md border border-slate-200 bg-slate-50 overflow-hidden flex items-center justify-center shrink-0">
                      {p.imageUrl ? (
                        <img
                          src={getMediaUrl(p.imageUrl)}
                          alt={p.name}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <ImageIcon className="h-4 w-4 text-slate-300" />
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="font-semibold text-slate-800">
                    {p.name}
                  </TableCell>
                  <TableCell>
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-700">
                      {p.productCategoryName}
                    </span>
                  </TableCell>
                  <TableCell className="text-emerald-700 font-medium">
                    {formatPrice(p.basePrice)}
                  </TableCell>
                  <TableCell>
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
                      {p.productOptionIds?.length || 0} tuỳ chọn
                    </span>
                  </TableCell>
                  <TableCell className="text-right space-x-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50"
                      onClick={() => openEdit(p)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-slate-400 hover:text-red-600 hover:bg-red-50"
                      onClick={() => openDelete(p)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-end gap-3 mt-5">
        <Button
          variant="outline"
          size="sm"
          className="rounded-lg h-9"
          disabled={page <= 1}
          onClick={() => setPage((prev) => prev - 1)}
        >
          Trang trước
        </Button>
        <span className="text-sm text-slate-500">
          Page {page}/{totalPages}
        </span>
        <Button
          variant="outline"
          size="sm"
          className="rounded-lg h-9"
          disabled={page >= totalPages}
          onClick={() => setPage((prev) => prev + 1)}
        >
          Trang tiếp
        </Button>
      </div>
    </div>
  );
}
