import React from "react";
import { Loader2, BarChart3, FileCode2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { WorkflowMetricsResponse } from "@/types/workflow/response/WorkflowMetricsResponse";

interface MetricsSectionProps {
  metrics: WorkflowMetricsResponse | null;
  metricsLoading: boolean;
  definitionsCount: number;
  defsLoading: boolean;
}

const MetricsSection: React.FC<MetricsSectionProps> = ({
  metrics,
  metricsLoading,
  definitionsCount,
  defsLoading,
}) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border border-emerald-200 shadow-sm rounded-[2rem]">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-slate-500">
              Tổng số instances
            </CardTitle>
            <div className="p-2 rounded-xl bg-blue-50">
              <BarChart3 className="h-4 w-4 text-blue-600" />
            </div>
          </CardHeader>
          <CardContent>
            {metricsLoading ? (
              <Loader2 className="h-5 w-5 animate-spin text-slate-400" />
            ) : (
              <div className="text-2xl font-bold text-slate-800">
                {metrics?.totalInstances ?? 0}
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="border border-emerald-200 shadow-sm rounded-[2rem]">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-slate-500">
              Definitions đã deploy
            </CardTitle>
            <div className="p-2 rounded-xl bg-purple-50">
              <FileCode2 className="h-4 w-4 text-purple-600" />
            </div>
          </CardHeader>
          <CardContent>
            {defsLoading ? (
              <Loader2 className="h-5 w-5 animate-spin text-slate-400" />
            ) : (
              <div className="text-2xl font-bold text-slate-800">
                {definitionsCount}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Status Breakdown */}
      {metrics?.instancesByStatus && (
        <div className="flex flex-wrap gap-3 px-4">
          {Object.entries(metrics.instancesByStatus).map(([status, count]) => (
            <Badge
              key={status}
              variant="outline"
              className="text-sm px-3 py-1 gap-1.5 border-emerald-200"
            >
              <span className="font-bold">{count}</span>
              <span className="text-slate-500">{status}</span>
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
};

export default MetricsSection;
