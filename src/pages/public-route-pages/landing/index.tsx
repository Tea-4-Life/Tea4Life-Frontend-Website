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
import { Card } from "@/components/ui/card.tsx";
import { Button } from "@/components/ui/button.tsx";
import {
  ArrowRight,
  Leaf,
  Sparkles,
  Coffee,
  Sprout,
  Droplets,
  Sun,
  Star,
  MessageSquare,
  Mail,
} from "lucide-react";

// --- Theme Colors ---
// Forest Green: #1A4331
// Sage Green: #8A9A7A
// Cream White: #F8F5F0
// Pixel Borders: #1A4331

// --- Dữ liệu Banner ---
const banners = [
  {
    title: "MATCHA LATTE TƯƠI",
    subtitle: "Mới Ra Mắt",
    description:
      "Matcha hữu cơ hái thủ công hòa quyện cùng sữa kem tươi mềm mịn. Sự cân bằng hoàn hảo giữa thiên nhiên và hương vị.",
    image: "https://picsum.photos/seed/matcha/1200/800",
    bgColor: "bg-[#8A9A7A]", // Sage Green
    textColor: "text-[#F8F5F0]",
  },
  {
    title: "HỒNG TRÀ SỮA ĐẶC TRƯNG",
    subtitle: "Hương Vị Truyền Thống",
    description:
      "Sự kết hợp hoài niệm giữa hồng trà hảo hạng và kem béo ngậy. Gợi nhớ về những ngày tháng tươi đẹp.",
    image: "https://picsum.photos/seed/milktea/1200/800",
    bgColor: "bg-[#D2A676]", // Caramel/Soft Brown
    textColor: "text-[#1A4331]",
  },
  {
    title: "LỤC TRÀ TRÁI CÂY NHIỆT ĐỚI",
    subtitle: "Sảng Khoái Tinh Thần",
    description:
      "Lục trà ủ lạnh phủ đầy trái cây nhiệt đới tươi mát. Cú hích năng lượng 16-bit cho ngày mới!",
    image: "https://picsum.photos/seed/fruittea/1200/800",
    bgColor: "bg-[#1A4331]", // Forest Green
    textColor: "text-[#F8F5F0]",
  },
];

// --- Dữ liệu Danh mục (Pixel Style) ---
const categories = [
  { name: "TRÀ_SỮA", icon: "🍵", class: "bg-[#8A9A7A]" },
  { name: "TRÀ_TRÁI_CÂY", icon: "🍓", class: "bg-[#D2A676]" },
  { name: "MATCHA", icon: "🌱", class: "bg-[#1A4331]" },
  { name: "TOPPING", icon: "🍘", class: "bg-[#1A4331]" },
];

// --- Dữ liệu Sản phẩm Ưu đãi (Best Deals) ---
const bestDeals = [
  {
    name: "Matcha Latte",
    price: "45.000đ",
    image: "https://picsum.photos/seed/matcha/400/400",
    badge: "TƯƠI MỚI", // Pixel reference
    stats: { sweet: 40, ice: 100 },
  },
  {
    name: "Hồng Trà Sữa",
    price: "35.000đ",
    image: "https://picsum.photos/seed/milktea/400/400",
    badge: null,
    stats: { sweet: 80, ice: 50 },
  },
  {
    name: "Trà Xanh Xoài",
    price: "40.000đ",
    image: "https://picsum.photos/seed/mango/400/400",
    badge: "HỮU CƠ",
    stats: { sweet: 60, ice: 100 },
  },
  {
    name: "Sữa Tươi Trân Châu Đường Đen",
    price: "45.000đ",
    image: "https://picsum.photos/seed/boba/400/400",
    badge: "BÁN CHẠY",
    stats: { sweet: 100, ice: 50 },
  },
];

