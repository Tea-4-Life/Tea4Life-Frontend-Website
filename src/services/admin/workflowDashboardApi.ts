import axiosClient from "@/lib/axios-client";
import type ApiResponse from "@/types/base/ApiResponse";
import type PageResponse from "@/types/base/PageResponse";
import type { WorkflowHealthResponse } from "@/types/workflow/response/WorkflowHealthResponse";
import type { WorkflowInstanceResponse } from "@/types/workflow/response/WorkflowInstanceResponse";

const BASE_URL = "/workflow-service/admin/workflows/dashboard";

export const getWorkflowHealthApi = async () => {
  return await axiosClient.get<ApiResponse<WorkflowHealthResponse>>(
    `${BASE_URL}/health`,
  );
};

export const getWorkflowInstancesApi = async (page = 1, size = 20) => {
  return await axiosClient.get<
    ApiResponse<PageResponse<WorkflowInstanceResponse>>
  >(`${BASE_URL}/instances`, { params: { page, size } });
};

export const getWorkflowInstanceByKeyApi = async (instanceKey: string) => {
  return await axiosClient.get<ApiResponse<WorkflowInstanceResponse>>(
    `${BASE_URL}/instances/${instanceKey}`,
  );
};
