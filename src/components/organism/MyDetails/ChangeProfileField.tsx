import {
  Button,
  Divider,
  Input,
  Text,
  VStack,
  keyframes,
  usePrefersReducedMotion,
  useToast,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { closeChangeProfile } from "../../../app/redux/slice/MyDetails/Profile/changeProfileSlice";
import { AppDispatch, RootState } from "../../../app/redux/store";
import TitleHeader from "../../molecules/MyDetails/TitleHeader";
import { DateTime } from "luxon";
import { updateUser } from "../../../api/user";
import { fetchUserById_ } from "../../../app/redux/slice/User/user";

export default function ChangeProfileField() {
  const dispatch = useDispatch<AppDispatch>();
  const changeProfile = useSelector((state: RootState) => state.changeProfile);
  const loginState = useSelector((state: RootState) => state.login);
  const [isLoading, setIsLoading] = useState(false);

  const handleBack = () => {
    dispatch(closeChangeProfile());
  };

  const zoom = keyframes`
    from {transform: scale(0.95);}
    to {transform: scale(1);}`;

  const motion = usePrefersReducedMotion();

  const animation = motion ? undefined : `${zoom} 0.2s ease-in-out`;

  const changeProfileState = useSelector(
    (state: RootState) => state.changeProfile
  );

  const schemaSwitcher = (
    name: string
  ): Yup.StringSchema<string | undefined> => {
    switch (name) {
      case "name":
        return Yup.string()
          .min(3, "Name must be at least 3 characters long")
          .required("Wajib diisi !");
      case "email":
        return Yup.string()
          .matches(/^[\w-.]+@([\w-]+.)+[\w-]{2,4}$/g, "Invalid email format")
          .email("Invalid email format")
          .required("Wajib diisi !");
      case "phoneNumber":
        return Yup.string()
          .matches(/^[0-9]+$/, "Must be only digits")
          .min(10, "Must be exactly 10 digits")
          .required("Wajib diisi !");
      case "birthdate":
        return Yup.string()
          .matches(
            /^(19|20)\d{2}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/,
            "Invalid date format"
          )
          .required("Wajib diisi !");
      default:
        return Yup.string().required("Wajib diisi !");
    }
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Wajib diisi !"),
    value: schemaSwitcher(changeProfile.field),
  });

  interface FormValues {
    name: string;
    value: string;
  }

  const initialValues: FormValues = {
    name: changeProfile.field,
    value: "",
  };

  const toast = useToast();

  const handleSubmit = async (values: FormValues) => {
    try {
      setIsLoading(true);
      await updateUser(loginState.user?.userId as number, {
        [values.name]: values.value,
      });
      setIsLoading(false);
      dispatch(
        fetchUserById_({
          id: loginState.user?.userId as number,
          token: loginState.token as string,
        })
      );
      toast({
        title: "Success",
        description: "Data berhasil diubah",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  useEffect(() => {
    formik.setFieldValue("value", changeProfile.value);
    formik.setFieldValue("name", changeProfile.field);
    formik.setFieldError("value", "");
    formik.setFieldTouched("value", false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [changeProfile]);

  return (
    <VStack
      animation={animation}
      px={"1.5rem"}
      display={changeProfileState.isOpen ? "block" : "none"}
      position={"absolute"}
      height={"100vh"}
      width={{
        base: "100%",
        sm: "500px",
      }}
      maxW={"100%"}
      bgColor={"white"}
      top={0}
      left={{
        base: 0,
        sm: "calc(50% - 250px)",
      }}
      zIndex={1000}
    >
      <TitleHeader title={changeProfile.label} callback={handleBack} />
      <Divider marginY={"8px"} />
      <Text textAlign={"justify"} lineHeight={1.1}>
        Pastikan anda mengisi data dengan benar, karena data yang anda isi akan
        digunakan untuk keperluan pengiriman barang.
      </Text>
      <form onSubmit={formik.handleSubmit}>
        <Input
          type={
            changeProfile.field === "email"
              ? "text"
              : changeProfile.field === "phoneNumber"
              ? "tel"
              : changeProfile.field === "birthdate"
              ? "date"
              : "text"
          }
          max={
            changeProfile.field === "birthdate"
              ? DateTime.now().toISODate()?.toString()
              : undefined
          }
          mt={"18px"}
          mb={"5px"}
          placeholder={changeProfile.label}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          name={"value"}
          value={formik.values.value}
          isInvalid={!!formik.errors.value && formik.touched.value}
        />
        <Text
          color={"red"}
          fontSize={"small"}
          ml={"15px"}
          mb={"10px"}
          lineHeight={1}
        >
          {formik.touched.value && formik.errors.value}
        </Text>
        <Button
          width={"100%"}
          isDisabled={!!formik.errors.value && formik.touched.value}
          type={"submit"}
          isLoading={isLoading}
        >
          Simpan
        </Button>
      </form>
    </VStack>
  );
}
