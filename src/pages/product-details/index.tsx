"use client";

import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
} from "@/components/ui/breadcrumb";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock products data (same as shop page)
const allProducts = [
  {
    id: 1,
    name: "Trà Ô Long Cao Cấp",
    price: 350000,
    size: "100g",
    brand: "tea4life",
    region: "lam-dong",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=800&h=800&fit=crop",
    description:
      "Trà Ô Long cao cấp được thu hoạch từ những đồi chè Lâm Đồng, nơi có khí hậu mát mẻ quanh năm. Hương vị đậm đà, thơm ngát với hậu vị ngọt thanh tự nhiên.",
    ingredients: "100% lá trà Ô Long tự nhiên",
    origin: "Lâm Đồng, Việt Nam",
    storage: "Bảo quản nơi khô ráo, thoáng mát, tránh ánh nắng trực tiếp",
  },
  {
    id: 2,
    name: "Trà Xanh Thái Nguyên",
    price: 280000,
    size: "100g",
    brand: "tea4life",
    region: "thai-nguyen",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=800&h=800&fit=crop",
    description:
      "Trà xanh Thái Nguyên nổi tiếng với hương thơm thanh khiết và vị chát nhẹ đặc trưng. Được trồng trên vùng đất đỏ bazan màu mỡ.",
    ingredients: "100% lá trà xanh Thái Nguyên",
    origin: "Thái Nguyên, Việt Nam",
    storage: "Bảo quản nơi khô ráo, thoáng mát",
  },
  {
    id: 3,
    name: "Trà Sen Tây Hồ",
    price: 420000,
    size: "200g",
    brand: "tea4life",
    region: "tay-ho",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1597318181409-cf64d0b5d8a2?w=800&h=800&fit=crop",
    description:
      "Trà sen Tây Hồ được ướp từ những bông sen thơm ngát của Hồ Tây. Mỗi cân trà cần hàng trăm bông sen để tạo nên hương vị độc đáo.",
    ingredients: "Trà xanh, cánh sen Tây Hồ",
    origin: "Hà Nội, Việt Nam",
    storage: "Bảo quản trong hộp kín, tránh ẩm",
  },
  {
    id: 4,
    name: "Trà Hoa Cúc",
    price: 220000,
    size: "50g",
    brand: "cozy",
    region: "ha-giang",
    rating: 4,
    image:
      "https://images.unsplash.com/photo-1563911892437-1feda0179e1b?w=800&h=800&fit=crop",
    description:
      "Trà hoa cúc với hương thơm nhẹ nhàng, giúp thư giãn tinh thần và cải thiện giấc ngủ.",
    ingredients: "100% hoa cúc tự nhiên",
    origin: "Hà Giang, Việt Nam",
    storage: "Bảo quản nơi khô ráo",
  },
  {
    id: 5,
    name: "Trà Ô Long Đặc Biệt",
    price: 480000,
    size: "200g",
    brand: "phuc-long",
    region: "lam-dong",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=800&h=800&fit=crop",
    description:
      "Trà Ô Long đặc biệt với quy trình chế biến thủ công truyền thống.",
    ingredients: "100% lá trà Ô Long chọn lọc",
    origin: "Lâm Đồng, Việt Nam",
    storage: "Bảo quản nơi khô ráo, thoáng mát",
  },
  {
    id: 6,
    name: "Trà Xanh Mộc Châu",
    price: 320000,
    size: "100g",
    brand: "highlands",
    region: "moc-chau",
    rating: 4,
    image:
      "https://images.unsplash.com/photo-1582793988951-dec231879fc3?w=800&h=800&fit=crop",
    description: "Trà xanh từ cao nguyên Mộc Châu với vị thanh mát đặc trưng.",
    ingredients: "100% lá trà xanh Mộc Châu",
    origin: "Sơn La, Việt Nam",
    storage: "Bảo quản nơi khô ráo",
  },
  {
    id: 7,
    name: "Trà Đen Premium",
    price: 380000,
    size: "100g",
    brand: "cozy",
    region: "thai-nguyen",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=800&h=800&fit=crop",
    description: "Trà đen cao cấp với hương vị đậm đà và màu nước đỏ đẹp mắt.",
    ingredients: "100% lá trà đen",
    origin: "Thái Nguyên, Việt Nam",
    storage: "Bảo quản nơi khô ráo",
  },
  {
    id: 8,
    name: "Trà Thảo Mộc Detox",
    price: 250000,
    size: "50g",
    brand: "tea4life",
    region: "ha-giang",
    rating: 4,
    image:
      "https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=800&h=800&fit=crop",
    description:
      "Trà thảo mộc thanh lọc cơ thể với sự kết hợp của nhiều loại thảo mộc quý.",
    ingredients: "Các loại thảo mộc tự nhiên",
    origin: "Hà Giang, Việt Nam",
    storage: "Bảo quản nơi khô ráo",
  },
  {
    id: 9,
    name: "Trà Sen Đặc Biệt",
    price: 550000,
    size: "500g",
    brand: "phuc-long",
    region: "tay-ho",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1558160074456-29fc4cc8cde9?w=800&h=800&fit=crop",
    description: "Trà sen đặc biệt với hương thơm nồng nàn từ sen Tây Hồ.",
    ingredients: "Trà xanh, cánh sen Tây Hồ",
    origin: "Hà Nội, Việt Nam",
    storage: "Bảo quản trong hộp kín",
  },
  {
    id: 10,
    name: "Trà Xanh Hảo Hạng",
    price: 400000,
    size: "200g",
    brand: "tea4life",
    region: "thai-nguyen",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1627435601361-ec25f5b1d0e5?w=800&h=800&fit=crop",
    description: "Trà xanh hảo hạng từ những búp chè non nhất.",
    ingredients: "100% búp trà xanh non",
    origin: "Thái Nguyên, Việt Nam",
    storage: "Bảo quản nơi khô ráo",
  },
  {
    id: 11,
    name: "Trà Ô Long Lâm Đồng",
    price: 300000,
    size: "100g",
    brand: "highlands",
    region: "lam-dong",
    rating: 4,
    image:
      "https://images.unsplash.com/photo-1594631252845-29fc4cc8cde9?w=800&h=800&fit=crop",
    description: "Trà Ô Long từ cao nguyên Lâm Đồng với hương thơm đặc trưng.",
    ingredients: "100% lá trà Ô Long",
    origin: "Lâm Đồng, Việt Nam",
    storage: "Bảo quản nơi khô ráo",
  },
  {
    id: 12,
    name: "Trà Đen Cổ Điển",
    price: 290000,
    size: "100g",
    brand: "tea4life",
    region: "thai-nguyen",
    rating: 4,
    image:
      "https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=800&h=800&fit=crop",
    description: "Trà đen cổ điển với công thức truyền thống.",
    ingredients: "100% lá trà đen",
    origin: "Thái Nguyên, Việt Nam",
    storage: "Bảo quản nơi khô ráo",
  },
  {
    id: 13,
    name: "Trà Hoa Nhài",
    price: 260000,
    size: "50g",
    brand: "cozy",
    region: "ha-giang",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1563911892437-1feda0179e1b?w=800&h=800&fit=crop",
    description: "Trà hoa nhài với hương thơm quyến rũ.",
    ingredients: "Trà xanh, hoa nhài tự nhiên",
    origin: "Hà Giang, Việt Nam",
    storage: "Bảo quản nơi khô ráo",
  },
  {
    id: 14,
    name: "Trà Xanh Matcha",
    price: 450000,
    size: "200g",
    brand: "phuc-long",
    region: "lam-dong",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1582793988951-9aed5509eb97?w=800&h=800&fit=crop",
    description: "Bột trà xanh Matcha cao cấp.",
    ingredients: "100% bột trà xanh Matcha",
    origin: "Lâm Đồng, Việt Nam",
    storage: "Bảo quản trong tủ lạnh",
  },
  {
    id: 15,
    name: "Trà Ô Long Truyền Thống",
    price: 340000,
    size: "100g",
    brand: "tea4life",
    region: "lam-dong",
    rating: 4,
    image:
      "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=800&h=800&fit=crop",
    description: "Trà Ô Long theo công thức truyền thống.",
    ingredients: "100% lá trà Ô Long",
    origin: "Lâm Đồng, Việt Nam",
    storage: "Bảo quản nơi khô ráo",
  },
  {
    id: 16,
    name: "Trà Sen Thanh Mát",
    price: 380000,
    size: "200g",
    brand: "highlands",
    region: "tay-ho",
    rating: 4,
    image:
      "https://images.unsplash.com/photo-1597318181409-cf64d0b5d8a2?w=800&h=800&fit=crop",
    description: "Trà sen với vị thanh mát dễ chịu.",
    ingredients: "Trà xanh, cánh sen",
    origin: "Hà Nội, Việt Nam",
    storage: "Bảo quản trong hộp kín",
  },
  {
    id: 17,
    name: "Trà Ô Long Hảo Hạng",
    price: 520000,
    size: "500g",
    brand: "tea4life",
    region: "lam-dong",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=800&h=800&fit=crop",
    description: "Trà Ô Long hảo hạng với chất lượng tuyệt hảo.",
    ingredients: "100% lá trà Ô Long chọn lọc",
    origin: "Lâm Đồng, Việt Nam",
    storage: "Bảo quản nơi khô ráo",
  },
  {
    id: 18,
    name: "Trà Xanh Organic",
    price: 360000,
    size: "100g",
    brand: "cozy",
    region: "moc-chau",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=800&h=800&fit=crop",
    description: "Trà xanh hữu cơ không thuốc trừ sâu.",
    ingredients: "100% lá trà xanh hữu cơ",
    origin: "Sơn La, Việt Nam",
    storage: "Bảo quản nơi khô ráo",
  },
  {
    id: 19,
    name: "Trà Đen Earl Grey",
    price: 310000,
    size: "100g",
    brand: "highlands",
    region: "thai-nguyen",
    rating: 4,
    image:
      "https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=800&h=800&fit=crop",
    description: "Trà đen Earl Grey với hương cam bergamot.",
    ingredients: "Trà đen, tinh dầu bergamot",
    origin: "Thái Nguyên, Việt Nam",
    storage: "Bảo quản nơi khô ráo",
  },
  {
    id: 20,
    name: "Trà Thảo Mộc An Thần",
    price: 280000,
    size: "50g",
    brand: "phuc-long",
    region: "ha-giang",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=800&h=800&fit=crop",
    description: "Trà thảo mộc giúp an thần, cải thiện giấc ngủ.",
    ingredients: "Các loại thảo mộc an thần",
    origin: "Hà Giang, Việt Nam",
    storage: "Bảo quản nơi khô ráo",
  },
];

const brands: Record<string, string> = {
  tea4life: "Tea4Life",
  cozy: "Cozy",
  "phuc-long": "Phúc Long",
  highlands: "Highlands",
};

const regions: Record<string, string> = {
  "lam-dong": "Lâm Đồng",
  "thai-nguyen": "Thái Nguyên",
  "tay-ho": "Tây Hồ",
  "ha-giang": "Hà Giang",
  "moc-chau": "Mộc Châu",
};

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
              {product.description}
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
                        {product.ingredients}
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium text-emerald-900">Xuất xứ</h4>
                      <p className="mt-1 text-emerald-700">{product.origin}</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-emerald-900">Kích cỡ</h4>
                      <p className="mt-1 text-emerald-700">{product.size}</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-emerald-900">Bảo quản</h4>
                      <p className="mt-1 text-emerald-700">{product.storage}</p>
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
