import { Box, Button } from "@chakra-ui/react";

export default function AddressButton() {
  return (
    <Box
      position={"absolute"}
      bottom={0}
      padding={"10px"}
      width={"450px"}
      maxW={"calc(100vw - 50px)"}
      bgColor={"white"}
    >
      <Button width={"100%"}>Pilih Alamat</Button>
    </Box>
  );
}
