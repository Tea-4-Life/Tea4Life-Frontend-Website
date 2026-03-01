"use client";

import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="border-t-4 border-[#1A4331] bg-[#F8F5F0] font-mono mt-auto">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center space-y-4">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <img
              src="/logo/logo.png"
              alt="Tea4Life Logo"
              className="h-10 w-10 object-contain rounded-md"
            />
            <span className="text-2xl font-bold text-[#1A4331] tracking-tight pixel-text uppercase">
              Tea4Life
            </span>
          </Link>

          {/* Copyright Only */}
          <div className="text-center font-bold">
            <p className="text-sm text-[#1A4331] bg-[#8A9A7A]/20 px-4 py-2 border-2 border-[#1A4331] inline-block">
              &copy; {new Date().getFullYear()} TEA4LIFE. ALL RIGHTS RESERVED.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
