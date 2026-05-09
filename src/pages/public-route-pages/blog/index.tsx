import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Loader2, Star, MessageSquareText, CalendarDays } from "lucide-react";
import PaginationComponent from "@/components/custom/PaginationComponent";
import { getPublicBlogReviewsApi } from "@/services/blogApi";
import type { BlogReviewResponse } from "@/types/blog/BlogReviewResponse";
import { getMediaUrl, handleError } from "@/lib/utils";

export default function BlogPage() {
  const [items, setItems] = useState<BlogReviewResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [size] = useState(9);
  const [totalElements, setTotalElements] = useState(0);

  const formatDateTime = (value: string) => {
    if (!value) return "";
    return new Date(value).toLocaleString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getUserDisplayName = (email: string) => {
    if (!email) return "Người dùng Tea4Life";
    return email.split("@")[0];
  };

  const fetchPublicReviews = useCallback(async () => {
    try {
      setLoading(true);
      const res = await getPublicBlogReviewsApi({ page: page - 1, size });
      const payload = res.data.data;
      setItems(payload?.content || []);
      setTotalElements(payload?.totalElements || 0);
    } catch (error) {
      handleError(error, "Không thể tải bài blog.");
    } finally {
      setLoading(false);
    }
  }, [page, size]);

  useEffect(() => {
    fetchPublicReviews();
  }, [fetchPublicReviews]);

  return (
    <div className="min-h-screen bg-[#F8F5F0] text-[#1A4331] py-10">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 border-b border-[#1A4331]/10 pb-5">
          <h1 className="text-3xl md:text-4xl font-bold">Blog Cộng Đồng</h1>
          <p className="text-sm text-[#8A9A7A] mt-2">
            Những review và cảm nhận chân thật từ khách hàng Tea4Life.
          </p>
        </div>

        {loading ? (
          <div className="py-20 flex justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-[#1A4331]" />
          </div>
        ) : items.length === 0 ? (
          <div className="bg-white border border-[#1A4331]/10 rounded-2xl p-10 text-center">
            <MessageSquareText className="h-10 w-10 mx-auto text-[#8A9A7A] mb-3" />
            <p className="font-semibold">Chưa có bài blog nào</p>
            <p className="text-sm text-[#8A9A7A] mt-1 mb-4">
              Hãy mua sản phẩm và để lại review đầu tiên.
            </p>
            <Link
              to="/shop"
              className="inline-flex px-4 py-2 rounded-full bg-[#1A4331] text-white text-sm font-bold"
            >
              Đi tới thực đơn
            </Link>
          </div>
        ) : (
          <>
            <div className="space-y-5">
              {items.map((item) => (
                <article
                  key={item.id}
                  className="bg-white border border-[#1A4331]/10 rounded-3xl p-5 md:p-6 shadow-sm"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-11 h-11 rounded-full bg-[#1A4331] text-white text-sm font-bold flex items-center justify-center shrink-0">
                      {getUserDisplayName(item.authorEmail).slice(0, 2).toUpperCase()}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-bold text-[#1A4331] leading-none">
                        {getUserDisplayName(item.authorEmail)}
                      </p>
                      <div className="mt-1 flex items-center gap-2 text-xs text-[#8A9A7A]">
                        <CalendarDays className="h-3.5 w-3.5" />
                        {formatDateTime(item.createdAt)}
                      </div>
                    </div>
                    <div className="flex items-center gap-1 bg-[#F8F5F0] px-3 py-1.5 rounded-full">
                      {Array.from({ length: 5 }).map((_, idx) => (
                        <Star
                          key={idx}
                          className={`h-3.5 w-3.5 ${
                            idx < item.rating
                              ? "fill-[#d97743] text-[#d97743]"
                              : "text-[#d97743]/25"
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="mt-4">
                    <h3 className="font-bold text-lg text-[#1A4331] line-clamp-2">
                      {item.title}
                    </h3>
                    <p className="text-sm text-[#8A9A7A] mt-1">
                      Sản phẩm: {item.productName || item.productId}
                    </p>
                  </div>

                  <p className="text-[15px] text-[#5c4033]/90 mt-3 whitespace-pre-line leading-relaxed">
                    {item.summary || item.content}
                  </p>

                  {item.thumbnailUrl && (
                    <div className="mt-4 rounded-2xl overflow-hidden border border-[#1A4331]/10 bg-[#F8F5F0]">
                      <img
                        src={getMediaUrl(item.thumbnailUrl)}
                        alt={item.title}
                        className="w-full max-h-[420px] object-cover"
                      />
                    </div>
                  )}

                  <div className="mt-4 pt-3 border-t border-[#1A4331]/10">
                    <Link
                      to={`/shop/products/${item.productId}`}
                      className="text-sm font-semibold text-[#1A4331] hover:text-[#d97743] transition-colors"
                    >
                      Xem sản phẩm này
                    </Link>
                  </div>
                </article>
              ))}
            </div>

            <div className="mt-8">
              <PaginationComponent
                currentPage={page}
                pageSize={size}
                totalCount={totalElements}
                onPageChange={setPage}
                showItemsPerPageSelect={false}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
