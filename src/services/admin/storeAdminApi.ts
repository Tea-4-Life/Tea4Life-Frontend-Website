import axiosClient from "@/lib/axios-client";
import type ApiResponse from "@/types/base/ApiResponse";
import type { StoreResponse } from "@/types/store/StoreResponse";
import type { UpsertStoreRequest } from "@/types/store/UpsertStoreRequest";

export const findAllStoresApi = async () => {
  return await axiosClient.get<ApiResponse<StoreResponse[]>>(
    "/order-service/public/stores"
  );
};

export const findStoreByIdApi = async (id: number | string) => {
  return await axiosClient.get<ApiResponse<StoreResponse>>(
    `/order-service/admin/stores/${id}`
  );
};

export const createStoreApi = async (data: UpsertStoreRequest) => {
  return await axiosClient.post<ApiResponse<StoreResponse>>(
    "/order-service/admin/stores",
    data
  );
};

export const updateStoreApi = async (id: number | string, data: UpsertStoreRequest) => {
  return await axiosClient.put<ApiResponse<StoreResponse>>(
    `/order-service/admin/stores/${id}`,
    data
  );
};

export const deleteStoreApi = async (id: number | string) => {
  return await axiosClient.delete<ApiResponse<void>>(
    `/order-service/admin/stores/${id}`
  );
};
