import { WorkflowDefinitionResponse } from "./WorkflowDefinitionResponse";

export interface DeployWorkflowResponse {
  deploymentKey: string;
  definitions: WorkflowDefinitionResponse[];
}
