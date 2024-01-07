import { Box, VStack } from "@chakra-ui/react";

import PageHeader from "../../components/molecules/ProductDetails/PageHeader";
import MainContent from "../../components/molecules/ProductDetails/MainContent";
import { useLocation } from "react-router-dom";

export default function ProductDetailsPage() {
  const location = useLocation();
  const product = location.state;
  return (
    <VStack w={"full"}>
      <Box w={"full"}>
        <PageHeader />
        <MainContent product={product} />
      </Box>
    </VStack>
  );
}
