import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronRight, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function DriverOrders() {
  const navigate = useNavigate();

  return (
    <div className="p-4 space-y-6">
      <header>
        <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tighter">
          Nhiệm vụ
        </h2>
        <p className="text-slate-400 text-xs font-bold uppercase">
          Quản lý lộ trình giao hàng
        </p>
      </header>

      <Tabs defaultValue="available" className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-slate-200/50 rounded-2xl p-1 h-12">
          <TabsTrigger
            value="available"
            className="rounded-xl font-black text-xs uppercase data-[state=active]:bg-white data-[state=active]:shadow-sm"
          >
            Chờ lấy (2)
          </TabsTrigger>
          <TabsTrigger
            value="shipping"
            className="rounded-xl font-black text-xs uppercase data-[state=active]:bg-white data-[state=active]:shadow-sm"
          >
            Đang giao (1)
          </TabsTrigger>
        </TabsList>

        <TabsContent value="available" className="mt-6 space-y-4">
          {[1, 2].map((item) => (
            <OrderCard
              key={item}
              id={item}
              status="ready"
              onClick={() => navigate(`/driver/orders/${item}`)}
            />
          ))}
        </TabsContent>

        <TabsContent value="shipping" className="mt-6 space-y-4">
          <OrderCard
            id={3}
            status="shipping"
            onClick={() => navigate(`/driver/orders/3`)}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}

// Component thẻ đơn hàng dùng nội bộ
function OrderCard({
  id,
  status,
  onClick,
}: {
  id: number;
  status: string;
  onClick: () => void;
}) {
  return (
    <Card
      className="border-none shadow-md rounded-[2rem] bg-white overflow-hidden active:scale-95 transition-transform"
      onClick={onClick}
    >
      <CardContent className="p-5">
        <div className="flex justify-between items-start mb-4">
          <div
            className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${status === "ready" ? "bg-orange-100 text-orange-600" : "bg-blue-100 text-blue-600"}`}
          >
            {status === "ready" ? "Sẵn sàng lấy" : "Đang vận chuyển"}
          </div>
          <span className="text-xs font-bold text-slate-300">
            #TEA-{id}99{id}
          </span>
        </div>

        <div className="space-y-3">
          <div className="flex gap-3">
            <div className="h-2 w-2 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
            <p className="text-sm font-bold text-slate-700 line-clamp-1">
              Kho Tea4Life - Quận 10, HCM
            </p>
          </div>
          <div className="flex gap-3">
            <div className="h-2 w-2 rounded-full bg-blue-500 mt-1.5 shrink-0" />
            <p className="text-sm font-bold text-slate-700 line-clamp-1">
              221B Baker Street, Quận 1, HCM
            </p>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-slate-50 flex justify-between items-center text-slate-400">
          <div className="flex items-center gap-1">
            <Clock size={14} />
            <span className="text-[10px] font-bold">15 phút trước</span>
          </div>
          <ChevronRight size={18} />
        </div>
      </CardContent>
    </Card>
  );
}
