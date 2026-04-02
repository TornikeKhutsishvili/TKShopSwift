import { createSelector, createSlice } from "@reduxjs/toolkit";
import {
  getAllUsers, getAllCouriers, deleteUserByAdmin, deleteCourierByAdmin, updateCourierSchedule, getCourierBookings
} from "../thunks/admin.thunks";
import type { IUser } from "../../../core/interfaces/user.interface";
import type { ICourier } from "../../../core/interfaces/courier.interface";
import type { IBooking } from "../../../core/interfaces/booking.interface";

interface IAdminState {
  users: IUser[];
  couriers: ICourier[];
  bookings: IBooking[];
  loading: boolean;
  error: string | null;
}

const initialState: IAdminState = {
  users: [],
  couriers: [],
  bookings: [],
  loading: false,
  error: null,
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // GET
    builder.addCase(getAllUsers.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getAllUsers.fulfilled, (state, action) => {
      state.loading = false;
      state.users = action.payload;
    });
    builder.addCase(getAllCouriers.fulfilled, (state, action) => {
      state.couriers = action.payload;
    });

    // DELETE
    builder.addCase(deleteUserByAdmin.fulfilled, (state, action) => {
      state.users = state.users.filter((u) => u.id !== action.payload);
    });
    builder.addCase(deleteCourierByAdmin.fulfilled, (state, action) => {
      state.couriers = state.couriers.filter((c) => c.id !== action.payload);
    });

    // UPDATE
    builder.addCase(updateCourierSchedule.fulfilled, (state, action) => {
      const index = state.couriers.findIndex((c) => c.id === action.payload.id);
      if (index !== -1) state.couriers[index].workingDays = action.payload.workingDays;
    });
    builder.addCase(getCourierBookings.fulfilled, (state, action) => {
      state.bookings = action.payload;
    });
  },
});

// Admin State Selector
export const adminStateSelector = (adminState: { admin: IAdminState }) => adminState.admin;

// Users
export const adminUsersSelector = createSelector(adminStateSelector, (adminState) => adminState.users);
export const adminUsersLoadingSelector = createSelector(adminStateSelector, (adminState) => adminState.loading);
export const adminUsersErrorSelector = createSelector(adminStateSelector, (adminState) => adminState.error);

// Couriers
export const adminCouriersSelector = createSelector(adminStateSelector, (adminState) => adminState.couriers);
export const adminCouriersLoadingSelector = createSelector(adminStateSelector, (adminState) => adminState.loading);
export const adminCouriersErrorSelector = createSelector(adminStateSelector, (adminState) => adminState.error);

// Bookings
export const adminBookingsSelector = createSelector(adminStateSelector, (adminState) => adminState.bookings);
export const adminBookingsLoadingSelector = createSelector(adminStateSelector, (adminState) => adminState.loading);
export const adminBookingsErrorSelector = createSelector(adminStateSelector, (adminState) => adminState.error);

export default adminSlice.reducer;