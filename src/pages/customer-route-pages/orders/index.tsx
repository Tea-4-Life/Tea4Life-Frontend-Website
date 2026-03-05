"use client";

import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button.tsx";
import { Input } from "@/components/ui/input.tsx";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table.tsx";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select.tsx";
import {
  ShoppingBag,
  Clock,
  CheckCircle2,
  Truck,
  Eye,
  Search,
  Calendar,
  Leaf,
  X,
} from "lucide-react";

// Mock data đơn hàng
const orders = [
  {
    id: "ORD-7291",
    date: "2024-03-20",
    status: "Delivered",
    total: 1250000,
    items: 3,
  },
  {
    id: "ORD-5502",
    date: "2024-03-18",
    status: "Processing",
    total: 450000,
    items: 1,
  },
  {
    id: "ORD-1234",
    date: "2024-03-15",
    status: "Shipped",
    total: 890000,
    items: 2,
  },
  {
    id: "ORD-9999",
    date: "2024-03-10",
    status: "Cancelled",
    total: 0,
    items: 0,
  },
];

const getStatusBadge = (status: string) => {
  const baseClass =
    "inline-flex items-center gap-1 px-3 py-1 text-xs font-bold border";
  switch (status) {
    case "Delivered":
      return (
        <span
          className={`${baseClass} bg-[#8A9A7A]/10 text-[#1A4331] border-[#8A9A7A]/30`}
        >
          <CheckCircle2 className="w-3 h-3" /> Hoàn thành
        </span>
      );
    case "Shipped":
      return (
        <span
          className={`${baseClass} bg-blue-50 text-blue-700 border-blue-200`}
        >
          <Truck className="w-3 h-3" /> Đang giao
        </span>
      );
    case "Processing":
      return (
        <span
          className={`${baseClass} bg-[#D2A676]/10 text-[#D2A676] border-[#D2A676]/30`}
        >
          <Clock className="w-3 h-3" /> Đang xử lý
        </span>
      );
    case "Cancelled":
      return (
        <span className={`${baseClass} bg-red-50 text-red-600 border-red-200`}>
          <X className="w-3 h-3" /> Đã hủy
        </span>
      );
    default:
      return (
        <span
          className={`${baseClass} bg-gray-50 text-gray-600 border-gray-200`}
        >
          {status}
        </span>
      );
  }
};

