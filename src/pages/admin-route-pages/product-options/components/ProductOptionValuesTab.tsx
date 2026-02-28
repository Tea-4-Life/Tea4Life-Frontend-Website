"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Plus, ListChecks, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { handleError } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  getProductOptionValuesApi,
  createProductOptionValueApi,
  updateProductOptionValueApi,
  deleteProductOptionValueApi,
} from "@/services/admin/productOptionValueAdminApi";

import { getAllProductOptionsApi } from "@/services/admin/productOptionAdminApi";

import type { ProductOptionValueResponse } from "@/types/product-option/ProductOptionValueResponse";
import type { CreateProductOptionValueRequest } from "@/types/product-option/CreateProductOptionValueRequest";
import type { ProductOptionResponse } from "@/types/product-option/ProductOptionResponse";

import { ConfirmationDialog } from "@/components/custom/ConfirmationDialog";
import ProductOptionValueFormModal from "./ProductOptionValueFormModal";

function formatPrice(value: number): string {
  if (value === 0) return "—";
  const formatted = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(Math.abs(value));
  return value > 0 ? `+${formatted}` : `-${formatted}`;
}

export default function ProductOptionValuesTab() {
  const [options, setOptions] = useState<ProductOptionResponse[]>([]);
  const [selectedOptionId, setSelectedOptionId] = useState<string>("");

  const [data, setData] = useState<ProductOptionValueResponse[]>([]);
  const [loading, setLoading] = useState(false);

  // Modal
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [currentValue, setCurrentValue] =
    useState<ProductOptionValueResponse | null>(null);

  // Delete Dialog
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleteName, setDeleteName] = useState("");

  const fetchOptions = useCallback(async () => {
    try {
      const response = await getAllProductOptionsApi();
      const optionsData = response.data.data || [];
      setOptions(optionsData);
      if (optionsData.length > 0 && !selectedOptionId) {
        setSelectedOptionId(optionsData[0].id);
      }
    } catch (error) {
      handleError(error, "Không thể tải danh sách tùy chọn (cho bộ lọc).");
    }
  }, [selectedOptionId]);

  useEffect(() => {
    fetchOptions();
  }, [fetchOptions]);

  const fetchValues = useCallback(async () => {
    if (!selectedOptionId) {
      setData([]);
      return;
    }
    setLoading(true);
    try {
      const response = await getProductOptionValuesApi(selectedOptionId, {
        page: 1,
        size: 1000,
      });
      // The backend returns a PageResponse: { data: { content: [...] } }
      setData(response.data.data.content || []);
    } catch (error) {
      handleError(error, "Không thể tải danh sách giá trị của tùy chọn.");
    } finally {
      setLoading(false);
    }
  }, [selectedOptionId]);

  useEffect(() => {
    fetchValues();
  }, [fetchValues]);

  const selectedOptionObj = useMemo(
    () => options.find((o) => o.id === selectedOptionId) || null,
    [options, selectedOptionId],
  );

  const handleOpenCreateForm = () => {
    setCurrentValue(null);
    setIsFormOpen(true);
  };

  const handleOpenEditForm = (value: ProductOptionValueResponse) => {
    setCurrentValue(value);
    setIsFormOpen(true);
  };

  const handleFormSubmit = async (
    formData: CreateProductOptionValueRequest,
    id?: string,
  ) => {
    if (!selectedOptionId) return;
    setFormLoading(true);
    try {
      if (id) {
        await updateProductOptionValueApi(selectedOptionId, id, formData);
        toast.success("Cập nhật giá trị thành công!");
      } else {
        await createProductOptionValueApi(selectedOptionId, formData);
        toast.success("Thêm giá trị mới thành công!");
      }
      setIsFormOpen(false);
      fetchValues();
    } catch (error) {
      handleError(error, "Lưu giá trị thất bại.");
    } finally {
      setFormLoading(false);
    }
  };

  const handleOpenDeleteDialog = (id: string, name: string) => {
    setDeleteId(id);
    setDeleteName(name);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!deleteId || !selectedOptionId) return;
    setDeleteLoading(true);
    try {
      await deleteProductOptionValueApi(selectedOptionId, deleteId);
      toast.success(`Đã xóa giá trị "${deleteName}"`);
      setIsDeleteDialogOpen(false);
      fetchValues();
    } catch (error) {
      handleError(error, "Xóa giá trị thất bại.");
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* Sub-header & Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
        <div className="flex flex-col sm:flex-row gap-4 sm:items-center">
          <div className="flex flex-col">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
              Lọc theo tùy chọn cha
            </span>
            <Select
              value={selectedOptionId}
              onValueChange={setSelectedOptionId}
              disabled={options.length === 0}
            >
              <SelectTrigger className="w-full sm:w-[250px] bg-slate-50 border-slate-200">
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

          <div className="hidden sm:block h-10 w-px bg-slate-200" />

          <div className="text-sm text-slate-500">
            Hiện có{" "}
            <span className="font-semibold text-emerald-700">
              {data.length}
            </span>{" "}
            giá trị
          </div>
        </div>

        <Button
          onClick={handleOpenCreateForm}
          disabled={!selectedOptionId}
          className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium shadow-sm transition-all shadow-emerald-200 disabled:opacity-50"
        >
          <Plus className="h-4 w-4 mr-2" /> Thêm Giá Trị
        </Button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              <th className="text-left px-5 py-3.5 font-semibold text-slate-600 text-xs uppercase tracking-wider w-16">
                #
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
              <th className="text-right px-5 py-3.5 font-semibold text-slate-600 text-xs uppercase tracking-wider min-w-[100px]">
                Thao tác
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {!selectedOptionId ? (
              <tr>
                <td colSpan={5} className="text-center py-12 text-slate-400">
                  <ListChecks className="h-10 w-10 mx-auto mb-3 text-slate-300" />
                  <p className="font-medium">Chưa chọn tùy chọn cha</p>
                  <p className="text-xs mt-1">
                    Hãy chọn một tùy chọn ở mục lọc phía trên!
                  </p>
                </td>
              </tr>
            ) : loading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <tr key={i} className="animate-pulse">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <td key={j} className="px-5 py-4">
                      <div className="h-4 bg-slate-100 rounded w-full" />
                    </td>
                  ))}
                </tr>
              ))
            ) : data.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-12 text-slate-400">
                  <ListChecks className="h-10 w-10 mx-auto mb-3 text-slate-300" />
                  <p className="font-medium">Chưa có giá trị nào</p>
                  <p className="text-xs mt-1">
                    Nhấn "Thêm Giá Trị" để bắt đầu cho tùy chọn này!
                  </p>
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
                        onClick={() => handleOpenEditForm(value)}
                        className="h-8 w-8 p-0 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50"
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() =>
                          handleOpenDeleteDialog(value.id, value.valueName)
                        }
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

      <ProductOptionValueFormModal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleFormSubmit}
        loading={formLoading}
        initialData={currentValue}
        parentOption={selectedOptionObj}
      />

      <ConfirmationDialog
        isOpen={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        title="Xác nhận xóa giá trị"
        description={`Bạn có chắc chắn muốn xóa giá trị "${deleteName}" thuộc tùy chọn "${selectedOptionObj?.name}"? Hành động này không thể hoàn tác.`}
        onConfirm={handleDeleteConfirm}
        isLoading={deleteLoading}
        confirmLabel="Xóa vĩnh viễn"
        cancelLabel="Hủy bỏ"
      />
    </div>
  );
}
