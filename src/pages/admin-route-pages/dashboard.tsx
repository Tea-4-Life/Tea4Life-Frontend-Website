import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ShoppingBag, Users, DollarSign, TrendingUp } from "lucide-react";

export default function AdminDashboard() {
  const stats = [
    {
      label: "Doanh thu tháng",
      value: "45.000.000đ",
      icon: DollarSign,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      label: "Đơn hàng mới",
      value: "128",
      icon: ShoppingBag,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
    },
    {
      label: "Khách hàng mới",
      value: "42",
      icon: Users,
      color: "text-orange-600",
      bg: "bg-orange-50",
    },
    {
      label: "Tỉ lệ tăng trưởng",
      value: "+12.5%",
      icon: TrendingUp,
      color: "text-purple-600",
      bg: "bg-purple-50",
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-slate-900">
          Tổng quan hệ thống
        </h2>
        <p className="text-slate-500">
          Số liệu cập nhật tính đến ngày hôm nay.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((s) => (
          <Card key={s.label} className="border-none shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium text-slate-500">
                {s.label}
              </CardTitle>
              <div className={cn("p-2 rounded-lg", s.bg)}>
                <s.icon className={cn("h-4 w-4", s.color)} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{s.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Bạn có thể thêm Table đơn hàng gần đây hoặc Chart ở đây */}
    </div>
  );
}
