import { Text } from "@chakra-ui/react";

interface AddressNameProps {
  name: string;
}

export default function AddressName(props: AddressNameProps) {
  return (
    <Text lineHeight={1.2} fontWeight={700} fontSize={"sm"}>
      {props.name}
    </Text>
  );
}
