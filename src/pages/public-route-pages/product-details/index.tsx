"use client";

import { useEffect, useState, useMemo, useCallback } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button.tsx";
import {
  Star,
  Minus,
  Plus,
  ShoppingCart,
  Heart,
  ChevronLeft,
  Leaf,
  Loader2,
} from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb.tsx";

import { getProductByIdApi, getProductsApi } from "@/services/productApi";
import type { ProductDetailResponse } from "@/types/product/ProductDetailResponse";
import type { ProductSummaryResponse } from "@/types/product/ProductSummaryResponse";
import { getMediaUrl, handleError } from "@/lib/utils";

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();

  const [product, setProduct] = useState<ProductDetailResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [relatedProducts, setRelatedProducts] = useState<
    ProductSummaryResponse[]
  >([]);

  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);

  // State for selected options mapping: optionId -> array of selected valueIds
  const [selectedOptions, setSelectedOptions] = useState<
    Record<string, string[]>
  >({});
  const [note, setNote] = useState("");

  const fetchProductDetail = useCallback(async () => {
    if (!id) return;
    try {
      setLoading(true);
      const res = await getProductByIdApi(id);
      const productData = res.data.data;
      setProduct(productData);

      // Initialize default selections: select first value of required single-select options
      const initialSelections: Record<string, string[]> = {};
      productData.productOptions?.forEach((opt) => {
        if (
          opt.isRequired &&
          !opt.isMultiSelect &&
          opt.productOptionValues?.length > 0
        ) {
          // Sort option values by sortOrder
          const sortedValues = [...opt.productOptionValues].sort(
            (a, b) => (a.sortOrder || 0) - (b.sortOrder || 0),
          );
          initialSelections[opt.id] = [sortedValues[0].id];
        } else {
          initialSelections[opt.id] = [];
        }
      });
      setSelectedOptions(initialSelections);

      // Fetch related products (same category)
      if (productData.productCategory?.id) {
        const relatedRes = await getProductsApi({
          categoryId: productData.productCategory.id.toString(),
          page: 1,
          size: 4,
        });
        // filter out current
        const related = (relatedRes.data.data.content || []).filter(
          (p) => p.id.toString() !== id,
        );
        setRelatedProducts(related.slice(0, 4));
      }
    } catch (error) {
      handleError(error, "Không thể tải chi tiết sản phẩm.");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchProductDetail();
    window.scrollTo(0, 0); // Scroll to top when changing product
  }, [fetchProductDetail]);

  const handleOptionToggle = (
    optionId: string,
    valueId: string,
    isMultiSelect: boolean,
  ) => {
    setSelectedOptions((prev) => {
      const currentSelected = prev[optionId] || [];
      if (isMultiSelect) {
        if (currentSelected.includes(valueId)) {
          return {
            ...prev,
            [optionId]: currentSelected.filter((id) => id !== valueId),
          };
        } else {
          return { ...prev, [optionId]: [...currentSelected, valueId] };
        }
      } else {
        // Single select
        if (currentSelected.includes(valueId)) {
          return prev; // Optional: allow deselect if not required, but here we just replace or keep
        }
        return { ...prev, [optionId]: [valueId] };
      }
    });
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  // Calculate total price
  const totalPrice = useMemo(() => {
    if (!product) return 0;
    let unitPrice = product.basePrice || 0;

    // Add extra prices from selected options
    product.productOptions?.forEach((opt) => {
      const selectedIds = selectedOptions[opt.id] || [];
      opt.productOptionValues?.forEach((val) => {
        if (selectedIds.includes(val.id)) {
          unitPrice += val.extraPrice || 0;
        }
      });
    });

    return unitPrice * quantity;
  }, [product, selectedOptions, quantity]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8F5F0] flex items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-[#1A4331]" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-[#F8F5F0] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[#1A4331] mb-4">
            Không tìm thấy sản phẩm
          </h1>
          <Link to="/shop">
            <Button className="bg-[#1A4331] text-[#F8F5F0] hover:bg-[#8A9A7A] rounded-none text-sm font-bold">
              <ChevronLeft className="h-4 w-4 mr-2" />
              Quay lại cửa hàng
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F5F0] text-[#1A4331] relative">
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.03] z-0"
        style={{
          backgroundImage:
            "linear-gradient(#1A4331 1px, transparent 1px), linear-gradient(90deg, #1A4331 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      ></div>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 relative z-10">
        <Breadcrumb className="mb-8">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link
                  to="/"
                  className="text-[#8A9A7A] hover:text-[#1A4331] text-sm font-bold"
                >
                  Trang chủ
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link
                  to="/shop"
                  className="text-[#8A9A7A] hover:text-[#1A4331] text-sm font-bold"
                >
                  Thực đơn
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="text-[#1A4331] text-sm font-bold truncate max-w-[200px] sm:max-w-none">
                {product.name}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Product Image */}
          <div className="relative">
            <div className="overflow-hidden bg-white border-2 border-[#1A4331]/20 rounded-md">
              <img
                src={
                  product.imageUrl
                    ? getMediaUrl(product.imageUrl)
                    : "/placeholder.svg"
                }
                alt={product.name}
                className="h-full w-full object-cover aspect-square hover:scale-105 transition-transform duration-500"
              />
            </div>
            {product.productCategory && (
              <Link to={`/shop?categoryId=${product.productCategory.id}`}>
                <span className="absolute top-3 left-3 bg-[#D2A676] text-[#1A4331] text-xs px-3 py-1.5 font-bold border border-[#1A4331]/30 uppercase tracking-wider hover:bg-[#1A4331] hover:text-[#F8F5F0] transition-colors cursor-pointer rounded-sm">
                  {product.productCategory.name}
                </span>
              </Link>
            )}
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            <h1 className="text-3xl font-bold text-[#1A4331] sm:text-4xl pixel-text tracking-tight leading-tight">
              {product.name}
            </h1>

            {/* Rating Placeholder */}
            <div className="mt-3 flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 fill-[#D2A676] text-[#D2A676]`}
                />
              ))}
              <span className="text-xs text-[#8A9A7A] ml-1 font-semibold">
                5.0 (Đánh giá)
              </span>
            </div>

            {/* Price */}
            <div className="mt-6">
              <span className="text-3xl font-bold text-[#1A4331]">
                {formatPrice(product.basePrice)}
              </span>
            </div>

            {/* Description */}
            {product.description && (
              <p className="mt-4 text-[#1A4331]/80 text-sm leading-relaxed whitespace-pre-line">
                {product.description}
              </p>
            )}

            {/* Dynamic Options */}
            <div className="mt-6 space-y-6">
              {product.productOptions
                ?.sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0))
                .map((option) => (
                  <div key={option.id}>
                    <label className="text-xs font-bold text-[#1A4331] uppercase tracking-wider flex items-center gap-2 mb-3">
                      {option.name}
                      {option.isRequired && (
                        <span className="text-red-500 normal-case text-[10px] bg-red-50 px-1.5 rounded-sm border border-red-100">
                          *Bắt buộc
                        </span>
                      )}
                      {option.isMultiSelect && (
                        <span className="text-[#8A9A7A] normal-case text-[10px] bg-slate-100 px-1.5 rounded-sm">
                          (Chọn nhiều)
                        </span>
                      )}
                    </label>

                    <div className="flex flex-wrap gap-2.5">
                      {option.productOptionValues
                        ?.sort(
                          (a, b) => (a.sortOrder || 0) - (b.sortOrder || 0),
                        )
                        .map((val) => {
                          const isSelected = (
                            selectedOptions[option.id] || []
                          ).includes(val.id);
                          return (
                            <button
                              key={val.id}
                              onClick={() =>
                                handleOptionToggle(
                                  option.id,
                                  val.id,
                                  option.isMultiSelect,
                                )
                              }
                              className={`flex items-center gap-2 px-3 py-2 text-sm font-bold border-2 transition-all rounded-md ${
                                isSelected
                                  ? "bg-[#1A4331] text-[#F8F5F0] border-[#1A4331] shadow-[2px_2px_0px_#D2A676] -translate-y-0.5"
                                  : "bg-white text-[#1A4331] border-[#1A4331]/20 hover:border-[#1A4331]/60 hover:bg-slate-50"
                              }`}
                            >
                              {val.imageUrl && (
                                <img
                                  src={getMediaUrl(val.imageUrl)}
                                  alt={val.valueName}
                                  className="w-5 h-5 object-cover rounded-full bg-slate-100 shrink-0"
                                />
                              )}
                              <span>{val.valueName}</span>
                              {val.extraPrice > 0 && (
                                <span
                                  className={`text-[11px] ${isSelected ? "text-emerald-200" : "text-[#8A9A7A]"}`}
                                >
                                  +{formatPrice(val.extraPrice)}
                                </span>
                              )}
                            </button>
                          );
                        })}
                    </div>
                  </div>
                ))}
            </div>

            {/* Note */}
            <div className="mt-6">
              <label className="text-xs font-bold text-[#1A4331] uppercase tracking-wider block mb-2">
                Ghi chú cho quán
              </label>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Ví dụ: Ít ngọt, thêm đá..."
                className="w-full h-20 bg-white border-2 border-[#1A4331]/20 px-3 py-2 text-sm text-[#1A4331] focus:outline-none focus:border-[#1A4331] placeholder-[#8A9A7A]/50 resize-none rounded-md"
              />
            </div>

            {/* Quantity + Actions */}
            <div className="mt-8 pt-6 border-t-2 border-[#1A4331]/10 sticky bottom-0 bg-[#F8F5F0] pb-4 z-20">
              <div className="flex items-center justify-between mb-4">
                <label className="text-xs font-bold text-[#1A4331] uppercase tracking-wider">
                  Số lượng
                </label>
                <div className="flex items-center bg-white border-2 border-[#1A4331]/20 rounded-md overflow-hidden shadow-sm">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 flex items-center justify-center text-[#1A4331] hover:bg-[#1A4331] hover:text-[#F8F5F0] transition-colors"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="w-12 h-10 flex items-center justify-center text-sm font-bold text-[#1A4331] border-x-2 border-[#1A4331]/10">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 flex items-center justify-center text-[#1A4331] hover:bg-[#1A4331] hover:text-[#F8F5F0] transition-colors"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 mt-4">
                <Button
                  size="lg"
                  className="flex-1 bg-[#1A4331] text-[#F8F5F0] hover:bg-[#0c261a] hover:shadow-[3px_3px_0px_#D2A676] hover:-translate-y-1 transition-all rounded-md h-14 font-bold text-base border-2 border-transparent"
                >
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Thêm vào giỏ • {formatPrice(totalPrice)}
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setIsFavorite(!isFavorite)}
                  className={`rounded-md w-14 h-14 border-2 flex-shrink-0 transition-all ${
                    isFavorite
                      ? "bg-red-50 text-red-500 border-red-300 hover:bg-red-100"
                      : "bg-white text-[#1A4331] border-[#1A4331]/20 hover:border-[#1A4331]"
                  }`}
                >
                  <Heart
                    className={`h-6 w-6 ${isFavorite ? "fill-red-500" : ""}`}
                  />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details - Info */}
        <div className="mt-16 bg-white border-2 border-[#1A4331]/10 p-6 rounded-md shadow-[4px_4px_0px_rgba(26,67,49,0.05)]">
          <h3 className="text-base font-bold text-[#1A4331] uppercase tracking-wider mb-5 flex items-center gap-2 pb-3 border-b border-slate-100">
            <Leaf className="h-5 w-5 text-[#8A9A7A]" />
            Thông tin chi tiết
          </h3>
          <div className="grid gap-6 sm:grid-cols-2 text-sm">
            <div>
              <span className="text-[#8A9A7A] text-xs uppercase tracking-wider font-semibold">
                Danh mục
              </span>
              <p className="mt-1.5 font-bold text-[#1A4331] text-lg">
                {product.productCategory?.name || "Khác"}
              </p>
            </div>
            <div>
              <span className="text-[#8A9A7A] text-xs uppercase tracking-wider font-semibold">
                Đơn giá cơ bản
              </span>
              <p className="mt-1.5 font-bold text-[#1A4331] text-lg">
                {formatPrice(product.basePrice)}
              </p>
            </div>
            {product.productCategory?.description && (
              <div className="sm:col-span-2">
                <span className="text-[#8A9A7A] text-xs uppercase tracking-wider font-semibold">
                  Mô tả danh mục
                </span>
                <p className="mt-1.5 text-slate-600">
                  {product.productCategory.description}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16 pb-12">
            <div className="flex items-center justify-between mb-6 pb-3 border-b-2 border-[#1A4331]/10">
              <h2 className="text-xl font-bold text-[#1A4331] uppercase tracking-wider flex items-center gap-2">
                <Star className="h-5 w-5 text-[#D2A676] fill-[#D2A676]" />
                Có thể bạn thích
              </h2>
              <Link
                to={`/shop?categoryId=${product.productCategory?.id}`}
                className="text-sm font-bold text-[#8A9A7A] hover:text-[#1A4331] transition-colors"
              >
                Xem thêm &rarr;
              </Link>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {relatedProducts.map((p) => (
                <Link key={p.id} to={`/shop/products/${p.id}`}>
                  <div className="group bg-white border-2 border-[#1A4331]/15 p-3 rounded-md transition-all duration-300 hover:-translate-y-2 hover:shadow-[5px_5px_0px_#1A4331] flex flex-col h-full">
                    <div className="relative aspect-square overflow-hidden border-2 border-[#1A4331]/5 bg-slate-50 mb-3 rounded-sm">
                      <img
                        src={
                          p.imageUrl
                            ? getMediaUrl(p.imageUrl)
                            : "/placeholder.svg"
                        }
                        alt={p.name}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    <div className="flex-1 flex flex-col">
                      <h3 className="font-bold text-[#1A4331] text-sm line-clamp-2 mb-1 group-hover:text-[#8A9A7A] transition-colors">
                        {p.name}
                      </h3>
                      <p className="text-[11px] text-[#8A9A7A] mb-2 font-semibold uppercase tracking-wider">
                        {p.productCategoryName}
                      </p>
                      <div className="mt-auto pt-2 flex items-center justify-between border-t border-slate-100">
                        <span className="text-sm font-bold text-[#1A4331]">
                          {formatPrice(p.basePrice)}
                        </span>
                        <div className="w-7 h-7 bg-[#1A4331]/5 text-[#1A4331] rounded-full flex items-center justify-center group-hover:bg-[#1A4331] group-hover:text-white transition-colors">
                          <Plus className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
