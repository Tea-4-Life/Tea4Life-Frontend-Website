import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Sparkles, Star } from "lucide-react";
import { Button } from "@/components/ui/button.tsx";
import { getRandomProductsApi } from "@/services/productApi";
import type { ProductSummaryResponse } from "@/types/product/ProductSummaryResponse";
import { getMediaUrl } from "@/lib/utils";

export function CosmicMessageSection() {
  const [randomProducts, setRandomProducts] = useState<ProductSummaryResponse[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRandomProducts = async () => {
      try {
        setLoading(true);
        const res = await getRandomProductsApi();
        if (res.data?.data) {
          setRandomProducts(res.data.data);
        }
      } catch (error) {
        console.error("Lỗi khi tải thông điệp vũ trụ:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchRandomProducts();
  }, []);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  return (
    <section className="space-y-12 pb-8 relative mt-20">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-[#d97743]/10 blur-[100px] rounded-full pointer-events-none z-0" />
      
      <div className="flex flex-col items-center justify-center text-center border-b-2 border-[#5c4033]/10 pb-8 relative z-10">
        <div className="inline-flex items-center gap-2 bg-[#F8F5F0] text-[#d97743] px-5 py-2 rounded-full w-fit mb-6 shadow-sm border border-[#5c4033]/10">
          <Sparkles className="w-5 h-5" />
          <span className="font-semibold text-sm tracking-widest uppercase">
            Hôm nay vũ trụ mách bảo
          </span>
          <Sparkles className="w-5 h-5" />
        </div>
        <h3 className="text-4xl md:text-5xl font-bold font-sans text-[#5c4033] leading-tight">
          Chọn đại hay được chọn?
        </h3>
        <p className="mt-4 text-[#5c4033]/70 font-medium max-w-2xl mx-auto">
          Cảm thấy bối rối trước menu đồ uống? Đừng lo, vũ trụ đã sắp xếp sẵn những hương vị tuyệt vời này dành riêng cho bạn hôm nay. Thử ngay xem sao!
        </p>
      </div>

      {loading ? (
        <div className="flex flex-col items-center py-20 text-[#d97743] relative z-10">
          <Sparkles className="w-12 h-12 animate-pulse mb-4" />
          <p className="font-bold text-lg">Đang kết nối tín hiệu vũ trụ...</p>
        </div>
      ) : randomProducts.length === 0 ? (
        <div className="flex flex-col items-center py-10 text-[#5c4033]/60 relative z-10">
          <p className="font-medium">Chưa nhận được thông điệp nào từ vũ trụ hôm nay.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 relative z-10">
          {randomProducts.map((product) => (
          <div
            key={product.id}
            className="group bg-white rounded-3xl p-4 flex flex-col relative transition-all duration-300 hover:-translate-y-2 shadow-sm hover:shadow-xl border border-[#5c4033]/5 overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-4 z-10">
              <div className="bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full border border-[#5c4033]/10 shadow-sm flex items-center gap-1">
                <Star className="w-3 h-3 text-[#d97743] fill-current" />
                <span className="text-xs font-bold text-[#5c4033]">Dành cho bạn</span>
              </div>
            </div>

            <Link to={`/shop/products/${product.id}`} className="block relative aspect-square bg-[#F8F5F0] rounded-2xl mb-4 overflow-hidden">
              <img
                src={product.imageUrl ? getMediaUrl(product.imageUrl) : "/placeholder.svg"}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </Link>

            <div className="flex flex-col flex-1">
              <p className="text-xs font-bold text-[#d97743] mb-1 uppercase tracking-wider">
                {product.productCategoryName}
              </p>
              <Link to={`/shop/products/${product.id}`}>
                <h4 className="font-bold text-[#5c4033] text-lg leading-tight line-clamp-2 hover:text-[#d97743] transition-colors mb-2">
                  {product.name}
                </h4>
              </Link>
              
              <div className="mt-auto pt-4 flex items-center justify-between border-t border-dashed border-[#5c4033]/10">
                <span className="text-lg font-bold text-[#5c4033]">
                  {formatPrice(product.basePrice)}
                </span>
                <Link to={`/shop/products/${product.id}`}>
                  <Button className="bg-[#5c4033] text-[#F8F5F0] hover:bg-[#d97743] hover:text-white rounded-full h-9 px-5 text-sm font-semibold transition-colors shadow-sm">
                    Khám phá
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      )}
    </section>
  );
}
