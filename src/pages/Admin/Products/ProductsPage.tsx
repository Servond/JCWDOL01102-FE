import { Box, useMediaQuery } from "@chakra-ui/react";
import ProductListManagementWeb from "../../../components/template/Admin/Product/ProductListManagementWeb";
import "./style.css";
import ProductListManagementMobile from "../../../components/template/Admin/Product/ProductListManagementMobile";

export default function ProductsPage() {
  const [isMobile] = useMediaQuery("(max-width: 600px)");

  return (
    <Box
      maxW={"100vw"}
      maxH={"100vh"}
      overflowY={"scroll"}
      overflowX={"hidden"}
    >
      {isMobile ? (
        <ProductListManagementMobile />
      ) : (
        <ProductListManagementWeb />
      )}
    </Box>
  );
}
