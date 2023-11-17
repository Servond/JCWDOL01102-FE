import {
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from "@chakra-ui/input";
import React, { useState } from "react";
import { MdAlternateEmail, MdOutlineCheck } from "react-icons/md";

const generateEmailStatus = (
  status: string,
  response: boolean
): React.ReactElement | null => {
  if (status === "idle") {
    return null;
  } else if (status === "pending") {
    return <></>;
  } else if (status === "done" && response) {
    return <></>;
  } else if (status === "done" && !response) {
    return <></>;
  } else {
    return <></>;
  }
};

export default function AppInputEmail() {
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
        // placeholder="Passsword"
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        fontSize={"18px"}
        borderColor={"#E2E2E2"}
      />
      <InputRightElement
        fontSize={"22px"}
        color={"successColor"}
        display={"flex"}
        justifyContent={"end"}
      >
        <MdOutlineCheck />
      </InputRightElement>
    </InputGroup>
  );
}
