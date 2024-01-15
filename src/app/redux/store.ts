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
import deleteAdminReducer from "./slice/Admin/userManagement/deleteAdmin";
import updateAdminReducer from "./slice/Admin/userManagement/updateAdmin";
import getAdminProductByBranchReducer from "./slice/Admin/getProduct/getProductByBranch";
import createVoucherReducer from "./slice/Admin/discount/createVoucher";
import createPromotionReducer from "./slice/Admin/discount/createPromotion";
import getVoucherPaginate from "./slice/Admin/discount/getVoucher";
import getPromotionPaginateReducer from "./slice/Admin/discount/getPromo";
import applyButtonReducer from "./slice/Admin/discount/productApplyButton";
import manageProductVoucherReducer from "./slice/Admin/discount/manageProductVoucher";
import discountTabsReducer from "./slice/Admin/discount/discountTabs";
import deleteVoucherReducer from "./slice/Admin/discount/deleteVoucher";
import deletePromotionReducer from "./slice/Admin/discount/deletePromotion";
import NavbarReducer from "./slice/Navbar/Navbar";
import landingpageCategoryReducer from "./slice/LandingPage/categories";
import getNearestBranchReducer from "./slice/LandingPage/getNearestBranch";
import courierPriceReducer from "./slice/Order/ShippingPriceSlice";
import orderReducer from "./slice/Order/OrderSlice";
import orderManagementReducer from "./slice/Admin/orderManagement/orderManagementSlice";
import orderDetailDashboardReducer from "./slice/Admin/orderManagement/orderDetailSlice";
import getCategoriesWithLimit from "./slice/Explore/getCategoriesWithLimit";
import getLandingpageProductReducer from "./slice/Explore/productPagination";
import getProductRecommendationReducer from "./slice/LandingPage/productRecommendation";
import getLandingpageCategoriesReducer from "./slice/LandingPage/getLandingpageCategories";
import manageCartReducer from "./slice/cart/manageCart";
import getCartReducer from "./slice/cart/getProductCart";
import clearCartReducer from "./slice/cart/clearCart";
import updateuserReducer from "./slice/User/updateUser";
import getOrderDetailReducer from "./slice/OrderDetail/OrderDetailSlice";
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export const store = configureStore({
  reducer: {
    navbar: NavbarReducer,
    landingpageCategory: landingpageCategoryReducer,
    user: userReducer,
    changeProfile: changeProfileReducer,
    addressList: addressListReducer,
    user2: user2Reducer,
    province: provinceReducer,
    cities: citiesReducer,
    addProduct: addProductReducer,
    getAdminProduct: getAdminProductReducer,
    getAdminProductByBranch: getAdminProductByBranchReducer,
    adminCategory: adminCategoryReducer,
    login: loginReducer,
    animation: animationReducer,
    userManagement: userManagementReducer,
    createAdmin: createAdminReducer,
    deleteAdmin: deleteAdminReducer,
    updateAdmin: updateAdminReducer,
    createVoucher: createVoucherReducer,
    createPromotion: createPromotionReducer,
    getVoucher: getVoucherPaginate,
    getPromotion: getPromotionPaginateReducer,
    applyButton: applyButtonReducer,
    manageProductVoucher: manageProductVoucherReducer,
    discountTab: discountTabsReducer,
    deleteVoucher: deleteVoucherReducer,
    deletePromotoin: deletePromotionReducer,
    nearestBranch: getNearestBranchReducer,
    getCategoriesWithLimit: getCategoriesWithLimit,
    courierPrice: courierPriceReducer,
    order: orderReducer,
    orderManagement: orderManagementReducer,
    orderDetailDashboard: orderDetailDashboardReducer,
    landingpageProduct: getLandingpageProductReducer,
    productRecommendation: getProductRecommendationReducer,
    landingPageCategories: getLandingpageCategoriesReducer,
    manageCart: manageCartReducer,
    getCart: getCartReducer,
    clearCart: clearCartReducer,
    updateUser: updateuserReducer,
    getOrderDetail: getOrderDetailReducer,
  },
});
