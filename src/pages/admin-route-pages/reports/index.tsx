"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Download,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AdminReportsPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-slate-900">Báo cáo doanh thu</h1>
        <Button variant="outline" size="sm">
          <Download className="h-4 w-4 mr-2" /> Xuất báo cáo (Excel)
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-none shadow-sm bg-emerald-600 text-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-emerald-100 text-sm font-medium">
              Tổng lợi nhuận
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">128.450.000đ</div>
            <div className="flex items-center mt-2 text-emerald-200 text-sm">
              <ArrowUpRight className="h-4 w-4 mr-1" /> +15.2% so với tháng
              trước
            </div>
          </CardContent>
        </Card>

        {/* Các thẻ phụ */}
        <Card className="border-none shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-slate-500 text-sm font-medium">
              Giá trị đơn trung bình
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-900">850.000đ</div>
            <div className="flex items-center mt-2 text-red-500 text-sm">
              <ArrowDownRight className="h-4 w-4 mr-1" /> -2.4% biến động
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-none shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Biểu đồ tăng trưởng</CardTitle>
          <Select defaultValue="7days">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Chọn thời gian" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7days">7 ngày qua</SelectItem>
              <SelectItem value="30days">30 ngày qua</SelectItem>
              <SelectItem value="year">Năm nay</SelectItem>
            </SelectContent>
          </Select>
        </CardHeader>
        <CardContent className="h-[300px] flex items-center justify-center bg-slate-50 rounded-lg border border-dashed border-slate-200">
          <div className="text-center">
            <TrendingUp className="h-12 w-12 text-slate-300 mx-auto mb-2" />
            <p className="text-slate-500 text-sm">
              Tích hợp Recharts hoặc Chart.js tại đây để hiển thị dữ liệu.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
