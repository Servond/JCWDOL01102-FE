/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Box,
  Card,
  CardBody,
  Center,
  FormControl,
  FormErrorMessage,
  Grid,
  GridItem,
  HStack,
  Img,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  Spacer,
  Tag,
  Text,
  Textarea,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { ChangeEvent, FocusEvent, useRef, useState } from "react";
import { PiFileImageThin, PiNotePencilBold } from "react-icons/pi";

interface ProductDetailFormProps {
  handleChange: (e: ChangeEvent<any>) => void;
  handleBlur: (e: FocusEvent<any, Element>) => void;
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
  setImageFile: (file: File) => void;
  values: any;
  errors: any;
  touched: any;
}

export default function ProductDetailForm(props: ProductDetailFormProps) {
  const [lastFile, setLastFile] = useState<File | undefined>(undefined);
  const toast = useToast();

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const maxAllowedSize = 1000000;
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > maxAllowedSize) {
        toast({
          title: "Ukuran gambar terlalu besar",
          description: "Maksimal 1MB",
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
        e.target.value = lastFile ? lastFile.name : "";
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        props.setFieldValue("image", reader.result as string);
      };
      reader.readAsDataURL(file);
      props.setImageFile(file);
      setLastFile(file);
    }
  };

  const fileRef = useRef<HTMLInputElement>(null);

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
            Detail Produk
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
                    Foto Produk
                  </Text>
                  <Tag>Wajib</Tag>
                </HStack>
                <Text textAlign={"left"} fontSize={"small"}>
                  Format gambar .jpg .jpeg .png dan ukuran minimum 300 x 300px
                  (Untuk gambar optimal gunakan ukuran minimum 700 x 700 px).
                </Text>
              </VStack>
            </GridItem>
            <GridItem colSpan={8}>
              <Box
                width={"125px"}
                h={"125px"}
                border={props.values.image ? "1px solid" : "3px dashed "}
                borderColor={props.errors.image ? "red.500" : "gray.400"}
                borderRadius={"15px"}
                cursor={"pointer"}
                onClick={() => {
                  fileRef.current?.click();
                }}
              >
                <Center h={"100%"}>
                  {props.values.image ? (
                    <Box position={"relative"} width={"125px"} h={"125px"}>
                      <Img
                        as={"img"}
                        src={props.values.image!}
                        alt={"product"}
                        width={"100%"}
                        height={"100%"}
                        borderRadius={"15px"}
                        style={{ objectFit: "cover" }}
                      />
                      <Box
                        position={"absolute"}
                        bottom={"5px"}
                        right={"5px"}
                        bgColor={"white"}
                        borderRadius={"5px"}
                      >
                        <PiNotePencilBold size={"25px"} color={"#47E000"} />
                      </Box>
                    </Box>
                  ) : (
                    <PiFileImageThin
                      size={"35px"}
                      color={props.errors.image ? "#E53E3E" : "#A0AEC0"}
                    />
                  )}
                </Center>
              </Box>
              <Input
                type={"file"}
                ref={fileRef}
                display={"none"}
                accept='image/png, image/jpeg, image/jpg, image/webp'
                onChange={handleFile}
              />
            </GridItem>
            <GridItem colSpan={4}>
              <VStack gap={"20px"}>
                <HStack w={"100%"}>
                  <Text textAlign={"left"} fontWeight={"bold"}>
                    Deskripsi Produk
                  </Text>
                  <Tag>Wajib</Tag>
                </HStack>
                <Text textAlign={"left"} fontSize={"small"}>
                  Pastikan deskripsi produk memuat penjelasan detail terkait
                  produkmu agar pembeli mudah mengerti dan menemukan produkmu.
                </Text>
              </VStack>
            </GridItem>
            <GridItem colSpan={8}>
              <FormControl isInvalid={props.errors.desc}>
                <Textarea
                  maxW={"550px"}
                  h={"200px"}
                  minH={"200px"}
                  maxH={"200px"}
                  overflowY={"scroll"}
                  fontSize={"small"}
                  name={"desc"}
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  maxLength={1000}
                  value={props.values.desc}
                  placeholder='Deskripsi Produk'
                ></Textarea>
                <FormErrorMessage>{props.errors.desc}</FormErrorMessage>
                <HStack maxW={"550px"}>
                  <Text fontSize={"small"}>
                    Tulis deskripsi produkmu min. 260 karakter agar pembeli
                    semakin mudah mengerti.
                  </Text>
                  <Spacer />
                  <Text fontSize={"small"}>
                    {props.values.desc.length}/1000
                  </Text>
                </HStack>
              </FormControl>
            </GridItem>
            <GridItem colSpan={4}>
              <HStack w={"100%"}>
                <Text textAlign={"left"} fontWeight={"bold"}>
                  Harga Produk
                </Text>
                <Tag>Wajib</Tag>
              </HStack>
            </GridItem>
            <GridItem colSpan={8}>
              <FormControl isInvalid={props.errors.price}>
                <InputGroup>
                  <InputLeftAddon children={"Rp"} />
                  <Input
                    placeholder={"Contoh: 10000"}
                    name='price'
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    value={props.values.price}
                    type={"number"}
                  />
                </InputGroup>
                <FormErrorMessage>{props.errors.price}</FormErrorMessage>
              </FormControl>
            </GridItem>
            <GridItem colSpan={4}>
              <HStack w={"100%"}>
                <Text textAlign={"left"} fontWeight={"bold"}>
                  Stok Produk
                </Text>
                <Tag>Wajib</Tag>
              </HStack>
            </GridItem>
            <GridItem colSpan={8}>
              <FormControl isInvalid={props.errors.stock}>
                <InputGroup>
                  <Input
                    placeholder={"Contoh: 100"}
                    name='stock'
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    value={props.values.stock}
                    type='number'
                  />
                </InputGroup>

                <FormErrorMessage>{props.errors.stock}</FormErrorMessage>
              </FormControl>
            </GridItem>
            <GridItem colSpan={4}>
              <HStack w={"100%"}>
                <Text textAlign={"left"} fontWeight={"bold"}>
                  Berat Produk
                </Text>
                <Tag>Wajib</Tag>
              </HStack>
            </GridItem>
            <GridItem colSpan={8}>
              <FormControl isInvalid={props.errors.weight}>
                <InputGroup>
                  <Input
                    placeholder={"Contoh: 100"}
                    name='weight'
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    value={props.values.weight}
                    type={"number"}
                  />
                  <InputRightAddon children={"gram"} />
                </InputGroup>
                <FormErrorMessage>{props.errors.weight}</FormErrorMessage>
              </FormControl>
            </GridItem>
          </Grid>
        </VStack>
      </CardBody>
    </Card>
  );
}
