import { Button } from "@/components/ui/button";
import { FileCode2, Copy, Check } from "lucide-react";
import React from "react";

interface DiagramViewerProps {
  loading: boolean;
  xmlData: string | null;
  viewMode: "diagram" | "xml";
  containerRef: React.RefObject<HTMLDivElement | null>;
  copied: boolean;
  onCopy: () => void;
}

export default function DiagramViewer({
  loading,
  xmlData,
  viewMode,
  containerRef,
  copied,
  onCopy,
}: DiagramViewerProps) {
  if (loading) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center py-12 text-slate-400">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-purple-500 border-t-transparent mb-4" />
        <p className="font-medium text-purple-700 animate-pulse">
          Đang vẽ sơ đồ luồng...
        </p>
      </div>
    );
  }

  if (!xmlData) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-slate-500 font-medium w-full">
        <FileCode2 className="h-12 w-12 text-slate-300 mb-4" />
        <p>Không thể tải mô hình BPMN hoặc XML rỗng.</p>
      </div>
    );
  }

  if (viewMode === "diagram") {
    return (
      <div className="w-full h-full relative group p-4">
        <div
          ref={containerRef as React.RefObject<HTMLDivElement>}
          className="w-full h-full bpmn-container cursor-grab active:cursor-grabbing border border-emerald-50 rounded-2xl"
        />
        <div className="absolute bottom-6 left-6 right-6 text-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          <span className="bg-slate-800/80 text-white text-xs px-4 py-2 rounded-xl shadow-sm">
            Kéo chuột hoặc ⌨️ dùng phím mũi tên để di chuyển, cuộn chuột để
            zoom.
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full relative p-4">
      <div className="w-full h-full relative bg-slate-50 border border-emerald-100 rounded-3xl overflow-hidden shadow-inner">
        <Button
          variant="outline"
          size="sm"
          className="absolute top-4 right-4 gap-2 border-emerald-200 bg-white hover:bg-emerald-50 hover:text-emerald-600 shadow-sm z-10 rounded-xl"
          onClick={onCopy}
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
  );
}
