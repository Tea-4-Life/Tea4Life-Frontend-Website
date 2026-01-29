"use client";

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
import { Eye } from "lucide-react";
import { cn } from "@/lib/utils";

const orders = [
  {
    id: "#ORD-9921",
    customer: "Lê Minh Tâm",
    date: "29/01/2026",
    total: 720000,
    status: "Đang xử lý",
  },
  {
    id: "#ORD-9920",
    customer: "Trần Thị Lan",
    date: "28/01/2026",
    total: 450000,
    status: "Đã giao",
  },
  {
    id: "#ORD-9919",
    customer: "Nguyễn Hoàng",
    date: "28/01/2026",
    total: 1200000,
    status: "Đã hủy",
  },
];

export default function AdminOrdersPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-900">Danh sách đơn hàng</h1>

      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Mã đơn</TableHead>
              <TableHead>Khách hàng</TableHead>
              <TableHead>Ngày đặt</TableHead>
              <TableHead>Tổng tiền</TableHead>
              <TableHead>Trạng thái</TableHead>
              <TableHead className="text-right">Thao tác</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((o) => (
              <TableRow key={o.id}>
                <TableCell className="font-bold">{o.id}</TableCell>
                <TableCell>{o.customer}</TableCell>
                <TableCell>{o.date}</TableCell>
                <TableCell>
                  {new Intl.NumberFormat("vi-VN").format(o.total)}đ
                </TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={cn(
                      o.status === "Đã giao"
                        ? "border-emerald-500 text-emerald-600"
                        : o.status === "Đang xử lý"
                          ? "border-blue-500 text-blue-600"
                          : "border-red-500 text-red-600",
                    )}
                  >
                    {o.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm" className="gap-1">
                    <Eye className="h-4 w-4" /> Chi tiết
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
