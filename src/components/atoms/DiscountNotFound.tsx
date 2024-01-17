import {
  AbsoluteCenter,
  Container,
  Heading,
  Image,
  VStack,
} from "@chakra-ui/react";
import notFound from "../../assets/search_not_found.svg";

interface IDiscountNotFoundProp {
  caption: string;
}
export default function DiscountNotFound(props: IDiscountNotFoundProp) {
  return (
    <Container>
      <AbsoluteCenter>
        <VStack
          justify={"center"}
          align={"center"}
          w={"full"}
          color={"secondaryColor"}
          spacing={"1rem"}
        >
          <Container w={"300px"} minW={"200px"}>
            <Image src={notFound} />
          </Container>
          <Heading size={"md"}>{props.caption}</Heading>
        </VStack>
      </AbsoluteCenter>
    </Container>
  );
}
