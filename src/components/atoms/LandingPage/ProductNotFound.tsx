import { Image } from "@chakra-ui/image";
import { Container, Heading, VStack } from "@chakra-ui/layout";
import notFound from "../../../assets/search_not_found.svg";

export default function ProductNotFound() {
  return (
    <VStack spacing={"1rem"}>
      <Container w={"300px"}>
        <Image src={notFound} />
      </Container>
      <Heading fontSize={"16px"} color={"secondaryColor"}>
        Oppss..we can't find the products
      </Heading>
    </VStack>
  );
}
