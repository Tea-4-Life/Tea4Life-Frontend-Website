import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Save, Calendar as CalendarIcon, Loader2 } from "lucide-react";
import type { UserProfileResponse } from "@/types/user/UserProfileResponse";
import { useAppDispatch } from "@/features/store";
import { executeUpdateProfile } from "@/features/auth/authThunk";

interface ProfileContext {
  profile: UserProfileResponse | null;
  loading: boolean;
  refetchProfile: () => Promise<void>;
}

export default function GeneralPage() {
  const { profile, loading, refetchProfile } = useOutletContext<ProfileContext>();
  const dispatch = useAppDispatch();

  const [saving, setSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState<"MALE" | "FEMALE" | "OTHER" | "">("");

  // Khi profile load xong → fill state
  useEffect(() => {
    if (!profile) return;
    setFullName(profile.fullName || "");
    setPhone(profile.phone || "");
    setDob(profile.dob || "");
    setGender(profile.gender || "");
  }, [profile]);

  if (loading) {
    return (
      <Card className="border-emerald-100 shadow-sm">
        <CardContent className="py-12 flex justify-center">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-emerald-500 border-t-transparent" />
        </CardContent>
      </Card>
    );
  }

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
          {/* Full Name */}
          <div className="space-y-2">
            <Label htmlFor="fullname">
              Họ và tên <span className="text-red-500">*</span>
            </Label>
            <Input
              id="fullname"
              placeholder="Nhập họ và tên"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="border-emerald-100 focus-visible:ring-emerald-500"
            />
          </div>

          {/* Phone */}
          <div className="space-y-2">
            <Label htmlFor="phone">
              Số điện thoại <span className="text-red-500">*</span>
            </Label>
            <Input
              id="phone"
              placeholder="Nhập số điện thoại"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="border-emerald-100 focus-visible:ring-emerald-500"
            />
          </div>

          {/* Date of Birth */}
          <div className="space-y-2">
            <Label htmlFor="dob">
              Ngày sinh <span className="text-red-500">*</span>
            </Label>
            <div className="relative">
              <Input
                id="dob"
                type="date"
                max="2010-12-31"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                className="border-emerald-100 focus-visible:ring-emerald-500 pl-10"
              />
              <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-emerald-500" />
            </div>
          </div>

          {/* Gender */}
          <div className="space-y-2">
            <Label htmlFor="gender">
              Giới tính <span className="text-red-500">*</span>
            </Label>
            <Select
              value={gender}
              onValueChange={(val: "MALE" | "FEMALE" | "OTHER") =>
                setGender(val)
              }
            >
              <SelectTrigger className="border-emerald-100 focus:ring-emerald-500">
                <SelectValue placeholder="Chọn giới tính" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="MALE">Nam</SelectItem>
                <SelectItem value="FEMALE">Nữ</SelectItem>
                <SelectItem value="OTHER">Khác</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Thông tin hệ thống */}
        {profile?.id && (
          <div className="p-4 bg-emerald-50/50 rounded-lg border border-emerald-100 space-y-2">
            <p className="text-xs text-emerald-600 font-medium uppercase tracking-wider">
              Thông tin hệ thống
            </p>
            <div className="grid grid-cols-2 text-sm">
              <span className="text-emerald-700">Profile ID:</span>
              <span className="font-mono text-emerald-900 text-right">
                #{profile.id}
              </span>
            </div>
          </div>
        )}

        {saveMessage && (
          <div
            className={`p-3 rounded-lg text-sm font-medium ${
              saveMessage.type === "success"
                ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                : "bg-red-50 text-red-700 border border-red-200"
            }`}
          >
            {saveMessage.text}
          </div>
        )}

        <Button
          disabled={saving}
          onClick={async () => {
            if (!fullName.trim() || !phone.trim() || !dob || !gender) {
              setSaveMessage({ type: "error", text: "Vui lòng điền đầy đủ thông tin bắt buộc." });
              return;
            }
            setSaving(true);
            setSaveMessage(null);
            try {
              await dispatch(
                executeUpdateProfile({ fullName: fullName.trim(), phone: phone.trim(), dob, gender: gender as "MALE" | "FEMALE" | "OTHER" })
              ).unwrap();
              await refetchProfile();
              setSaveMessage({ type: "success", text: "Cập nhật hồ sơ thành công!" });
            } catch {
              setSaveMessage({ type: "error", text: "Cập nhật thất bại. Vui lòng thử lại." });
            } finally {
              setSaving(false);
            }
          }}
          className="w-full md:w-auto bg-emerald-500 hover:bg-emerald-600 text-white gap-2"
        >
          {saving ? (
            <><Loader2 className="h-4 w-4 animate-spin" /> Đang lưu...</>
          ) : (
            <><Save className="h-4 w-4" /> Lưu hồ sơ</>
          )}
        </Button>
      </CardContent>
    </Card>
  );
}
