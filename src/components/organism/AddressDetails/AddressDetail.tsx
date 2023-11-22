import {
  Button,
  Checkbox,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Select,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import * as Yup from "yup";
import AddressFormField from "../../molecules/AddressList/AddressFormField";

interface AddressDetailProps {
  isUpdate?: boolean;
  receiverName?: string;
  phoneNumber?: string;
  addressLabel?: string;
  latitude?: string;
  longitude?: string;
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
    latitude: Yup.string().required("Wajib diisi !"),
    longitude: Yup.string().required("Wajib diisi !"),
  });

  const initialValues = {
    receiverName: props.receiverName ?? "",
    phoneNumber: props.phoneNumber ?? "",
    addressLabel: props.addressLabel ?? "",
    latitude: props.latitude ?? "",
    longitude: props.longitude ?? "",
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
  const toast = useToast();
  const getCoordinate = (): void => {
    const successCallback = (position: GeolocationPosition): void => {
      formik.setFieldValue("latitude", position.coords.latitude);
      formik.setFieldValue("longitude", position.coords.longitude);
      toast({
        title: "Success",
        description: "Koordinat berhasil didapatkan",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    };

    const errorCallback = (error: GeolocationPositionError): void => {
      toast({
        title: "Error",
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    };

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
    } else {
      toast({
        title: "Error",
        description: "Geolocation is not supported by your browser",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    }
  };

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
      <AddressFormField
        label='Latitude'
        error={formik.errors.latitude}
        touched={formik.touched.latitude}
        name='latitude'
        placeholder='Latitude'
        handleChange={formik.handleChange}
        handleBlur={formik.handleBlur}
        value={formik.values.latitude}
        isDisabled={true}
      />

      <AddressFormField
        label='Longitude'
        error={formik.errors.longitude}
        touched={formik.touched.longitude}
        name='longitude'
        placeholder='Longitude'
        handleChange={formik.handleChange}
        handleBlur={formik.handleBlur}
        value={formik.values.longitude}
        isDisabled={true}
      />
      <Button width={"100%"} my={"15px"} onClick={getCoordinate}>
        Dapatkan Koordinat Alamat
      </Button>
      <FormControl
        isInvalid={!!formik.errors.province && formik.touched.province}
      >
        <FormLabel>Provinsi</FormLabel>
        <Select
          placeholder='Pilih Provinsi'
          name='province'
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.province}
        >
          <option value='option1'>Option 1</option>
          <option value='option2'>Option 2</option>
          <option value='option3'>Option 3</option>
        </Select>
        <FormErrorMessage>{formik.errors.province}</FormErrorMessage>
      </FormControl>
      <FormControl isInvalid={!!formik.errors.city && formik.touched.city}>
        <FormLabel>Kota/Kabupaten</FormLabel>
        <Select
          placeholder='Pilih Kota/Kabupaten'
          name='city'
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.city}
        >
          <option value='option1'>Option 1</option>
          <option value='option2'>Option 2</option>
          <option value='option3'>Option 3</option>
        </Select>
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
