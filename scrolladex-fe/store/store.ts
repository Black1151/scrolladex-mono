import { configureStore } from "@reduxjs/toolkit";
import employeeReducer from "./employeeSlice";
import departmentReducer from "./departmentSlice";

export const store = configureStore({
  reducer: {
    employee: employeeReducer,
    department: departmentReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
