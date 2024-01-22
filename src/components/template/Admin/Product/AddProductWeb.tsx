/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Flex, Text, VStack, useToast } from "@chakra-ui/react";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import {
  postCreateProduct,
  updateProduct,
  updateProductWithImage,
} from "../../../../api/admin/product";
import FooterAddProduct from "../../../molecules/Admin/Product/FooterAddProduct";
import ProductDetailForm from "../../../organism/Admin/Produk/ProductDetail";
import ProductInformationForm from "../../../organism/Admin/Produk/ProductInformation";

interface AddProductWebProps {
  id?: number;
  isUpdate?: boolean;
  categoryId?: number;
  name?: string;
  price?: number;
  stock?: number;
  branchId?: number;
  weight?: number;
  desc?: string;
  image?: string;
}

export default function AddProductWeb(
  props: AddProductWebProps = { isUpdate: false }
) {
  const [imageFile, setImageFile] = useState<File | undefined>(undefined);
  const validationSchema = Yup.object({
    categoryId: Yup.number().required("Wajib diisi!"),
    name: Yup.string().required("Wajib diisi!").min(5, "Minimal 5 karakter"),
    price: Yup.number()
      .typeError("Hanya boleh angka!")
      .required("Wajib diisi!")
      .min(1000, "Minimal Rp. 1000"),
    stock: Yup.number()
      .typeError("Hanya boleh angka!")
      .required("Wajib diisi!"),
    branchId: Yup.number()
      .typeError("Hanya boleh angka!")
      .required("Wajib diisi!"),
    weight: Yup.number()
      .typeError("Hanya boleh angka!")
      .required("Wajib diisi!"),
    desc: Yup.string().required("Wajib diisi!").min(20, "Minimal 20 karakter"),
    image: Yup.string().required("Wajib diisi!"),
  });
  const toast = useToast();
  const navigate = useNavigate();
  const [isDuplicate, setIsDuplicate] = useState(false);


  const formik = useFormik({
    initialValues: {
      categoryId: props.categoryId ?? null,
      name: props.name ?? "",
      price: props.price ?? null,
      image: props.image
        ? `${import.meta.env.VITE_SERVER_URL}${props.image}`
        : "",
      stock: props.stock ?? null,
      branchId: props.branchId ?? 1,
      weight: props.weight ?? null,
      desc: props.desc ?? "",
    },
    validationSchema: validationSchema,
    onSubmit: async () => {
      try {
        let response;
        if (props.isUpdate) {
          if (!imageFile) {
            response = await updateProduct(props.id!, {
              branchId: formik.values.branchId,
              categoryId: formik.values.categoryId!,
              name: formik.values.name,
              price: formik.values.price!,
              stock: formik.values.stock!,
              weight: formik.values.weight!,
              desc: formik.values.desc,
            });
          } else {
            response = await updateProductWithImage(props.id!, imageFile!, {
              branchId: formik.values.branchId,
              categoryId: formik.values.categoryId!,
              name: formik.values.name,
              price: formik.values.price!,
              stock: formik.values.stock!,
              weight: formik.values.weight!,
              desc: formik.values.desc,
            });
          }
        } else {
          response = await postCreateProduct(imageFile!, {
            branchId: formik.values.branchId,
            categoryId: formik.values.categoryId!,
            name: formik.values.name,
            price: formik.values.price!,
            stock: formik.values.stock!,
            weight: formik.values.weight!,
            desc: formik.values.desc,
          });
        }
        toast({
          title: "Berhasil menambahkan produk",
          description: response!.data.message ?? response!.data ?? "Sukses",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
        navigate("/dashboard/products");
      } catch (error: any) {
        toast({
          title: "Gagal menambahkan produk",
          description:
            error?.response?.data?.message ?? error?.message ?? error ?? "",
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
      }
    },
  });
  useEffect(() => {
    if (isDuplicate) {
      formik.setFieldError("name", "Nama produk sudah ada");
    }
  }, [isDuplicate, formik]);

  return (
    <Flex p={"15px"} justifyContent={"center"} overflowX={"scroll"}>
      <VStack width={"75vw"}>
        <Text
          fontSize={"2xl"}
          fontWeight={"bold"}
          textAlign={"left"}
          w={"100%"}
        >
          Tambah Produk
        </Text>
        <form onSubmit={formik.handleSubmit}>
          <ProductInformationForm
            handleBlur={formik.handleBlur}
            handleChange={formik.handleChange}
            values={formik.values}
            errors={formik.errors}
            touched={formik.touched}
            setError={formik.setFieldError}
            isDuplicate={setIsDuplicate}
            // setFieldValue={formik.setFieldValue}
          />
          <ProductDetailForm
            handleBlur={formik.handleBlur}
            handleChange={formik.handleChange}
            errors={formik.errors}
            touched={formik.touched}
            values={formik.values}
            setFieldValue={formik.setFieldValue}
            setImageFile={setImageFile}
          />
          <FooterAddProduct />
        </form>
      </VStack>
    </Flex>
  );
}
