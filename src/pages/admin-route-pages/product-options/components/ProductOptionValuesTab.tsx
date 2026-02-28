"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, ListChecks, Pencil, Trash2 } from "lucide-react";
import type { ProductOptionValueResponse } from "@/types/product-option/ProductOptionValueResponse";

// Mock data tạm
const mockValues: ProductOptionValueResponse[] = [
  {
    id: "1",
    productOptionId: "1",
    valueName: "Size S",
    extraPrice: -5000,
    sortOrder: 1,
  },
  {
    id: "2",
    productOptionId: "1",
    valueName: "Size M",
    extraPrice: 0,
    sortOrder: 2,
  },
  {
    id: "3",
    productOptionId: "1",
    valueName: "Size L",
    extraPrice: 10000,
    sortOrder: 3,
  },
  {
    id: "4",
    productOptionId: "2",
    valueName: "0% đường",
    extraPrice: 0,
    sortOrder: 1,
  },
  {
    id: "5",
    productOptionId: "2",
    valueName: "30% đường",
    extraPrice: 0,
    sortOrder: 2,
  },
  {
    id: "6",
    productOptionId: "2",
    valueName: "50% đường",
    extraPrice: 0,
    sortOrder: 3,
  },
  {
    id: "7",
    productOptionId: "2",
    valueName: "70% đường",
    extraPrice: 0,
    sortOrder: 4,
  },
  {
    id: "8",
    productOptionId: "2",
    valueName: "100% đường",
    extraPrice: 0,
    sortOrder: 5,
  },
  {
    id: "9",
    productOptionId: "4",
    valueName: "Trân châu đen",
    extraPrice: 8000,
    sortOrder: 1,
  },
  {
    id: "10",
    productOptionId: "4",
    valueName: "Thạch dừa",
    extraPrice: 7000,
    sortOrder: 2,
  },
  {
    id: "11",
    productOptionId: "4",
    valueName: "Pudding",
    extraPrice: 10000,
    sortOrder: 3,
  },
  {
    id: "12",
    productOptionId: "4",
    valueName: "Kem cheese",
    extraPrice: 15000,
    sortOrder: 4,
  },
];

function formatPrice(value: number): string {
  if (value === 0) return "—";
  const formatted = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(Math.abs(value));
  return value > 0 ? `+${formatted}` : `-${formatted}`;
}

// Map optionId -> tên (giả lập, sau này lấy từ API)
const optionNameMap: Record<string, string> = {
  "1": "Kích cỡ",
  "2": "Mức đường",
  "3": "Mức đá",
  "4": "Topping",
};

export default function ProductOptionValuesTab() {
  const [data] = useState<ProductOptionValueResponse[]>(mockValues);
  const [loading] = useState(false);

  return (
    <div className="space-y-4">
      {/* Sub-header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <p className="text-sm text-slate-500">
          Tổng cộng:{" "}
          <span className="font-semibold text-emerald-700">{data.length}</span>{" "}
          giá trị
        </p>
        <Button className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium shadow-sm transition-all shadow-emerald-200">
          <Plus className="h-4 w-4 mr-2" /> Thêm Giá Trị
        </Button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              <th className="text-left px-5 py-3.5 font-semibold text-slate-600 text-xs uppercase tracking-wider">
                #
              </th>
              <th className="text-left px-5 py-3.5 font-semibold text-slate-600 text-xs uppercase tracking-wider">
                Tùy chọn gốc
              </th>
              <th className="text-left px-5 py-3.5 font-semibold text-slate-600 text-xs uppercase tracking-wider">
                Tên giá trị
              </th>
              <th className="text-left px-5 py-3.5 font-semibold text-slate-600 text-xs uppercase tracking-wider">
                Giá thêm
              </th>
              <th className="text-left px-5 py-3.5 font-semibold text-slate-600 text-xs uppercase tracking-wider">
                Thứ tự
              </th>
              <th className="text-right px-5 py-3.5 font-semibold text-slate-600 text-xs uppercase tracking-wider">
                Thao tác
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {loading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <tr key={i} className="animate-pulse">
                  {Array.from({ length: 6 }).map((_, j) => (
                    <td key={j} className="px-5 py-4">
                      <div className="h-4 bg-slate-100 rounded w-20" />
                    </td>
                  ))}
                </tr>
              ))
            ) : data.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-12 text-slate-400">
                  <ListChecks className="h-10 w-10 mx-auto mb-3 text-slate-300" />
                  <p className="font-medium">Chưa có giá trị nào</p>
                  <p className="text-xs mt-1">Nhấn "Thêm Giá Trị" để bắt đầu</p>
                </td>
              </tr>
            ) : (
              data.map((value, idx) => (
                <tr
                  key={value.id}
                  className="hover:bg-emerald-50/30 transition-colors"
                >
                  <td className="px-5 py-4 text-slate-400 font-mono text-xs">
                    {idx + 1}
                  </td>
                  <td className="px-5 py-4">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-600 border border-slate-200">
                      {optionNameMap[value.productOptionId] ||
                        value.productOptionId}
                    </span>
                  </td>
                  <td className="px-5 py-4 font-semibold text-slate-800">
                    {value.valueName}
                  </td>
                  <td className="px-5 py-4">
                    <span
                      className={`font-medium ${
                        value.extraPrice > 0
                          ? "text-emerald-600"
                          : value.extraPrice < 0
                            ? "text-red-500"
                            : "text-slate-400"
                      }`}
                    >
                      {formatPrice(value.extraPrice)}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-slate-600">
                    {value.sortOrder}
                  </td>
                  <td className="px-5 py-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50"
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 text-slate-400 hover:text-red-600 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
