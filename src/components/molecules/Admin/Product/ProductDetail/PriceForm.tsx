/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  FormControl,
  FormErrorMessage,
  GridItem,
  HStack,
  Input,
  InputGroup,
  InputLeftAddon,
  Tag,
  Text,
} from "@chakra-ui/react";
import "./style.scss";

interface PriceFormProps {
  handleChange: (e: any) => void;
  handleBlur: (e: any) => void;
  values: any;
  errors: any;
  touched: any;
}

export default function PriceForm(props: PriceFormProps) {
  return (
    <>
      <GridItem className='key-grid-add-product'>
        <HStack className='h-stack-add-product'>
          <Text className='subtitle-add-product'>Harga Produk</Text>
          <Tag>Wajib</Tag>
        </HStack>
      </GridItem>
      <GridItem className='value-grid-add-product'>
        <FormControl isInvalid={props.errors.price && props.touched.price}>
          <InputGroup
            width={{
              base: "80%",
              md: "100%",
            }}
            margin={{
              base: "0 auto",
              md: "0",
            }}
          >
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
    </>
  );
}
