import { Button, HStack, Spacer, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export default function TitleAdminProduct() {
  const navigate = useNavigate();

  const handleAddProduct = () => {
    navigate("/dashboard/add-product");
  };
  return (
    <HStack w={"100%"} my={"15px"}>
      <Text fontSize='2xl' fontWeight='bold'>
        Daftar Produk
      </Text>
      <Spacer />
      <Button onClick={handleAddProduct} variant={"outline"}>
        Add Product
      </Button>
    </HStack>
  );
}
