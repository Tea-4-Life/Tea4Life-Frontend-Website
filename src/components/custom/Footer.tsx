"use client";

import { Link } from "react-router-dom";
import { Leaf } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-emerald-100 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center space-y-4">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-linear-to-br from-emerald-500 to-green-500">
              <Leaf className="h-4 w-4 text-white" />
            </div>
            <span className="text-lg font-bold text-emerald-800 tracking-tight">
              Tea4Life
            </span>
          </Link>

          {/* Copyright Only */}
          <div className="text-center">
            <p className="text-sm text-emerald-600">
              &copy; {new Date().getFullYear()} Tea4Life. Tất cả quyền được bảo
              lưu.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
