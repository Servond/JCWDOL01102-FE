import { Box, Button, HStack, Text } from "@chakra-ui/react";
import React, { PropsWithChildren, useState } from "react";
import { Link } from "react-router-dom";

interface IDashboardMenuItem {
  to: string;
  icon: React.ReactElement | React.JSX.Element;
  indexNow: number;
  menuIndex: number;
  onClick: React.MouseEventHandler<HTMLButtonElement> | undefined;
}
export default function DashboardMenuItem(
  props: PropsWithChildren<IDashboardMenuItem>
) {
  const [isHover, setHover] = useState<boolean>(false);

  const colorhHandle = () => {
    if (props.indexNow === props.menuIndex) {
      return "white";
    } else {
      return isHover ? "gray" : "secondaryColor";
    }
  };
  return (
    <Button
      bg={props.indexNow === props.menuIndex ? "primaryColor" : "white"}
      w={"full"}
      _hover={{}}
      onMouseEnter={() => {
        if (props.indexNow === props.menuIndex) return;
        setHover(true);
      }}
      onMouseLeave={() => setHover(false)}
      transition="0.2s ease"
      onClick={props.onClick}
      borderRadius={"10px"}
    >
      <Box w={"full"}>
        <Link to={props.to}>
          <HStack spacing={"12px"} w={"full"}>
            <Box
              fontSize={"25px"}
              color={colorhHandle()}
              transition={"0.3s ease"}
            >
              {props.icon}
            </Box>
            <Text
              fontWeight={"normal"}
              color={colorhHandle()}
              transition={"0.3s ease"}
            >
              {props.children}
            </Text>
          </HStack>
        </Link>
      </Box>
    </Button>
  );
}
