import * as Yup from "yup";

export const createAdminValidator = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .required("Email is required")
    .email("Email format is invalid"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must contain 8 charcaters or more")
    .matches(/[A-Z]/, "Password must contain capital character")
    .matches(/[0-9]/, "Password must contain number"),
  branch: Yup.number()
    .required("Branch not selected")
    .test({
      name: "test",
      test: (value) => {
        return Number(value) > 0;
      },
      message: "Branch not selected",
    }),
});
