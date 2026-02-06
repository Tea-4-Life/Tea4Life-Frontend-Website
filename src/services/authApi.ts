import axios from "axios";
import type ApiResponse from "@/types/base/ApiResponse";
import type UserStatusResponse from "@/types/user/UserStatusResponse";

const USER_SERVICE_URL = import.meta.env.VITE_USER_SERVICE_BACKEND_BASE_URL;

export const waitForUserSync = async (email: string): Promise<boolean> => {
  const MAX_RETRIES = 10;
  for (let i = 0; i < MAX_RETRIES; i++) {
    try {
      const response = await axios.get<ApiResponse<UserStatusResponse>>(
        `${USER_SERVICE_URL}/api/v1/users/exists/${email}`,
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
