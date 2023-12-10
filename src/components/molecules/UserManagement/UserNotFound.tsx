import { AbsoluteCenter, Container, Heading } from "@chakra-ui/react";

export default function UserNotFound() {
  return (
    <Container>
      <AbsoluteCenter>
        <Heading color={"secondaryColor"} size={"md"} fontWeight={"semobold"}>
          Opps...admin not found
        </Heading>
      </AbsoluteCenter>
    </Container>
  );
}
