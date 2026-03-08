export interface WorkflowInstanceResponse {
  instanceKey: string;
  processId: string;
  businessKey: string;
  status: string;
  variablesJson: string;
  createdAt: string;
  updatedAt: string;
}
