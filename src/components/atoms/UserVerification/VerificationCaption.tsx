import { Heading, Text, VStack } from "@chakra-ui/react";

export default function VerificationCaption() {
  return (
    <VStack>
      <Heading>Thank you</Heading>
      <Text textAlign={"center"}>
        Your email has been verified. Let's explore our store
      </Text>
    </VStack>
  );
}
