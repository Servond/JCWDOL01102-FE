import { Button, HStack, useMediaQuery } from "@chakra-ui/react";
import TotalPrice from "../../atoms/cart/TotalPrice";

export default function Checkout() {
  const [isMobile] = useMediaQuery("(max-width: 500px)");
  return (
    <HStack
      mx={"-1rem"}
      w={isMobile ? `full` : "500px"}
      p={"1rem"}
      justify={"space-between"}
      bg={"white"}
      position={"fixed"}
      bottom={"61px"}
      borderRadius={"18px"}
      shadow={"md"}
    >
      <TotalPrice />
      <HStack>
        <Button>Checkout</Button>
      </HStack>
    </HStack>
  );
}
