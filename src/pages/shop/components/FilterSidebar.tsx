"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, X } from "lucide-react";

// Filter options
export const brands = [
  { value: "all", label: "Tất cả" },
  { value: "tea4life", label: "Tea4Life" },
  { value: "cozy", label: "Cozy" },
  { value: "phuc-long", label: "Phúc Long" },
  { value: "highlands", label: "Highlands" },
];

export const regions = [
  { value: "all", label: "Tất cả" },
  { value: "thai-nguyen", label: "Thái Nguyên" },
  { value: "lam-dong", label: "Lâm Đồng" },
  { value: "ha-giang", label: "Hà Giang" },
  { value: "tay-ho", label: "Tây Hồ" },
  { value: "moc-chau", label: "Mộc Châu" },
];

export const sizes = [
  { value: "all", label: "Tất cả" },
  { value: "50g", label: "50g" },
  { value: "100g", label: "100g" },
  { value: "200g", label: "200g" },
  { value: "500g", label: "500g" },
];

interface FilterSidebarProps {
  nameInput: string;
  setNameInput: (value: string) => void;
  brand: string;
  region: string;
  size: string;
  hasActiveFilters: boolean;
  onSearch: () => void;
  onUpdateParams: (updates: Record<string, string>) => void;
  onClearFilters: () => void;
}

export default function FilterSidebar({
  nameInput,
  setNameInput,
  brand,
  region,
  size,
  hasActiveFilters,
  onSearch,
  onUpdateParams,
  onClearFilters,
}: FilterSidebarProps) {
  return (
    <div className="space-y-6">
      {/* Name Search */}
      <div className="space-y-2">
        <Label className="text-emerald-900 font-medium">Tên sản phẩm</Label>
        <div className="flex gap-2">
          <Input
            placeholder="Tìm theo tên..."
            value={nameInput}
            onChange={(e) => setNameInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && onSearch()}
            className="border-emerald-200 focus-visible:ring-emerald-500"
          />
          <Button
            size="icon"
            onClick={onSearch}
            className="bg-emerald-500 hover:bg-emerald-600 shrink-0"
          >
            <Search className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Brand */}
      <div className="space-y-2">
        <Label className="text-emerald-900 font-medium">Thương hiệu</Label>
        <Select
          value={brand}
          onValueChange={(value) => onUpdateParams({ brand: value })}
        >
          <SelectTrigger className="border-emerald-200 focus:ring-emerald-500">
            <SelectValue placeholder="Chọn thương hiệu" />
          </SelectTrigger>
          <SelectContent>
            {brands.map((b) => (
              <SelectItem key={b.value} value={b.value}>
                {b.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Region */}
      <div className="space-y-2">
        <Label className="text-emerald-900 font-medium">Vùng miền</Label>
        <Select
          value={region}
          onValueChange={(value) => onUpdateParams({ region: value })}
        >
          <SelectTrigger className="border-emerald-200 focus:ring-emerald-500">
            <SelectValue placeholder="Chọn vùng miền" />
          </SelectTrigger>
          <SelectContent>
            {regions.map((r) => (
              <SelectItem key={r.value} value={r.value}>
                {r.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Size */}
      <div className="space-y-2">
        <Label className="text-emerald-900 font-medium">Kích cỡ</Label>
        <Select
          value={size}
          onValueChange={(value) => onUpdateParams({ size: value })}
        >
          <SelectTrigger className="border-emerald-200 focus:ring-emerald-500">
            <SelectValue placeholder="Chọn kích cỡ" />
          </SelectTrigger>
          <SelectContent>
            {sizes.map((s) => (
              <SelectItem key={s.value} value={s.value}>
                {s.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Clear Filters */}
      {hasActiveFilters && (
        <Button
          onClick={onClearFilters}
          variant="outline"
          className="w-full border-red-300 text-red-600 hover:bg-red-50 bg-transparent"
        >
          <X className="h-4 w-4 mr-2" />
          Xóa bộ lọc
        </Button>
      )}
    </div>
  );
}
