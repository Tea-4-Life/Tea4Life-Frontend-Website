import { useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { LogOut, PackageSearch, UserCircle } from "lucide-react";
import { getNameInitials } from "@/lib/utils";
import keycloak from "@/lib/keycloak";

interface UserMenuProps {
  user: {
    name: string;
    email: string;
    avatar?: string;
  };
}

export function UserMenu({ user }: UserMenuProps) {
  const navigate = useNavigate();
  const handleLogout = () => {
    keycloak.logout({ redirectUri: window.location.origin });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="relative flex items-center gap-2 px-2 hover:bg-emerald-50 focus-visible:ring-0 focus-visible:ring-offset-0"
        >
          <div className="h-8 w-8 rounded-full bg-emerald-100 flex items-center justify-center border border-emerald-200 overflow-hidden">
            {user.avatar ? (
              <img
                src={user.avatar}
                alt={user.name}
                className="h-full w-full object-cover"
              />
            ) : (
              <span className="text-xs font-bold text-emerald-600">
                {getNameInitials(user.name)}
              </span>
            )}
          </div>
          <span className="text-sm font-medium text-emerald-800 hidden lg:block">
            {user.name || user.email}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none text-emerald-900">
              {user.name || "Người dùng"}
            </p>
            {user.email && (
              <p className="text-xs leading-none text-emerald-500">
                {user.email}
              </p>
            )}
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => navigate("/profile")}
          className="cursor-pointer focus:bg-emerald-50"
        >
          <UserCircle className="mr-2 h-4 w-4 text-emerald-600" />
          <span>Thông tin cá nhân</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => navigate("/order")}
          className="cursor-pointer focus:bg-emerald-50"
        >
          <PackageSearch className="mr-2 h-4 w-4 text-emerald-600" />
          <span>Đơn hàng của tôi</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={handleLogout}
          className="cursor-pointer text-red-600 focus:bg-red-50"
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Đăng xuất</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
