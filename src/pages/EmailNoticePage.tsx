import { VStack } from "@chakra-ui/react";
import EmailSuccess from "../components/atoms/EmailNotice/EmailSent";
import EmailSentCaption from "../components/atoms/EmailNotice/EmailSentCaption";
import PrimaryButton from "../components/atoms/PrimaryButton";
import { useNavigate } from "react-router-dom";

export default function EmailNotice() {
  const navigate = useNavigate();
  return (
    <VStack
      h={"100dvh"}
      maxW={"full"}
      textAlign={"center"}
      justify={"center"}
      spacing={"1.5rem"}
    >
      <EmailSuccess />
      <EmailSentCaption />

      <PrimaryButton
        onClick={() => {
          navigate("/");
        }}
      >
        Got it
      </PrimaryButton>
    </VStack>
  );
}
