// import { Image } from "@chakra-ui/image";
import { Text, VStack } from "@chakra-ui/layout";
// import dummy from "../assets/grocery.svg";
import SignupCaption from "../components/molecules/SignupCaption";
import CredetialInputs from "../components/molecules/CredentialInputs";
import PrimaryButton from "../components/atoms/primaryButton";
import { Link } from "react-router-dom";

export default function SignupPage() {
  return (
    <VStack justify={"center"} h={"100dvh"}>
      {/* <Image w={"30%"} src={dummy} /> */}
      <SignupCaption />
      <CredetialInputs />
      <Text color={"forthColor"} mb={"1.5rem"}>
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
      <PrimaryButton onClick={() => {}}>Sign Up</PrimaryButton>
      <Text mt={"1rem"}>
        Already have an account?{" "}
        <Text color={"primaryColor"} as={"span"}>
          <Link to={"/login"}>Login</Link>
        </Text>
      </Text>
    </VStack>
  );
}
