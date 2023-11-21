import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../redux/slice/userSlicer";
import changeProfileReducer from "../redux/slice/MyDetails/Profile/changeProfileSlice";

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export const store = configureStore({
  reducer: {
    user: userReducer,
    changeProfile: changeProfileReducer,
  },
});
