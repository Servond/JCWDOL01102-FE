import { Box, Heading, VStack } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../app/redux/store";
import { setCurrentCategoryIndex } from "../../../app/redux/slice/LandingPage/categories";
import { useState } from "react";

interface IProductCategoryItemProps {
  currentCategoryIndex: number;
  id: number;
  name: string;
}
export default function ProductCategoryItem(props: IProductCategoryItemProps) {
  const dispatch = useDispatch<AppDispatch>();
  const onClick = () => dispatch(setCurrentCategoryIndex(props.id));
  const [isHover, setIsHover] = useState<boolean>(false);

  const textColorHandle = () => {
    if (props.id !== props.currentCategoryIndex && isHover) {
      return "black";
    }
    return props.id === props.currentCategoryIndex
      ? "primaryColor"
      : "secondaryColor";
  };
  return (
    <VStack
      onClick={onClick}
      w={"auto"}
      color={textColorHandle()}
      _hover={{ cursor: "pointer" }}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      transition={"color 0.3s ease"}
    >
      <Heading fontSize={"14px"} fontWeight={"semibold"} whiteSpace={"nowrap"}>
        {props.name}
      </Heading>

      <Box
        h={"4px"}
        borderRadius={"full"}
        w={"4px"}
        transition={"color 0.3s ease"}
        bg={
          props.id === props.currentCategoryIndex
            ? "primaryColor"
            : "transparent"
        }
        shadow={"none"}
      />
    </VStack>
  );
}
