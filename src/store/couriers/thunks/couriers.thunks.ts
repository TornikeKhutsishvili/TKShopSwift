import { createAsyncThunk } from "@reduxjs/toolkit";
import type { ICourier } from "../../../core/interfaces/courier.interface";
const BASE_URL = `${import.meta.env.VITE_API_URL}/couriers`;

// Get
export const getCouriers = createAsyncThunk<
  ICourier[],
  void,
  { rejectValue: string }
>("couriers/getCouriers", async (_, thunkAPI) => {
  try {
    const res = await fetch(BASE_URL);
    if (!res.ok) throw new Error();
    return await res.json();
  } catch {
    return thunkAPI.rejectWithValue("Failed to fetch couriers");
  }
});

// Add
export const addCourier = createAsyncThunk<
  ICourier,
  Omit<ICourier, "id">,
  { rejectValue: string }
>("couriers/addCourier", async (courier, thunkAPI) => {
  try {
    const res = await fetch(BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(courier),
    });
    return await res.json();
  } catch {
    return thunkAPI.rejectWithValue("Failed to add courier");
  }
});

// Update
export const updateCourier = createAsyncThunk<
  ICourier,
  { id: number; courier: ICourier },
  { rejectValue: string }
>("couriers/updateCourier", async ({ id, courier }, thunkAPI) => {
  try {
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(courier),
    });
    return await res.json();
  } catch {
    return thunkAPI.rejectWithValue("Failed to update courier");
  }
});

// Delete
export const deleteCourier = createAsyncThunk<
  number,
  number,
  { rejectValue: string }
>("couriers/deleteCourier", async (id, thunkAPI) => {
  try {
    await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });
    return id;
  } catch {
    return thunkAPI.rejectWithValue("Failed to delete courier");
  }
});