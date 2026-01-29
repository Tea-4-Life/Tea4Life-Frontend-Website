"use client";

import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft,
  Package,
  MapPin,
  CreditCard,
  Truck,
  CheckCircle2,
} from "lucide-react";

// Mock data chi tiết cho một đơn hàng (Thực tế sẽ fetch theo ID)
const orderData = {
  id: "ORD-7291",
  date: "2024-03-20 14:30",
  status: "Delivered",
  shippingAddress: {
    name: "Nguyễn Văn A",
    phone: "0901 234 567",
    address: "123 Đường Lê Lợi, Quận 1, TP. Hồ Chí Minh",
  },
  paymentMethod: "Chuyển khoản ngân hàng",
  items: [
    {
      id: 1,
      name: "Trà Ô Long Cao Cấp",
      price: 350000,
      quantity: 2,
      image:
        "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=100&h=100&fit=crop",
    },
    {
      id: 2,
      name: "Trà Xanh Thái Nguyên",
      price: 280000,
      quantity: 1,
      image:
        "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=100&h=100&fit=crop",
    },
  ],
  subtotal: 980000,
  shippingFee: 30000,
  total: 1010000,
};

export default function OrderDetailPage() {
  const { id } = useParams();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-emerald-50/50 to-white py-12">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Link to="/order">
          <Button
            variant="ghost"
            className="mb-6 text-emerald-700 hover:bg-emerald-100 gap-2"
          >
            <ArrowLeft className="h-4 w-4" /> Quay lại lịch sử đơn hàng
          </Button>
        </Link>

        {/* Header Info */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-emerald-900">
              Chi tiết đơn hàng #{id}
            </h1>
            <p className="text-emerald-600 mt-1">Ngày đặt: {orderData.date}</p>
          </div>
          <Badge className="w-fit bg-emerald-100 text-emerald-700 text-sm px-4 py-1">
            <CheckCircle2 className="w-4 h-4 mr-2" /> Hoàn thành
          </Badge>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content: Items List */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-emerald-100 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-emerald-800">
                  <Package className="h-5 w-5" /> Sản phẩm đã mua
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {orderData.items.map((item) => (
                  <div key={item.id} className="flex gap-4 items-center">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-20 w-20 rounded-lg object-cover border border-emerald-50"
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold text-emerald-900">
                        {item.name}
                      </h4>
                      <p className="text-sm text-emerald-600">
                        Số lượng: {item.quantity}
                      </p>
                    </div>
                    <p className="font-bold text-emerald-700">
                      {formatPrice(item.price * item.quantity)}
                    </p>
                  </div>
                ))}

                <Separator className="my-6 bg-emerald-50" />

                <div className="space-y-2">
                  <div className="flex justify-between text-emerald-700">
                    <span>Tạm tính</span>
                    <span>{formatPrice(orderData.subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-emerald-700">
                    <span>Phí vận chuyển</span>
                    <span>{formatPrice(orderData.shippingFee)}</span>
                  </div>
                  <div className="flex justify-between text-xl font-bold text-emerald-900 pt-2">
                    <span>Tổng cộng</span>
                    <span className="text-emerald-600">
                      {formatPrice(orderData.total)}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar: Customer & Shipping Info */}
          <div className="space-y-6">
            <Card className="border-emerald-100 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-emerald-800 text-lg">
                  <MapPin className="h-5 w-5" /> Thông tin nhận hàng
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div>
                  <p className="font-bold text-emerald-900">
                    {orderData.shippingAddress.name}
                  </p>
                  <p className="text-emerald-700">
                    {orderData.shippingAddress.phone}
                  </p>
                  <p className="text-emerald-600 mt-1">
                    {orderData.shippingAddress.address}
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-emerald-100 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-emerald-800 text-lg">
                  <CreditCard className="h-5 w-5" /> Thanh toán
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-emerald-700">
                  {orderData.paymentMethod}
                </p>
                <div className="mt-4 flex items-center gap-2 text-xs text-emerald-500">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  Đã thanh toán thành công
                </div>
              </CardContent>
            </Card>

            <Card className="border-emerald-100 shadow-sm bg-emerald-900 text-white">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <Truck className="h-10 w-10 text-emerald-400" />
                  <div>
                    <p className="font-bold">Đơn hàng đã giao</p>
                    <p className="text-xs text-emerald-200">
                      Cảm ơn bạn đã tin dùng Tea4Life!
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
