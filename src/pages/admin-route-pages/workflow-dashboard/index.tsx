import { useEffect, useState, useCallback } from "react";
import { usePaginationState } from "@/hooks/use-pagination-state";
import {
  getWorkflowHealthApi,
  getWorkflowInstancesApi,
  getWorkflowInstanceByKeyApi,
} from "@/services/admin/workflowDashboardApi";
import type { WorkflowHealthResponse } from "@/types/workflow/response/WorkflowHealthResponse";
import type { WorkflowInstanceResponse } from "@/types/workflow/response/WorkflowInstanceResponse";
import { handleError } from "@/lib/utils";
import { toast } from "sonner";

// Sub-components
import HeaderSection from "./components/HeaderSection";
import HealthSection from "./components/HealthSection";
import TableSection from "./components/TableSection";
import PaginationSection from "./components/PaginationSection";
import InstanceDetailModal from "./components/InstanceDetailModal";

export default function WorkflowDashboardPage() {
  const { pagination, onPageChange, onSizeChange } = usePaginationState();

  // Health
  const [health, setHealth] = useState<WorkflowHealthResponse | null>(null);
  const [healthLoading, setHealthLoading] = useState(false);

  // Instances
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<WorkflowInstanceResponse[]>([]);
  const [totalElements, setTotalElements] = useState(0);

  // Detail modal
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [detailLoading, setDetailLoading] = useState(false);
  const [detailInstance, setDetailInstance] =
    useState<WorkflowInstanceResponse | null>(null);

  const fetchHealth = useCallback(async () => {
    setHealthLoading(true);
    try {
      const res = await getWorkflowHealthApi();
      setHealth(res.data.data);
    } catch {
      setHealth({ up: false, message: "Không thể kết nối" });
      toast.error("Không thể kiểm tra trạng thái Workflow Engine");
    } finally {
      setHealthLoading(false);
    }
  }, []);

  const fetchInstances = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getWorkflowInstancesApi(
        pagination.page,
        pagination.size,
      );
      const pageData = res.data.data;
      setData(pageData.content);
      setTotalElements(pageData.totalElements);
    } catch (error) {
      handleError(error, "Không thể tải danh sách luồng xử lý.");
    } finally {
      setTimeout(() => setLoading(false), 500);
    }
  }, [pagination]);

  const handleViewDetail = async (instanceKey: string) => {
    setIsDetailOpen(true);
    setDetailLoading(true);
    setDetailInstance(null);
    try {
      const res = await getWorkflowInstanceByKeyApi(instanceKey);
      setDetailInstance(res.data.data);
    } catch (error) {
      handleError(error, "Không thể tải chi tiết luồng.");
      setIsDetailOpen(false);
    } finally {
      setDetailLoading(false);
    }
  };

  useEffect(() => {
    fetchHealth();
  }, [fetchHealth]);

  useEffect(() => {
    fetchInstances();
  }, [fetchInstances]);

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* 1. Header Section */}
      <HeaderSection />

      {/* 2. Health Section */}
      <HealthSection
        health={health}
        loading={healthLoading}
        onRetry={fetchHealth}
      />

      {/* 3. Table Section */}
      <TableSection
        loading={loading}
        data={data}
        totalElements={totalElements}
        onRefresh={fetchInstances}
        refreshing={loading}
        onViewDetail={handleViewDetail}
      />

      {/* 4. Pagination Section */}
      <PaginationSection
        page={pagination.page}
        size={pagination.size}
        totalElements={totalElements}
        onPageChange={onPageChange}
        onSizeChange={onSizeChange}
      />

      {/* Instance Detail Modal */}
      <InstanceDetailModal
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        instance={detailInstance}
        loading={detailLoading}
      />
    </div>
  );
}
