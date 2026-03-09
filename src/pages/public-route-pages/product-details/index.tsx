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

        <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
          {/* Product Image - 5 cols */}
          <div className="lg:col-span-5 relative">
            <div className="sticky top-24">
              <div className="overflow-hidden bg-[#F8F5F0] border-4 border-[#1A4331] rounded-none shadow-[8px_8px_0px_#1A4331] group">
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
                  <span className="absolute -top-3 -left-3 bg-[#D2A676] text-[#1A4331] text-xs px-4 py-2 font-bold border-2 border-[#1A4331] uppercase tracking-wider hover:bg-[#1A4331] hover:text-[#F8F5F0] transition-colors cursor-pointer rounded-none shadow-[4px_4px_0px_#1A4331]">
                    {product.productCategory.name}
                  </span>
                </Link>
              )}
            </div>
          </div>

          {/* Product Info - 7 cols */}
          <div className="lg:col-span-7 flex flex-col">
            <h1 className="text-4xl font-bold text-[#1A4331] sm:text-5xl pixel-text tracking-tight leading-tight uppercase drop-shadow-[2px_2px_0px_#8A9A7A]">
              {product.name}
            </h1>

            {/* Rating Placeholder */}
            <div className="mt-4 flex items-center gap-1">
              <div className="flex bg-white border-2 border-[#1A4331] px-2 py-1 shadow-[2px_2px_0px_#1A4331]">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 fill-[#D2A676] text-[#D2A676]`}
                  />
                ))}
              </div>
              <span className="text-xs text-[#1A4331] ml-2 font-bold uppercase tracking-widest bg-white border-2 border-[#1A4331] px-2 py-1 shadow-[2px_2px_0px_#1A4331]">
                5.0 Đánh giá
              </span>
            </div>

            {/* Price */}
            <div className="mt-8 bg-[#1A4331] text-[#F8F5F0] inline-block w-fit px-6 py-3 border-2 border-[#1A4331] shadow-[4px_4px_0px_rgba(26,67,49,0.3)]">
              <span className="text-xl text-[#D2A676] font-bold block mb-1 uppercase tracking-widest text-[10px]">
                Giá cơ bản
              </span>
              <span className="text-3xl font-bold font-mono">
                {formatPrice(product.basePrice)}
              </span>
            </div>

            {/* Description */}
            {product.description && (
              <p className="mt-8 text-[#1A4331] text-sm leading-relaxed whitespace-pre-line bg-white border-2 border-[#1A4331] p-5 shadow-[4px_4px_0px_#1A4331] font-medium border-dashed">
                {product.description}
              </p>
            )}

            {/* Dynamic Options */}
            <div className="mt-10 space-y-8">
              {product.productOptions
                ?.sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0))
                .map((option) => (
                  <div
                    key={option.id}
                    className="bg-white p-5 border-2 border-[#1A4331] shadow-[4px_4px_0px_rgba(26,67,49,0.1)] relative"
                  >
                    <div className="absolute -top-3 left-4 bg-[#F8F5F0] px-2 flex items-center gap-2">
                      <label className="text-sm font-bold uppercase tracking-wider flex items-center gap-2 m-0 bg-[#8A9A7A] px-3 py-1 border-2 border-[#1A4331]">
                        {option.name}
                        {option.isRequired && (
                          <span className="text-red-500 normal-case text-[10px] bg-red-50 px-1.5 rounded-none border border-red-500 ml-2">
                            *Bắt buộc
                          </span>
                        )}
                        {option.isMultiSelect && (
                          <span className="text-[#1A4331] normal-case text-[10px] bg-white px-1.5 rounded-none border border-[#1A4331] ml-2">
                            (Chọn nhiều)
                          </span>
                        )}
                      </label>
                    </div>

                    <div className="flex flex-wrap gap-3 mt-4">
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
                              className={`flex items-center gap-3 px-4 py-3 text-sm font-bold border-2 transition-all rounded-none ${
                                isSelected
                                  ? "bg-[#1A4331] text-[#F8F5F0] border-[#1A4331] shadow-[4px_4px_0px_#D2A676] -translate-y-1"
                                  : "bg-white text-[#1A4331] border-[#1A4331]/30 hover:border-[#1A4331] hover:-translate-y-0.5 shadow-[2px_2px_0px_transparent] hover:shadow-[4px_4px_0px_#8A9A7A]"
                              }`}
                            >
                              {val.imageUrl && (
                                <img
                                  src={getMediaUrl(val.imageUrl)}
                                  alt={val.valueName}
                                  className={`w-6 h-6 object-cover border border-[#1A4331]/20 bg-white p-0.5 shrink-0 ${isSelected ? "" : "grayscale"}`}
                                />
                              )}
                              <span>{val.valueName}</span>
                              {val.extraPrice > 0 && (
                                <span
                                  className={`text-xs ml-2 border-l pl-2 ${isSelected ? "text-emerald-200 border-white/20" : "text-[#8A9A7A] border-[#1A4331]/20"}`}
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
            <div className="mt-8 bg-white p-5 border-2 border-[#1A4331] shadow-[4px_4px_0px_rgba(26,67,49,0.1)] relative">
              <div className="absolute -top-3 left-4 bg-[#F8F5F0] px-2 flex items-center gap-2">
                <label className="text-sm font-bold text-[#1A4331] uppercase tracking-wider flex items-center gap-2 m-0 bg-[#D2A676] px-3 py-1 border-2 border-[#1A4331]">
                  Ghi chú cho quán
                </label>
              </div>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Ví dụ: Ít ngọt, thêm thật nhiều đá..."
                className="w-full h-24 mt-2 bg-[#F8F5F0] border-2 border-[#1A4331] px-4 py-3 text-sm text-[#1A4331] focus:outline-none focus:ring-2 focus:ring-[#8A9A7A] placeholder-[#8A9A7A]/70 resize-none rounded-none shadow-inner"
              />
            </div>

            {/* Quantity + Actions (Sticky Bar) */}
            <div className="mt-12 pt-6 border-t-4 border-[#1A4331] sticky bottom-0 bg-[#F8F5F0] pb-6 z-20 flex flex-col md:flex-row gap-4 items-end">
              <div className="w-full md:w-auto">
                <label className="text-xs font-bold text-[#8A9A7A] uppercase tracking-wider mb-2 block">
                  Số lượng
                </label>
                <div className="flex items-center bg-white border-2 border-[#1A4331] shadow-[4px_4px_0px_#1A4331] rounded-none">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-14 h-14 flex items-center justify-center text-[#1A4331] hover:bg-[#1A4331] hover:text-[#F8F5F0] transition-colors font-bold text-xl"
                  >
                    <Minus className="h-5 w-5" />
                  </button>
                  <span className="w-16 h-14 flex items-center justify-center text-lg font-bold text-[#1A4331] border-x-2 border-[#1A4331] bg-[#F8F5F0]">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-14 h-14 flex items-center justify-center text-[#1A4331] hover:bg-[#1A4331] hover:text-[#F8F5F0] transition-colors font-bold text-xl"
                  >
                    <Plus className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 flex-1 w-full relative">
                <Button
                  size="lg"
                  className="flex-1 bg-[#1A4331] text-[#F8F5F0] hover:bg-[#0c261a] hover:shadow-none hover:translate-y-1 shadow-[4px_4px_0px_#D2A676] transition-all rounded-none h-14 font-bold text-base border-2 border-[#1A4331] uppercase tracking-wider"
                >
                  <ShoppingCart className="h-5 w-5 mr-3" />
                  Thêm vào giỏ • {formatPrice(totalPrice)}
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setIsFavorite(!isFavorite)}
                  className={`rounded-none w-14 h-14 border-2 border-[#1A4331] flex-shrink-0 transition-all shadow-[4px_4px_0px_#1A4331] hover:shadow-none hover:translate-y-1 ${
                    isFavorite
                      ? "bg-red-50 text-red-500"
                      : "bg-white text-[#1A4331] hover:bg-[#8A9A7A] hover:text-white"
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
        <div className="mt-20 bg-[#F8F5F0] border-4 border-[#1A4331] p-8 rounded-none shadow-[8px_8px_0px_rgba(26,67,49,0.1)] relative">
          <div className="absolute -top-5 left-8 bg-[#8A9A7A] px-6 py-2 border-2 border-[#1A4331] shadow-[4px_4px_0px_#1A4331]">
            <h3 className="text-sm font-bold text-white uppercase tracking-widest flex items-center gap-2 m-0">
              <Leaf className="h-4 w-4 text-[#F8F5F0]" />
              Thông tin chi tiết
            </h3>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 text-sm mt-4">
            <div className="bg-white p-4 border-2 border-[#1A4331] border-dashed">
              <span className="text-[#8A9A7A] text-[10px] uppercase tracking-widest font-bold block mb-1">
                Danh mục
              </span>
              <p className="font-bold text-[#1A4331] text-lg">
                {product.productCategory?.name || "Khác"}
              </p>
            </div>
            <div className="bg-white p-4 border-2 border-[#1A4331] border-dashed">
              <span className="text-[#8A9A7A] text-[10px] uppercase tracking-widest font-bold block mb-1">
                Đơn giá cơ bản
              </span>
              <p className="font-bold text-emerald-700 text-lg">
                {formatPrice(product.basePrice)}
              </p>
            </div>
            {product.productCategory?.description && (
              <div className="sm:col-span-2 bg-white p-5 border-2 border-[#1A4331] border-dashed">
                <span className="text-[#8A9A7A] text-[10px] uppercase tracking-widest font-bold block mb-2">
                  Mô tả danh mục
                </span>
                <p className="text-[#1A4331] font-medium leading-relaxed">
                  {product.productCategory.description}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-20 pb-12">
            <div className="flex items-center justify-between mb-8 pb-4 border-b-4 border-[#1A4331]">
              <h2 className="text-2xl font-bold text-[#1A4331] uppercase tracking-wider flex items-center gap-3 drop-shadow-[2px_2px_0px_#8A9A7A]">
                <Star className="h-6 w-6 text-[#D2A676] fill-[#D2A676]" />
                Có thể bạn thích
              </h2>
              <Link
                to={`/shop?categoryId=${product.productCategory?.id}`}
                className="text-sm font-bold bg-[#1A4331] text-[#F8F5F0] hover:bg-[#8A9A7A] px-4 py-2 border-2 border-[#1A4331] shadow-[2px_2px_0px_#1A4331] transition-all hover:translate-y-0.5 hover:shadow-none uppercase tracking-widest hidden sm:block"
              >
                Xem thêm &rarr;
              </Link>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {relatedProducts.map((p) => (
                <Link key={p.id} to={`/shop/products/${p.id}`}>
                  <div className="group bg-white border-2 border-[#1A4331] p-4 transition-all duration-300 hover:-translate-y-2 shadow-[4px_4px_0px_#1A4331] hover:shadow-[8px_8px_0px_#8A9A7A] flex flex-col h-full rounded-none">
                    <div className="relative aspect-square overflow-hidden border-2 border-[#1A4331] bg-[#F8F5F0] mb-4">
                      {p.imageUrl ? (
                        <img
                          src={getMediaUrl(p.imageUrl)}
                          alt={p.name}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-[#8A9A7A] grayscale">
                          <Leaf className="w-12 h-12" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 flex flex-col">
                      <h3 className="font-bold text-[#1A4331] text-base line-clamp-2 mb-2 group-hover:text-[#8A9A7A] transition-colors leading-tight">
                        {p.name}
                      </h3>
                      <p className="text-[10px] bg-[#D2A676] text-[#1A4331] px-2 py-0.5 w-fit border border-[#1A4331] mb-3 font-bold uppercase tracking-widest shadow-[1px_1px_0px_#1A4331]">
                        {p.productCategoryName}
                      </p>
                      <div className="mt-auto pt-3 flex items-center justify-between border-t-2 border-dashed border-[#1A4331]/30">
                        <span className="text-lg font-bold text-[#1A4331] font-mono tracking-tight">
                          {formatPrice(p.basePrice)}
                        </span>
                        <div className="w-8 h-8 bg-[#F8F5F0] text-[#1A4331] border-2 border-[#1A4331] flex items-center justify-center group-hover:bg-[#1A4331] group-hover:text-[#F8F5F0] transition-colors shadow-[2px_2px_0px_#1A4331] group-hover:shadow-[1px_1px_0px_transparent] group-hover:translate-y-0.5">
                          <Plus className="w-4 h-4 font-bold" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            <Link
              to={`/shop?categoryId=${product.productCategory?.id}`}
              className="mt-6 text-sm font-bold bg-[#1A4331] text-[#F8F5F0] hover:bg-[#8A9A7A] px-4 py-3 border-2 border-[#1A4331] shadow-[4px_4px_0px_#1A4331] transition-all hover:translate-y-0.5 hover:shadow-none uppercase tracking-widest block text-center sm:hidden"
            >
              Xem thêm &rarr;
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
