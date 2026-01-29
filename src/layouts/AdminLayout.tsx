"use client";

import { Outlet } from "react-router-dom";
import AdminSidebar from "@/components/custom/AdminSidebar";

export default function AdminLayout() {
  return (
    <div className="flex min-h-screen bg-slate-50/50">
      {/* Sidebar cố định */}
      <AdminSidebar />

      {/* Vùng nội dung chính */}
      <main className="flex-1 flex flex-col min-w-0">
        <div className="p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
