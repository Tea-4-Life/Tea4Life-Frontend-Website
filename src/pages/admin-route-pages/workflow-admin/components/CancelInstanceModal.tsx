import React, { useState } from "react";
import { XCircle, Trash2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

interface CancelInstanceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCancel: (instanceKey: string) => Promise<void>;
  loading: boolean;
}

const CancelInstanceModal: React.FC<CancelInstanceModalProps> = ({
  isOpen,
  onClose,
  onCancel,
  loading,
}) => {
  const [cancelKey, setCancelKey] = useState("");

  const handleClose = () => {
    setCancelKey("");
    onClose();
  };

  const handleCancel = async () => {
    if (!cancelKey.trim()) return;
    await onCancel(cancelKey.trim());
    setCancelKey("");
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <XCircle className="h-5 w-5 text-red-600" />
            Hủy Workflow Instance
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-2">
          <p className="text-sm text-slate-500">
            Nhập Instance Key để hủy luồng xử lý đang chạy.
          </p>
          <Input
            placeholder="Instance Key..."
            value={cancelKey}
            onChange={(e) => setCancelKey(e.target.value)}
          />
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>
            Đóng
          </Button>
          <Button
            variant="destructive"
            className="gap-2"
            disabled={!cancelKey.trim() || loading}
            onClick={handleCancel}
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Trash2 className="h-4 w-4" />
            )}
            Hủy Instance
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CancelInstanceModal;
