import { useEffect, useRef, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, FileCode2, Copy, Check, Eye, Code2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { handleError } from "@/lib/utils";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import BpmnViewer from "bpmn-js/lib/NavigatedViewer";
import "bpmn-js/dist/assets/diagram-js.css";
import "bpmn-js/dist/assets/bpmn-font/css/bpmn.css";

import { getWorkflowDiagramXmlApi } from "@/services/admin/workflowAdminApi";

export default function WorkflowDiagramPage() {
  const { bpmnProcessId, version } = useParams<{
    bpmnProcessId: string;
    version: string;
  }>();
  const navigate = useNavigate();

  const containerRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
  const [xmlData, setXmlData] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"diagram" | "xml">("diagram");
  const [copied, setCopied] = useState(false);

  const fetchDiagram = useCallback(async () => {
    if (!bpmnProcessId) return;
    setLoading(true);
    try {
      const res = await getWorkflowDiagramXmlApi(
        bpmnProcessId,
        version ? parseInt(version) : undefined,
      );
      setXmlData(res.data);
    } catch (error) {
      handleError(error, "Không thể tải mô hình BPMN.");
      toast.error("Quay lại danh sách workflow.");
      navigate("/admin/workflow-admin");
    } finally {
      setLoading(false);
    }
  }, [bpmnProcessId, version, navigate]);

  useEffect(() => {
    fetchDiagram();
  }, [fetchDiagram]);

  useEffect(() => {
    if (viewMode !== "diagram" || !xmlData || !containerRef.current) return;

    const viewer = new BpmnViewer({
      container: containerRef.current,
      keyboard: {
        bindTo: document,
      },
    });

    let isMounted = true;

    viewer
      .importXML(xmlData)
      .then(() => {
        if (isMounted) {
          const canvas = viewer.get("canvas") as { zoom: (v: string) => void };
          canvas.zoom("fit-viewport");
        }
      })
      .catch((err: unknown) => {
        console.error("Could not import BPMN 2.0 diagram", err);
      });

    return () => {
      isMounted = false;
      viewer.destroy();
    };
  }, [xmlData, viewMode]);

  const handleCopy = () => {
    if (xmlData) {
      navigator.clipboard.writeText(xmlData);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="space-y-6 h-[calc(100vh-8rem)] flex flex-col animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="icon"
            className="rounded-xl border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700"
            onClick={() => navigate("/admin/workflow-admin")}
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
              onClick={() => setViewMode("diagram")}
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
              onClick={() => setViewMode("xml")}
            >
              <Code2 className="h-4 w-4" /> XML
            </Button>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden flex justify-center items-center relative border border-emerald-200 rounded-[2rem] bg-white shadow-sm">
        {loading ? (
          <div className="flex-1 flex flex-col items-center justify-center py-12 text-slate-400">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-purple-500 border-t-transparent mb-4" />
            <p className="font-medium text-purple-700 animate-pulse">
              Đang vẽ sơ đồ luồng...
            </p>
          </div>
        ) : !xmlData ? (
          <div className="flex flex-col items-center justify-center py-12 text-slate-500 font-medium">
            <FileCode2 className="h-12 w-12 text-slate-300 mb-4" />
            <p>Không thể tải mô hình BPMN hoặc XML rỗng.</p>
          </div>
        ) : viewMode === "diagram" ? (
          <div className="w-full h-full relative group p-4">
            <div
              ref={containerRef}
              className="w-full h-full bpmn-container cursor-grab active:cursor-grabbing border border-emerald-50 rounded-2xl"
            />
            <div className="absolute bottom-6 left-6 right-6 text-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              <span className="bg-slate-800/80 text-white text-xs px-4 py-2 rounded-xl shadow-sm">
                Kéo chuột hoặc ⌨️ dùng phím mũi tên để di chuyển, cuộn chuột để
                zoom.
              </span>
            </div>
          </div>
        ) : (
          <div className="w-full h-full relative p-4">
            <div className="w-full h-full relative bg-slate-50 border border-emerald-100 rounded-3xl overflow-hidden shadow-inner">
              <Button
                variant="outline"
                size="sm"
                className="absolute top-4 right-4 gap-2 border-emerald-200 bg-white hover:bg-emerald-50 hover:text-emerald-600 shadow-sm z-10 rounded-xl"
                onClick={handleCopy}
              >
                {copied ? (
                  <Check className="h-4 w-4 text-emerald-600" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
                {copied ? "Đã sao chép" : "Copy XML"}
              </Button>
              <div className="overflow-auto w-full h-full p-6 pt-16 text-xs font-mono text-slate-700 break-all whitespace-pre-wrap">
                {xmlData}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
