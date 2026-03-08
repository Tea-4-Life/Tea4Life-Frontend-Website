import React from "react";
import { Upload, Trash2, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ActionsSectionProps {
  onDeployOpen: () => void;
  onCancelOpen: () => void;
  onRefreshAll: () => void;
}

const ActionsSection: React.FC<ActionsSectionProps> = ({
  onDeployOpen,
  onCancelOpen,
  onRefreshAll,
}) => {
  return (
    <div className="flex flex-wrap gap-3 px-4">
      <Button
        className="gap-2 bg-emerald-600 hover:bg-emerald-700 rounded-2xl"
        onClick={onDeployOpen}
      >
        <Upload className="h-4 w-4" /> Deploy BPMN
      </Button>
      <Button
        variant="outline"
        className="gap-2 text-red-600 border-red-200 hover:bg-red-50 rounded-2xl"
        onClick={onCancelOpen}
      >
        <Trash2 className="h-4 w-4" /> Hủy Instance
      </Button>
      <Button
        variant="outline"
        size="sm"
        className="gap-2 ml-auto border-emerald-200 hover:bg-emerald-50 hover:text-emerald-600 rounded-2xl"
        onClick={onRefreshAll}
      >
        <RefreshCw className="h-4 w-4" /> Làm mới tất cả
      </Button>
    </div>
  );
};

export default ActionsSection;
