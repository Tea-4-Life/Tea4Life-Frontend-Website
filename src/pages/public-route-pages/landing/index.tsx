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
    title: "TRÀ XANH THÁI NGUYÊN",
    subtitle: "Đệ nhất danh trà Việt",
    description: "Hương thơm cốm non, vị chát dịu ngọt hậu đặc trưng.",
    image:
      "https://images.unsplash.com/photo-1597318181409-cf64d0b5d8a2?q=80&w=1200&auto=format&fit=crop",
    bgColor: "bg-[#14532d]", // Green 900
  },
  {
    title: "TRÀ THẢO MỘC",
    subtitle: "An nhiên trong từng nhịp thở",
    description:
      "Sự hòa quyện của hoa cúc, kỷ tử và táo đỏ, giúp thanh lọc cơ thể và thư giãn tâm trí.",
    image:
      "https://images.unsplash.com/photo-1563911892437-1feda0179e1b?q=80&w=1200&auto=format&fit=crop",
    bgColor: "bg-[#78350f]", // Amber 900 (Màu ấm của thảo mộc)
  },
  {
    title: "TRÀ TUYẾT CỔ THỤ",
    subtitle: "Báu vật từ đỉnh Tây Côn Lĩnh",
    description:
      "Thu hoạch từ những cây trà hàng trăm năm tuổi, phủ trắng lớp lông tuyết mịn màng.",
    image:
      "https://images.unsplash.com/photo-1594631252845-29fc4cc8cde9?q=80&w=1200&auto=format&fit=crop",
    bgColor: "bg-[#0c4a6e]",
  },
  {
    title: "TRÀ SEN TÂY HỒ",
    subtitle: "Quốc ẩm trong từng chén trà",
    description:
      "Sự kết hợp hoàn hảo giữa trà xanh Tân Cương thượng hạng và hương sen bách diệp hồ Tây.",
    image:
      "https://images.unsplash.com/photo-1576092768241-dec231879fc3?q=80&w=1200&auto=format&fit=crop",
    bgColor: "bg-[#831843]",
  },
];

// --- Dữ liệu Danh mục (Circle Style) ---
const categories = [
  { name: "Trà Xanh", icon: "🍃", color: "bg-emerald-100" },
  { name: "Trà Ô Long", icon: "🍵", color: "bg-green-100" },
  { name: "Trà Sen", icon: "🪷", color: "bg-rose-100" },
  { name: "Trà Thảo Mộc", icon: "🌸", color: "bg-amber-100" },
  { name: "Phụ Kiện", icon: "🏺", color: "bg-slate-100" },
  { name: "Quà Tặng", icon: "🎁", color: "bg-red-100" },
];

// --- Dữ liệu Sản phẩm Ưu đãi (Best Deals) ---
const bestDeals = [
  {
    name: "Trà Ô Long Mộc Châu",
    price: "350.000đ",
    oldPrice: "580.000đ",
    discount: "40%",
    image:
      "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?q=80&w=400&auto=format&fit=crop",
  },
  {
    name: "Trà Xanh Thái Nguyên",
    price: "220.000đ",
    oldPrice: "280.000đ",
    discount: "21%",
    image:
      "https://images.unsplash.com/photo-1556679343-c7306c1976bc?q=80&w=400&auto=format&fit=crop",
  },
  {
    name: "Trà Sen Tây Hồ",
    price: "450.000đ",
    oldPrice: "550.000đ",
    discount: "18%",
    image:
      "https://images.unsplash.com/photo-1594631252845-29fc4cc8cde9?q=80&w=400&auto=format&fit=crop",
  },
  {
    name: "Trà Tuyết Cổ Thụ",
    price: "890.000đ",
    oldPrice: "1.100.000đ",
    discount: "19%",
    image:
      "https://images.unsplash.com/photo-1576092768241-dec231879fc3?q=80&w=400&auto=format&fit=crop",
  },
  {
    name: "Trà Hoa Cúc Vàng",
    price: "185.000đ",
    oldPrice: "230.000đ",
    discount: "20%",
    image:
      "https://images.unsplash.com/photo-1563911892437-1feda0179e1b?q=80&w=400&auto=format&fit=crop",
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
              Danh Mục Trà
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
