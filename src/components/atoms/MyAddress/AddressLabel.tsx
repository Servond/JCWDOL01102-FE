import { HStack, Text } from "@chakra-ui/react";
interface AddressLabelProps {
  addressName: string;
  isOutOfCoverage?: boolean;
}
export default function AddressLabel(props: AddressLabelProps) {
  return (
    <HStack>
      <Text fontSize={"8pt"} fontWeight={600} lineHeight={1}>
        {props.addressName}
      </Text>
      {props.isOutOfCoverage && (
        <Text fontSize={"8pt"} fontWeight={600} lineHeight={1} color={"red"}>
          (Lokasi Tidak Dapat Dijangkau)
        </Text>
      )}
    </HStack>
  );
}
