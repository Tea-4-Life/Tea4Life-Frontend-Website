import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { UserMenu } from "@/components/custom/UserMenu";
import { RequireLoginDialog } from "@/components/custom/RequireLoginDialog";
import { useAuth } from "@/features/auth/useAuth";
import { getMediaUrl } from "@/lib/utils";
import keycloak from "@/lib/keycloak";
import { Menu, X, ShoppingCart, Store, UserCircle, LogOut, ShoppingBag } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/features/store";
import { fetchCart, clearLastAction } from "@/features/cart/cartSlice";

const navLinks = [
  { name: "[ TRANG CHỦ ]", href: "/" },
  { name: "[ GIỚI THIỆU ]", href: "/about" },
  { name: "[ SẢN PHẨM ]", href: "/shop", icon: ShoppingBag },
  { name: "[ TIN TỨC ]", href: "/news" },
  { name: "[ CỬA HÀNG ]", href: "/stores", icon: Store },
];

export default function Header() {
  const dispatch = useAppDispatch();
  const { cart, lastAction } = useAppSelector((state) => state.cart);
  
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showLoginDialog, setShowLoginDialog] = useState(false);
  const [isBouncing, setIsBouncing] = useState(false);
  const [bubbleMessage, setBubbleMessage] = useState<string | null>(null);
  const bounceTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const { isAuthenticated, fullName, email, avatarUrl, initialized } =
    useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchCart());
    }
  }, [isAuthenticated, dispatch]);

  useEffect(() => {
    if (lastAction.type) {
      const type = lastAction.type;
      
      // Use setTimeout to avoid synchronous cascading renders
      const timer = setTimeout(() => {
        if (type === "add") {
          setIsBouncing(true);
        }
        
        const messages = {
          add: "+ Đã thêm vào giỏ",
          remove: "- Đã xóa món",
          clear: "× Đã làm trống giỏ",
          update: "✓ Đã cập nhật",
        };
        
        setBubbleMessage(messages[type] || null);
      }, 0);

      if (bounceTimeout.current) clearTimeout(bounceTimeout.current);
      bounceTimeout.current = setTimeout(() => {
        setIsBouncing(false);
        setBubbleMessage(null);
        dispatch(clearLastAction());
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [lastAction.timestamp, lastAction.type, dispatch]);

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
          <nav className="hidden items-center gap-4 lg:gap-6 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="text-xs lg:text-sm font-bold text-[#1A4331] hover:bg-[#1A4331] hover:text-[#F8F5F0] px-2 py-1 transition-colors flex items-center gap-1.5"
              >
                {link.icon && <link.icon className="h-4 w-4 opacity-70" />}
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Actions Area */}
          <div className="flex items-center gap-4">
            <div 
              className="relative group flex items-center py-2 h-full"
              onMouseEnter={() => {
                if (isAuthenticated) dispatch(fetchCart());
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
                className={`relative p-2 text-[#1A4331] group-hover:bg-[#1A4331] group-hover:text-[#F8F5F0] border-2 border-transparent group-hover:border-[#1A4331] transition-colors z-10 ${
                  isBouncing ? "animate-bounce" : ""
                }`}
              >
                <ShoppingCart className="h-6 w-6" />
                {cart && cart.totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center bg-[#8A9A7A] border-2 border-[#1A4331] text-[10px] font-bold text-[#F8F5F0]">
                    {cart.totalItems}
                  </span>
                )}
              </Link>
              
              {/* Bubble Feedback Message */}
              {bubbleMessage && (
                <div className="absolute top-12 -right-2 bg-[#8A9A7A] text-[#F8F5F0] text-[11px] font-bold px-3 py-1.5 shadow-[2px_2px_0px_#1A4331] border-2 border-[#1A4331] z-60 animate-in fade-in zoom-in slide-in-from-top-2 duration-300 pointer-events-none whitespace-nowrap uppercase tracking-tighter">
                  {bubbleMessage}
                </div>
              )}
              
              {/* Dropdown Popover */}
              {isAuthenticated && cart && cart.totalItems > 0 && (
                <div className="absolute top-12 right-0 mt-2 w-[320px] bg-white border-2 border-[#1A4331] shadow-[4px_4px_0px_#1A4331] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 flex flex-col pointer-events-auto cursor-default">
                  <div className="p-3 border-b-2 border-[#1A4331]/10 bg-[#F8F5F0]">
                    <p className="text-xs font-bold text-[#1A4331] opacity-70 uppercase tracking-wide">Sản phẩm mới thêm</p>
                  </div>
                  <div className="flex flex-col">
                    {cart.items.slice(0, 3).map(item => (
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
                  {cart.totalItems > 3 && (
                    <div className="p-2 text-center bg-[#F8F5F0] border-t border-[#1A4331]/10">
                      <p className="text-[11px] font-bold text-[#8A9A7A]">Xem thêm {cart.totalItems - 3} món trong giỏ...</p>
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
                  className="px-4 py-3 flex items-center gap-3 text-sm font-bold text-[#1A4331] hover:bg-[#1A4331] hover:text-[#F8F5F0] uppercase border-l-4 border-transparent hover:border-[#1A4331] transition-all"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.icon && <link.icon className="h-5 w-5 opacity-70" />}
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
