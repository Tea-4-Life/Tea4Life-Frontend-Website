import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button.tsx";
import { Input } from "@/components/ui/input.tsx";
import {
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  ArrowRight,
  ChevronLeft,
  Leaf,
} from "lucide-react";

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
              Giỏ Hàng
            </p>
          </div>
          <h1 className="text-3xl md:text-4xl pixel-text text-[#1A4331] flex items-center gap-3">
            <ShoppingBag className="h-8 w-8 text-[#8A9A7A]" />
            Giỏ hàng của bạn
          </h1>
        </div>

        {cartItems.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Danh sách sản phẩm */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white border-2 border-[#1A4331]/15 p-4 flex items-center gap-4 transition-all duration-200 hover:shadow-[2px_2px_0px_rgba(26,67,49,0.08)]"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-24 w-24 object-cover border border-[#1A4331]/10"
                  />
                  <div className="flex-1">
                    <h3 className="font-bold text-[#1A4331] text-lg">
                      {item.name}
                    </h3>
                    <p className="text-sm text-[#8A9A7A] mb-2">
                      Kích cỡ: {item.size}
                    </p>
                    <div className="flex items-center gap-0">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 border-2 border-[#1A4331]/20 text-[#1A4331] rounded-none hover:bg-[#1A4331] hover:text-[#F8F5F0]"
                        onClick={() => updateQuantity(item.id, -1)}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="w-10 h-8 flex items-center justify-center text-sm font-bold text-[#1A4331] border-y-2 border-[#1A4331]/20 bg-[#F8F5F0]">
                        {item.quantity}
                      </span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8 border-2 border-[#1A4331]/20 text-[#1A4331] rounded-none hover:bg-[#1A4331] hover:text-[#F8F5F0]"
                        onClick={() => updateQuantity(item.id, 1)}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  <div className="text-right space-y-2">
                    <p className="font-bold text-[#1A4331] text-lg">
                      {formatPrice(item.price * item.quantity)}
                    </p>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-red-400 hover:text-red-600 hover:bg-red-50 rounded-none text-xs"
                      onClick={() => removeItem(item.id)}
                    >
                      <Trash2 className="h-4 w-4 mr-1" /> Xóa
                    </Button>
                  </div>
                </div>
              ))}

              <Link
                to="/shop"
                className="inline-flex items-center text-[#8A9A7A] hover:text-[#1A4331] font-bold text-sm mt-4 transition-colors"
              >
                <ChevronLeft className="h-4 w-4 mr-1" /> Tiếp tục mua sắm
              </Link>
            </div>

            {/* Tóm tắt đơn hàng */}
            <div className="lg:col-span-1">
              <div className="bg-white border-2 border-[#1A4331]/15 sticky top-24">
                <div className="p-6 space-y-4">
                  <h2 className="text-lg font-bold text-[#1A4331] uppercase tracking-wider border-b-2 border-[#1A4331]/10 pb-3">
                    Tóm tắt đơn hàng
                  </h2>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm text-[#1A4331]/70">
                      <span>Tạm tính</span>
                      <span className="font-bold text-[#1A4331]">
                        {formatPrice(subtotal)}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm text-[#1A4331]/70">
                      <span>Phí vận chuyển</span>
                      <span className="font-bold text-[#1A4331]">
                        {shippingFee === 0
                          ? "Miễn phí"
                          : formatPrice(shippingFee)}
                      </span>
                    </div>
                    {shippingFee > 0 && (
                      <p className="text-[10px] text-[#8A9A7A] italic">
                        * Miễn phí vận chuyển cho đơn hàng trên 500.000đ
                      </p>
                    )}
                  </div>

                  <div className="border-t-2 border-dashed border-[#1A4331]/20 pt-4">
                    <div className="flex justify-between text-xl font-bold text-[#1A4331]">
                      <span>Tổng cộng</span>
                      <span className="text-[#1A4331]">
                        {formatPrice(total)}
                      </span>
                    </div>
                  </div>

                  <div className="pt-4">
                    <label className="text-xs text-[#1A4331] font-bold uppercase tracking-wider mb-2 block">
                      Mã giảm giá (nếu có)
                    </label>
                    <div className="flex gap-2">
                      <Input
                        placeholder="NHAPMA"
                        className="border-2 border-[#1A4331]/20 bg-[#F8F5F0] rounded-none focus-visible:ring-0 focus-visible:border-[#1A4331] text-sm"
                      />
                      <Button
                        variant="outline"
                        className="border-2 border-[#1A4331]/20 text-[#1A4331] hover:bg-[#1A4331] hover:text-[#F8F5F0] rounded-none text-sm font-bold"
                      >
                        Áp dụng
                      </Button>
                    </div>
                  </div>

                  <Link to="/checkout" className="block w-full">
                    <Button className="w-full bg-[#1A4331] text-[#F8F5F0] hover:bg-[#8A9A7A] rounded-none h-12 text-base font-bold gap-2">
                      Thanh toán <ArrowRight className="h-5 w-5" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-20 bg-white border-2 border-dashed border-[#1A4331]/20">
            <ShoppingBag className="h-16 w-16 text-[#1A4331]/10 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-[#1A4331]">Giỏ hàng trống</h2>
            <p className="text-[#8A9A7A] text-sm mt-2 mb-6">
              Bạn chưa có sản phẩm nào trong giỏ hàng.
            </p>
            <Link to="/shop">
              <Button className="bg-[#1A4331] text-[#F8F5F0] hover:bg-[#8A9A7A] rounded-none font-bold px-8 h-11">
                Khám phá sản phẩm ngay
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
