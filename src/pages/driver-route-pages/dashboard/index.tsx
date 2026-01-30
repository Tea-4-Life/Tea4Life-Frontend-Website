import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Package, DollarSign, Bell, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function DriverDashboard() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      {/* Header đen bo góc cực mạnh */}
      <div className="bg-slate-900 p-6 pt-10 text-white rounded-b-[3rem] shadow-2xl">
        <div className="flex justify-between items-start mb-8">
          <div>
            <h2 className="text-2xl font-black italic tracking-tighter">
              TEA4LIFE
            </h2>
            <p className="text-emerald-400 text-[10px] font-bold uppercase">
              Driver Partner
            </p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="bg-white/10 rounded-2xl relative"
          >
            <Bell size={20} />
            <span className="absolute top-2 right-2 h-2 w-2 bg-red-500 rounded-full border-2 border-slate-900"></span>
          </Button>
        </div>

        <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/10">
          <div className="h-4 w-4 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_15px_#10b981]" />
          <p className="text-sm font-bold">Đang sẵn sàng nhận đơn</p>
        </div>
      </div>

      {/* Stats Card */}
      <div className="px-4 grid grid-cols-2 gap-4 mt-[-30px]">
        <Card className="border-none shadow-xl rounded-[2rem] bg-white">
          <CardContent className="p-6 flex flex-col items-center">
            <Package className="text-blue-500 mb-2" size={24} />
            <p className="text-2xl font-black text-slate-800">12</p>
            <p className="text-[10px] font-bold text-slate-400 uppercase">
              Đơn giao
            </p>
          </CardContent>
        </Card>
        <Card className="border-none shadow-xl rounded-[2rem] bg-white">
          <CardContent className="p-6 flex flex-col items-center">
            <DollarSign className="text-emerald-500 mb-2" size={24} />
            <p className="text-2xl font-black text-slate-800">850k</p>
            <p className="text-[10px] font-bold text-slate-400 uppercase">
              Thu nhập
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Đơn hàng Test */}
      <div className="px-6 space-y-4">
        <h3 className="font-black text-slate-800 uppercase text-sm tracking-widest">
          Việc cần làm
        </h3>
        <Card className="border-none shadow-md rounded-[2rem] bg-emerald-50 p-1">
          <CardContent className="p-5 space-y-4">
            <div className="flex justify-between">
              <span className="text-[10px] font-black bg-emerald-200 text-emerald-800 px-3 py-1 rounded-full uppercase">
                Đơn mới
              </span>
              <span className="text-xs font-bold text-slate-400 tracking-tighter">
                3.2 km
              </span>
            </div>
            <div className="flex gap-3">
              <MapPin size={18} className="text-emerald-600 shrink-0" />
              <p className="text-sm font-bold text-slate-700 leading-tight">
                Kho Trà Mộc Châu - Q.10, HCM
              </p>
            </div>
            <Button
              className="w-full bg-slate-900 hover:bg-emerald-600 text-white h-14 rounded-2xl font-black transition-all"
              onClick={() => navigate("/driver/orders/1")}
            >
              XEM CHI TIẾT
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
