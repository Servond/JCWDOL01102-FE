import "@fontsource/roboto/100.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "@fontsource/roboto/900.css";

import { Route, Routes } from "react-router";
import AppWrapper from "./components/atoms/AppWrapper";
import BranchAdminProtect from "./components/atoms/BranchAdminRoute";
import PrivateRoute from "./components/atoms/PrivateRoute";
import AddAddressPage from "./pages/AddAddress/AddAddressPage";
import UpdateAddressPage from "./pages/AddAddress/UpdateAddress";
import AddressListPage from "./pages/AddressList/AddressListPage";
import AddProductPage from "./pages/Admin/Products/AddProductPage";
import ProductsPage from "./pages/Admin/Products/ProductsPage";
import UpdateProductPage from "./pages/Admin/Products/UpdateProduct";
import DummyLoginPage from "./pages/DummyLogin/DummyLoginPage";
import EmailNoticePage from "./pages/EmailNotice/EmailNoticePage";
import LandingPage from "./pages/LadingPage/LandingPage";
import MenuPage from "./pages/Menu/ProfilePage";
import MyDetailsPage from "./pages/MyDetails/MyDetails";
import NotFoundPage from "./pages/NotFoundPage";
import DashboardPage from "./pages/Dashboard/DashboardPage";
import UserManagementPage from "./pages/UserManagement/UserManagementPage";
import CreateAdminPage from "./pages/CreateAdmin/CreateAdminPage";
import ReportPage from "./pages/Report/ReportPage";
import SignupPage from "./pages/SignUp/SignupPage";
import UserVerification from "./pages/UserVerification/UserVerification";
import CategoryPage from "./pages/Admin/Category/CategoryPage";
import VoucherManagementPage from "./pages/VoucherManagement/VoucherMangementPage";
import CreateVoucherPage from "./pages/CreateVoucherPage/CreateVoucherPage";
import OrderPage from "./pages/order/OrderPage";
import NotificationPage from "./pages/Notification/NotificationPage";
import OrderDetailPage from "./pages/OrderDetail/OrderDetailPage";
import OrderManagementPage from "./pages/Admin/OrderManagement/OrderManagementPage";
import OrderDetailmanagementPage from "./pages/Admin/OrderManagement/OrderDetailmanagementPage";
import ProductDetailsPage from "./pages/ProductDetailPage/productDetailPage";
import SearchPage from "./pages/SearchPage/SearchPage";
import CartPage from "./pages/CartPage/CartPage";

function App() {
  return (
    <Routes>
      <Route element={<AppWrapper />}>
        <Route path='/email-notice' element={<EmailNoticePage />} />
        <Route
          path='/user-verification/:verifyToken'
          element={<UserVerification />}
        />
        <Route path='/' element={<LandingPage />} />
        <Route path='/signup' element={<SignupPage />} />
        <Route path='login' element={<DummyLoginPage />} />
        <Route path='/explore' element={<SearchPage />} />
        <Route path='/product-details' element={<ProductDetailsPage />} />
        <Route
          path='/cart'
          element={
            <PrivateRoute>
              <CartPage />
            </PrivateRoute>
          }
        />
        <Route path='/signup' element={<SignupPage />} />
        <Route path='login' element={<DummyLoginPage />} />
        <Route
          path='/menu'
          element={<PrivateRoute children={<MenuPage />} />}
        />
        <Route
          path='/my-details'
          element={<PrivateRoute children={<MyDetailsPage />} />}
        />
        <Route
          path='/my-address'
          element={<PrivateRoute children={<AddressListPage />} />}
        />
        <Route
          path='/order'
          element={<PrivateRoute children={<OrderPage />} />}
        />
        <Route
          path='/order/:invoiceNo'
          element={<PrivateRoute children={<OrderDetailPage />} />}
        />
        <Route
          path='/notifications'
          element={<PrivateRoute children={<NotificationPage />} />}
        />
        <Route
          path='/add-address'
          element={<PrivateRoute children={<AddAddressPage />} />}
        />
        <Route
          path='/update-address/:id'
          element={<PrivateRoute children={<UpdateAddressPage />} />}
        />
        <Route path='/dashboard' element={<DashboardPage />}>
          <Route
            path='/dashboard/user-management'
            element={<UserManagementPage />}
          />
          <Route path='/dashboard/create-admin' element={<CreateAdminPage />} />
          <Route path='/dashboard/report' element={<ReportPage />} />
          <Route
            path='/dashboard/products'
            element={<BranchAdminProtect children={<ProductsPage />} />}
          />
          <Route
            path='/dashboard/discount-management'
            element={
              <BranchAdminProtect children={<VoucherManagementPage />} />
            }
          />
          <Route
            path='/dashboard/create-discount'
            element={<BranchAdminProtect children={<CreateVoucherPage />} />}
          />
          <Route
            path='/dashboard/add-product'
            element={<BranchAdminProtect children={<AddProductPage />} />}
          />
          <Route
            path='/dashboard/update-product/:id'
            element={<BranchAdminProtect children={<UpdateProductPage />} />}
          />
          <Route
            path='/dashboard/categories'
            element={<BranchAdminProtect children={<CategoryPage />} />}
          />
          <Route
            path='/dashboard/order-management'
            element={<BranchAdminProtect children={<OrderManagementPage />} />}
          />
          <Route
            path='/dashboard/order-management/:invoiceId'
            element={
              <BranchAdminProtect children={<OrderDetailmanagementPage />} />
            }
          />
        </Route>
        <Route path='*' element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;
