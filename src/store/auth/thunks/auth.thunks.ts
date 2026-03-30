import { createAsyncThunk } from "@reduxjs/toolkit";
import type { IGeneral } from "../../../core/interfaces/general.interface";
const BASE_URL = `${import.meta.env.VITE_API_URL}/auth`;

// Get
export const getAuth = createAsyncThunk<
  IGeneral[],
  void,
  { rejectValue: string }
>("auth/getAuth", async (_, thunkAPI) => {
  try {
    const res = await fetch(BASE_URL);
    if (!res.ok) throw new Error();
    return await res.json();
  } catch {
    return thunkAPI.rejectWithValue("Failed to fetch auth");
  }
});

// Add
export const addAuth = createAsyncThunk<
  IGeneral,
  Omit<IGeneral, "id">,
  { rejectValue: string }
>("auth/addAuth", async (auth, thunkAPI) => {
  try {
    const res = await fetch(BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(auth),
    });
    return await res.json();
  } catch {
    return thunkAPI.rejectWithValue("Failed to add auth");
  }
});

// Update
export const updateAuth = createAsyncThunk<
  IGeneral,
  { id: number; auth: IGeneral },
  { rejectValue: string }
>("auth/updateAuth", async ({ id, auth }, thunkAPI) => {
  try {
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(auth),
    });
    return await res.json();
  } catch {
    return thunkAPI.rejectWithValue("Failed to update auth");
  }
});

// Delete
export const deleteAuth = createAsyncThunk<
  number,
  number,
  { rejectValue: string }
>("auth/deleteAuth", async (id, thunkAPI) => {
  try {
    await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });
    return id;
  } catch {
    return thunkAPI.rejectWithValue("Failed to delete auth");
  }
});