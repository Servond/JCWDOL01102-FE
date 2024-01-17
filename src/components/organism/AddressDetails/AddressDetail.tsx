/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Button,
  Checkbox,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Select,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { useDebounce } from "use-debounce";
import * as Yup from "yup";
import { createAddress, updateAddress } from "../../../api/address";
import { forwardGeocoding } from "../../../api/opencage";
import { fetchCities } from "../../../app/redux/slice/MasterData/CitiesSlice";
import { fetchProvinces } from "../../../app/redux/slice/MasterData/ProvinceSlice";
import { AppDispatch, RootState } from "../../../app/redux/store";
import { AddressAttributes } from "../../../data/address/interface";
import AddressFormField from "../../molecules/AddressList/AddressFormField";

interface AddressDetailProps {
  updateId?: number;
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
  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const [isLoading, setIsLoading] = useState(false);
  const loginState = useSelector((state: RootState) => state.login);
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
        userId: loginState.user?.userId as number,
      };
      let response: any;
      if (!props.isUpdate) {
        response = await createAddress(loginState.user?.userId as number, data);
      } else {
        response = await updateAddress(
          loginState.user?.userId as number,
          props.updateId!,
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
      const backUrl = query.get("back") ? `/${query.get("back")}` : "/menu";
      navigate(backUrl, { replace: true });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setIsLoading(false);
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

  const dispatch = useDispatch<AppDispatch>();
  const provinces = useSelector((state: RootState) => state.province);
  const cities = useSelector((state: RootState) => state.cities);
  useEffect(() => {
    if (props.province) {
      const province = provinces.data.find(
        (province) => province.province_id === parseInt(props.province!)
      );
      setProvinceName(province?.province_name as string);
    }
    if (props.city) {
      const city = cities.data.find(
        (city) => city.city_id === parseInt(props.city!)
      );
      setCityName(city?.city_name as string);
    }
  }, [props, provinces, cities]);
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
  const [provinceName, setProvinceName] = useState("");
  const [cityName, setCityName] = useState("");
  const [addressDebounce] = useDebounce(formik.values.address, 1000);

  const handleGetLatLong = async () => {
    try {
      if (!provinceName || !cityName) return;
      const response = await forwardGeocoding(provinceName, cityName);

      formik.setFieldValue(
        "latitude",
        String(response.data.data.results[0].geometry.lat)
      );
      formik.setFieldValue(
        "longitude",
        String(response.data.data.results[0].geometry.lng)
      );
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.response?.data?.message ?? "Terjadi Kesalahan",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    }
  };

  useEffect(() => {
    if (addressDebounce) {
      handleGetLatLong();
    }
  }, [addressDebounce, cityName, provinceName]);

  const handleChangeProvince = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const province = provinces.data.find(
      (province) => province.province_id === parseInt(event.target.value)
    );
    setProvinceName(province?.province_name as string);
    formik.setFieldValue("province", event.target.value);
  };

  const handleChangeCity = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const city = cities.data.find(
      (city) => city.city_id === parseInt(event.target.value)
    );
    setCityName(city?.city_name as string);
    formik.setFieldValue("city", event.target.value);
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
      <Input type='hidden' name='latitude' value={formik.values.latitude} />
      <Input type='hidden' name='longitude' value={formik.values.longitude} />
      <FormControl
        isInvalid={!!formik.errors.province && formik.touched.province}
      >
        <FormLabel>Provinsi</FormLabel>
        <Select
          placeholder='Pilih Provinsi'
          name='province'
          onChange={(e) => {
            handleProvinceChange(e);
            handleChangeProvince(e);
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
          onChange={(e) => {
            handleChangeCity(e);
          }}
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
