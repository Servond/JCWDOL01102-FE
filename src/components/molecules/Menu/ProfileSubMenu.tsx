import { Divider, HStack, Spacer, Text } from "@chakra-ui/react";
import { ReactElement } from "react";
import { FaChevronRight } from "react-icons/fa";
import { Link } from "react-router-dom";

interface IProfileSubMenuProps {
  icon: ReactElement;
  menu: string;
  href?: string;
}

export default function ProfileSubMenu(props: IProfileSubMenuProps) {
  return (
    <>
      <Divider />
      <Link to={props.href ? props.href : ""} replace={true}>
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
      </Link>
    </>
  );
}
