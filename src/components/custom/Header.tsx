import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Leaf } from "lucide-react";

// Cập nhật href để khớp với cấu hình router trong index.tsx
const navLinks = [
  { name: "Trang chủ", href: "/" },
  { name: "Cửa hàng", href: "/shop" }, // Đã sửa từ /san-pham thành /shop
  { name: "Về chúng tôi", href: "/ve-chung-toi" },
  { name: "Liên hệ", href: "/lien-he" },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-emerald-100 bg-white/95 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            {/* Cập nhật bg-linear-to-br cho Tailwind v4 */}
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-linear-to-br from-emerald-500 to-green-500">
              <Leaf className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-emerald-800">Tea4Life</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="text-sm font-medium text-emerald-700 transition-colors hover:text-emerald-500"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Link to="/shop">
              <Button className="bg-linear-to-r from-emerald-500 to-green-500 text-white hover:from-emerald-600 hover:to-green-600">
                Mua ngay
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6 text-emerald-700" />
            ) : (
              <Menu className="h-6 w-6 text-emerald-700" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="border-t border-emerald-100 py-4 md:hidden">
            <nav className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className="text-sm font-medium text-emerald-700 transition-colors hover:text-emerald-500"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <Link to="/shop" onClick={() => setMobileMenuOpen(false)}>
                <Button className="mt-2 w-full bg-linear-to-r from-emerald-500 to-green-500 text-white hover:from-emerald-600 hover:to-green-600">
                  Mua ngay
                </Button>
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
