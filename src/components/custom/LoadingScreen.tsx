import { Loader2, Leaf } from "lucide-react";

interface LoadingScreenProps {
  title?: string;
  subtitle?: string;
}

export default function LoadingScreen({
  title = "Tea4Life",
  subtitle = "Đang pha chế tách trà tinh túy cho bạn...",
}: LoadingScreenProps) {
  return (
    <div className="fixed inset-0 z-9999 flex flex-col items-center justify-center bg-[#f8fafc] overflow-hidden">
      {/* 1. Nhúng trực tiếp Keyframes vào đây để không cần sửa tailwind.config.js */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes custom-progress {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-progress-fast {
          animation: custom-progress 1.5s infinite linear;
        }
      `,
        }}
      />

      {/* Background Decor - Phối màu chuẩn Landing Page */}
      <div className="absolute top-[-10%] left-[-10%] h-[40%] w-[40%] rounded-full bg-emerald-100/40 blur-[100px]" />
      <div className="absolute bottom-[-10%] right-[-10%] h-[40%] w-[40%] rounded-full bg-amber-100/40 blur-[100px]" />

      <div className="relative flex flex-col items-center scale-90 md:scale-100">
        {/* Main Icon Animation */}
        <div className="relative mb-8">
          <div className="absolute inset-0 animate-ping rounded-full bg-emerald-300 opacity-20" />

          <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-white shadow-2xl shadow-emerald-900/10 border border-emerald-50">
            <Leaf className="h-10 w-10 text-emerald-600 animate-bounce" />

            <Loader2
              className="absolute h-16 w-16 animate-spin text-emerald-600/20"
              strokeWidth={1}
            />
          </div>
        </div>

        {/* Text Content */}
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-black uppercase tracking-tighter text-slate-800 md:text-4xl">
            {title}
            <span className="text-emerald-600">.</span>
          </h1>

          <p className="max-w-70 text-sm text-slate-500 animate-pulse font-medium italic leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* Loading Progress Bar */}
        <div className="mt-12 h-1 w-56 overflow-hidden rounded-full bg-slate-200/80">
          <div className="h-full w-full origin-left animate-progress-fast bg-linear-to-r from-emerald-700 via-emerald-500 to-emerald-700" />
        </div>
      </div>
    </div>
  );
}
