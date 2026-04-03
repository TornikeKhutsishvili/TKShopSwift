import { createSelector, createSlice } from "@reduxjs/toolkit";
import { getCouriers, addCourier, updateCourier, deleteCourier } from "../thunks/couriers.thunks";
import type { RootState } from "../..";
import type { ICourier } from "../../../core/interfaces/courier.interface";

type TypeError = string | null;

interface ICouriersState {
  couriers: ICourier[];
  loading: boolean;
  error: TypeError;
}

export const initialState: ICouriersState = {
  couriers: [],
  loading: false,
  error: null,
};

const couriersSlice = createSlice({
  name: "couriers",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // GET
    builder.addCase(getCouriers.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getCouriers.fulfilled, (state, action) => {
      state.couriers = action.payload;
      state.loading = false;
    });
    builder.addCase(getCouriers.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || "Failed to fetch couriers";
    });

    // ADD
    builder.addCase(addCourier.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(addCourier.fulfilled, (state, action) => {
      state.couriers.push(action.payload);
    });
    builder.addCase(addCourier.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || "Failed to add courier";
    });

    // UPDATE
    builder.addCase(updateCourier.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(updateCourier.fulfilled, (state, action) => {
      const index = state.couriers.findIndex((c) => c.pid === action.payload.pid);
      if (index !== -1) state.couriers[index] = action.payload;
    });
    builder.addCase(updateCourier.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || "Failed to update courier";
    });


    // DELETE
    builder.addCase(deleteCourier.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(deleteCourier.fulfilled, (state, action) => {
      state.couriers = state.couriers.filter((c) => c.id !== action.payload);
    });
    builder.addCase(deleteCourier.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || "Failed to delete courier";
    });
  },
});

export const couriersStateSelector = (couriersState: RootState) => couriersState.couriers;

export const couriersSelector = createSelector(couriersStateSelector, (couriersState) => couriersState.couriers);
export const couriersLoadingSelector = createSelector(couriersStateSelector, (couriersState) => couriersState.loading);
export const couriersErrorSelector = createSelector(couriersStateSelector, (couriersState) => couriersState.error);

export default couriersSlice.reducer;