import { AbsoluteCenter, Container, VStack } from "@chakra-ui/react";
import Explore from "../../atoms/UserVerification/Explore";
import VerificationCaption from "../../atoms/UserVerification/VerificationCaption";

export default function ThankYou() {
  return (
    <Container>
      <AbsoluteCenter>
        <VStack>
          <Explore />
          <VerificationCaption />
        </VStack>
      </AbsoluteCenter>
    </Container>
  );
}
