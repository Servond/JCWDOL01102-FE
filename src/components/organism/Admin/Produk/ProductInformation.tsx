/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Button,
  Card,
  CardBody,
  Center,
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
import { ChangeEvent, FocusEvent, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../app/redux/store";
import { getCategory } from "../../../../app/redux/slice/Admin/category/AdminCategorySlice";
import "./style.scss";
interface ProductInformationFormProps {
  handleChange: (e: ChangeEvent<any>) => void;
  handleBlur: (e: FocusEvent<any, Element>) => void;
  // setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
  values: any;
  errors: any;
  touched: any;
}
export default function ProductInformationForm(
  props: ProductInformationFormProps
) {
  const dispatch = useDispatch<AppDispatch>();
  const categoryState = useSelector((state: RootState) => state.adminCategory);

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
            textAlign={"left"}
          >
            Informasi Produk
          </Text>
          <Text
            fontSize={"md"}
            fontWeight={"normal"}
            textAlign={"left"}
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
              <VStack>
                <FormControl
                  isInvalid={props.errors.name && props.touched.name}
                >
                  <Input
                    placeholder={"Contoh: Kaleng Sarden 650ml"}
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    name={"name"}
                    value={props.values.name}
                    maxLength={70}
                  />
                  <FormErrorMessage>{props.errors.name}</FormErrorMessage>
                </FormControl>
                <HStack w={"100%"}>
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
                <Text textAlign={"left"} w={"100%"} fontWeight={"bold"}>
                  Kategori
                </Text>
                <Text textAlign={"left"} fontSize={"small"}>
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
                    width={"300px"}
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
                      <option value={category.id}>{category.name}</option>
                    ))}
                  </Select>
                  <HStack className='h-stack-add-product'>
                    <FormErrorMessage>
                      {props.errors.categoryId}
                    </FormErrorMessage>
                  </HStack>
                </FormControl>
              </HStack>
              <HStack className='h-stack-add-product'>
                <Button my={"1rem"} colorScheme={"blue"}>
                  Tambah Kategori
                </Button>
              </HStack>
            </GridItem>
          </Grid>
        </VStack>
      </CardBody>
    </Card>
  );
}
