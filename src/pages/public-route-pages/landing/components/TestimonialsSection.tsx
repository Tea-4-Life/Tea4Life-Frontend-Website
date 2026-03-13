import { MessageSquare, Star } from "lucide-react";

export function TestimonialsSection() {
  return (
    <section className="space-y-12">
      <div className="text-center space-y-4 border-b-2 border-[#5c4033]/20 pb-6">
        <h3 className="text-4xl md:text-5xl font-bold font-sans text-[#5c4033]">
          Nhận Xét Của Khách Hàng
        </h3>
        <p className="text-[#d97743] font-semibold text-lg">
          Cộng đồng nói gì về chúng tôi.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[1, 2, 3].map((_, i) => (
          <div
            key={i}
            className="rounded-3xl bg-white p-8 relative group hover:-translate-y-2 shadow-sm hover:shadow-lg transition-transform border border-[#5c4033]/5"
          >
            <MessageSquare className="absolute top-4 right-4 text-[#d97743] opacity-10 w-16 h-16 group-hover:scale-110 transition-transform" />
            <div className="flex gap-1 text-[#e1b382] mb-4">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} className="w-5 h-5 fill-current" />
              ))}
            </div>
            <p className="font-medium font-sans text-[#5c4033] text-lg mb-8 italic leading-relaxed">
              "Chân ái thực sự! Ly matcha ngon nhất mà mình từng uống. Không
              gian và phong cách phục vụ khiến trải nghiệm trọn vẹn gấp 10 lần!"
            </p>
            <div className="flex items-center gap-4 border-t border-[#5c4033]/10 pt-5">
              <div className="w-12 h-12 flex-shrink-0 bg-[#F8F5F0] rounded-full p-1 overflow-hidden shadow-sm">
                <img
                  src={`https://api.dicebear.com/7.x/notionists/svg?seed=user${i}&backgroundColor=transparent`}
                  alt="Avatar"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <div>
                <p className="font-bold text-[#5c4033] capitalize line-clamp-1 text-lg">
                  Khách Hàng {i + 1}
                </p>
                <p className="text-sm text-[#d97743] font-medium">
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
