export function IntroVideo() {
  return (
    <section className="relative w-full h-[60vh] md:h-[80vh] border-b-4 border-[#1A4331] overflow-hidden z-10">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover filter contrast-125 saturate-110"
      >
        <source src="/introduce-vid.webm" type="video/webm" />
      </video>

      {/* Retro scanline overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] pointer-events-none opacity-30 z-10" />

      <div className="absolute inset-0 bg-black/40 z-10" />

      <div className="absolute inset-0 flex flex-col items-center justify-center z-20 text-center px-4 gap-6">
        <h1 className="text-6xl md:text-9xl pixel-text text-[#F8F5F0] drop-shadow-[6px_6px_0px_#1A4331] animate-[pulse_3s_ease-in-out_infinite]">
          TEA4LIFE
        </h1>
        <p className="text-xl md:text-3xl font-bold font-sans text-[#F8F5F0] bg-[#1A4331] px-8 py-3 border-4 border-[#F8F5F0] shadow-[4px_4px_0px_#1A4331] tracking-widest backdrop-blur-sm uppercase">
          Nơi Thiên Nhiên Hội Ngộ Hoài Niệm
        </p>
      </div>
    </section>
  );
}
