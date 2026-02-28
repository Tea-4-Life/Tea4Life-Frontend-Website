"use client";

import { Settings2 } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProductOptionsTab from "./components/ProductOptionsTab";
import ProductOptionValuesTab from "./components/ProductOptionValuesTab";

export default function AdminProductOptionsPage() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
          <Settings2 className="h-6 w-6 text-emerald-600" /> Quản lý Tùy Chọn
          Sản Phẩm
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Quản lý các tùy chọn (size, đường, đá, topping...) và giá trị tương
          ứng
        </p>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="options" className="w-full">
        <TabsList className="bg-white border border-slate-200 shadow-sm rounded-xl p-1 h-auto">
          <TabsTrigger
            value="options"
            className="rounded-lg px-5 py-2.5 text-sm font-medium data-[state=active]:bg-emerald-600 data-[state=active]:text-white data-[state=active]:shadow-sm transition-all"
          >
            Tùy Chọn
          </TabsTrigger>
          <TabsTrigger
            value="values"
            className="rounded-lg px-5 py-2.5 text-sm font-medium data-[state=active]:bg-emerald-600 data-[state=active]:text-white data-[state=active]:shadow-sm transition-all"
          >
            Giá Trị Tùy Chọn
          </TabsTrigger>
        </TabsList>

        <TabsContent value="options" className="mt-6">
          <ProductOptionsTab />
        </TabsContent>

        <TabsContent value="values" className="mt-6">
          <ProductOptionValuesTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}
