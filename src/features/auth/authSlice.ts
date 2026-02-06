import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  isAuthenticated: boolean;
  email: string | null;
  roles: string;
  isFetchingRole: boolean;
  initialized: boolean;
}

const initialState: AuthState = {
  isAuthenticated: false,
  email: null,
  roles: "",
  isFetchingRole: false,
  initialized: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoadingRole: (state) => {
      state.isFetchingRole = true;
    },
    setAuthSuccess: (
      state,
      action: PayloadAction<{ email: string; roles: string }>,
    ) => {
      state.isAuthenticated = true;
      state.email = action.payload.email;
      state.roles = action.payload.roles;
      state.isFetchingRole = false;
      state.initialized = true;
    },
    setAuthFailure: (state) => {
      state.isAuthenticated = false;
      state.initialized = true;
    },
    clearAuth: () => ({ ...initialState, initialized: true }),
  },
});

export const { setLoadingRole, setAuthSuccess, setAuthFailure, clearAuth } =
  authSlice.actions;
export default authSlice.reducer;
