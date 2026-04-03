import { createSlice, createSelector } from "@reduxjs/toolkit";
import type { RootState } from "../..";
import type { IAuthUser } from "../../../core/interfaces/auth.interface";
import { login, register, loadCurrentUser, logoutUser } from "../thunks/auth.thunks";

interface IAuthState {
  user: IAuthUser | null;
  loading: boolean;
  error: string | null;
}

const initialState: IAuthState = {
  user: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearError(state) {
      state.error = null;
    },
    clearAuth(state) {
      state.user = null;
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    const handlePending = (state: IAuthState) => {
      state.loading = true;
      state.error = null;
    };

    const handleAuthFulfilled = (state: IAuthState, action: { payload: IAuthUser }) => {
      state.loading = false;
      state.user = action.payload;
      state.error = null;
    };

    const handleRejected = (state: IAuthState, action: { payload: string | undefined }) => {
      state.loading = false;
      state.error = action.payload ?? "Authentication failed";
    };

    builder.addCase(login.pending, handlePending);
    builder.addCase(login.fulfilled, handleAuthFulfilled);
    builder.addCase(login.rejected, handleRejected);

    builder.addCase(register.pending, handlePending);
    builder.addCase(register.fulfilled, handleAuthFulfilled);
    builder.addCase(register.rejected, handleRejected);

    builder.addCase(loadCurrentUser.pending, handlePending);
    builder.addCase(loadCurrentUser.fulfilled, handleAuthFulfilled);
    builder.addCase(loadCurrentUser.rejected, (state, action) => {
      state.user = null;
      state.loading = false;
      state.error = action.payload ?? "Failed to load current user";
    });

    builder.addCase(logoutUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(logoutUser.fulfilled, (state) => {
      state.user = null;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(logoutUser.rejected, handleRejected);
  },
});

export const { clearError, clearAuth } = authSlice.actions;

export const authStateSelector = (state: RootState) => state.auth;
export const authUserSelector = createSelector(authStateSelector, (state) => state.user);
export const authLoadingSelector = createSelector(authStateSelector, (state) => state.loading);
export const authErrorSelector = createSelector(authStateSelector, (state) => state.error);

export default authSlice.reducer;