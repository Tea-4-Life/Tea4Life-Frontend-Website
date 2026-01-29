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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Plus, Edit, Trash2, Award, ExternalLink } from "lucide-react";

const brands = [
  {
    id: 1,
    name: "Tea4Life Original",
    code: "T4L",
    origin: "Việt Nam",
    logo: "",
  },
  { id: 2, name: "Cozy Tea", code: "COZY", origin: "Việt Nam", logo: "" },
  { id: 3, name: "Dilmah", code: "DIL", origin: "Sri Lanka", logo: "" },
];

export default function AdminBrandsPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
          <Award className="h-6 w-6 text-emerald-600" /> Quản lý Thương hiệu
        </h1>
        <Button className="bg-emerald-600 hover:bg-emerald-700">
          <Plus className="h-4 w-4 mr-2" /> Thêm thương hiệu
        </Button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <Table>
          <TableHeader className="bg-slate-50">
            <TableRow>
              <TableHead>Thương hiệu</TableHead>
              <TableHead>Mã định danh</TableHead>
              <TableHead>Xuất xứ</TableHead>
              <TableHead className="text-right">Thao tác</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {brands.map((brand) => (
              <TableRow key={brand.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-9 w-9 border border-slate-100">
                      <AvatarImage src={brand.logo} />
                      <AvatarFallback className="bg-emerald-50 text-emerald-600 text-[10px] font-bold">
                        {brand.code}
                      </AvatarFallback>
                    </Avatar>
                    <span className="font-semibold text-slate-800">
                      {brand.name}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="font-mono text-sm text-slate-500">
                  {brand.code}
                </TableCell>
                <TableCell className="text-slate-600">{brand.origin}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-8 text-xs gap-1"
                    >
                      <ExternalLink className="h-3 w-3" /> Shop
                    </Button>
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
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
