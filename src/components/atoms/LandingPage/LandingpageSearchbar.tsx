import { Box, Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { ChangeEvent, useState } from "react";
import { MdSearch } from "react-icons/md";
import debounce from "debounce";

interface ISearchBarProps {
  onChange: (key: string) => void;
  placeHolder?: string;
}

export default function LandingpageSearchbar(props: ISearchBarProps) {
  const [isFocus, setFocus] = useState<boolean>(false);
  const debouncedSearch = debounce((key) => {
    props.onChange(key);
  }, 500);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    debouncedSearch.clear();
    debouncedSearch(e.target.value);
  };
  return (
    <InputGroup w={"full"} mt={"1rem"}>
      <Input
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        placeholder={props.placeHolder}
        onChange={handleChange}
        borderRadius={"10px"}
        bg={"white"}
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
