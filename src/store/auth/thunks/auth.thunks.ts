import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  registerWithEmailPassword, fetchUserProfileByUid, signOutUser,
  loginWithEmailPassword, updateUserProfile
} from "../../../core/api/auth.api";
import { createSession, endSession } from "../../../core/services/session";
import type { IAuthUser, IRegisterPayload } from "../../../core/interfaces/auth.interface";
import type { RootState } from "../..";

export const login = createAsyncThunk<
  IAuthUser,
  { email: string; password: string },
  { rejectValue: string }
>(
  "auth/login",
  async ({ email, password }, thunkAPI) => {
    try {
      const user = await loginWithEmailPassword(email, password);

      await createSession(user.id);

      return user;
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

export const logoutUser = createAsyncThunk<
  void,
  void,
  { rejectValue: string }
>(
  "auth/logout",
  async (_, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as RootState;
      const currentUser = state.auth.user;
      const sessionId = localStorage.getItem("sessionId");

      if (currentUser && sessionId) {
        await endSession(currentUser.id, sessionId);
        localStorage.removeItem("sessionId");
      }

      await signOutUser();
    } catch (error) {
      const message = error instanceof Error ? error.message : "Logout failed";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updateCurrentUser = createAsyncThunk<IAuthUser, Partial<IAuthUser>, { rejectValue: string }>(
  "auth/updateCurrentUser",
  async (updates, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as RootState;
      const currentUser = state.auth.user;
      if (!currentUser) {
        throw new Error("No current user");
      }
      return await updateUserProfile(currentUser.id, updates);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to update user profile";
      return thunkAPI.rejectWithValue(message);
    }
  }
);
