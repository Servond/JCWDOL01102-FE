import { Box, Button, HStack, Text } from "@chakra-ui/react";
import { FaPlus } from "react-icons/fa";
// import FilterModal from "./filterModal";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import {
  SelectStyle,
  SelectTheme,
} from "../../../themes/Select/ReactSelect.theme";
import { constants } from "../../../data/constants";

import { OptionType } from "../../../data/interfaces";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../app/redux/store";
import {
  setFilterBy,
  setSortBy,
} from "../../../app/redux/slice/Admin/userManagement/adminManagement";

export default function InputGroup() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  return (
    <HStack>
      <Box zIndex={"3"}>
        <Select
          options={constants.voucherFilterField}
          defaultValue={constants.voucherFilterField[0]}
          styles={SelectStyle}
          theme={SelectTheme}
          onChange={(option) => {
            const opt = option as OptionType;
            dispatch(setFilterBy(opt.value));
          }}
        />
      </Box>

      <Box zIndex={"3"}>
        <Select
          options={constants.voucherSortField}
          defaultValue={constants.voucherSortField[0]}
          styles={SelectStyle}
          theme={SelectTheme}
          onChange={(option) => {
            const opt = option as OptionType;
            dispatch(setSortBy(opt.value));
          }}
        />
      </Box>

      <Button
        // w={"150px"}
        variant={"primaryButton"}
        py={"1rem"}
        fontSize={"16px"}
        onClick={() => navigate("/dashboard/create-voucher")}
      >
        <HStack>
          <Box fontSize={"16px"}>
            <FaPlus />
          </Box>
          <Text>Add Promotion</Text>
        </HStack>
      </Button>
    </HStack>
  );
}
