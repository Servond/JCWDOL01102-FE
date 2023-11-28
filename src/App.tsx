import "@fontsource/roboto/100.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "@fontsource/roboto/900.css";

import { Route, Routes } from "react-router";
import AppWrapper from "./components/atoms/AppWrapper";
import EmailNoticePage from "./pages/EmailNotice/EmailNoticePage";
import UserVerification from "./pages/UserVerification/UserVerification";
import AddAddressPage from "./pages/AddAddress/AddAddressPage";
import AddressListPage from "./pages/AddressList/AddressListPage";
import MenuPage from "./pages/Menu/ProfilePage";
import MyDetailsPage from "./pages/MyDetails/MyDetails";
import SignupPage from "./pages/SignUp/SignupPage";
import UpdateAddressPage from "./pages/AddAddress/UpdateAddress";
import DummyLoginPage from "./pages/DummyLogin/DummyLoginPage";
import LandingPage from "./pages/LadingPage/LandingPage";
import PrivateRoute from "./components/atoms/PrivateRoute";

function App() {
  return (
    <Routes>
      <Route element={<AppWrapper />}>
        <Route path="/email-notice" element={<EmailNoticePage />} />
        <Route
          path="/user-verification/:verifyToken"
          element={<UserVerification />}
        />
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="login" element={<DummyLoginPage />} />
        <Route
          path="/menu"
          element={
            <PrivateRoute>
              <MenuPage />
            </PrivateRoute>
          }
        />
        <Route path="/my-details" element={<MyDetailsPage />} />
        <Route path="/my-address" element={<AddressListPage />} />
        <Route path="/add-address" element={<AddAddressPage />} />
        <Route path="/update-address/:id" element={<UpdateAddressPage />} />
      </Route>
    </Routes>
  );
}

export default App;
