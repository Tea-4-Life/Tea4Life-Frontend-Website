export default interface UserStatusResponse {
  userStatus: "SUCCESS" | "PROCESSING" | "NOT_FOUND";
  existed: boolean;
  onboarded: boolean;
  email: string | null;
  role: string | null;
}
