import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  VStack,
} from "@chakra-ui/react";
import Dropdown from "../../atoms/CreateAdmin/Dropdown";
import { useFormik } from "formik";
import { createAdminValidator } from "../../../app/validation/createAdminValidation.schema";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../app/redux/store";
import { createUser } from "../../../app/redux/slice/userSlicer";
import { useEffect } from "react";
import Loading from "../../atoms/Loading";

export default function AdminCreationForm() {
  const dispatch = useDispatch<AppDispatch>();
  const postUserState = useSelector(
    (state: RootState) => state.user.postUserState
  );
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      number: "",
      branch: 0,
    },
    onSubmit: (value) => {
      dispatch(
        createUser({
          name: value.name,
          address: "",
          role_id: 2,
          branch_id: Number(value.branch),
          password: value.password,
          phoneNumber: value.number,
          email: value.email,
        })
      );
    },
    validationSchema: createAdminValidator,
  });
  const boxRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (postUserState !== "done") return;

    formik.resetForm({
      submitCount: 0,
      errors: {},
      touched: {},
      values: {
        name: "",
        email: "",
        password: "",
        number: "",
        branch: 0,
      },
    });
  }, [postUserState]);

  return (
    <Box minW="300px" w={"70%"} h={"full"} ref={boxRef}>
      <form
        onSubmit={formik.handleSubmit}
        style={{
          maxHeight: boxRef.current?.offsetHeight,
          overflow: "auto",
          height: "100%",
        }}
      >
        <VStack w={"full"} align={"start"} spacing={"1rem"}>
          <VStack w={"full"} align={"start"}>
            <FormControl
              isInvalid={Boolean(formik.errors.name && formik.touched.name)}
            >
              <FormLabel htmlFor="name" color={"forthColor"} fontSize={"1rem"}>
                Name
              </FormLabel>
              <Input
                variant={
                  formik.submitCount > 0 && formik.errors.name
                    ? "error"
                    : "createAdmin"
                }
                onChange={formik.handleChange}
                name="name"
                id="name"
                value={formik.values.name}
              />
              {formik.submitCount > 0 && formik.errors.name ? (
                <FormErrorMessage>{formik.errors.name}</FormErrorMessage>
              ) : null}
            </FormControl>
          </VStack>

          <VStack w={"full"} align={"start"}>
            <FormControl
              isInvalid={Boolean(formik.errors.email && formik.touched.email)}
            >
              <FormLabel htmlFor="email" color={"forthColor"} fontSize={"1rem"}>
                Email
              </FormLabel>
              <Input
                variant={
                  formik.submitCount > 0 && formik.errors.email
                    ? "error"
                    : "createAdmin"
                }
                onChange={formik.handleChange}
                name="email"
                id="email"
                value={formik.values.email}
              />
              {formik.submitCount > 0 && formik.errors.email ? (
                <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
              ) : null}
            </FormControl>
          </VStack>

          <VStack w={"full"} align={"start"}>
            <FormControl
              isInvalid={Boolean(formik.errors.number && formik.touched.number)}
            >
              <FormLabel
                htmlFor="number"
                color={"forthColor"}
                fontSize={"1rem"}
              >
                Number
              </FormLabel>
              <Input
                variant={
                  formik.submitCount > 0 && formik.errors.number
                    ? "error"
                    : "createAdmin"
                }
                onChange={formik.handleChange}
                name="number"
                id="number"
                value={formik.values.number}
              />
              {formik.submitCount > 0 && formik.errors.number ? (
                <FormErrorMessage>{formik.errors.number}</FormErrorMessage>
              ) : null}
            </FormControl>
          </VStack>

          <VStack w={"full"} align={"start"}>
            <FormControl
              isInvalid={Boolean(
                formik.errors.password && formik.touched.password
              )}
            >
              <FormLabel
                htmlFor="password"
                color={"forthColor"}
                fontSize={"1rem"}
              >
                Password
              </FormLabel>
              <Input
                variant={
                  formik.submitCount > 0 && formik.errors.password
                    ? "error"
                    : "createAdmin"
                }
                type="password"
                onChange={formik.handleChange}
                name="password"
                id="password"
                value={formik.values.password}
              />
              {formik.submitCount > 0 && formik.errors.password ? (
                <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
              ) : null}
            </FormControl>
          </VStack>

          <VStack w={"full"} align={"start"}>
            <FormControl
              isInvalid={Boolean(formik.errors.branch && formik.touched.branch)}
            >
              <FormLabel
                htmlFor="branch"
                color={"forthColor"}
                fontSize={"1rem"}
              >
                Branch
              </FormLabel>
              <Dropdown
                onChange={formik.setFieldValue}
                value={formik.values.branch}
              />
              {formik.submitCount > 0 && formik.errors.branch ? (
                <FormErrorMessage>{formik.errors.branch}</FormErrorMessage>
              ) : null}
            </FormControl>
          </VStack>
          <Flex w={"full"} justify={"end"} mt={"1rem"}>
            <Button
              type="submit"
              w={"200px"}
              disabled={postUserState === "pending"}
            >
              {postUserState === "pending" ? <Loading /> : "Create Admin"}
            </Button>
          </Flex>
        </VStack>
      </form>
    </Box>
  );
}
