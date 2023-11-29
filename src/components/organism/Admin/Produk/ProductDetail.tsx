/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, CardBody, Grid, Text, VStack, useToast } from "@chakra-ui/react";
import { ChangeEvent, FocusEvent, useRef, useState } from "react";
import ImageForm from "../../../molecules/Admin/Product/ProductDetail/ImageForm";
import PriceForm from "../../../molecules/Admin/Product/ProductDetail/PriceForm";
import ProductDescription from "../../../molecules/Admin/Product/ProductDetail/ProductDescription";
import StockForm from "../../../molecules/Admin/Product/ProductDetail/StockForm";
import WeightForm from "../../../molecules/Admin/Product/ProductDetail/WeightForm";
import "./style.scss";
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
    <Card my={"1rem"}>
      <CardBody w={"100%"}>
        <VStack>
          <Text className='title-add-product'>Detail Produk</Text>
          <Grid className='grid-add-product'>
            <ImageForm
              errors={props.errors}
              touched={props.touched}
              values={props.values}
              setFieldValue={props.setFieldValue}
              fileRef={fileRef}
              handleFile={handleFile}
            />
            <ProductDescription
              errors={props.errors}
              touched={props.touched}
              values={props.values}
              handleChange={props.handleChange}
              handleBlur={props.handleBlur}
            />
            <PriceForm
              errors={props.errors}
              touched={props.touched}
              values={props.values}
              handleChange={props.handleChange}
              handleBlur={props.handleBlur}
            />
            <StockForm
              errors={props.errors}
              touched={props.touched}
              values={props.values}
              handleChange={props.handleChange}
              handleBlur={props.handleBlur}
            />
            <WeightForm
              errors={props.errors}
              touched={props.touched}
              values={props.values}
              handleChange={props.handleChange}
              handleBlur={props.handleBlur}
            />
          </Grid>
        </VStack>
      </CardBody>
    </Card>
  );
}
