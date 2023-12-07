/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { createAddress, updateAddress } from "../../../api/address";
import { fetchCities } from "../../../app/redux/slice/MasterData/CitiesSlice";
import { fetchProvinces } from "../../../app/redux/slice/MasterData/ProvinceSlice";
import { AppDispatch, RootState } from "../../../app/redux/store";
import { AddressAttributes } from "../../../data/address/interface";
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

  interface AddressFormValues {
    receiverName: string;
    phoneNumber: string;
    addressLabel: string;
    latitude: string;
    longitude: string;
    province: string;
    city: string;
    address: string;
    isDefault: boolean;
    agree: boolean;
  }
  const initialValues: AddressFormValues = {
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
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const addressListState = useSelector((state: RootState) => state.addressList);
  const handleFormSubmit = async (values: AddressFormValues) => {
    try {
      setIsLoading(true);
      const data: AddressAttributes = {
        name: values.addressLabel,
        receiverName: values.receiverName,
        phoneNumber: values.phoneNumber,
        cityId: parseInt(values.city),
        provinceId: parseInt(values.province),
        address: values.address,
        isDefault: values.isDefault,
        isDeleted: false,
        latitude: values.latitude,
        longitude: values.longitude,
        userId: 1,
      };
      let response: any;
      if (!props.isUpdate) {
        response = await createAddress(1, data);
      } else {
        response = await updateAddress(
          1,
          addressListState.selectedAddressId!,
          data
        );
      }
      setIsLoading(false);
      toast({
        title: "Success",
        description: response.data?.message ?? "Berhasil menambahkan alamat",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      navigate("/my-address");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast({
        title: "Error",
        description: error?.response?.data?.message ?? "Terjadi Kesalahan",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    }
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: addressSchema,
    onSubmit: (values) => {
      handleFormSubmit(values);
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

  const dispatch = useDispatch<AppDispatch>();
  const provinces = useSelector((state: RootState) => state.province);
  const cities = useSelector((state: RootState) => state.cities);

  useEffect(() => {
    dispatch(fetchProvinces());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchCities(parseInt(formik.values.province)));
  }, [dispatch, formik.values.province]);

  const handleProvinceChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    dispatch(fetchCities(parseInt(event.target.value)));
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
          onChange={(e) => {
            handleProvinceChange(e);
            formik.handleChange(e);
          }}
          onBlur={formik.handleBlur}
          value={formik.values.province}
        >
          {provinces.data.map((province) => (
            <option key={province.province_id} value={province.province_id}>
              {province.province_name}
            </option>
          ))}
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
          {cities.data.map((city) => (
            <option key={city.city_id} value={city.city_id}>
              {city.city_name}
            </option>
          ))}
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
      <Checkbox
        name='isDefault'
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      >
        Jadikan Alamat Utama
      </Checkbox>

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
      <Button width={"100%"} my={"15px"} type='submit' isLoading={isLoading}>
        Simpan Alamat
      </Button>
    </form>
  );
}
