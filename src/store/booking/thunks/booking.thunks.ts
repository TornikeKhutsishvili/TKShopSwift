import { createAsyncThunk } from "@reduxjs/toolkit";
import type { IBooking } from "../../../core/interfaces/booking.interface";
const BASE_URL = `${import.meta.env.VITE_API_URL}/couriers`;

// Get
export const getBooking = createAsyncThunk<
  IBooking[],
  void,
  { rejectValue: string }
>("bookings/getBookings", async (_, thunkAPI) => {
  try {
    const res = await fetch(BASE_URL);
    if (!res.ok) throw new Error();
    return await res.json();
  } catch {
    return thunkAPI.rejectWithValue("Failed to fetch bookings");
  }
});

// Add
export const addBooking = createAsyncThunk<
  IBooking,
  Omit<IBooking, "id">,
  { rejectValue: string }
>("bookings/addBooking", async (booking, thunkAPI) => {
  try {
    const res = await fetch(BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(booking),
    });
    return await res.json();
  } catch {
    return thunkAPI.rejectWithValue("Failed to add booking");
  }
});

// Update
export const updateBooking = createAsyncThunk<
  IBooking,
  { id: number; booking: IBooking },
  { rejectValue: string }
>("bookings/updateBooking", async ({ id, booking }, thunkAPI) => {
  try {
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(booking),
    });
    return await res.json();
  } catch {
    return thunkAPI.rejectWithValue("Failed to update booking");
  }
});

// Delete
export const deleteBooking = createAsyncThunk<
  number,
  number,
  { rejectValue: string }
>("bookings/deleteBooking", async (id, thunkAPI) => {
  try {
    await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });
    return id;
  } catch {
    return thunkAPI.rejectWithValue("Failed to delete booking");
  }
});