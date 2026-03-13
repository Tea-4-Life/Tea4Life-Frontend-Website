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
      <div className="flex flex-col md:flex-row md:items-end justify-between border-b-2 border-[#5c4033]/20 pb-6 gap-4">
        <div>
          <p className="text-[#d97743] font-bold text-lg mb-2 flex items-center gap-2">
            <Sparkles className="w-5 h-5" /> PHA CHẾ MỚI MỖI NGÀY
          </p>
          <h3 className="text-4xl md:text-5xl font-bold font-sans text-[#5c4033]">
            Sản Phẩm Bán Chạy
          </h3>
        </div>
        <Link
          to="/shop"
          className="text-lg font-semibold bg-[#5c4033] text-[#F8F5F0] px-6 py-2.5 rounded-full hover:bg-[#d97743] flex items-center gap-2 w-fit shadow-sm hover:shadow-md transition-all"
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
            <div className="pixel-border rounded-3xl bg-white p-5 h-full flex flex-col relative transition-transform duration-300 hover:-translate-y-2">
              {/* Floating Badge */}
              {item.badge && (
                <div className="absolute -top-3 -right-3 z-20 bg-[#d97743] text-white rounded-full font-bold px-4 py-1.5 text-xs shadow-md">
                  ★ {item.badge}
                </div>
              )}

              {/* Image Display */}
              <div className="aspect-square bg-[#F8F5F0] rounded-2xl p-2 mb-6 relative overflow-hidden group-hover:shadow-inner transition-shadow">
                <div className="w-full h-full relative rounded-2xl overflow-hidden">
                  <img
                    src={item.image}
                    className="h-full w-full object-cover transform group-hover:scale-110 transition-all duration-500"
                    alt={item.name}
                  />
                </div>
              </div>

              {/* Item Details */}
              <div className="flex flex-col flex-1 space-y-4 px-1">
                <h4 className="font-bold text-[#5c4033] text-xl leading-tight line-clamp-2 transition-colors group-hover:text-[#d97743]">
                  {item.name}
                </h4>

                {/* Taste Profile */}
                <div className="space-y-2 mt-2 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-10 font-bold text-[#b59b85]">ĐƯỜNG</span>
                    <div className="flex-1 h-2 rounded-full bg-[#f0e6d8] overflow-hidden">
                      <div
                        className="h-full bg-[#d0a775] rounded-full"
                        style={{ width: `${item.stats.sweet}%` }}
                      />
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-10 font-bold text-[#5c4033]">ĐÁ</span>
                    <div className="flex-1 h-2 rounded-full bg-[#f0e6d8] overflow-hidden">
                      <div
                        className="h-full bg-[#87b3e6] rounded-full"
                        style={{ width: `${item.stats.ice}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Price and Action */}
                <div className="mt-auto pt-4 border-t-2 border-dashed border-[#5c4033]/10">
                  <div className="text-xl md:text-2xl font-black text-[#5c4033] mb-4">
                    {item.price}
                  </div>

                  <Button className="w-full bg-[#5c4033] text-[#F8F5F0] rounded-full hover:bg-[#d97743] h-12 flex justify-between items-center transition-all text-[16px]">
                    <span className="font-semibold">Chọn mua</span>
                    <span className="text-lg group-hover:translate-x-2 transition-transform">
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
