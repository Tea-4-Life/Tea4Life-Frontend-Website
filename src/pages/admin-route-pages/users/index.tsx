"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Search, Mail, ShieldAlert, Ban, CheckCircle2 } from "lucide-react";

const mockUsers = [
  {
    id: 1,
    name: "Nguyễn Văn A",
    email: "vanna@gmail.com",
    role: "Customer",
    status: "Active",
    joined: "15/01/2026",
  },
  {
    id: 2,
    name: "Trần Thị B",
    email: "thib@gmail.com",
    role: "Customer",
    status: "Active",
    joined: "20/01/2026",
  },
  {
    id: 3,
    name: "Lê Văn C",
    email: "vanc@gmail.com",
    role: "Editor",
    status: "Banned",
    joined: "01/01/2026",
  },
];

export default function AdminUsersPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-slate-900">
          Quản lý Khách hàng
        </h1>
      </div>

      <div className="bg-white rounded-xl shadow-sm border p-4">
        <div className="relative max-w-sm mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input placeholder="Tìm theo tên hoặc email..." className="pl-10" />
        </div>

        <Table>
          <TableHeader>
            <TableRow className="bg-slate-50/50">
              <TableHead>Khách hàng</TableHead>
              <TableHead>Vai trò</TableHead>
              <TableHead>Ngày tham gia</TableHead>
              <TableHead>Trạng thái</TableHead>
              <TableHead className="text-right">Hành động</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <div className="flex flex-col">
                    <span className="font-semibold text-slate-900">
                      {user.name}
                    </span>
                    <span className="text-xs text-slate-500">{user.email}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className="font-medium">
                    {user.role}
                  </Badge>
                </TableCell>
                <TableCell className="text-slate-600 text-sm">
                  {user.joined}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1.5">
                    {user.status === "Active" ? (
                      <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                    ) : (
                      <ShieldAlert className="h-4 w-4 text-red-500" />
                    )}
                    <span
                      className={
                        user.status === "Active"
                          ? "text-emerald-700"
                          : "text-red-700"
                      }
                    >
                      {user.status}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="text-right space-x-1">
                  <Button variant="ghost" size="icon" title="Gửi mail">
                    <Mail className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-red-500 hover:text-red-600 hover:bg-red-50"
                  >
                    <Ban className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
