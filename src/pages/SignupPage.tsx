// import { Image } from "@chakra-ui/image";
import { Text, VStack } from "@chakra-ui/layout";
// import dummy from "../assets/grocery.svg";
import SignupCaption from "../components/molecules/SignupCaption";
import CredetialInputs from "../components/molecules/CredentialInputs";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../app/redux/store";
import { useToast } from "@chakra-ui/react";

export default function SignupPage() {
  const postUserResp = useSelector(
    (state: RootState) => state.user.postUserResp
  );
  const toast = useToast();

  useEffect(() => {
    if (
      postUserResp?.message === "" ||
      postUserResp === undefined ||
      Object.keys(postUserResp).length === 0
    )
      return;
    toast({
      isClosable: true,
      position: "bottom",
      title: "User Sign Up",
      description: postUserResp?.message,
      status: postUserResp?.statusCode === 200 ? "success" : "error",
      duration: 5000,
    });
  }, [postUserResp, toast]);

  return (
    <VStack justify={"center"} py={"1.5rem"}>
      <SignupCaption />
      <CredetialInputs />
      <Text textAlign={"center"}>
        Already have an account?{" "}
        <Text color={"primaryColor"} as={"span"} textAlign={"center"}>
          <Link to={"/login"}>Login</Link>
        </Text>
      </Text>
    </VStack>
  );
}
