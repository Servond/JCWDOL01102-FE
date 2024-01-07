import { HStack, Text } from "@chakra-ui/layout";
import Select from "react-select";
import {
  SelectStyleWithIcon,
  SelectTheme,
} from "../../../themes/Select/ReactSelect.theme";
import ProductSortOption from "./ProductSortOption";
import { constants } from "../../../data/constants";
import { useState } from "react";
import { OptionTypeWithIcon } from "../../../data/interfaces";
export default function ProductSortBy() {
  const [selectedOption, setSelectedOption] = useState<OptionTypeWithIcon>(
    constants.productSortOption[0]
  );
  return (
    <HStack w={"full"} justify={"end"}>
      <Text fontSize={"14px"} color={"secondaryColor"}>
        Sort By
      </Text>
      <Select
        isSearchable={false}
        theme={SelectTheme}
        styles={SelectStyleWithIcon}
        components={{ Option: ProductSortOption }}
        options={constants.productSortOption}
        value={selectedOption}
        onChange={(selected) => {
          setSelectedOption(selected as OptionTypeWithIcon);
        }}
      />
    </HStack>
  );
}
