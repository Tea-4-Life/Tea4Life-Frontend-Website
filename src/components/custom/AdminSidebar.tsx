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
  ShieldCheck,
  Lock,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";

interface SidebarLink {
  name: string;
  href: string;
  icon: LucideIcon;
}

interface SidebarGroup {
  label: string;
  links: SidebarLink[];
}

const adminGroups: SidebarGroup[] = [
  {
    label: "Hệ thống",
    links: [
      { name: "Tổng quan", href: "/admin/dashboard", icon: LayoutDashboard },
      { name: "Báo cáo", href: "/admin/reports", icon: BarChart3 },
    ],
  },
  {
    label: "Người dùng & Phân quyền",
    links: [
      { name: "Người dùng", href: "/admin/users", icon: Users },
      { name: "Quyền", href: "/admin/permissions", icon: ShieldCheck },
      { name: "Chức vụ", href: "/admin/roles", icon: Lock },
    ],
  },
  {
    label: "Quản lý sản phẩm",
    links: [
      { name: "Danh mục", href: "/admin/categories", icon: LayoutGrid },
      { name: "Sản phẩm", href: "/admin/products", icon: Package },
      { name: "Thương hiệu", href: "/admin/brands", icon: Award },
      { name: "Vùng miền", href: "/admin/regions", icon: Map },
    ],
  },
  {
    label: "Kinh doanh",
    links: [{ name: "Đơn hàng", href: "/admin/orders", icon: ShoppingCart }],
  },
];

export default function AdminSidebar() {
  const { pathname } = useLocation();

  return (
    <aside className="hidden md:flex w-64 flex-col border-r bg-white sticky top-0 h-screen shadow-sm">
      {/* Brand Header */}
      <div className="p-6 border-b flex items-center gap-3 bg-emerald-900">
        <div className="h-9 w-9 bg-white rounded-lg flex items-center justify-center shrink-0">
          <Leaf className="h-5 w-5 text-emerald-600" />
        </div>
        <div className="flex flex-col">
          <span className="font-bold text-white text-lg leading-none tracking-tight">
            Tea4Life
          </span>
          <span className="text-emerald-300 text-[10px] uppercase font-bold tracking-widest mt-1">
            Admin Panel
          </span>
        </div>
      </div>

      <ScrollArea className="flex-1 min-h-0 px-4 py-6">
        <div className="space-y-8">
          {adminGroups.map((group, idx) => (
            <div key={idx} className="space-y-3">
              <h3 className="px-3 text-[11px] font-bold text-slate-400 uppercase tracking-[0.15em]">
                {group.label}
              </h3>
              <div className="space-y-1">
                {group.links.map((link) => {
                  const Icon = link.icon;
                  const isActive =
                    pathname === link.href ||
                    pathname.startsWith(link.href + "/");

                  return (
                    <Link
                      key={link.href}
                      to={link.href}
                      className={cn(
                        "flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group relative",
                        isActive
                          ? "bg-emerald-50 text-emerald-700 shadow-sm border-emerald-100"
                          : "text-slate-500 hover:bg-slate-50 hover:text-emerald-600",
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={cn(
                            "p-1.5 rounded-lg transition-colors",
                            isActive
                              ? "bg-emerald-500 text-white"
                              : "bg-slate-50 text-slate-400 group-hover:bg-emerald-50 group-hover:text-emerald-500",
                          )}
                        >
                          <Icon className="h-4 w-4" />
                        </div>
                        <span
                          className={cn(
                            "transition-colors",
                            isActive ? "font-semibold" : "font-medium",
                          )}
                        >
                          {link.name}
                        </span>
                      </div>

                      {isActive && (
                        <div className="h-5 w-1 bg-emerald-500 rounded-full absolute -left-1" />
                      )}

                      {isActive && (
                        <ChevronRight className="h-4 w-4 text-emerald-500" />
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      {/* Footer Actions */}
      <div className="p-4 border-t bg-slate-50/50">
        <Link
          to="/"
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-slate-600 hover:bg-white hover:text-emerald-600 transition-all border border-transparent hover:border-slate-100 shadow-sm hover:shadow-md group"
        >
          <div className="p-1.5 rounded-lg bg-white border group-hover:border-emerald-100">
            <Settings className="h-4 w-4" />
          </div>
          Quay lại Website
        </Link>
      </div>
    </aside>
  );
}
