import {
  Button,
  Checkbox,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Text,
} from "@chakra-ui/react";
import * as Yup from "yup";
import { useFormik } from "formik";

export default function AddressDetail() {
  const addressSchema = Yup.object().shape({
    receiverName: Yup.string().required("Wajib diisi !"),
    phoneNumber: Yup.string().required("Wajib diisi !"),
    addressLabel: Yup.string().required("Wajib diisi !"),
    province: Yup.string().required("Wajib diisi !"),
    city: Yup.string().required("Wajib diisi !"),
    address: Yup.string().required("Wajib diisi !"),
    isDefault: Yup.boolean(),
    agree: Yup.boolean().oneOf([true], "Wajib diisi !"),
  });

  const initialValues = {
    receiverName: "",
    phoneNumber: "",
    addressLabel: "",
    province: "",
    city: "",
    address: "",
    isDefault: false,
    agree: false,
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: addressSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <FormControl
        isInvalid={!!formik.errors.receiverName && formik.touched.receiverName}
      >
        <FormLabel>Nama Penerima</FormLabel>
        <Input
          type='text'
          placeholder='Nama Penerima'
          name='receiverName'
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <FormErrorMessage>{formik.errors.receiverName}</FormErrorMessage>
      </FormControl>
      <FormControl
        isInvalid={!!formik.errors.phoneNumber && formik.touched.phoneNumber}
      >
        <FormLabel>Nomor Handphone</FormLabel>
        <Input
          type='text'
          placeholder='Nomor Handphone'
          name='phoneNumber'
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <FormErrorMessage>{formik.errors.phoneNumber}</FormErrorMessage>
      </FormControl>
      <FormControl
        isInvalid={!!formik.errors.addressLabel && formik.touched.addressLabel}
      >
        <FormLabel>Label Alamat</FormLabel>
        <Input
          type='text'
          placeholder='Label Alamat'
          name='addressLabel'
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <FormErrorMessage>{formik.errors.addressLabel}</FormErrorMessage>
      </FormControl>
      <FormControl
        isInvalid={!!formik.errors.province && formik.touched.province}
      >
        <FormLabel>Provinsi</FormLabel>
        <Input
          type='text'
          placeholder='Provinsi'
          name='province'
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <FormErrorMessage>{formik.errors.province}</FormErrorMessage>
      </FormControl>
      <FormControl isInvalid={!!formik.errors.city && formik.touched.city}>
        <FormLabel>Kota/Kabupaten</FormLabel>
        <Input
          type='text'
          placeholder='Kota/Kabupaten'
          name='city'
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <FormErrorMessage>{formik.errors.city}</FormErrorMessage>
      </FormControl>
      <FormControl
        isInvalid={!!formik.errors.address && formik.touched.address}
      >
        <FormLabel>Alamat Lengkap</FormLabel>
        <Input
          type='text'
          placeholder='Alamat Lengkap'
          name='address'
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <FormErrorMessage>{formik.errors.address}</FormErrorMessage>
      </FormControl>
      <Checkbox name='isDefault'>Jadikan Alamat Utama</Checkbox>

      <Checkbox
        name='agree'
        isInvalid={!!formik.errors.agree && formik.touched.agree}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      >
        Saya menyetujui{" "}
        {
          <Text color='primaryColor' display={"inline"}>
            Syarat & Ketentuan
          </Text>
        }{" "}
        serta Kebijakan Privasi pengaturan alamat
      </Checkbox>
      <Button width={"100%"} my={"15px"} type='submit'>
        Simpan Alamat
      </Button>
    </form>
  );
}
