"use client";

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
import { Plus, Search, Edit, Trash2, LayoutGrid } from "lucide-react";

const categories = [
  {
    id: 1,
    name: "Trà Xanh",
    slug: "tra-xanh",
    productCount: 15,
    status: "Active",
  },
  {
    id: 2,
    name: "Trà Ô Long",
    slug: "tra-o-long",
    productCount: 12,
    status: "Active",
  },
  {
    id: 3,
    name: "Trà Thảo Mộc",
    slug: "tra-thao-moc",
    productCount: 8,
    status: "Active",
  },
];

export default function AdminCategoriesPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
          <LayoutGrid className="h-6 w-6 text-emerald-600" /> Quản lý Danh mục
        </h1>
        <Button className="bg-emerald-600 hover:bg-emerald-700 font-medium">
          <Plus className="h-4 w-4 mr-2" /> Thêm danh mục
        </Button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border p-4">
        <div className="relative max-w-sm mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            placeholder="Tìm kiếm danh mục..."
            className="pl-10 border-slate-200"
          />
        </div>

        <Table>
          <TableHeader className="bg-slate-50/50">
            <TableRow>
              <TableHead className="font-bold">Tên danh mục</TableHead>
              <TableHead className="font-bold">Slug (URL)</TableHead>
              <TableHead className="font-bold">Số sản phẩm</TableHead>
              <TableHead className="font-bold text-right">Hành động</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categories.map((cat) => (
              <TableRow
                key={cat.id}
                className="hover:bg-slate-50/50 transition-colors"
              >
                <TableCell className="font-semibold text-emerald-900">
                  {cat.name}
                </TableCell>
                <TableCell className="text-slate-500 font-mono text-xs">
                  {cat.slug}
                </TableCell>
                <TableCell>{cat.productCount} sản phẩm</TableCell>
                <TableCell className="text-right space-x-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-blue-600 hover:bg-blue-50"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-red-600 hover:bg-red-50"
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
