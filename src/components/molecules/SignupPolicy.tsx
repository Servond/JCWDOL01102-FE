import { Text } from "@chakra-ui/react";

export default function SignupPolicy() {
  return (
    <Text color={"forthColor"} mb={"1rem"}>
      By continuing you agree to our{" "}
      <Text as={"span"} color={"primaryColor"}>
        Terms of Service
      </Text>{" "}
      and{" "}
      <Text as={"span"} color={"primaryColor"}>
        Privacy Policy
      </Text>
      .
    </Text>
  );
}
