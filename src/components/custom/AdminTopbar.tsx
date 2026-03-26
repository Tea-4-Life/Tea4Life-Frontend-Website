import { Bell, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/features/auth/useAuth";

export default function AdminTopbar() {
  const { fullName, email, avatarUrl } = useAuth();

  const displayName = fullName || email || "Admin";
  const initials = displayName
    .split(" ")
    .map((n: string) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <header className="h-16 border-b bg-white/80 backdrop-blur-sm sticky top-0 z-30 flex items-center justify-between px-8 gap-4">
      {/* Search */}
      <div className="flex-1 max-w-md">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            placeholder="Tìm kiếm nhanh..."
            className="pl-10 h-10 bg-slate-50 border-slate-200 rounded-xl focus-visible:ring-emerald-500/20 focus-visible:border-emerald-400 text-sm"
          />
        </div>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-4">
        {/* Notifications */}
        <button className="relative p-2 rounded-xl hover:bg-slate-100 transition-colors">
          <Bell className="h-5 w-5 text-slate-500" />
          <Badge className="absolute -top-0.5 -right-0.5 h-4 w-4 p-0 flex items-center justify-center text-[10px] bg-red-500 text-white border-2 border-white">
            3
          </Badge>
        </button>

        {/* Divider */}
        <div className="h-8 w-px bg-slate-200" />

        {/* User Profile */}
        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-semibold text-slate-700 leading-tight">
              {displayName}
            </p>
            <p className="text-[11px] text-emerald-600 font-medium">
              Quản trị viên
            </p>
          </div>
          <Avatar className="h-9 w-9 border-2 border-emerald-200">
            <AvatarImage src={avatarUrl || undefined} />
            <AvatarFallback className="bg-emerald-100 text-emerald-700 text-xs font-bold">
              {initials}
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
}
