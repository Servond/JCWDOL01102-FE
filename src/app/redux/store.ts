import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../redux/slice/userSlicer";
import changeProfileReducer from "../redux/slice/MyDetails/Profile/changeProfileSlice";
import addressListReducer from "../redux/slice/AddressList/addressListSlice";
import { user2Reducer } from "./slice/User/user";
import provinceReducer from "./slice/MasterData/ProvinceSlice";
import citiesReducer from "./slice/MasterData/CitiesSlice";
import addProductReducer from "./slice/Admin/AddProduct/AddProductSlice";
import getAdminProductReducer from "./slice/Admin/getProduct/getProductSlice";
import adminCategoryReducer from "./slice/Admin/category/AdminCategorySlice";
import loginReducer from "./slice/User/login";
import animationReducer from "./slice/Animation/animationSlice";
import userManagementReducer from "./slice/Admin/userManagement/adminManagement";
import createAdminReducer from "./slice/Admin/userManagement/createAdmin";
export type AppDispatch = typeof store.dispatch;
import deleteAdminReducer from "./slice/Admin/userManagement/deleteAdmin";
export type RootState = ReturnType<typeof store.getState>;

export const store = configureStore({
  reducer: {
    user: userReducer,
    changeProfile: changeProfileReducer,
    addressList: addressListReducer,
    user2: user2Reducer,
    province: provinceReducer,
    cities: citiesReducer,
    addProduct: addProductReducer,
    getAdminProduct: getAdminProductReducer,
    adminCategory: adminCategoryReducer,
    login: loginReducer,
    animation: animationReducer,
    userManagement: userManagementReducer,
    createAdmin: createAdminReducer,
    deleteAdmin: deleteAdminReducer,
  },
});
