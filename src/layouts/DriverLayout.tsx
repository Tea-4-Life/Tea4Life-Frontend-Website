import { Outlet, NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  ClipboardList,
  Wallet,
  UserCircle,
} from "lucide-react";

export default function DriverLayout() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col max-w-md mx-auto border-x border-slate-200 relative">
      {/* Nội dung thay đổi theo Route */}
      <main className="flex-1 overflow-y-auto pb-24">
        <Outlet />
      </main>

      {/* Bottom Navigation cho Tài xế */}
      <nav className="h-16 bg-white border-t border-slate-200 flex items-center justify-around fixed bottom-0 left-0 right-0 max-w-md mx-auto px-4 shadow-[0_-2px_10px_rgba(0,0,0,0.05)] z-50">
        <NavButton
          to="/driver/dashboard"
          icon={<LayoutDashboard size={22} />}
          label="Sảnh"
        />
        <NavButton
          to="/driver/orders"
          icon={<ClipboardList size={22} />}
          label="Đơn hàng"
        />
        <NavButton
          to="/driver/earnings"
          icon={<Wallet size={22} />}
          label="Ví"
        />
        <NavButton to="/profile" icon={<UserCircle size={22} />} label="Tôi" />
      </nav>
    </div>
  );
}

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
      className={({ isActive }) =>
        `flex flex-col items-center justify-center gap-1 transition-all ${
          isActive ? "text-emerald-600 scale-110" : "text-slate-400"
        }`
      }
    >
      {icon}
      <span className="text-[10px] font-bold uppercase tracking-tighter">
        {label}
      </span>
    </NavLink>
  );
}
