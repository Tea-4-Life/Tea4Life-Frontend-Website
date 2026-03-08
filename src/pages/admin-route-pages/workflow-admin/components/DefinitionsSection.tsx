import React from "react";
import { GitBranch, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import EmptyState from "@/components/custom/EmptyState";
import type { WorkflowDefinitionResponse } from "@/types/workflow/response/WorkflowDefinitionResponse";

interface DefinitionsSectionProps {
  loading: boolean;
  data: WorkflowDefinitionResponse[];
  onViewDiagram: (bpmnProcessId: string, version: number) => void;
  latestOnly: boolean;
  onLatestOnlyChange: (checked: boolean) => void;
}

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

const DefinitionsSection: React.FC<DefinitionsSectionProps> = ({
  loading,
  data,
  onViewDiagram,
  latestOnly,
  onLatestOnlyChange,
}) => {
  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-4">
        <div className="flex flex-col gap-1">
          <h2 className="text-2xl font-black text-slate-800 tracking-tight flex items-center gap-2">
            <GitBranch className="h-5 w-5 text-purple-600" />
            Workflow Definitions
          </h2>
          <p className="text-sm text-slate-500 font-medium">
            Danh sách các workflow đã deploy lên engine
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Checkbox
            id="latestOnly"
            checked={latestOnly}
            onCheckedChange={onLatestOnlyChange}
          />
          <label
            htmlFor="latestOnly"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-slate-700 cursor-pointer"
          >
            Chỉ hiện phiên bản mới nhất
          </label>
        </div>
      </div>

      {/* Definitions Table */}
      <div className="overflow-hidden border border-emerald-200 rounded-[2rem] bg-white shadow-sm min-h-[300px] flex flex-col">
        {loading ? (
          <div className="flex-1 flex flex-col items-center justify-center bg-white">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-emerald-500 border-t-transparent" />
            <p className="text-slate-500 mt-4 font-bold italic tracking-wide">
              Đang chuẩn bị dữ liệu...
            </p>
          </div>
        ) : data.length === 0 ? (
          <div className="flex-1 flex items-center justify-center">
            <EmptyState
              title="Chưa có definition"
              description="Chưa có workflow nào được deploy. Hãy deploy file BPMN đầu tiên."
              className="border-none shadow-none bg-white"
            />
          </div>
        ) : (
          <div className="flex-1">
            <Table>
              <TableHeader className="bg-emerald-50/50 transition-colors">
                <TableRow className="hover:bg-transparent border-emerald-200">
                  <TableHead className="font-black text-slate-700 pl-8 border-r border-emerald-200 uppercase text-[11px] tracking-wider text-left">
                    BPMN Process ID
                  </TableHead>
                  <TableHead className="font-black text-slate-700 border-r border-emerald-200 uppercase text-[11px] tracking-wider text-left pl-6">
                    Definition Key
                  </TableHead>
                  <TableHead className="font-black text-slate-700 border-r border-emerald-200 uppercase text-[11px] tracking-wider text-left pl-6">
                    Version
                  </TableHead>
                  <TableHead className="font-black text-slate-700 border-r border-emerald-200 uppercase text-[11px] tracking-wider text-left pl-6">
                    Resource
                  </TableHead>
                  <TableHead className="font-black text-slate-700 border-r border-emerald-200 uppercase text-[11px] tracking-wider text-left pl-6">
                    Deployed At
                  </TableHead>
                  <TableHead className="pr-8 font-black text-slate-700 uppercase text-[11px] tracking-wider text-center">
                    Thao tác
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.map((def) => (
                  <TableRow
                    key={def.processDefinitionKey}
                    className="group hover:bg-emerald-50/40 border-emerald-200 transition-colors h-16"
                  >
                    <TableCell className="font-mono text-xs font-bold text-slate-700 pl-8 border-r border-emerald-100/50">
                      {def.bpmnProcessId}
                    </TableCell>
                    <TableCell className="font-mono text-xs text-slate-600 border-r border-emerald-100/50 pl-6">
                      {def.processDefinitionKey}
                    </TableCell>
                    <TableCell className="border-r border-emerald-100/50 pl-6">
                      <Badge
                        variant="outline"
                        className="font-mono border-emerald-200"
                      >
                        v{def.version}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-slate-600 border-r border-emerald-100/50 pl-6">
                      {def.resourceName}
                    </TableCell>
                    <TableCell className="text-sm text-slate-500 border-r border-emerald-100/50 pl-6">
                      {formatDate(def.deployedAt)}
                    </TableCell>
                    <TableCell className="pr-8 text-center bg-slate-50/30">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-9 w-9 rounded-2xl text-purple-600 hover:bg-purple-100 hover:text-purple-700 transition-all active:scale-95 group/btn"
                        onClick={() =>
                          onViewDiagram(def.bpmnProcessId, def.version)
                        }
                        title="Xem mô hình"
                      >
                        <Eye className="h-4 w-4 group-hover/btn:scale-110 transition-transform" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
                {/* Empty Spacer Rows */}
                {Array.from({ length: Math.max(0, 3 - data.length) }).map(
                  (_, index) => (
                    <TableRow
                      key={`empty-${index}`}
                      className="h-16 border-emerald-100/30 hover:bg-transparent"
                    >
                      <TableCell className="border-r border-emerald-100/20" />
                      <TableCell className="border-r border-emerald-100/20" />
                      <TableCell className="border-r border-emerald-100/20" />
                      <TableCell className="border-r border-emerald-100/20" />
                      <TableCell className="border-r border-emerald-100/20" />
                      <TableCell className="border-r border-emerald-100/20" />
                      <TableCell className="border-r border-emerald-100/20" />
                      <TableCell className="bg-slate-50/10" />
                    </TableRow>
                  ),
                )}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    </div>
  );
};

export default DefinitionsSection;
