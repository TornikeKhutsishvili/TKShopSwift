import { createAsyncThunk } from "@reduxjs/toolkit";
import type { IUser } from "../../../core/interfaces/user.interface";
const BASE_URL = `${import.meta.env.VITE_API_URL}/users`;

// Get
export const getUsers = createAsyncThunk<
  IUser[],
  void,
  { rejectValue: string }
>("users/getUsers", async (_, thunkAPI) => {
  try {
    const res = await fetch(BASE_URL);
    if (!res.ok) throw new Error();
    return await res.json();
  } catch {
    return thunkAPI.rejectWithValue("Failed to fetch users");
  }
});

// Add
export const addUser = createAsyncThunk<
  IUser,
  Omit<IUser, "id">,
  { rejectValue: string }
>("users/addUser", async (user, thunkAPI) => {
  try {
    const res = await fetch(BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });
    return await res.json();
  } catch {
    return thunkAPI.rejectWithValue("Failed to add user");
  }
});

// Update
export const updateUser = createAsyncThunk<
  IUser,
  { id: number; user: IUser },
  { rejectValue: string }
>("users/updateUser", async ({ id, user }, thunkAPI) => {
  try {
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });
    return await res.json();
  } catch {
    return thunkAPI.rejectWithValue("Failed to update user");
  }
});

// Delete
export const deleteUser = createAsyncThunk<
  number,
  number,
  { rejectValue: string }
>("users/deleteUser", async (id, thunkAPI) => {
  try {
    await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });
    return id;
  } catch {
    return thunkAPI.rejectWithValue("Failed to delete user");
  }
});