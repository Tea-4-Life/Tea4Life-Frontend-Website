"use client";

import { useNavigate } from "react-router-dom";
import { Leaf, Coffee, Flower2, Sprout, ArrowRight } from "lucide-react";
import { categories } from "@/pages/public-route-pages/shop/constants.ts";

const iconMap = {
  Leaf: Leaf,
  Coffee: Coffee,
  Flower2: Flower2,
  Sprout: Sprout,
};

export default function CategoriesPage() {
  const navigate = useNavigate();

  const handleCategoryClick = (categoryValue: string) => {
    navigate(`/shop?region=${categoryValue}`);
  };

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

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        {/* Header */}
        <div className="mb-12 border-b-2 border-[#1A4331]/10 pb-6">
          <div className="flex items-center gap-2 mb-2">
            <Leaf className="w-5 h-5 text-[#8A9A7A]" />
            <p className="text-[#8A9A7A] font-bold text-sm uppercase tracking-wider">
              Khám Phá Thực Đơn
            </p>
          </div>
          <h1 className="text-3xl md:text-4xl pixel-text text-[#1A4331]">
            Danh Mục Đồ Uống
          </h1>
          <p className="mt-3 text-[#1A4331]/60 text-sm">
            Tìm kiếm thức uống phù hợp với khẩu vị của bạn
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {categories.map((cat) => {
            const IconComponent = iconMap[cat.icon as keyof typeof iconMap];
            return (
              <button
                key={cat.value}
                onClick={() => handleCategoryClick(cat.value)}
                className="group bg-white border-2 border-[#1A4331]/15 p-6 text-left transition-all duration-200 hover:-translate-y-1 hover:shadow-[4px_4px_0px_rgba(26,67,49,0.1)] hover:border-[#1A4331]/40"
              >
                {/* Icon */}
                <div className="w-12 h-12 bg-[#F8F5F0] border border-[#1A4331]/10 flex items-center justify-center mb-4 group-hover:bg-[#1A4331] transition-colors">
                  <IconComponent className="h-6 w-6 text-[#8A9A7A] group-hover:text-[#F8F5F0] transition-colors" />
                </div>

                {/* Name */}
                <h3 className="text-lg font-bold text-[#1A4331] mb-1.5">
                  {cat.label}
                </h3>

                {/* Description */}
                <p className="text-xs text-[#1A4331]/50 mb-4 leading-relaxed">
                  {cat.description}
                </p>

                {/* CTA */}
                <span className="inline-flex items-center text-xs font-bold text-[#8A9A7A] group-hover:text-[#1A4331] transition-colors">
                  Xem thực đơn
                  <ArrowRight className="ml-1.5 h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
