"use client";

import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Leaf, Coffee } from "lucide-react";

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
      "Lục trà ủ lạnh phủ đầy trái cây nhiệt đới tươi mát. Cú hích năng lượng cho ngày mới!",
    image: "https://picsum.photos/seed/fruittea/1200/800",
    bgColor: "bg-[#1A4331]", // Forest Green
    textColor: "text-[#F8F5F0]",
  },
];

export function HeroCarousel() {
  const plugin = React.useRef(
    Autoplay({ delay: 6000, stopOnInteraction: true }),
  );

  return (
    <section className="relative group pixel-border bg-[#F8F5F0] shadow-[4px_4px_0px_#1A4331] transition-transform hover:-translate-y-1 hover:-translate-x-1 lg:hover:shadow-[6px_6px_0px_#1A4331] duration-300">
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
                <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-24 z-10 w-full md:w-3/5 pt-14 md:pt-16 pb-8">
                  <div className={`space-y-5 ${banner.textColor}`}>
                    {/* Subtitle Badge */}
                    <div className="inline-flex items-center gap-2 bg-[#F8F5F0] text-[#1A4331] px-4 py-1.5 border-2 border-[#1A4331] shadow-[4px_4px_0px_rgba(0,0,0,0.2)] transform -rotate-1 hover:rotate-0 transition-transform">
                      <Leaf className="w-4 h-4" />
                      <span className="font-bold text-sm tracking-widest uppercase">
                        {banner.subtitle}
                      </span>
                    </div>

                    {/* Title */}
                    <h2 className="text-4xl md:text-6xl pixel-text uppercase leading-[1.1] drop-shadow-[4px_4px_0px_rgba(26,67,49,0.3)] tracking-tight">
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
                        Đặt Hàng Ngay
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
  );
}
