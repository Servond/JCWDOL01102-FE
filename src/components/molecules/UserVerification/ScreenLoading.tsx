import { AbsoluteCenter, Container, Text, VStack } from "@chakra-ui/react";
import Loading from "../../atoms/Loading";

export default function ScreenLoading() {
  return (
    <Container>
      <AbsoluteCenter>
        <VStack>
          <Loading size={"60px"} color="primaryColor" trackColor="thirdColor" />
          <Text fontSize={"25px"} fontWeight={"semibold"} color={"fortColor"}>
            Loading
          </Text>
        </VStack>
      </AbsoluteCenter>
    </Container>
  );
}