export default function OrderPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [dateSearch, setDateSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const matchesId = order.id
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesDate = order.date.includes(dateSearch);
      const matchesStatus =
        statusFilter === "all" || order.status === statusFilter;
      return matchesId && matchesDate && matchesStatus;
    });
  }, [searchTerm, dateSearch, statusFilter]);

  return (
    <div className="min-h-screen bg-[#F8F5F0] text-[#1A4331] relative">
      {/* Background Grid */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.03] z-0"
        style={{
          backgroundImage:
            "linear-gradient(#1A4331 1px, transparent 1px), linear-gradient(90deg, #1A4331 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      ></div>

      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="mb-10 border-b-2 border-[#1A4331]/10 pb-6">
          <div className="flex items-center gap-2 mb-2">
            <Leaf className="w-5 h-5 text-[#8A9A7A]" />
            <p className="text-[#8A9A7A] font-bold text-sm uppercase tracking-wider">
              Theo Dõi Đơn Hàng
            </p>
          </div>
          <h1 className="text-3xl md:text-4xl pixel-text text-[#1A4331] flex items-center gap-3">
            <ShoppingBag className="h-7 w-7 text-[#8A9A7A]" />
            Lịch Sử Đơn Hàng
          </h1>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8A9A7A]" />
            <Input
              placeholder="Tìm mã đơn (vd: 7291)..."
              className="pl-10 border-2 border-[#1A4331]/20 bg-white rounded-none focus-visible:ring-0 focus-visible:border-[#1A4331] text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8A9A7A]" />
            <Input
              type="date"
              className="pl-10 border-2 border-[#1A4331]/20 bg-white rounded-none focus-visible:ring-0 focus-visible:border-[#1A4331] text-sm"
              value={dateSearch}
              onChange={(e) => setDateSearch(e.target.value)}
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="border-2 border-[#1A4331]/20 bg-white text-[#1A4331] text-sm focus:ring-0 focus:ring-offset-0 rounded-none">
              <SelectValue placeholder="Trạng thái" />
            </SelectTrigger>
            <SelectContent className="border border-[#1A4331]/20 bg-[#F8F5F0] rounded-none shadow-lg">
              <SelectItem
                value="all"
                className="text-sm text-[#1A4331] focus:bg-[#8A9A7A] focus:text-[#F8F5F0] rounded-none cursor-pointer"
              >
                Tất cả trạng thái
              </SelectItem>
              <SelectItem
                value="Processing"
                className="text-sm text-[#1A4331] focus:bg-[#8A9A7A] focus:text-[#F8F5F0] rounded-none cursor-pointer"
              >
                Đang xử lý
              </SelectItem>
              <SelectItem
                value="Shipped"
                className="text-sm text-[#1A4331] focus:bg-[#8A9A7A] focus:text-[#F8F5F0] rounded-none cursor-pointer"
              >
                Đang giao
              </SelectItem>
              <SelectItem
                value="Delivered"
                className="text-sm text-[#1A4331] focus:bg-[#8A9A7A] focus:text-[#F8F5F0] rounded-none cursor-pointer"
              >
                Hoàn thành
              </SelectItem>
              <SelectItem
                value="Cancelled"
                className="text-sm text-[#1A4331] focus:bg-[#8A9A7A] focus:text-[#F8F5F0] rounded-none cursor-pointer"
              >
                Đã hủy
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Orders Table */}
        <div className="bg-white border-2 border-[#1A4331]/15 overflow-hidden">
          <div className="px-6 py-4 border-b-2 border-[#1A4331]/10 flex items-center justify-between">
            <h2 className="text-[#1A4331] font-bold text-sm uppercase tracking-wider">
              Danh sách đơn hàng
            </h2>
            {(searchTerm || dateSearch || statusFilter !== "all") && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setSearchTerm("");
                  setDateSearch("");
                  setStatusFilter("all");
                }}
                className="text-xs text-red-500 hover:text-red-600 hover:bg-red-50 rounded-none"
              >
                Đặt lại bộ lọc
              </Button>
            )}
          </div>
          <Table>
            <TableHeader className="bg-[#F8F5F0]">
              <TableRow className="hover:bg-transparent border-[#1A4331]/10">
                <TableHead className="font-bold text-[#1A4331] text-center text-xs uppercase tracking-wider">
                  Mã đơn
                </TableHead>
                <TableHead className="font-bold text-[#1A4331] text-center text-xs uppercase tracking-wider">
                  Ngày đặt
                </TableHead>
                <TableHead className="font-bold text-[#1A4331] text-center text-xs uppercase tracking-wider">
                  Số lượng
                </TableHead>
                <TableHead className="font-bold text-[#1A4331] text-center text-xs uppercase tracking-wider">
                  Trạng thái
                </TableHead>
                <TableHead className="font-bold text-[#1A4331] text-center text-xs uppercase tracking-wider">
                  Tổng tiền
                </TableHead>
                <TableHead className="font-bold text-[#1A4331] text-center text-xs uppercase tracking-wider">
                  Thao tác
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order) => (
                  <TableRow
                    key={order.id}
                    className="border-[#1A4331]/10 hover:bg-[#F8F5F0]/50 transition-colors"
                  >
                    <TableCell className="font-bold text-[#1A4331] text-center text-sm">
                      {order.id}
                    </TableCell>
                    <TableCell className="text-[#1A4331]/70 text-center text-sm">
                      {order.date}
                    </TableCell>
                    <TableCell className="text-center text-[#1A4331]/70 text-sm">
                      {order.items}
                    </TableCell>
                    <TableCell className="text-center">
                      {getStatusBadge(order.status)}
                    </TableCell>
                    <TableCell className="font-bold text-[#1A4331] text-center text-sm">
                      {formatPrice(order.total)}
                    </TableCell>
                    <TableCell className="text-center">
                      <Link to={`/order/${order.id}`}>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-[#8A9A7A] hover:text-[#1A4331] hover:bg-[#8A9A7A]/10 rounded-none gap-1 text-xs font-bold"
                        >
                          <Eye className="h-4 w-4" />
                          Chi tiết
                        </Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="text-center py-20 text-[#8A9A7A]"
                  >
                    Không tìm thấy đơn hàng nào khớp với yêu cầu tìm kiếm.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
