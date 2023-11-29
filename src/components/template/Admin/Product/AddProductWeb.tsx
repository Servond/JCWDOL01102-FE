/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Flex, Text, VStack, useToast } from "@chakra-ui/react";
import { useFormik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { postCreateProduct } from "../../../../api/admin/product";
import FooterAddProduct from "../../../molecules/Admin/Product/FooterAddProduct";
import ProductDetailForm from "../../../organism/Admin/Produk/ProductDetail";
import ProductInformationForm from "../../../organism/Admin/Produk/ProductInformation";

export default function AddProductWeb() {
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

  const formik = useFormik({
    initialValues: {
      categoryId: null,
      name: "",
      price: null,
      image: null,
      stock: null,
      branchId: 1,
      weight: null,
      desc: "",
    },
    validationSchema: validationSchema,
    onSubmit: async () => {
      // alert(JSON.stringify(formik.values, null, 2));
      try {
        const response = await postCreateProduct(imageFile!, {
          branchId: formik.values.branchId,
          categoryId: formik.values.categoryId!,
          name: formik.values.name,
          price: formik.values.price!,
          stock: formik.values.stock!,
          weight: formik.values.weight!,
          desc: formik.values.desc,
        });
        toast({
          title: "Berhasil menambahkan produk",
          description: response.data.message,
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
        navigate("/admin/products");
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
