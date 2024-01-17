import { GridItem, Text } from "@chakra-ui/react";

interface Props {
  label: string;
}

export default function LabelDetail(props: Props) {
  return (
    <GridItem colSpan={4}>
      <Text fontWeight={600}>{props.label}</Text>
    </GridItem>
  );
}
