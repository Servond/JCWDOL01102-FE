import { Heading, Text, VStack } from "@chakra-ui/layout";

export default function SignupCaption() {
  return (
    <VStack w={"full"} align={{ base: "left", sm: "center" }}>
      <Heading
        fontSize={"30px"}
        fontWeight={"semibold"}
        textAlign={"center"}
        w={"full"}
      >
        Create your account
      </Heading>
      <Text color={"forthColor"} textAlign={"center"}>
        Welcome to Re-Fresh. Let's create your account
      </Text>
    </VStack>
  );
}
