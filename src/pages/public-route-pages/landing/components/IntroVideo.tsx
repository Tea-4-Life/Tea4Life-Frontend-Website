export function IntroVideo() {
  return (
    <section className="relative w-full h-[60vh] md:h-[80vh] border-b-2 border-[#1A4331] overflow-hidden z-10">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/common/introduce-vid.webm" type="video/webm" />
      </video>

      {/* Subtle texture overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.05)_50%)] bg-[length:100%_4px] pointer-events-none opacity-15 z-10" />

      <div className="absolute inset-0 bg-black/40 z-10" />

      <div className="absolute inset-0 flex flex-col items-center justify-center z-20 text-center px-4 gap-6">
        <h1 className="text-6xl md:text-9xl pixel-text text-[#F8F5F0] drop-shadow-[4px_4px_0px_rgba(26,67,49,0.5)]">
          TEA4LIFE
        </h1>
        <p className="text-xl md:text-3xl font-bold font-sans text-[#F8F5F0] bg-[#1A4331]/90 px-8 py-3 border-2 border-[#F8F5F0]/60 shadow-[2px_2px_0px_rgba(26,67,49,0.3)] tracking-widest backdrop-blur-sm uppercase">
          Nơi Thiên Nhiên Hội Ngộ Hoài Niệm
        </p>
      </div>
    </section>
  );
}
