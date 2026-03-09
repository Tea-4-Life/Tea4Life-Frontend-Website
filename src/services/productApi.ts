import axiosClient from "@/lib/axios-client";
import type ApiResponse from "@/types/base/ApiResponse";
import type PageResponse from "@/types/base/PageResponse";
import type { ProductDetailResponse } from "@/types/product/ProductDetailResponse";
import type { ProductSummaryResponse } from "@/types/product/ProductSummaryResponse";

import type { ProductQuery } from "@/types/product/ProductQuery";
import type { ProductCategoryResponse } from "@/types/product-category/ProductCategoryResponse";

export const getProductsApi = async (params: ProductQuery) => {
  return await axiosClient.get<
    ApiResponse<PageResponse<ProductSummaryResponse>>
  >("/product-service/products", { params });
};

export const getProductCategoriesApi = async () => {
  return await axiosClient.get<ApiResponse<ProductCategoryResponse[]>>(
    "/product-service/products/categories",
  );
};

export const getProductByIdApi = async (id: string) => {
  return await axiosClient.get<ApiResponse<ProductDetailResponse>>(
    `/product-service/products/${id}`,
  );
};
