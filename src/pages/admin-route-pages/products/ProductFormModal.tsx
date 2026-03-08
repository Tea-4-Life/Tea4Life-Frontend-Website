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
      setError("Vui long chon danh muc.");
      return;
    }
    if (!name.trim()) {
      setError("Ten san pham khong duoc de trong.");
      return;
    }
    if (basePrice <= 0) {
      setError("Gia ban phai lon hon 0.");
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
      <DialogContent className="sm:max-w-[640px]">
        <DialogHeader>
          <DialogTitle>
            {initialData ? "Cap nhat san pham" : "Tao san pham moi"}
          </DialogTitle>
        </DialogHeader>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {error && (
            <div className="text-sm text-red-600 bg-red-50 border border-red-100 px-3 py-2 rounded-md">
              {error}
            </div>
          )}

          <div className="grid gap-2">
            <Label>Danh muc</Label>
            <select
              value={productCategoryId}
              onChange={(e) => setProductCategoryId(e.target.value)}
              className="h-10 rounded-md border border-input bg-background px-3 text-sm"
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
            <Label>Ten san pham</Label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={loading}
            />
          </div>

          <div className="grid gap-2">
            <Label>Mo ta</Label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              disabled={loading}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label>Gia ban (VND)</Label>
              <Input
                type="number"
                value={basePrice}
                onChange={(e) => setBasePrice(Number(e.target.value))}
                disabled={loading}
              />
            </div>

            <div className="grid gap-2">
              <Label>Image key (tu storage)</Label>
              <Input
                value={imageKey}
                onChange={(e) => setImageKey(e.target.value)}
                placeholder="tmp/xxx.png"
                disabled={loading}
              />
            </div>
          </div>

          <div className="grid gap-2">
            <Label>Tuy chon ap dung (size, duong, da, topping...)</Label>
            <div className="max-h-44 overflow-y-auto rounded-md border p-3 space-y-2">
              {options.map((opt) => (
                <label key={opt.id} className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={selectedOptionSet.has(opt.id)}
                    onChange={() => toggleOption(opt.id)}
                    disabled={loading}
                  />
                  <span>{opt.name}</span>
                </label>
              ))}
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={loading}
            >
              Huy
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Dang luu..." : "Luu"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
