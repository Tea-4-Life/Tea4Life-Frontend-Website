import AdminPageHeader from "@/pages/admin-route-pages/components/AdminPageHeader";
import { Store } from "lucide-react";

export default function AdminStoresPage() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <AdminPageHeader
        title="Quản lý cửa hàng"
        description="Quản lý các chi nhánh và cửa hàng của hệ thống"
        icon={Store}
      />
      
      <div className="bg-white/5 border border-emerald-800/30 rounded-xl p-8 text-center flex flex-col items-center justify-center min-h-[400px]">
        <Store className="h-12 w-12 text-emerald-500/50 mb-4" />
        <h3 className="text-xl font-medium text-emerald-100 mb-2">Đang phát triển</h3>
        <p className="text-emerald-200/60 max-w-sm mx-auto">
          Tính năng quản lý cửa hàng đang được xây dựng và sẽ sớm ra mắt.
        </p>
      </div>
    </div>
  );
}
