/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Button,
  Card,
  CardBody,
  FormControl,
  FormErrorMessage,
  Grid,
  GridItem,
  HStack,
  Input,
  Select,
  Spacer,
  Tag,
  Text,
  VStack,
} from "@chakra-ui/react";
import { ChangeEvent, FocusEvent } from "react";

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
          <Grid
            templateColumns={"repeat(12, 1fr)"}
            columnGap={"3rem"}
            rowGap={"2rem"}
          >
            <GridItem colSpan={4}>
              <VStack gap={"20px"}>
                <HStack w={"100%"}>
                  <Text textAlign={"left"} fontWeight={"bold"}>
                    Nama Produk
                  </Text>
                  <Tag>Wajib</Tag>
                </HStack>
                <Text textAlign={"left"} fontSize={"small"}>
                  Nama produk min. 40 karakter dengan memasukkan merek, jenis
                  produk, warna, bahan, atau tipe.
                </Text>
                <Text textAlign={"left"} fontSize={"small"}>
                  Disarankan untuk tidak menggunakan huruf kapital berlebih,
                  memasukkan lebih dari 1 merek, dan kata-kata promosi.
                </Text>
              </VStack>
            </GridItem>
            <GridItem colSpan={8}>
              <VStack>
                <FormControl isInvalid={props.errors.name}>
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
            <GridItem colSpan={4}>
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
            <GridItem colSpan={8}>
              <HStack alignItems={"start"}>
                <FormControl isInvalid={props.errors.categoryId} w={"300px"}>
                  <Select
                    placeholder='Pilih Kategori'
                    width={"300px"}
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    name={"categoryId"}
                    value={props.values.categoryId}
                  >
                    <option value='1'>Sayur</option>
                    <option value='2'>Daging</option>
                    <option value='3'>Minuman</option>
                  </Select>
                  <FormErrorMessage>{props.errors.categoryId}</FormErrorMessage>
                </FormControl>
                <Button>Tambah Kategori</Button>
              </HStack>
            </GridItem>
          </Grid>
        </VStack>
      </CardBody>
    </Card>
  );
}
