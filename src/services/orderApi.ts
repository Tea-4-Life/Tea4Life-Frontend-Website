import axiosClient from "@/lib/axios-client";
import type ApiResponse from "@/types/base/ApiResponse";
import type { CreateOrderRequest, OrderItemRequest } from "@/types/order/CreateOrderRequest";

export interface OrderResponse {
  id: string;
  orderCode: string;
  receiverName: string;
  phone: string;
  detail: string;
  status: string;
  totalAmount: number;
  paymentMethod: string;
  paymentStatus: string;
  createdAt: string;
  items: OrderItemRequest[]; 
}

export const createOrderApi = async (data: CreateOrderRequest) => {
  return await axiosClient.post<ApiResponse<OrderResponse>>(
    "/order-service/orders",
    data,
  );
};

export const getMyOrdersApi = async () => {
  return await axiosClient.get<ApiResponse<OrderResponse[]>>(
    "/order-service/orders/me",
  );
};

export const getOrderByIdApi = async (id: string) => {
  return await axiosClient.get<ApiResponse<OrderResponse>>(
    `/order-service/orders/${id}`,
  );
};
