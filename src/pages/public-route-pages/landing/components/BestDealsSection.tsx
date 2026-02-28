import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card.tsx";
import { Button } from "@/components/ui/button.tsx";
import { ArrowRight, Sparkles } from "lucide-react";

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

export function BestDealsSection() {
  return (
    <section className="space-y-12">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between border-b-4 border-[#1A4331] pb-6 gap-4">
        <div>
          <p className="text-[#8A9A7A] font-bold text-lg mb-2 flex items-center gap-2">
            <Sparkles className="w-5 h-5" /> PHA CHẾ MỚI MỖI NGÀY
          </p>
          <h3 className="text-4xl md:text-5xl pixel-text text-[#1A4331] drop-shadow-[2px_2px_0px_#8A9A7A]">
            Sản Phẩm Bán Chạy
          </h3>
        </div>
        <Link
          to="/shop"
          className="text-lg font-bold bg-[#1A4331] text-[#F8F5F0] px-6 py-2 pixel-button hover:bg-[#8A9A7A] flex items-center gap-2 w-fit shadow-[4px_4px_0px_rgba(0,0,0,0.2)]"
        >
          Toàn Bộ Thực Đơn <ArrowRight className="h-5 w-5" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {bestDeals.map((item, i) => (
          <Card
            key={i}
            className="group border-0 bg-transparent shadow-none h-full"
          >
            {/* Item Container */}
            <div className="pixel-border bg-white p-5 h-full flex flex-col relative transition-transform duration-200 hover:-translate-y-2 hover:shadow-[4px_4px_0px_#1A4331]">
              {/* Floating Pixel Badge */}
              {item.badge && (
                <div className="absolute -top-4 -right-4 z-20 bg-[#D2A676] text-[#1A4331] border-2 border-[#1A4331] font-black px-4 py-1 text-sm shadow-[4px_4px_0px_#1A4331] animate-bounce">
                  ★ {item.badge}
                </div>
              )}

              {/* Image Display */}
              <div className="aspect-square bg-[#8A9A7A]/20 border-2 border-[#1A4331] p-2 mb-6 relative overflow-hidden">
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

                {/* Taste Profile */}
                <div className="space-y-2 mt-2 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-10 font-bold text-[#8A9A7A]">ĐƯỜNG</span>
                    <div className="flex-1 h-3 border-2 border-[#1A4331] bg-white">
                      <div
                        className="h-full bg-[#D2A676]"
                        style={{ width: `${item.stats.sweet}%` }}
                      />
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-10 font-bold text-[#1A4331]">ĐÁ</span>
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
                  <div className="text-xl md:text-2xl font-black text-[#1A4331] bg-[#F8F5F0] px-3 py-1 mb-4 border-l-4 border-[#1A4331] inline-block shadow-[2px_2px_0px_rgba(26,67,49,0.2)]">
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
  );
}
