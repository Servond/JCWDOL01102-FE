import "@fontsource/roboto/100.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "@fontsource/roboto/900.css";

import { Route, Routes } from "react-router";
import SignupPage from "./pages/SignupPage";
import AppWrapper from "./components/atoms/AppWrapper";
import EmailNoticePage from "./pages/EmailNoticePage";
import UserVerification from "./pages/UserVerification";

function App() {
  return (
    <Routes>
      <Route element={<AppWrapper />}>
        <Route path="/" element={<SignupPage />} />
        <Route path="/email-notice" element={<EmailNoticePage />} />
        <Route path="/user-verification/:id" element={<UserVerification />} />
      </Route>
    </Routes>
  );
}

export default App;
