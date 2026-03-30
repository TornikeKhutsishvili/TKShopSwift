import { createSelector, createSlice } from "@reduxjs/toolkit";
import type { IAdmin } from "../../../core/interfaces/admin.interface";
import type { RootState } from "../..";

type TypeError = string | null;

interface IAdminState {
  admin: IAdmin[];
  loading: boolean;
  error: TypeError;
}

export const initialState: IAdminState = {
  admin: [],
  loading: false,
  error: null,
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {},
});

export const adminStateSelector = (state: RootState) => state.admin;

export const adminSelector = createSelector(
  adminStateSelector,
  (state) => state.admin,
);

export const adminLoadingSelector = createSelector(
  adminStateSelector,
  (state) => state.loading,
);

export const adminErrorSelector = createSelector(
  adminStateSelector,
  (state) => state.error,
);

export default adminSlice.reducer;