import { Menu, Bell } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/features/auth/useAuth";
import { useLocation } from "react-router-dom";

// Breadcrumb label map
const pathLabels: Record<string, string> = {
  dashboard: "Dashboard",
  products: "Sản phẩm",
  categories: "Danh mục",
  "product-options": "Tùy chọn SP",
  orders: "Đơn hàng",
  vouchers: "Phiếu giảm giá",
  users: "Người dùng",
  permissions: "Phân quyền",
  roles: "Chức vụ",
  "audit-logs": "Nhật ký",
  reports: "Báo cáo",
  create: "Tạo mới",
  edit: "Chỉnh sửa",
};

interface AdminTopbarProps {
  onMenuClick?: () => void;
}

export default function AdminTopbar({ onMenuClick }: AdminTopbarProps) {
  const { fullName, email, avatarUrl } = useAuth();
  const { pathname } = useLocation();

  const displayName = fullName || email || "Admin";
  const initials = displayName
    .split(" ")
    .map((n: string) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  // Build breadcrumb from path
  const segments = pathname.split("/").filter(Boolean).slice(1); // remove "admin"
  const breadcrumbs = segments.map((seg) => pathLabels[seg] || seg);

  return (
    <header className="h-14 border-b border-slate-200/80 bg-white sticky top-0 z-30 flex items-center justify-between px-4 md:px-6 gap-3">
      {/* Left side: hamburger + breadcrumb */}
      <div className="flex items-center gap-3 min-w-0">
        {/* Mobile menu button */}
        <button
          onClick={onMenuClick}
          className="md:hidden p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition-colors shrink-0"
        >
          <Menu className="h-5 w-5" />
        </button>

        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-sm min-w-0">
          <span className="text-slate-400 font-medium shrink-0">Admin</span>
          {breadcrumbs.map((label, i) => (
            <span key={i} className="flex items-center gap-1.5 min-w-0">
              <span className="text-slate-300">/</span>
              <span
                className={
                  i === breadcrumbs.length - 1
                    ? "font-semibold text-slate-700 truncate"
                    : "text-slate-400 truncate"
                }
              >
                {label}
              </span>
            </span>
          ))}
        </nav>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-2.5 shrink-0">
        {/* Notifications */}
        <button className="relative p-2 rounded-lg hover:bg-slate-100 transition-colors">
          <Bell className="h-[18px] w-[18px] text-slate-500" />
          <Badge className="absolute -top-0.5 -right-0.5 h-4 w-4 p-0 flex items-center justify-center text-[9px] bg-red-500 text-white border-2 border-white rounded-full">
            3
          </Badge>
        </button>

        {/* Divider */}
        <div className="h-7 w-px bg-slate-200 hidden sm:block" />

        {/* User Profile */}
        <div className="flex items-center gap-2.5">
          <div className="text-right hidden sm:block">
            <p className="text-[13px] font-semibold text-slate-700 leading-tight">
              {displayName}
            </p>
            <p className="text-[10px] text-emerald-600 font-medium">
              Quản trị viên
            </p>
          </div>
          <Avatar className="h-8 w-8 border-2 border-emerald-100">
            <AvatarImage src={avatarUrl || undefined} />
            <AvatarFallback className="bg-emerald-50 text-emerald-700 text-[11px] font-bold">
              {initials}
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
}
