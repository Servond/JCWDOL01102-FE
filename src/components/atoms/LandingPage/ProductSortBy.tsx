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
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../app/redux/store";
import { setLandingpageProductSortBy } from "../../../app/redux/slice/Explore/productPagination";
export default function ProductSortBy() {
  const [selectedOption, setSelectedOption] = useState<OptionTypeWithIcon>(
    constants.productSortOption[0]
  );
  const dispatch = useDispatch<AppDispatch>();
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
          dispatch(
            setLandingpageProductSortBy({
              sortBy: selected?.value,
              order: selected?.sort,
            })
          );
        }}
      />
    </HStack>
  );
}
