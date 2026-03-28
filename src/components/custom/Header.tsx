import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { UserMenu } from "@/components/custom/UserMenu";
import { RequireLoginDialog } from "@/components/custom/RequireLoginDialog";
import { getMyRecentCartItemsApi } from "@/services/cartApi";
import type { RecentCartItemsResponse } from "@/types/cart/RecentCartItemsResponse";
import { useAuth } from "@/features/auth/useAuth";
import { getMediaUrl } from "@/lib/utils";
import keycloak from "@/lib/keycloak";
import { Menu, X, ShoppingCart, Store, UserCircle, LogOut } from "lucide-react";

const navLinks = [{ name: "[ TRANG CHỦ ]", href: "/" }];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showLoginDialog, setShowLoginDialog] = useState(false);
  const [recentCart, setRecentCart] = useState<RecentCartItemsResponse | null>(null);

  const { isAuthenticated, fullName, email, avatarUrl, initialized } =
    useAuth();

  const fetchRecentCart = async () => {
    try {
      const res = await getMyRecentCartItemsApi();
      setRecentCart(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchRecentCart();
      const handleCartUpdate = () => fetchRecentCart();
      window.addEventListener("cartUpdated", handleCartUpdate);
      return () => window.removeEventListener("cartUpdated", handleCartUpdate);
    } else {
      setRecentCart(null);
    }
  }, [isAuthenticated]);

  const handleLogin = () => keycloak.login();
  const handleLogout = () =>
    keycloak.logout({ redirectUri: window.location.origin });

  return (
    <header className="sticky top-0 z-50 border-b-4 border-[#1A4331] bg-[#F8F5F0] font-mono">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0 group">
            <img
              src="/logo/logo.png"
              alt="Tea4Life Logo"
              className="h-10 w-10 object-contain rounded-md"
            />
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
                <Store className="h-4 w-4" /> THỰC ĐƠN
              </Button>
            </Link>
            <Link
              to="/about"
              className="text-sm font-bold text-[#1A4331] hover:bg-[#1A4331] hover:text-[#F8F5F0] px-2 py-1 transition-colors"
            >
              [ VỀ CHÚNG TÔI ]
            </Link>
          </nav>

          {/* Actions Area */}
          <div className="flex items-center gap-4">
            <div 
              className="relative group flex items-center py-2 h-full"
              onMouseEnter={() => {
                if (isAuthenticated) fetchRecentCart();
              }}
            >
              <Link
                to="/cart"
                onClick={(e) => {
                  if (!isAuthenticated) {
                    e.preventDefault();
                    setShowLoginDialog(true);
                  }
                }}
                className="relative p-2 text-[#1A4331] group-hover:bg-[#1A4331] group-hover:text-[#F8F5F0] border-2 border-transparent group-hover:border-[#1A4331] transition-colors z-10"
              >
                <ShoppingCart className="h-6 w-6" />
                {recentCart && recentCart.totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center bg-[#8A9A7A] border-2 border-[#1A4331] text-[10px] font-bold text-[#F8F5F0]">
                    {recentCart.totalItems}
                  </span>
                )}
              </Link>
              
              {/* Dropdown Popover */}
              {isAuthenticated && recentCart && recentCart.totalItems > 0 && (
                <div className="absolute top-12 right-0 mt-2 w-[320px] bg-white border-2 border-[#1A4331] shadow-[4px_4px_0px_#1A4331] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 flex flex-col pointer-events-auto cursor-default">
                  <div className="p-3 border-b-2 border-[#1A4331]/10 bg-[#F8F5F0]">
                    <p className="text-xs font-bold text-[#1A4331] opacity-70 uppercase tracking-wide">Sản phẩm mới thêm</p>
                  </div>
                  <div className="flex flex-col">
                    {recentCart.items.slice(0, 3).map(item => (
                      <div key={item.id} className="flex gap-3 p-3 border-b border-[#1A4331]/5 hover:bg-[#F8F5F0] transition-colors">
                        <img src={item.productImageUrl ? getMediaUrl(item.productImageUrl) : "/placeholder.svg"} alt={item.productName} className="w-12 h-12 object-cover border border-[#1A4331]/10 bg-white" />
                        <div className="flex-1 min-w-0">
                          <p className="text-[13px] font-bold text-[#1A4331] truncate">{item.productName}</p>
                          <p className="text-xs font-semibold text-[#8A9A7A] mt-1 flex justify-between">
                            <span>{new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(item.subTotal)}</span>
                            <span className="text-[#1A4331]">x{item.quantity}</span>
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  {recentCart.totalItems > 3 && (
                    <div className="p-2 text-center bg-[#F8F5F0] border-t border-[#1A4331]/10">
                      <p className="text-[11px] font-bold text-[#8A9A7A]">Xem thêm {recentCart.totalItems - 3} món trong giỏ...</p>
                    </div>
                  )}
                  <div className="p-3">
                    <Link to="/cart" className="block w-full py-2 bg-[#1A4331] text-white text-center text-sm font-bold hover:bg-[#8A9A7A] transition-colors cursor-pointer border-2 border-transparent hover:border-[#1A4331]">
                      XEM THÊM GIỎ HÀNG
                    </Link>
                  </div>
                </div>
              )}
            </div>

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

      <RequireLoginDialog
        isOpen={showLoginDialog}
        onOpenChange={setShowLoginDialog}
        title="Yêu cầu đăng nhập"
        description="Vui lòng đăng nhập để xem giỏ hàng của bạn nhé!"
      />
    </header>
  );
}
