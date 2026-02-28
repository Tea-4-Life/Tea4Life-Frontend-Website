import axiosClient from "@/lib/axios-client";
import type ApiResponse from "@/types/base/ApiResponse";
import type PageResponse from "@/types/base/PageResponse";
import type PaginationParams from "@/types/base/PaginationParams";
import type { ProductResponse } from "@/types/product/ProductResponse";
import type { ProductSummaryResponse } from "@/types/product/ProductSummaryResponse";

export const getProductsApi = async (params: PaginationParams) => {
  return await axiosClient.get<
    ApiResponse<PageResponse<ProductSummaryResponse>>
  >("/product-service/products", { params });
};

export const getProductByIdApi = async (id: string) => {
  return await axiosClient.get<ApiResponse<ProductResponse>>(
    `/product-service/products/${id}`,
  );
};
