import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button.tsx";

export function NewsletterSection() {
  return (
    <section className="rounded-3xl bg-[#5c4033] text-[#F8F5F0] p-8 md:p-16 relative overflow-hidden group my-12 mx-4 md:mx-0 shadow-lg">
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "linear-gradient(#F8F5F0 2px, transparent 2px), linear-gradient(90deg, #F8F5F0 2px, transparent 2px)",
          backgroundSize: "40px 40px",
        }}
      />
      <div className="relative z-10 flex flex-col md:flex-row items-center gap-12">
        <div className="flex-1 space-y-6 text-center md:text-left">
          <div className="inline-block bg-[#d97743] text-white px-5 py-2 font-semibold rounded-full flex items-center gap-2 w-fit mx-auto md:mx-0 shadow-sm">
            <Mail className="w-4 h-4" /> THAM GIA CỘNG ĐỒNG
          </div>
          <h3 className="text-4xl md:text-6xl font-bold font-sans tracking-tight">
            Nhận tin mới nhất
          </h3>
          <p className="text-lg md:text-xl font-medium font-sans max-w-lg bg-black/10 p-5 rounded-2xl border-l-4 border-[#d97743]">
            Đăng ký nhận bản tin để không bỏ lỡ các mã giảm giá hấp dẫn, thức
            uống theo mùa mới ra mắt, và các mẹo sống xanh hữu ích.
          </p>
        </div>
        <div className="w-full md:w-auto flex-1 max-w-md">
          <div className="bg-[#F8F5F0] rounded-3xl p-6 shadow-xl transform md:rotate-2 group-hover:rotate-0 transition-transform duration-500">
            <form className="flex flex-col gap-4">
              <div className="space-y-2">
                <label className="font-semibold text-[#5c4033] text-sm">
                  Địa chỉ Email của bạn
                </label>
                <input
                  type="email"
                  placeholder="yeuthiennhien@tea.com"
                  className="w-full h-14 bg-white rounded-xl border border-[#5c4033]/20 px-4 font-medium text-[#5c4033] focus:outline-none focus:ring-2 focus:ring-[#d97743] placeholder-gray-400 transition-all"
                />
              </div>
              <Button className="w-full bg-[#5c4033] text-[#F8F5F0] hover:bg-[#d97743] hover:text-white rounded-xl h-14 text-lg font-bold shadow-sm hover:shadow-md transition-all">
                Đăng Ký Ngay
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
