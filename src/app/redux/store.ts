import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../redux/slice/userSlicer";
import changeProfileReducer from "../redux/slice/MyDetails/Profile/changeProfileSlice";
import addressListReducer from "../redux/slice/AddressList/addressListSlice";
import { user2Reducer } from "./slice/User/user";

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export const store = configureStore({
  reducer: {
    user: userReducer,
    changeProfile: changeProfileReducer,
    addressList: addressListReducer,
    user2: user2Reducer,
  },
});
