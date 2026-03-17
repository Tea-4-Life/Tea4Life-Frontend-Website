import { Link, useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card.tsx";
import { Button } from "@/components/ui/button.tsx";
import { ArrowRight, Sparkles, Eye, ShoppingBag } from "lucide-react";
import { useEffect, useState, useCallback } from "react";
import { getPopularProductsApi } from "@/services/productApi";
import type { PopularProductCardResponse } from "@/types/product/PopularProductCardResponse";
import { handleError, getMediaUrl } from "@/lib/utils";

export function BestDealsSection() {
  const navigate = useNavigate();
  const [popularProducts, setPopularProducts] = useState<
    PopularProductCardResponse[]
  >([]);

  const fetchPopularProducts = useCallback(async () => {
    try {
      const res = await getPopularProductsApi(4); // Lấy tối đa 4 sản phẩm
      setPopularProducts(res.data.data || []);
    } catch (error) {
      handleError(error, "Không thể tải sản phẩm bán chạy");
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchPopularProducts();
  }, [fetchPopularProducts]);

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
        {popularProducts.map((item) => {
          const formattedPrice = new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
          }).format(item.basePrice);

          // Quyết định badge thông qua stats
          let badge = null;
          if (item.popularity.orderCount > 50) badge = "BÁN CHẠY";
          else if (item.popularity.clickCount > 100) badge = "HOT";

          return (
            <Card
              key={item.id}
              className="group border-0 bg-transparent shadow-none h-full"
            >
              {/* Item Container */}
              <div className="pixel-border rounded-3xl bg-white p-5 h-full flex flex-col relative transition-transform duration-300 hover:-translate-y-2">
                {/* Floating Badge */}
                {badge && (
                  <div className="absolute -top-3 -right-3 z-20 bg-[#d97743] text-white rounded-full font-bold px-4 py-1.5 text-xs shadow-md">
                    ★ {badge}
                  </div>
                )}

                {/* Image Display */}
                <div className="aspect-square bg-[#F8F5F0] rounded-2xl p-2 mb-6 relative overflow-hidden group-hover:shadow-inner transition-shadow flex items-center justify-center">
                  <div className="w-full h-full relative rounded-2xl overflow-hidden">
                    <img
                      src={getMediaUrl(item.imageUrl)}
                      className="h-full w-full object-cover transform group-hover:scale-110 transition-all duration-500"
                      alt={item.name}
                    />
                  </div>
                </div>

                {/* Item Details */}
                <div className="flex flex-col flex-1 space-y-4 px-1">
                  <div>
                    <span className="text-xs font-semibold text-[#d97743] bg-[#d97743]/10 px-2.5 py-1 rounded-full">
                      {item.productCategoryName}
                    </span>
                    <h4 className="font-bold text-[#5c4033] text-xl leading-tight line-clamp-2 transition-colors group-hover:text-[#d97743] mt-2">
                      {item.name}
                    </h4>
                  </div>

                  {/* Popularity Profile */}
                  <div className="space-y-2 mt-1 text-xs font-semibold text-[#5c4033]/70">
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1">
                        <Eye className="w-3.5 h-3.5 text-[#b59b85]" />{" "}
                        {item.popularity.viewCount} xem
                      </span>
                      <span className="flex items-center gap-1">
                        <ShoppingBag className="w-3.5 h-3.5 text-[#d97743]" />{" "}
                        {item.popularity.orderCount} bán
                      </span>
                    </div>
                  </div>

                  {/* Price and Action */}
                  <div className="mt-auto pt-4 border-t-2 border-dashed border-[#5c4033]/10">
                    <div className="text-xl md:text-2xl font-black text-[#5c4033] mb-4">
                      {formattedPrice}
                    </div>

                    <Button
                      onClick={() => navigate(`/product-details/${item.id}`)}
                      className="w-full bg-[#5c4033] text-[#F8F5F0] rounded-full hover:bg-[#d97743] h-12 flex justify-between items-center transition-all text-[16px]"
                    >
                      <span className="font-semibold">Chọn mua</span>
                      <span className="text-lg group-hover:translate-x-2 transition-transform">
                        ➔
                      </span>
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
