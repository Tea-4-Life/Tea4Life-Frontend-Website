import { Outlet, NavLink } from "react-router-dom";
import { LayoutDashboard, ClipboardList } from "lucide-react";

export default function DriverLayout() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col max-w-md mx-auto border-x border-slate-200 relative">
      {/* Vùng nội dung trang con */}
      <main className="flex-1 overflow-y-auto pb-24">
        <Outlet />
      </main>

      {/* Bottom Navigation tối giản chỉ 2 nút */}
      <nav className="h-16 bg-white border-t border-slate-200 flex items-center fixed bottom-0 left-0 right-0 max-w-md mx-auto px-4 shadow-[0_-4px_12px_rgba(0,0,0,0.05)] z-50">
        <NavButton
          to="/driver/dashboard"
          icon={<LayoutDashboard size={24} />}
          label="Sảnh"
        />
        <NavButton
          to="/driver/orders"
          icon={<ClipboardList size={24} />}
          label="Đơn hàng"
        />
      </nav>
    </div>
  );
}

// Hàm bổ trợ nút điều hướng - Đã fix lỗi isActive
function NavButton({
  to,
  icon,
  label,
}: {
  to: string;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <NavLink
      to={to}
      className={({ isActive }: { isActive: boolean }) =>
        `flex flex-1 flex-col items-center justify-center gap-1 transition-all ${
          isActive ? "text-emerald-600 scale-105" : "text-slate-400"
        }`
      }
    >
      {icon}
      <span className="text-[11px] font-black uppercase tracking-tighter">
        {label}
      </span>
    </NavLink>
  );
}
