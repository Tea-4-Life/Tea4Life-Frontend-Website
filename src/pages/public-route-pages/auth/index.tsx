import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Leaf, LogIn, UserPlus } from "lucide-react";
import { Link } from "react-router-dom";
import keycloak from "@/lib/keycloak"; // Import file cấu hình của bạn

export default function AuthPage() {
  // Hàm xử lý điều hướng sang Keycloak Login
  const handleLogin = () => {
    keycloak.login();
  };

  // Hàm xử lý điều hướng sang Keycloak Register
  const handleRegister = () => {
    keycloak.register();
  };

  return (
    <div className="flex min-h-[calc(100vh-160px)] items-center justify-center bg-gradient-to-br from-emerald-50 via-white to-green-50 px-4 py-12">
      {/* Background Decor */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -left-40 -top-40 h-96 w-96 rounded-full bg-emerald-200/50 blur-3xl" />
        <div className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-green-200/50 blur-3xl" />
      </div>

      <Card className="relative w-full max-w-md border-emerald-100 shadow-xl">
        <CardHeader className="text-center pb-6">
          <Link to="/" className="mx-auto mb-4 flex items-center gap-2">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-green-500 shadow-lg">
              <Leaf className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-emerald-800">
              Tea4Life
            </span>
          </Link>
          <CardTitle className="text-2xl font-bold text-emerald-900">
            Hệ thống xác thực
          </CardTitle>
          <CardDescription className="text-emerald-600">
            Vui lòng chọn phương thức để tiếp tục trải nghiệm
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Nút Đăng nhập - Gọi Keycloak Login */}
          <Button
            onClick={handleLogin}
            className="w-full h-12 text-lg bg-gradient-to-r from-emerald-500 to-green-500 text-white hover:from-emerald-600 hover:to-green-600 shadow-md transition-all"
          >
            <LogIn className="mr-2 h-5 w-5" />
            Đăng nhập ngay
          </Button>

          {/* Nút Đăng ký - Gọi Keycloak Register */}
          <Button
            onClick={handleRegister}
            variant="outline"
            className="w-full h-12 text-lg border-emerald-200 text-emerald-700 hover:bg-emerald-50 transition-all"
          >
            <UserPlus className="mr-2 h-5 w-5" />
            Tạo tài khoản mới
          </Button>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-emerald-100" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-emerald-400">
                Securely managed by Keycloak
              </span>
            </div>
          </div>

          <p className="text-center text-xs text-emerald-500 px-4">
            Bằng cách tiếp tục, bạn đồng ý với Điều khoản và Chính sách bảo mật
            của Tea4Life.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
