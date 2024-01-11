import { Button, HStack, useMediaQuery } from "@chakra-ui/react";
import TotalPrice from "../../atoms/cart/TotalPrice";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const [isMobile] = useMediaQuery("(max-width: 500px)");
  const navigate = useNavigate();
  const onClick = () => navigate("/order");
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
        <Button onClick={onClick}>Checkout</Button>
      </HStack>
    </HStack>
  );
}
