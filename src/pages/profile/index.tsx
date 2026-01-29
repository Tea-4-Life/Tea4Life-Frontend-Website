import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, MapPin, Lock, Camera, Save } from "lucide-react";

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-linear-to-b from-emerald-50/50 to-white py-12">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-8">
          <div className="relative group">
            <div className="h-24 w-24 rounded-full bg-emerald-100 flex items-center justify-center border-2 border-emerald-200 overflow-hidden">
              <User className="h-12 w-12 text-emerald-600" />
            </div>
            <button className="absolute bottom-0 right-0 p-1.5 bg-emerald-500 rounded-full text-white border-2 border-white hover:bg-emerald-600 transition-colors">
              <Camera className="h-4 w-4" />
            </button>
          </div>
          <div>
            <h1 className="text-3xl font-bold text-emerald-900">
              Hồ sơ cá nhân
            </h1>
            <p className="text-emerald-600">
              Quản lý thông tin tài khoản và bảo mật của bạn
            </p>
          </div>
        </div>

        <Tabs defaultValue="general" className="space-y-6">
          <TabsList className="bg-emerald-50 p-1 text-emerald-700">
            <TabsTrigger
              value="general"
              className="data-[state=active]:bg-white data-[state=active]:text-emerald-700"
            >
              <User className="h-4 w-4 mr-2" /> Thông tin chung
            </TabsTrigger>
            <TabsTrigger
              value="address"
              className="data-[state=active]:bg-white data-[state=active]:text-emerald-700"
            >
              <MapPin className="h-4 w-4 mr-2" /> Địa chỉ
            </TabsTrigger>
            <TabsTrigger
              value="security"
              className="data-[state=active]:bg-white data-[state=active]:text-emerald-700"
            >
              <Lock className="h-4 w-4 mr-2" /> Bảo mật
            </TabsTrigger>
          </TabsList>

          {/* Tab: Thông tin chung */}
          <TabsContent value="general">
            <Card className="border-emerald-100 shadow-sm">
              <CardHeader>
                <CardTitle className="text-emerald-800">
                  Thông tin cơ bản
                </CardTitle>
                <CardDescription>
                  Cập nhật tên và địa chỉ email của bạn
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullname">Họ và tên</Label>
                    <Input
                      id="fullname"
                      defaultValue="Nguyễn Văn A"
                      className="border-emerald-100 focus-visible:ring-emerald-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      defaultValue="vanna@example.com"
                      className="border-emerald-100 focus-visible:ring-emerald-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Số điện thoại</Label>
                    <Input
                      id="phone"
                      defaultValue="0901234567"
                      className="border-emerald-100 focus-visible:ring-emerald-500"
                    />
                  </div>
                </div>
                <Button className="bg-emerald-500 hover:bg-emerald-600 text-white gap-2">
                  <Save className="h-4 w-4" /> Lưu thay đổi
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tab: Địa chỉ */}
          <TabsContent value="address">
            <Card className="border-emerald-100 shadow-sm">
              <CardHeader>
                <CardTitle className="text-emerald-800">
                  Địa chỉ giao hàng
                </CardTitle>
                <CardDescription>
                  Địa chỉ mặc định cho các đơn hàng của bạn
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="address">Địa chỉ chi tiết</Label>
                  <Input
                    id="address"
                    defaultValue="123 Đường Lê Lợi, Quận 1"
                    className="border-emerald-100"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">Thành phố</Label>
                    <Input
                      id="city"
                      defaultValue="TP. Hồ Chí Minh"
                      className="border-emerald-100"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="zipcode">Mã bưu điện</Label>
                    <Input
                      id="zipcode"
                      defaultValue="700000"
                      className="border-emerald-100"
                    />
                  </div>
                </div>
                <Button className="bg-emerald-500 hover:bg-emerald-600 text-white">
                  Cập nhật địa chỉ
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tab: Bảo mật */}
          <TabsContent value="security">
            <Card className="border-emerald-100 shadow-sm">
              <CardHeader>
                <CardTitle className="text-emerald-800">Đổi mật khẩu</CardTitle>
                <CardDescription>
                  Đảm bảo mật khẩu của bạn có ít nhất 8 ký tự
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="current-password">Mật khẩu hiện tại</Label>
                  <Input
                    id="current-password"
                    type="password"
                    className="border-emerald-100"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-password">Mật khẩu mới</Label>
                  <Input
                    id="new-password"
                    type="password"
                    className="border-emerald-100"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">
                    Xác nhận mật khẩu mới
                  </Label>
                  <Input
                    id="confirm-password"
                    type="password"
                    className="border-emerald-100"
                  />
                </div>
                <Button variant="destructive">Đổi mật khẩu</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
