import { createAsyncThunk } from "@reduxjs/toolkit";
import { checkUserStatusApi, processOnboardingApi } from "@/services/authApi";
import type { OnboardingRequest } from "@/types/user/OnboardingRequest";
import type UserStatusResponse from "@/types/user/UserStatusResponse";

/**
 * Thunk 1: Khởi tạo trạng thái User (Dùng ở main.tsx)
 * Luồng: Gọi API check status -> Trả về data cho extraReducers cập nhật state
 */
export const initializeAuthStatus = createAsyncThunk<
  UserStatusResponse | null,
  void
>("auth/initializeStatus", async () => {
  const status = await checkUserStatusApi();
  return status;
});

/**
 * Thunk 2: Thực hiện Onboarding (Dùng ở trang Onboarding)
 * Luồng: Submit Form -> Gọi lại check status để lấy dữ liệu mới nhất từ DB
 */
export const executeOnboarding = createAsyncThunk<
  UserStatusResponse | null,
  OnboardingRequest
>("auth/executeOnboarding", async (onboardingData) => {
  await processOnboardingApi(onboardingData);
  const updatedStatus = await checkUserStatusApi();
  return updatedStatus;
});
