import { Heading, Text, VStack } from "@chakra-ui/react";
import BackNavigation from "../../molecules/BackNavigation";

export default function LoginHeader() {
  return (
    <VStack w={"full"} align={{ base: "left", sm: "center" }}>
      <BackNavigation pageBefore="Landing Page" />
      <Heading
        fontSize={"30px"}
        fontWeight={"semibold"}
        textAlign={"center"}
        w={"full"}
      >
        Login to your account
      </Heading>
      <Text color={"forthColor"} textAlign={"center"}>
        Enter your credential to continue
      </Text>
    </VStack>
  );
}
