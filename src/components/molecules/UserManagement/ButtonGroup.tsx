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

export default function ButtonGroup() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  return (
    <HStack>
      <Box zIndex={"3"}>
        <Select
          options={constants.adminCreationFilterField}
          defaultValue={constants.adminCreationFilterField[0]}
          styles={SelectStyle}
          theme={SelectTheme}
          onChange={(option) => {
            const opt = option as OptionType;
            console.log(opt.value);
            dispatch(setFilterBy(opt.value));
          }}
        />
      </Box>

      <Box zIndex={"3"}>
        <Select
          options={constants.AdminCreationSortField}
          defaultValue={constants.AdminCreationSortField[0]}
          styles={SelectStyle}
          theme={SelectTheme}
          onChange={(option) => {
            const opt = option as OptionType;
            console.log(opt.value);
            dispatch(setSortBy(opt.value));
          }}
        />
      </Box>

      <Button
        w={"150px"}
        variant={"primaryButton"}
        py={"1rem"}
        fontSize={"16px"}
        onClick={() => navigate("/dashboard/create-admin")}
      >
        <HStack>
          <Box fontSize={"16px"}>
            <FaPlus />
          </Box>
          <Text>Add Admin</Text>
        </HStack>
      </Button>
    </HStack>
  );
}
