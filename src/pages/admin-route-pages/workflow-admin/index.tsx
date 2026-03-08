import { useEffect, useState, useCallback } from "react";
import {
  getWorkflowDefinitionsApi,
  deployWorkflowApi,
  cancelWorkflowInstanceApi,
  getWorkflowMetricsApi,
} from "@/services/admin/workflowAdminApi";
import type { WorkflowDefinitionResponse } from "@/types/workflow/response/WorkflowDefinitionResponse";
import type { WorkflowMetricsResponse } from "@/types/workflow/response/WorkflowMetricsResponse";
import { handleError } from "@/lib/utils";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

// Sub-components
import HeaderSection from "./components/HeaderSection";
import MetricsSection from "./components/MetricsSection";
import ActionsSection from "./components/ActionsSection";
import DefinitionsSection from "./components/DefinitionsSection";
import DeployModal from "./components/DeployModal";
import CancelInstanceModal from "./components/CancelInstanceModal";

export default function WorkflowAdminPage() {
  const navigate = useNavigate();
  // Definitions
  const [definitions, setDefinitions] = useState<WorkflowDefinitionResponse[]>(
    [],
  );
  const [defsLoading, setDefsLoading] = useState(true);
  const [latestOnly, setLatestOnly] = useState(true);

  // Metrics
  const [metrics, setMetrics] = useState<WorkflowMetricsResponse | null>(null);
  const [metricsLoading, setMetricsLoading] = useState(true);

  // Deploy modal
  const [deployDialogOpen, setDeployDialogOpen] = useState(false);
  const [deployLoading, setDeployLoading] = useState(false);

  // Cancel modal
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
  const [cancelLoading, setCancelLoading] = useState(false);

  const fetchDefinitions = useCallback(async () => {
    setDefsLoading(true);
    try {
      const res = await getWorkflowDefinitionsApi(latestOnly);
      setDefinitions(res.data.data);
    } catch (error) {
      handleError(error, "Không thể tải danh sách workflow definitions.");
    } finally {
      setTimeout(() => setDefsLoading(false), 500);
    }
  }, [latestOnly]);

  const fetchMetrics = useCallback(async () => {
    setMetricsLoading(true);
    try {
      const res = await getWorkflowMetricsApi();
      setMetrics(res.data.data);
    } catch (error) {
      handleError(error, "Không thể tải metrics.");
    } finally {
      setMetricsLoading(false);
    }
  }, []);

  const handleDeploy = async (file: File) => {
    setDeployLoading(true);
    try {
      const res = await deployWorkflowApi(file);
      const data = res.data.data;
      toast.success(
        `Deploy thành công! Key: ${data.deploymentKey}, ${data.definitions.length} definition(s)`,
      );
      setDeployDialogOpen(false);
      fetchDefinitions();
    } catch (error) {
      handleError(error, "Deploy thất bại.");
    } finally {
      setDeployLoading(false);
    }
  };

  const handleCancel = async (instanceKey: string) => {
    setCancelLoading(true);
    try {
      await cancelWorkflowInstanceApi(instanceKey);
      toast.success(`Đã hủy instance: ${instanceKey}`);
      setCancelDialogOpen(false);
    } catch (error) {
      handleError(error, "Hủy instance thất bại.");
    } finally {
      setCancelLoading(false);
    }
  };

  const handleViewDiagram = (bpmnProcessId: string, version: number) => {
    navigate(`/admin/workflow-admin/diagram/${bpmnProcessId}/${version}`);
  };

  const handleRefreshAll = () => {
    fetchDefinitions();
    fetchMetrics();
  };

  useEffect(() => {
    fetchDefinitions();
    fetchMetrics();
  }, [fetchDefinitions, fetchMetrics]);

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* 1. Header Section */}
      <HeaderSection />

      {/* 2. Metrics Section */}
      <MetricsSection
        metrics={metrics}
        metricsLoading={metricsLoading}
        definitionsCount={definitions.length}
        defsLoading={defsLoading}
      />

      {/* 3. Actions Section */}
      <ActionsSection
        onDeployOpen={() => setDeployDialogOpen(true)}
        onCancelOpen={() => setCancelDialogOpen(true)}
        onRefreshAll={handleRefreshAll}
      />

      {/* 4. Definitions Section */}
      <DefinitionsSection
        loading={defsLoading}
        data={definitions}
        onViewDiagram={handleViewDiagram}
        latestOnly={latestOnly}
        onLatestOnlyChange={setLatestOnly}
      />

      {/* Deploy Modal */}
      <DeployModal
        isOpen={deployDialogOpen}
        onClose={() => setDeployDialogOpen(false)}
        onDeploy={handleDeploy}
        loading={deployLoading}
      />

      {/* Cancel Instance Modal */}
      <CancelInstanceModal
        isOpen={cancelDialogOpen}
        onClose={() => setCancelDialogOpen(false)}
        onCancel={handleCancel}
        loading={cancelLoading}
      />
    </div>
  );
}
