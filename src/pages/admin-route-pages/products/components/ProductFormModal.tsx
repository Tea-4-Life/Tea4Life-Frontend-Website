import { useEffect, useMemo, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { CreateProductRequest } from "@/types/product/CreateProductRequest";
import type { ProductResponse } from "@/types/product/ProductResponse";
import type { ProductCategoryResponse } from "@/types/product-category/ProductCategoryResponse";
import type { ProductOptionResponse } from "@/types/product-option/ProductOptionResponse";

interface ProductFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  loading: boolean;
  initialData: ProductResponse | null;
  categories: ProductCategoryResponse[];
  options: ProductOptionResponse[];
  onSubmit: (data: CreateProductRequest, id?: string) => Promise<void>;
}

export default function ProductFormModal({
  isOpen,
  onClose,
  loading,
  initialData,
  categories,
  options,
  onSubmit,
}: ProductFormModalProps) {
  const [productCategoryId, setProductCategoryId] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [basePrice, setBasePrice] = useState<number>(0);
  const [imageKey, setImageKey] = useState("");
  const [selectedOptionIds, setSelectedOptionIds] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setProductCategoryId(
      initialData?.productCategoryId || (categories[0]?.id ?? ""),
    );
    setName(initialData?.name || "");
    setDescription(initialData?.description || "");
    setBasePrice(initialData?.basePrice || 0);
    setImageKey("");
    setSelectedOptionIds(initialData?.productOptionIds || []);
    setError(null);
  }, [isOpen, initialData, categories]);

  const selectedOptionSet = useMemo(
    () => new Set(selectedOptionIds),
    [selectedOptionIds],
  );

  const toggleOption = (optionId: string) => {
    setSelectedOptionIds((prev) =>
      prev.includes(optionId)
        ? prev.filter((id) => id !== optionId)
        : [...prev, optionId],
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!productCategoryId) {
      setError("Vui lòng chọn danh mục.");
      return;
    }
    if (!name.trim()) {
      setError("Tên sản phẩm không được để trống.");
      return;
    }
    if (basePrice <= 0) {
      setError("Giá bán phải lớn hơn 0.");
      return;
    }

    await onSubmit(
      {
        productCategoryId,
        name: name.trim(),
        description: description.trim() || undefined,
        basePrice: Number(basePrice),
        imageKey: imageKey.trim() || undefined,
        productOptionIds: selectedOptionIds,
      },
      initialData?.id,
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[640px] sm:rounded-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl">
            {initialData ? "Cập nhật sản phẩm" : "Tạo sản phẩm mới"}
          </DialogTitle>
        </DialogHeader>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {error && (
            <div className="text-sm text-red-600 bg-red-50 border border-red-100 px-3 py-2 rounded-md">
              {error}
            </div>
          )}

          <div className="grid gap-2">
            <Label className="text-slate-700 font-medium">Danh mục</Label>
            <select
              value={productCategoryId}
              onChange={(e) => setProductCategoryId(e.target.value)}
              className="h-10 rounded-lg border border-slate-300 bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2"
              disabled={loading}
            >
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div className="grid gap-2">
            <Label className="text-slate-700 font-medium">Tên sản phẩm</Label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={loading}
              className="rounded-lg focus-visible:ring-emerald-500"
              placeholder="Ví dụ: Trà sữa Ô long..."
            />
          </div>

          <div className="grid gap-2">
            <Label className="text-slate-700 font-medium">Mô tả</Label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              disabled={loading}
              className="rounded-lg focus-visible:ring-emerald-500"
              placeholder="Thông tin chi tiết về sản phẩm..."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label className="text-slate-700 font-medium">
                Giá bán (VNĐ)
              </Label>
              <Input
                type="number"
                value={basePrice}
                onChange={(e) => setBasePrice(Number(e.target.value))}
                disabled={loading}
                className="rounded-lg focus-visible:ring-emerald-500"
              />
            </div>

            <div className="grid gap-2">
              <Label className="text-slate-700 font-medium">
                Image key (từ storage)
              </Label>
              <Input
                value={imageKey}
                onChange={(e) => setImageKey(e.target.value)}
                placeholder="tmp/xxx.png"
                disabled={loading}
                className="rounded-lg focus-visible:ring-emerald-500"
              />
            </div>
          </div>

          <div className="grid gap-2">
            <Label className="text-slate-700 font-medium">
              Tuỳ chọn áp dụng (size, đường, đá, topping...)
            </Label>
            <div className="max-h-48 overflow-y-auto rounded-lg border border-slate-200 bg-slate-50/50 p-4 space-y-3">
              {options.length === 0 ? (
                <p className="text-sm text-slate-500 text-center py-4">
                  Không có tuỳ chọn nào.
                </p>
              ) : (
                options.map((opt) => (
                  <label
                    key={opt.id}
                    className="flex items-start gap-3 text-sm cursor-pointer group"
                  >
                    <div className="mt-0.5">
                      <input
                        type="checkbox"
                        checked={selectedOptionSet.has(opt.id)}
                        onChange={() => toggleOption(opt.id)}
                        disabled={loading}
                        className="h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-600 focus:ring-offset-2 transition-all cursor-pointer"
                      />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-medium text-slate-700 group-hover:text-emerald-700 transition-colors">
                        {opt.name}
                      </span>
                      <span className="text-xs text-slate-500">
                        {opt.isRequired ? "Bắt buộc • " : "Không bắt buộc • "}
                        {opt.isMultiSelect ? "Chọn nhiều" : "Chọn một"}
                      </span>
                    </div>
                  </label>
                ))
              )}
            </div>
          </div>

          <DialogFooter className="gap-2 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={loading}
              className="rounded-lg"
            >
              Huỷ
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white transition-all shadow-sm shadow-emerald-200"
            >
              {loading ? "Đang lưu..." : "Lưu"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
