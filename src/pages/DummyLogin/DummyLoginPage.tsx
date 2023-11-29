import { VStack, useToast } from "@chakra-ui/react";
import LoginForm from "../../components/molecules/Login/LoginForm";
import LoginHeader from "../../components/atoms/Login/LoginHeader";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../app/redux/store";
import {
  resetUserLoginCredential,
  setAuthenticated,
} from "../../app/redux/slice/User/login";
import { useNavigate } from "react-router-dom";

export default function DummyLoginPage() {
  const loginResp = useSelector((state: RootState) => state.login.loginResp);
  const toast = useToast();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    console.log(loginResp);
    if (Object.keys(loginResp!).length === 0) {
      return;
    }

    if (loginResp?.statusCode === 200) {
      localStorage.setItem("token", loginResp.data!.token);
      dispatch(resetUserLoginCredential());
      dispatch(setAuthenticated(true));
      navigate("/");
      return;
    }
    toast({
      title: "User Login",
      description: loginResp?.message,
      position: "top",
      status: "error",
      duration: 3000,
    });
  }, [loginResp, toast, dispatch, navigate]);

  return (
    <VStack h={"100dvh"} w={"full"} py={"1.5rem"}>
      <LoginHeader />
      <LoginForm />
    </VStack>
  );
}
