import { Box, Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { ChangeEvent, useState } from "react";
import { MdSearch } from "react-icons/md";
import debounce from "debounce";

interface ISearchBarProps {
  onChange: (key: string) => void;
  placeHolder?: string;
}

export default function SearchBar(props: ISearchBarProps) {
  const [isFocus, setFocus] = useState<boolean>(false);
  const debouncedSearch = debounce((key) => {
    // dispatch(setKeySearch(key));
    props.onChange(key);
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
        placeholder={props.placeHolder}
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
