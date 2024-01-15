import { Button, HStack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export default function FooterAddProduct() {
  const navigate = useNavigate();
  const handleCancel = () => {
    navigate("/dashboard/products");
  };
  return (
    <HStack
      w={"100%"}
      justifyContent={{
        base: "center",
        md: "flex-end",
      }}
    >
      <Button onClick={handleCancel} variant={"dashboardRejectButton"}>
        Batal
      </Button>
      <Button variant={"dashboardAccepButton"} type='submit'>
        Simpan Produk
      </Button>
    </HStack>
  );
}
