"use client";

import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Store,
  ArrowRight,
  Award,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";
import { brands } from "../shop/constants"; //

export default function BrandsListPage() {
  const navigate = useNavigate();

  // Hàm điều hướng về shop với query parameter brand
  const handleViewProducts = (brandValue: string) => {
    navigate(`/shop?brand=${brandValue}`);
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-emerald-50/50 to-white py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold text-emerald-900 sm:text-5xl">
            Thương hiệu Trà Đồng hành
          </h1>
          <p className="mt-4 text-xl text-emerald-700 max-w-2xl mx-auto">
            Tea4Life tự hào là đối tác phân phối chính thức của những thương
            hiệu trà danh tiếng nhất Việt Nam.
          </p>
        </div>

        {/* Brand Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {/* Lọc bỏ option 'all' để chỉ hiện thương hiệu thật */}
          {brands
            .filter((b) => b.value !== "all")
            .map((brand) => (
              <Card
                key={brand.value}
                className="group border-emerald-100 hover:border-emerald-300 transition-all hover:shadow-2xl overflow-hidden"
              >
                <CardContent className="p-0">
                  <div className="bg-emerald-800 p-8 flex justify-center items-center relative overflow-hidden">
                    <div className="absolute inset-0 opacity-10 group-hover:scale-110 transition-transform duration-500">
                      <Store className="w-full h-full -rotate-12" />
                    </div>

                    <div className="relative bg-white p-6 rounded-2xl shadow-xl">
                      <Store className="h-16 w-16 text-emerald-600" />
                    </div>
                  </div>

                  <div className="p-8 text-center">
                    <h2 className="text-2xl font-bold text-emerald-900 mb-2">
                      {brand.label}
                    </h2>
                    <div className="flex justify-center gap-4 mb-6">
                      <span className="flex items-center text-xs text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
                        <Award className="w-3 h-3 mr-1" /> Chất lượng
                      </span>
                      <span className="flex items-center text-xs text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
                        <ShieldCheck className="w-3 h-3 mr-1" /> Chính hãng
                      </span>
                    </div>

                    {/* Sử dụng navigate với query params thay vì Link đến trang chi tiết */}
                    <Button
                      onClick={() => handleViewProducts(brand.value)}
                      className="w-full bg-emerald-600 hover:bg-emerald-700 text-white gap-2"
                    >
                      Xem sản phẩm của {brand.label}{" "}
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
        </div>

        {/* Trust Banner */}
        <div className="bg-emerald-900 rounded-3xl p-8 md:p-12 text-white relative overflow-hidden">
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-md">
              <h2 className="text-3xl font-bold mb-4">Cam kết từ Tea4Life</h2>
              <p className="text-emerald-200">
                Tất cả các sản phẩm từ các thương hiệu đối tác đều được kiểm
                định chất lượng nghiêm ngặt.
              </p>
            </div>
            <div className="flex gap-6">
              <div className="text-center">
                <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto mb-2" />
                <p className="text-sm font-semibold">100% Chính hãng</p>
              </div>
              <div className="text-center">
                <Award className="w-10 h-10 text-emerald-400 mx-auto mb-2" />
                <p className="text-sm font-semibold">Top Thương hiệu</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
