"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Settings2, Pencil, Trash2 } from "lucide-react";
import type { ProductOptionResponse } from "@/types/product-option/ProductOptionResponse";

// Mock data tạm
const mockOptions: ProductOptionResponse[] = [
  {
    id: "1",
    name: "Kích cỡ",
    isRequired: true,
    isMultiSelect: false,
    sortOrder: 1,
    productIds: ["p1", "p2", "p3"],
  },
  {
    id: "2",
    name: "Mức đường",
    isRequired: true,
    isMultiSelect: false,
    sortOrder: 2,
    productIds: ["p1", "p2"],
  },
  {
    id: "3",
    name: "Mức đá",
    isRequired: true,
    isMultiSelect: false,
    sortOrder: 3,
    productIds: ["p1", "p2", "p3"],
  },
  {
    id: "4",
    name: "Topping",
    isRequired: false,
    isMultiSelect: true,
    sortOrder: 4,
    productIds: ["p1"],
  },
];

export default function ProductOptionsTab() {
  const [data] = useState<ProductOptionResponse[]>(mockOptions);
  const [loading] = useState(false);

  return (
    <div className="space-y-4">
      {/* Sub-header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <p className="text-sm text-slate-500">
          Tổng cộng:{" "}
          <span className="font-semibold text-emerald-700">{data.length}</span>{" "}
          tùy chọn
        </p>
        <Button className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium shadow-sm transition-all shadow-emerald-200">
          <Plus className="h-4 w-4 mr-2" /> Thêm Tùy Chọn
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
                Tên tùy chọn
              </th>
              <th className="text-left px-5 py-3.5 font-semibold text-slate-600 text-xs uppercase tracking-wider">
                Bắt buộc
              </th>
              <th className="text-left px-5 py-3.5 font-semibold text-slate-600 text-xs uppercase tracking-wider">
                Chọn nhiều
              </th>
              <th className="text-left px-5 py-3.5 font-semibold text-slate-600 text-xs uppercase tracking-wider">
                Thứ tự
              </th>
              <th className="text-left px-5 py-3.5 font-semibold text-slate-600 text-xs uppercase tracking-wider">
                Sản phẩm
              </th>
              <th className="text-right px-5 py-3.5 font-semibold text-slate-600 text-xs uppercase tracking-wider">
                Thao tác
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {loading ? (
              Array.from({ length: 4 }).map((_, i) => (
                <tr key={i} className="animate-pulse">
                  {Array.from({ length: 7 }).map((_, j) => (
                    <td key={j} className="px-5 py-4">
                      <div className="h-4 bg-slate-100 rounded w-20" />
                    </td>
                  ))}
                </tr>
              ))
            ) : data.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center py-12 text-slate-400">
                  <Settings2 className="h-10 w-10 mx-auto mb-3 text-slate-300" />
                  <p className="font-medium">Chưa có tùy chọn nào</p>
                  <p className="text-xs mt-1">
                    Nhấn "Thêm Tùy Chọn" để bắt đầu
                  </p>
                </td>
              </tr>
            ) : (
              data.map((option, idx) => (
                <tr
                  key={option.id}
                  className="hover:bg-emerald-50/30 transition-colors"
                >
                  <td className="px-5 py-4 text-slate-400 font-mono text-xs">
                    {idx + 1}
                  </td>
                  <td className="px-5 py-4 font-semibold text-slate-800">
                    {option.name}
                  </td>
                  <td className="px-5 py-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${
                        option.isRequired
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                          : "bg-slate-50 text-slate-500 border border-slate-200"
                      }`}
                    >
                      {option.isRequired ? "Có" : "Không"}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${
                        option.isMultiSelect
                          ? "bg-blue-50 text-blue-700 border border-blue-200"
                          : "bg-slate-50 text-slate-500 border border-slate-200"
                      }`}
                    >
                      {option.isMultiSelect ? "Có" : "Không"}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-slate-600">
                    {option.sortOrder}
                  </td>
                  <td className="px-5 py-4">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
                      {option.productIds.length} sản phẩm
                    </span>
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
