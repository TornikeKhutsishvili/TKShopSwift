import { createAsyncThunk } from "@reduxjs/toolkit";
import { addCourierAPI, deleteCourierAPI, getCouriersAPI, updateCourierAPI } from "../../../core/api/couriers.api";
import type { ICourier } from "../../../core/interfaces/courier.interface";

// GET
export const getCouriers = createAsyncThunk<
  ICourier[],
  void,
  { rejectValue: string }
>("couriers/getCouriers", async (_, thunkAPI) => {
  try {
    return await getCouriersAPI();
  } catch {
    return thunkAPI.rejectWithValue("Failed to fetch couriers");
  }
});

// ADD
export const addCourier = createAsyncThunk<
  ICourier,
  Omit<ICourier, "id">,
  { rejectValue: string }
>("couriers/addCourier", async (courier, thunkAPI) => {
  try {
    return await addCourierAPI(courier);
  } catch {
    return thunkAPI.rejectWithValue("Failed to add courier");
  }
});

// UPDATE
export const updateCourier = createAsyncThunk<
  ICourier,
  { id: string; courier: ICourier },
  { rejectValue: string }
>("couriers/updateCourier", async ({ id, courier }, thunkAPI) => {
  try {
    return await updateCourierAPI(id, courier);
  } catch {
    return thunkAPI.rejectWithValue("Failed to update courier");
  }
});

// DELETE
export const deleteCourier = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>("couriers/deleteCourier", async (id, thunkAPI) => {
  try {
    return await deleteCourierAPI(id);
  } catch {
    return thunkAPI.rejectWithValue("Failed to delete courier");
  }
});