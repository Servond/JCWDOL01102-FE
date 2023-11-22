import { Button, Text } from "@chakra-ui/react";
interface ChangeAddressBtnProps {
  callback: () => void;
}

export default function ChangeAddressBtn(props: ChangeAddressBtnProps) {
  return (
    <Button width={"100%"} mt={"15px"} onClick={props.callback}>
      <Text color={"gray.600"}>Ubah Alamat</Text>
    </Button>
  );
}
