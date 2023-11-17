import { Heading, Text, VStack } from "@chakra-ui/layout";

export default function SignupCaption() {
  return (
    <VStack w={"full"} align={"center"}>
      <Heading fontSize={"30px"} fontWeight={"semibold"}>Create your account</Heading>
      <Text color={"forthColor"}>Welcome to Re-Fresh. Let's create your account</Text>
    </VStack>
  );
}
