import axiosClient from "@/lib/axios-client";
import type ApiResponse from "@/types/base/ApiResponse";
import type { DeployWorkflowResponse } from "@/types/workflow/response/DeployWorkflowResponse";
import type { WorkflowDefinitionResponse } from "@/types/workflow/response/WorkflowDefinitionResponse";
import type { WorkflowMetricsResponse } from "@/types/workflow/response/WorkflowMetricsResponse";

const BASE_URL = "/workflow-service/admin/workflows";

export const getWorkflowDefinitionsApi = async () => {
  return await axiosClient.get<ApiResponse<WorkflowDefinitionResponse[]>>(
    `${BASE_URL}/definitions`,
  );
};

export const deployWorkflowApi = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);
  return await axiosClient.post<ApiResponse<DeployWorkflowResponse>>(
    `${BASE_URL}/deploy`,
    formData,
    { headers: { "Content-Type": "multipart/form-data" } },
  );
};

export const cancelWorkflowInstanceApi = async (instanceKey: string) => {
  return await axiosClient.post<ApiResponse<string>>(
    `${BASE_URL}/instances/${instanceKey}/cancel`,
  );
};

export const getWorkflowMetricsApi = async () => {
  return await axiosClient.get<ApiResponse<WorkflowMetricsResponse>>(
    `${BASE_URL}/metrics`,
  );
};

export const getWorkflowDiagramXmlApi = async (
  bpmnProcessId: string,
  version?: number,
) => {
  return await axiosClient.get<string>(
    `${BASE_URL}/definitions/${bpmnProcessId}/diagram`,
    {
      params: { version },
      responseType: "text",
    },
  );
};
