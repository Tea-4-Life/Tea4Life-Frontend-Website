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

export default function SecurityPage() {
  return (
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
          <Label htmlFor="confirm-password">Xác nhận mật khẩu mới</Label>
          <Input
            id="confirm-password"
            type="password"
            className="border-emerald-100"
          />
        </div>
        <Button variant="destructive">Đổi mật khẩu</Button>
      </CardContent>
    </Card>
  );
}
