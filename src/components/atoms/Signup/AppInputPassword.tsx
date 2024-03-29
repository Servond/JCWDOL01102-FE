import {
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Input,
} from "@chakra-ui/input";

import {
  MdOutlineVisibility,
  MdOutlineVisibilityOff,
  MdLockOutline,
} from "react-icons/md";
import { useState } from "react";
import { IAppInputProps } from "../../../data/interfaces";

export default function AppInputPasword(props: IAppInputProps) {
  const [isVisible, setVisibility] = useState<boolean>(false);
  const [isFocus, setFocus] = useState<boolean>(false);
  return (
    <InputGroup>
      <InputLeftElement
        fontSize={"22px"}
        display={"flex"}
        justifyContent={"start"}
        color={isFocus ? "primaryColor" : "forthColor"}
      >
        <MdLockOutline />
      </InputLeftElement>
      <Input
        type={isVisible ? "text" : "password"}
        variant={"flushed"}
        focusBorderColor="primaryColor"
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        onChange={(e) => props.onChange?.(e)}
        fontSize={"18px"}
        borderColor={"#E2E2E2"}
        letterSpacing={isVisible ? undefined : "3px"}
        name="password"
        value={props.value}
      />
      <InputRightElement
        fontSize={"22px"}
        color={isFocus ? "primaryColor" : "forthColor"}
        onClick={() => setVisibility(!isVisible)}
        _hover={{ cursor: "pointer" }}
        display={"flex"}
        justifyContent={"end"}
      >
        {isVisible ? <MdOutlineVisibilityOff /> : <MdOutlineVisibility />}
      </InputRightElement>
    </InputGroup>
  );
}
