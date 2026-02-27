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
  { name: "[ TRANG CHỦ ]", href: "/" },
  { name: "[ DANH MỤC ]", href: "/categories" },
  { name: "[ THƯƠNG HIỆU ]", href: "/brands" },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isAuthenticated, fullName, email, avatarUrl, initialized } =
    useAuth();
  const cartCount = 0;

  const handleLogin = () => keycloak.login();
  const handleLogout = () =>
    keycloak.logout({ redirectUri: window.location.origin });

  return (
    <header className="sticky top-0 z-50 border-b-4 border-[#1A4331] bg-[#F8F5F0] font-mono">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0 group">
            <div className="flex h-10 w-10 items-center justify-center bg-[#1A4331] pixel-border group-hover:bg-[#8A9A7A] transition-colors">
              <Leaf className="h-5 w-5 text-white" />
            </div>
            <span className="text-2xl font-bold text-[#1A4331] tracking-tight pixel-text uppercase">
              Tea4Life
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-6 lg:gap-8 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="text-sm font-bold text-[#1A4331] hover:bg-[#1A4331] hover:text-[#F8F5F0] px-2 py-1 transition-colors"
              >
                {link.name}
              </Link>
            ))}
            <Link to="/shop">
              <Button className="bg-[#1A4331] text-white hover:bg-[#8A9A7A] hover:text-[#1A4331] pixel-button flex gap-2">
                <Store className="h-4 w-4" /> CỬA HÀNG
              </Button>
            </Link>
          </nav>

          {/* Actions Area */}
          <div className="flex items-center gap-4">
            <Link
              to="/cart"
              className="relative p-2 text-[#1A4331] hover:bg-[#1A4331] hover:text-[#F8F5F0] border-2 border-transparent hover:border-[#1A4331]"
            >
              <ShoppingCart className="h-6 w-6" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center bg-[#8A9A7A] border-2 border-[#1A4331] text-[10px] font-bold text-[#F8F5F0]">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* PHẦN THAY ĐỔI: Login Button vs UserMenu  */}
            <div className="hidden sm:block">
              {!initialized ? (
                <div className="h-8 w-8 animate-pulse bg-[#8A9A7A] border-2 border-[#1A4331]" />
              ) : isAuthenticated ? (
                <div className="pixel-border border-2 shadow-[2px_2px_0px_#1A4331]">
                  <UserMenu
                    user={{
                      name: fullName || "",
                      email: email || "",
                      avatar: getMediaUrl(avatarUrl),
                    }}
                  />
                </div>
              ) : (
                <Button
                  onClick={handleLogin}
                  className="bg-transparent border-2 border-[#1A4331] text-[#1A4331] hover:bg-[#1A4331] hover:text-[#F8F5F0] pixel-button"
                >
                  ĐĂNG NHẬP
                </Button>
              )}
            </div>

            <button
              className="md:hidden p-2 text-[#1A4331] pixel-button border-2 bg-white"
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
          <div className="border-t-4 border-[#1A4331] py-4 md:hidden bg-[#F8F5F0]">
            <nav className="flex flex-col gap-4">
              {!isAuthenticated && (
                <Button
                  onClick={handleLogin}
                  className="mx-2 bg-[#1A4331] text-[#F8F5F0] pixel-button"
                >
                  ĐĂNG NHẬP NGAY
                </Button>
              )}

              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className="px-4 py-2 flex items-center gap-3 text-sm font-bold text-[#1A4331] hover:bg-[#1A4331] hover:text-[#F8F5F0] uppercase border-l-4 border-transparent hover:border-[#1A4331]"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}

              {isAuthenticated && (
                <>
                  <div className="h-1 bg-[#1A4331] mx-2 my-2 opacity-50" />
                  <div className="px-2 space-y-2">
                    <Link
                      to="/profile"
                      className="flex items-center gap-3 py-2 px-2 text-sm font-bold text-[#1A4331] hover:bg-[#1A4331] hover:text-[#F8F5F0] uppercase"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <UserCircle className="h-5 w-5" /> HỒ SƠ
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-3 py-2 px-2 text-sm font-bold text-red-600 w-full hover:bg-red-600 hover:text-white uppercase"
                    >
                      <LogOut className="h-5 w-5" /> ĐĂNG XUẤT
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
