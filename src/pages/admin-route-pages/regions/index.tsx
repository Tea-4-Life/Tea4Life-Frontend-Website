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
import { Plus, Edit, Trash2, Map } from "lucide-react";

const regions = [
  {
    id: 1,
    name: "Tây Bắc",
    slug: "tay-bac",
    description: "Vùng trà shan tuyết cổ thụ",
  },
  {
    id: 2,
    name: "Thái Nguyên",
    slug: "thai-nguyen",
    description: "Đệ nhất danh trà",
  },
  {
    id: 3,
    name: "Lâm Đồng",
    slug: "lam-dong",
    description: "Trà Ô Long chất lượng cao",
  },
];

export default function AdminRegionsPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
          <Map className="h-6 w-6 text-emerald-600" /> Quản lý Vùng miền
        </h1>
        <Button className="bg-emerald-600 hover:bg-emerald-700">
          <Plus className="h-4 w-4 mr-2" /> Thêm vùng miền
        </Button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <Table>
          <TableHeader className="bg-slate-50">
            <TableRow>
              <TableHead>Tên vùng</TableHead>
              <TableHead>Slug</TableHead>
              <TableHead>Mô tả</TableHead>
              <TableHead className="text-right">Hành động</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {regions.map((region) => (
              <TableRow key={region.id}>
                <TableCell className="font-semibold text-emerald-900">
                  {region.name}
                </TableCell>
                <TableCell className="text-slate-500 font-mono text-xs">
                  {region.slug}
                </TableCell>
                <TableCell className="text-slate-600 max-w-xs truncate">
                  {region.description}
                </TableCell>
                <TableCell className="text-right space-x-2">
                  <Button variant="ghost" size="icon" className="text-blue-600">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="text-red-600">
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
