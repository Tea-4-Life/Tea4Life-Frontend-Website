"use client";

import * as React from "react";
import { Link } from "react-router-dom";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel.tsx";
import { Card, CardContent } from "@/components/ui/card.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Badge } from "@/components/ui/badge.tsx";
import { Star, ShoppingCart, ArrowRight } from "lucide-react";

// --- Dữ liệu Banner ---
const banners = [
  {
    title: "TRÀ SỮA TRÂN CHÂU",
    subtitle: "Vị ngon khó cưỡng",
    description:
      "Hương vị trà sữa truyền thống kết hợp trân châu dai giòn sần sật.",
    image:
      "https://images.unsplash.com/photo-1558852063-8a39e8027a05?q=80&w=1200&auto=format&fit=crop",
    bgColor: "bg-[#d97706]", // amber-600
  },
  {
    title: "HỒNG TRÀ MACCHIATO",
    subtitle: "Lớp kem sánh mịn",
    description:
      "Hồng trà đậm vị quyện cùng lớp kem macchiato mặn ngọt béo ngậy.",
    image:
      "https://images.unsplash.com/photo-1623868612984-633dfbaf0fbb?q=80&w=1200&auto=format&fit=crop",
    bgColor: "bg-[#b91c1c]", // red-700
  },
  {
    title: "TRÀ TRÁI CÂY NHIỆT ĐỚI",
    subtitle: "Thanh mát ngày hè",
    description:
      "Trà tươi thanh mát kết hợp cùng trái cây nhiệt đới mọng nước.",
    image:
      "https://images.unsplash.com/photo-1524156868115-e696b44983db?q=80&w=1200&auto=format&fit=crop",
    bgColor: "bg-[#047857]", // emerald-700
  },
  {
    title: "SỮA TƯƠI TRÂN CHÂU",
    subtitle: "Ngọt ngào hương vị đường đen",
    description:
      "Sữa tươi thanh trùng thanh mát hòa quyện cùng trân châu đường đen đậm vị.",
    image:
      "https://images.unsplash.com/photo-1596803244618-8dbee441d70b?q=80&w=1200&auto=format&fit=crop",
    bgColor: "bg-[#1e1b4b]", // indigo-950
  },
];

// --- Dữ liệu Danh mục (Circle Style) ---
const categories = [
  { name: "Trà Sữa", icon: "🧋", color: "bg-orange-100" },
  { name: "Trà Trái Cây", icon: "🍹", color: "bg-yellow-100" },
  { name: "Hồng Trà", icon: "☕", color: "bg-red-100" },
  { name: "Macchiato", icon: "☁️", color: "bg-slate-100" },
  { name: "Sữa Tươi", icon: "🥛", color: "bg-blue-100" },
  { name: "Topping", icon: "🍮", color: "bg-amber-100" },
];

// --- Dữ liệu Sản phẩm Ưu đãi (Best Deals) ---
const bestDeals = [
  {
    name: "Trà Sữa Trân Châu Đường Đen",
    price: "45.000đ",
    oldPrice: "55.000đ",
    discount: "18%",
    image:
      "https://images.unsplash.com/photo-1596803244618-8dbee441d70b?q=80&w=400&auto=format&fit=crop",
  },
  {
    name: "Hồng Trà Macchiato",
    price: "39.000đ",
    oldPrice: "50.000đ",
    discount: "22%",
    image:
      "https://images.unsplash.com/photo-1623868612984-633dfbaf0fbb?q=80&w=400&auto=format&fit=crop",
  },
  {
    name: "Trà Đào Cam Sả",
    price: "42.000đ",
    oldPrice: "52.000đ",
    discount: "19%",
    image:
      "https://images.unsplash.com/photo-1498644349942-5b966cf1375d?q=80&w=400&auto=format&fit=crop",
  },
  {
    name: "Sữa Tươi Trân Châu",
    price: "35.000đ",
    oldPrice: "45.000đ",
    discount: "22%",
    image:
      "https://images.unsplash.com/photo-1558852063-8a39e8027a05?q=80&w=400&auto=format&fit=crop",
  },
  {
    name: "Trà Xanh Kem Phô Mai",
    price: "40.000đ",
    oldPrice: "50.000đ",
    discount: "20%",
    image:
      "https://images.unsplash.com/photo-1606758688404-58bc4499d30c?q=80&w=400&auto=format&fit=crop",
  },
];

