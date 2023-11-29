/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  FormControl,
  FormErrorMessage,
  GridItem,
  HStack,
  Input,
  InputGroup,
  Tag,
  Text,
} from "@chakra-ui/react";
import "./style.scss";

interface StockFormProps {
  handleChange: (e: any) => void;
  handleBlur: (e: any) => void;
  values: any;
  errors: any;
  touched: any;
}

export default function StockForm(props: StockFormProps) {
  return (
    <>
      <GridItem className='key-grid-add-product'>
        <HStack className='h-stack-add-product'>
          <Text className='subtitle-add-product'>Stok Produk</Text>
          <Tag>Wajib</Tag>
        </HStack>
      </GridItem>
      <GridItem className='value-grid-add-product'>
        <FormControl isInvalid={props.errors.stock && props.touched.stock}>
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
    </>
  );
}
