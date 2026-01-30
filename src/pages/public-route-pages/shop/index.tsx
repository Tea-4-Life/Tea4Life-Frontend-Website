import { useState, useMemo } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button.tsx";
import { Card, CardContent } from "@/components/ui/card.tsx";
import {
  Search,
  SlidersHorizontal,
  Star,
  X,
  ChevronLeft,
  ChevronRight,
  Filter,
} from "lucide-react";
import FilterSidebar from "./components/FilterSidebar.tsx";
import { brands, regions, sizes, allProducts } from "./constants.ts";

const PAGE_SIZE = 8;

export default function ShopPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [showMobileFilter, setShowMobileFilter] = useState(false);

  // Get filter values from URL: /shop?name=x&brand=x&region=x&size=x&page=x
  const name = searchParams.get("name") || "";
  const brand = searchParams.get("brand") || "all";
  const region = searchParams.get("region") || "all";
  const size = searchParams.get("size") || "all";
  const page = parseInt(searchParams.get("page") || "1");

  // Local state for name input
  const [nameInput, setNameInput] = useState(name);

  // Update URL params
  const updateParams = (updates: Record<string, string>) => {
    const newParams = new URLSearchParams(searchParams);

    Object.entries(updates).forEach(([key, value]) => {
      if (value && value !== "all" && value !== "") {
        newParams.set(key, value);
      } else {
        newParams.delete(key);
      }
    });

    // Reset to page 1 when filters change (except when changing page)
    if (!("page" in updates)) {
      newParams.set("page", "1");
    }

    setSearchParams(newParams);
  };

  // Filter products
  const filteredProducts = useMemo(() => {
    return allProducts.filter((product) => {
      if (name && !product.name.toLowerCase().includes(name.toLowerCase())) {
        return false;
      }
      if (brand !== "all" && product.brand !== brand) {
        return false;
      }
      if (region !== "all" && product.region !== region) {
        return false;
      }
      if (size !== "all" && product.size !== size) {
        return false;
      }
      return true;
    });
  }, [name, brand, region, size]);

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / PAGE_SIZE);
  const paginatedProducts = filteredProducts.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE,
  );

  // Handle name search submit
  const handleSearch = () => {
    updateParams({ name: nameInput });
  };

  // Clear all filters
  const clearFilters = () => {
    setNameInput("");
    setSearchParams(new URLSearchParams());
  };

  // SỬA LỖI TẠI ĐÂY: Ép kiểu về boolean bằng toán tử !!
  const hasActiveFilters = !!(
    name ||
    brand !== "all" ||
    region !== "all" ||
    size !== "all"
  );

  // Format price
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  return (
    /* SỬA LỖI TẠI ĐÂY: Thay bg-gradient-to-b bằng bg-linear-to-b */
    <div className="min-h-screen bg-linear-to-b from-emerald-50/50 to-white">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-emerald-900 sm:text-4xl">
            Cửa hàng
          </h1>
          <p className="mt-2 text-emerald-700">
            Khám phá bộ sưu tập trà đa dạng của chúng tôi
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block w-64 shrink-0">
            <div className="sticky top-24 bg-white rounded-xl border border-emerald-100 p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-6">
                <SlidersHorizontal className="h-5 w-5 text-emerald-600" />
                <h2 className="font-semibold text-emerald-900">Bộ lọc</h2>
              </div>
              <FilterSidebar
                nameInput={nameInput}
                setNameInput={setNameInput}
                brand={brand}
                region={region}
                size={size}
                hasActiveFilters={hasActiveFilters}
                onSearch={handleSearch}
                onUpdateParams={updateParams}
                onClearFilters={clearFilters}
              />
            </div>
          </aside>

          {/* Mobile Filter Button */}
          <div className="lg:hidden">
            <Button
              onClick={() => setShowMobileFilter(true)}
              variant="outline"
              className="w-full border-emerald-300 text-emerald-700 bg-transparent"
            >
              <Filter className="h-4 w-4 mr-2" />
              Bộ lọc
              {hasActiveFilters && (
                <span className="ml-2 bg-emerald-500 text-white text-xs px-2 py-0.5 rounded-full">
                  Đang lọc
                </span>
              )}
            </Button>
          </div>

          {/* Mobile Filter Modal */}
          {showMobileFilter && (
            <div className="fixed inset-0 z-50 lg:hidden">
              <div
                className="absolute inset-0 bg-black/50"
                onClick={() => setShowMobileFilter(false)}
              />
              <div className="absolute right-0 top-0 h-full w-80 max-w-full bg-white p-6 shadow-xl overflow-y-auto">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <SlidersHorizontal className="h-5 w-5 text-emerald-600" />
                    <h2 className="font-semibold text-emerald-900">Bộ lọc</h2>
                  </div>
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => setShowMobileFilter(false)}
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>
                <FilterSidebar
                  nameInput={nameInput}
                  setNameInput={setNameInput}
                  brand={brand}
                  region={region}
                  size={size}
                  hasActiveFilters={hasActiveFilters}
                  onSearch={handleSearch}
                  onUpdateParams={updateParams}
                  onClearFilters={clearFilters}
                />
              </div>
            </div>
          )}

          {/* Products */}
          <main className="flex-1">
            {/* Results Info */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <p className="text-emerald-700">
                Hiển thị{" "}
                <span className="font-medium text-emerald-900">
                  {paginatedProducts.length}
                </span>{" "}
                trong{" "}
                <span className="font-medium text-emerald-900">
                  {filteredProducts.length}
                </span>{" "}
                sản phẩm
              </p>
            </div>

            {/* Active Filters Tags */}
            {hasActiveFilters && (
              <div className="flex flex-wrap gap-2 mb-6">
                {name && (
                  <span className="inline-flex items-center gap-1 bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-sm">
                    Tên: {name}
                    <button
                      onClick={() => {
                        setNameInput("");
                        updateParams({ name: "" });
                      }}
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                )}
                {brand !== "all" && (
                  <span className="inline-flex items-center gap-1 bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-sm">
                    {brands.find((b) => b.value === brand)?.label}
                    <button onClick={() => updateParams({ brand: "all" })}>
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                )}
                {region !== "all" && (
                  <span className="inline-flex items-center gap-1 bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-sm">
                    {regions.find((r) => r.value === region)?.label}
                    <button onClick={() => updateParams({ region: "all" })}>
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                )}
                {size !== "all" && (
                  <span className="inline-flex items-center gap-1 bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-sm">
                    {sizes.find((s) => s.value === size)?.label}
                    <button onClick={() => updateParams({ size: "all" })}>
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                )}
              </div>
            )}

            {/* Product Grid */}
            {paginatedProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {paginatedProducts.map((product) => (
                  <Card
                    key={product.id}
                    className="group overflow-hidden border-emerald-100 transition-all hover:-translate-y-1 hover:shadow-xl"
                  >
                    <Link to={`/shop/products/${product.id}`}>
                      <div className="relative aspect-square overflow-hidden">
                        <img
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        <span className="absolute top-2 right-2 bg-emerald-500 text-white text-xs px-2 py-1 rounded-full">
                          {product.size}
                        </span>
                      </div>
                    </Link>
                    <CardContent className="p-4">
                      <div className="mb-2 flex items-center gap-0.5">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < product.rating
                                ? "fill-amber-400 text-amber-400"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <Link to={`/shop/products/${product.id}`}>
                        <h3 className="font-semibold text-emerald-900 line-clamp-2 hover:text-emerald-700">
                          {product.name}
                        </h3>
                      </Link>
                      <p className="mt-1 text-sm text-emerald-600">
                        {brands.find((b) => b.value === product.brand)?.label} -{" "}
                        {regions.find((r) => r.value === product.region)?.label}
                      </p>
                      <p className="mt-2 text-lg font-bold text-emerald-600">
                        {formatPrice(product.price)}
                      </p>
                      {/* SỬA LỖI TẠI ĐÂY: Thay bg-gradient-to-r bằng bg-linear-to-r */}
                      <Button className="mt-4 w-full bg-linear-to-r from-emerald-500 to-green-500 text-white hover:from-emerald-600 hover:to-green-600">
                        Thêm vào giỏ
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100">
                  <Search className="h-10 w-10 text-emerald-400" />
                </div>
                <h3 className="text-lg font-semibold text-emerald-900">
                  Không tìm thấy sản phẩm
                </h3>
                <p className="mt-2 text-emerald-700">
                  Hãy thử thay đổi bộ lọc để tìm sản phẩm phù hợp
                </p>
                <Button
                  onClick={clearFilters}
                  className="mt-4 bg-emerald-500 hover:bg-emerald-600"
                >
                  Xóa bộ lọc
                </Button>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-8 flex items-center justify-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  disabled={page <= 1}
                  onClick={() => updateParams({ page: String(page - 1) })}
                  className="border-emerald-200 text-emerald-700 hover:bg-emerald-50 bg-transparent disabled:opacity-50"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>

                {Array.from({ length: totalPages }).map((_, i) => {
                  const pageNum = i + 1;
                  // Show first, last, current, and adjacent pages
                  if (
                    pageNum === 1 ||
                    pageNum === totalPages ||
                    (pageNum >= page - 1 && pageNum <= page + 1)
                  ) {
                    return (
                      <Button
                        key={pageNum}
                        variant={page === pageNum ? "default" : "outline"}
                        size="icon"
                        onClick={() => updateParams({ page: String(pageNum) })}
                        className={
                          page === pageNum
                            ? "bg-emerald-500 hover:bg-emerald-600"
                            : "border-emerald-200 text-emerald-700 hover:bg-emerald-50 bg-transparent"
                        }
                      >
                        {pageNum}
                      </Button>
                    );
                  }
                  // Show ellipsis
                  if (pageNum === page - 2 || pageNum === page + 2) {
                    return (
                      <span key={pageNum} className="px-2 text-emerald-400">
                        ...
                      </span>
                    );
                  }
                  return null;
                })}

                <Button
                  variant="outline"
                  size="icon"
                  disabled={page >= totalPages}
                  onClick={() => updateParams({ page: String(page + 1) })}
                  className="border-emerald-200 text-emerald-700 hover:bg-emerald-50 bg-transparent disabled:opacity-50"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
