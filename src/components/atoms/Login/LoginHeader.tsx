import { Heading, Text, VStack } from "@chakra-ui/react";

export default function LoginHeader() {
  return (
    <VStack w={"full"} align={{ base: "left", sm: "center" }}>
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
