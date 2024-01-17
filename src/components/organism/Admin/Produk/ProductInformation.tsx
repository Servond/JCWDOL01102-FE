/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Card,
  CardBody,
  FormControl,
  FormErrorMessage,
  Grid,
  GridItem,
  HStack,
  Input,
  Select,
  Show,
  Spacer,
  Tag,
  Text,
  VStack,
} from "@chakra-ui/react";
import { AxiosError } from "axios";
import { ChangeEvent, FocusEvent, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useDebounce } from "use-debounce";
import { findDuplicateProduct } from "../../../../api/admin/product";
import { getCategory } from "../../../../app/redux/slice/Admin/category/AdminCategorySlice";
import { AppDispatch, RootState } from "../../../../app/redux/store";
import "./style.scss";
interface ProductInformationFormProps {
  handleChange: (e: ChangeEvent<any>) => void;
  handleBlur: (e: FocusEvent<any, Element>) => void;
  // setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
  values: any;
  errors: any;
  touched: any;
  setError: (field: string, message: string) => void;
  isDuplicate: (value: boolean) => void;
}
export default function ProductInformationForm(
  props: ProductInformationFormProps
) {
  const dispatch = useDispatch<AppDispatch>();
  const categoryState = useSelector((state: RootState) => state.adminCategory);

  const [debouncedName] = useDebounce(props.values.name, 500);

  const handleDuplicateName = async (value: string) => {
    try {
      await findDuplicateProduct(value);
      props.setError("name", "");
      props.isDuplicate(false);
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 400) {
          props.setError("name", "Nama produk sudah ada");
          props.isDuplicate(true);
        }
      }
    }
  };

  useEffect(() => {
    if (debouncedName) {
      handleDuplicateName(debouncedName);
    }
  }, [debouncedName]);

  useEffect(() => {
    dispatch(getCategory());
  }, [dispatch]);
  return (
    <Card my={"1rem"} w={"100%"}>
      <CardBody>
        <VStack>
          <Text
            fontSize={"xl"}
            w={"100%"}
            fontWeight={"bold"}
            textAlign={{
              base: "center",
              md: "left",
            }}
          >
            Informasi Produk
          </Text>
          <Text
            fontSize={"md"}
            fontWeight={"normal"}
            textAlign={{
              base: "center",
              md: "left",
            }}
            w={"100%"}
          >
            Pastikan produk tidak melanggar Hak Kekayaan Intelektual supaya
            produkmu tidak diturunkan.
          </Text>
          <Grid className='grid-add-product'>
            <GridItem className='key-grid-add-product'>
              <VStack gap={"20px"}>
                <HStack className='h-stack-add-product'>
                  <Text textAlign={"left"} fontWeight={"bold"}>
                    Nama Produk
                  </Text>
                  <Tag>Wajib</Tag>
                </HStack>
                <Show above='md'>
                  <Text textAlign={"left"} fontSize={"small"}>
                    Nama produk min. 40 karakter dengan memasukkan merek, jenis
                    produk, warna, bahan, atau tipe.
                  </Text>
                  <Text textAlign={"left"} fontSize={"small"}>
                    Disarankan untuk tidak menggunakan huruf kapital berlebih,
                    memasukkan lebih dari 1 merek, dan kata-kata promosi.
                  </Text>
                </Show>
              </VStack>
            </GridItem>
            <GridItem className='value-grid-add-product'>
              <VStack
                justifyContent={{
                  base: "center",
                  md: "flex-start",
                }}
                width={"100%"}
              >
                <FormControl
                  isInvalid={props.errors.name && props.touched.name}
                  margin={{
                    base: "0 auto",
                    md: "0",
                  }}
                >
                  <Input
                    placeholder={"Contoh: Kaleng Sarden 650ml"}
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    name={"name"}
                    value={props.values.name}
                    maxLength={70}
                    margin={{
                      base: "0 30px",
                      md: "0",
                    }}
                    width={{
                      base: "80%",
                      md: "100%",
                    }}
                  />
                  <FormErrorMessage>{props.errors.name}</FormErrorMessage>
                </FormControl>
                <HStack>
                  <Text fontSize={"small"}>
                    Tips: Jenis Produk + Merek Produk + Keterangan Tambahan
                  </Text>
                  <Spacer />
                  <Text fontSize={"small"}>{props.values.name.length}/70</Text>
                </HStack>
              </VStack>
            </GridItem>
            <GridItem className='key-grid-add-product'>
              <VStack gap={"20px"}>
                <Text
                  textAlign={{
                    base: "center",
                    md: "left",
                  }}
                  w={"100%"}
                  fontWeight={"bold"}
                >
                  Kategori
                </Text>
                <Text
                  textAlign={{
                    base: "center",
                    md: "left",
                  }}
                  fontSize={"small"}
                >
                  Kamu dapat menambah etalase baru atau memilih dari daftar
                  etalase yang ada
                </Text>
              </VStack>
            </GridItem>
            <GridItem
              className='value-grid-add-product'
              width={"100%"}
              justifyContent={{
                base: "center",
                md: "flex-start",
              }}
            >
              <HStack className='h-stack-add-product'>
                <FormControl
                  isInvalid={
                    props.errors.categoryId && props.touched.categoryId
                  }
                  width={"100%"}
                >
                  <Select
                    placeholder='Pilih Kategori'
                    width={{
                      base: "80%",
                      md: "300px",
                    }}
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    name={"categoryId"}
                    value={props.values.categoryId}
                    margin={{
                      base: "0 auto",
                      md: "0",
                    }}
                  >
                    {categoryState.data.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </Select>
                  <HStack className='h-stack-add-product'>
                    <FormErrorMessage>
                      {props.errors.categoryId}
                    </FormErrorMessage>
                  </HStack>
                </FormControl>
              </HStack>
            </GridItem>
          </Grid>
        </VStack>
      </CardBody>
    </Card>
  );
}
