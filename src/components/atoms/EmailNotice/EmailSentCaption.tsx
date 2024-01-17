import { Heading, Text, VStack } from "@chakra-ui/react";

export default function EmailSentCaption() {
  return (
    <VStack mb={"2.5rem"}>
      <Heading size={"lg"}>User Verification</Heading>
      <Text textAlign={"center"}>
        We just sent a verification link to your email. Click on it and start
        your groceries adventure
      </Text>
    </VStack>
  );
}
