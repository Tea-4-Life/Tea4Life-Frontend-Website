import { Link } from "react-router-dom";
import { Leaf, Facebook, Instagram, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-emerald-100 bg-emerald-50">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-green-500">
                <Leaf className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-emerald-800">
                Tea4Life
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-emerald-700">
              Giữa nhịp sống vội, trà từ tay cho an yên.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="text-emerald-600 transition-colors hover:text-emerald-500"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-emerald-600 transition-colors hover:text-emerald-500"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-emerald-800">
              Liên kết nhanh
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/"
                  className="text-sm text-emerald-700 transition-colors hover:text-emerald-500"
                >
                  Trang chủ
                </Link>
              </li>
              <li>
                <Link
                  to="/san-pham"
                  className="text-sm text-emerald-700 transition-colors hover:text-emerald-500"
                >
                  Sản phẩm
                </Link>
              </li>
              <li>
                <Link
                  to="/ve-chung-toi"
                  className="text-sm text-emerald-700 transition-colors hover:text-emerald-500"
                >
                  Về chúng tôi
                </Link>
              </li>
              <li>
                <Link
                  to="/lien-he"
                  className="text-sm text-emerald-700 transition-colors hover:text-emerald-500"
                >
                  Liên hệ
                </Link>
              </li>
            </ul>
          </div>

          {/* Products */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-emerald-800">
              Sản phẩm
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/san-pham"
                  className="text-sm text-emerald-700 transition-colors hover:text-emerald-500"
                >
                  Trà xanh
                </Link>
              </li>
              <li>
                <Link
                  to="/san-pham"
                  className="text-sm text-emerald-700 transition-colors hover:text-emerald-500"
                >
                  Trà ô long
                </Link>
              </li>
              <li>
                <Link
                  to="/san-pham"
                  className="text-sm text-emerald-700 transition-colors hover:text-emerald-500"
                >
                  Trà thảo mộc
                </Link>
              </li>
              <li>
                <Link
                  to="/san-pham"
                  className="text-sm text-emerald-700 transition-colors hover:text-emerald-500"
                >
                  Trà hoa
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-emerald-800">
              Liên hệ
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                <span className="text-sm text-emerald-700">
                  123 Đường Trà Xanh, Quận 1, TP.HCM
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 shrink-0 text-emerald-600" />
                <span className="text-sm text-emerald-700">0909 123 456</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 shrink-0 text-emerald-600" />
                <span className="text-sm text-emerald-700">
                  hello@tea4life.vn
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-emerald-200 pt-8 text-center">
          <p className="text-sm text-emerald-600">
            &copy; {new Date().getFullYear()} Tea4Life. Tất cả quyền được bảo
            lưu.
          </p>
        </div>
      </div>
    </footer>
  );
}
