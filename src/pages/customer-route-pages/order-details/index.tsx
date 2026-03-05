"use client";

import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button.tsx";
import {
  ArrowLeft,
  Package,
  MapPin,
  CreditCard,
  Truck,
  CheckCircle2,
  Leaf,
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

      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8 relative z-10">
        {/* Back Button */}
        <Link to="/order">
          <Button
            variant="ghost"
            className="mb-6 text-[#8A9A7A] hover:text-[#1A4331] hover:bg-[#8A9A7A]/10 rounded-none gap-2 font-bold text-sm"
          >
            <ArrowLeft className="h-4 w-4" /> Quay lại lịch sử đơn hàng
          </Button>
        </Link>

        {/* Header Info */}
        <div className="mb-10 border-b-2 border-[#1A4331]/10 pb-6">
          <div className="flex items-center gap-2 mb-2">
            <Leaf className="w-5 h-5 text-[#8A9A7A]" />
            <p className="text-[#8A9A7A] font-bold text-sm uppercase tracking-wider">
              Chi Tiết Đơn Hàng
            </p>
          </div>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl pixel-text text-[#1A4331]">
                Đơn hàng #{id}
              </h1>
              <p className="text-sm text-[#8A9A7A] mt-1">
                Ngày đặt: {orderData.date}
              </p>
            </div>
            <span className="inline-flex items-center gap-1 bg-[#8A9A7A]/10 text-[#1A4331] border border-[#8A9A7A]/30 px-4 py-2 text-sm font-bold w-fit">
              <CheckCircle2 className="w-4 h-4 text-[#8A9A7A]" /> Hoàn thành
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content: Items List */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white border-2 border-[#1A4331]/15">
              <div className="px-6 py-4 border-b-2 border-[#1A4331]/10">
                <h2 className="flex items-center gap-2 text-[#1A4331] font-bold text-sm uppercase tracking-wider">
                  <Package className="h-4 w-4 text-[#8A9A7A]" /> Sản phẩm đã mua
                </h2>
              </div>
              <div className="p-6 space-y-4">
                {orderData.items.map((item) => (
                  <div key={item.id} className="flex gap-4 items-center">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-20 w-20 object-cover border border-[#1A4331]/10"
                    />
                    <div className="flex-1">
                      <h4 className="font-bold text-[#1A4331]">{item.name}</h4>
                      <p className="text-sm text-[#8A9A7A]">
                        Số lượng: {item.quantity}
                      </p>
                    </div>
                    <p className="font-bold text-[#1A4331]">
                      {formatPrice(item.price * item.quantity)}
                    </p>
                  </div>
                ))}

                <div className="border-t-2 border-dashed border-[#1A4331]/15 pt-4 mt-6 space-y-2">
                  <div className="flex justify-between text-sm text-[#1A4331]/70">
                    <span>Tạm tính</span>
                    <span className="font-bold text-[#1A4331]">
                      {formatPrice(orderData.subtotal)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm text-[#1A4331]/70">
                    <span>Phí vận chuyển</span>
                    <span className="font-bold text-[#1A4331]">
                      {formatPrice(orderData.shippingFee)}
                    </span>
                  </div>
                  <div className="flex justify-between text-xl font-bold text-[#1A4331] pt-3 border-t border-[#1A4331]/10">
                    <span>Tổng cộng</span>
                    <span>{formatPrice(orderData.total)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar: Customer & Shipping Info */}
          <div className="space-y-6">
            {/* Shipping Info */}
            <div className="bg-white border-2 border-[#1A4331]/15">
              <div className="px-6 py-4 border-b-2 border-[#1A4331]/10">
                <h2 className="flex items-center gap-2 text-[#1A4331] font-bold text-sm uppercase tracking-wider">
                  <MapPin className="h-4 w-4 text-[#8A9A7A]" /> Thông tin nhận
                  hàng
                </h2>
              </div>
              <div className="p-6 space-y-2 text-sm">
                <p className="font-bold text-[#1A4331]">
                  {orderData.shippingAddress.name}
                </p>
                <p className="text-[#1A4331]/70">
                  {orderData.shippingAddress.phone}
                </p>
                <p className="text-[#8A9A7A] mt-1">
                  {orderData.shippingAddress.address}
                </p>
              </div>
            </div>

            {/* Payment Info */}
            <div className="bg-white border-2 border-[#1A4331]/15">
              <div className="px-6 py-4 border-b-2 border-[#1A4331]/10">
                <h2 className="flex items-center gap-2 text-[#1A4331] font-bold text-sm uppercase tracking-wider">
                  <CreditCard className="h-4 w-4 text-[#8A9A7A]" /> Thanh toán
                </h2>
              </div>
              <div className="p-6">
                <p className="text-sm text-[#1A4331]">
                  {orderData.paymentMethod}
                </p>
                <div className="mt-3 flex items-center gap-2 text-xs text-[#8A9A7A]">
                  <CheckCircle2 className="h-4 w-4" />
                  Đã thanh toán thành công
                </div>
              </div>
            </div>

            {/* Delivery Status Card */}
            <div className="bg-[#1A4331] border-2 border-[#1A4331] text-[#F8F5F0] p-6">
              <div className="flex items-center gap-3">
                <Truck className="h-8 w-8 text-[#8A9A7A]" />
                <div>
                  <p className="font-bold">Đơn hàng đã giao</p>
                  <p className="text-xs text-[#F8F5F0]/60">
                    Cảm ơn bạn đã tin dùng Tea4Life!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
