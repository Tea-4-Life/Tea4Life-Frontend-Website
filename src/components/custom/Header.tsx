import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Leaf, ShoppingCart, UserCircle, Store } from "lucide-react";

// Menu điều hướng tinh gọn
const navLinks = [
  { name: "Trang chủ", href: "/" },
  { name: "Đơn hàng", href: "/order" },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const cartCount = 2; // Số lượng giả lập

  return (
    <header className="sticky top-0 z-50 border-b border-emerald-100 bg-white/95 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-linear-to-br from-emerald-500 to-green-500">
              <Leaf className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-emerald-800">Tea4Life</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-6 lg:gap-8 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="text-sm font-medium text-emerald-700 transition-colors hover:text-emerald-500"
              >
                {link.name}
              </Link>
            ))}

            {/* Nút Cửa hàng nổi bật */}
            <Link to="/shop">
              <Button
                variant="default"
                className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-full px-6 flex gap-2"
              >
                <Store className="h-4 w-4" /> Cửa hàng
              </Button>
            </Link>
          </nav>

          {/* Actions Area */}
          <div className="flex items-center gap-3 sm:gap-5">
            {/* Giỏ hàng */}
            <Link
              to="/cart"
              className="relative p-2 text-emerald-700 hover:text-emerald-500 transition-colors"
            >
              <ShoppingCart className="h-6 w-6" />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Tài khoản */}
            <Link
              to="/profile"
              className="hidden sm:flex items-center gap-1 text-sm font-medium text-emerald-700 hover:text-emerald-500"
            >
              <UserCircle className="h-6 w-6" />
              <span className="hidden lg:inline">Tài khoản</span>
            </Link>

            {/* Mobile Menu Toggle */}
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
              <Link to="/shop" onClick={() => setMobileMenuOpen(false)}>
                <Button className="w-full bg-emerald-600 text-white flex gap-2">
                  <Store className="h-4 w-4" /> Vào Cửa hàng
                </Button>
              </Link>

              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className="px-2 text-sm font-medium text-emerald-700 hover:text-emerald-500"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}

              <hr className="border-emerald-50" />

              <Link
                to="/profile"
                className="flex items-center gap-2 px-2 text-sm font-medium text-emerald-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                <UserCircle className="h-5 w-5" /> Hồ sơ cá nhân
              </Link>

              <Link
                to="/auth"
                className="px-2 text-sm font-medium text-red-500"
                onClick={() => setMobileMenuOpen(false)}
              >
                Đăng xuất
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
