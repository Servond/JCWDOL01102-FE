import { Box, HStack, IconButton, Text } from "@chakra-ui/react";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";

export default function QuantityButton() {
  const [quantity, setQuantity] = useState<number>(1);
  const onAdd = () => setQuantity(quantity + 1);
  const onMin = () => setQuantity(quantity - 1);
  return (
    <HStack
      p={"8px"}
      borderRadius={"full"}
      border={"0.5px solid"}
      borderColor={"secondaryColor"}
      spacing={"8px"}
      w={"120px"}
      justify={"space-between"}
    >
      <IconButton
        aria-label=""
        icon={
          <Box fontSize={"12px"}>
            <FaMinus />
          </Box>
        }
        borderColor={"primaryColor"}
        onClick={onMin}
        borderRadius={"full"}
        border={"2px solid"}
        bg={"transparent"}
        color={"primaryColor"}
        size={"sm"}
        isDisabled={quantity === 1}
        _hover={{ cursor: quantity === 1 ? "disable" : "pointer" }}
      />
      <Text>{quantity}</Text>
      <IconButton
        aria-label=""
        icon={
          <Box fontSize={"11px"}>
            <FaPlus />
          </Box>
        }
        onClick={onAdd}
        borderRadius={"full"}
        border={"2px solid"}
        bg={"transparent"}
        color={"primaryColor"}
        size={"sm"}
      />
    </HStack>
  );
}
