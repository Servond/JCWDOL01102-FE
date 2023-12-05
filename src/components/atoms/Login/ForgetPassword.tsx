import { Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function ForgetPassword() {
  return (
    <Text w={"full"} textAlign={"right"} mb={"1rem"} color={"forthColor"}>
      <Link to={"/"}>Forgot password?</Link>
    </Text>
  );
}
