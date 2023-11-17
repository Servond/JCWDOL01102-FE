import { Text, VStack } from "@chakra-ui/layout";
import AppInput from "../atoms/AppInput";
import { constants } from "../../data/constants";
import React from "react";
import AppInputPasword from "../atoms/AppInputPassword";
import AppInputPhoneNumber from "../atoms/AppInputPhoneNumber";
import { MdOutlinePerson } from "react-icons/md";
import AppInputEmail from "../atoms/AppInputEmail";

const generateInput = (field: string): React.ReactElement | undefined => {
  switch (field) {
    case "Password":
      return <AppInputPasword />;
    case "Number":
      return <AppInputPhoneNumber />;
    case "Name":
      return <AppInput prefixIcon={<MdOutlinePerson />} />;
    case "Email":
      return <AppInputEmail />;
    default:
      return undefined;
  }
};

export default function CredetialInputs() {
  return (
    <VStack
      w={"full"}
      align={"start"}
      mt={"3rem"}
      spacing={"1.5rem"}
      mb={"1rem"}
    >
      {constants.authInputField.map((field, index) => {
        return (
          <VStack w={"full"} align={"left"} spacing={0} key={index}>
            <Text color={"forthColor"} fontSize={"18px"}>
              {field}
            </Text>
            {generateInput(field)}
          </VStack>
        );
      })}
    </VStack>
  );
}
