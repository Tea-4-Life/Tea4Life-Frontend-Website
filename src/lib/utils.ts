import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const MEDIA_BASE_URL = "https://media.tea4life.click/";

/**
 * Nối base URL của CDN media vào đường dẫn tương đối (VD: avatarUrl).
 * Nếu chuỗi đã bắt đầu bằng URL đầy đủ thì trả về nguyên gốc.
 */
export function getMediaUrl(path: string | null | undefined): string {
  if (!path) return "";
  if (path.startsWith(MEDIA_BASE_URL) || path.startsWith("http")) return path;
  return `${MEDIA_BASE_URL}${path}`;
}

/**
 * Lấy 1-2 ký tự viết tắt từ tên đầy đủ để làm avatar tạm.
 * VD: "Nguyễn Văn Trà" → "NT", "Trà" → "T"
 */
export function getNameInitials(fullName: string | null | undefined): string {
  if (!fullName?.trim()) return "?";
  const parts = fullName.trim().split(/\s+/);
  if (parts.length === 1) return parts[0][0].toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}
