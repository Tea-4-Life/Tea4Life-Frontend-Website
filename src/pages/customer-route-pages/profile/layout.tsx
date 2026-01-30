"use client";

import { Link, Outlet, useLocation } from "react-router-dom";
import { User, MapPin, Lock, Camera } from "lucide-react";
import { cn } from "@/lib/utils.ts";

const menuItems = [
  { name: "Thông tin chung", href: "/profile/general", icon: User },
  { name: "Địa chỉ", href: "/profile/address", icon: MapPin },
  { name: "Bảo mật", href: "/profile/security", icon: Lock },
];

export default function ProfileLayout() {
  const { pathname } = useLocation();

  return (
    <div className="min-h-screen bg-linear-to-b from-emerald-50/50 to-white py-12">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Profile Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-8">
          <div className="relative group">
            <div className="h-24 w-24 rounded-full bg-emerald-100 flex items-center justify-center border-2 border-emerald-200 overflow-hidden">
              <User className="h-12 w-12 text-emerald-600" />
            </div>
            <button className="absolute bottom-0 right-0 p-1.5 bg-emerald-500 rounded-full text-white border-2 border-white hover:bg-emerald-600 transition-colors">
              <Camera className="h-4 w-4" />
            </button>
          </div>
          <div>
            <h1 className="text-3xl font-bold text-emerald-900">
              Hồ sơ cá nhân
            </h1>
            <p className="text-emerald-600">
              Quản lý thông tin tài khoản và bảo mật của bạn
            </p>
          </div>
        </div>

        {/* Navigation Menu - CẬP NHẬT: Thay w-fit bằng w-full */}
        <div className="flex gap-2 bg-emerald-50 p-1 rounded-lg mb-6 w-full">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  /* CẬP NHẬT: Thêm flex-1 và justify-center */
                  "flex-1 flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium rounded-md transition-all",
                  isActive
                    ? "bg-white text-emerald-700 shadow-sm"
                    : "text-emerald-600 hover:text-emerald-800 hover:bg-emerald-100/50",
                )}
              >
                <Icon className="h-4 w-4" />
                <span className="truncate">{item.name}</span>
              </Link>
            );
          })}
        </div>

        {/* Page Content */}
        <div className="mt-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
