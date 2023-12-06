import { Box, HStack, Heading } from "@chakra-ui/react";
import { FaChevronLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Navigation() {
  const navigate = useNavigate();
  return (
    <HStack w={"full"} align={"center"} mb={"2rem"}>
      <Box fontSize={"18px"} onClick={() => navigate(-1)}>
        <FaChevronLeft />
      </Box>
      <Heading
        size={"md"}
        fontWeight={"semibold"}
        fontSize={"20px"}
        lineHeight={"1.5px"}
      >
        Dashboard
      </Heading>
    </HStack>
  );
}
