import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  MapPin,
  Phone,
  Navigation,
  ArrowLeft,
  PackageCheck,
  User,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

export default function DriverOrderDetail() {
  const navigate = useNavigate();
  const { id } = useParams();

  return (
    <div className="relative min-h-screen bg-slate-50">
      {/* Top Header */}
      <div className="p-4 flex items-center gap-4 bg-white border-b sticky top-0 z-10">
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft size={20} />
        </Button>
        <h2 className="font-black text-slate-800 uppercase text-sm tracking-tight">
          Chi tiết vận đơn #{id}
        </h2>
      </div>

      <div className="p-4 space-y-4 pb-32">
        {/* Card khách hàng */}
        <Card className="border-none shadow-sm rounded-3xl bg-white">
          <CardContent className="p-5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 bg-slate-100 rounded-2xl flex items-center justify-center">
                <User className="text-slate-400" />
              </div>
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase">
                  Khách nhận hàng
                </p>
                <p className="font-bold text-slate-800">Anh Huỳnh Đức Phú</p>
              </div>
            </div>
            <Button
              size="icon"
              className="rounded-2xl bg-emerald-50 text-emerald-600 hover:bg-emerald-100 border-none shadow-none"
            >
              <Phone size={20} />
            </Button>
          </CardContent>
        </Card>

        {/* Lộ trình */}
        <Card className="border-none shadow-sm rounded-3xl bg-white overflow-hidden">
          <CardContent className="p-6 relative">
            {/* Đường gạch nối lộ trình */}
            <div className="absolute left-[31px] top-[50px] bottom-[50px] w-[2px] bg-slate-100 border-dashed border-l-2" />

            <div className="space-y-8">
              <div className="flex gap-4 relative z-10">
                <div className="h-10 w-10 bg-emerald-600 rounded-full flex items-center justify-center shrink-0 shadow-lg shadow-emerald-100">
                  <MapPin size={20} className="text-white" />
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 font-black uppercase">
                    Điểm lấy hàng
                  </p>
                  <p className="text-sm font-bold text-slate-700">
                    Tổng kho Tea4Life - Quận 10
                  </p>
                  <p className="text-xs text-slate-400">
                    15/2 Thành Thái, P.14, Q.10
                  </p>
                </div>
              </div>

              <div className="flex gap-4 relative z-10">
                <div className="h-10 w-10 bg-blue-600 rounded-full flex items-center justify-center shrink-0 shadow-lg shadow-blue-100">
                  <Navigation size={20} className="text-white" />
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 font-black uppercase">
                    Điểm giao hàng
                  </p>
                  <p className="text-sm font-bold text-slate-700">
                    Chung cư RiverGate
                  </p>
                  <p className="text-xs text-slate-400">
                    151 Bến Vân Đồn, P.6, Q.4
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Danh sách món (để tài xế kiểm hàng) */}
        <Card className="border-none shadow-sm rounded-3xl bg-white">
          <CardContent className="p-5 space-y-3">
            <p className="text-[10px] font-black text-slate-400 uppercase mb-2">
              Kiểm tra đơn hàng (3 món)
            </p>
            <div className="flex justify-between text-sm font-bold">
              <span className="text-slate-600">2x Trà Sữa Ô Long</span>
              <span>80k</span>
            </div>
            <div className="flex justify-between text-sm font-bold">
              <span className="text-slate-600">1x Trà Đào Cam Sả</span>
              <span>45k</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Nút hành động nổi (Floating Action Button) */}
      <div className="fixed bottom-20 left-0 right-0 p-4 max-w-md mx-auto z-20">
        <Button className="w-full h-16 bg-slate-900 hover:bg-emerald-600 text-white rounded-2xl font-black text-base shadow-2xl transition-all active:scale-95 gap-3">
          <PackageCheck size={24} />
          XÁC NHẬN ĐÃ LẤY HÀNG
        </Button>
      </div>
    </div>
  );
}
