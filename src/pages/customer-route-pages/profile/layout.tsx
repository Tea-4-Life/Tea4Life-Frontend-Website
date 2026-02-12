import React, { useState, useRef, useEffect, useCallback } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { User, MapPin, Lock, Camera, Loader2 } from "lucide-react";
import { cn, getMediaUrl, getNameInitials } from "@/lib/utils";
import { getUserProfileApi } from "@/services/userApi";
import type { UserProfileResponse } from "@/types/user/UserProfileResponse";
import ImageCropperComponent from "@/components/custom/ImageCropperComponent";
import { useAuth } from "@/features/auth/useAuth";
import { useAppDispatch } from "@/features/store";
import { executeUpdateAvatar } from "@/features/auth/authThunk";

const menuItems = [
  { name: "Thông tin chung", href: "/profile/general", icon: User },
  { name: "Địa chỉ", href: "/profile/address", icon: MapPin },
  { name: "Bảo mật", href: "/profile/security", icon: Lock },
];

export default function ProfileLayout() {
  const { pathname } = useLocation();
  const { fullName: authFullName } = useAuth();
  const dispatch = useAppDispatch();

  const [profile, setProfile] = useState<UserProfileResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  // Avatar cropper
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [cropperOpen, setCropperOpen] = useState(false);
  const [cropperSrc, setCropperSrc] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const AVATAR_MAX_SIZE = 150;

  const fetchProfile = useCallback(async () => {
    try {
      setLoading(true);
      const res = await getUserProfileApi();
      const data = res.data.data;
      setProfile(data);
      if (data.avatarUrl) {
        setAvatarPreview(getMediaUrl(data.avatarUrl));
      }
    } catch (err) {
      console.error("[Tea4Life] Lấy profile thất bại:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  const uploadAvatar = async (file: File) => {
    setUploading(true);
    setAvatarPreview(URL.createObjectURL(file));
    try {
      await dispatch(executeUpdateAvatar(file)).unwrap();
      await fetchProfile();
    } catch (err) {
      console.error("[Tea4Life] Cập nhật avatar thất bại:", err);
    } finally {
      setUploading(false);
    }
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !file.type.startsWith("image/")) return;

    const objectUrl = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      if (
        img.width > AVATAR_MAX_SIZE ||
        img.height > AVATAR_MAX_SIZE ||
        img.width !== img.height
      ) {
        setCropperSrc(objectUrl);
        setCropperOpen(true);
      } else {
        uploadAvatar(file);
      }
    };
    img.src = objectUrl;
    e.target.value = "";
  };

  const handleCropComplete = (croppedFile: File) => {
    setCropperOpen(false);
    setCropperSrc(null);
    uploadAvatar(croppedFile);
  };

  const avatarDisplay = avatarPreview || null;

  return (
    <div className="min-h-screen bg-linear-to-b from-emerald-50/50 to-white py-12">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Profile Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-8">
          <div className="relative group">
            <div className="h-24 w-24 rounded-full bg-emerald-100 flex items-center justify-center border-2 border-emerald-200 overflow-hidden relative">
              {loading ? (
                <div className="h-full w-full animate-pulse bg-emerald-100" />
              ) : avatarDisplay ? (
                <img
                  src={avatarDisplay}
                  alt="Avatar"
                  className="h-full w-full object-cover"
                />
              ) : (
                <span className="text-2xl font-bold text-emerald-600">
                  {getNameInitials(profile?.fullName)}
                </span>
              )}
              {uploading && (
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center rounded-full">
                  <Loader2 className="h-6 w-6 text-white animate-spin" />
                </div>
              )}
            </div>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="absolute bottom-0 right-0 p-1.5 bg-emerald-500 rounded-full text-white border-2 border-white hover:bg-emerald-600 transition-colors"
            >
              <Camera className="h-4 w-4" />
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              className="hidden"
            />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-emerald-900">
              {loading ? (
                <span className="inline-block h-8 w-48 animate-pulse bg-emerald-100 rounded" />
              ) : (
                authFullName || profile?.fullName || "Hồ sơ cá nhân"
              )}
            </h1>
            <p className="text-emerald-600">
              Quản lý thông tin tài khoản và bảo mật của bạn
            </p>
          </div>
        </div>

        {/* Navigation Menu */}
        <div className="flex gap-2 bg-emerald-50 p-1 rounded-lg mb-6 w-full">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "flex-1 flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium rounded-md transition-all",
                  isActive
                    ? "bg-white text-emerald-700 shadow-sm"
                    : "text-emerald-600 hover:text-emerald-800 hover:bg-emerald-100/50",
                )}
              >
                <Icon className="h-4 w-4" />
                <span className="truncate">{item.name}</span>
              </Link>
            );
          })}
        </div>

        {/* Page Content — truyền profile data qua Outlet context */}
        <div className="mt-4">
          <Outlet context={{ profile, loading, refetchProfile: fetchProfile }} />
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
