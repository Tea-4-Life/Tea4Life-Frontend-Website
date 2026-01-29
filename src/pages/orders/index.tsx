"use client";

import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ShoppingBag,
  Clock,
  CheckCircle2,
  Truck,
  Eye,
  Search,
  Calendar,
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
  switch (status) {
    case "Delivered":
      return (
        <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100">
          <CheckCircle2 className="w-3 h-3 mr-1" /> Hoàn thành
        </Badge>
      );
    case "Shipped":
      return (
        <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">
          <Truck className="w-3 h-3 mr-1" /> Đang giao
        </Badge>
      );
    case "Processing":
      return (
        <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100">
          <Clock className="w-3 h-3 mr-1" /> Đang xử lý
        </Badge>
      );
    case "Cancelled":
      return <Badge variant="destructive">Đã hủy</Badge>;
    default:
      return <Badge variant="secondary">{status}</Badge>;
  }
};

export default function OrderPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [dateSearch, setDateSearch] = useState(""); // Tìm kiếm theo ngày
  const [statusFilter, setStatusFilter] = useState("all");

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  // Logic lọc dữ liệu tổng hợp
  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      // Tìm theo mã đơn hàng
      const matchesId = order.id
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      // Tìm theo ngày (định dạng YYYY-MM-DD hoặc một phần của chuỗi ngày)
      const matchesDate = order.date.includes(dateSearch);
      // Lọc theo trạng thái
      const matchesStatus =
        statusFilter === "all" || order.status === statusFilter;

      return matchesId && matchesDate && matchesStatus;
    });
  }, [searchTerm, dateSearch, statusFilter]);

  return (
    <div className="min-h-screen bg-linear-to-b from-emerald-50/50 to-white py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 mb-8">
          <ShoppingBag className="h-8 w-8 text-emerald-600" />
          <h1 className="text-3xl font-bold text-emerald-900">
            Lịch sử đơn hàng
          </h1>
        </div>

        {/* Khu vực tìm kiếm và bộ lọc */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {/* Tìm theo Mã đơn */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-emerald-500" />
            <Input
              placeholder="Tìm mã đơn (vd: 7291)..."
              className="pl-10 border-emerald-100 focus-visible:ring-emerald-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Tìm theo Ngày đặt */}
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-emerald-500" />
            <Input
              type="date"
              className="pl-10 border-emerald-100 focus-visible:ring-emerald-500"
              value={dateSearch}
              onChange={(e) => setDateSearch(e.target.value)}
            />
          </div>

          {/* Lọc theo Trạng thái */}
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="border-emerald-100">
              <SelectValue placeholder="Trạng thái" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả trạng thái</SelectItem>
              <SelectItem value="Processing">Đang xử lý</SelectItem>
              <SelectItem value="Shipped">Đang giao</SelectItem>
              <SelectItem value="Delivered">Hoàn thành</SelectItem>
              <SelectItem value="Cancelled">Đã hủy</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Card className="border-emerald-100 shadow-sm overflow-hidden">
          <CardHeader className="bg-white border-b border-emerald-50 flex flex-row items-center justify-between">
            <CardTitle className="text-emerald-800 text-lg font-semibold">
              Danh sách đơn hàng
            </CardTitle>
            {(searchTerm || dateSearch || statusFilter !== "all") && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setSearchTerm("");
                  setDateSearch("");
                  setStatusFilter("all");
                }}
                className="text-xs text-red-500 hover:text-red-600 hover:bg-red-50"
              >
                Đặt lại bộ lọc
              </Button>
            )}
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader className="bg-emerald-50/50">
                <TableRow className="hover:bg-transparent border-emerald-100">
                  <TableHead className="font-bold text-emerald-900 text-center">
                    Mã đơn
                  </TableHead>
                  <TableHead className="font-bold text-emerald-900 text-center">
                    Ngày đặt
                  </TableHead>
                  <TableHead className="font-bold text-emerald-900 text-center">
                    Số lượng
                  </TableHead>
                  <TableHead className="font-bold text-emerald-900 text-center">
                    Trạng thái
                  </TableHead>
                  <TableHead className="font-bold text-emerald-900 text-center">
                    Tổng tiền
                  </TableHead>
                  <TableHead className="font-bold text-emerald-900 text-center">
                    Thao tác
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrders.length > 0 ? (
                  filteredOrders.map((order) => (
                    <TableRow
                      key={order.id}
                      className="border-emerald-50 hover:bg-emerald-50/20 transition-colors"
                    >
                      <TableCell className="font-medium text-emerald-900 text-center">
                        {order.id}
                      </TableCell>
                      <TableCell className="text-emerald-700 text-center">
                        {order.date}
                      </TableCell>
                      <TableCell className="text-center text-emerald-700">
                        {order.items}
                      </TableCell>
                      <TableCell className="text-center">
                        {getStatusBadge(order.status)}
                      </TableCell>
                      <TableCell className="font-bold text-emerald-700 text-center">
                        {formatPrice(order.total)}
                      </TableCell>
                      <TableCell className="text-center">
                        <Link to={`/order/${order.id}`}>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-emerald-600 hover:text-emerald-700 hover:bg-emerald-100/50 gap-2"
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
                      className="text-center py-20 text-emerald-600"
                    >
                      Không tìm thấy đơn hàng nào khớp với yêu cầu tìm kiếm.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
