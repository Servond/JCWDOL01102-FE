import { VStack, keyframes, usePrefersReducedMotion } from "@chakra-ui/react";
import EmailSuccess from "../../components/atoms/EmailNotice/EmailSent";
import EmailSentCaption from "../../components/atoms/EmailNotice/EmailSentCaption";
import PrimaryButton from "../../components/atoms/PrimaryButton";
import { useNavigate } from "react-router-dom";

export default function EmailNotice() {
  const navigate = useNavigate();
  const zoom = keyframes`
  from {transform: scale(0.95);}
  to {transform: scale(1);}`;

  const motion = usePrefersReducedMotion();

  const animation = motion ? undefined : `${zoom} 0.2s ease-in-out`;
  return (
    <VStack
      animation={animation}
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
