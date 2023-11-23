import "@fontsource/roboto/100.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "@fontsource/roboto/900.css";

import { Route, Routes } from "react-router";
import AppWrapper from "./components/atoms/AppWrapper";
import AddAddressPage from "./pages/AddAddress/AddAddressPage";
import AddressListPage from "./pages/AddressList/AddressListPage";
import MenuPage from "./pages/Menu/ProfilePage";
import MyDetailsPage from "./pages/MyDetails/MyDetails";
import SignupPage from "./pages/SignupPage";
import UpdateAddressPage from "./pages/AddAddress/UpdateAddress";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  return (
    <Routes>
      <Route element={<AppWrapper />}>
        <Route path='/' element={<SignupPage />} />
        <Route path='/menu' element={<MenuPage />} />
        <Route path='/my-details' element={<MyDetailsPage />} />
        <Route path='/my-address' element={<AddressListPage />} />
        <Route path='/add-address' element={<AddAddressPage />} />
        <Route path='/update-address/:id' element={<UpdateAddressPage />} />
        <Route path='*' element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;
