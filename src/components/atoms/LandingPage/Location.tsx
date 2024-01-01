import { Box, HStack, Text } from "@chakra-ui/react";
import { FaLocationDot } from "react-icons/fa6";

export default function Location() {
  return (
    <HStack fontSize={"16px"} spacing={"8px"} w={"full"}>
      <Box color={"errorColor"}>
        <FaLocationDot />
      </Box>
      <Text color={"forthColor"}>Malang</Text>
    </HStack>
  );
}
