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
import AddressFormField from "../../molecules/AddressList/AddressFormField";

interface AddressDetailProps {
  isUpdate?: boolean;
  receiverName?: string;
  phoneNumber?: string;
  addressLabel?: string;
  province?: string;
  city?: string;
  address?: string;
  isDefault?: boolean;
}

export default function AddressDetail(props: AddressDetailProps) {
  const addressSchema = Yup.object().shape({
    receiverName: Yup.string().required("Wajib diisi !"),
    phoneNumber: Yup.string().required("Wajib diisi !"),
    addressLabel: Yup.string().required("Wajib diisi !"),
    province: Yup.string().required("Wajib diisi !"),
    city: Yup.string().required("Wajib diisi !"),
    address: Yup.string()
      .required("Wajib diisi !")
      .max(200, "Max 200 karakter"),
    isDefault: Yup.boolean(),
    agree: Yup.boolean().oneOf([true], "Wajib diisi !"),
  });

  const initialValues = {
    receiverName: props.receiverName ?? "",
    phoneNumber: props.phoneNumber ?? "",
    addressLabel: props.addressLabel ?? "",
    province: props.province ?? "",
    city: props.city ?? "",
    address: props.address ?? "",
    isDefault: props.isDefault ?? false,
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
      <AddressFormField
        label='Nama Penerima'
        error={formik.errors.receiverName}
        touched={formik.touched.receiverName}
        name='receiverName'
        placeholder='Nama Penerima'
        handleChange={formik.handleChange}
        handleBlur={formik.handleBlur}
        value={formik.values.receiverName}
      />

      <AddressFormField
        label='Nomor Handphone'
        error={formik.errors.phoneNumber}
        touched={formik.touched.phoneNumber}
        name='phoneNumber'
        placeholder='Nomor Handphone'
        handleChange={formik.handleChange}
        handleBlur={formik.handleBlur}
        value={formik.values.phoneNumber}
      />

      <AddressFormField
        label='Label Alamat'
        error={formik.errors.addressLabel}
        touched={formik.touched.addressLabel}
        name='addressLabel'
        placeholder='Label Alamat'
        handleChange={formik.handleChange}
        handleBlur={formik.handleBlur}
        value={formik.values.addressLabel}
      />
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

      <AddressFormField
        label='Alamat Lengkap'
        error={formik.errors.address}
        touched={formik.touched.address}
        name='address'
        placeholder='Alamat Lengkap'
        handleChange={formik.handleChange}
        handleBlur={formik.handleBlur}
        value={formik.values.address}
      />
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
