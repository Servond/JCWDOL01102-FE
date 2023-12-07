import { Box, Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { useState } from "react";
import { MdSearch } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../app/redux/store";
import { setKeySearch } from "../../../app/redux/slice/User/adminManagement";

export default function SearchBar() {
  const [isFocus, setFocus] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();
  const keySearch = useSelector(
    (state: RootState) => state.userManagement.keySearch
  );
  return (
    <InputGroup w={"300px"} minW={"100px"}>
      <Input
        variant={"createAdmin"}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        placeholder="Find user"
        onChange={(e) => dispatch(setKeySearch(e.target.value))}
        value={keySearch}
      />
      <InputRightElement
        fontSize={"20px"}
        color={!isFocus ? "secondaryColor" : "primaryColor"}
      >
        <Box
          _hover={{ cursor: "pointer" }}
          onClick={() => {}}
          borderLeft={"1px solid"}
          borderColor={!isFocus ? "secondaryColor" : "primaryColor"}
          display={"flex"}
          justifyContent={"center"}
          w={"full"}
        >
          <MdSearch />
        </Box>
      </InputRightElement>
    </InputGroup>
  );
}
