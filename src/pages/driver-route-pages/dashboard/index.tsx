import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Wallet, Bell, ChevronRight, Power } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function DriverDashboard() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      {/* Header: Profile & Online Status */}
      <div className="bg-slate-900 p-6 pt-10 text-white rounded-b-[3rem] shadow-2xl">
        <div className="flex justify-between items-center mb-8">
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => navigate("/profile")}
          >
            <div className="h-12 w-12 rounded-2xl bg-emerald-500 flex items-center justify-center font-black text-white text-xl">
              P
            </div>
            <div>
              <h2 className="text-lg font-black leading-none">Phú Huỳnh</h2>
              <p className="text-emerald-400 text-[10px] font-bold uppercase mt-1.5 tracking-widest">
                Trực tuyến • #DRV-092
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="bg-white/5 rounded-2xl text-slate-400"
            >
              <Bell size={20} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="bg-red-500/20 text-red-400 rounded-2xl"
            >
              <Power size={20} />
            </Button>
          </div>
        </div>

        {/* Lối tắt nhanh đến Ví thu nhập */}
        <div
          className="flex items-center justify-between bg-white/5 p-5 rounded-[2rem] border border-white/10 active:scale-[0.98] transition-all cursor-pointer"
          onClick={() => navigate("/driver/earnings")}
        >
          <div className="flex items-center gap-4">
            <div className="h-10 w-10 rounded-full bg-emerald-500/20 flex items-center justify-center">
              <Wallet className="text-emerald-400" size={20} />
            </div>
            <div>
              <p className="text-[10px] text-slate-400 font-black uppercase tracking-tighter">
                Thu nhập hôm nay
              </p>
              <p className="text-xl font-black">1.250.000đ</p>
            </div>
          </div>
          <ChevronRight size={20} className="text-slate-600" />
        </div>
      </div>

      {/* Việc cần làm ngay */}
      <div className="px-6 space-y-4 pb-6">
        <div className="flex justify-between items-end">
          <h3 className="font-black text-slate-800 uppercase text-xs tracking-[0.2em]">
            Việc cần làm ngay
          </h3>
          <p
            className="text-emerald-600 text-[10px] font-black underline cursor-pointer"
            onClick={() => navigate("/driver/orders")}
          >
            TẤT CẢ ĐƠN
          </p>
        </div>

        <Card className="border-none shadow-xl rounded-[2.5rem] bg-white p-1 overflow-hidden">
          <CardContent className="p-6 space-y-5">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 bg-orange-500 rounded-full animate-ping" />
                <span className="text-[10px] font-black text-orange-600 uppercase">
                  Đơn hàng mới
                </span>
              </div>
              <span className="text-xs font-bold text-slate-300">#ORD-221</span>
            </div>

            <div className="space-y-4 py-2 border-l-2 border-dashed border-slate-100 ml-5 pl-6 relative">
              <div className="absolute -left-[7px] top-0 h-3 w-3 rounded-full bg-slate-200" />
              <div className="absolute -left-[7px] bottom-0 h-3 w-3 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]" />

              <div>
                <p className="text-[9px] text-slate-400 font-black uppercase">
                  Điểm lấy trà
                </p>
                <p className="text-sm font-bold text-slate-700">
                  Tea4Life - 15 Thành Thái, Q.10
                </p>
              </div>
              <div>
                <p className="text-[9px] text-slate-400 font-black uppercase">
                  Điểm giao hàng
                </p>
                <p className="text-sm font-bold text-slate-700">
                  Chung cư RiverGate, Q.4
                </p>
              </div>
            </div>

            <Button
              className="w-full bg-slate-900 hover:bg-emerald-600 text-white h-16 rounded-3xl font-black text-base shadow-2xl transition-all"
              onClick={() => navigate("/driver/orders/1")}
            >
              CHẤP NHẬN GIAO HÀNG
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
