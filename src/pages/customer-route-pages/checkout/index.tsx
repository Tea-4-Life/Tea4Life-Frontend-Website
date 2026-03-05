"use client";

import { Button } from "@/components/ui/button.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Label } from "@/components/ui/label.tsx";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group.tsx";
import { CreditCard, MapPin, ChevronLeft, Leaf } from "lucide-react";
import { Link } from "react-router-dom";

export default function CheckoutPage() {
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
        {/* Back link */}
        <Link
          to="/cart"
          className="inline-flex items-center text-[#8A9A7A] hover:text-[#1A4331] font-bold text-sm mb-8 transition-colors"
        >
          <ChevronLeft className="h-4 w-4 mr-1" /> Quay lại giỏ hàng
        </Link>

        {/* Header */}
        <div className="mb-10 border-b-2 border-[#1A4331]/10 pb-6">
          <div className="flex items-center gap-2 mb-2">
            <Leaf className="w-5 h-5 text-[#8A9A7A]" />
            <p className="text-[#8A9A7A] font-bold text-sm uppercase tracking-wider">
              Thanh Toán
            </p>
          </div>
          <h1 className="text-3xl md:text-4xl pixel-text text-[#1A4331]">
            Xác Nhận Đơn Hàng
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Thông tin giao hàng & Thanh toán */}
          <div className="lg:col-span-2 space-y-6">
            {/* Shipping Info */}
            <div className="bg-white border-2 border-[#1A4331]/15">
              <div className="px-6 py-4 border-b-2 border-[#1A4331]/10">
                <h2 className="flex items-center gap-2 text-[#1A4331] font-bold text-sm uppercase tracking-wider">
                  <MapPin className="h-4 w-4 text-[#8A9A7A]" /> Thông tin giao
                  hàng
                </h2>
              </div>
              <div className="p-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-xs font-bold text-[#1A4331] uppercase tracking-wider">
                      Họ và tên
                    </Label>
                    <Input
                      placeholder="Nguyễn Văn A"
                      className="border-2 border-[#1A4331]/20 bg-[#F8F5F0] rounded-none focus-visible:ring-0 focus-visible:border-[#1A4331] text-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs font-bold text-[#1A4331] uppercase tracking-wider">
                      Số điện thoại
                    </Label>
                    <Input
                      placeholder="0901234567"
                      className="border-2 border-[#1A4331]/20 bg-[#F8F5F0] rounded-none focus-visible:ring-0 focus-visible:border-[#1A4331] text-sm"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-bold text-[#1A4331] uppercase tracking-wider">
                    Địa chỉ chi tiết
                  </Label>
                  <Input
                    placeholder="Số nhà, tên đường, phường/xã..."
                    className="border-2 border-[#1A4331]/20 bg-[#F8F5F0] rounded-none focus-visible:ring-0 focus-visible:border-[#1A4331] text-sm"
                  />
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white border-2 border-[#1A4331]/15">
              <div className="px-6 py-4 border-b-2 border-[#1A4331]/10">
                <h2 className="flex items-center gap-2 text-[#1A4331] font-bold text-sm uppercase tracking-wider">
                  <CreditCard className="h-4 w-4 text-[#8A9A7A]" /> Phương thức
                  thanh toán
                </h2>
              </div>
              <div className="p-6">
                <RadioGroup defaultValue="cod" className="space-y-3">
                  <div className="flex items-center space-x-3 p-3 border-2 border-[#1A4331]/10 hover:border-[#1A4331]/30 transition-colors cursor-pointer">
                    <RadioGroupItem value="cod" id="cod" />
                    <Label
                      htmlFor="cod"
                      className="flex-1 cursor-pointer text-sm text-[#1A4331]"
                    >
                      Thanh toán khi nhận hàng (COD)
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3 p-3 border-2 border-[#1A4331]/10 hover:border-[#1A4331]/30 transition-colors cursor-pointer">
                    <RadioGroupItem value="bank" id="bank" />
                    <Label
                      htmlFor="bank"
                      className="flex-1 cursor-pointer text-sm text-[#1A4331]"
                    >
                      Chuyển khoản ngân hàng
                    </Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
          </div>

          {/* Tóm tắt đơn hàng */}
          <div className="lg:col-span-1">
            <div className="bg-white border-2 border-[#1A4331]/15 sticky top-24">
              <div className="px-6 py-4 border-b-2 border-[#1A4331]/10">
                <h2 className="text-[#1A4331] font-bold text-sm uppercase tracking-wider">
                  Tóm tắt đơn hàng
                </h2>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-[#1A4331]/70">
                    Tạm tính (3 sản phẩm)
                  </span>
                  <span className="font-bold text-[#1A4331]">980.000đ</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[#1A4331]/70">Phí vận chuyển</span>
                  <span className="font-bold text-[#8A9A7A]">Miễn phí</span>
                </div>

                <div className="border-t-2 border-dashed border-[#1A4331]/20 pt-4">
                  <div className="flex justify-between text-xl font-bold text-[#1A4331]">
                    <span>Tổng cộng</span>
                    <span>980.000đ</span>
                  </div>
                </div>

                <Button className="w-full bg-[#1A4331] text-[#F8F5F0] hover:bg-[#8A9A7A] rounded-none h-12 text-base font-bold mt-4">
                  Xác nhận Đặt hàng
                </Button>
                <p className="text-[10px] text-center text-[#8A9A7A] mt-2">
                  Bằng cách nhấn Đặt hàng, bạn đồng ý với Điều khoản dịch vụ của
                  Tea4Life.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
