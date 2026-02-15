import { useState } from "react";
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
import { updateUserPasswordApi } from "@/services/userApi";
import { toast } from "sonner";
import { Loader2, KeyRound, Eye, EyeOff } from "lucide-react";

export default function SecurityPage() {
  const [loading, setLoading] = useState(false);
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<{
    oldPassword?: string;
    newPassword?: string;
    confirmPassword?: string;
  }>({});

  const validate = () => {
    const newErrors: typeof errors = {};
    const passwordRegex = /^(?=.*[0-9])(?=.*[A-Z])(?=.*[@#$%^&+=!]).*$/;

    if (!formData.oldPassword.trim()) {
      newErrors.oldPassword = "Mật khẩu cũ không được để trống";
    }

    if (!formData.newPassword.trim()) {
      newErrors.newPassword = "Mật khẩu mới không được để trống";
    } else if (formData.newPassword.length < 8) {
      newErrors.newPassword = "Mật khẩu phải có ít nhất 8 ký tự";
    } else if (!passwordRegex.test(formData.newPassword)) {
      newErrors.newPassword = "Mật khẩu phải bao gồm ít nhất 1 chữ hoa, 1 chữ số và 1 ký tự đặc biệt";
    }

    if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = "Mật khẩu xác nhận không khớp";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleUpdatePassword = async () => {
    if (!validate()) return;

    setLoading(true);
    try {
      const response = await updateUserPasswordApi({
        oldPassword: formData.oldPassword,
        newPassword: formData.newPassword,
      });

      if (response.status === 200 || response.status === 201) {
        toast.success("Cập nhật mật khẩu thành công!");
        setFormData({
          oldPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
        setErrors({});
      } else {
        toast.error(response.data.errorMessage || "Đã có lỗi xảy ra");
      }
    } catch (error: any) {
      toast.error(error.response?.data?.errorMessage || "Cập nhật mật khẩu thất bại");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="border-emerald-100 shadow-sm">
      <CardHeader>
        <div className="flex items-center gap-2">
          <KeyRound className="h-5 w-5 text-emerald-600" />
          <CardTitle className="text-emerald-800">Đổi mật khẩu</CardTitle>
        </div>
        <CardDescription>
          Đảm bảo mật khẩu của bạn có ít nhất 8 ký tự, bao gồm chữ hoa, chữ số và ký tự đặc biệt.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="oldPassword">
            Mật khẩu hiện tại <span className="text-red-500">*</span>
          </Label>
          <div className="relative">
            <Input
              id="oldPassword"
              type={showOldPassword ? "text" : "password"}
              className={`border-emerald-100 focus-visible:ring-emerald-500 pr-10 ${errors.oldPassword ? "border-red-500" : ""}`}
              value={formData.oldPassword}
              onChange={(e) => setFormData({ ...formData, oldPassword: e.target.value })}
            />
            <button
              type="button"
              onClick={() => setShowOldPassword(!showOldPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-emerald-600 hover:text-emerald-700 focus:outline-none"
            >
              {showOldPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {errors.oldPassword && <p className="text-xs text-red-500">{errors.oldPassword}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="newPassword">
            Mật khẩu mới <span className="text-red-500">*</span>
          </Label>
          <div className="relative">
            <Input
              id="newPassword"
              type={showNewPassword ? "text" : "password"}
              className={`border-emerald-100 focus-visible:ring-emerald-500 pr-10 ${errors.newPassword ? "border-red-500" : ""}`}
              value={formData.newPassword}
              onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
            />
            <button
              type="button"
              onClick={() => setShowNewPassword(!showNewPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-emerald-600 hover:text-emerald-700 focus:outline-none"
            >
              {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {errors.newPassword && <p className="text-xs text-red-500">{errors.newPassword}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirmPassword">
            Xác nhận mật khẩu mới <span className="text-red-500">*</span>
          </Label>
          <div className="relative">
            <Input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              className={`border-emerald-100 focus-visible:ring-emerald-500 pr-10 ${errors.confirmPassword ? "border-red-500" : ""}`}
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-emerald-600 hover:text-emerald-700 focus:outline-none"
            >
              {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {errors.confirmPassword && <p className="text-xs text-red-500">{errors.confirmPassword}</p>}
        </div>

        <Button
          onClick={handleUpdatePassword}
          disabled={loading}
          className="bg-emerald-600 hover:bg-emerald-700 text-white w-full md:w-auto"
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Đang xử lý
            </>
          ) : (
            "Đổi mật khẩu"
          )}
        </Button>
      </CardContent>
    </Card>
  );
}
