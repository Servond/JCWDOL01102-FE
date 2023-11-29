import { Box, HStack, Text } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { AppDispatch } from "../../../app/redux/store";
import { setDrawer } from "../../../app/redux/slice/Animation/animationSlice";

interface IMenuItemProps {
  icon: JSX.Element | React.ReactElement;
  value: string;
  to: string;
}

export default function MenuItem(props: IMenuItemProps) {
  const dispatch = useDispatch<AppDispatch>();
  return (
    <HStack
      fontSize={"30px"}
      _hover={{
        color: "black",
        transition: "0.2s ease",
        fontSize: "35px",
      }}
      color={"white"}
      transition={"0.2s ease"}
    >
      <Box fontSize={"29px"}>{props.icon}</Box>
      <Link
        to={props.to}
        onClick={() => {
          dispatch(setDrawer(false));
        }}
      >
        <Text fontWeight={"bold"}>{props.value}</Text>
      </Link>
    </HStack>
  );
}
