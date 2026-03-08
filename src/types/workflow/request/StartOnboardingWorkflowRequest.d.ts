export interface StartOnboardingWorkflowRequest {
  userId: string;
  businessKey?: string;
  variables?: Record<string, unknown>;
}
