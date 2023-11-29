import { Box, useMediaQuery } from "@chakra-ui/react";
import AddProductWeb from "../../../components/template/Admin/Product/AddProductWeb";
import "./style.css";
export default function AddProductPage() {
  const [isMobile] = useMediaQuery("(max-width: 600px)");
  return (
    <Box
      maxW={"100vw"}
      maxH={"100vh"}
      bgColor={"white"}
      overflowY={"scroll"}
      overflowX={"scroll"}
    >
      {isMobile ? <AddProductWeb /> : <AddProductWeb />}
    </Box>
  );
}
