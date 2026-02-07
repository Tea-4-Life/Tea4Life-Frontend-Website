import axiosClient from "@/lib/axios-client";
import type ApiResponse from "@/types/base/ApiResponse";
import type UserStatusResponse from "@/types/user/UserStatusResponse";

export const waitForUserSync = async (): Promise<boolean> => {
  const MAX_RETRIES = 10;
  for (let i = 0; i < MAX_RETRIES; i++) {
    try {
      const response = await axiosClient.get<ApiResponse<UserStatusResponse>>(
        `/user-service/users/exists`,
      );

      const { userStatus } = response.data.data;
      if (userStatus === "SUCCESS") return true;

      console.log(`[Tea4Life] Đồng bộ ${userStatus}... lần ${i + 1}`);
    } catch (err) {
      console.error("[Tea4Life] Đồng bộ thất bại", err);
    }
    await new Promise((resolve) => setTimeout(resolve, 1500));
  }
  return false;
};
