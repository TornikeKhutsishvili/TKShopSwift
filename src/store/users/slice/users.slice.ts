import { createSelector, createSlice } from "@reduxjs/toolkit";
import { addUser, deleteUser, getUsers, updateUser } from "../thunks/users.thunks";
import type { IUser } from "../../../core/interfaces/user.interface";
import type { RootState } from "../..";

type TypeError = string | null;

interface IUsersState {
  users: IUser[];
  loading: boolean;
  error: TypeError;
}

export const initialState: IUsersState = {
  users: [],
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers(builder) {
    // GET
    builder.addCase(getUsers.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getUsers.fulfilled, (state, action) => {
      state.loading = false;
      state.users = action.payload;
    });
    builder.addCase(getUsers.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || "Failed to fetch users";
    });

    // ADD
    builder.addCase(addUser.fulfilled, (state, action) => {
      state.users.push(action.payload);
    })

    // UPDATE
    builder.addCase(updateUser.fulfilled, (state, action) => {
      const index = state.users.findIndex((u) => u.pid === action.payload.pid);
      if (index !== -1) state.users[index] = action.payload;
    })

    // DELETE
    builder.addCase(deleteUser.fulfilled, (state, action) => {
      state.users = state.users.filter((u) => u.pid !== action.payload);
    });
  }
});

export const usersStateSelector = (state: RootState) => state.users;

export const usersSelector = createSelector(
  usersStateSelector,
  (state) => state.users,
);

export const usersLoadingSelector = createSelector(
  usersStateSelector,
  (state) => state.loading,
);

export const usersErrorSelector = createSelector(
  usersStateSelector,
  (state) => state.error,
);

export default userSlice.reducer;