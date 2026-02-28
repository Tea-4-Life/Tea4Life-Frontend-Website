import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button.tsx";

export function NewsletterSection() {
  return (
    <section className="pixel-border bg-[#1A4331] text-[#F8F5F0] p-8 md:p-16 relative overflow-hidden group">
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
          <div className="inline-block bg-[#D2A676] text-[#1A4331] px-4 py-1 font-bold flex items-center gap-2 border-2 border-[#1A4331] w-fit mx-auto md:mx-0 shadow-[4px_4px_0px_rgba(0,0,0,0.5)]">
            <Mail className="w-4 h-4" /> THAM GIA CỘNG ĐỒNG
          </div>
          <h3 className="text-4xl md:text-6xl pixel-text uppercase">
            NHẬN TIN MỚI NHẤT
          </h3>
          <p className="text-lg md:text-xl font-bold font-sans max-w-lg bg-black/20 p-4 border-l-4 border-[#8A9A7A]">
            Đăng ký nhận bản tin để không bỏ lỡ các mã giảm giá hấp dẫn, thức
            uống theo mùa mới ra mắt, và các mẹo sống xanh hữu ích.
          </p>
        </div>
        <div className="w-full md:w-auto flex-1 max-w-md">
          <div className="pixel-border bg-white p-6 shadow-[8px_8px_0px_#8A9A7A] transform md:rotate-2 group-hover:rotate-0 transition-transform duration-300">
            <form className="flex flex-col gap-4">
              <div className="space-y-2">
                <label className="font-bold text-[#1A4331] text-sm uppercase">
                  Địa chỉ Email của bạn
                </label>
                <input
                  type="email"
                  placeholder="yeuthiennhien@tea.com"
                  className="w-full h-14 bg-[#F8F5F0] border-4 border-[#1A4331] px-4 font-bold text-[#1A4331] focus:outline-none focus:bg-white placeholder-[#8A9A7A]"
                />
              </div>
              <Button className="w-full bg-[#1A4331] text-[#F8F5F0] hover:bg-[#8A9A7A] hover:text-[#1A4331] pixel-button h-14 text-lg font-bold">
                ĐĂNG KÝ NGAY
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
