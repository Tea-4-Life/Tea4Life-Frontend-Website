import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button.tsx";
import { Card, CardContent } from "@/components/ui/card.tsx";
import { Separator } from "@/components/ui/separator.tsx";
import { Input } from "@/components/ui/input.tsx";
import {
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  ArrowRight,
  ChevronLeft,
} from "lucide-react";
import { Label } from "@radix-ui/react-label";

// Mock data giỏ hàng
const initialCartItems = [
  {
    id: 1,
    name: "Trà Ô Long Cao Cấp",
    price: 350000,
    quantity: 2,
    size: "200g",
    image:
      "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=200&h=200&fit=crop",
  },
  {
    id: 2,
    name: "Trà Xanh Thái Nguyên",
    price: 280000,
    quantity: 1,
    size: "100g",
    image:
      "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=200&h=200&fit=crop",
  },
];

export default function CartPage() {
  const [cartItems, setCartItems] = useState(initialCartItems);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  const updateQuantity = (id: number, delta: number) => {
    setCartItems((items) =>
      items.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item,
      ),
    );
  };

  const removeItem = (id: number) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
  };

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );
  const shippingFee = subtotal > 500000 ? 0 : 30000;
  const total = subtotal + shippingFee;

  return (
    <div className="min-h-screen bg-linear-to-b from-emerald-50/50 to-white py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-emerald-900 mb-8 flex items-center gap-3">
          <ShoppingBag className="h-8 w-8 text-emerald-600" />
          Giỏ hàng của bạn
        </h1>

        {cartItems.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Danh sách sản phẩm */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <Card
                  key={item.id}
                  className="border-emerald-100 overflow-hidden shadow-sm"
                >
                  <CardContent className="p-4 flex items-center gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-24 w-24 rounded-lg object-cover border border-emerald-50"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-emerald-900 text-lg">
                        {item.name}
                      </h3>
                      <p className="text-sm text-emerald-600 mb-2">
                        Kích cỡ: {item.size}
                      </p>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 border-emerald-200 text-emerald-600"
                          onClick={() => updateQuantity(item.id, -1)}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-8 text-center font-medium">
                          {item.quantity}
                        </span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 border-emerald-200 text-emerald-600"
                          onClick={() => updateQuantity(item.id, 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                    <div className="text-right space-y-2">
                      <p className="font-bold text-emerald-700 text-lg">
                        {formatPrice(item.price * item.quantity)}
                      </p>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-400 hover:text-red-600 hover:bg-red-50"
                        onClick={() => removeItem(item.id)}
                      >
                        <Trash2 className="h-4 w-4 mr-1" /> Xóa
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}

              <Link
                to="/shop"
                className="inline-flex items-center text-emerald-600 hover:underline mt-4"
              >
                <ChevronLeft className="h-4 w-4 mr-1" /> Tiếp tục mua sắm
              </Link>
            </div>

            {/* Tóm tắt đơn hàng */}
            <div className="lg:col-span-1">
              <Card className="border-emerald-100 shadow-md sticky top-24">
                <CardContent className="p-6 space-y-4">
                  <h2 className="text-xl font-bold text-emerald-900">
                    Tóm tắt đơn hàng
                  </h2>
                  <div className="space-y-2">
                    <div className="flex justify-between text-emerald-700">
                      <span>Tạm tính</span>
                      <span>{formatPrice(subtotal)}</span>
                    </div>
                    <div className="flex justify-between text-emerald-700">
                      <span>Phí vận chuyển</span>
                      <span>
                        {shippingFee === 0
                          ? "Miễn phí"
                          : formatPrice(shippingFee)}
                      </span>
                    </div>
                    {shippingFee > 0 && (
                      <p className="text-[10px] text-emerald-500 italic">
                        * Miễn phí vận chuyển cho đơn hàng trên 500.000đ
                      </p>
                    )}
                  </div>

                  <Separator className="bg-emerald-100" />

                  <div className="flex justify-between text-xl font-bold text-emerald-900">
                    <span>Tổng cộng</span>
                    <span className="text-emerald-600">
                      {formatPrice(total)}
                    </span>
                  </div>

                  <div className="pt-4">
                    <Label className="text-xs text-emerald-700 mb-2 block">
                      Mã giảm giá (nếu có)
                    </Label>
                    <div className="flex gap-2">
                      <Input
                        placeholder="NHAPMA"
                        className="border-emerald-100 focus-visible:ring-emerald-500"
                      />
                      <Button variant="outline" className="border-emerald-200">
                        Áp dụng
                      </Button>
                    </div>
                  </div>

                  <Link to="/checkout" className="block w-full">
                    <Button className="w-full bg-linear-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white h-12 text-lg gap-2">
                      Thanh toán <ArrowRight className="h-5 w-5" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        ) : (
          <Card className="border-dashed border-2 border-emerald-200 py-20 text-center">
            <CardContent>
              <ShoppingBag className="h-16 w-16 text-emerald-100 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-emerald-900">
                Giỏ hàng trống
              </h2>
              <p className="text-emerald-600 mt-2 mb-6">
                Bạn chưa có sản phẩm nào trong giỏ hàng.
              </p>
              <Link to="/shop">
                <Button className="bg-emerald-500 hover:bg-emerald-600">
                  Khám phá sản phẩm ngay
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
