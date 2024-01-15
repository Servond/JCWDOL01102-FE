import { Button, Text } from "@chakra-ui/react";
interface ChangeAddressBtnProps {
  callback: () => void;
  isDisabled?: boolean;
}

export default function ChangeAddressBtn(props: ChangeAddressBtnProps) {
  return (
    <Button
      width={"100%"}
      mt={"15px"}
      onClick={props.callback}
      isDisabled={props.isDisabled}
      cursor={props.isDisabled ? "not-allowed" : "pointer"}
      // _hover={{ bgColor: "rgba(226, 232, 240, 0.1)" }}
      _disabled={{
        bgColor: "gray.200",
        cursor: "not-allowed",
        color: "gray.500",
      }}
    >
      <Text>Ubah Alamat</Text>
    </Button>
  );
}
