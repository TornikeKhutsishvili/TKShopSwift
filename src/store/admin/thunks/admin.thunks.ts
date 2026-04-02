import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAllUsersAPI, getAllCouriersAPI, deleteUserByAdminAPI, deleteCourierByAdminAPI, updateCourierScheduleAPI, getCourierBookingsAPI,
} from "../../../core/api/admin.api";
import type { IWorkingDays } from "../../../core/interfaces/courier.interface";

// USERS
export const getAllUsers = createAsyncThunk(
  "admin/getAllUsers",
  async (_, thunkAPI) => {
    try {
      return await getAllUsersAPI();
    } catch {
      return thunkAPI.rejectWithValue("Failed to fetch users");
    }
  }
);

// COURIERS
export const getAllCouriers = createAsyncThunk(
  "admin/getAllCouriers",
  async (_, thunkAPI) => {
    try {
      return await getAllCouriersAPI();
    } catch {
      return thunkAPI.rejectWithValue("Failed to fetch couriers");
    }
  }
);

// DELETE USER
export const deleteUserByAdmin = createAsyncThunk(
  "admin/deleteUser",
  async (id: string, thunkAPI) => {
    try {
      return await deleteUserByAdminAPI(id);
    } catch {
      return thunkAPI.rejectWithValue("Failed to delete user");
    }
  }
);

// DELETE COURIER
export const deleteCourierByAdmin = createAsyncThunk(
  "admin/deleteCourier",
  async (id: string, thunkAPI) => {
    try {
      return await deleteCourierByAdminAPI(id);
    } catch {
      return thunkAPI.rejectWithValue("Failed to delete courier");
    }
  }
);

// UPDATE COURIER SCHEDULE
export const updateCourierSchedule = createAsyncThunk(
  "admin/updateCourierSchedule",
  async (
    { id, workingDays }: { id: string; workingDays: IWorkingDays },
    thunkAPI
  ) => {
    try {
      return await updateCourierScheduleAPI(id, workingDays );
    } catch {
      return thunkAPI.rejectWithValue("Failed to update schedule");
    }
  }
);

// GET BOOKINGS
export const getCourierBookings = createAsyncThunk(
  "admin/getCourierBookings",
  async (courierId: string, thunkAPI) => {
    try {
      return await getCourierBookingsAPI(courierId);
    } catch {
      return thunkAPI.rejectWithValue("Failed to fetch bookings");
    }
  }
);