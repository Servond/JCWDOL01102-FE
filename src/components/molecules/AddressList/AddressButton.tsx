import { Box, Button } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/redux/store";

export default function AddressButton() {
  const addressListState = useSelector((state: RootState) => state.addressList);
  const handleSave = () => {
    alert(`Alamat yang dipilih adalah ${addressListState.selectedAddressId}`);
  };

  return (
    <Box
      position={"absolute"}
      bottom={0}
      padding={"10px"}
      width={"450px"}
      maxW={"calc(100vw - 50px)"}
      bgColor={"white"}
    >
      <Button
        width={"100%"}
        onClick={handleSave}
        bgColor={"primaryColor"}
        color={"gray.100"}
        _hover={{ color: "gray.800" }}
        isDisabled={addressListState.selectedAddressId === undefined}
      >
        Pilih Alamat
      </Button>
    </Box>
  );
}
