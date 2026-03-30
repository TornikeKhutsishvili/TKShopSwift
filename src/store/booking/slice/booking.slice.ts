import { createSelector, createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../..";
import type { IBooking } from "../../../core/interfaces/booking.interface";

type TypeError = string | null;

interface IBookingsState {
  bookings: IBooking[];
  loading: boolean;
  error: TypeError;
}

export const initialState: IBookingsState = {
  bookings: [],
  loading: false,
  error: null,
};

const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {},
});

export const bookingStateSelector = (state: RootState) => state.booking;

export const bookingSelector = createSelector(
  bookingStateSelector,
  (state) => state.bookings,
);

export const bookingLoadingSelector = createSelector(
  bookingStateSelector,
  (state) => state.loading,
);

export const bookingErrorSelector = createSelector(
  bookingStateSelector,
  (state) => state.error,
);

export default bookingSlice.reducer;