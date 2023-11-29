import { Button, HStack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export default function FooterAddProduct() {
  const navigate = useNavigate();
  const handleCancel = () => {
    navigate("/admin/products");
  };
  return (
    <HStack w={"100%"} justifyContent={"flex-end"}>
      <Button onClick={handleCancel} colorScheme={"red"} variant={"outline"}>
        Batal
      </Button>
      {/* <Button colorScheme={"green"} type='submit'>
        Simpan & Tambah Produk
      </Button> */}
      <Button colorScheme={"green"} type='submit'>
        Simpan Produk
      </Button>
    </HStack>
  );
}