export default function LandingPage() {
  const plugin = React.useRef(
    Autoplay({ delay: 6000, stopOnInteraction: true }),
  );

  return (
    <div className="min-h-screen bg-[#F8F5F0] text-[#1A4331] pb-24 font-mono overflow-hidden relative">
      {/* Decorative Background Grid */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.03] z-0"
        style={{
          backgroundImage:
            "linear-gradient(#1A4331 1px, transparent 1px), linear-gradient(90deg, #1A4331 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      ></div>

      {/* --- INTRODUCTION VIDEO --- */}
      <section className="relative w-full h-[60vh] md:h-[80vh] border-b-8 border-[#1A4331] overflow-hidden z-10">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover filter contrast-125 saturate-110"
        >
          <source src="/introduce-vid.webm" type="video/webm" />
        </video>

        {/* Retro scanline overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] pointer-events-none opacity-30 z-10" />

        <div className="absolute inset-0 bg-black/40 z-10" />

        <div className="absolute inset-0 flex flex-col items-center justify-center z-20 text-center px-4 gap-6">
          <h1 className="text-6xl md:text-9xl pixel-text text-[#F8F5F0] drop-shadow-[6px_6px_0px_#1A4331] animate-[pulse_3s_ease-in-out_infinite]">
            TEA4LIFE
          </h1>
          <p className="text-xl md:text-3xl font-bold font-sans text-[#F8F5F0] bg-[#1A4331] px-8 py-3 border-4 border-[#F8F5F0] shadow-[6px_6px_0px_#1A4331] tracking-widest backdrop-blur-sm uppercase">
            Nơi Thiên Nhiên Hội Ngộ Hoài Niệm
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-24 pt-16 md:pt-24 relative z-10">
        {/* --- SECTION 1: HERO CAROUSEL --- */}
        <section className="relative group pixel-border bg-[#F8F5F0] shadow-[8px_8px_0px_#1A4331] transition-transform hover:-translate-y-1 hover:-translate-x-1 lg:hover:shadow-[12px_12px_0px_#1A4331] duration-300">
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
                    className={`relative h-[550px] md:h-[600px] w-full ${banner.bgColor} overflow-hidden group/slide`}
                  >
                    {/* Retro Pixel Window Controls Decor */}
                    <div className="absolute top-4 left-4 flex gap-2 z-20 bg-white/20 p-2 border-2 border-[#1A4331] shadow-[2px_2px_0px_#1A4331] backdrop-blur-sm hidden md:flex">
                      <div className="w-3 h-3 bg-red-400 border border-[#1A4331]" />
                      <div className="w-3 h-3 bg-yellow-400 border border-[#1A4331]" />
                      <div className="w-3 h-3 bg-green-400 border border-[#1A4331]" />
                    </div>

                    {/* Content */}
                    <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-24 z-10 w-full md:w-3/5">
                      <div className={`space-y-8 ${banner.textColor}`}>
                        {/* Subtitle Badge */}
                        <div className="inline-flex items-center gap-2 bg-[#F8F5F0] text-[#1A4331] px-4 py-1.5 border-2 border-[#1A4331] shadow-[4px_4px_0px_rgba(0,0,0,0.2)] transform -rotate-1 hover:rotate-0 transition-transform">
                          <Leaf className="w-4 h-4" />
                          <span className="font-bold text-sm tracking-widest uppercase">
                            {banner.subtitle}
                          </span>
                        </div>

                        {/* Title */}
                        <h2 className="text-5xl md:text-8xl pixel-text uppercase leading-[0.9] drop-shadow-[4px_4px_0px_rgba(26,67,49,0.3)] tracking-tighter">
                          {banner.title}
                        </h2>

                        {/* Description Box */}
                        <div className="relative">
                          <div className="absolute inset-0 bg-black/10 translate-x-2 translate-y-2 border-2 border-transparent" />
                          <p className="relative text-lg md:text-xl font-bold font-sans max-w-md bg-[#F8F5F0] text-[#1A4331] p-5 md:p-6 border-4 border-[#1A4331]">
                            {banner.description}
                          </p>
                        </div>

                        {/* CTA Button */}
                        <Button
                          size="lg"
                          className="bg-[#1A4331] text-[#F8F5F0] hover:bg-white hover:text-[#1A4331] pixel-button text-xl font-bold px-12 h-16 group/btn mt-4 relative overflow-hidden"
                        >
                          <span className="relative z-10 flex items-center gap-3">
                            <Coffee className="w-6 h-6 group-hover/btn:animate-bounce" />
                            [ ĐẶT_HÀNG_NGAY ]
                          </span>
                          <div className="absolute inset-0 bg-[#8A9A7A] w-0 group-hover/btn:w-full transition-all duration-300 ease-out z-0" />
                        </Button>
                      </div>
                    </div>

                    {/* Background Image Layer with specific masking */}
                    <div className="absolute right-0 top-0 h-full w-full md:w-1/2 select-none overflow-hidden flex items-center justify-end z-[5]">
                      <div className="absolute inset-0 bg-gradient-to-r from-inherit via-transparent to-transparent z-[1]" />
                      <div className="relative w-full h-full flex items-center justify-center pt-12 pr-12 group-hover/slide:scale-105 transition-transform duration-1000 hidden sm:flex">
                        <div className="relative">
                          <div className="absolute inset-0 bg-[#F8F5F0] translate-x-4 translate-y-4 pixel-border opacity-30" />
                          <img
                            src={banner.image}
                            className="relative w-[300px] h-[300px] md:w-[450px] md:h-[450px] object-cover border-8 border-current pixel-border z-10 shadow-2xl"
                            alt={banner.title}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            {/* Carousel Controls */}
            <div className="hidden lg:block">
              <CarouselPrevious className="left-8 w-14 h-14 pixel-button bg-[#F8F5F0] text-[#1A4331] hover:bg-[#8A9A7A] hover:text-[#F8F5F0] border-4 opacity-50 group-hover:opacity-100 transition-opacity" />
              <CarouselNext className="right-8 w-14 h-14 pixel-button bg-[#F8F5F0] text-[#1A4331] hover:bg-[#8A9A7A] hover:text-[#F8F5F0] border-4 opacity-50 group-hover:opacity-100 transition-opacity" />
            </div>
          </Carousel>
        </section>

        {/* --- SECTION 2: CATEGORIES (Select Character Style) --- */}
        <section className="space-y-12">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between border-b-8 border-[#1A4331] pb-6 gap-4">
            <div>
              <p className="text-[#8A9A7A] font-bold text-lg mb-2 flex items-center gap-2">
                <Leaf className="w-5 h-5" /> KHÁM PHÁ THIÊN NHIÊN
              </p>
              <h3 className="text-4xl md:text-5xl pixel-text text-[#1A4331] drop-shadow-[2px_2px_0px_#8A9A7A]">
                THỰC_ĐƠN_CỦA_CHÚNG_TÔI
              </h3>
            </div>
            <Link
              to="/categories"
              className="text-lg font-bold bg-[#1A4331] text-[#F8F5F0] px-6 py-2 pixel-button hover:bg-[#8A9A7A] flex items-center gap-2 w-fit"
            >
              XEM_TẤT_CẢ <ArrowRight className="h-5 w-5" />
            </Link>
          </div>

          {/* Categories Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {categories.map((cat, i) => (
              <div
                key={i}
                className="pixel-border bg-white flex flex-col items-center p-8 cursor-pointer group hover:-translate-y-2 hover:shadow-[8px_8px_0px_#1A4331] transition-all duration-200 relative overflow-hidden"
              >
                {/* Background sliding effect */}
                <div
                  className={`absolute inset-0 ${cat.class} translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out opacity-90`}
                />

                <div className="text-7xl mb-6 grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300 z-10 drop-shadow-xl">
                  {cat.icon}
                </div>

                <span className="font-bold tracking-widest text-center w-full bg-[#1A4331] text-[#F8F5F0] py-2 border-2 border-transparent group-hover:bg-[#F8F5F0] group-hover:text-[#1A4331] group-hover:border-[#1A4331] text-lg z-10 transition-colors uppercase">
                  [ {cat.name} ]
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* --- SECTION 3: BEST DEALS (Inventory Grid) --- */}
        <section className="space-y-12">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between border-b-8 border-[#1A4331] pb-6 gap-4">
            <div>
              <p className="text-[#8A9A7A] font-bold text-lg mb-2 flex items-center gap-2">
                <Sparkles className="w-5 h-5" /> PHA CHẾ MỚI MỖI NGÀY
              </p>
              <h3 className="text-4xl md:text-5xl pixel-text text-[#1A4331] drop-shadow-[2px_2px_0px_#8A9A7A]">
                SẢN_PHẨM_BÁN_CHẠY
              </h3>
            </div>
            <Link
              to="/shop"
              className="text-lg font-bold bg-[#1A4331] text-[#F8F5F0] px-6 py-2 pixel-button hover:bg-[#8A9A7A] flex items-center gap-2 w-fit shadow-[4px_4px_0px_rgba(0,0,0,0.2)]"
            >
              TOÀN_BỘ_THỰC_ĐƠN <ArrowRight className="h-5 w-5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {bestDeals.map((item, i) => (
              <Card
                key={i}
                className="group border-0 bg-transparent shadow-none h-full"
              >
                {/* Item Container */}
                <div className="pixel-border bg-white p-5 h-full flex flex-col relative transition-transform duration-200 hover:-translate-y-2 hover:shadow-[8px_8px_0px_#1A4331]">
                  {/* Floating Pixel Badge */}
                  {item.badge && (
                    <div className="absolute -top-4 -right-4 z-20 bg-[#D2A676] text-[#1A4331] border-4 border-[#1A4331] font-black px-4 py-1 text-sm shadow-[4px_4px_0px_#1A4331] animate-bounce">
                      ★ {item.badge}
                    </div>
                  )}

                  {/* Image Display */}
                  <div className="aspect-square bg-[#8A9A7A]/20 border-4 border-[#1A4331] p-2 mb-6 relative overflow-hidden">
                    <div className="w-full h-full relative border-2 border-[#1A4331]">
                      <img
                        src={item.image}
                        className="h-full w-full object-cover filter contrast-125 saturate-50 group-hover:saturate-100 transition-all duration-300"
                        alt={item.name}
                      />
                    </div>
                  </div>

                  {/* Item Details */}
                  <div className="flex flex-col flex-1 space-y-4">
                    <h4 className="font-bold text-[#1A4331] text-xl uppercase leading-tight line-clamp-2 pixel-text tracking-normal">
                      {item.name}
                    </h4>

                    {/* Taste Profile (Instead of HP/MP) */}
                    <div className="space-y-2 mt-2 font-mono text-xs">
                      <div className="flex items-center gap-2">
                        <span className="w-10 font-bold text-[#8A9A7A]">
                          ĐƯỜNG
                        </span>
                        <div className="flex-1 h-3 border-2 border-[#1A4331] bg-white">
                          <div
                            className="h-full bg-[#D2A676]"
                            style={{ width: `${item.stats.sweet}%` }}
                          />
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-10 font-bold text-[#1A4331]">
                          ĐÁ
                        </span>
                        <div className="flex-1 h-3 border-2 border-[#1A4331] bg-white">
                          <div
                            className="h-full bg-[#8A9A7A]"
                            style={{ width: `${item.stats.ice}%` }}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Price and Action */}
                    <div className="mt-auto pt-4 border-t-2 border-dashed border-[#1A4331]/30">
                      <div className="font-mono text-xl md:text-2xl font-black text-[#1A4331] bg-[#F8F5F0] px-3 py-1 mb-4 border-l-4 border-[#1A4331] inline-block shadow-[2px_2px_0px_rgba(26,67,49,0.2)]">
                        {item.price}
                      </div>

                      <Button className="w-full bg-[#1A4331] text-[#F8F5F0] hover:bg-[#8A9A7A] hover:text-[#1A4331] pixel-button h-14 flex justify-between items-center group-hover:bg-[#8A9A7A] group-hover:text-[#F8F5F0] transition-colors text-[16px] xl:text-lg">
                        <span className="font-bold uppercase">Tùy chỉnh</span>
                        <span className="text-2xl group-hover:translate-x-2 transition-transform">
                          ➔
                        </span>
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* --- SECTION 4: THE CRAFT (How to play) --- */}
        <section className="space-y-12 pb-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between border-b-8 border-[#1A4331] pb-6 gap-4">
            <div>
              <p className="text-[#8A9A7A] font-bold text-lg mb-2">
                ● QUY TRÌNH CẢỦA CHÚNG TÔI
              </p>
              <h3 className="text-4xl md:text-5xl pixel-text text-[#1A4331] drop-shadow-[2px_2px_0px_#8A9A7A]">
                NGHỆ_THUẬT_PHA_CHẾ
              </h3>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            <div className="absolute top-1/2 left-0 w-full h-2 bg-[#1A4331] -translate-y-1/2 hidden md:block z-0 opacity-20 border-y border-dashed border-[#F8F5F0]" />

            {[
              {
                icon: <Sprout className="w-10 h-10" />,
                title: "1. LÁ TRÀ TƯƠI",
                desc: "Được hái thủ công từ các nông trại hữu cơ vùng cao nguyên ngập sương.",
              },
              {
                icon: <Droplets className="w-10 h-10" />,
                title: "2. Ủ LẠNH TINH KHIẾT",
                desc: "Ủ lạnh suốt 12 giờ đồng hồ để chắt lọc hương vị tinh túy nhất.",
              },
              {
                icon: <Sun className="w-10 h-10" />,
                title: "3. HƯƠNG VỊ RỰC RỠ",
                desc: "Phục vụ tươi mát để thắp sáng ngày dài và tăng cường vẻ khỏe khoắn của bạn.",
              },
            ].map((step, index) => (
              <div
                key={index}
                className="relative z-10 pixel-border bg-[#F8F5F0] p-8 text-center group hover:-translate-y-2 transition-transform duration-300"
              >
                <div className="w-20 h-20 mx-auto bg-[#1A4331] text-[#F8F5F0] flex items-center justify-center pixel-border mb-6 group-hover:bg-[#8A9A7A] group-hover:text-[#1A4331] transition-colors shadow-[4px_4px_0px_#1A4331] rounded-full">
                  {step.icon}
                </div>
                <h4 className="font-bold text-2xl text-[#1A4331] pixel-text mb-4">
                  {step.title}
                </h4>
                <p className="text-[#1A4331] font-bold font-sans bg-white p-4 pixel-border border-2">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* --- SECTION 5: OUR STORY --- */}
        <section className="relative pixel-border bg-white shadow-[8px_8px_0px_#1A4331] overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="p-8 md:p-16 flex flex-col justify-center space-y-6">
              <div className="inline-flex items-center gap-2 bg-[#F8F5F0] text-[#1A4331] px-4 py-1.5 border-2 border-[#1A4331] w-fit">
                <Leaf className="w-4 h-4" />
                <span className="font-bold text-sm tracking-widest uppercase">
                  NGUỒN GỐC THƯƠNG HIỆU
                </span>
              </div>
              <h3 className="text-4xl md:text-5xl pixel-text text-[#1A4331] leading-tight">
                THIÊN NHIÊN HỘI NGỘ <br />
                <span className="text-[#8A9A7A]">SỰ HOÀI NIỆM.</span>
              </h3>
              <p className="text-lg font-bold font-sans text-[#1A4331] leading-relaxed">
                Chúng tôi hiểu rằng cuộc sống hiện đại đôi khi thật ngột ngạt.
                Đó là lý do Tea4Life ra đời: một không gian nơi sự đơn giản, mộc
                mạc của những khối pixel 16-bit hòa quyện hoàn hảo cùng sự thuần
                khiết của những lá trà hữu cơ tự nhiên.
              </p>
              <p className="text-lg font-bold font-sans text-[#1A4331] leading-relaxed">
                Hãy cho bản thân giây phút nghỉ ngơi, nhâm nhi một ly trà ngon
                và tận hưởng khoảnh khắc bình yên trong thế giới pixel của chúng
                tôi.
              </p>
              <Button className="bg-[#1A4331] text-[#F8F5F0] hover:bg-[#8A9A7A] pixel-button w-fit text-lg font-bold px-8 mt-4 uppercase">
                [ ĐỌC_THÊM ]
              </Button>
            </div>
            <div className="relative h-[400px] md:h-auto border-t-8 md:border-t-0 md:border-l-8 border-[#1A4331]">
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A4331] to-transparent opacity-20 z-10" />
              <img
                src="https://picsum.photos/seed/teafarm/800/800"
                className="w-full h-full object-cover filter contrast-125 saturate-50"
                alt="Tea Farm"
              />
            </div>
          </div>
        </section>

        {/* --- SECTION 6: TESTIMONIALS --- */}
        <section className="space-y-12">
          <div className="text-center space-y-4 border-b-8 border-[#1A4331] pb-6">
            <h3 className="text-4xl md:text-5xl pixel-text text-[#1A4331] drop-shadow-[2px_2px_0px_#8A9A7A]">
              NHẬN_XÉT_CỦA_NGƯỜI_CHƠI
            </h3>
            <p className="text-[#8A9A7A] font-bold text-lg">
              Cộng đồng nói gì về chúng tôi.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((_, i) => (
              <div
                key={i}
                className="pixel-border bg-white p-8 relative group hover:-translate-y-2 hover:shadow-[6px_6px_0px_#1A4331] transition-transform"
              >
                <MessageSquare className="absolute top-4 right-4 text-[#8A9A7A] opacity-20 w-12 h-12" />
                <div className="flex gap-1 text-[#D2A676] mb-4">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} className="w-5 h-5 fill-current" />
                  ))}
                </div>
                <p className="font-bold font-sans text-[#1A4331] text-lg mb-8 italic">
                  "Chân ái thực sự! Ly matcha ngon nhất mà mình từng uống. Phong
                  cách thả dáng retro khiến trải nghiệm trọn vẹn gấp 10 lần!"
                </p>
                <div className="flex items-center gap-4 border-t-4 border-[#1A4331] pt-4 border-dashed">
                  <div className="w-12 h-12 flex-shrink-0 bg-[#8A9A7A] pixel-border border-2 border-[#1A4331] overflow-hidden">
                    <img
                      src={`https://api.dicebear.com/7.x/pixel-art/svg?seed=user${i}`}
                      alt="Avatar"
                    />
                  </div>
                  <div>
                    <p className="font-bold text-[#1A4331] uppercase line-clamp-1">
                      Pixel_Fan_{i}
                    </p>
                    <p className="text-sm text-[#8A9A7A] font-bold">
                      Người Pha Chế Cấp {10 + i}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* --- SECTION 7: NEWSLETTER --- */}
        <section className="pixel-border bg-[#1A4331] text-[#F8F5F0] p-8 md:p-16 relative overflow-hidden group">
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                "linear-gradient(#F8F5F0 2px, transparent 2px), linear-gradient(90deg, #F8F5F0 2px, transparent 2px)",
              backgroundSize: "40px 40px",
            }}
          />
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1 space-y-6 text-center md:text-left">
              <div className="inline-block bg-[#D2A676] text-[#1A4331] px-4 py-1 font-bold flex items-center gap-2 border-2 border-[#1A4331] w-fit mx-auto md:mx-0 shadow-[4px_4px_0px_rgba(0,0,0,0.5)]">
                <Mail className="w-4 h-4" /> THAM GIA CỘNG ĐỒNG
              </div>
              <h3 className="text-4xl md:text-6xl pixel-text uppercase">
                NHẬN TIN MỚI NHẤT
              </h3>
              <p className="text-lg md:text-xl font-bold font-sans max-w-lg bg-black/20 p-4 border-l-4 border-[#8A9A7A]">
                Đăng ký nhận bản tin để không bỏ lỡ các mã giảm giá hấp dẫn,
                thức uống theo mùa mới ra mắt, và các mẹo sống xanh hữu ích.
              </p>
            </div>
            <div className="w-full md:w-auto flex-1 max-w-md">
              <div className="pixel-border bg-white p-6 shadow-[8px_8px_0px_#8A9A7A] transform md:rotate-2 group-hover:rotate-0 transition-transform duration-300">
                <form className="flex flex-col gap-4">
                  <div className="space-y-2">
                    <label className="font-bold text-[#1A4331] text-sm uppercase">
                      Địa chỉ Email của bạn
                    </label>
                    <input
                      type="email"
                      placeholder="yeuthiennhien@tea.com"
                      className="w-full h-14 bg-[#F8F5F0] border-4 border-[#1A4331] px-4 font-mono font-bold text-[#1A4331] focus:outline-none focus:bg-white placeholder-[#8A9A7A]"
                    />
                  </div>
                  <Button className="w-full bg-[#1A4331] text-[#F8F5F0] hover:bg-[#8A9A7A] hover:text-[#1A4331] pixel-button h-14 text-lg font-bold">
                    ĐĂNG KÝ NGAY
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
