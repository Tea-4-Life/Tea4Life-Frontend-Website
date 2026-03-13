import { Leaf } from "lucide-react";
import { Button } from "@/components/ui/button.tsx";

export function OurStorySection() {
  return (
    <section className="relative rounded-3xl bg-white shadow-sm overflow-hidden border border-[#5c4033]/10">
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="p-8 md:p-16 flex flex-col justify-center space-y-6">
          <div className="inline-flex items-center gap-2 bg-[#F8F5F0] text-[#d97743] px-5 py-2 rounded-full w-fit">
            <Leaf className="w-4 h-4" />
            <span className="font-semibold text-sm tracking-wide">
              Nguồn Gốc Thương Hiệu
            </span>
          </div>
          <h3 className="text-4xl md:text-5xl font-bold font-sans text-[#5c4033] leading-tight">
            Thiên nhiên hội ngộ <br />
            <span className="text-[#d97743]">sự hoài niệm.</span>
          </h3>
          <p className="text-lg font-medium font-sans text-[#5c4033] leading-relaxed">
            Chúng tôi hiểu rằng cuộc sống hiện đại đôi khi thật ngột ngạt. Đó là
            lý do Tea4Life ra đời: một không gian nơi sự đơn giản, mộc mạc hòa
            quyện hoàn hảo cùng sự thuần khiết của những lá trà hữu cơ tự nhiên.
          </p>
          <p className="text-lg font-medium font-sans text-[#5c4033] leading-relaxed">
            Hãy cho bản thân giây phút nghỉ ngơi, nhâm nhi một ly trà ngon và
            tận hưởng khoảnh khắc bình yên cùng Tea4Life.
          </p>
          <Button className="bg-[#5c4033] text-[#F8F5F0] hover:bg-[#d97743] hover:text-white rounded-full w-fit text-lg font-semibold px-8 mt-4 transition-colors">
            Đọc Thêm
          </Button>
        </div>
        <div className="relative h-[400px] md:h-auto">
          <div className="absolute inset-0 bg-gradient-to-t from-[#5c4033] to-transparent opacity-10 z-10" />
          <img
            src="https://picsum.photos/seed/teafarm/800/800"
            className="w-full h-full object-cover rounded-none md:rounded-l-[4rem] group-hover:scale-105 transition-transform duration-700"
            alt="Tea Farm"
          />
        </div>
      </div>
    </section>
  );
}
