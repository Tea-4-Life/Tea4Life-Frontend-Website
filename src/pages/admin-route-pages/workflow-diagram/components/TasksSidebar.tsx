import { Button } from "@/components/ui/button";
import {
  ListTodo,
  Users,
  User,
  Tag,
  FileCode2,
  Code2,
  Settings2,
} from "lucide-react";
import type { WorkflowTaskDefinitionResponse } from "@/types/workflow/response/WorkflowTaskDefinitionResponse";

interface TasksSidebarProps {
  tasks: WorkflowTaskDefinitionResponse[];
  tasksLoading: boolean;
  onOpenConfig: (taskKey: string, taskName: string) => void;
}

export default function TasksSidebar({
  tasks,
  tasksLoading,
  onOpenConfig,
}: TasksSidebarProps) {
  if (tasks.length === 0 && !tasksLoading) return null;

  return (
    <div className="w-88 flex flex-col border border-emerald-200 rounded-[2rem] bg-white shadow-sm overflow-hidden shrink-0">
      <div className="p-4 border-b border-emerald-100 bg-emerald-50/50">
        <h2 className="font-bold flex items-center gap-2 text-emerald-800">
          <ListTodo className="w-5 h-5 text-emerald-600" />
          Danh sách Tasks
        </h2>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {tasksLoading ? (
          <div className="text-sm text-slate-500 text-center py-4">
            Đang tải dữ liệu...
          </div>
        ) : (
          tasks.map((task) => (
            <div
              key={task.taskKey}
              className="border border-slate-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow bg-slate-50/50"
            >
              <h3 className="font-bold text-slate-800 mb-1">
                {task.taskName || task.taskKey}
              </h3>
              <div className="text-xs text-slate-500 font-mono mb-3">
                Key: {task.taskKey}
              </div>

              <div className="space-y-2 text-sm">
                {task.taskType && (
                  <div className="flex items-center gap-2 text-slate-600">
                    <Tag className="w-4 h-4 shrink-0 text-slate-400" />
                    <span>
                      Type:{" "}
                      <span className="font-semibold text-slate-700">
                        {task.taskType}
                      </span>
                    </span>
                  </div>
                )}
                {task.candidateGroups && (
                  <div className="flex items-start gap-2 text-slate-600">
                    <Users className="w-4 h-4 shrink-0 text-blue-500 mt-0.5" />
                    <span className="leading-snug">
                      Groups:{" "}
                      <span className="font-medium text-slate-700">
                        {task.candidateGroups}
                      </span>
                    </span>
                  </div>
                )}
                {task.candidateUsers && (
                  <div className="flex items-start gap-2 text-slate-600">
                    <User className="w-4 h-4 shrink-0 text-orange-500 mt-0.5" />
                    <span className="leading-snug">
                      Users:{" "}
                      <span className="font-medium text-slate-700">
                        {task.candidateUsers}
                      </span>
                    </span>
                  </div>
                )}
                {task.formKey && (
                  <div className="flex items-start gap-2 text-slate-600">
                    <FileCode2 className="w-4 h-4 shrink-0 text-purple-500 mt-0.5" />
                    <span className="leading-snug">
                      Form:{" "}
                      <span className="font-mono text-xs">{task.formKey}</span>
                    </span>
                  </div>
                )}
                {task.retries && (
                  <div className="flex items-center gap-2 text-slate-600">
                    <Code2 className="w-4 h-4 shrink-0 text-rose-500" />
                    <span>Retries: {task.retries}</span>
                  </div>
                )}

                {task.taskType === "USER" && (
                  <div className="pt-2 border-t border-slate-200 mt-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full gap-2 border-emerald-200 text-emerald-700 hover:bg-emerald-50"
                      onClick={() =>
                        onOpenConfig(
                          task.taskKey,
                          task.taskName || task.taskKey,
                        )
                      }
                    >
                      <Settings2 className="w-4 h-4" />
                      Cấu Hình UI Task
                    </Button>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
