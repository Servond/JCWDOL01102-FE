import { Box, Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { ChangeEvent, useState } from "react";
import { MdSearch } from "react-icons/md";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../app/redux/store";
import { setKeySearch } from "../../../app/redux/slice/Admin/userManagement/adminManagement";
import debounce from "debounce";

export default function SearchBar() {
  const [isFocus, setFocus] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();
  const debouncedSearch = debounce((key) => {
    dispatch(setKeySearch(key));
  }, 500);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    debouncedSearch.clear();
    debouncedSearch(e.target.value);
  };
  return (
    <InputGroup w={"300px"} minW={"100px"}>
      <Input
        variant={"createAdmin"}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        placeholder="Find user"
        onChange={handleChange}
        // value={keySearch}
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
