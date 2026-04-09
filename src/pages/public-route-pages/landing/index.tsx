"use client";

import { IntroVideo } from "./components/IntroVideo.tsx";
import { HeroCarousel } from "./components/HeroCarousel.tsx";
import { CategoriesSection } from "./components/CategoriesSection.tsx";
import { CosmicMessageSection } from "./components/CosmicMessageSection.tsx";
import { LatestNewsSection } from "./components/LatestNewsSection.tsx";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#F8F5F0] text-[#1A4331] pb-24 overflow-hidden relative">
      {/* Decorative Background Grid */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.03] z-0"
        style={{
          backgroundImage:
            "linear-gradient(#1A4331 1px, transparent 1px), linear-gradient(90deg, #1A4331 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      ></div>

      <IntroVideo />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-24 pt-16 md:pt-24 relative z-10">
        <HeroCarousel />
        <CosmicMessageSection />
        <LatestNewsSection />
        <CategoriesSection />
      </div>
    </div>
  );
}
