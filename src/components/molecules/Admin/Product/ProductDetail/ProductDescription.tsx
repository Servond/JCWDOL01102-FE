/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  FormControl,
  FormErrorMessage,
  GridItem,
  HStack,
  Show,
  Spacer,
  Tag,
  Text,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import "./style.scss";

interface ProductDescriptionProps {
  handleChange: (e: any) => void;
  handleBlur: (e: any) => void;
  values: any;
  errors: any;
  touched: any;
}

export default function ProductDescription(props: ProductDescriptionProps) {
  return (
    <>
      <GridItem className='key-grid-add-product'>
        <VStack gap={"20px"}>
          <HStack className='h-stack-add-product'>
            <Text className='subtitle-add-product'>Deskripsi Produk</Text>
            <Tag>Wajib</Tag>
          </HStack>
          <Show above='md'>
            <Text textAlign={"left"} fontSize={"small"}>
              Pastikan deskripsi produk memuat penjelasan detail terkait
              produkmu agar pembeli mudah mengerti dan menemukan produkmu.
            </Text>
          </Show>
        </VStack>
      </GridItem>
      <GridItem className='value-grid-add-product' maxW={"100vw"}>
        <FormControl
          isInvalid={props.errors.desc && props.touched.desc}
          width={{
            base: "80%",
            md: "100%",
          }}
          margin={{
            base: "0 auto",
            md: "0",
          }}
        >
          <Textarea
            w={"100%"}
            maxW={"100%"}
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
          <HStack width={"100%"} maxW={"90vw"}>
            <Text fontSize={"small"}>
              Tulis deskripsi produkmu min. 260 karakter agar pembeli semakin
              mudah mengerti.
            </Text>
            <Spacer />
            <Text fontSize={"small"}>{props.values.desc.length}/1000</Text>
          </HStack>
        </FormControl>
      </GridItem>
    </>
  );
}
