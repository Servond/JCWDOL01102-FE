import { Box, Text, VStack } from "@chakra-ui/react";
import React from "react";
import { setCurrentPageIndex } from "../../../app/redux/slice/Navbar/Navbar";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../app/redux/store";
import { useNavigate } from "react-router-dom";

interface INavbarComponentProps {
  icon: React.JSX.ElementType;
  name: string;
  path: string;
  index: number;
  currentIndex: number;
}
export default function NavbarComponent(props: INavbarComponentProps) {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const onClick = () => {
    dispatch(setCurrentPageIndex(props.index));
    navigate(props.path);
  };
  return (
    <VStack
      onClick={onClick}
      color={
        props.index === props.currentIndex ? "primaryColor" : "secondaryColor"
      }
      _hover={{
        cursor: "pointer",
      }}
      w={"55px"}
      h={"full"}
      spacing={"1px"}
    >
      {props.index === props.currentIndex ? (
        <Box bg={"primaryColor"} w={"full"} h={"4px"} borderRadius={"full"} />
      ) : null}

      <VStack
        justify={"center"}
        align={"center"}
        h={"full"}
        mt={props.index === props.currentIndex ? "0px" : "6px"}
        spacing={"1px"}
      >
        <Box fontSize={"24px"}>
          <props.icon />
        </Box>
        <Text fontSize={"12px"}>{props.name}</Text>
      </VStack>
    </VStack>
  );
}
