import * as Yup from "yup";

export const signupValidator = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .required("Email is required")
    .email("Email format is invalid"),
  number: Yup.string().required("Number is Required"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must contain 8 charcaters or more")
    .matches(/[A-Z]/, "Password must contain capital character")
    .matches(/[0-9]/, "Password must contain number"),
});
