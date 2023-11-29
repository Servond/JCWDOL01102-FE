import { AbsoluteCenter, Container, VStack } from "@chakra-ui/react";
import Explore from "../../atoms/UserVerification/Explore";
import VerificationCaption from "../../atoms/UserVerification/VerificationCaption";
import PrimaryButton from "../../atoms/PrimaryButton";
import { useNavigate } from "react-router-dom";

export default function ThankYou() {
  const navigate = useNavigate();
  return (
    <Container>
      <AbsoluteCenter>
        <VStack>
          <Explore />
          <VerificationCaption />
          <PrimaryButton onClick={() => navigate("/")}>Explore</PrimaryButton>
        </VStack>
      </AbsoluteCenter>
    </Container>
  );
}
