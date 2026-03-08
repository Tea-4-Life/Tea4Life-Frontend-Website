import { Button } from "@/components/ui/button";
import { ArrowLeft, FileCode2, Eye, Code2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface DiagramHeaderProps {
  bpmnProcessId: string;
  version?: string;
  xmlData: string | null;
  loading: boolean;
  viewMode: "diagram" | "xml";
  onViewModeChange: (mode: "diagram" | "xml") => void;
  onNavigateBack: () => void;
}

export default function DiagramHeader({
  bpmnProcessId,
  version,
  xmlData,
  loading,
  viewMode,
  onViewModeChange,
  onNavigateBack,
}: DiagramHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          size="icon"
          className="rounded-xl border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700"
          onClick={onNavigateBack}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
            <FileCode2 className="h-6 w-6 text-purple-600" />
            Chi tiết luồng: {bpmnProcessId}
          </h1>
          <p className="text-sm text-slate-500">
            {version ? `Phiên bản: v${version}` : "Phiên bản mới nhất"}
          </p>
        </div>
      </div>

      {xmlData && !loading && (
        <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-xl shadow-sm border border-slate-200">
          <Button
            variant="ghost"
            size="sm"
            className={cn(
              "gap-2 px-3 h-9 rounded-lg transition-all",
              viewMode === "diagram"
                ? "bg-white shadow-sm text-purple-700 font-bold border border-slate-200"
                : "text-slate-500 hover:text-slate-800",
            )}
            onClick={() => onViewModeChange("diagram")}
          >
            <Eye className="h-4 w-4" /> Visual
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className={cn(
              "gap-2 px-3 h-9 rounded-lg transition-all",
              viewMode === "xml"
                ? "bg-white shadow-sm text-purple-700 font-bold border border-slate-200"
                : "text-slate-500 hover:text-slate-800",
            )}
            onClick={() => onViewModeChange("xml")}
          >
            <Code2 className="h-4 w-4" /> XML
          </Button>
        </div>
      )}
    </div>
  );
}
