import { Box, Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import debounce from "debounce";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { MdSearch } from "react-icons/md";
import { useLocation } from "react-router-dom";

interface ISearchBarProps {
  onChange?: (key: string) => void;
  onClick?: () => void;
  placeHolder?: string;
  isFocused?: boolean;
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

  const searchRef = useRef<HTMLInputElement | null>(null);
  const location = useLocation();

  useEffect(() => {
    if (searchRef.current === null || !location.state) {
      return;
    }
    searchRef.current.focus();
  }, [location, searchRef]);

  return (
    <InputGroup w={"full"} onFocus={props.onClick}>
      <Input
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        placeholder={props.placeHolder}
        onChange={handleChange}
        borderRadius={"10px"}
        bg={"white"}
        variant={"createAdmin"}
        ref={searchRef}
      />
      <InputRightElement
        fontSize={"20px"}
        color={!isFocus ? "secondaryColor" : "primaryColor"}
      >
        <Box
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
