import {
  Button,
  Divider,
  Input,
  Text,
  VStack,
  keyframes,
  usePrefersReducedMotion,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { closeChangeProfile } from "../../../app/redux/slice/MyDetails/Profile/changeProfileSlice";
import { RootState } from "../../../app/redux/store";
import TitleHeader from "../../molecules/MyDetails/TitleHeader";
import { DateTime } from "luxon";

export default function ChangeProfileField() {
  const dispatch = useDispatch();
  const changeProfile = useSelector((state: RootState) => state.changeProfile);

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
        return Yup.string().required("Wajib diisi !");
      case "birthdate":
        return Yup.string().required("Wajib diisi !");
      default:
        return Yup.string().required("Wajib diisi !");
    }
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Wajib diisi !"),
    value: schemaSwitcher(changeProfile.field),
  });

  const initialValues = {
    name: changeProfile.field,
    value: "",
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
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
          color={"primaryColor"}
          isDisabled={!!formik.errors.value && formik.touched.value}
          type={"submit"}
        >
          Simpan
        </Button>
      </form>
    </VStack>
  );
}
