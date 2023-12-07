import {
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from "@chakra-ui/input";
import { useState } from "react";
import { MdAlternateEmail } from "react-icons/md";
import { IAppInputProps } from "../../../data/interfaces";

export default function LoginInputEmail(props: IAppInputProps) {
  const [isFocus, setFocus] = useState<boolean>(false);

  return (
    <InputGroup>
      <InputLeftElement
        fontSize={"22px"}
        display={"flex"}
        justifyContent={"start"}
        color={isFocus ? "primaryColor" : "forthColor"}
      >
        <MdAlternateEmail />
      </InputLeftElement>
      <Input
        variant={"flushed"}
        focusBorderColor="primaryColor"
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        onChange={(e) => {
          props.onChange?.(e);
        }}
        fontSize={"18px"}
        borderColor={"#E2E2E2"}
        name="email"
        value={props.value}
      />
      <InputRightElement
        fontSize={"22px"}
        color={"successColor"}
        display={"flex"}
        justifyContent={"end"}
      ></InputRightElement>
    </InputGroup>
  );
}
