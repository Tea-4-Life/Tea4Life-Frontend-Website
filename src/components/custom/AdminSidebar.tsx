"use client";

import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  Users,
  ShoppingCart,
  BarChart3,
  ChevronRight,
  LayoutGrid,
  ShieldCheck,
  Lock,
  Settings,
  LogOut,
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
    label: "Tổng quan",
    links: [
      { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
      { name: "Báo cáo", href: "/admin/reports", icon: BarChart3 },
    ],
  },
  {
    label: "Quản lý",
    links: [
      { name: "Sản phẩm", href: "/admin/products", icon: Package },
      { name: "Danh mục", href: "/admin/categories", icon: LayoutGrid },
      { name: "Tùy chọn SP", href: "/admin/product-options", icon: Settings },
      { name: "Đơn hàng", href: "/admin/orders", icon: ShoppingCart },
    ],
  },
  {
    label: "Hệ thống",
    links: [
      { name: "Người dùng", href: "/admin/users", icon: Users },
      { name: "Phân quyền", href: "/admin/permissions", icon: ShieldCheck },
      { name: "Chức vụ", href: "/admin/roles", icon: Lock },
    ],
  },
];

export default function AdminSidebar() {
  const { pathname } = useLocation();

  return (
    <aside className="hidden md:flex w-[260px] flex-col bg-slate-900 sticky top-0 h-screen">
      {/* Brand */}
      <div className="px-6 py-5 flex items-center gap-3">
        <div className="h-10 w-10 rounded-xl bg-emerald-500 flex items-center justify-center shadow-lg shadow-emerald-500/20 shrink-0">
          <img
            src="/logo/logo.png"
            alt="Logo"
            className="h-7 w-7 object-contain"
          />
        </div>
        <div className="flex flex-col">
          <span className="font-bold text-white text-base leading-none tracking-tight">
            Tea4Life
          </span>
          <span className="text-emerald-400 text-[10px] uppercase font-bold tracking-[0.2em] mt-1">
            Admin Panel
          </span>
        </div>
      </div>

      {/* Separator */}
      <div className="mx-4 h-px bg-slate-700/50" />

      {/* Navigation */}
      <ScrollArea className="flex-1 min-h-0 px-3 py-4">
        <nav className="space-y-6">
          {adminGroups.map((group) => (
            <div key={group.label} className="space-y-1">
              <h3 className="px-3 mb-2 text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">
                {group.label}
              </h3>
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
                      "flex items-center justify-between px-3 py-2.5 rounded-lg text-[13px] font-medium transition-all duration-200 group relative",
                      isActive
                        ? "bg-emerald-500/15 text-emerald-400"
                        : "text-slate-400 hover:bg-slate-800 hover:text-slate-200"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={cn(
                          "p-1.5 rounded-lg transition-colors",
                          isActive
                            ? "bg-emerald-500 text-white shadow-md shadow-emerald-500/25"
                            : "bg-slate-800 text-slate-500 group-hover:bg-slate-700 group-hover:text-slate-300"
                        )}
                      >
                        <Icon className="h-4 w-4" />
                      </div>
                      <span>{link.name}</span>
                    </div>

                    {isActive && (
                      <ChevronRight className="h-3.5 w-3.5 text-emerald-400" />
                    )}

                    {/* Active indicator bar */}
                    {isActive && (
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 bg-emerald-400 rounded-r-full" />
                    )}
                  </Link>
                );
              })}
            </div>
          ))}
        </nav>
      </ScrollArea>

      {/* Footer */}
      <div className="p-3 border-t border-slate-700/50">
        <Link
          to="/"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13px] font-medium text-slate-500 hover:bg-slate-800 hover:text-slate-300 transition-all group"
        >
          <div className="p-1.5 rounded-lg bg-slate-800 group-hover:bg-slate-700">
            <LogOut className="h-4 w-4" />
          </div>
          Quay lại Website
        </Link>
      </div>
    </aside>
  );
}
