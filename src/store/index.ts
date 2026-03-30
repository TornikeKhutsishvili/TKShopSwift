import { combineReducers, configureStore } from "@reduxjs/toolkit";

const rootReducer = combineReducers({
    admin: AdminReducer,
    users: UsersReducer,
    couriers: CouriersReducer,
})

export const store = configureStore({
    reducer: rootReducer,
    devTools: true,
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;