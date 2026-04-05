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
import { useState, useEffect } from "react";
import type { StoreResponse } from "@/types/store/StoreResponse";
import type { UpsertStoreRequest } from "@/types/store/UpsertStoreRequest";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  initialData?: StoreResponse | null;
  onSubmit: (data: UpsertStoreRequest, id?: string | number) => Promise<void>;
  loading?: boolean;
}

export default function StoreFormModal({
  isOpen,
  onClose,
  initialData,
  onSubmit,
  loading,
}: Props) {
  const [formData, setFormData] = useState<UpsertStoreRequest>({
    name: "",
    address: "",
    latitude: 0,
    longitude: 0,
  });

  useEffect(() => {
    if (initialData && isOpen) {
      setFormData({
        name: initialData.name,
        address: initialData.address,
        latitude: initialData.latitude,
        longitude: initialData.longitude,
      });
    } else if (!initialData && isOpen) {
      setFormData({ name: "", address: "", latitude: 0, longitude: 0 });
    }
  }, [initialData, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData, initialData?.id);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {initialData ? "Cập nhật cửa hàng" : "Thêm mới cửa hàng"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Tên cửa hàng</Label>
            <Input
              id="name"
              required
              placeholder="Ví dụ: Tea4Life Quận 1"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Địa chỉ</Label>
            <Input
              id="address"
              required
              placeholder="Số nhà, đường, phường, quận..."
              value={formData.address}
              onChange={(e) =>
                setFormData({ ...formData, address: e.target.value })
              }
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="latitude">Vĩ độ (Latitude)</Label>
              <Input
                id="latitude"
                type="number"
                step="any"
                required
                value={formData.latitude}
                onChange={(e) =>
                  setFormData({ ...formData, latitude: Number(e.target.value) })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="longitude">Kinh độ (Longitude)</Label>
              <Input
                id="longitude"
                type="number"
                step="any"
                required
                value={formData.longitude}
                onChange={(e) =>
                  setFormData({ ...formData, longitude: Number(e.target.value) })
                }
              />
            </div>
          </div>

          <DialogFooter className="pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={loading}
            >
              Hủy
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Đang xử lý..." : "Lưu thay đổi"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
