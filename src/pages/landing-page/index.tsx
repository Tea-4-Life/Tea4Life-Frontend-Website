import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Leaf, Shield, Truck, Heart, Star, ArrowRight } from "lucide-react";

const features = [
  {
    icon: Leaf,
    title: "100% Tự nhiên",
    description: "Trà được thu hoạch từ những vùng đất cao nguyên tinh khiết",
  },
  {
    icon: Shield,
    title: "Chất lượng cao",
    description: "Quy trình sản xuất nghiêm ngặt, đạt chuẩn quốc tế",
  },
  {
    icon: Truck,
    title: "Giao hàng nhanh",
    description: "Miễn phí vận chuyển cho đơn hàng từ 500.000đ",
  },
  {
    icon: Heart,
    title: "Tận tâm phục vụ",
    description: "Đội ngũ tư vấn nhiệt tình, hỗ trợ 24/7",
  },
];

const products = [
  {
    name: "Trà Ô Long Cao Cấp",
    price: "350.000đ",
    image:
      "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=400&h=400&fit=crop",
    rating: 5,
  },
  {
    name: "Trà Xanh Thái Nguyên",
    price: "280.000đ",
    image:
      "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&h=400&fit=crop",
    rating: 5,
  },
  {
    name: "Trà Sen Tây Hồ",
    price: "420.000đ",
    image:
      "https://images.unsplash.com/photo-1597318181409-cf64d0b5d8a2?w=400&h=400&fit=crop",
    rating: 5,
  },
  {
    name: "Trà Hoa Cúc",
    price: "220.000đ",
    image:
      "https://images.unsplash.com/photo-1563911892437-1feda0179e1b?w=400&h=400&fit=crop",
    rating: 4,
  },
];

const testimonials = [
  {
    name: "Nguyễn Minh Anh",
    role: "Khách hàng thân thiết",
    content:
      "Trà của Tea4Life thực sự rất thơm ngon, mỗi buổi sáng của tôi đều bắt đầu với một tách trà ấm.",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
  },
  {
    name: "Trần Văn Đức",
    role: "Doanh nhân",
    content:
      "Chất lượng sản phẩm tuyệt vời, đóng gói cẩn thận. Tôi đã giới thiệu cho nhiều bạn bè.",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
  },
  {
    name: "Lê Thu Hằng",
    role: "Giáo viên",
    content:
      "Dịch vụ khách hàng rất chu đáo, giao hàng nhanh chóng. Sẽ tiếp tục ủng hộ Tea4Life.",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
  },
];

export default function LandingPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-green-50">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-emerald-200 blur-3xl" />
          <div className="absolute -bottom-20 -right-20 h-72 w-72 rounded-full bg-green-200 blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-32">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="text-center lg:text-left">
              <span className="inline-block rounded-full bg-emerald-100 px-4 py-1.5 text-sm font-medium text-emerald-700">
                Chào mừng đến với Tea4Life
              </span>
              <h1 className="mt-6 text-pretty text-4xl font-bold leading-tight tracking-tight text-emerald-900 sm:text-5xl lg:text-6xl">
                Giữa nhịp sống vội, trà từ tay cho{" "}
                <span className="bg-gradient-to-r from-emerald-500 to-green-500 bg-clip-text text-transparent">
                  an yên
                </span>
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-emerald-700">
                Khám phá bộ sưu tập trà cao cấp được tuyển chọn kỹ lưỡng từ
                những vùng đất tinh khiết nhất Việt Nam. Mỗi tách trà là một
                hành trình trở về với thiên nhiên.
              </p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center lg:justify-start">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-emerald-500 to-green-500 text-white hover:from-emerald-600 hover:to-green-600"
                >
                  Khám phá ngay
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-emerald-300 text-emerald-700 hover:bg-emerald-50 bg-transparent"
                >
                  Tìm hiểu thêm
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-emerald-500/20 to-green-500/20 blur-2xl" />
              <img
                src="https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=600&h=600&fit=crop"
                alt="Tách trà xanh thơm ngon"
                className="relative mx-auto aspect-square w-full max-w-md rounded-3xl object-cover shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-emerald-900 sm:text-4xl">
              Tại sao chọn Tea4Life?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-emerald-700">
              Chúng tôi mang đến trải nghiệm trà hoàn hảo nhất cho bạn
            </p>
          </div>
          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <Card
                key={feature.title}
                className="border-emerald-100 bg-emerald-50/50 transition-all hover:-translate-y-1 hover:shadow-lg"
              >
                <CardContent className="p-6 text-center">
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-green-500">
                    <feature.icon className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold text-emerald-900">
                    {feature.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-emerald-700">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="bg-gradient-to-b from-emerald-50 to-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-emerald-900 sm:text-4xl">
                Sản phẩm nổi bật
              </h2>
              <p className="mt-2 text-lg text-emerald-700">
                Những loại trà được yêu thích nhất
              </p>
            </div>
            <Button
              variant="outline"
              className="border-emerald-300 text-emerald-700 hover:bg-emerald-50 bg-transparent"
            >
              Xem tất cả
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((product) => (
              <Card
                key={product.name}
                className="group overflow-hidden border-emerald-100 transition-all hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="relative aspect-square overflow-hidden">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
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
                  <h3 className="font-semibold text-emerald-900">
                    {product.name}
                  </h3>
                  <p className="mt-1 text-lg font-bold text-emerald-600">
                    {product.price}
                  </p>
                  <Button className="mt-4 w-full bg-gradient-to-r from-emerald-500 to-green-500 text-white hover:from-emerald-600 hover:to-green-600">
                    Thêm vào giỏ
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-emerald-900 sm:text-4xl">
              Khách hàng nói gì về chúng tôi
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-emerald-700">
              Sự hài lòng của khách hàng là động lực để chúng tôi phát triển
            </p>
          </div>
          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {testimonials.map((testimonial) => (
              <Card
                key={testimonial.name}
                className="border-emerald-100 bg-gradient-to-br from-emerald-50 to-white"
              >
                <CardContent className="p-6">
                  <div className="mb-4 flex items-center gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 fill-amber-400 text-amber-400"
                      />
                    ))}
                  </div>
                  <p className="mb-6 leading-relaxed text-emerald-700">
                    "{testimonial.content}"
                  </p>
                  <div className="flex items-center gap-3">
                    <img
                      src={testimonial.avatar || "/placeholder.svg"}
                      alt={testimonial.name}
                      className="h-12 w-12 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-semibold text-emerald-900">
                        {testimonial.name}
                      </p>
                      <p className="text-sm text-emerald-600">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-emerald-500 to-green-500 py-20">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Sẵn sàng trải nghiệm?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-emerald-100">
            Đăng ký ngay hôm nay để nhận ưu đãi giảm 20% cho đơn hàng đầu tiên
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <input
              type="email"
              placeholder="Nhập email của bạn"
              className="w-full max-w-sm rounded-lg border-0 bg-white/20 px-4 py-3 text-white placeholder-emerald-100 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-white"
            />
            <Button
              size="lg"
              className="w-full bg-white text-emerald-600 hover:bg-emerald-50 sm:w-auto"
            >
              Đăng ký ngay
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
