import { VStack } from "@chakra-ui/layout";
import AppInput from "../atoms/AppInput";
import { constants } from "../../data/constants";
import React from "react";
import AppInputPasword from "../atoms/AppInputPassword";
import AppInputPhoneNumber from "../atoms/AppInputPhoneNumber";
import { MdOutlinePerson } from "react-icons/md";
import AppInputEmail from "../atoms/AppInputEmail";
import { useFormik } from "formik";
import { signupValidator } from "../../app/validation/signupValidation.schema";
import { FormControl, FormErrorMessage, FormLabel } from "@chakra-ui/react";
import PrimaryButton from "../atoms/primaryButton";
import SignupPolicy from "./SignupPolicy";
import { useDispatch, useSelector } from "react-redux";
import { createUser } from "../../app/redux/slice/userSlicer";
import { UserCreationAttributes } from "../../data/user/interfaces";
import { AppDispatch, RootState } from "../../app/redux/store";
import Loading from "../atoms/Loading";

export default function CredetialInputs() {
  const dispatch = useDispatch<AppDispatch>();
  const isEmailAvailable = useSelector(
    (store: RootState) => store.user.getEmailResp?.data?.available
  );
  const emailErrorMessage = useSelector(
    (store: RootState) => store.user.getEmailResp?.message
  );
  const postUserStatus = useSelector(
    (state: RootState) => state.user.postUserState
  );
  const formik = useFormik({
    initialValues: { name: "", email: "", password: "", number: "" },
    onSubmit: (val) => {
      const data: UserCreationAttributes = {
        name: val.name,
        email: val.email,
        password: val.password,
        phoneNumber: val.number.replaceAll("-", ""),
        address: "",
        role_id: 3,
      };
      dispatch(createUser(data));
    },
    validationSchema: signupValidator,
  });

  const generateInput = (field: string): React.ReactElement | undefined => {
    switch (field) {
      case "Password":
        return (
          <AppInputPasword
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        );
      case "Number":
        return (
          <AppInputPhoneNumber
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        );
      case "Name":
        return (
          <AppInput
            prefixIcon={<MdOutlinePerson />}
            name="name"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        );
      case "Email":
        return (
          <AppInputEmail
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        );
      default:
        return undefined;
    }
  };

  const renderError = (field: string) => {
    if (field === "Email") {
      return generateError(field) ? (
        <FormErrorMessage>{generateError(field)}</FormErrorMessage>
      ) : null;
    } else {
      return generateError(field) && formik.submitCount > 0 ? (
        <FormErrorMessage>{generateError(field)}</FormErrorMessage>
      ) : null;
    }
  };

  const generateError = (field: string): string | undefined => {
    switch (field) {
      case "Password":
        return formik.errors.password;
      case "Number":
        return formik.errors.number;
      case "Name":
        return formik.errors.name;
      case "Email":
        if (formik.errors.email) {
          return formik.errors.email;
        } else if (!isEmailAvailable) {
          return emailErrorMessage;
        }
        break;
    }
  };

  const generateTouch = (field: string): boolean | undefined => {
    switch (field) {
      case "Password":
        return formik.touched.password;
      case "Number":
        return formik.touched.number;
      case "Name":
        return formik.touched.name;
      case "Email":
        return formik.touched.email;
      default:
        return undefined;
    }
  };

  return (
    <VStack w={"full"} align={"start"} mt={"1.5rem"} mb={"0.5rem"}>
      <form onSubmit={formik.handleSubmit} style={{ width: "100%" }}>
        <VStack spacing={"1rem"}>
          <VStack mb={"1.5rem"} w={"full"} spacing={"1rem"}>
            {constants.authInputField.map((field, index) => {
              return (
                <FormControl
                  isInvalid={
                    field === "Email"
                      ? (!!generateError(field) && generateTouch(field)) ||
                        isEmailAvailable === false
                      : !!generateError(field) && generateTouch(field)
                  }
                  w="full"
                  key={index}
                >
                  <FormLabel htmlFor={field.toLowerCase()} color={"forthColor"}>
                    {field}
                  </FormLabel>
                  {generateInput(field)}
                  {renderError(field)}
                </FormControl>
              );
            })}
          </VStack>
          <SignupPolicy />
          <PrimaryButton type="submit">
            {postUserStatus === "pending" ? <Loading /> : "Sign Up"}
          </PrimaryButton>
        </VStack>
      </form>
    </VStack>
  );
}
