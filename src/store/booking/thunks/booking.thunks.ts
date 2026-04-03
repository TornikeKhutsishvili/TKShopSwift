import { createAsyncThunk } from "@reduxjs/toolkit";
import { getBookingsAPI, addBookingAPI, deleteBookingAPI } from "../../../core/api/booking.api";
import type { IBooking } from "../../../core/interfaces/booking.interface";


// GET BOOKINGS
export const getBookings = createAsyncThunk<IBooking[], { userId?: string; courierId?: string }, { rejectValue: string }>(
  "booking/getBookings",
  async (filter, thunkAPI) => {
    try {
      return await getBookingsAPI(filter);
    } catch {
      return thunkAPI.rejectWithValue("Failed to fetch bookings");
    }
  }
);

// ADD BOOKING
export const addBooking = createAsyncThunk<IBooking, Omit<IBooking, "id">, { rejectValue: string }>(
  "booking/addBooking",
  async (booking, thunkAPI) => {
    try {
      return await addBookingAPI(booking);
    } catch {
      return thunkAPI.rejectWithValue("Failed to add booking");
    }
  }
);

// DELETE BOOKING
export const deleteBooking = createAsyncThunk<string, string, { rejectValue: string }>(
  "booking/deleteBooking",
  async (id, thunkAPI) => {
    try {
      return await deleteBookingAPI(id);
    } catch {
      return thunkAPI.rejectWithValue("Failed to delete booking");
    }
  }
);