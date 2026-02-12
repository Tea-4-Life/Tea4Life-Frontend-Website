import React, { useState, useRef, type FormEvent } from "react";
import {
  Camera,
  LogOut,
  Loader2,
  User,
  Phone,
  UserCircle,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { handleUpload } from "@/services/storageApi";
import { useAppDispatch } from "@/features/store";
import keycloak from "@/lib/keycloak";
import type { OnboardingRequest } from "@/types/user/OnboardingRequest";
import { executeOnboarding } from "@/features/auth/authThunk";
import { useAuth } from "@/features/auth/useAuth";
import ImageCropperComponent from "@/components/custom/ImageCropperComponent";

export default function OnboardingPage() {
  const dispatch = useAppDispatch();
  const { isLoading } = useAuth();

  // --- State quản lý Form ---
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState<"MALE" | "FEMALE" | "OTHER" | "">("");

  // --- State quản lý File & UI cục bộ ---
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false); // Vẫn dùng cho bước upload S3
  const [errors, setErrors] = useState<Record<string, string>>({});

  // --- State cho Image Cropper ---
  const [cropperOpen, setCropperOpen] = useState(false);
  const [cropperSrc, setCropperSrc] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const AVATAR_MAX_SIZE = 150;

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setErrors((prev) => ({
        ...prev,
        avatar: "Vui lòng chọn hình ảnh hợp lệ",
      }));
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setErrors((prev) => ({ ...prev, avatar: "Ảnh không được vượt quá 5MB" }));
      return;
    }

    setErrors((prev) => {
      const next = { ...prev };
      delete next.avatar;
      return next;
    });

    // Kiểm tra kích thước ảnh để quyết định có cần crop không
    const img = new Image();
    const objectUrl = URL.createObjectURL(file);
    img.onload = () => {
      if (
        img.width > AVATAR_MAX_SIZE ||
        img.height > AVATAR_MAX_SIZE ||
        img.width !== img.height
      ) {
        // Ảnh to hoặc không vuông → mở cropper
        setCropperSrc(objectUrl);
        setCropperOpen(true);
      } else {
        // Ảnh nhỏ và vuông → dùng trực tiếp
        setAvatarFile(file);
        setAvatarPreview(objectUrl);
      }
    };
    img.src = objectUrl;

    // Reset input để có thể chọn lại cùng 1 file
    e.target.value = "";
  };

  const handleCropComplete = (croppedFile: File) => {
    setAvatarFile(croppedFile);
    setAvatarPreview(URL.createObjectURL(croppedFile));
    setCropperOpen(false);
    setCropperSrc(null);
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!fullName.trim()) newErrors.fullName = "Vui lòng nhập họ tên";
    if (!phone.trim()) {
      newErrors.phone = "Vui lòng nhập số điện thoại";
    } else if (!/^(0[3|5|7|8|9])+([0-9]{8})$/.test(phone.trim())) {
      newErrors.phone = "Số điện thoại không hợp lệ";
    }
    if (!dob) newErrors.dob = "Vui lòng chọn ngày sinh";
    if (!gender) newErrors.gender = "Vui lòng chọn giới tính";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      let avatarKey = "";

      // 1. Upload ảnh lên thư mục temp của S3
      if (avatarFile) {
        setIsUploading(true);
        const key = await handleUpload(avatarFile);
        setIsUploading(false);

        if (!key) throw new Error("Upload failed");
        avatarKey = key;
      }

      const request: OnboardingRequest = {
        fullName: fullName.trim(),
        phone: phone.trim(),
        dob,
        gender: gender as "MALE" | "FEMALE" | "OTHER",
        avatarKey,
      };

      /**
       * 2. Gọi Async Thunk
       * Luồng: Post Onboarding -> Check Status (Retry 10 lần)
       * .unwrap() giúp bắt lỗi nếu Thunk bị Rejected
       */
      await dispatch(executeOnboarding(request)).unwrap();
    } catch (err) {
      console.error("[Tea4Life] Lỗi Onboarding:", err);
      setErrors((prev) => ({
        ...prev,
        submit:
          "Đã có lỗi xảy ra trong quá trình xử lý hồ sơ, vui lòng thử lại sau.",
      }));
    }
  };

  const handleLogout = () => {
    keycloak.logout({ redirectUri: window.location.origin });
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-white font-sans text-slate-900">
      {/* CỘT TRÁI */}
      <div className="relative w-full md:w-[45%] lg:w-[40%] bg-emerald-700 p-8 md:p-16 flex flex-col justify-between text-white overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] h-[40%] w-[60%] rounded-full bg-emerald-600/30 blur-[80px]" />
        <div className="absolute bottom-[-5%] right-[-5%] h-[30%] w-[50%] rounded-full bg-emerald-800/50 blur-[80px]" />

        <div className="relative z-10">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight mb-6">
            Gia nhập cộng đồng <br />
            <span className="text-emerald-300">Trà Việt</span> <br />
            lớn nhất miền Nam.
          </h1>
          <p className="text-emerald-100/80 text-lg max-w-sm leading-relaxed">
            Hơn 10,000 người yêu trà đang chờ đón bạn. Khám phá những hương vị
            độc bản và kết nối cùng tri kỷ.
          </p>
        </div>
      </div>

      {/* CỘT PHẢI */}
      <div className="w-full md:w-[55%] lg:w-[60%] flex items-center justify-center p-6 md:p-12 lg:p-20 bg-slate-50/30">
        <div className="w-full max-w-lg bg-white rounded-[2.5rem] p-8 md:p-10 shadow-sm border border-slate-100">
          <div className="mb-10 text-center md:text-left">
            <h2 className="text-2xl font-bold mb-2 text-slate-900">
              Hoàn tất hồ sơ
            </h2>
            <p className="text-slate-500 text-sm">
              Chúng tôi cần thêm một vài thông tin để bắt đầu trải nghiệm cùng
              bạn.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Avatar Section */}
            <div className="flex items-center gap-6 p-4 rounded-3xl bg-slate-50/50 border border-slate-100 transition-all hover:border-emerald-100">
              <div className="relative">
                <Avatar className="h-20 w-20 border-2 border-white shadow-md">
                  <AvatarImage
                    src={avatarPreview || ""}
                    className="object-cover"
                  />
                  <AvatarFallback className="bg-emerald-100 text-emerald-600">
                    <UserCircle className="h-10 w-10" />
                  </AvatarFallback>
                </Avatar>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute -bottom-1 -right-1 h-7 w-7 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-md hover:bg-emerald-700 border-2 border-white transition-all active:scale-90"
                >
                  <Camera className="h-4 w-4" />
                </button>
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold text-slate-800">Ảnh đại diện</p>
                <p className="text-xs text-slate-500 mt-1">
                  Dùng ảnh chân dung rõ mặt giúp cộng đồng kết nối tốt hơn.
                </p>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  className="hidden"
                />
                {errors.avatar && (
                  <p className="text-xs font-semibold text-red-500 mt-1">
                    {errors.avatar}
                  </p>
                )}
              </div>
            </div>

            {/* Inputs Section */}
            <div className="space-y-5">
              <div className="space-y-2">
                <Label
                  htmlFor="fullName"
                  className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1"
                >
                  Họ và tên <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input
                    id="fullName"
                    placeholder="Nguyễn Văn Trà"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="h-12 pl-10 rounded-2xl bg-white border-slate-200 focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>
                {errors.fullName && (
                  <p className="text-xs font-medium text-red-500 ml-1">
                    {errors.fullName}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="phone"
                  className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1"
                >
                  Số điện thoại <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input
                    id="phone"
                    placeholder="0912345678"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="h-12 pl-10 rounded-2xl bg-white border-slate-200 focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>
                {errors.phone && (
                  <p className="text-xs font-medium text-red-500 ml-1">
                    {errors.phone}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label
                    htmlFor="dob"
                    className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1"
                  >
                    Ngày sinh <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="dob"
                    type="date"
                    max="2010-12-31"
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                    className="h-12 rounded-2xl bg-white border-slate-200 focus:ring-emerald-500"
                  />
                  {errors.dob && (
                    <p className="text-xs font-medium text-red-500 ml-1">
                      {errors.dob}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">
                    Giới tính <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    value={gender}
                    onValueChange={(val: "MALE" | "FEMALE" | "OTHER") =>
                      setGender(val)
                    }
                  >
                    <SelectTrigger className="h-12 rounded-2xl bg-white border-slate-200 focus:ring-emerald-500">
                      <SelectValue placeholder="Chọn..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="MALE">Nam</SelectItem>
                      <SelectItem value="FEMALE">Nữ</SelectItem>
                      <SelectItem value="OTHER">Khác</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.gender && (
                    <p className="text-xs font-medium text-red-500 ml-1">
                      {errors.gender}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Error Message */}
            {errors.submit && (
              <div className="p-3 rounded-2xl bg-red-50 text-red-600 text-xs font-bold text-center animate-pulse">
                {errors.submit}
              </div>
            )}

            {/* Actions */}
            <div className="pt-4 space-y-3">
              <Button
                type="submit"
                disabled={isLoading || isUploading}
                className="w-full h-11 bg-emerald-700 hover:bg-emerald-800 text-white rounded-2xl text-sm font-semibold shadow-md shadow-emerald-200/50 transition-all flex items-center justify-center gap-2 group active:scale-[0.98]"
              >
                {isLoading || isUploading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    {isUploading ? "Đang tải ảnh..." : "Đang xử lý hồ sơ..."}
                  </>
                ) : (
                  <>
                    Hoàn tất
                    <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </Button>

              <button
                type="button"
                onClick={handleLogout}
                className="w-full py-2 text-slate-400 hover:text-red-500 text-xs font-bold uppercase tracking-widest transition-colors flex items-center justify-center gap-2 group"
              >
                <LogOut className="h-3 w-3 transition-transform group-hover:-translate-x-1" />
                Đăng xuất
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Image Cropper Modal */}
      {cropperSrc && (
        <ImageCropperComponent
          imageSrc={cropperSrc}
          open={cropperOpen}
          onClose={() => {
            setCropperOpen(false);
            setCropperSrc(null);
          }}
          onCropComplete={handleCropComplete}
          outputSize={AVATAR_MAX_SIZE}
        />
      )}
    </div>
  );
}
