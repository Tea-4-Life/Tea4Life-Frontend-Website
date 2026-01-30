"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button.tsx";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Label } from "@/components/ui/label.tsx";
import { Plus, MapPin, Search, MoreVertical, Phone, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu.tsx";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog.tsx";

// Cập nhật Mock data có số điện thoại
const initialAddresses = [
  {
    id: 1,
    name: "Nhà riêng",
    receiver: "Nguyễn Văn A",
    phone: "0901 234 567",
    detail: "123 Đường Lê Lợi, Quận 1",
    city: "TP. Hồ Chí Minh",
    isDefault: true,
  },
  {
    id: 2,
    name: "Công ty",
    receiver: "Nguyễn Văn A",
    phone: "0988 777 666",
    detail: "Tòa nhà Bitexco, Hải Triều",
    city: "TP. Hồ Chí Minh",
    isDefault: false,
  },
];

export default function AddressPage() {
  const [addresses] = useState(initialAddresses);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const filteredAddresses = addresses.filter(
    (addr) =>
      addr.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      addr.detail.toLowerCase().includes(searchQuery.toLowerCase()) ||
      addr.phone.includes(searchQuery),
  );

  const canAddMore = addresses.length < 5;

  return (
    <div className="space-y-6">
      <Card className="border-emerald-100 shadow-sm">
        <CardHeader className="pb-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <CardTitle className="text-emerald-800 text-xl flex items-center gap-2">
                <MapPin className="h-5 w-5" /> Địa chỉ giao hàng
              </CardTitle>
              <CardDescription>
                Quản lý tối đa 5 địa chỉ nhận hàng của bạn ({addresses.length}
                /5)
              </CardDescription>
            </div>

            {/* Dialog Thêm địa chỉ mới */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button
                  disabled={!canAddMore}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white shrink-0"
                >
                  <Plus className="h-4 w-4 mr-2" /> Thêm địa chỉ mới
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px] border-emerald-100">
                <DialogHeader>
                  <DialogTitle className="text-emerald-900">
                    Thêm địa chỉ mới
                  </DialogTitle>
                  <DialogDescription>
                    Nhập thông tin người nhận và địa chỉ giao hàng chi tiết.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Tên gợi nhớ (Vd: Nhà riêng)</Label>
                      <Input
                        placeholder="Nhà riêng, Công ty..."
                        className="border-emerald-100"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Tên người nhận</Label>
                      <Input
                        placeholder="Tên khách hàng"
                        className="border-emerald-100"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Số điện thoại nhận hàng</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-emerald-500" />
                      <Input
                        placeholder="09xx xxx xxx"
                        className="pl-10 border-emerald-100"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Địa chỉ chi tiết</Label>
                    <Input
                      placeholder="Số nhà, tên đường..."
                      className="border-emerald-100"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Thành phố / Tỉnh</Label>
                    <Input
                      placeholder="Hồ Chí Minh"
                      className="border-emerald-100"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={() => setIsDialogOpen(false)}
                  >
                    Hủy
                  </Button>
                  <Button className="bg-emerald-600 hover:bg-emerald-700">
                    Lưu địa chỉ
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-emerald-500" />
            <Input
              placeholder="Tìm theo tên, địa chỉ hoặc số điện thoại..."
              className="pl-10 border-emerald-100 focus-visible:ring-emerald-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="grid gap-4">
            {filteredAddresses.map((addr) => (
              <div
                key={addr.id}
                className="group flex items-start justify-between p-4 rounded-xl border border-emerald-50 hover:border-emerald-200 hover:bg-emerald-50/20 transition-all"
              >
                <div className="flex gap-4">
                  <div className="h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                    <MapPin className="h-5 w-5 text-emerald-600" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <p className="font-bold text-emerald-900">{addr.name}</p>
                      {addr.isDefault && (
                        <span className="text-[10px] font-bold uppercase px-2 py-0.5 bg-emerald-500 text-white rounded-full">
                          Mặc định
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-4 text-sm text-emerald-700">
                      <span className="flex items-center gap-1 font-medium">
                        <User className="h-3 w-3" /> {addr.receiver}
                      </span>
                      <span className="flex items-center gap-1 text-emerald-600">
                        <Phone className="h-3 w-3" /> {addr.phone}
                      </span>
                    </div>

                    <p className="text-sm text-emerald-600 leading-snug">
                      {addr.detail}, {addr.city}
                    </p>
                  </div>
                </div>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-emerald-400"
                    >
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    {!addr.isDefault && (
                      <DropdownMenuItem>Đặt làm mặc định</DropdownMenuItem>
                    )}
                    <DropdownMenuItem>Chỉnh sửa</DropdownMenuItem>
                    <DropdownMenuItem className="text-red-600 focus:bg-red-50 focus:text-red-600">
                      Xóa
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
