export interface WorkflowDefinitionResponse {
  deploymentKey: string;
  bpmnProcessId: string;
  processDefinitionKey: string;
  version: number;
  resourceName: string;
  deployedAt: string;
}
