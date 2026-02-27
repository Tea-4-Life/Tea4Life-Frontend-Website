import * as React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Leaf } from "lucide-react";

// --- Dữ liệu Danh mục (Pixel Style) ---
const categories = [
  { name: "TRÀ_SỮA", icon: "🍵", class: "bg-[#8A9A7A]" },
  { name: "TRÀ_TRÁI_CÂY", icon: "🍓", class: "bg-[#D2A676]" },
  { name: "MATCHA", icon: "🌱", class: "bg-[#1A4331]" },
  { name: "TOPPING", icon: "🍘", class: "bg-[#1A4331]" },
];

export function CategoriesSection() {
  return (
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
  );
}
