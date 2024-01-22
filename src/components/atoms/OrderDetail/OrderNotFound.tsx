import { Container, Heading, Image, VStack } from "@chakra-ui/react";
import notFound from "../../../assets/search_not_found.svg";
export default function OrderNotFound() {
  return (
    <VStack spacing={"1rem"}>
      <Container w={"300px"}>
        <Image src={notFound} />
      </Container>
      <Heading fontSize={"16px"} color={"secondaryColor"}>
        Oppss..we can't find the order
      </Heading>
    </VStack>
  );
}
