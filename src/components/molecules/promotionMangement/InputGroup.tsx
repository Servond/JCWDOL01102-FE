import { Box, Button, HStack, Text } from "@chakra-ui/react";
import { FaPlus } from "react-icons/fa";
// import FilterModal from "./filterModal";
import { useNavigate } from "react-router-dom";
import Select, { SingleValue } from "react-select";
import {
  SelectStyle,
  SelectTheme,
} from "../../../themes/Select/ReactSelect.theme";
import { constants } from "../../../data/constants";

import { OptionType } from "../../../data/interfaces";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../app/redux/store";

import {
  setVoucherFilterBy,
  setVoucherSortBy,
} from "../../../app/redux/slice/Admin/discount/getVoucher";
import {
  setPromotionFilterBy,
  setPromotionSortBy,
} from "../../../app/redux/slice/Admin/discount/getPromo";
import { useEffect, useState } from "react";

export default function InputGroup() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [sort, setSortValue] = useState<OptionType | SingleValue<OptionType>>(
    constants.voucherSortField[0]
  );
  const [filter, setFilterValue] = useState<
    OptionType | SingleValue<OptionType>
  >(constants.voucherFilterField[0]);
  const currentTab = useSelector(
    (state: RootState) => state.discountTab.currentTab
  );

  const onFilterChangeHandler = (option: SingleValue<OptionType>) => {
    if (currentTab === 0) {
      dispatch(setVoucherFilterBy(option?.value));
    } else if (currentTab === 1) {
      dispatch(setPromotionFilterBy(option?.value));
    }
    setFilterValue(option);
  };

  const onSortChangeHandler = (option: SingleValue<OptionType>) => {
    if (currentTab === 0) {
      dispatch(setVoucherSortBy(option?.value));
    } else if (currentTab === 1) {
      dispatch(setPromotionSortBy(option?.value));
    }
    setSortValue(option);
  };

  useEffect(() => {
    setFilterValue(
      currentTab === 0
        ? constants.voucherFilterField[0]
        : constants.promotionFilterField[0]
    );
    setSortValue(constants.voucherSortField[0]);
  }, [currentTab]);
  return (
    <HStack>
      <Box zIndex={"3"}>
        <Select
          options={
            currentTab === 0
              ? constants.voucherFilterField
              : constants.promotionFilterField
          }
          defaultValue={
            currentTab === 0
              ? constants.voucherFilterField[0]
              : constants.promotionFilterField[0]
          }
          value={filter}
          styles={SelectStyle}
          theme={SelectTheme}
          onChange={onFilterChangeHandler}
        />
      </Box>

      <Box zIndex={"3"}>
        <Select
          options={constants.voucherSortField}
          defaultValue={constants.voucherSortField[0]}
          styles={SelectStyle}
          theme={SelectTheme}
          onChange={onSortChangeHandler}
          value={sort}
        />
      </Box>

      <Button
        // w={"150px"}
        variant={"primaryButton"}
        py={"1rem"}
        fontSize={"16px"}
        onClick={() => navigate("/dashboard/create-discount")}
      >
        <HStack>
          <Box fontSize={"16px"}>
            <FaPlus />
          </Box>
          <Text>Add Discount</Text>
        </HStack>
      </Button>
    </HStack>
  );
}
