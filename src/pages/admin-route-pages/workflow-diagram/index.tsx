import { useEffect, useRef, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { handleError } from "@/lib/utils";
import { toast } from "sonner";
import BpmnViewer from "bpmn-js/lib/NavigatedViewer";
import "bpmn-js/dist/assets/diagram-js.css";
import "bpmn-js/dist/assets/bpmn-font/css/bpmn.css";

import {
  getWorkflowDiagramXmlApi,
  getWorkflowTaskDefinitionsApi,
} from "@/services/admin/workflowAdminApi";
import type { WorkflowTaskDefinitionResponse } from "@/types/workflow/response/WorkflowTaskDefinitionResponse";

// Sub-components
import DiagramHeader from "./components/DiagramHeader";
import DiagramViewer from "./components/DiagramViewer";
import TasksSidebar from "./components/TasksSidebar";
import TaskUiConfigModal from "./components/TaskUiConfigModal";

export default function WorkflowDiagramPage() {
  const { bpmnProcessId, version } = useParams<{
    bpmnProcessId: string;
    version: string;
  }>();
  const navigate = useNavigate();
  const parsedVersion = version ? Number.parseInt(version, 10) : undefined;
  const safeVersion = Number.isNaN(parsedVersion) ? undefined : parsedVersion;

  const containerRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
  const [xmlData, setXmlData] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"diagram" | "xml">("diagram");
  const [copied, setCopied] = useState(false);

  const [tasks, setTasks] = useState<WorkflowTaskDefinitionResponse[]>([]);
  const [tasksLoading, setTasksLoading] = useState(false);

  // Modal spec state
  const [uiConfigModalOpen, setUiConfigModalOpen] = useState(false);
  const [selectedTaskKey, setSelectedTaskKey] = useState<string>("");
  const [selectedTaskName, setSelectedTaskName] = useState<string>("");

  const fetchDiagram = useCallback(async () => {
    if (!bpmnProcessId) return;
    setLoading(true);
    try {
      const res = await getWorkflowDiagramXmlApi(
        bpmnProcessId,
        safeVersion,
      );
      setXmlData(res.data);
    } catch (error) {
      handleError(error, "Không thể tải mô hình BPMN.");
      toast.error("Quay lại danh sách workflow.");
      navigate("/admin/workflow-admin");
    } finally {
      setLoading(false);
    }
  }, [bpmnProcessId, safeVersion, navigate]);

  const fetchTasks = useCallback(async () => {
    if (!bpmnProcessId) return;
    setTasksLoading(true);
    try {
      const res = await getWorkflowTaskDefinitionsApi(
        bpmnProcessId,
        safeVersion,
      );
      setTasks(res.data.data || []);
    } catch (error) {
      console.error("Failed to fetch workflow tasks", error);
    } finally {
      setTasksLoading(false);
    }
  }, [bpmnProcessId, safeVersion]);

  useEffect(() => {
    fetchDiagram();
    fetchTasks();
  }, [fetchDiagram, fetchTasks]);

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

  const handleOpenConfig = (taskKey: string, taskName: string) => {
    setSelectedTaskKey(taskKey);
    setSelectedTaskName(taskName);
    setUiConfigModalOpen(true);
  };

  return (
    <div className="space-y-6 h-[calc(100vh-8rem)] flex flex-col animate-in fade-in duration-500">
      <DiagramHeader
        bpmnProcessId={bpmnProcessId || ""}
        version={version}
        xmlData={xmlData}
        loading={loading}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        onNavigateBack={() => navigate("/admin/workflow-admin")}
      />

      <div className="flex-1 overflow-hidden flex gap-4">
        <div className="flex-1 overflow-hidden flex justify-center items-center relative border border-emerald-200 rounded-[2rem] bg-white shadow-sm">
          <DiagramViewer
            loading={loading}
            xmlData={xmlData}
            viewMode={viewMode}
            containerRef={containerRef}
            copied={copied}
            onCopy={handleCopy}
          />
        </div>

        <TasksSidebar
          tasks={tasks}
          tasksLoading={tasksLoading}
          onOpenConfig={handleOpenConfig}
        />
      </div>

      <TaskUiConfigModal
        isOpen={uiConfigModalOpen}
        onClose={() => setUiConfigModalOpen(false)}
        bpmnProcessId={bpmnProcessId || ""}
        version={safeVersion}
        taskKey={selectedTaskKey}
        taskName={selectedTaskName}
      />
    </div>
  );
}



