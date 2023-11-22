import { Text } from "@chakra-ui/react";
interface AddressLabelProps {
  addressName: string;
}
export default function AddressLabel(props: AddressLabelProps) {
  return (
    <Text fontSize={"8pt"} fontWeight={600} lineHeight={1}>
      {props.addressName}
    </Text>
  );
}
