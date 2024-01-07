import { OptionProps, components } from "react-select";
import { OptionTypeWithIcon } from "../../../data/interfaces";
import { Box, HStack, Text } from "@chakra-ui/layout";

export default function ProductSortOption(
  props: OptionProps<OptionTypeWithIcon, false>
) {
  return (
    <components.Option {...props}>
      <HStack>
        <Box>
          <props.data.icon />
        </Box>
        <Text>{props.data.label}</Text>
      </HStack>
    </components.Option>
  );
}
