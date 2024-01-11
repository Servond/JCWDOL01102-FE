import { Image } from "@chakra-ui/image";
import { Container, Heading } from "@chakra-ui/layout";
import empty from "../../../assets/empty_cart.svg";
import { AbsoluteCenter } from "@chakra-ui/react";

export default function CartEmpty() {
  return (
    <AbsoluteCenter>
      <Container w={"300px"}>
        <Image src={empty} />
      </Container>
      <Heading
        fontSize={"16px"}
        color={"secondaryColor"}
        mt={"1rem"}
        textAlign={"center"}
      >
        Looks like your cart is empty. <br /> Let's buy your favourite grocery
      </Heading>
    </AbsoluteCenter>
  );
}
