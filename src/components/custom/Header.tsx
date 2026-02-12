import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { UserMenu } from "@/components/custom/UserMenu";
import { useAuth } from "@/features/auth/useAuth";
import { getMediaUrl } from "@/lib/utils";
import keycloak from "@/lib/keycloak";
import {
  Menu,
  X,
  Leaf,
  ShoppingCart,
  Store,
  UserCircle,
  LogOut,
} from "lucide-react";

const navLinks = [
  { name: "Trang chủ", href: "/" },
  { name: "Danh mục", href: "/categories" },
  { name: "Thương hiệu", href: "/brands" },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isAuthenticated, fullName, email, avatarUrl, initialized } = useAuth();
  const cartCount = 0;

  const handleLogin = () => keycloak.login();
  const handleLogout = () =>
    keycloak.logout({ redirectUri: window.location.origin });

  return (
    <header className="sticky top-0 z-50 border-b border-emerald-100 bg-white/95 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-green-500">
              <Leaf className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-emerald-800 tracking-tight">
              Tea4Life
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-6 lg:gap-8 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="text-sm font-medium text-emerald-700 hover:text-emerald-500"
              >
                {link.name}
              </Link>
            ))}
            <Link to="/shop">
              <Button className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-full px-6 flex gap-2">
                <Store className="h-4 w-4" /> Cửa hàng
              </Button>
            </Link>
          </nav>

          {/* Actions Area */}
          <div className="flex items-center gap-2 sm:gap-4">
            <Link to="/cart" className="relative p-2 text-emerald-700">
              <ShoppingCart className="h-6 w-6" />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* PHẦN THAY ĐỔI: Login Button vs UserMenu  */}
            <div className="hidden sm:block">
              {!initialized ? (
                <div className="h-8 w-8 animate-pulse rounded-full bg-emerald-100" />
              ) : isAuthenticated ? (
                <UserMenu user={{ name: fullName || "", email: email || "", avatar: getMediaUrl(avatarUrl) }} />
              ) : (
                <Button
                  onClick={handleLogin}
                  variant="outline"
                  className="border-emerald-600 text-emerald-600 hover:bg-emerald-50"
                >
                  Đăng nhập
                </Button>
              )}
            </div>

            <button
              className="md:hidden p-2 text-emerald-700"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="border-t border-emerald-100 py-4 md:hidden">
            <nav className="flex flex-col gap-4">
              {!isAuthenticated && (
                <Button
                  onClick={handleLogin}
                  className="mx-2 bg-emerald-600 text-white"
                >
                  Đăng nhập ngay
                </Button>
              )}

              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className="px-2 flex items-center gap-3 text-sm font-medium text-emerald-700"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}

              {isAuthenticated && (
                <>
                  <hr className="border-emerald-50 mx-2" />
                  <div className="px-2 space-y-5">
                    <Link
                      to="/profile"
                      className="flex items-center gap-3 text-sm font-medium text-emerald-700"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <UserCircle className="h-5 w-5 text-emerald-500" /> Hồ sơ
                      cá nhân
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-3 text-sm font-medium text-red-500 w-full"
                    >
                      <LogOut className="h-5 w-5" /> Đăng xuất
                    </button>
                  </div>
                </>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
