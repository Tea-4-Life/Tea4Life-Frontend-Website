import axiosClient from "@/lib/axios-client";
import type ApiResponse from "@/types/base/ApiResponse";
import type { OnboardingRequest } from "@/types/user/OnboardingRequest";
import type UserStatusResponse from "@/types/user/UserStatusResponse";

export const checkUserStatusApi =
  async (): Promise<UserStatusResponse | null> => {
    const MAX_RETRIES = 10;
    for (let i = 0; i < MAX_RETRIES; i++) {
      try {
        const response = await axiosClient.get<ApiResponse<UserStatusResponse>>(
          `/user-service/users/exists`,
        );

        const data = response.data.data;
        if (data.userStatus === "SUCCESS") return data;

        console.log(`[Tea4Life] Đồng bộ ${data.userStatus}... lần ${i + 1}`);
      } catch (err) {
        console.error("[Tea4Life] Đồng bộ thất bại", err);
      }
      await new Promise((resolve) => setTimeout(resolve, 1500));
    }
    return null;
  };

export const processOnboardingApi = async (data: OnboardingRequest) => {
  return await axiosClient.post<ApiResponse<void>>(
    `/user-service/users/onboarding`,
    data,
  );
};
