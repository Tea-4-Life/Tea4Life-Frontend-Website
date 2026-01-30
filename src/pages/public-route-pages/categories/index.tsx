"use client";

import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Leaf, Coffee, Flower2, Sprout, ArrowRight } from "lucide-react";
import { categories } from "@/pages/public-route-pages/shop/constants";

const iconMap = {
  Leaf: Leaf,
  Coffee: Coffee,
  Flower2: Flower2,
  Sprout: Sprout,
};

export default function CategoriesPage() {
  const navigate = useNavigate();

  const handleCategoryClick = (categoryValue: string) => {
    navigate(`/shop?category=${categoryValue}`);
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-emerald-50/50 to-white py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold text-emerald-900">
            Danh mục Trà
          </h1>
          <p className="mt-4 text-emerald-700">
            Tìm kiếm loại trà phù hợp với khẩu vị của bạn
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat) => {
            const IconComponent = iconMap[cat.icon as keyof typeof iconMap];
            return (
              <Card
                key={cat.value}
                className="group cursor-pointer border-emerald-100 hover:border-emerald-500 transition-all hover:shadow-lg"
                onClick={() => handleCategoryClick(cat.value)}
              >
                <CardContent className="p-8 text-center">
                  <div className="mx-auto w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-emerald-500 transition-colors">
                    <IconComponent className="h-8 w-8 text-emerald-600 group-hover:text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-emerald-900 mb-2">
                    {cat.label}
                  </h3>
                  <p className="text-sm text-emerald-600 mb-6">
                    {cat.description}
                  </p>
                  <Button
                    variant="ghost"
                    className="text-emerald-600 group-hover:translate-x-1 transition-transform p-0"
                  >
                    Khám phá ngay <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
