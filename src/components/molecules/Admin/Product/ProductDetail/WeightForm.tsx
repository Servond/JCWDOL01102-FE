/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  FormControl,
  FormErrorMessage,
  GridItem,
  HStack,
  Input,
  InputGroup,
  InputRightAddon,
  Tag,
  Text,
} from "@chakra-ui/react";
import "./style.scss";

interface WeightFormProps {
  handleChange: (e: any) => void;
  handleBlur: (e: any) => void;
  values: any;
  errors: any;
  touched: any;
}

export default function WeightForm(props: WeightFormProps) {
  return (
    <>
      <GridItem className='key-grid-add-product'>
        <HStack className='h-stack-add-product'>
          <Text className='subtitle-add-product'>Berat Produk</Text>
          <Tag>Wajib</Tag>
        </HStack>
      </GridItem>
      <GridItem className='value-grid-add-product'>
        <FormControl isInvalid={props.errors.weight && props.touched.weight}>
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
    </>
  );
}
