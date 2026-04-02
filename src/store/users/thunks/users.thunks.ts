import { createAsyncThunk } from "@reduxjs/toolkit";
import type { IUser } from "../../../core/interfaces/user.interface";
import { getUsersAPI, addUserAPI, updateUserAPI, deleteUserAPI } from "../../../core/api/users.api";

// GET
export const getUsers = createAsyncThunk<
  IUser[],
  void,
  { rejectValue: string }
>("users/getUsers", async (_, thunkAPI) => {
  try {
    return await getUsersAPI();
  } catch {
    return thunkAPI.rejectWithValue("Failed to fetch users");
  }
});

// ADD
export const addUser = createAsyncThunk<
  IUser,
  Omit<IUser, "id">,
  { rejectValue: string }
>("users/addUser", async (user, thunkAPI) => {
  try {
    return await addUserAPI(user);
  } catch {
    return thunkAPI.rejectWithValue("Failed to add user");
  }
});

// UPDATE
export const updateUser = createAsyncThunk<
  IUser,
  { id: string; user: IUser },
  { rejectValue: string }
>("users/updateUser", async ({ id, user }, thunkAPI) => {
  try {
    return await updateUserAPI(id, user);
  } catch {
    return thunkAPI.rejectWithValue("Failed to update user");
  }
});

// DELETE
export const deleteUser = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>("users/deleteUser", async (id, thunkAPI) => {
  try {
    return await deleteUserAPI(id);
  } catch {
    return thunkAPI.rejectWithValue("Failed to delete user");
  }
});