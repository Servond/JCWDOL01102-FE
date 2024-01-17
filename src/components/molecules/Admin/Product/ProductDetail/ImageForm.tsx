/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Box,
  Center,
  GridItem,
  HStack,
  Img,
  Input,
  Show,
  Tag,
  Text,
  VStack,
} from "@chakra-ui/react";
import { PiFileImageThin, PiNotePencilBold } from "react-icons/pi";

interface ImageFormProps {
  values: any;
  errors: any;
  touched: any;
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
  fileRef: React.RefObject<HTMLInputElement>;
  handleFile: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function ImageForm(props: ImageFormProps) {
  return (
    <>
      <GridItem className='key-grid-add-product'>
        <VStack gap={"20px"}>
          <HStack className='h-stack-add-product'>
            <Text className='subtitle-add-product'>Foto Produk</Text>
            <Tag>Wajib</Tag>
          </HStack>
          <Show above='md'>
            <Text textAlign={"left"} fontSize={"small"}>
              Format gambar .jpg .jpeg .png dan ukuran minimum 300 x 300px
              (Untuk gambar optimal gunakan ukuran minimum 700 x 700 px).
            </Text>
          </Show>
        </VStack>
      </GridItem>
      <GridItem
        className='value-grid-add-product'
        justifyContent={{
          base: "center",
          md: "flex-start",
        }}
      >
        <Box
          width={"125px"}
          h={"125px"}
          margin={{
            base: "0 auto",
            md: "0",
          }}
          border={props.values.image ? "0px solid" : "3px dashed "}
          borderColor={
            props.errors.image && props.touched.image ? "red.500" : "gray.400"
          }
          borderRadius={"15px"}
          cursor={"pointer"}
          onClick={() => {
            props.fileRef.current?.click();
          }}
        >
          <Center h={"100%"}>
            {props.values.image ? (
              <Box position={"relative"} width={"125px"} h={"125px"}>
                <Img
                  as={"img"}
                  src={props.values.image!}
                  crossOrigin='anonymous'
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
                color={
                  props.errors.image && props.touched.image
                    ? "#E53E3E"
                    : "#A0AEC0"
                }
              />
            )}
          </Center>
        </Box>
        <Input
          type={"file"}
          ref={props.fileRef}
          display={"none"}
          accept='image/png, image/jpeg, image/jpg, image/gif'
          onChange={props.handleFile}
        />
      </GridItem>
    </>
  );
}
