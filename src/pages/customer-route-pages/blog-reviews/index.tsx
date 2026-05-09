import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Loader2, MessageSquareText, Trash2, Star } from "lucide-react";
import { toast } from "sonner";
import PaginationComponent from "@/components/custom/PaginationComponent";
import { deleteMyBlogReviewApi, getMyBlogReviewsApi } from "@/services/blogApi";
import type { BlogReviewResponse } from "@/types/blog/BlogReviewResponse";
import { handleError } from "@/lib/utils";

function statusLabel(status: BlogReviewResponse["status"]) {
  if (status === "APPROVED") return "Đã duyệt";
  if (status === "REJECTED") return "Bị từ chối";
  return "Chờ duyệt";
}

function statusClass(status: BlogReviewResponse["status"]) {
  if (status === "APPROVED") return "bg-emerald-100 text-emerald-700";
  if (status === "REJECTED") return "bg-red-100 text-red-700";
  return "bg-amber-100 text-amber-700";
}

export default function MyBlogReviewsPage() {
  const [items, setItems] = useState<BlogReviewResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const [page, setPage] = useState(1);
  const [size] = useState(10);
  const [totalElements, setTotalElements] = useState(0);

  const fetchReviews = useCallback(async () => {
    try {
      setLoading(true);
      const res = await getMyBlogReviewsApi({ page: page - 1, size });
      const payload = res.data.data;
      setItems(payload?.content || []);
      setTotalElements(payload?.totalElements || 0);
    } catch (error) {
      handleError(error, "Không thể tải danh sách đánh giá của bạn");
    } finally {
      setLoading(false);
    }
  }, [page, size]);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  const handleDelete = async (id: string) => {
    try {
      setDeletingId(id);
      await deleteMyBlogReviewApi(id);
      toast.success("Đã xóa bài đánh giá");
      fetchReviews();
    } catch (error) {
      handleError(error, "Không thể xóa bài đánh giá");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F5F0] text-[#1A4331] py-10">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6 border-b border-[#1A4331]/10 pb-4">
          <h1 className="text-3xl font-bold">Đánh Giá Của Tôi</h1>
          <p className="text-sm text-[#8A9A7A] mt-1">
            Quản lý các bài review sản phẩm bạn đã đăng.
          </p>
        </div>

        {loading ? (
          <div className="py-20 flex items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-[#8A9A7A]" />
          </div>
        ) : items.length === 0 ? (
          <div className="bg-white border border-[#1A4331]/10 rounded-2xl p-10 text-center">
            <MessageSquareText className="h-10 w-10 mx-auto text-[#8A9A7A] mb-3" />
            <p className="font-semibold mb-3">Bạn chưa có bài đánh giá nào</p>
            <Link
              to="/shop"
              className="inline-flex px-4 py-2 rounded-full bg-[#1A4331] text-white text-sm font-bold"
            >
              Đi mua hàng và đánh giá
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="bg-white border border-[#1A4331]/10 rounded-2xl p-5"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs text-[#8A9A7A]">Sản phẩm #{item.productId}</p>
                    <h3 className="font-bold text-lg mt-1">{item.title}</h3>
                    <p className="text-sm text-[#5c4033]/80 mt-2 whitespace-pre-line">
                      {item.summary || item.content}
                    </p>
                    <div className="mt-3 flex items-center gap-2">
                      <span
                        className={`px-2.5 py-1 rounded-full text-xs font-bold ${statusClass(item.status)}`}
                      >
                        {statusLabel(item.status)}
                      </span>
                      <span className="text-sm font-semibold text-[#d97743] inline-flex items-center gap-1">
                        <Star className="h-4 w-4 fill-[#d97743]" /> {item.rating}/5
                      </span>
                    </div>
                    {item.status === "REJECTED" && item.rejectionReason && (
                      <p className="text-xs text-red-600 mt-2">
                        Lý do từ chối: {item.rejectionReason}
                      </p>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() => handleDelete(item.id)}
                    disabled={deletingId === item.id}
                    className="h-9 w-9 rounded-full border border-red-200 text-red-600 inline-flex items-center justify-center hover:bg-red-50 disabled:opacity-50"
                    title="Xóa đánh giá"
                  >
                    {deletingId === item.id ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Trash2 className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>
            ))}

            <PaginationComponent
              currentPage={page}
              pageSize={size}
              totalCount={totalElements}
              onPageChange={setPage}
              showItemsPerPageSelect={false}
            />
          </div>
        )}
      </div>
    </div>
  );
}
