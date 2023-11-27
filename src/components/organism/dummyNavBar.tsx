import { Box, Flex, HStack, Heading, useMediaQuery } from "@chakra-ui/react";
import MenuButton from "../atoms/LandingPage/MenuButton";

export default function DummyNavBar() {
  const [isMobile] = useMediaQuery("(max-width: 500px)");
  return (
    <Box
      h={"50px"}
      bg={"primaryColor"}
      shadow={"md"}
      maxW={isMobile ? "full" : "500px"}
      w={"500px"}
      position={"fixed"}
      zIndex={"10"}
      top={"0px"}
      px={"1rem"}
    >
      <Flex h={"full"} w={"full"} align={"center"} justify={"space-between"}>
        <Heading size={"md"} color={"white"}>
          Re-Fresh
        </Heading>
        <HStack>
          <MenuButton />
        </HStack>
      </Flex>
    </Box>
  );
}