export default function LandingPage() {
  const plugin = React.useRef(
    Autoplay({ delay: 4000, stopOnInteraction: true }),
  );

  return (
    <div className="min-h-screen bg-[#f8fafc] pb-20 font-sans">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12 pt-6">
        {/* --- SECTION 1: HERO CAROUSEL --- */}
        <section className="relative group overflow-hidden rounded-3xl shadow-2xl">
          <Carousel
            plugins={[plugin.current]}
            className="w-full"
            onMouseEnter={plugin.current.stop}
            onMouseLeave={plugin.current.reset}
          >
            <CarouselContent>
              {banners.map((banner, index) => (
                <CarouselItem key={index}>
                  <div
                    className={`relative h-87.5 md:h-112.5 w-full ${banner.bgColor}`}
                  >
                    <div className="absolute inset-0 flex items-center px-10 md:px-20 text-white z-10">
                      <div className="max-w-xl space-y-4">
                        <Badge className="bg-emerald-500/20 text-emerald-300 border-none px-3 py-1 text-sm">
                          {banner.subtitle}
                        </Badge>
                        <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-tight">
                          {banner.title}
                        </h2>
                        <p className="text-emerald-100/70 text-lg">
                          {banner.description}
                        </p>
                        <Button
                          size="lg"
                          className="bg-white text-emerald-900 hover:bg-emerald-50 font-bold px-10 rounded-xl transition-all hover:scale-105"
                        >
                          Mua Ngay
                        </Button>
                      </div>
                    </div>
                    {/* Background Image Layer */}
                    <div className="absolute right-0 top-0 h-full w-full md:w-3/5 select-none overflow-hidden">
                      <div className="absolute inset-0 bg-linear-to-r from-inherit via-transparent to-transparent z-1" />
                      <img
                        src={banner.image}
                        className="h-full w-full object-cover opacity-60 md:opacity-80 transition-transform duration-5000 hover:scale-110"
                        alt={banner.title}
                      />
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="hidden group-hover:block">
              <CarouselPrevious className="left-6 bg-white/10 border-none text-white hover:bg-white/30 backdrop-blur-md" />
              <CarouselNext className="right-6 bg-white/10 border-none text-white hover:bg-white/30 backdrop-blur-md" />
            </div>
          </Carousel>
        </section>

        {/* --- SECTION 2: SHOP BY CATEGORIES --- */}
        <section className="space-y-6">
          <div className="flex items-center justify-between border-b border-slate-200 pb-4">
            <h3 className="text-2xl font-black text-slate-800 uppercase tracking-tight">
              Danh Mục Đồ Uống
            </h3>
            <Link
              to="/categories"
              className="text-sm font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1 group"
            >
              Xem tất cả{" "}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
          <div className="flex justify-between gap-4 overflow-x-auto pb-4 no-scrollbar">
            {categories.map((cat) => (
              <div
                key={cat.name}
                className="flex flex-col items-center gap-4 min-w-27.5 cursor-pointer group"
              >
                <div
                  className={`h-24 w-24 ${cat.color} rounded-full flex items-center justify-center text-4xl shadow-sm transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-xl border-4 border-white`}
                >
                  {cat.icon}
                </div>
                <span className="text-sm font-bold text-slate-600 group-hover:text-emerald-600 transition-colors uppercase tracking-tighter">
                  {cat.name}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* --- SECTION 3: BEST DEALS (Grid Layout) --- */}
        <section className="space-y-6">
          <div className="flex items-center justify-between border-b border-slate-200 pb-4">
            <h3 className="text-2xl font-black text-slate-800 uppercase tracking-tight">
              Ưu Đãi Lớn Nhất
            </h3>
            <Link
              to="/shop"
              className="text-sm font-bold text-emerald-600 hover:text-emerald-700"
            >
              Xem tất cả
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {bestDeals.map((item) => (
              <Card
                key={item.name}
                className="group border-none shadow-sm hover:shadow-2xl transition-all duration-300 bg-white rounded-3xl overflow-hidden relative"
              >
                <Badge className="absolute top-0 right-0 z-10 bg-red-500 text-white rounded-bl-2xl rounded-tr-none px-3 py-2 font-black text-xs">
                  SALE {item.discount}
                </Badge>
                <CardContent className="p-0">
                  <div className="aspect-square bg-slate-50 overflow-hidden relative">
                    <img
                      src={item.image}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                      alt={item.name}
                    />
                    <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Button
                        size="icon"
                        className="rounded-full bg-emerald-600 hover:bg-emerald-700 shadow-xl"
                      >
                        <ShoppingCart className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="p-5 space-y-1">
                    <h4 className="text-sm font-bold text-slate-800 line-clamp-1 group-hover:text-emerald-700 transition-colors uppercase">
                      {item.name}
                    </h4>
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-black text-emerald-600">
                        {item.price}
                      </span>
                      <span className="text-xs text-slate-400 line-through font-medium">
                        {item.oldPrice}
                      </span>
                    </div>
                    <div className="flex items-center gap-0.5 pt-1">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <Star
                          key={i}
                          className="h-3 w-3 fill-amber-400 text-amber-400"
                        />
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
