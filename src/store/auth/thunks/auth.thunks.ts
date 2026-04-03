import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  registerWithEmailPassword, fetchUserProfileByUid, signOutUser, loginWithEmailPassword
} from "../../../core/api/auth.api";
import type { IAuthUser, IRegisterPayload } from "../../../core/interfaces/auth.interface";


export const login = createAsyncThunk<IAuthUser, { email: string; password: string }, { rejectValue: string }>(
  "auth/login",
  async ({ email, password }, thunkAPI) => {
    try {
      return await loginWithEmailPassword(email, password);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Login failed";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const register = createAsyncThunk<IAuthUser, IRegisterPayload, { rejectValue: string }>(
  "auth/register",
  async (payload, thunkAPI) => {
    try {
      return await registerWithEmailPassword(payload);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Registration failed";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const loadCurrentUser = createAsyncThunk<IAuthUser, string, { rejectValue: string }>(
  "auth/loadCurrentUser",
  async (uid, thunkAPI) => {
    try {
      return await fetchUserProfileByUid(uid);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to load current user";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const logoutUser = createAsyncThunk<void, void, { rejectValue: string }>(
  "auth/logout",
  async (_, thunkAPI) => {
    try {
      await signOutUser();
    } catch (error) {
      const message = error instanceof Error ? error.message : "Logout failed";
      return thunkAPI.rejectWithValue(message);
    }
  }
);
