import { Button } from "@/components/ui/button.tsx";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Label } from "@/components/ui/label.tsx";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select.tsx";
import { Save, Calendar as CalendarIcon } from "lucide-react";

export default function GeneralPage() {
  return (
    <Card className="border-emerald-100 shadow-sm">
      <CardHeader>
        <CardTitle className="text-emerald-800">Thông tin cơ bản</CardTitle>
        <CardDescription>
          Cập nhật thông tin cá nhân của bạn để đồng bộ với hồ sơ hệ thống.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Full Name - Tương ứng trường fullName trong DB */}
          <div className="space-y-2">
            <Label htmlFor="fullname">Họ và tên</Label>
            <Input
              id="fullname"
              placeholder="Nhập họ và tên"
              defaultValue="Nguyễn Văn A"
              className="border-emerald-100 focus-visible:ring-emerald-500"
            />
          </div>

          {/* Phone - Tương ứng trường phone trong DB */}
          <div className="space-y-2">
            <Label htmlFor="phone">Số điện thoại</Label>
            <Input
              id="phone"
              placeholder="Nhập số điện thoại"
              defaultValue="0901234567"
              className="border-emerald-100 focus-visible:ring-emerald-500"
            />
          </div>

          {/* Date of Birth - Tương ứng trường dob trong DB */}
          <div className="space-y-2">
            <Label htmlFor="dob">Ngày sinh</Label>
            <div className="relative">
              <Input
                id="dob"
                type="date"
                className="border-emerald-100 focus-visible:ring-emerald-500 pl-10"
              />
              <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-emerald-500" />
            </div>
          </div>

          {/* Gender - Tương ứng trường gender trong DB */}
          <div className="space-y-2">
            <Label htmlFor="gender">Giới tính</Label>
            <Select defaultValue="male">
              <SelectTrigger className="border-emerald-100 focus:ring-emerald-500">
                <SelectValue placeholder="Chọn giới tính" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Nam</SelectItem>
                <SelectItem value="female">Nữ</SelectItem>
                <SelectItem value="other">Khác</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Thông tin bổ sung (Read-only hoặc hiển thị thêm) */}
        <div className="p-4 bg-emerald-50/50 rounded-lg border border-emerald-100 space-y-2">
          <p className="text-xs text-emerald-600 font-medium uppercase tracking-wider">
            Thông tin hệ thống
          </p>
          <div className="grid grid-cols-2 text-sm">
            <span className="text-emerald-700">Profile ID:</span>
            <span className="font-mono text-emerald-900 text-right">
              #102938
            </span>
          </div>
        </div>

        <Button className="w-full md:w-auto bg-emerald-500 hover:bg-emerald-600 text-white gap-2">
          <Save className="h-4 w-4" /> Lưu hồ sơ
        </Button>
      </CardContent>
    </Card>
  );
}
