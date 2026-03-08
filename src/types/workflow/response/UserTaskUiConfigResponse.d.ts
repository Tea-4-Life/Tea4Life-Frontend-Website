export interface UserTaskUiConfigResponse {
  bpmnProcessId: string;
  workflowVersion: number;
  taskKey: string;
  taskName: string;
  displayName: string;
  description: string;
  formSchemaJson: string;
  actionsJson: string;
  permissionsJson: string;
  createdAt: string;
  updatedAt: string;
}
