import { combineReducers, configureStore } from "@reduxjs/toolkit";
import adminReducer from './admin/slice/admin.slice';
import usersReducer from "./users/slice/users.slice";
import couriersReducer from "./couriers/slice/couriers.slice";

const rootReducer = combineReducers({
    admin: adminReducer,
    users: usersReducer,
    couriers: couriersReducer,
})

export const store = configureStore({
    reducer: rootReducer,
    devTools: true,
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;