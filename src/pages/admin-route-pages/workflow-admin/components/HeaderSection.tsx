import React from "react";
import { GitBranch } from "lucide-react";

const HeaderSection: React.FC = () => {
  return (
    <div className="flex flex-col gap-1">
      <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
        <GitBranch className="h-6 w-6 text-emerald-600" />
        Quản trị luồng
      </h1>
      <p className="text-sm text-slate-500">
        Deploy, quản lý definitions, xử lý incidents và theo dõi metrics.
      </p>
    </div>
  );
};

export default HeaderSection;
