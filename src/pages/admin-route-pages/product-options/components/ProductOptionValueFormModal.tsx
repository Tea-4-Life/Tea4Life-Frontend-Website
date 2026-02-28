import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { ProductOptionValueResponse } from "@/types/product-option/ProductOptionValueResponse";
import type { CreateProductOptionValueRequest } from "@/types/product-option/CreateProductOptionValueRequest";
import type { ProductOptionResponse } from "@/types/product-option/ProductOptionResponse";

interface ProductOptionValueFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (
    optionId: string,
    data: CreateProductOptionValueRequest,
    id?: string,
  ) => Promise<void>;
  loading: boolean;
  initialData: ProductOptionValueResponse | null;
  options: ProductOptionResponse[];
  initialOptionId: string | null;
}

export default function ProductOptionValueFormModal({
  isOpen,
  onClose,
  onSubmit,
  loading,
  initialData,
  options,
  initialOptionId,
}: ProductOptionValueFormModalProps) {
  const [optionId, setOptionId] = useState("");
  const [valueName, setValueName] = useState("");
  const [extraPrice, setExtraPrice] = useState<number>(0);
  const [sortOrder, setSortOrder] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setValueName(initialData ? initialData.valueName : "");
      setExtraPrice(initialData ? initialData.extraPrice : 0);
      setSortOrder(initialData ? initialData.sortOrder : 0);
      setOptionId(
        initialData
          ? initialOptionId || ""
          : initialOptionId || (options.length > 0 ? options[0].id : ""),
      );
      setError(null);
    }
  }, [isOpen, initialData, initialOptionId, options]);

  const handleSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!optionId) {
      setError("Vui lòng chọn Tùy chọn cha.");
      return;
    }
    if (!valueName.trim()) {
      setError("Tên giá trị không được để trống.");
      return;
    }
    if (sortOrder < 0) {
      setError("Thứ tự không thể nhỏ hơn 0.");
      return;
    }

    try {
      await onSubmit(
        optionId,
        {
          valueName: valueName.trim(),
          extraPrice: Number(extraPrice),
          sortOrder: Number(sortOrder),
        },
        initialData?.id,
      );
    } catch (error) {
      const err = error as {
        response?: { data?: { message?: string } };
        message?: string;
      };
      setError(err.response?.data?.message || err.message || "Có lỗi xảy ra");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[450px] p-0 overflow-hidden bg-white border-none rounded-2xl shadow-2xl">
        <DialogHeader className="px-6 py-4 bg-emerald-50 border-b border-emerald-100">
          <DialogTitle className="text-xl font-bold text-emerald-900">
            {initialData ? "Chỉnh Sửa Giá Trị" : "Thêm Giá Trị Mới"}
          </DialogTitle>
          <p className="text-sm text-emerald-700 mt-1">
            Điền thông tin và chọn Tùy chọn cha tương ứng
          </p>
        </DialogHeader>

        <form onSubmit={handleSubmitForm}>
          <div className="p-6 space-y-6">
            {error && (
              <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg text-sm border border-red-100 font-medium">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <Label className="text-emerald-900 font-semibold text-sm">
                Thuộc Tùy Chọn <span className="text-red-500">*</span>
              </Label>
              <Select
                value={optionId}
                onValueChange={setOptionId}
                disabled={loading || !!initialData}
              >
                <SelectTrigger className="w-full border-emerald-200 focus:ring-emerald-500 rounded-xl">
                  <SelectValue placeholder="Chọn Tùy chọn" />
                </SelectTrigger>
                <SelectContent>
                  {options.map((opt) => (
                    <SelectItem key={opt.id} value={opt.id}>
                      {opt.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="valueName"
                className="text-emerald-900 font-semibold text-sm"
              >
                Tên Giá Trị <span className="text-red-500">*</span>
              </Label>
              <Input
                id="valueName"
                value={valueName}
                onChange={(e) => setValueName(e.target.value)}
                placeholder="VD: Size S, 50% Đường, Trân Châu Trắng..."
                className="border-emerald-200 focus-visible:ring-emerald-500 focus-visible:border-emerald-500 rounded-xl"
                disabled={loading}
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="extraPrice"
                className="text-emerald-900 font-semibold text-sm"
              >
                Giá Tiền Thêm (VND)
              </Label>
              <Input
                id="extraPrice"
                type="number"
                value={extraPrice}
                onChange={(e) => setExtraPrice(Number(e.target.value))}
                placeholder="VD: 5000, 10000, 0, -5000..."
                className="border-emerald-200 focus-visible:ring-emerald-500 focus-visible:border-emerald-500 rounded-xl"
                disabled={loading}
              />
              <p className="text-[11px] text-slate-500">
                Có thể nhập số âm (giảm giá) hoặc 0.
              </p>
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="sortOrder"
                className="text-emerald-900 font-semibold text-sm"
              >
                Thứ Tự Hiển Thị
              </Label>
              <Input
                id="sortOrder"
                type="number"
                min="0"
                value={sortOrder}
                onChange={(e) => setSortOrder(Number(e.target.value))}
                className="border-emerald-200 focus-visible:ring-emerald-500 focus-visible:border-emerald-500 rounded-xl"
                disabled={loading}
              />
            </div>
          </div>

          <DialogFooter className="px-6 py-4 bg-slate-50 border-t flex justify-end gap-2">
            <Button
              type="button"
              variant="ghost"
              onClick={onClose}
              disabled={loading}
              className="text-slate-600 hover:bg-slate-200 hover:text-slate-900 rounded-lg font-medium"
            >
              Hủy
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-md rounded-lg font-medium min-w-[120px]"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Đang Lưu
                </>
              ) : (
                "Lưu Quyết Định"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
