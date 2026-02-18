import axiosClient from "@/lib/axios-client";
import type ApiResponse from "@/types/base/ApiResponse";
import type PageResponse from "@/types/base/PageResponse";
import type PaginationParams from "@/types/base/PaginationParams";
import type { RoleResponse } from "@/types/role/RoleResponse";
import type { UpsertRoleRequest } from "@/types/role/UpsertRoleRequest";

export const createRoleApi = async (data: UpsertRoleRequest) => {
  return await axiosClient.post<ApiResponse<void>>("/user-service/roles", data);
};

export const findAllRoles = async (
  params: PaginationParams = { page: 1, size: 10 },
) => {
  return await axiosClient.get<ApiResponse<PageResponse<RoleResponse>>>(
    "/user-service/roles",
    {
      params: {
        ...params,
      },
    },
  );
};

export const updateRoleApi = async (id: string, data: UpsertRoleRequest) => {
  return await axiosClient.post<ApiResponse<void>>(
    `/user-service/roles/${id}`,
    data,
  );
};

export const deleteRoleApi = async (id: string) => {
  return await axiosClient.delete<ApiResponse<void>>(
    `/user-service/roles/${id}`,
  );
};

export const findRoleById = async (id: string) => {
  return await axiosClient.get<ApiResponse<RoleResponse>>(
    `/user-service/roles/${id}`,
  );
};
