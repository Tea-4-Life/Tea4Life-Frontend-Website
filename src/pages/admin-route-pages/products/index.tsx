"use client";

import { useCallback, useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, Edit, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { handleError } from "@/lib/utils";
import { ConfirmationDialog } from "@/components/custom/ConfirmationDialog";
import ProductFormModal from "./ProductFormModal";
import {
  createAdminProductApi,
  deleteAdminProductApi,
  getAdminProductsApi,
  updateAdminProductApi,
} from "@/services/admin/productAdminApi";
import { getProductCategoriesApi } from "@/services/admin/productCategoryAdminApi";
import { getAllProductOptionsApi } from "@/services/admin/productOptionAdminApi";
import type { ProductResponse } from "@/types/product/ProductResponse";
import type { CreateProductRequest } from "@/types/product/CreateProductRequest";
import type { ProductCategoryResponse } from "@/types/product-category/ProductCategoryResponse";
import type { ProductOptionResponse } from "@/types/product-option/ProductOptionResponse";

function formatPrice(v: number) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(v);
}

export default function AdminProductsPage() {
  const [items, setItems] = useState<ProductResponse[]>([]);
  const [categories, setCategories] = useState<ProductCategoryResponse[]>([]);
  const [options, setOptions] = useState<ProductOptionResponse[]>([]);

  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [size] = useState(20);
  const [totalPages, setTotalPages] = useState(1);

  const [keyword, setKeyword] = useState("");

  const [modalOpen, setModalOpen] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);
  const [current, setCurrent] = useState<ProductResponse | null>(null);

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<ProductResponse | null>(null);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getAdminProductsApi({ page, size });
      const pageData = res.data.data;
      setItems(pageData.content || []);
      setTotalPages(pageData.totalPages || 1);
    } catch (error) {
      handleError(error, "Khong the tai danh sach san pham.");
    } finally {
      setLoading(false);
    }
  }, [page, size]);

  const fetchMeta = useCallback(async () => {
    try {
      const [catRes, optionRes] = await Promise.all([
        getProductCategoriesApi({ page: 1, size: 999 }),
        getAllProductOptionsApi(),
      ]);
      setCategories(catRes.data.data || []);
      setOptions(optionRes.data.data || []);
    } catch (error) {
      handleError(error, "Khong the tai categories/options.");
    }
  }, []);

  useEffect(() => {
    fetchMeta();
  }, [fetchMeta]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const filtered = items.filter((p) => {
    if (!keyword.trim()) return true;
    const kw = keyword.toLowerCase();
    return (
      p.name.toLowerCase().includes(kw) ||
      p.productCategoryName.toLowerCase().includes(kw)
    );
  });

  const openCreate = () => {
    setCurrent(null);
    setModalOpen(true);
  };

  const openEdit = (item: ProductResponse) => {
    setCurrent(item);
    setModalOpen(true);
  };

  const handleSubmit = async (payload: CreateProductRequest, id?: string) => {
    setModalLoading(true);
    try {
      if (id) {
        await updateAdminProductApi(id, payload);
        toast.success("Cap nhat san pham thanh cong.");
      } else {
        await createAdminProductApi(payload);
        toast.success("Tao san pham thanh cong.");
      }
      setModalOpen(false);
      await fetchProducts();
    } catch (error) {
      handleError(error, "Luu san pham that bai.");
    } finally {
      setModalLoading(false);
    }
  };

  const openDelete = (item: ProductResponse) => {
    setDeleteTarget(item);
    setDeleteOpen(true);
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    setDeleteLoading(true);
    try {
      await deleteAdminProductApi(deleteTarget.id);
      toast.success("Da xoa san pham.");
      setDeleteOpen(false);
      setDeleteTarget(null);
      await fetchProducts();
    } catch (error) {
      handleError(error, "Xoa san pham that bai.");
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-slate-900">Quan ly san pham</h1>
        <Button className="bg-emerald-600 hover:bg-emerald-700" onClick={openCreate}>
          <Plus className="h-4 w-4 mr-2" /> Them san pham
        </Button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border p-4">
        <div className="relative max-w-sm mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="Tim theo ten san pham / danh muc"
            className="pl-10"
          />
        </div>

        <Table>
          <TableHeader>
            <TableRow className="bg-slate-50/50">
              <TableHead>ID</TableHead>
              <TableHead>Ten san pham</TableHead>
              <TableHead>Danh muc</TableHead>
              <TableHead>Gia ban</TableHead>
              <TableHead>Tuy chon</TableHead>
              <TableHead className="text-right">Hanh dong</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6}>Dang tai...</TableCell>
              </TableRow>
            ) : filtered.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6}>Khong co du lieu.</TableCell>
              </TableRow>
            ) : (
              filtered.map((p) => (
                <TableRow key={p.id}>
                  <TableCell className="font-mono text-xs">{p.id}</TableCell>
                  <TableCell className="font-medium">{p.name}</TableCell>
                  <TableCell>{p.productCategoryName}</TableCell>
                  <TableCell>{formatPrice(p.basePrice)}</TableCell>
                  <TableCell>{p.productOptionIds?.length || 0}</TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-600" onClick={() => openEdit(p)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-red-600" onClick={() => openDelete(p)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>

        <div className="flex items-center justify-end gap-2 mt-4">
          <Button variant="outline" disabled={page <= 1} onClick={() => setPage((prev) => prev - 1)}>
            Prev
          </Button>
          <span className="text-sm text-slate-500">
            Page {page}/{totalPages}
          </span>
          <Button variant="outline" disabled={page >= totalPages} onClick={() => setPage((prev) => prev + 1)}>
            Next
          </Button>
        </div>
      </div>

      <ProductFormModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        loading={modalLoading}
        initialData={current}
        categories={categories}
        options={options}
        onSubmit={handleSubmit}
      />

      <ConfirmationDialog
        isOpen={deleteOpen}
        onOpenChange={setDeleteOpen}
        title="Xac nhan xoa san pham"
        description={`Ban co chac chan muon xoa "${deleteTarget?.name || ""}"?`}
        onConfirm={confirmDelete}
        isLoading={deleteLoading}
        confirmLabel="Xoa"
        cancelLabel="Huy"
      />
    </div>
  );
}
