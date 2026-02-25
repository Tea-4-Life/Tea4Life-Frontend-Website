"use client";

import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button.tsx";
import { Card, CardContent } from "@/components/ui/card.tsx";
import {
  Star,
  Minus,
  Plus,
  ShoppingCart,
  Heart,
  Share2,
  Truck,
  Shield,
  RotateCcw,
  ChevronLeft,
  Leaf,
} from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb.tsx";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs.tsx";

import {
  allProducts,
  brands as brandList,
  regions as regionList,
} from "../shop/constants.ts";

const brands: Record<string, string> = brandList.reduce(
  (acc, b) => {
    acc[b.value] = b.label;
    return acc;
  },
  {} as Record<string, string>,
);

const regions: Record<string, string> = regionList.reduce(
  (acc, r) => {
    acc[r.value] = r.label;
    return acc;
  },
  {} as Record<string, string>,
);

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);

  const product = allProducts.find((p) => p.id === Number(id));

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-emerald-50/50 to-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-emerald-900 mb-4">
            Không tìm thấy sản phẩm
          </h1>
          <Link to="/shop">
            <Button className="bg-emerald-500 hover:bg-emerald-600">
              <ChevronLeft className="h-4 w-4 mr-2" />
              Quay lại cửa hàng
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  // Related products (same brand or region)
  const relatedProducts = allProducts
    .filter(
      (p) =>
        p.id !== product.id &&
        (p.brand === product.brand || p.region === product.region),
    )
    .slice(0, 4);

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50/50 to-white">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <Breadcrumb className="mb-8">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link
                  to="/"
                  className="text-emerald-600 hover:text-emerald-700"
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
                  className="text-emerald-600 hover:text-emerald-700"
                >
                  Cửa hàng
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="text-emerald-900">
                {product.name}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* Product Detail */}
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Product Image */}
          <div className="relative">
            <div className="overflow-hidden rounded-2xl bg-white shadow-lg">
              <img
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                className="h-full w-full object-cover aspect-square"
              />
            </div>
            <span className="absolute top-4 left-4 bg-gradient-to-r from-emerald-500 to-green-500 text-white text-sm px-3 py-1 rounded-full font-medium">
              {product.size}
            </span>
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            <div className="mb-2 flex items-center gap-2">
              <span className="text-sm text-emerald-600 font-medium">
                {brands[product.brand]}
              </span>
              <span className="text-emerald-300">|</span>
              <span className="text-sm text-emerald-600">
                {regions[product.region]}
              </span>
            </div>

            <h1 className="text-3xl font-bold text-emerald-900 sm:text-4xl">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="mt-4 flex items-center gap-2">
              <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < product.rating
                        ? "fill-amber-400 text-amber-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-emerald-700">
                ({product.rating}/5 - 128 đánh giá)
              </span>
            </div>

            {/* Price */}
            <p className="mt-6 text-4xl font-bold text-emerald-600">
              {formatPrice(product.price)}
            </p>

            {/* Description */}
            <p className="mt-6 text-emerald-700 leading-relaxed">
              {(product as any).description ||
                "Thức uống tuyệt hảo mang lại những trải nghiệm khó quên cho bạn."}
            </p>

            {/* Quantity */}
            <div className="mt-8">
              <label className="text-sm font-medium text-emerald-900">
                Số lượng
              </label>
              <div className="mt-2 flex items-center gap-3">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="border-emerald-300 text-emerald-700 bg-transparent"
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-12 text-center text-lg font-semibold text-emerald-900">
                  {quantity}
                </span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(quantity + 1)}
                  className="border-emerald-300 text-emerald-700 bg-transparent"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button
                size="lg"
                className="flex-1 bg-gradient-to-r from-emerald-500 to-green-500 text-white hover:from-emerald-600 hover:to-green-600"
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                Thêm vào giỏ hàng
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => setIsFavorite(!isFavorite)}
                className={`border-emerald-300 bg-transparent ${
                  isFavorite
                    ? "text-red-500 border-red-300"
                    : "text-emerald-700"
                }`}
              >
                <Heart
                  className={`h-5 w-5 ${isFavorite ? "fill-red-500" : ""}`}
                />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-emerald-300 text-emerald-700 bg-transparent"
              >
                <Share2 className="h-5 w-5" />
              </Button>
            </div>

            {/* Benefits */}
            <div className="mt-8 grid grid-cols-3 gap-4">
              <div className="flex flex-col items-center text-center p-3 bg-emerald-50 rounded-lg">
                <Truck className="h-6 w-6 text-emerald-600 mb-2" />
                <span className="text-xs text-emerald-700">
                  Miễn phí vận chuyển
                </span>
              </div>
              <div className="flex flex-col items-center text-center p-3 bg-emerald-50 rounded-lg">
                <Shield className="h-6 w-6 text-emerald-600 mb-2" />
                <span className="text-xs text-emerald-700">
                  Bảo đảm chất lượng
                </span>
              </div>
              <div className="flex flex-col items-center text-center p-3 bg-emerald-50 rounded-lg">
                <RotateCcw className="h-6 w-6 text-emerald-600 mb-2" />
                <span className="text-xs text-emerald-700">Đổi trả 7 ngày</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-12">
          <Tabs defaultValue="details" className="w-full">
            <TabsList className="w-full justify-start border-b border-emerald-100 bg-transparent h-auto p-0">
              <TabsTrigger
                value="details"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-emerald-500 data-[state=active]:bg-transparent data-[state=active]:text-emerald-700 px-6 py-3"
              >
                Chi tiết sản phẩm
              </TabsTrigger>
              <TabsTrigger
                value="reviews"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-emerald-500 data-[state=active]:bg-transparent data-[state=active]:text-emerald-700 px-6 py-3"
              >
                Đánh giá (128)
              </TabsTrigger>
              <TabsTrigger
                value="shipping"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-emerald-500 data-[state=active]:bg-transparent data-[state=active]:text-emerald-700 px-6 py-3"
              >
                Vận chuyển
              </TabsTrigger>
            </TabsList>
            <TabsContent value="details" className="mt-6">
              <Card className="border-emerald-100">
                <CardContent className="p-6 space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <h4 className="font-medium text-emerald-900 flex items-center gap-2">
                        <Leaf className="h-4 w-4 text-emerald-600" />
                        Thành phần
                      </h4>
                      <p className="mt-1 text-emerald-700">
                        {(product as any).ingredients ||
                          "Hồng trà, sữa, trân châu"}
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium text-emerald-900">Xuất xứ</h4>
                      <p className="mt-1 text-emerald-700">
                        {(product as any).origin || "Việt Nam"}
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium text-emerald-900">Kích cỡ</h4>
                      <p className="mt-1 text-emerald-700">{product.size}</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-emerald-900">Bảo quản</h4>
                      <p className="mt-1 text-emerald-700">
                        {(product as any).storage || "Bảo quản nơi mát mẻ"}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="reviews" className="mt-6">
              <Card className="border-emerald-100">
                <CardContent className="p-6">
                  <p className="text-emerald-700">
                    Chức năng đánh giá đang được phát triển...
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="shipping" className="mt-6">
              <Card className="border-emerald-100">
                <CardContent className="p-6 space-y-4">
                  <div>
                    <h4 className="font-medium text-emerald-900">
                      Thời gian giao hàng
                    </h4>
                    <p className="mt-1 text-emerald-700">
                      - Nội thành: 1-2 ngày làm việc
                      <br />- Ngoại thành: 3-5 ngày làm việc
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium text-emerald-900">
                      Phí vận chuyển
                    </h4>
                    <p className="mt-1 text-emerald-700">
                      - Miễn phí cho đơn hàng từ 500.000đ
                      <br />- Phí 30.000đ cho đơn hàng dưới 500.000đ
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-emerald-900 mb-6">
              Sản phẩm liên quan
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {relatedProducts.map((p) => (
                <Link key={p.id} to={`/shop/products/${p.id}`}>
                  <Card className="group overflow-hidden border-emerald-100 transition-all hover:-translate-y-1 hover:shadow-xl">
                    <div className="relative aspect-square overflow-hidden">
                      <img
                        src={p.image || "/placeholder.svg"}
                        alt={p.name}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <span className="absolute top-2 right-2 bg-emerald-500 text-white text-xs px-2 py-1 rounded-full">
                        {p.size}
                      </span>
                    </div>
                    <CardContent className="p-4">
                      <div className="mb-2 flex items-center gap-0.5">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < p.rating
                                ? "fill-amber-400 text-amber-400"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <h3 className="font-semibold text-emerald-900 line-clamp-2">
                        {p.name}
                      </h3>
                      <p className="mt-2 text-lg font-bold text-emerald-600">
                        {formatPrice(p.price)}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
