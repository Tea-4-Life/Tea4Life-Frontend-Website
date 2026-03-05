interface LoadingScreenProps {
  title?: string;
  subtitle?: string;
}

export default function LoadingScreen({
  title = "TEA4LIFE",
  subtitle = "Đang pha chế tách trà tinh túy cho bạn...",
}: LoadingScreenProps) {
  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#F8F5F0] overflow-hidden">
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @keyframes pixel-fill {
              0% { width: 0%; }
              100% { width: 100%; }
            }
            @keyframes steam-1 {
              0%, 100% { opacity: 0; transform: translateY(0) scale(1); }
              30% { opacity: 0.6; }
              70% { opacity: 0.3; transform: translateY(-18px) scale(1.3); }
              100% { opacity: 0; transform: translateY(-30px) scale(0.8); }
            }
            @keyframes steam-2 {
              0%, 100% { opacity: 0; transform: translateY(0) scale(1); }
              40% { opacity: 0.5; }
              80% { opacity: 0.2; transform: translateY(-22px) scale(1.2); }
              100% { opacity: 0; transform: translateY(-35px) scale(0.7); }
            }
            @keyframes steam-3 {
              0%, 100% { opacity: 0; transform: translateY(0) scale(1); }
              25% { opacity: 0.4; }
              65% { opacity: 0.2; transform: translateY(-20px) scale(1.4); }
              100% { opacity: 0; transform: translateY(-32px) scale(0.9); }
            }
            @keyframes gentle-bob {
              0%, 100% { transform: translateY(0); }
              50% { transform: translateY(-6px); }
            }
            @keyframes blink-cursor {
              0%, 100% { opacity: 1; }
              50% { opacity: 0; }
            }
            @keyframes dot-wave-1 { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-5px); } }
            @keyframes dot-wave-2 { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-5px); } }
            @keyframes dot-wave-3 { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-5px); } }
            .pixel-fill-bar { animation: pixel-fill 2.5s ease-in-out infinite; }
            .steam-anim-1 { animation: steam-1 2s ease-in-out infinite; }
            .steam-anim-2 { animation: steam-2 2.3s ease-in-out infinite 0.3s; }
            .steam-anim-3 { animation: steam-3 2.6s ease-in-out infinite 0.6s; }
            .gentle-bob { animation: gentle-bob 2s ease-in-out infinite; }
            .dot-1 { animation: dot-wave-1 1.4s ease-in-out infinite; }
            .dot-2 { animation: dot-wave-2 1.4s ease-in-out infinite 0.2s; }
            .dot-3 { animation: dot-wave-3 1.4s ease-in-out infinite 0.4s; }
          `,
        }}
      />

      {/* Pixel Grid Background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(#1A4331 1px, transparent 1px), linear-gradient(90deg, #1A4331 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* Corner decorations */}
      <div className="absolute top-6 left-6 flex gap-1.5">
        <div className="w-3 h-3 bg-[#1A4331]" />
        <div className="w-3 h-3 bg-[#8A9A7A]" />
        <div className="w-3 h-3 bg-[#D2A676]" />
      </div>
      <div className="absolute top-6 right-6 flex gap-1.5">
        <div className="w-3 h-3 bg-[#D2A676]" />
        <div className="w-3 h-3 bg-[#8A9A7A]" />
        <div className="w-3 h-3 bg-[#1A4331]" />
      </div>

      {/* Main Content */}
      <div className="relative flex flex-col items-center">
        {/* Tea Cup Pixel Art */}
        <div className="relative mb-8 gentle-bob">
          {/* Steam wisps */}
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 flex gap-3">
            <div className="w-1.5 h-4 bg-[#8A9A7A]/40 steam-anim-1" />
            <div className="w-1.5 h-5 bg-[#8A9A7A]/30 steam-anim-2" />
            <div className="w-1.5 h-4 bg-[#8A9A7A]/40 steam-anim-3" />
          </div>

          {/* Cup body */}
          <div className="relative">
            <div className="w-20 h-16 bg-white border-3 border-[#1A4331] relative overflow-hidden">
              {/* Tea liquid */}
              <div className="absolute bottom-0 left-0 right-0 h-[60%] bg-gradient-to-t from-[#D2A676] to-[#D2A676]/60" />
              {/* Surface shimmer */}
              <div className="absolute bottom-[55%] left-0 right-0 h-[6%] bg-[#F8F5F0]/30" />
            </div>
            {/* Cup handle */}
            <div className="absolute -right-3 top-2 w-4 h-8 border-3 border-[#1A4331] border-l-0 bg-transparent" />
            {/* Cup saucer */}
            <div className="w-24 h-3 bg-white border-3 border-[#1A4331] -mx-2 -mt-[1px]" />
          </div>
        </div>

        {/* Title */}
        <h1 className="pixel-text text-4xl md:text-5xl text-[#1A4331] mb-3 tracking-wider">
          {title}
        </h1>

        {/* Subtitle with typing dots */}
        <div className="flex items-center gap-1 mb-10">
          <p className="text-sm text-[#8A9A7A] font-bold tracking-wide">
            {subtitle}
          </p>
          <span className="flex gap-0.5 ml-1">
            <span className="w-1 h-1 bg-[#8A9A7A] dot-1" />
            <span className="w-1 h-1 bg-[#8A9A7A] dot-2" />
            <span className="w-1 h-1 bg-[#8A9A7A] dot-3" />
          </span>
        </div>

        {/* Pixel Progress Bar */}
        <div className="w-64 h-4 bg-white border-2 border-[#1A4331] p-[2px] relative overflow-hidden">
          <div className="h-full bg-[#1A4331] pixel-fill-bar" />
          {/* Pixel segments overlay */}
          <div className="absolute inset-0 flex gap-[2px] p-[2px] pointer-events-none">
            {Array.from({ length: 16 }).map((_, i) => (
              <div
                key={i}
                className="flex-1 border-r border-[#F8F5F0]/30 last:border-r-0"
              />
            ))}
          </div>
        </div>

        {/* Decorative leaf ornaments */}
        <div className="flex items-center gap-3 mt-6 text-[#8A9A7A]/40">
          <div className="w-8 h-[2px] bg-[#8A9A7A]/30" />
          <span className="text-xs">🍃</span>
          <div className="w-8 h-[2px] bg-[#8A9A7A]/30" />
        </div>
      </div>

      {/* Bottom decoration */}
      <div className="absolute bottom-6 flex items-center gap-2">
        <div className="w-2 h-2 bg-[#1A4331]/20" />
        <p className="text-[10px] text-[#1A4331]/30 font-bold tracking-[0.3em] uppercase">
          Nơi Thiên Nhiên Hội Ngộ Hoài Niệm
        </p>
        <div className="w-2 h-2 bg-[#1A4331]/20" />
      </div>
    </div>
  );
}
