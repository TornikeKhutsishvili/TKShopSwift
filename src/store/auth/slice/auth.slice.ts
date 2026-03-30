import { createSelector, createSlice } from "@reduxjs/toolkit";
import type { IAuth } from "../../../core/interfaces/auth.interface";
import type { RootState } from "../..";

type TypeError = string | null;

interface IAuthState {
  auth: IAuth[];
  loading: boolean;
  error: TypeError;
}

export const initialState: IAuthState = {
  auth: [],
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
});

export const authStateSelector = (state: RootState) => state.auth;

export const authSelector = createSelector(
  authStateSelector,
  (state) => state.auth,
);

export const authLoadingSelector = createSelector(
  authStateSelector,
  (state) => state.loading,
);

export const authErrorSelector = createSelector(
  authStateSelector,
  (state) => state.error,
);

export default authSlice.reducer;