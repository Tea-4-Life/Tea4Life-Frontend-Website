import React, { useEffect, useRef, useState } from "react";
import { FileCode2, Copy, Check, Eye, Code2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import BpmnViewer from "bpmn-js/lib/NavigatedViewer";
import "bpmn-js/dist/assets/diagram-js.css";
import "bpmn-js/dist/assets/bpmn-font/css/bpmn.css";
import { cn } from "@/lib/utils";

interface DiagramModalProps {
  isOpen: boolean;
  onClose: () => void;
  xmlData: string | null;
  loading: boolean;
}

const DiagramModal: React.FC<DiagramModalProps> = ({
  isOpen,
  onClose,
  xmlData,
  loading,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);
  const [viewMode, setViewMode] = useState<"diagram" | "xml">("diagram");

  const handleCopy = () => {
    if (xmlData) {
      navigator.clipboard.writeText(xmlData);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  useEffect(() => {
    if (!isOpen || !xmlData || viewMode !== "diagram" || !containerRef.current)
      return;

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
          const canvas = viewer.get("canvas");
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
  }, [isOpen, xmlData, viewMode]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[90vh] flex flex-col h-[90vh]">
        <DialogHeader className="flex flex-row items-center justify-between pr-8 space-y-0">
          <DialogTitle className="flex items-center gap-2">
            <FileCode2 className="h-5 w-5 text-purple-600" />
            BPMN Diagram
          </DialogTitle>
          {xmlData && !loading && (
            <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-xl">
              <Button
                variant="ghost"
                size="sm"
                className={cn(
                  "gap-2 px-3 h-8 rounded-lg",
                  viewMode === "diagram"
                    ? "bg-white shadow-sm text-purple-700 font-medium"
                    : "text-slate-500 hover:text-slate-700",
                )}
                onClick={() => setViewMode("diagram")}
              >
                <Eye className="h-4 w-4" /> Visual
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className={cn(
                  "gap-2 px-3 h-8 rounded-lg",
                  viewMode === "xml"
                    ? "bg-white shadow-sm text-purple-700 font-medium"
                    : "text-slate-500 hover:text-slate-700",
                )}
                onClick={() => setViewMode("xml")}
              >
                <Code2 className="h-4 w-4" /> XML
              </Button>
            </div>
          )}
        </DialogHeader>

        <div className="flex-1 overflow-hidden flex justify-center items-center relative py-2 border border-emerald-100 rounded-xl bg-white mt-2">
          {loading ? (
            <div className="flex-1 flex flex-col items-center justify-center py-12 text-slate-400">
              <div className="h-10 w-10 animate-spin rounded-full border-4 border-purple-500 border-t-transparent mb-4" />
              <p className="font-medium text-purple-700 animate-pulse">
                Đang vẽ sơ đồ luồng...
              </p>
            </div>
          ) : !xmlData ? (
            <div className="flex items-center justify-center py-12 text-slate-500 font-medium">
              Không thể tải mô hình BPMN hoặc XML rỗng.
            </div>
          ) : viewMode === "diagram" ? (
            <div className="w-full h-full relative group">
              <div
                ref={containerRef}
                className="w-full h-full bpmn-container cursor-grab active:cursor-grabbing"
              />
              <div className="absolute bottom-4 left-4 right-4 text-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                <span className="bg-slate-800/80 text-white text-xs px-3 py-1.5 rounded-lg shadow-sm">
                  Kéo chuột hoặc ⌨️ dùng phím mũi tên để di chuyển, cuộn chuột
                  để zoom.
                </span>
              </div>
            </div>
          ) : (
            <div className="w-full h-full relative bg-slate-50">
              <Button
                variant="outline"
                size="sm"
                className="absolute top-4 right-4 gap-2 border-emerald-200 bg-white hover:bg-emerald-50 hover:text-emerald-600 shadow-sm z-10"
                onClick={handleCopy}
              >
                {copied ? (
                  <Check className="h-4 w-4 text-emerald-600" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
                {copied ? "Đã sao chép" : "Copy XML"}
              </Button>
              <div className="overflow-auto w-full h-full p-6 text-xs font-mono text-slate-700 break-all whitespace-pre-wrap">
                {xmlData}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DiagramModal;
