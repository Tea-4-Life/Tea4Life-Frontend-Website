import { useAppSelector } from "../store";

export const useAuth = () => {
  const auth = useAppSelector((state) => state.auth);

  return {
    ...auth,
    isAdmin: auth.roles.includes("ROLE_ADMIN"),
    isDriver: auth.roles.includes("ROLE_DRIVER"),
    isLoading: auth.isFetchingRole || !auth.initialized,
  };
};
