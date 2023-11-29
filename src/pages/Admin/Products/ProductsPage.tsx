import { Box, useMediaQuery } from "@chakra-ui/react";
import ProductListManagementWeb from "../../../components/template/Admin/Product/ProductListManagementWeb";
import AddProductMobile from "../../../components/template/Admin/Product/AddProductMobile";
import "./style.css";

export default function ProductsPage() {
  const [isMobile] = useMediaQuery("(max-width: 600px)");

  return (
    <Box
      maxW={"100vw"}
      maxH={"100vh"}
      overflowY={"scroll"}
      overflowX={"hidden"}
    >
      {isMobile ? <AddProductMobile /> : <ProductListManagementWeb />}
    </Box>
  );
}
