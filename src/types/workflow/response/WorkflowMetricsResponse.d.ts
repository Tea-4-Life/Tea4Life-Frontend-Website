export interface WorkflowMetricsResponse {
  totalInstances: number;
  instancesByStatus: Record<string, number>;
}
