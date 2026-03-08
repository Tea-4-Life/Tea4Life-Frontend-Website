import React from "react";
import { Activity, Hash, Clock, Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { WorkflowInstanceResponse } from "@/types/workflow/response/WorkflowInstanceResponse";

interface InstanceDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  instance: WorkflowInstanceResponse | null;
  loading: boolean;
}

const statusConfig: Record<string, { label: string; color: string }> = {
  ACTIVE: { label: "Đang chạy", color: "border-blue-500 text-blue-600" },
  COMPLETED: {
    label: "Hoàn thành",
    color: "border-emerald-500 text-emerald-600",
  },
  CANCELLED: { label: "Đã hủy", color: "border-red-500 text-red-600" },
  INCIDENT: { label: "Lỗi", color: "border-orange-500 text-orange-600" },
};

function formatDate(dateStr: string | null | undefined) {
  if (!dateStr) return "—";
  try {
    return new Intl.DateTimeFormat("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(dateStr));
  } catch {
    return dateStr;
  }
}

const InstanceDetailModal: React.FC<InstanceDetailModalProps> = ({
  isOpen,
  onClose,
  instance,
  loading,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-emerald-600" />
            Chi tiết luồng xử lý
          </DialogTitle>
        </DialogHeader>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-emerald-500 border-t-transparent" />
          </div>
        ) : instance ? (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-xs text-slate-400 flex items-center gap-1">
                  <Hash className="h-3 w-3" /> Instance Key
                </p>
                <p className="font-mono text-sm font-bold">
                  {instance.instanceKey}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-slate-400">Process ID</p>
                <p className="font-mono text-sm">{instance.processId}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-slate-400">Business Key</p>
                <p className="text-sm">{instance.businessKey || "—"}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-slate-400">Trạng thái</p>
                {(() => {
                  const config = statusConfig[instance.status] || {
                    label: instance.status,
                    color: "border-slate-500 text-slate-600",
                  };
                  return (
                    <Badge
                      variant="outline"
                      className={cn("font-medium", config.color)}
                    >
                      {config.label}
                    </Badge>
                  );
                })()}
              </div>
              <div className="space-y-1">
                <p className="text-xs text-slate-400 flex items-center gap-1">
                  <Clock className="h-3 w-3" /> Tạo lúc
                </p>
                <p className="text-sm">{formatDate(instance.createdAt)}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-slate-400 flex items-center gap-1">
                  <Clock className="h-3 w-3" /> Cập nhật
                </p>
                <p className="text-sm">{formatDate(instance.updatedAt)}</p>
              </div>
            </div>

            {instance.variablesJson && (
              <div className="space-y-1">
                <p className="text-xs text-slate-400">Variables (JSON)</p>
                <pre className="bg-slate-50 border border-emerald-100 rounded-xl p-3 text-xs font-mono overflow-auto max-h-48 whitespace-pre-wrap">
                  {(() => {
                    try {
                      return JSON.stringify(
                        JSON.parse(instance.variablesJson),
                        null,
                        2,
                      );
                    } catch {
                      return instance.variablesJson;
                    }
                  })()}
                </pre>
              </div>
            )}
          </div>
        ) : (
          <div className="flex items-center justify-center py-12 text-slate-400">
            <Loader2 className="h-6 w-6 animate-spin" />
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default InstanceDetailModal;
