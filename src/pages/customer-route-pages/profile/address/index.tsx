"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button.tsx";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Plus, MapPin, Search, MoreVertical, Phone, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu.tsx";
import { useNavigate } from "react-router-dom";
import { findMyAddressesApi } from "@/services/addressApi";
import type { AddressResponse } from "@/types/address/AddressResponse";

const addressTypeLabels: Record<string, string> = {
  HOME: "Nhà riêng",
  OFFICE: "Công ty",
  OTHER: "Khác",
};

export default function AddressPage() {
  const [addresses, setAddresses] = useState<AddressResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const res = await findMyAddressesApi();
        if (res.data.errorCode === null) {
          setAddresses(res.data.data);
        }
      } catch (error) {
        console.error("Failed to fetch addresses:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAddresses();
  }, []);

  const filteredAddresses = addresses.filter(
    (addr) =>
      (addressTypeLabels[addr.addressType] || addr.addressType)
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      addr.detail.toLowerCase().includes(searchQuery.toLowerCase()) ||
      addr.receiverName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      addr.phone.includes(searchQuery),
  );

  if (loading) {
    return (
      <div className="p-8 text-center text-emerald-600">
        Đang tải địa chỉ...
      </div>
    );
  }

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

            <Button
              disabled={!canAddMore}
              onClick={() => navigate("/profile/address/create")}
              className="bg-emerald-600 hover:bg-emerald-700 text-white shrink-0"
            >
              <Plus className="h-4 w-4 mr-2" /> Thêm địa chỉ mới
            </Button>
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
                      <p className="font-bold text-emerald-900">
                        {addressTypeLabels[addr.addressType] ||
                          addr.addressType}
                      </p>
                      {addr.isDefault && (
                        <span className="text-[10px] font-bold uppercase px-2 py-0.5 bg-emerald-500 text-white rounded-full">
                          Mặc định
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-4 text-sm text-emerald-700">
                      <span className="flex items-center gap-1 font-medium">
                        <User className="h-3 w-3" /> {addr.receiverName}
                      </span>
                      <span className="flex items-center gap-1 text-emerald-600">
                        <Phone className="h-3 w-3" /> {addr.phone}
                      </span>
                    </div>

                    <p className="text-sm text-emerald-600 leading-snug">
                      {addr.detail}, {addr.ward}, {addr.province}
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
