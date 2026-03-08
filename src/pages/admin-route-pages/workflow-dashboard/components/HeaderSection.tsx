import React from "react";
import { Activity } from "lucide-react";

const HeaderSection: React.FC = () => {
  return (
    <div className="flex flex-col gap-1">
      <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
        <Activity className="h-6 w-6 text-emerald-600" />
        Giám sát luồng
      </h1>
      <p className="text-sm text-slate-500">
        Theo dõi trạng thái Workflow Engine và các luồng xử lý trong hệ thống.
      </p>
    </div>
  );
};

export default HeaderSection;
