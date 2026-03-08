import axiosClient from "@/lib/axios-client";
import type ApiResponse from "@/types/base/ApiResponse";
import type { DeployWorkflowResponse } from "@/types/workflow/response/DeployWorkflowResponse";
import type { WorkflowDefinitionResponse } from "@/types/workflow/response/WorkflowDefinitionResponse";
import type { WorkflowMetricsResponse } from "@/types/workflow/response/WorkflowMetricsResponse";
import type { WorkflowTaskDefinitionResponse } from "@/types/workflow/response/WorkflowTaskDefinitionResponse";
import type { UserTaskUiConfigResponse } from "@/types/workflow/response/UserTaskUiConfigResponse";

const BASE_URL = "/workflow-service/admin/workflows";

export const getWorkflowDefinitionsApi = async (latestOnly: boolean = true) => {
  return await axiosClient.get<ApiResponse<WorkflowDefinitionResponse[]>>(
    `${BASE_URL}/definitions`,
    { params: { latestOnly } },
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

export const getWorkflowTaskDefinitionsApi = async (
  bpmnProcessId: string,
  version?: number,
) => {
  return await axiosClient.get<ApiResponse<WorkflowTaskDefinitionResponse[]>>(
    `${BASE_URL}/definitions/${bpmnProcessId}/tasks`,
    {
      params: { version },
    },
  );
};

export const getUserTaskUiConfigsApi = async (
  bpmnProcessId: string,
  version?: number,
) => {
  return await axiosClient.get<ApiResponse<UserTaskUiConfigResponse[]>>(
    `${BASE_URL}/definitions/${bpmnProcessId}/user-task-ui-configs`,
    {
      params: { version },
    },
  );
};

export const getUserTaskUiConfigApi = async (
  bpmnProcessId: string,
  taskKey: string,
  version?: number,
) => {
  return await axiosClient.get<ApiResponse<UserTaskUiConfigResponse>>(
    `${BASE_URL}/definitions/${bpmnProcessId}/user-tasks/${taskKey}/ui-config`,
    {
      params: { version },
    },
  );
};

export const upsertUserTaskUiConfigApi = async (
  bpmnProcessId: string,
  taskKey: string,
  data: {
    displayName?: string;
    description?: string;
    formSchemaFile?: File | null;
    actionsJson?: string | null;
    permissionsJson?: string | null;
  },
  version?: number,
) => {
  const formData = new FormData();
  if (data.displayName) formData.append("displayName", data.displayName);
  if (data.description) formData.append("description", data.description);
  if (data.formSchemaFile)
    formData.append("formSchemaFile", data.formSchemaFile);
  if (data.actionsJson) formData.append("actionsJson", data.actionsJson);
  if (data.permissionsJson)
    formData.append("permissionsJson", data.permissionsJson);

  return await axiosClient.post<ApiResponse<UserTaskUiConfigResponse>>(
    `${BASE_URL}/definitions/${bpmnProcessId}/user-tasks/${taskKey}/ui-config`,
    formData,
    {
      params: { version },
      headers: { "Content-Type": "multipart/form-data" },
    },
  );
};

export const deleteUserTaskUiConfigApi = async (
  bpmnProcessId: string,
  taskKey: string,
  version?: number,
) => {
  return await axiosClient.delete<ApiResponse<string>>(
    `${BASE_URL}/definitions/${bpmnProcessId}/user-tasks/${taskKey}/ui-config`,
    {
      params: { version },
    },
  );
};
