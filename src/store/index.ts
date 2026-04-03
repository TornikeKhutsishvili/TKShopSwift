import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from './auth/slice/auth.slice';
import usersReducer from "./users/slice/users.slice";
import couriersReducer from "./couriers/slice/couriers.slice";
import bookingReducer from "./booking/slice/booking.slice";

const rootReducer = combineReducers({
    auth: authReducer,
    users: usersReducer,
    couriers: couriersReducer,
    booking: bookingReducer,
})

export const store = configureStore({
    reducer: rootReducer,
    devTools: true,
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;