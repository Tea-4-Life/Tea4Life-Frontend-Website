"use client";

import { Button } from "@/components/ui/button.tsx";
import { Label } from "@/components/ui/label.tsx";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select.tsx";
import { Search, X } from "lucide-react";
import { brands, regions, sizes } from "../constants.ts";

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
        <Label className="text-[#1A4331] font-bold uppercase text-xs tracking-wider">
          Tên sản phẩm
        </Label>
        <div className="flex gap-2">
          <input
            placeholder="Tìm theo tên..."
            value={nameInput}
            onChange={(e) => setNameInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && onSearch()}
            className="w-full h-9 bg-[#F8F5F0] border-2 border-[#1A4331]/20 px-3 text-sm text-[#1A4331] focus:outline-none focus:border-[#1A4331] placeholder-[#8A9A7A] transition-colors"
          />
          <Button
            size="icon"
            onClick={onSearch}
            className="bg-[#1A4331] text-[#F8F5F0] hover:bg-[#8A9A7A] rounded-none shrink-0 w-9 h-9"
          >
            <Search className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Brand */}
      <div className="space-y-2">
        <Label className="text-[#1A4331] font-bold uppercase text-xs tracking-wider">
          Thương hiệu
        </Label>
        <Select
          value={brand}
          onValueChange={(value) => onUpdateParams({ brand: value })}
        >
          <SelectTrigger className="border-2 border-[#1A4331]/20 bg-[#F8F5F0] text-[#1A4331] text-sm focus:ring-0 focus:ring-offset-0 rounded-none h-9">
            <SelectValue placeholder="Chọn thương hiệu" />
          </SelectTrigger>
          <SelectContent className="border border-[#1A4331]/20 bg-[#F8F5F0] rounded-none shadow-lg">
            {brands.map((b) => (
              <SelectItem
                key={b.value}
                value={b.value}
                className="text-sm text-[#1A4331] focus:bg-[#8A9A7A] focus:text-[#F8F5F0] rounded-none cursor-pointer"
              >
                {b.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Region */}
      <div className="space-y-2">
        <Label className="text-[#1A4331] font-bold uppercase text-xs tracking-wider">
          Dòng sản phẩm
        </Label>
        <Select
          value={region}
          onValueChange={(value) => onUpdateParams({ region: value })}
        >
          <SelectTrigger className="border-2 border-[#1A4331]/20 bg-[#F8F5F0] text-[#1A4331] text-sm focus:ring-0 focus:ring-offset-0 rounded-none h-9">
            <SelectValue placeholder="Chọn dòng sản phẩm" />
          </SelectTrigger>
          <SelectContent className="border border-[#1A4331]/20 bg-[#F8F5F0] rounded-none shadow-lg">
            {regions.map((r) => (
              <SelectItem
                key={r.value}
                value={r.value}
                className="text-sm text-[#1A4331] focus:bg-[#8A9A7A] focus:text-[#F8F5F0] rounded-none cursor-pointer"
              >
                {r.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Size */}
      <div className="space-y-2">
        <Label className="text-[#1A4331] font-bold uppercase text-xs tracking-wider">
          Kích cỡ
        </Label>
        <Select
          value={size}
          onValueChange={(value) => onUpdateParams({ size: value })}
        >
          <SelectTrigger className="border-2 border-[#1A4331]/20 bg-[#F8F5F0] text-[#1A4331] text-sm focus:ring-0 focus:ring-offset-0 rounded-none h-9">
            <SelectValue placeholder="Chọn kích cỡ" />
          </SelectTrigger>
          <SelectContent className="border border-[#1A4331]/20 bg-[#F8F5F0] rounded-none shadow-lg">
            {sizes.map((s) => (
              <SelectItem
                key={s.value}
                value={s.value}
                className="text-sm text-[#1A4331] focus:bg-[#8A9A7A] focus:text-[#F8F5F0] rounded-none cursor-pointer"
              >
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
          className="w-full bg-[#D2A676] text-[#1A4331] hover:bg-red-400 hover:text-white rounded-none h-9 font-bold text-xs"
        >
          <X className="h-4 w-4 mr-2" />
          Xóa Bộ Lọc
        </Button>
      )}
    </div>
  );
}
