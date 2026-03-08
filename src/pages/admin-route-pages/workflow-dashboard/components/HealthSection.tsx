import React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  CheckCircle2,
  XCircle,
  RefreshCw,
  Loader2,
  Wifi,
  WifiOff,
} from "lucide-react";
import type { WorkflowHealthResponse } from "@/types/workflow/response/WorkflowHealthResponse";

interface HealthSectionProps {
  health: WorkflowHealthResponse | null;
  loading: boolean;
  onRetry: () => void;
}

const HealthSection: React.FC<HealthSectionProps> = ({
  health,
  loading,
  onRetry,
}) => {
  return (
    <div className="overflow-hidden border border-emerald-200 rounded-[2rem] bg-white shadow-sm">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 px-8 py-6">
        {/* Left: status */}
        {health === null ? (
          <div className="flex items-center gap-3 text-slate-400">
            <Loader2 className="h-6 w-6 animate-spin" />
            <span className="font-medium">Đang kiểm tra trạng thái...</span>
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <div
              className={cn(
                "p-3 rounded-2xl",
                health.up ? "bg-emerald-50" : "bg-red-50",
              )}
            >
              {health.up ? (
                <Wifi className="h-6 w-6 text-emerald-600" />
              ) : (
                <WifiOff className="h-6 w-6 text-red-600" />
              )}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span
                  className={cn(
                    "text-xl font-bold",
                    health.up ? "text-emerald-700" : "text-red-700",
                  )}
                >
                  {health.up ? "Engine đang hoạt động" : "Engine ngắt kết nối"}
                </span>
                {health.up ? (
                  <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                ) : (
                  <XCircle className="h-5 w-5 text-red-500" />
                )}
              </div>
              <p className="text-sm text-slate-500 mt-0.5">{health.message}</p>
            </div>
          </div>
        )}

        {/* Right: retry */}
        <Button
          variant="outline"
          size="sm"
          className="gap-2 border-emerald-200 hover:bg-emerald-50 hover:text-emerald-600 shrink-0"
          onClick={onRetry}
          disabled={loading}
        >
          {loading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <RefreshCw className="h-4 w-4" />
          )}
          Kiểm tra lại
        </Button>
      </div>
    </div>
  );
};

export default HealthSection;
