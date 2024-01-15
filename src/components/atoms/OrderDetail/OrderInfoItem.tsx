import { HStack, Text } from "@chakra-ui/react";

interface IOrderInfoItemProps {
  label: string;
  value: string;
}

export default function OrderInfoItem(props: IOrderInfoItemProps) {
  return (
    <HStack w={"full"} justify={"space-between"}>
      <Text fontWeight={"semibold"}>{props.label}</Text>
      <Text fontWeight={"semibold"}>{props.value}</Text>
    </HStack>
  );
}
