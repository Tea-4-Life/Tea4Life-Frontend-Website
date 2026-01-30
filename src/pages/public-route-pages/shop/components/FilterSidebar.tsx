"use client";

import { Button } from "@/components/ui/button.tsx";
import { Input } from "@/components/ui/input.tsx";
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
        <Label className="text-emerald-900 font-medium">Ten san pham</Label>
        <div className="flex gap-2">
          <Input
            placeholder="Tim theo ten..."
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
        <Label className="text-emerald-900 font-medium">Thuong hieu</Label>
        <Select
          value={brand}
          onValueChange={(value) => onUpdateParams({ brand: value })}
        >
          <SelectTrigger className="border-emerald-200 focus:ring-emerald-500">
            <SelectValue placeholder="Chon thuong hieu" />
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
        <Label className="text-emerald-900 font-medium">Vung mien</Label>
        <Select
          value={region}
          onValueChange={(value) => onUpdateParams({ region: value })}
        >
          <SelectTrigger className="border-emerald-200 focus:ring-emerald-500">
            <SelectValue placeholder="Chon vung mien" />
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
        <Label className="text-emerald-900 font-medium">Kich co</Label>
        <Select
          value={size}
          onValueChange={(value) => onUpdateParams({ size: value })}
        >
          <SelectTrigger className="border-emerald-200 focus:ring-emerald-500">
            <SelectValue placeholder="Chon kich co" />
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
          Xoa bo loc
        </Button>
      )}
    </div>
  );
}
