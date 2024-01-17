import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  VStack,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import AppInputPasword from "../../atoms/Signup/AppInputPassword";
import { loginValidationSchema } from "../../../app/validation/loginValidation.schema";
import { useDispatch, useSelector } from "react-redux";
import LoginInputEmail from "../../atoms/Login/LoginInputEmail";
import { AppDispatch, RootState } from "../../../app/redux/store";
import {
  setLoginEmail,
  setLoginPassword,
  userLogin,
} from "../../../app/redux/slice/User/login";
import PrimaryButton from "../../atoms/PrimaryButton";
import ForgetPassword from "../../atoms/Login/ForgetPassword";
import Loading from "../../atoms/Loading";

export default function LoginForm() {
  const loginEmailValue = useSelector(
    (state: RootState) => state.login.emailValue
  );
  const loginPasswordValue = useSelector(
    (state: RootState) => state.login.passwordValue
  );
  const loginState = useSelector((state: RootState) => state.login.loginState);
  const dispatch = useDispatch<AppDispatch>();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginValidationSchema,
    onSubmit: (val) => {
      dispatch(userLogin({ email: val.email, password: val.password }));
    },
  });

  return (
    <VStack w={"full"} mt={"2rem"} h={"full"}>
      <form onSubmit={formik.handleSubmit} style={{ width: "100%" }}>
        <VStack spacing={"1rem"} mb={"1rem"}>
          <VStack w={"full"} spacing={"1.5rem"}>
            <FormControl
              isInvalid={!!formik.errors.email && formik.touched.email}
            >
              <FormLabel htmlFor="email" color={"forthColor"}>
                Email
              </FormLabel>
              <LoginInputEmail
                onChange={(e) => {
                  dispatch(setLoginEmail(e.target.value));
                  formik.handleChange(e);
                }}
                onBlur={formik.handleBlur}
                value={loginEmailValue}
              />
              {formik.errors.email && formik.submitCount > 0 ? (
                <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
              ) : null}
            </FormControl>
          </VStack>

          <VStack w={"full"} spacing={"1.5rem"}>
            <FormControl
              isInvalid={!!formik.errors.password && formik.touched.password}
            >
              <FormLabel htmlFor="password" color={"forthColor"}>
                Password
              </FormLabel>
              <AppInputPasword
                onChange={(e) => {
                  dispatch(setLoginPassword(e.target.value));
                  formik.handleChange(e);
                }}
                onBlur={formik.handleBlur}
                value={loginPasswordValue}
              />
              {formik.errors.password && formik.submitCount > 0 ? (
                <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
              ) : null}
            </FormControl>
            <ForgetPassword />
          </VStack>
        </VStack>
        <PrimaryButton type="submit">
          {loginState === "pending" ? <Loading /> : "Login"}
        </PrimaryButton>
      </form>
    </VStack>
  );
}
