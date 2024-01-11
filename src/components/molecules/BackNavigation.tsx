import { Box, HStack, Heading } from "@chakra-ui/react";
import { FaChevronLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

interface IBackNavigationProps {
  pageBefore: string;
  landingPage?: boolean;
}

export default function BackNavigation(props: IBackNavigationProps) {
  const navigate = useNavigate();
  return (
    <HStack w={"full"} align={"center"} mb={"2rem"}>
      <Box
        fontSize={"18px"}
        onClick={() => (props.landingPage ? navigate("/") : navigate(-1))}
        _hover={{ cursor: "pointer" }}
      >
        <FaChevronLeft />
      </Box>
      <Heading
        size={"md"}
        fontWeight={"semibold"}
        fontSize={"20px"}
        lineHeight={"1.5px"}
      >
        {props.pageBefore}
      </Heading>
    </HStack>
  );
}
