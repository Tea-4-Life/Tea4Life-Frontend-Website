"use client";

import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button.tsx";
import {
  Star,
  Minus,
  Plus,
  ShoppingCart,
  Heart,
  ChevronLeft,
  Leaf,
} from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb.tsx";

import {
  allProducts,
  brands as brandList,
  regions as regionList,
} from "../shop/constants.ts";

const brands: Record<string, string> = brandList.reduce(
  (acc, b) => {
    acc[b.value] = b.label;
    return acc;
  },
  {} as Record<string, string>,
);

const regions: Record<string, string> = regionList.reduce(
  (acc, r) => {
    acc[r.value] = r.label;
    return acc;
  },
  {} as Record<string, string>,
);

const sugarLevels = [
  { value: "0", label: "0%" },
  { value: "30", label: "30%" },
  { value: "50", label: "50%" },
  { value: "70", label: "70%" },
  { value: "100", label: "100%" },
];

const iceLevels = [
  { value: "none", label: "Không đá" },
  { value: "less", label: "Ít đá" },
  { value: "normal", label: "Bình thường" },
  { value: "more", label: "Nhiều đá" },
];

const toppings = [
  { value: "tran-chau-den", label: "Trân châu đen", price: 10000 },
  { value: "tran-chau-trang", label: "Trân châu trắng", price: 10000 },
  { value: "thach-dua", label: "Thạch dừa", price: 8000 },
  { value: "pudding", label: "Pudding", price: 12000 },
  { value: "kem-cheese", label: "Kem cheese", price: 15000 },
  { value: "shot-espresso", label: "Shot espresso", price: 12000 },
];

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedSize, setSelectedSize] = useState("M");
  const [selectedSugar, setSelectedSugar] = useState("100");
  const [selectedIce, setSelectedIce] = useState("normal");
  const [selectedToppings, setSelectedToppings] = useState<string[]>([]);
  const [note, setNote] = useState("");

  const product = allProducts.find((p) => p.id === Number(id));

  if (!product) {
    return (
      <div className="min-h-screen bg-[#F8F5F0] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[#1A4331] mb-4">
            Không tìm thấy sản phẩm
          </h1>
          <Link to="/shop">
            <Button className="bg-[#1A4331] text-[#F8F5F0] hover:bg-[#8A9A7A] rounded-none text-sm font-bold">
              <ChevronLeft className="h-4 w-4 mr-2" />
              Quay lại cửa hàng
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  const toggleTopping = (value: string) => {
    setSelectedToppings((prev) =>
      prev.includes(value) ? prev.filter((t) => t !== value) : [...prev, value],
    );
  };

  // Calculate total price
  const sizeUpcharge =
    selectedSize === "L" ? 10000 : selectedSize === "S" ? -5000 : 0;
  const toppingTotal = selectedToppings.reduce((sum, t) => {
    const topping = toppings.find((tp) => tp.value === t);
    return sum + (topping?.price || 0);
  }, 0);
  const unitPrice = product.price + sizeUpcharge + toppingTotal;
  const totalPrice = unitPrice * quantity;

  // Related products (same brand or region)
  const relatedProducts = allProducts
    .filter(
      (p) =>
        p.id !== product.id &&
        (p.brand === product.brand || p.region === product.region),
    )
    .slice(0, 4);

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

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 relative z-10">
        {/* Breadcrumb */}
        <Breadcrumb className="mb-8">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link
                  to="/"
                  className="text-[#8A9A7A] hover:text-[#1A4331] text-sm font-bold"
                >
                  Trang chủ
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link
                  to="/shop"
                  className="text-[#8A9A7A] hover:text-[#1A4331] text-sm font-bold"
                >
                  Cửa hàng
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="text-[#1A4331] text-sm font-bold">
                {product.name}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* Product Detail */}
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Product Image */}
          <div className="relative">
            <div className="overflow-hidden bg-white border-2 border-[#1A4331]/20">
              <img
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                className="h-full w-full object-cover aspect-square"
              />
            </div>
            <span className="absolute top-3 left-3 bg-[#D2A676] text-[#1A4331] text-xs px-2.5 py-1 font-bold border border-[#1A4331]/30">
              {brands[product.brand]}
            </span>
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            <div className="mb-1 flex items-center gap-2">
              <span className="text-xs text-[#8A9A7A] font-bold uppercase tracking-wider">
                {regions[product.region]}
              </span>
            </div>

            <h1 className="text-3xl font-bold text-[#1A4331] sm:text-4xl pixel-text tracking-tight">
              {product.name}
            </h1>

            {/* Rating - simple display */}
            <div className="mt-3 flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < product.rating
                      ? "fill-[#D2A676] text-[#D2A676]"
                      : "text-[#1A4331]/15"
                  }`}
                />
              ))}
              <span className="text-xs text-[#8A9A7A] ml-1">
                {product.rating}/5
              </span>
            </div>

            {/* Description */}
            <p className="mt-4 text-[#1A4331]/60 text-sm leading-relaxed">
              Thức uống tuyệt hảo được pha chế từ nguyên liệu tươi ngon, chọn
              lọc kỹ càng mỗi ngày.
            </p>

            {/* Size Selection */}
            <div className="mt-6">
              <label className="text-xs font-bold text-[#1A4331] uppercase tracking-wider block mb-2">
                Chọn size
              </label>
              <div className="flex gap-2">
                {["S", "M", "L"].map((s) => (
                  <button
                    key={s}
                    onClick={() => setSelectedSize(s)}
                    className={`w-14 h-10 text-sm font-bold border-2 transition-colors ${
                      selectedSize === s
                        ? "bg-[#1A4331] text-[#F8F5F0] border-[#1A4331]"
                        : "bg-white text-[#1A4331] border-[#1A4331]/20 hover:border-[#1A4331]"
                    }`}
                  >
                    {s}
                  </button>
                ))}
                <span className="flex items-center text-xs text-[#8A9A7A] ml-2">
                  {selectedSize === "S" && "(-5.000 đ)"}
                  {selectedSize === "M" && "(Chuẩn)"}
                  {selectedSize === "L" && "(+10.000 đ)"}
                </span>
              </div>
            </div>

            {/* Sugar Level */}
            <div className="mt-5">
              <label className="text-xs font-bold text-[#1A4331] uppercase tracking-wider block mb-2">
                Mức đường
              </label>
              <div className="flex flex-wrap gap-2">
                {sugarLevels.map((s) => (
                  <button
                    key={s.value}
                    onClick={() => setSelectedSugar(s.value)}
                    className={`px-3 h-9 text-xs font-bold border-2 transition-colors ${
                      selectedSugar === s.value
                        ? "bg-[#1A4331] text-[#F8F5F0] border-[#1A4331]"
                        : "bg-white text-[#1A4331] border-[#1A4331]/20 hover:border-[#1A4331]"
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Ice Level */}
            <div className="mt-5">
              <label className="text-xs font-bold text-[#1A4331] uppercase tracking-wider block mb-2">
                Mức đá
              </label>
              <div className="flex flex-wrap gap-2">
                {iceLevels.map((ice) => (
                  <button
                    key={ice.value}
                    onClick={() => setSelectedIce(ice.value)}
                    className={`px-3 h-9 text-xs font-bold border-2 transition-colors ${
                      selectedIce === ice.value
                        ? "bg-[#1A4331] text-[#F8F5F0] border-[#1A4331]"
                        : "bg-white text-[#1A4331] border-[#1A4331]/20 hover:border-[#1A4331]"
                    }`}
                  >
                    {ice.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Toppings */}
            <div className="mt-5">
              <label className="text-xs font-bold text-[#1A4331] uppercase tracking-wider block mb-2">
                Topping thêm
              </label>
              <div className="grid grid-cols-2 gap-2">
                {toppings.map((tp) => (
                  <button
                    key={tp.value}
                    onClick={() => toggleTopping(tp.value)}
                    className={`flex items-center justify-between px-3 h-10 text-xs font-bold border-2 transition-colors ${
                      selectedToppings.includes(tp.value)
                        ? "bg-[#1A4331] text-[#F8F5F0] border-[#1A4331]"
                        : "bg-white text-[#1A4331] border-[#1A4331]/20 hover:border-[#1A4331]"
                    }`}
                  >
                    <span>{tp.label}</span>
                    <span
                      className={
                        selectedToppings.includes(tp.value)
                          ? "text-[#D2A676]"
                          : "text-[#8A9A7A]"
                      }
                    >
                      +{formatPrice(tp.price)}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Note */}
            <div className="mt-5">
              <label className="text-xs font-bold text-[#1A4331] uppercase tracking-wider block mb-2">
                Ghi chú
              </label>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Ví dụ: Ít ngọt, thêm đá..."
                className="w-full h-16 bg-white border-2 border-[#1A4331]/20 px-3 py-2 text-sm text-[#1A4331] focus:outline-none focus:border-[#1A4331] placeholder-[#8A9A7A]/50 resize-none"
              />
            </div>

            {/* Quantity + Price */}
            <div className="mt-6 pt-5 border-t border-[#1A4331]/10">
              <div className="flex items-center justify-between mb-4">
                <label className="text-xs font-bold text-[#1A4331] uppercase tracking-wider">
                  Số lượng
                </label>
                <div className="flex items-center gap-0">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="border-2 border-[#1A4331]/20 text-[#1A4331] bg-transparent rounded-none w-9 h-9 hover:bg-[#1A4331] hover:text-[#F8F5F0]"
                  >
                    <Minus className="h-3 w-3" />
                  </Button>
                  <span className="w-12 h-9 flex items-center justify-center text-sm font-bold text-[#1A4331] border-y-2 border-[#1A4331]/20 bg-white">
                    {quantity}
                  </span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(quantity + 1)}
                    className="border-2 border-[#1A4331]/20 text-[#1A4331] bg-transparent rounded-none w-9 h-9 hover:bg-[#1A4331] hover:text-[#F8F5F0]"
                  >
                    <Plus className="h-3 w-3" />
                  </Button>
                </div>
              </div>

              {/* Total */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-[#8A9A7A]">Tổng cộng</span>
                <span className="text-2xl font-bold text-[#1A4331]">
                  {formatPrice(totalPrice)}
                </span>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <Button
                  size="lg"
                  className="flex-1 bg-[#1A4331] text-[#F8F5F0] hover:bg-[#8A9A7A] rounded-none h-12 font-bold text-sm"
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Thêm vào giỏ hàng
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setIsFavorite(!isFavorite)}
                  className={`rounded-none w-12 h-12 border-2 bg-transparent ${
                    isFavorite
                      ? "text-red-500 border-red-300"
                      : "text-[#1A4331] border-[#1A4331]/20 hover:border-[#1A4331]"
                  }`}
                >
                  <Heart
                    className={`h-5 w-5 ${isFavorite ? "fill-red-500" : ""}`}
                  />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details - Ingredients info */}
        <div className="mt-12 bg-white border border-[#1A4331]/10 p-6">
          <h3 className="text-sm font-bold text-[#1A4331] uppercase tracking-wider mb-4 flex items-center gap-2">
            <Leaf className="h-4 w-4 text-[#8A9A7A]" />
            Thông tin sản phẩm
          </h3>
          <div className="grid gap-4 sm:grid-cols-3 text-sm">
            <div>
              <span className="text-[#8A9A7A] text-xs uppercase tracking-wider">
                Dòng sản phẩm
              </span>
              <p className="mt-1 font-bold text-[#1A4331]">
                {regions[product.region]}
              </p>
            </div>
            <div>
              <span className="text-[#8A9A7A] text-xs uppercase tracking-wider">
                Thương hiệu
              </span>
              <p className="mt-1 font-bold text-[#1A4331]">
                {brands[product.brand]}
              </p>
            </div>
            <div>
              <span className="text-[#8A9A7A] text-xs uppercase tracking-wider">
                Giá gốc (size M)
              </span>
              <p className="mt-1 font-bold text-[#1A4331]">
                {formatPrice(product.price)}
              </p>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-12 pb-8">
            <h2 className="text-lg font-bold text-[#1A4331] mb-5 pb-3 border-b border-[#1A4331]/10 uppercase tracking-wider">
              Có thể bạn thích
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {relatedProducts.map((p) => (
                <Link key={p.id} to={`/shop/products/${p.id}`}>
                  <div className="group bg-white border border-[#1A4331]/15 p-3 transition-all duration-200 hover:-translate-y-1 hover:shadow-[3px_3px_0px_rgba(26,67,49,0.08)]">
                    <div className="relative aspect-square overflow-hidden border border-[#1A4331]/10 mb-3">
                      <img
                        src={p.image || "/placeholder.svg"}
                        alt={p.name}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <h3 className="font-bold text-[#1A4331] text-sm line-clamp-1 mb-1">
                      {p.name}
                    </h3>
                    <p className="text-xs text-[#8A9A7A] mb-1">
                      {brands[p.brand]} • {regions[p.region]}
                    </p>
                    <p className="text-sm font-bold text-[#1A4331]">
                      {formatPrice(p.price)}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
