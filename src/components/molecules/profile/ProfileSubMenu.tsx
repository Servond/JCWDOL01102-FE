import { Divider, HStack, Spacer, Text } from "@chakra-ui/react";
import React, { ReactElement } from "react";
import { FaChevronRight } from "react-icons/fa";

interface IProfileSubMenuProps {
  icon: ReactElement;
  menu: string;
}

export default function ProfileSubMenu(props: IProfileSubMenuProps) {
  return (
    <>
      <Divider />
      <HStack
        py={"15px"}
        px={"25px"}
        cursor={"pointer"}
        _hover={{
          backgroundColor: "gray.100",
        }}
      >
        {props.icon}
        <Text>{props.menu}</Text>
        <Spacer />
        <FaChevronRight />
      </HStack>
    </>
  );
}
