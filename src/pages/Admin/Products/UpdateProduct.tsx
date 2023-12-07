/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { Box, useToast } from "@chakra-ui/react";
import AddProductWeb from "../../../components/template/Admin/Product/AddProductWeb";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchProductById } from "../../../api/admin/product";
import { IProduct } from "../../../data/interfaces";
import LoadingCenter from "../../../components/molecules/Loading";

export default function UpdateProductPage() {
  const params = useParams();
  const toast = useToast();
  const [product, setProduct] = useState<IProduct | undefined>(undefined);
  const getProductById = async (id: number) => {
    try {
      const product = await fetchProductById(id);
      setProduct(product.data.data);
      return product;
    } catch (error: any) {
      toast({
        title: "Gagal mengambil data produk",
        description: error.response.data.message ?? "Terjadi kesalahan",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    }
  };
  useEffect(() => {
    getProductById(Number(params.id)!);
  }, []);

  if (!product) return <LoadingCenter />;
  return (
    <Box
      maxW={"100vw"}
      maxH={"100vh"}
      bgColor={"white"}
      overflowY={"scroll"}
      overflowX={"hidden"}
    >
      <AddProductWeb
        isUpdate={true}
        branchId={product?.branchId}
        categoryId={product?.categoryId}
        desc={product?.desc}
        id={product?.id}
        name={product?.name}
        price={product?.price}
        stock={product?.stock}
        weight={product?.weight}
        image={product?.imageUrl}
      />
    </Box>
  );
}
