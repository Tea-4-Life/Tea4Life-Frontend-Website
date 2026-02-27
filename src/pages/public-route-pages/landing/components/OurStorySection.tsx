import { Leaf } from "lucide-react";
import { Button } from "@/components/ui/button.tsx";

export function OurStorySection() {
  return (
    <section className="relative pixel-border bg-white shadow-[8px_8px_0px_#1A4331] overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="p-8 md:p-16 flex flex-col justify-center space-y-6">
          <div className="inline-flex items-center gap-2 bg-[#F8F5F0] text-[#1A4331] px-4 py-1.5 border-2 border-[#1A4331] w-fit">
            <Leaf className="w-4 h-4" />
            <span className="font-bold text-sm tracking-widest uppercase">
              NGUỒN GỐC THƯƠNG HIỆU
            </span>
          </div>
          <h3 className="text-4xl md:text-5xl pixel-text text-[#1A4331] leading-tight">
            THIÊN NHIÊN HỘI NGỘ <br />
            <span className="text-[#8A9A7A]">SỰ HOÀI NIỆM.</span>
          </h3>
          <p className="text-lg font-bold font-sans text-[#1A4331] leading-relaxed">
            Chúng tôi hiểu rằng cuộc sống hiện đại đôi khi thật ngột ngạt. Đó là
            lý do Tea4Life ra đời: một không gian nơi sự đơn giản, mộc mạc của
            những khối pixel 16-bit hòa quyện hoàn hảo cùng sự thuần khiết của
            những lá trà hữu cơ tự nhiên.
          </p>
          <p className="text-lg font-bold font-sans text-[#1A4331] leading-relaxed">
            Hãy cho bản thân giây phút nghỉ ngơi, nhâm nhi một ly trà ngon và
            tận hưởng khoảnh khắc bình yên trong thế giới pixel của chúng tôi.
          </p>
          <Button className="bg-[#1A4331] text-[#F8F5F0] hover:bg-[#8A9A7A] pixel-button w-fit text-lg font-bold px-8 mt-4 uppercase">
            [ ĐỌC_THÊM ]
          </Button>
        </div>
        <div className="relative h-[400px] md:h-auto border-t-8 md:border-t-0 md:border-l-8 border-[#1A4331]">
          <div className="absolute inset-0 bg-gradient-to-t from-[#1A4331] to-transparent opacity-20 z-10" />
          <img
            src="https://picsum.photos/seed/teafarm/800/800"
            className="w-full h-full object-cover filter contrast-125 saturate-50"
            alt="Tea Farm"
          />
        </div>
      </div>
    </section>
  );
}
