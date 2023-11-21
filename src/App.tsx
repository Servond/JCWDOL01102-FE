import "@fontsource/roboto/100.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "@fontsource/roboto/900.css";

import { Route, Routes } from "react-router";
import SignupPage from "./pages/SignupPage";
import AppWrapper from "./components/atoms/AppWrapper";
import MenuPage from "./pages/Menu/ProfilePage";
import MyDetailsPage from "./pages/MyDetails/MyDetails";
import AddressListPage from "./pages/AddressList/AddressListPage";

function App() {
  return (
    <Routes>
      <Route element={<AppWrapper />}>
        <Route path='/' element={<SignupPage />} />
        <Route path='/menu' element={<MenuPage />} />
        <Route path='/my-details' element={<MyDetailsPage />} />
        <Route path='/my-address' element={<AddressListPage />} />
      </Route>
    </Routes>
  );
}

export default App;
