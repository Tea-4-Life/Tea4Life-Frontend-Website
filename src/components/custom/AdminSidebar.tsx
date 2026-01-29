"use client";

import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  Users,
  ShoppingCart,
  BarChart3,
  ChevronRight,
  Leaf,
  Settings,
  LayoutGrid,
  Award,
  Map,
} from "lucide-react";
import { cn } from "@/lib/utils";

const adminLinks = [
  { name: "Tổng quan", href: "/admin/dashboard", icon: LayoutDashboard },
  { name: "Sản phẩm", href: "/admin/products", icon: Package },
  { name: "Đơn hàng", href: "/admin/orders", icon: ShoppingCart },
  { name: "Danh mục", href: "/admin/categories", icon: LayoutGrid },
  { name: "Vùng miền", href: "/admin/regions", icon: Map }, // Mới bổ sung
  { name: "Thương hiệu", href: "/admin/brands", icon: Award }, // Mới bổ sung
  { name: "Khách hàng", href: "/admin/users", icon: Users },
  { name: "Báo cáo", href: "/admin/reports", icon: BarChart3 },
];

export default function AdminSidebar() {
  const { pathname } = useLocation();

  return (
    <aside className="hidden md:flex w-64 flex-col border-r bg-white sticky top-0 h-screen shadow-sm">
      <div className="p-6 border-b flex items-center gap-3 bg-emerald-900">
        <div className="h-9 w-9 bg-white rounded-lg flex items-center justify-center">
          <Leaf className="h-5 w-5 text-emerald-600" />
        </div>
        <span className="font-bold text-white text-lg tracking-tight">
          Tea4Life Admin
        </span>
      </div>

      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {adminLinks.map((link) => {
          const Icon = link.icon;
          const isActive = pathname.startsWith(link.href);
          return (
            <Link
              key={link.href}
              to={link.href}
              className={cn(
                "flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all group",
                isActive
                  ? "bg-emerald-50 text-emerald-700 border border-emerald-100"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900",
              )}
            >
              <div className="flex items-center gap-3">
                <Icon
                  className={cn(
                    "h-5 w-5",
                    isActive
                      ? "text-emerald-600"
                      : "text-slate-400 group-hover:text-slate-600",
                  )}
                />
                {link.name}
              </div>
              {isActive && <ChevronRight className="h-4 w-4" />}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t bg-slate-50/50">
        <Link
          to="/"
          className="flex items-center gap-3 px-3 py-2 text-sm text-slate-500 hover:text-emerald-600 transition-colors"
        >
          <Settings className="h-4 w-4" /> Quay lại Website
        </Link>
      </div>
    </aside>
  );
}
