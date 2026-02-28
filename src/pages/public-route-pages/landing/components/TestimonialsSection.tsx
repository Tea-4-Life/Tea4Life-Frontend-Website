import { MessageSquare, Star } from "lucide-react";

export function TestimonialsSection() {
  return (
    <section className="space-y-12">
      <div className="text-center space-y-4 border-b-4 border-[#1A4331] pb-6">
        <h3 className="text-4xl md:text-5xl pixel-text text-[#1A4331] drop-shadow-[2px_2px_0px_#8A9A7A]">
          Nhận Xét Của Khách Hàng
        </h3>
        <p className="text-[#8A9A7A] font-bold text-lg">
          Cộng đồng nói gì về chúng tôi.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[1, 2, 3].map((_, i) => (
          <div
            key={i}
            className="pixel-border bg-white p-8 relative group hover:-translate-y-2 hover:shadow-[4px_4px_0px_#1A4331] transition-transform"
          >
            <MessageSquare className="absolute top-4 right-4 text-[#8A9A7A] opacity-20 w-12 h-12" />
            <div className="flex gap-1 text-[#D2A676] mb-4">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} className="w-5 h-5 fill-current" />
              ))}
            </div>
            <p className="font-bold font-sans text-[#1A4331] text-lg mb-8 italic">
              "Chân ái thực sự! Ly matcha ngon nhất mà mình từng uống. Không
              gian và phong cách phục vụ khiến trải nghiệm trọn vẹn gấp 10 lần!"
            </p>
            <div className="flex items-center gap-4 border-t-4 border-[#1A4331] pt-4 border-dashed">
              <div className="w-12 h-12 flex-shrink-0 bg-[#8A9A7A] pixel-border border-2 border-[#1A4331] overflow-hidden">
                <img
                  src={`https://api.dicebear.com/7.x/pixel-art/svg?seed=user${i}`}
                  alt="Avatar"
                />
              </div>
              <div>
                <p className="font-bold text-[#1A4331] uppercase line-clamp-1">
                  Khách Hàng {i + 1}
                </p>
                <p className="text-sm text-[#8A9A7A] font-bold">
                  Thành Viên Tea4Life
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
