import { createSlice, createSelector } from "@reduxjs/toolkit";
import { getBookings, addBooking, deleteBooking } from "../thunks/booking.thunks";
import type { IBooking } from "../../../core/interfaces/booking.interface";
import type { RootState } from "../..";

interface IBookingState {
  bookings: IBooking[];
  loading: boolean;
  error: string | null;
}

const initialState: IBookingState = {
  bookings: [],
  loading: false,
  error: null,
};

const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // GET
    builder.addCase(getBookings.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getBookings.fulfilled, (state, action) => {
      state.loading = false;
      state.bookings = action.payload;
    });
    builder.addCase(getBookings.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload ?? "Failed to fetch bookings";
    });

    // ADD
    builder.addCase(addBooking.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(addBooking.fulfilled, (state, action) => {
      state.bookings.push(action.payload);
    });
    builder.addCase(addBooking.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload ?? "Failed to add booking";
    });

    // DELETE
    builder.addCase(deleteBooking.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(deleteBooking.fulfilled, (state, action) => {
      state.bookings = state.bookings.filter((b) => b.id !== action.payload);
    });
    builder.addCase(deleteBooking.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload ?? "Failed to delete booking";
    });
  },
});

export const bookingStateSelector = (state: RootState) => state.booking;
export const bookingsSelector = createSelector(bookingStateSelector, (state) => state.bookings);
export const bookingsLoadingSelector = createSelector(bookingStateSelector, (state) => state.loading);
export const bookingsErrorSelector = createSelector(bookingStateSelector, (state) => state.error);

export default bookingSlice.reducer;