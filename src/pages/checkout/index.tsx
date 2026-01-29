"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { CreditCard, MapPin, ChevronLeft } from "lucide-react";
import { Link } from "react-router-dom";

export default function CheckoutPage() {
  return (
    <div className="min-h-screen bg-linear-to-b from-emerald-50/50 to-white py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Link
          to="/cart"
          className="flex items-center text-emerald-600 hover:underline mb-8"
        >
          <ChevronLeft className="h-4 w-4 mr-1" /> Quay lại giỏ hàng
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Thông tin giao hàng & Thanh toán */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-emerald-100 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-emerald-800">
                  <MapPin className="h-5 w-5" /> Thông tin giao hàng
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Họ và tên</Label>
                    <Input
                      placeholder="Nguyễn Văn A"
                      className="border-emerald-100"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Số điện thoại</Label>
                    <Input
                      placeholder="0901234567"
                      className="border-emerald-100"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Địa chỉ chi tiết</Label>
                  <Input
                    placeholder="Số nhà, tên đường, phường/xã..."
                    className="border-emerald-100"
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="border-emerald-100 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-emerald-800">
                  <CreditCard className="h-5 w-5" /> Phương thức thanh toán
                </CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup defaultValue="cod" className="space-y-3">
                  <div className="flex items-center space-x-3 p-3 rounded-lg border border-emerald-50 hover:bg-emerald-50/50 transition-colors">
                    <RadioGroupItem value="cod" id="cod" />
                    <Label htmlFor="cod" className="flex-1 cursor-pointer">
                      Thanh toán khi nhận hàng (COD)
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3 p-3 rounded-lg border border-emerald-50 hover:bg-emerald-50/50 transition-colors">
                    <RadioGroupItem value="bank" id="bank" />
                    <Label htmlFor="bank" className="flex-1 cursor-pointer">
                      Chuyển khoản ngân hàng
                    </Label>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>
          </div>

          {/* Tóm tắt đơn hàng */}
          <div className="lg:col-span-1">
            <Card className="border-emerald-200 shadow-md bg-white sticky top-24">
              <CardHeader>
                <CardTitle className="text-lg text-emerald-900">
                  Tóm tắt đơn hàng
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-emerald-700">
                    Tạm tính (3 sản phẩm)
                  </span>
                  <span className="font-medium text-emerald-900">980.000đ</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-emerald-700">Phí vận chuyển</span>
                  <span className="text-emerald-600">Miễn phí</span>
                </div>
                <Separator className="bg-emerald-50" />
                <div className="flex justify-between text-xl font-bold text-emerald-900">
                  <span>Tổng cộng</span>
                  <span className="text-emerald-600">980.000đ</span>
                </div>

                <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white h-12 text-lg mt-4">
                  Xác nhận Đặt hàng
                </Button>
                <p className="text-[10px] text-center text-emerald-500 mt-2">
                  Bằng cách nhấn Đặt hàng, bạn đồng ý với Điều khoản dịch vụ của
                  Tea4Life.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
