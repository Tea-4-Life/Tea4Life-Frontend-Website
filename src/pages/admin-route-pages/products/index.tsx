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
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Plus, Search, Edit, Trash2 } from "lucide-react";

const products = [
  {
    id: "P001",
    name: "Trà Ô Long Đặc Sản",
    price: 350000,
    stock: 45,
    status: "Còn hàng",
  },
  {
    id: "P002",
    name: "Trà Xanh Thái Nguyên",
    price: 220000,
    stock: 12,
    status: "Sắp hết",
  },
  {
    id: "P003",
    name: "Trà Sen Cung Đình",
    price: 450000,
    stock: 0,
    status: "Hết hàng",
  },
];

export default function AdminProductsPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-slate-900">Quản lý Sản phẩm</h1>
        <Button className="bg-emerald-600 hover:bg-emerald-700">
          <Plus className="h-4 w-4 mr-2" /> Thêm sản phẩm
        </Button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border p-4">
        <div className="relative max-w-sm mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input placeholder="Tìm kiếm sản phẩm..." className="pl-10" />
        </div>

        <Table>
          <TableHeader>
            <TableRow className="bg-slate-50/50">
              <TableHead className="w-[100px]">Mã</TableHead>
              <TableHead>Tên sản phẩm</TableHead>
              <TableHead>Giá bán</TableHead>
              <TableHead>Kho</TableHead>
              <TableHead>Trạng thái</TableHead>
              <TableHead className="text-right">Hành động</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((p) => (
              <TableRow key={p.id}>
                <TableCell className="font-medium">{p.id}</TableCell>
                <TableCell>{p.name}</TableCell>
                <TableCell>
                  {new Intl.NumberFormat("vi-VN").format(p.price)}đ
                </TableCell>
                <TableCell>{p.stock}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      p.stock > 20
                        ? "default"
                        : p.stock > 0
                          ? "secondary"
                          : "destructive"
                    }
                  >
                    {p.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right space-x-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-blue-600"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-red-600"
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
